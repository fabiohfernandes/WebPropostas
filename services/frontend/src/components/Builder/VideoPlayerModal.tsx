// ============================================================================
// Template Builder - Video Player Modal
// AURELIA (Design System) + NOVA (Frontend)
// Play videos in modal during editing
// ============================================================================

'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { VideoElement } from '@/types/builder';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoElement: VideoElement | null;
}

export function VideoPlayerModal({ isOpen, onClose, videoElement }: VideoPlayerModalProps) {
  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !videoElement) return null;

  const borderRadius = videoElement.properties.border?.radius || 12;

  // Add autoplay parameter to YouTube URL
  const youtubeUrlWithAutoplay = videoElement.properties.videoType === 'youtube'
    ? `${videoElement.properties.src}${videoElement.properties.src.includes('?') ? '&' : '?'}autoplay=1`
    : videoElement.properties.src;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
        title="Fechar (ESC)"
      >
        <X className="w-6 h-6 text-white" strokeWidth={2} />
      </button>

      {/* Video Container */}
      <div
        className="relative bg-gray-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          width: `${videoElement.width}px`,
          height: `${videoElement.height}px`,
          borderRadius: `${borderRadius}px`,
          boxShadow: videoElement.properties.shadow
            ? `${videoElement.properties.shadow.offsetX}px ${videoElement.properties.shadow.offsetY}px ${videoElement.properties.shadow.blur}px ${videoElement.properties.shadow.color}`
            : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: videoElement.properties.border
            ? `${videoElement.properties.border.width}px solid ${videoElement.properties.border.color}`
            : 'none',
        }}
      >
        {videoElement.properties.videoType === 'youtube' ? (
          <iframe
            src={youtubeUrlWithAutoplay}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              border: 'none',
              borderRadius: `${borderRadius}px`,
            }}
          />
        ) : (
          <video
            src={videoElement.properties.src}
            controls={videoElement.properties.controls}
            autoPlay={true}
            loop={videoElement.properties.loop}
            muted={videoElement.properties.muted}
            className="w-full h-full object-cover"
            style={{
              borderRadius: `${borderRadius}px`,
            }}
          />
        )}
      </div>

      {/* Video Info */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium pointer-events-none">
        {videoElement.properties.videoType === 'youtube' ? 'YouTube Video' : 'Vídeo'} • Clique fora para fechar
      </div>
    </div>
  );
}
