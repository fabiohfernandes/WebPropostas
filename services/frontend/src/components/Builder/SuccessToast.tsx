// ============================================================================
// Template Builder - Success Toast Notification
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface SuccessToastProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  duration?: number; // Auto-close duration in ms (default 4000)
}

export function SuccessToast({ isVisible, onClose, title, message, duration = 4000 }: SuccessToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-white rounded-xl shadow-2xl border border-green-200 overflow-hidden max-w-md">
        {/* Green accent bar */}
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500" />

        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 p-2 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" strokeWidth={2.5} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              title="Fechar"
            >
              <X className="w-4 h-4 text-gray-400" strokeWidth={2} />
            </button>
          </div>

          {/* Progress bar */}
          {duration > 0 && (
            <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 animate-progress"
                style={{
                  animation: `progress ${duration}ms linear forwards`
                }}
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-progress {
          animation: progress ${duration}ms linear forwards;
        }

        @keyframes slide-in-from-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-in.slide-in-from-right {
          animation: slide-in-from-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
