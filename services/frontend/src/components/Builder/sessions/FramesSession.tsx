// ============================================================================
// Template Builder - Frames Session
// Image framing and emphasis tools (Canva-style)
// ============================================================================

'use client';

import { Frame } from 'lucide-react';

export function FramesSession() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Frame className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
          Molduras
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Enquadre suas imagens</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <Frame className="w-8 h-8 text-blue-600" strokeWidth={2} />
          </div>
          <h4 className="text-sm font-semibold text-gray-800 mb-1">Em Desenvolvimento</h4>
          <p className="text-xs text-gray-500">
            Molduras estilo Canva em breve
          </p>
        </div>
      </div>
    </div>
  );
}
