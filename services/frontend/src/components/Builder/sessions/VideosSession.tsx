// ============================================================================
// Template Builder - Videos Session
// YouTube-hosted videos integration
// ============================================================================

'use client';

import { Video } from 'lucide-react';

export function VideosSession() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Video className="w-4 h-4 text-rose-600" strokeWidth={2.5} />
          Vídeos
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Integração com YouTube</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-3">
            <Video className="w-8 h-8 text-rose-600" strokeWidth={2} />
          </div>
          <h4 className="text-sm font-semibold text-gray-800 mb-1">Em Desenvolvimento</h4>
          <p className="text-xs text-gray-500">
            Integração com YouTube em breve
          </p>
        </div>
      </div>
    </div>
  );
}
