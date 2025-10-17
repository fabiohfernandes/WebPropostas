'use client';

import { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { BULLET_CATEGORIES, BulletGraphic } from '@/types/bullet';
import { POSTIT_BULLETS } from '@/data/postitBullets';
import { Search, Settings, Upload, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { BulletCustomizer } from '../BulletCustomizer';

interface BulletItemProps {
  bullet: BulletGraphic;
}

function BulletItem({ bullet }: BulletItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bullet-${bullet.id}`,
    data: {
      type: 'bullet',
      defaultProps: {
        width: bullet.defaultWidth,
        height: bullet.defaultHeight,
        properties: {
          bulletId: bullet.id,
          imageUrl: bullet.imageUrl,
          name: bullet.name,
        },
      },
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-2 cursor-grab active:cursor-grabbing border border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all hover:scale-105 hover:shadow-lg ${
        isDragging ? 'opacity-50' : ''
      }`}
      title={bullet.name}
    >
      {/* Bullet Preview */}
      <div className="aspect-square bg-slate-50 dark:bg-slate-900/50 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
        <img
          src={bullet.imageUrl}
          alt={bullet.name}
          className="max-w-full max-h-full object-contain p-1"
        />
      </div>

      {/* Bullet Name */}
      <div className="text-center">
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
          {bullet.name}
        </p>
      </div>

      {/* Drag Indicator */}
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
      </div>

      {/* Premium Badge */}
      {bullet.isPremium && (
        <div className="absolute top-1 left-1">
          <span className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded font-bold">
            PRO
          </span>
        </div>
      )}
    </div>
  );
}

export function BulletsSessionEnhanced() {
  const [bullets, setBullets] = useState<BulletGraphic[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Load bullets from localStorage (admin selections) + Pre-made Post-its
  useEffect(() => {
    const loadBullets = () => {
      const saved = localStorage.getItem('admin_bullet_graphics');
      let customBullets: BulletGraphic[] = [];

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Only show active bullets to users
          customBullets = parsed.filter((b: BulletGraphic) => b.isActive);
        } catch (e) {
          console.error('Failed to load bullets:', e);
          customBullets = [];
        }
      }

      // Combine pre-made Post-its with custom bullets
      const postits = POSTIT_BULLETS.map(p => ({
        ...p,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      setBullets([...postits, ...customBullets]);
      setIsLoading(false);
    };

    loadBullets();

    // Listen for storage changes (when admin uploads new bullets)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_bullet_graphics') {
        loadBullets();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter bullets based on category and search
  const filteredBullets = bullets.filter((bullet) => {
    const matchesCategory = selectedCategory === 'all' || bullet.category === selectedCategory;
    const matchesSearch =
      bullet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bullet.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Count bullets per category
  const categoryCounts = BULLET_CATEGORIES.map((cat) => ({
    ...cat,
    count: bullets.filter((b) => b.category === cat.id).length,
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Bullets Gráficos</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowCustomizer(true)}
              className="p-1.5 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
              title="Criar Bullet Personalizado"
            >
              <Wand2 className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            </button>
            <Link
              href="/admin/bullets"
              target="_blank"
              className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Gerenciar bullets (Admin)"
            >
              <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar bullets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-slate-100"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            Todos ({bullets.length})
          </button>
          {categoryCounts
            .filter((cat) => cat.count > 0)
            .map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {cat.icon} {cat.name} ({cat.count})
              </button>
            ))}
        </div>
      </div>

      {/* Bullets Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-slate-500 dark:text-slate-400">Carregando...</div>
          </div>
        ) : filteredBullets.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredBullets.map((bullet) => (
              <BulletItem key={bullet.id} bullet={bullet} />
            ))}
          </div>
        ) : bullets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
              Crie seus bullets personalizados
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
              12 templates profissionais prontos para usar
            </p>
            <button
              onClick={() => setShowCustomizer(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Wand2 className="w-4 h-4 inline mr-2" />
              Abrir Personalizador
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              Nenhum bullet encontrado
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Tente ajustar os filtros ou a busca
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex-shrink-0 p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          {bullets.length > 0
            ? `${bullets.length} bullets disponíveis`
            : 'Clique na varinha mágica ✨ para criar bullets'}
        </p>
      </div>

      {/* Bullet Customizer Modal */}
      {showCustomizer && (
        <BulletCustomizer
          onClose={() => setShowCustomizer(false)}
          onAdd={(svgData, name) => {
            // Add generated bullet to localStorage
            const newBullet: BulletGraphic = {
              id: `custom-${Date.now()}`,
              name,
              category: 'custom',
              imageUrl: svgData,
              tags: ['personalizado', 'gerado'],
              isPremium: false,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              usageCount: 0,
              defaultWidth: 120,
              defaultHeight: 120,
              aspectRatio: 1,
              fileFormat: 'svg',
            };

            const saved = localStorage.getItem('admin_bullet_graphics');
            const existing = saved ? JSON.parse(saved) : [];
            localStorage.setItem('admin_bullet_graphics', JSON.stringify([...existing, newBullet]));

            // Reload bullets
            setBullets([...bullets, newBullet]);
          }}
        />
      )}
    </div>
  );
}
