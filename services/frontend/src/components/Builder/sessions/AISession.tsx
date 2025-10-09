// ============================================================================
// Template Builder - AI Assistant Session
// ChatGPT integration for content creation
// ============================================================================

'use client';

import { Sparkles } from 'lucide-react';

export function AISession() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-600" strokeWidth={2.5} />
          Assistente IA
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Criação de conteúdo com IA</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-3">
            <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
          <h4 className="text-sm font-semibold text-gray-800 mb-1">Em Desenvolvimento</h4>
          <p className="text-xs text-gray-500">
            Integração com ChatGPT em breve
          </p>
        </div>
      </div>
    </div>
  );
}
