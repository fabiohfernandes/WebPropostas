// ============================================================================
// Template Builder - Tips & Ideas Session
// Contextual guidance for better designs
// ============================================================================

'use client';

import { Lightbulb } from 'lucide-react';

export function TipsSession() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-600" strokeWidth={2.5} />
          Dicas
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Sugestões e tutoriais</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
            <Lightbulb className="w-8 h-8 text-yellow-600" strokeWidth={2} />
          </div>
          <h4 className="text-sm font-semibold text-gray-800 mb-1">Em Desenvolvimento</h4>
          <p className="text-xs text-gray-500">
            Dicas contextuais em breve
          </p>
        </div>
      </div>
    </div>
  );
}
