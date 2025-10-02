'use client';

/**
 * Proposal Editor Component
 *
 * Split-view editor with AI chat for proposal refinement
 * - Left: Section navigation tree
 * - Center: Markdown preview
 * - Right: Floating chat interface for AI adjustments
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import ReactMarkdown from 'react-markdown';

interface Section {
  id: string;
  name: string;
  status: 'complete' | 'warning' | 'incomplete';
  content: string;
}

interface ProposalData {
  id: string;
  title: string;
  markdown: string;
  sections: Section[];
  metadata: {
    clientName: string;
    proposalType: string;
    createdAt: string;
    aiModel: string;
    tokensUsed: number;
  };
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  updatedSections?: string[];
}

interface Props {
  proposalId: string;
  onPublish?: (proposalId: string) => void;
}

export function ProposalEditor({ proposalId, onPublish }: Props) {
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('all');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'markdown'>('preview');
  const [versions, setVersions] = useState<any[]>([]);

  /**
   * Load proposal data on mount
   */
  useEffect(() => {
    loadProposal();
    loadVersions();
  }, [proposalId]);

  /**
   * Load proposal data from API
   */
  const loadProposal = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/ai/proposals/${proposalId}`);
      setProposal(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error('Error loading proposal:', err);
      setError(err.response?.data?.error || 'Falha ao carregar proposta');
      setLoading(false);
    }
  };

  /**
   * Load version history
   */
  const loadVersions = async () => {
    try {
      const response = await api.get(`/ai/proposals/${proposalId}/versions`);
      setVersions(response.data.versions || []);
    } catch (err) {
      console.error('Error loading versions:', err);
    }
  };

  /**
   * Send chat message to AI
   */
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatInput.trim() || chatLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await api.post(`/ai/proposals/${proposalId}/chat`, {
        message: userMessage.content,
        context: {
          activeSection,
          currentVersion: versions.length,
        },
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
        updatedSections: response.data.updatedSections,
      };

      setChatMessages((prev) => [...prev, assistantMessage]);

      // If sections were updated, reload proposal
      if (response.data.updatedSections?.length > 0) {
        await loadProposal();
        await loadVersions();
      }
    } catch (err: any) {
      console.error('Error in chat:', err);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setChatLoading(false);
    }
  };

  /**
   * Publish proposal (finalize and send to client)
   */
  const handlePublish = async () => {
    if (!confirm('Tem certeza que deseja publicar esta proposta? Ela será enviada ao cliente.')) {
      return;
    }

    try {
      await api.post(`/ai/proposals/${proposalId}/publish`);
      onPublish?.(proposalId);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Falha ao publicar proposta');
    }
  };

  /**
   * Download as PDF
   */
  const handleDownloadPDF = async () => {
    try {
      const response = await api.get(`/ai/proposals/${proposalId}/pdf`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `proposta-${proposalId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Falha ao gerar PDF. Tente novamente.');
    }
  };

  /**
   * Scroll to section
   */
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId !== 'all') {
      const element = document.getElementById(`section-${sectionId}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          ⏳
        </motion.div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error || 'Proposta não encontrada'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-secondary-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-secondary-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-secondary-900">{proposal.title}</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            v{versions.length || 1}
          </span>
          <span className="text-sm text-secondary-500">
            {proposal.metadata.aiModel === 'gpt-o1' ? '🧠 GPT-o1' : '⚡ GPT-4o'}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex bg-secondary-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'preview'
                  ? 'bg-white text-secondary-900 shadow-sm'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              👁️ Preview
            </button>
            <button
              onClick={() => setViewMode('markdown')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'markdown'
                  ? 'bg-white text-secondary-900 shadow-sm'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              📝 Markdown
            </button>
          </div>

          {/* AI Chat Toggle */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              chatOpen
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            🤖 AI Chat
          </button>

          {/* Download PDF */}
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 text-sm font-medium"
          >
            📄 PDF
          </button>

          {/* Publish */}
          <button
            onClick={handlePublish}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium shadow-sm"
          >
            ✅ Publicar Proposta
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Section Navigation */}
        <div className="w-80 bg-white border-r border-secondary-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-sm font-semibold text-secondary-900 uppercase tracking-wide mb-4">
              Navegação
            </h2>

            <div className="space-y-2">
              {/* All Sections */}
              <button
                onClick={() => scrollToSection('all')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'all'
                    ? 'bg-primary-50 text-primary-900 border-l-4 border-primary-600'
                    : 'hover:bg-secondary-50 text-secondary-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">📋 Todas as Seções</span>
                </div>
              </button>

              <div className="border-t border-secondary-200 my-4"></div>

              {/* Individual Sections */}
              {proposal.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-50 text-primary-900 border-l-4 border-primary-600'
                      : 'hover:bg-secondary-50 text-secondary-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{section.name}</span>
                    <span className="text-lg">
                      {section.status === 'complete' && '✅'}
                      {section.status === 'warning' && '⚠️'}
                      {section.status === 'incomplete' && '📝'}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Version History */}
            {versions.length > 1 && (
              <>
                <div className="border-t border-secondary-200 my-6"></div>
                <h3 className="text-sm font-semibold text-secondary-900 uppercase tracking-wide mb-3">
                  Histórico
                </h3>
                <div className="space-y-2 text-sm">
                  {versions.slice(0, 5).map((version) => (
                    <div key={version.id} className="flex items-center justify-between text-secondary-600">
                      <span>v{version.version_number}</span>
                      <span className="text-xs">
                        {new Date(version.created_at).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center - Proposal Preview */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {viewMode === 'preview' ? (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-4xl font-bold text-secondary-900 mb-6">{children}</h1>
                    ),
                    h2: ({ children }) => {
                      const id = children?.toString().toLowerCase().replace(/\s+/g, '-');
                      return (
                        <h2 id={`section-${id}`} className="text-3xl font-bold text-secondary-900 mt-12 mb-4">
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children }) => (
                      <h3 className="text-2xl font-semibold text-secondary-800 mt-8 mb-3">{children}</h3>
                    ),
                    p: ({ children }) => <p className="text-secondary-700 leading-relaxed mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>,
                    li: ({ children }) => <li className="text-secondary-700">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-secondary-900">{children}</strong>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary-500 pl-4 italic text-secondary-600 my-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {proposal.markdown}
                </ReactMarkdown>
              </div>
            ) : (
              <pre className="bg-secondary-900 text-green-400 p-6 rounded-lg overflow-x-auto font-mono text-sm">
                {proposal.markdown}
              </pre>
            )}
          </div>
        </div>

        {/* Right Sidebar - AI Chat (Floating) */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-96 bg-white border-l border-secondary-200 flex flex-col"
            >
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-secondary-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-secondary-900">🤖 Assistente IA</h3>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="text-secondary-400 hover:text-secondary-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-secondary-500 mt-1">
                  Peça ajustes, revisões ou melhorias na proposta
                </p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-secondary-500 text-sm mt-8">
                    <p>👋 Olá! Como posso ajudar a melhorar esta proposta?</p>
                    <div className="mt-4 space-y-2 text-xs text-left bg-secondary-50 p-4 rounded-lg">
                      <p className="font-semibold text-secondary-700">Exemplos:</p>
                      <p>• "Adicione um case de sucesso na seção de credibilidade"</p>
                      <p>• "Torne o cronograma mais detalhado"</p>
                      <p>• "Reduza o preço em 10% e ajuste o escopo"</p>
                    </div>
                  </div>
                )}

                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.updatedSections && message.updatedSections.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-secondary-300">
                          <p className="text-xs font-semibold">Seções atualizadas:</p>
                          {message.updatedSections.map((section) => (
                            <p key={section} className="text-xs">
                              ✓ {section}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary-100 rounded-lg px-4 py-3">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-sm text-secondary-600"
                      >
                        🤖 Pensando...
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-secondary-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    disabled={chatLoading}
                    className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-secondary-100"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || chatLoading}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ↑
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
