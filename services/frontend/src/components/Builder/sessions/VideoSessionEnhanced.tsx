// ============================================================================
// Template Builder - Video Session Enhanced
// AURELIA (Design System) + NOVA (Frontend)
// YouTube video integration with popular templates
// ============================================================================

'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Video, Play, Plus, Search, Youtube, Save } from 'lucide-react';
import { useBuilderStore } from '@/store/builder';
import { SaveVideoTemplateModal } from '../SaveVideoTemplateModal';
import type { VideoElement } from '@/types/builder';

interface VideoPreset {
  id: string;
  label: string;
  videoType: 'youtube' | 'direct';
  src: string;
  thumbnail: string;
  category: 'business' | 'education' | 'marketing' | 'tutorial';
  defaultProps: Partial<VideoElement>;
}

// Default empty - user creates their own templates
const INITIAL_VIDEO_PRESETS: VideoPreset[] = [];

function DraggableVideoPreset({ preset }: { preset: VideoPreset }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `video-preset-${preset.id}`,
    data: {
      type: 'video',
      defaultProps: preset.defaultProps,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`group relative bg-white rounded-lg border-2 border-gray-200 hover:border-rose-400 transition-all cursor-move overflow-hidden ${
        isDragging ? 'opacity-50 scale-95' : 'hover:scale-105'
      }`}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-900">
        <img
          src={preset.thumbnail}
          alt={preset.label}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all">
          <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white fill-white ml-1" strokeWidth={0} />
          </div>
        </div>

        {/* Video Type Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-rose-600 text-white text-xs font-semibold rounded flex items-center gap-1 shadow-md">
          <Youtube className="w-3 h-3" strokeWidth={2.5} />
          YouTube
        </div>
      </div>

      {/* Video Label */}
      <div className="p-2 text-center">
        <p className="text-xs font-medium text-gray-800 truncate">{preset.label}</p>
        <p className="text-xs text-gray-500">{preset.defaultProps.width}×{preset.defaultProps.height}px</p>
      </div>
    </div>
  );
}

export function VideoSessionEnhanced() {
  const { addElement, currentPage } = useBuilderStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [videoPresets, setVideoPresets] = useState<VideoPreset[]>(INITIAL_VIDEO_PRESETS);

  const filteredPresets = videoPresets.filter((preset) =>
    preset.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveVideoTemplate = (template: { title: string; url: string; thumbnail: string; videoType: 'youtube' | 'direct' }) => {
    const newPreset: VideoPreset = {
      id: `custom-${Date.now()}`,
      label: template.title,
      videoType: template.videoType,
      src: template.url,
      thumbnail: template.thumbnail,
      category: 'business',
      defaultProps: {
        width: 640,
        height: 360,
        properties: {
          src: template.url,
          videoType: template.videoType,
          autoPlay: false,
          loop: false,
          muted: false,
          controls: true,
          thumbnail: template.thumbnail,
          border: {
            width: 0,
            color: '#000000',
            radius: 12,
          },
        },
      },
    };

    setVideoPresets([...videoPresets, newPreset]);
  };

  const handleAddCustomVideo = () => {
    if (!customUrl.trim()) return;

    const page = currentPage();
    if (!page) return;

    // Extract YouTube video ID if it's a YouTube URL
    let videoSrc = customUrl;
    let videoType: 'youtube' | 'direct' = 'direct';

    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = customUrl.match(youtubeRegex);

    if (match && match[1]) {
      videoSrc = `https://www.youtube.com/embed/${match[1]}`;
      videoType = 'youtube';
    }

    const canvasCenter = {
      x: page.canvasSize.width / 2,
      y: page.canvasSize.height / 2,
    };

    const newVideo: VideoElement = {
      id: `video-${Date.now()}`,
      type: 'video',
      x: canvasCenter.x,
      y: canvasCenter.y,
      width: 640,
      height: 360,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        src: videoSrc,
        videoType,
        autoPlay: false,
        loop: false,
        muted: false,
        controls: true,
        border: {
          width: 0,
          color: '#000000',
          radius: 12,
        },
      },
    };

    addElement(newVideo);
    setCustomUrl('');
    setShowCustomInput(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Video className="w-4 h-4 text-rose-600" strokeWidth={2.5} />
          Vídeos
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Arraste para o canvas</p>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Buscar vídeos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Custom YouTube URL Input */}
      <div className="p-3 border-b border-gray-200">
        {showCustomInput ? (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Cole o link do YouTube..."
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddCustomVideo();
                if (e.key === 'Escape') {
                  setShowCustomInput(false);
                  setCustomUrl('');
                }
              }}
              className="w-full px-3 py-1.5 text-xs border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddCustomVideo}
                disabled={!customUrl.trim()}
                className="flex-1 px-3 py-1.5 bg-rose-600 text-white text-xs font-medium rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Adicionar
              </button>
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomUrl('');
                }}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowSaveModal(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-rose-50 text-rose-700 text-xs font-medium rounded-lg hover:bg-rose-100 transition-colors"
          >
            <Save className="w-4 h-4" strokeWidth={2.5} />
            Salvar Template
          </button>
        )}
      </div>

      {/* Video Presets Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-1 gap-3">
          {filteredPresets.map((preset) => (
            <DraggableVideoPreset key={preset.id} preset={preset} />
          ))}
        </div>

        {filteredPresets.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-3">
              <Video className="w-8 h-8 text-rose-600" strokeWidth={2} />
            </div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              {searchTerm ? 'Nenhum vídeo encontrado' : 'Nenhum template salvo'}
            </h4>
            <p className="text-xs text-gray-500">
              {searchTerm ? 'Tente outro termo de busca' : 'Clique em "Salvar Template" para criar seu primeiro vídeo'}
            </p>
          </div>
        )}
      </div>

      {/* Save Video Template Modal */}
      <SaveVideoTemplateModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveVideoTemplate}
      />
    </div>
  );
}
