'use client';

import { useState, useEffect } from 'react';
import { BULLET_CATEGORIES, BulletGraphic, BulletCategory } from '@/types/bullet';
import { Button } from '@/components/ui/button';
import {
  Search,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Download,
  Filter,
  Grid3x3,
  List,
  Plus,
  X,
  Image as ImageIcon,
} from 'lucide-react';

export default function AdminBulletsPage() {
  const [bullets, setBullets] = useState<BulletGraphic[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedBullets, setSelectedBullets] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'usage'>('date');

  // Load bullets from localStorage (will be API later)
  useEffect(() => {
    const saved = localStorage.getItem('admin_bullet_graphics');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBullets(parsed);
      } catch (e) {
        console.error('Failed to load bullets:', e);
      }
    }
  }, []);

  // Save to localStorage whenever bullets change
  const saveBullets = (newBullets: BulletGraphic[]) => {
    setBullets(newBullets);
    localStorage.setItem('admin_bullet_graphics', JSON.stringify(newBullets));
  };

  // Filter and sort bullets
  const filteredBullets = bullets
    .filter((bullet) => {
      const matchesCategory = selectedCategory === 'all' || bullet.category === selectedCategory;
      const matchesSearch =
        bullet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bullet.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'usage':
          return (b.usageCount || 0) - (a.usageCount || 0);
        default:
          return 0;
      }
    });

  const toggleBulletSelection = (id: string) => {
    setSelectedBullets((prev) =>
      prev.includes(id) ? prev.filter((bulletId) => bulletId !== id) : [...prev, id]
    );
  };

  const toggleBulletActive = (id: string) => {
    const updated = bullets.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b));
    saveBullets(updated);
  };

  const deleteBullet = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este bullet?')) {
      saveBullets(bullets.filter((b) => b.id !== id));
    }
  };

  const deleteBulkBullets = () => {
    if (confirm(`Excluir ${selectedBullets.length} bullets selecionados?`)) {
      saveBullets(bullets.filter((b) => !selectedBullets.includes(b.id)));
      setSelectedBullets([]);
    }
  };

  const stats = {
    total: bullets.length,
    active: bullets.filter((b) => b.isActive).length,
    custom: bullets.filter((b) => b.category === 'custom').length,
    categories: BULLET_CATEGORIES.map((cat) => ({
      ...cat,
      count: bullets.filter((b) => b.category === cat.id).length,
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Gerenciamento de Bullets Gráficos</h1>
          <p className="text-slate-300">
            Upload e gerenciar bullets decorativos para apresentações e gráficos
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
            <div className="text-slate-400 text-sm mb-1">Total de Bullets</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
            <div className="text-slate-400 text-sm mb-1">Ativos</div>
            <div className="text-3xl font-bold text-green-400">{stats.active}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
            <div className="text-slate-400 text-sm mb-1">Inativos</div>
            <div className="text-3xl font-bold text-orange-400">{stats.total - stats.active}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
            <div className="text-slate-400 text-sm mb-1">Personalizados</div>
            <div className="text-3xl font-bold text-purple-400">{stats.custom}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar bullets ou tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="date">Mais recentes</option>
              <option value="name">Nome (A-Z)</option>
              <option value="usage">Mais usados</option>
            </select>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Button */}
            <Button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Bullets
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedBullets.length > 0 && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-purple-500/20 rounded-lg border border-purple-400">
              <span className="text-white font-medium">{selectedBullets.length} selecionados</span>
              <Button
                onClick={deleteBulkBullets}
                variant="outline"
                size="sm"
                className="bg-red-500/20 border-red-400 text-red-300 hover:bg-red-500/30"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Excluir
              </Button>
              <Button
                onClick={() => setSelectedBullets([])}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Cancelar
              </Button>
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              Todos ({bullets.length})
            </button>
            {stats.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {cat.icon} {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Bullets Grid/List */}
        {filteredBullets.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredBullets.map((bullet) => (
                <BulletCard
                  key={bullet.id}
                  bullet={bullet}
                  isSelected={selectedBullets.includes(bullet.id)}
                  onToggleSelection={toggleBulletSelection}
                  onToggleActive={toggleBulletActive}
                  onDelete={deleteBullet}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredBullets.map((bullet) => (
                <BulletListItem
                  key={bullet.id}
                  bullet={bullet}
                  isSelected={selectedBullets.includes(bullet.id)}
                  onToggleSelection={toggleBulletSelection}
                  onToggleActive={toggleBulletActive}
                  onDelete={deleteBullet}
                />
              ))}
            </div>
          )
        ) : (
          <EmptyState onUpload={() => setShowUploadModal(true)} />
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <UploadBulletModal
            onClose={() => setShowUploadModal(false)}
            onUpload={(newBullet) => {
              saveBullets([...bullets, newBullet]);
              setShowUploadModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

// Bullet Card Component (Grid View)
function BulletCard({
  bullet,
  isSelected,
  onToggleSelection,
  onToggleActive,
  onDelete,
}: {
  bullet: BulletGraphic;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className={`relative bg-white/10 backdrop-blur-md rounded-xl border-2 p-4 cursor-pointer transition-all hover:scale-105 ${
        isSelected
          ? 'border-purple-500 shadow-lg shadow-purple-500/50'
          : 'border-white/20 hover:border-white/40'
      } ${!bullet.isActive && 'opacity-50'}`}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-2 left-2 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelection(bullet.id)}
          className="w-5 h-5 rounded border-2 border-white/40 bg-white/10 checked:bg-purple-500"
        />
      </div>

      {/* Status Badge */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => onToggleActive(bullet.id)}
          className={`p-1.5 rounded-full transition-colors ${
            bullet.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
          }`}
          title={bullet.isActive ? 'Ativo' : 'Inativo'}
        >
          {bullet.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {/* Bullet Image */}
      <div className="aspect-square bg-white/5 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        <img
          src={bullet.imageUrl}
          alt={bullet.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Bullet Info */}
      <div className="text-center mb-2">
        <h3 className="text-white font-medium text-sm truncate mb-1">{bullet.name}</h3>
        <span className="inline-block px-2 py-1 bg-white/10 rounded text-xs text-slate-300">
          {BULLET_CATEGORIES.find((c) => c.id === bullet.category)?.name}
        </span>
      </div>

      {/* Tags */}
      {bullet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {bullet.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded">
              {tag}
            </span>
          ))}
          {bullet.tags.length > 2 && (
            <span className="text-xs px-2 py-0.5 bg-white/10 text-slate-400 rounded">
              +{bullet.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onDelete(bullet.id)}
          className="flex-1 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
          title="Excluir"
        >
          <Trash2 className="w-4 h-4 mx-auto" />
        </button>
        <button
          onClick={() => window.open(bullet.imageUrl, '_blank')}
          className="flex-1 p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors"
          title="Ver original"
        >
          <Download className="w-4 h-4 mx-auto" />
        </button>
      </div>

      {/* Usage Stats */}
      {bullet.usageCount !== undefined && (
        <div className="mt-2 text-xs text-slate-400 text-center">
          Usado {bullet.usageCount}x
        </div>
      )}
    </div>
  );
}

// Bullet List Item Component (List View)
function BulletListItem({
  bullet,
  isSelected,
  onToggleSelection,
  onToggleActive,
  onDelete,
}: {
  bullet: BulletGraphic;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-xl border-2 p-4 flex items-center gap-4 transition-all ${
        isSelected
          ? 'border-purple-500 shadow-lg shadow-purple-500/50'
          : 'border-white/20 hover:border-white/40'
      } ${!bullet.isActive && 'opacity-50'}`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelection(bullet.id)}
        className="w-5 h-5 rounded border-2 border-white/40 bg-white/10 checked:bg-purple-500"
      />

      <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
        <img src={bullet.imageUrl} alt={bullet.name} className="max-w-full max-h-full object-contain" />
      </div>

      <div className="flex-1">
        <h3 className="text-white font-medium mb-1">{bullet.name}</h3>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="px-2 py-1 bg-white/10 rounded text-xs text-slate-300">
            {BULLET_CATEGORIES.find((c) => c.id === bullet.category)?.name}
          </span>
          {bullet.tags.map((tag, idx) => (
            <span key={idx} className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleActive(bullet.id)}
          className={`p-2 rounded-lg transition-colors ${
            bullet.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
          }`}
        >
          {bullet.isActive ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
        <button
          onClick={() => onDelete(bullet.id)}
          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({ onUpload }: { onUpload: () => void }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-12 text-center">
      <ImageIcon className="w-24 h-24 text-slate-400 mx-auto mb-6" />
      <h3 className="text-2xl font-semibold text-white mb-3">Nenhum bullet encontrado</h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">
        Faça upload de bullets decorativos em PNG ou SVG para começar a usar no editor
      </p>
      <Button
        onClick={onUpload}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
      >
        <Upload className="w-5 h-5 mr-2" />
        Fazer Upload
      </Button>
    </div>
  );
}

// Upload Modal Component
function UploadBulletModal({
  onClose,
  onUpload,
}: {
  onClose: () => void;
  onUpload: (bullet: BulletGraphic) => void;
}) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<BulletCategory>('presentation');
  const [tags, setTags] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageFile || !imagePreview) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    setIsUploading(true);

    // Create bullet object
    const newBullet: BulletGraphic = {
      id: `bullet-${Date.now()}`,
      name,
      category,
      imageUrl: imagePreview, // In production, upload to S3 first
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      isPremium: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0,
      defaultWidth: 48,
      defaultHeight: 48,
      aspectRatio: 1,
      fileSize: imageFile.size,
      fileFormat: imageFile.type.includes('svg') ? 'svg' : 'png',
    };

    setTimeout(() => {
      onUpload(newBullet);
      setIsUploading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Upload Bullet Gráfico</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Imagem do Bullet *
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                imagePreview
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/20 hover:border-purple-500/50'
              }`}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-48 mx-auto object-contain"
                  />
                  <label className="inline-block px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg cursor-pointer transition-colors">
                    Alterar Imagem
                    <input
                      type="file"
                      accept="image/png,image/svg+xml,image/jpeg,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-white font-medium mb-1">Clique para fazer upload</p>
                  <p className="text-slate-400 text-sm">PNG, SVG, JPG ou WebP (max 5MB)</p>
                  <input
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Nome do Bullet *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Seta Vermelha 3D"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Categoria *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as BulletCategory)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              {BULLET_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ex: 3d, vermelho, seta, moderno"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-slate-400 text-sm mt-1">
              Tags ajudam na busca e organização dos bullets
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/20">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isUploading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              {isUploading ? 'Fazendo upload...' : 'Fazer Upload'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
