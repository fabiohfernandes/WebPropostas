// ============================================================================
// Elastic Animation Hook
// Based on Konva Elastic Stars example
// Uses Konva.Tween with ElasticEaseOut for bounce effect
// ============================================================================

'use client';

import { useRef, useEffect } from 'react';
import Konva from 'konva';

interface ElasticConfig {
  scaleFactor?: number;
  duration?: number;
  shadowOffset?: number;
}

export function useElasticAnimation(
  nodeRef: React.RefObject<Konva.Node>,
  isSelected: boolean,
  config: ElasticConfig = {}
) {
  const tweenRef = useRef<Konva.Tween | null>(null);

  const {
    scaleFactor = 1.1,
    duration = 0.5,
    shadowOffset = 15,
  } = config;

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const node = nodeRef.current;
    if (!node) return;

    const handleDragStart = () => {
      // Stop any existing tween
      if (tweenRef.current) {
        tweenRef.current.destroy();
        tweenRef.current = null;
      }

      // Get current scale (might be transformed)
      const currentScaleX = node.scaleX() || 1;
      const currentScaleY = node.scaleY() || 1;

      // Scale up and increase shadow on drag start
      node.to({
        scaleX: currentScaleX * scaleFactor,
        scaleY: currentScaleY * scaleFactor,
        shadowOffsetX: shadowOffset,
        shadowOffsetY: shadowOffset,
        duration: 0.1,
      });

      // Store the original scale for bounce back
      node.setAttr('__originalScaleX', currentScaleX);
      node.setAttr('__originalScaleY', currentScaleY);
    };

    const handleDragEnd = () => {
      // Get stored original scale
      const originalScaleX = node.getAttr('__originalScaleX') || 1;
      const originalScaleY = node.getAttr('__originalScaleY') || 1;

      // Elastic bounce back to original scale
      tweenRef.current = new Konva.Tween({
        node: node,
        duration: duration,
        easing: Konva.Easings.ElasticEaseOut,
        scaleX: originalScaleX,
        scaleY: originalScaleY,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
      });

      tweenRef.current.play();
    };

    // Attach event listeners
    node.on('dragstart', handleDragStart);
    node.on('dragend', handleDragEnd);

    // Cleanup
    return () => {
      node.off('dragstart', handleDragStart);
      node.off('dragend', handleDragEnd);
      if (tweenRef.current) {
        tweenRef.current.destroy();
        tweenRef.current = null;
      }
    };
  }, [nodeRef, scaleFactor, duration, shadowOffset]);
}
