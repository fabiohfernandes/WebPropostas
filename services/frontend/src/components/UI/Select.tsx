// ============================================================================
// Select Component - Glassmorphism Design with Dual Theme
// ============================================================================

import React, { forwardRef } from 'react';
import { cn } from '@/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Select label */
  label?: string;
  /** Helper text below select */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Select variant */
  variant?: 'default' | 'glass' | 'glass-provider' | 'glass-client';
  /** Theme */
  theme?: 'default' | 'provider' | 'client';
  /** Options array */
  options: SelectOption[];
  /** Placeholder option */
  placeholder?: string;
  /** Full width */
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      variant = 'default',
      theme = 'default',
      options,
      placeholder,
      fullWidth = true,
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

        {/* Select Container */}
        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={cn(
              'block w-full rounded-lg px-4 py-3 pr-10 text-gray-900 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'appearance-none cursor-pointer',
              variantClasses[variant],
              theme !== 'default' && themeClasses[theme],
              hasError && 'border-error-500 focus:border-error-500 focus:ring-error-500',
              disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown Arrow Icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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

Select.displayName = 'Select';

export { Select };
export default Select;
