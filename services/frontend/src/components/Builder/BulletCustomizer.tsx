'use client';

import { useState } from 'react';
import { BULLET_TEMPLATES, BulletTemplate, generateBulletSequence } from '@/data/bulletTemplates';
import { X, Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BulletCustomizerProps {
  onClose: () => void;
  onAdd: (svgData: string, name: string) => void;
}

export function BulletCustomizer({ onClose, onAdd }: BulletCustomizerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<BulletTemplate>(BULLET_TEMPLATES[0]);
  const [steps, setSteps] = useState(4);
  const [color, setColor] = useState('#FFEB3B'); // Default to canary yellow (Post-it color)
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [customText, setCustomText] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Check if selected template is a Post-it type
  const isPostitTemplate = selectedTemplate.id.startsWith('postit-');

  const previewSVGs = generateBulletSequence(
    selectedTemplate.id,
    steps,
    color,
    size,
    isPostitTemplate ? { showPin, text: customText } : undefined
  );

  const handleAddToCanvas = (stepIndex: number) => {
    const svgData = previewSVGs[stepIndex];
    const name = `${selectedTemplate.name} - ${customText || (stepIndex + 1).toString().padStart(2, '0')}`;

    // Convert SVG string to data URL
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const reader = new FileReader();
    reader.onload = () => {
      onAdd(reader.result as string, name);
      URL.revokeObjectURL(url);
    };
    reader.readAsDataURL(blob);
  };

  const handleAddAll = () => {
    previewSVGs.forEach((svg, index) => {
      setTimeout(() => {
        const name = `${selectedTemplate.name} - ${customText || (index + 1).toString().padStart(2, '0')}`;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const reader = new FileReader();
        reader.onload = () => {
          onAdd(reader.result as string, name);
          URL.revokeObjectURL(url);
        };
        reader.readAsDataURL(blob);
      }, index * 100);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Personalizar Bullets</h2>
            <p className="text-sm text-slate-600">Crie bullets editáveis para seu design</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Template Selection & Options */}
            <div className="space-y-6">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Escolha o Estilo
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {BULLET_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                        selectedTemplate.id === template.id
                          ? 'border-purple-500 bg-purple-50 shadow-lg'
                          : 'border-slate-200 hover:border-purple-300'
                      }`}
                    >
                      <div
                        className="w-full aspect-square flex items-center justify-center mb-2"
                        dangerouslySetInnerHTML={{ __html: template.thumbnailSVG }}
                      />
                      <p className="text-xs font-medium text-slate-700 text-center">
                        {template.name}
                      </p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">{selectedTemplate.description}</p>
              </div>

              {/* Number of Steps */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Número de Passos: {steps}
                </label>
                <input
                  type="range"
                  min="1"
                  max={selectedTemplate.maxSteps}
                  value={steps}
                  onChange={(e) => setSteps(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1</span>
                  <span>{selectedTemplate.maxSteps}</span>
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Cor</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-lg font-mono text-sm uppercase focus:outline-none focus:border-purple-500"
                    placeholder="#10b981"
                  />
                </div>

                {/* Color Presets */}
                <div className="flex gap-2 mt-3">
                  {isPostitTemplate
                    ? // Post-it color presets
                      ['#FFEB3B', '#FF80AB', '#FFB74D', '#4FC3F7', '#CDDC39', '#80CBC4'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className={`w-10 h-10 rounded-lg border-2 transition-all ${
                            color === c ? 'border-slate-900 scale-110' : 'border-slate-200 hover:scale-105'
                          }`}
                          style={{ backgroundColor: c }}
                          title={
                            c === '#FFEB3B'
                              ? 'Canary Yellow'
                              : c === '#FF80AB'
                              ? 'Neon Pink'
                              : c === '#FFB74D'
                              ? 'Neon Orange'
                              : c === '#4FC3F7'
                              ? 'Electric Blue'
                              : c === '#CDDC39'
                              ? 'Lime Light'
                              : 'Pastel Mint'
                          }
                        />
                      ))
                    : // Classic bullet color presets
                      ['#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#ec4899'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className={`w-10 h-10 rounded-lg border-2 transition-all ${
                            color === c ? 'border-slate-900 scale-110' : 'border-slate-200 hover:scale-105'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tamanho</label>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`flex-1 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        size === s
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-slate-200 text-slate-600 hover:border-purple-300'
                      }`}
                    >
                      {s === 'small' && 'Pequeno'}
                      {s === 'medium' && 'Médio'}
                      {s === 'large' && 'Grande'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Text (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Texto Personalizado (opcional)
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Deixe vazio para números automáticos"
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                  maxLength={4}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Máximo 4 caracteres (ex: A, B, C ou 1º, 2º, 3º)
                </p>
              </div>

              {/* Pin Option (Post-it only) */}
              {isPostitTemplate && (
                <div className="pt-2 border-t border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={showPin}
                      onChange={(e) => setShowPin(e.target.checked)}
                      className="w-5 h-5 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-700 group-hover:text-purple-600 transition-colors">
                        📌 Adicionar Alfinete
                      </p>
                      <p className="text-xs text-slate-500">
                        Adiciona um alfinete vermelho no canto superior direito
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Right: Preview */}
            <div>
              <div className="sticky top-0">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Visualização
                </label>
                <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200 min-h-[400px]">
                  <div className="grid grid-cols-2 gap-4">
                    {previewSVGs.map((svg, index) => (
                      <div key={index} className="relative group">
                        <div
                          className="w-full aspect-square bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center p-4 transition-transform hover:scale-105"
                          dangerouslySetInnerHTML={{ __html: svg }}
                        />
                        <button
                          onClick={() => handleAddToCanvas(index)}
                          className="absolute inset-0 bg-purple-500/0 hover:bg-purple-500/90 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        >
                          <span className="text-white font-semibold text-sm">
                            Adicionar ao Canvas
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={handleAddAll}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Adicionar Todos ao Canvas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
