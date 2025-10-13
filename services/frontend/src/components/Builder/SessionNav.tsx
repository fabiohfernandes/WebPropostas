// ============================================================================
// Template Builder - Session Navigation (Left Sidebar Icon Nav)
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useState } from 'react';
import {
  LayoutTemplate,
  Type,
  Shapes,
  Frame,
  Image as ImageIcon,
  Video,
  Circle,
  Layers,
  Sparkles,
  Palette,
  Lightbulb,
} from 'lucide-react';
import { useBuilderStore } from '@/store/builder';

interface Session {
  id: 'templates' | 'text' | 'icons' | 'frames' | 'images' | 'videos' | 'bullets-individual' | 'bullets-sets' | 'ai' | 'colors' | 'tips';
  label: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const sessions: Session[] = [
  {
    id: 'templates',
    label: 'Templates',
    icon: <LayoutTemplate className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    id: 'text',
    label: 'Texto',
    icon: <Type className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-indigo-600',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'icons',
    label: 'Ícones',
    icon: <Shapes className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-emerald-600',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'frames',
    label: 'Molduras',
    icon: <Frame className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    id: 'images',
    label: 'Imagens',
    icon: <ImageIcon className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-pink-600',
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    id: 'videos',
    label: 'Vídeos',
    icon: <Video className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-rose-600',
    gradient: 'from-rose-500 to-rose-600',
  },
  {
    id: 'bullets-individual',
    label: 'Bullets',
    icon: <Circle className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-amber-600',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    id: 'bullets-sets',
    label: 'Conjuntos',
    icon: <Layers className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    id: 'ai',
    label: 'IA',
    icon: <Sparkles className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-violet-600',
    gradient: 'from-violet-500 to-violet-600',
  },
  {
    id: 'colors',
    label: 'Cores',
    icon: <Palette className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-fuchsia-600',
    gradient: 'from-fuchsia-500 to-fuchsia-600',
  },
  {
    id: 'tips',
    label: 'Dicas',
    icon: <Lightbulb className="w-5 h-5" strokeWidth={2.5} />,
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-yellow-600',
  },
];

export function SessionNav() {
  const { activeSession, setActiveSession } = useBuilderStore();
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  return (
    <>
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2">
        {sessions.map((session) => {
          const isActive = activeSession === session.id;

          return (
            <button
              key={session.id}
              onClick={() => setActiveSession(session.id)}
              onMouseEnter={(e) => {
                setHoveredSession(session.id);
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPosition({
                  x: rect.right + 8,
                  y: rect.top + rect.height / 2
                });
              }}
              onMouseLeave={() => setHoveredSession(null)}
              className={`
                group relative w-12 h-12 rounded-xl flex items-center justify-center
                transition-all duration-200
                ${isActive
                  ? `bg-gradient-to-br ${session.gradient} shadow-lg scale-105`
                  : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
                }
              `}
            >
              <div className={isActive ? 'text-white' : session.color}>
                {session.icon}
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className={`absolute -right-1 w-1 h-8 rounded-full bg-gradient-to-b ${session.gradient}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Fixed positioned tooltip - rendered at document level */}
      {hoveredSession && (
        <div
          className="fixed px-3 py-1.5 bg-gray-100 text-gray-900 text-sm font-medium rounded border border-gray-300 whitespace-nowrap pointer-events-none transition-opacity duration-150 shadow-lg z-[9999]"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateY(-50%)'
          }}
        >
          {sessions.find(s => s.id === hoveredSession)?.label}
        </div>
      )}
    </>
  );
}
