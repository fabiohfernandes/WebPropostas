// ============================================================================
// Toast Component - Notification System
// ============================================================================

import React, { useEffect, useState } from 'react';
import { cn } from '@/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  /** Toast message */
  message: string;
  /** Toast type */
  type?: ToastType;
  /** Auto dismiss duration in ms */
  duration?: number;
  /** Show close button */
  showClose?: boolean;
  /** On close callback */
  onClose?: () => void;
  /** Position */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  showClose = true,
  onClose,
  position = 'top-right',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // Wait for animation
  };

  const typeStyles = {
    success: {
      bg: 'bg-success-50 border-success-200',
      icon: 'text-success-600',
      text: 'text-success-900',
    },
    error: {
      bg: 'bg-error-50 border-error-200',
      icon: 'text-error-600',
      text: 'text-error-900',
    },
    warning: {
      bg: 'bg-warning-50 border-warning-200',
      icon: 'text-warning-600',
      text: 'text-warning-900',
    },
    info: {
      bg: 'bg-primary-50 border-primary-200',
      icon: 'text-primary-600',
      text: 'text-primary-900',
    },
  };

  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return (
    <div
      className={cn(
        'fixed z-50 pointer-events-auto',
        positionStyles[position],
        'transition-all duration-300',
        isVisible
          ? 'opacity-100 translate-y-0'
          : position.startsWith('top')
          ? 'opacity-0 -translate-y-2'
          : 'opacity-0 translate-y-2'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border',
          'min-w-[300px] max-w-md backdrop-blur-sm',
          typeStyles[type].bg
        )}
      >
        {/* Icon */}
        <div className={cn('flex-shrink-0', typeStyles[type].icon)}>
          {icons[type]}
        </div>

        {/* Message */}
        <p className={cn('flex-1 text-sm font-medium', typeStyles[type].text)}>
          {message}
        </p>

        {/* Close Button */}
        {showClose && (
          <button
            onClick={handleClose}
            className={cn(
              'flex-shrink-0 hover:opacity-70 transition-opacity',
              typeStyles[type].icon
            )}
            aria-label="Fechar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Toast Container for managing multiple toasts
export interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
  }>;
  onRemove: (id: string) => void;
  position?: ToastProps['position'];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
  position = 'top-right',
}) => {
  return (
    <>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            transform: `translateY(${index * 70}px)`,
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => onRemove(toast.id)}
            position={position}
          />
        </div>
      ))}
    </>
  );
};

export default Toast;
