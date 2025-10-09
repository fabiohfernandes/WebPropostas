// ============================================================================
// Template Builder - Templates Session
// Pre-made template library for quick starts
// ============================================================================

'use client';

import { LayoutTemplate } from 'lucide-react';

export function TemplatesSession() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-purple-600" strokeWidth={2.5} />
          Templates
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Modelos prontos para começar</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
            <LayoutTemplate className="w-8 h-8 text-purple-600" strokeWidth={2} />
          </div>
          <h4 className="text-sm font-semibold text-gray-800 mb-1">Em Desenvolvimento</h4>
          <p className="text-xs text-gray-500">
            Templates prontos estarão disponíveis em breve
          </p>
        </div>
      </div>
    </div>
  );
}
