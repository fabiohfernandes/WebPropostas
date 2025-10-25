// ============================================================================
// Input Component - Glassmorphism Design with Dual Theme
// ============================================================================

import React, { forwardRef } from 'react';
import { cn } from '@/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Input variant */
  variant?: 'default' | 'glass' | 'glass-provider' | 'glass-client';
  /** Theme */
  theme?: 'default' | 'provider' | 'client';
  /** Left icon/addon */
  leftIcon?: React.ReactNode;
  /** Right icon/addon */
  rightIcon?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      variant = 'default',
      theme = 'default',
      leftIcon,
      rightIcon,
      fullWidth = true,
      type = 'text',
      disabled,
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

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{leftIcon}</span>
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              'block w-full rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              variantClasses[variant],
              theme !== 'default' && themeClasses[theme],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              hasError && 'border-error-500 focus:border-error-500 focus:ring-error-500',
              disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
              className
            )}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{rightIcon}</span>
            </div>
          )}
        </div>

        {/* Helper Text or Error */}
        {(helperText || error) && (
          <p
            className={cn(
              'mt-1.5 text-sm',
              hasError ? 'text-error-600' : 'text-gray-500'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export default Input;
