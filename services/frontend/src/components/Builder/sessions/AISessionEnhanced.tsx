// ============================================================================
// Template Builder - Enhanced AI Assistant Session
// OpenAI GPT-4 integration for content creation, rewriting, and translation
// ============================================================================

'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  Wand2,
  Languages,
  FileText,
  Lightbulb,
  Copy,
  Check,
  X
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokensUsed?: number;
  error?: boolean;
}

interface AIContext {
  selectedElement?: any;
  selectedText?: string;
  currentPage?: number;
}

type AIAction =
  | 'chat'
  | 'rewrite'
  | 'translate'
  | 'summarize'
  | 'expand'
  | 'improve'
  | 'generate';

export function AISessionEnhanced() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Olá! Sou seu assistente IA para criar e editar conteúdo. Como posso ajudar?',
      timestamp: new Date(),
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<AIContext>({});
  const [selectedAction, setSelectedAction] = useState<AIAction>('chat');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Quick actions configuration
  const quickActions = [
    {
      id: 'rewrite',
      label: 'Reescrever',
      icon: Wand2,
      color: 'violet',
      prompt: 'Reescreva este texto de forma mais clara e profissional:',
    },
    {
      id: 'translate',
      label: 'Traduzir',
      icon: Languages,
      color: 'blue',
      prompt: 'Traduza este texto para o inglês:',
    },
    {
      id: 'summarize',
      label: 'Resumir',
      icon: FileText,
      color: 'emerald',
      prompt: 'Resuma este texto nos pontos principais:',
    },
    {
      id: 'improve',
      label: 'Melhorar',
      icon: Lightbulb,
      color: 'amber',
      prompt: 'Melhore este texto tornando-o mais persuasivo:',
    },
  ];

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          message: inputMessage,
          context,
          action: selectedAction,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        tokensUsed: data.tokensUsed,
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('AI chat error:', error);

      // Show error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        timestamp: new Date(),
        error: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quick action click
  const handleQuickAction = (action: typeof quickActions[0]) => {
    if (context.selectedText) {
      setInputMessage(`${action.prompt} "${context.selectedText}"`);
      setSelectedAction(action.id as AIAction);
      inputRef.current?.focus();
    } else {
      setInputMessage(action.prompt);
      setSelectedAction(action.id as AIAction);
      inputRef.current?.focus();
    }
  };

  // Handle copy to clipboard
  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-violet-50 via-white to-purple-50">
      {/* Header */}
      <div className="p-3 border-b border-violet-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Assistente IA</h3>
              <p className="text-xs text-gray-500">GPT-4 · Criação de conteúdo</p>
            </div>
          </div>

          {/* Token usage indicator (if available) */}
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            <span className="font-medium">0</span> tokens
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-b border-violet-100 bg-white/60">
        <p className="text-xs font-medium text-gray-600 mb-2">Ações Rápidas</p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg
                bg-${action.color}-50 hover:bg-${action.color}-100
                border border-${action.color}-200
                text-${action.color}-700
                transition-all duration-200
                text-xs font-medium
                hover:scale-105 active:scale-95
              `}
            >
              <action.icon className="w-3.5 h-3.5" strokeWidth={2} />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[85%] rounded-lg p-3
                ${message.role === 'user'
                  ? 'bg-violet-600 text-white'
                  : message.error
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-white border border-gray-200 text-gray-800'
                }
                shadow-sm
              `}
            >
              <div className="text-sm whitespace-pre-wrap leading-relaxed">
                {message.content}
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-opacity-20 border-current">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                  {message.tokensUsed && ` · ${message.tokensUsed} tokens`}
                </span>

                {message.role === 'assistant' && !message.error && (
                  <button
                    onClick={() => handleCopy(message.content, message.id)}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                    title="Copiar resposta"
                  >
                    {copiedId === message.id ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Pensando...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Context Display (if selected text) */}
      {context.selectedText && (
        <div className="px-3 py-2 bg-amber-50 border-t border-amber-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-amber-800 mb-1">Texto Selecionado:</p>
              <p className="text-xs text-amber-700 truncate">"{context.selectedText}"</p>
            </div>
            <button
              onClick={() => setContext({})}
              className="p-1 rounded hover:bg-amber-100"
            >
              <X className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 border-t border-violet-200 bg-white">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem ou selecione uma ação rápida..."
            className="
              flex-1 px-3 py-2 rounded-lg
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
              resize-none
              text-sm
              placeholder:text-gray-400
              min-h-[44px] max-h-[120px]
            "
            rows={1}
            disabled={isLoading}
          />

          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="
              px-4 py-2 rounded-lg
              bg-gradient-to-r from-violet-600 to-purple-600
              text-white font-medium
              hover:from-violet-700 hover:to-purple-700
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              shadow-sm hover:shadow-md
              flex items-center justify-center
              min-w-[44px]
            "
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          <span className="font-medium">Enter</span> para enviar · <span className="font-medium">Shift+Enter</span> para nova linha
        </p>
      </div>
    </div>
  );
}
