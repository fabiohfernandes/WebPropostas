// ============================================================================
// Elastic Spring Animation Hook
// Based on Konva Elastic Stars example
// ============================================================================

import { useRef, useEffect } from 'react';
import Konva from 'konva';

interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function useElasticAnimation(
  nodeRef: React.RefObject<Konva.Node>,
  isSelected: boolean,
  config: SpringConfig = {}
) {
  const animationRef = useRef<Konva.Animation | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });

  const {
    stiffness = 0.05,
    damping = 0.5,
    mass = 1,
  } = config;

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isSelected) {
      // Clean up animation when not selected
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
      velocityRef.current = { x: 0, y: 0 };
      return;
    }

    let isDragging = false;

    const handleDragStart = () => {
      isDragging = true;
      const pos = node.position();
      targetPosRef.current = { x: pos.x, y: pos.y };
      velocityRef.current = { x: 0, y: 0 };

      // Stop any existing animation
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };

    const handleDragMove = () => {
      if (!isDragging) return;
      const pos = node.position();
      targetPosRef.current = { x: pos.x, y: pos.y };
    };

    const handleDragEnd = () => {
      isDragging = false;
      const pos = node.position();
      targetPosRef.current = { x: pos.x, y: pos.y };

      // Start spring animation
      const layer = node.getLayer();
      if (!layer) return;

      animationRef.current = new Konva.Animation((frame) => {
        if (!frame) return;

        const currentPos = node.position();
        const target = targetPosRef.current;
        const velocity = velocityRef.current;

        // Calculate spring force (Hooke's law)
        const dx = target.x - currentPos.x;
        const dy = target.y - currentPos.y;

        const forceX = dx * stiffness;
        const forceY = dy * stiffness;

        // Calculate acceleration (F = ma, a = F/m)
        const accelerationX = forceX / mass;
        const accelerationY = forceY / mass;

        // Update velocity with damping
        velocity.x = (velocity.x + accelerationX) * damping;
        velocity.y = (velocity.y + accelerationY) * damping;

        // Update position
        const newX = currentPos.x + velocity.x;
        const newY = currentPos.y + velocity.y;

        node.position({ x: newX, y: newY });

        // Stop animation when settled
        const distanceSquared = dx * dx + dy * dy;
        const velocitySquared = velocity.x * velocity.x + velocity.y * velocity.y;

        if (distanceSquared < 0.01 && velocitySquared < 0.01) {
          node.position(target);
          velocityRef.current = { x: 0, y: 0 };
          if (animationRef.current) {
            animationRef.current.stop();
          }
        }
      }, layer);

      animationRef.current.start();
    };

    // Attach event listeners
    node.on('dragstart', handleDragStart);
    node.on('dragmove', handleDragMove);
    node.on('dragend', handleDragEnd);

    // Cleanup
    return () => {
      node.off('dragstart', handleDragStart);
      node.off('dragmove', handleDragMove);
      node.off('dragend', handleDragEnd);
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [nodeRef, isSelected, stiffness, damping, mass]);

  return {
    velocity: velocityRef.current,
    isAnimating: animationRef.current !== null,
  };
}
