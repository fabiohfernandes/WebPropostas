// ============================================================================
// Textarea Component - Glassmorphism Design with Dual Theme
// ============================================================================

import React, { forwardRef } from 'react';
import { cn } from '@/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Textarea label */
  label?: string;
  /** Helper text below textarea */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Textarea variant */
  variant?: 'default' | 'glass' | 'glass-provider' | 'glass-client';
  /** Theme */
  theme?: 'default' | 'provider' | 'client';
  /** Show character count */
  showCount?: boolean;
  /** Maximum characters */
  maxLength?: number;
  /** Full width */
  fullWidth?: boolean;
  /** Auto-resize based on content */
  autoResize?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      variant = 'default',
      theme = 'default',
      showCount = false,
      maxLength,
      fullWidth = true,
      autoResize = false,
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: 'bg-white border border-gray-300 focus:border-primary-500 focus:ring-primary-500',
      glass: 'glass-input',
      'glass-provider': 'glass-input-provider',
      'glass-client': 'glass-input-client',
    };

    const themeClasses = {
      provider: 'focus:border-provider-500 focus:ring-provider-500',
      client: 'focus:border-client-500 focus:ring-client-500',
    };

    const hasError = !!error;
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}

        {/* Textarea Field */}
        <textarea
          ref={ref}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          className={cn(
            'block w-full rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'resize-vertical min-h-[100px]',
            variantClasses[variant],
            theme !== 'default' && themeClasses[theme],
            hasError && 'border-error-500 focus:border-error-500 focus:ring-error-500',
            disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
            autoResize && 'resize-none overflow-hidden',
            className
          )}
          {...props}
        />

        {/* Character Count or Helper Text or Error */}
        <div className="flex items-center justify-between mt-1.5">
          <p
            className={cn(
              'text-sm',
              hasError ? 'text-error-600' : 'text-gray-500'
            )}
          >
            {error || helperText}
          </p>

          {showCount && maxLength && (
            <span
              className={cn(
                'text-sm',
                currentLength > maxLength * 0.9
                  ? 'text-warning-600'
                  : 'text-gray-500'
              )}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
export default Textarea;
