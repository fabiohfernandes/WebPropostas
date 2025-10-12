// ============================================================================
// Template Builder - Save Video Template Modal
// AURELIA (Design System) + NOVA (Frontend)
// Save custom video templates with URL, thumbnail, and title
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { X, Youtube, Upload } from 'lucide-react';

interface SaveVideoTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: {
    title: string;
    url: string;
    thumbnail: string;
    videoType: 'youtube' | 'direct';
  }) => void;
}

export function SaveVideoTemplateModal({ isOpen, onClose, onSave }: SaveVideoTemplateModalProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [videoType, setVideoType] = useState<'youtube' | 'direct'>('youtube');
  const [errors, setErrors] = useState<{ title?: string; url?: string; thumbnail?: string }>({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setUrl('');
      setThumbnail('');
      setVideoType('youtube');
      setErrors({});
    }
  }, [isOpen]);

  // Auto-detect YouTube URLs
  useEffect(() => {
    if (url) {
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(youtubeRegex);

      if (match && match[1]) {
        setVideoType('youtube');
        // Auto-generate thumbnail from YouTube if not set
        if (!thumbnail) {
          setThumbnail(`https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`);
        }
      } else {
        setVideoType('direct');
      }
    }
  }, [url]);

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

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setThumbnail(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { title?: string; url?: string; thumbnail?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Digite um título para o vídeo';
    }

    if (!url.trim()) {
      newErrors.url = 'Digite a URL do vídeo';
    }

    if (!thumbnail) {
      newErrors.thumbnail = 'Carregue uma miniatura';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convert YouTube URL to embed format if needed
    let finalUrl = url;
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);

    if (match && match[1]) {
      finalUrl = `https://www.youtube.com/embed/${match[1]}`;
    }

    onSave({
      title: title.trim(),
      url: finalUrl,
      thumbnail,
      videoType,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Salvar Template de Vídeo</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            title="Fechar (ESC)"
          >
            <X className="w-5 h-5 text-gray-500" strokeWidth={2} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título do Vídeo <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors({ ...errors, title: undefined });
              }}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ex: Tutorial de Produto"
              autoFocus
            />
            {errors.title && (
              <p className="text-xs text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL do Vídeo <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setErrors({ ...errors, url: undefined });
              }}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                errors.url ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Cole o link do YouTube ou URL do vídeo"
            />
            {errors.url && (
              <p className="text-xs text-red-600 mt-1">{errors.url}</p>
            )}
            {videoType === 'youtube' && url && (
              <div className="flex items-center gap-1 mt-1">
                <Youtube className="w-3.5 h-3.5 text-rose-600" />
                <p className="text-xs text-rose-600">✓ YouTube detectado</p>
              </div>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Miniatura <span className="text-rose-500">*</span>
            </label>

            {thumbnail ? (
              <div className="space-y-2">
                <div className="relative w-full aspect-video rounded-lg border-2 border-gray-200 overflow-hidden">
                  <img
                    src={thumbnail}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <label className="flex-1 px-3 py-2 text-sm bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer text-center font-medium">
                    <Upload className="w-4 h-4 inline mr-1" />
                    Alterar Miniatura
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setThumbnail('')}
                    className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ) : (
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                errors.thumbnail
                  ? 'border-red-300 bg-red-50 hover:border-red-400'
                  : 'border-gray-300 bg-gray-50 hover:border-rose-400 hover:bg-rose-50'
              }`}>
                <div className="flex flex-col items-center justify-center">
                  <Upload className={`w-8 h-8 mb-2 ${errors.thumbnail ? 'text-red-400' : 'text-gray-400'}`} />
                  <p className="text-sm text-gray-600 font-medium">Carregar miniatura</p>
                  <p className="text-xs text-gray-400">PNG, JPG até 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleThumbnailUpload(e);
                    setErrors({ ...errors, thumbnail: undefined });
                  }}
                  className="hidden"
                />
              </label>
            )}
            {errors.thumbnail && (
              <p className="text-xs text-red-600 mt-1">{errors.thumbnail}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {videoType === 'youtube' && !thumbnail
                ? 'Miniatura do YouTube será carregada automaticamente'
                : 'Recomendado: 1280×720px (16:9)'}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
            >
              Salvar Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
