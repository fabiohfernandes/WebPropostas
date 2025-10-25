// ============================================================================
// Button Component - Enhanced
// AURELIA Agent - Design System and UI Specialist
// ============================================================================

import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: ReactNode;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'glass' | 'glass-provider' | 'glass-client';
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Theme (provider blue or client green) */
  theme?: 'default' | 'provider' | 'client';
  /** Full width */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon before text */
  leftIcon?: ReactNode;
  /** Icon after text */
  rightIcon?: ReactNode;
  /** Icon only button */
  iconOnly?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  theme = 'default',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  disabled,
  className,
  ...props
}) => {
  // Base variant classes
  const baseVariantClasses = {
    primary:
      'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/50',
    secondary:
      'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800',
    outline:
      'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    ghost:
      'text-gray-700 hover:bg-gray-100',
    danger:
      'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/50',
    success:
      'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/50',
    glass:
      'glass-button',
    'glass-provider':
      'glass-button-provider',
    'glass-client':
      'glass-button-client',
  };

  // Theme overrides for primary and outline
  const themeClasses = {
    provider: {
      primary: 'bg-gradient-to-r from-provider-600 to-provider-700 hover:from-provider-700 hover:to-provider-800 shadow-lg shadow-provider-500/50',
      outline: 'border-2 border-provider-600 text-provider-600 hover:bg-provider-50',
    },
    client: {
      primary: 'bg-gradient-to-r from-client-600 to-client-700 hover:from-client-700 hover:to-client-800 shadow-lg shadow-client-500/50',
      outline: 'border-2 border-client-600 text-client-600 hover:bg-client-50',
    },
  };

  // Determine final variant class
  const getVariantClass = () => {
    if (theme !== 'default' && (variant === 'primary' || variant === 'outline')) {
      return themeClasses[theme][variant];
    }
    return baseVariantClasses[variant];
  };

  const variantClasses = getVariantClass();

  const sizeClasses = {
    xs: iconOnly ? 'p-1' : 'px-2 py-1 text-xs',
    sm: iconOnly ? 'p-1.5' : 'px-3 py-1.5 text-sm',
    md: iconOnly ? 'p-2' : 'px-4 py-2 text-base',
    lg: iconOnly ? 'p-3' : 'px-6 py-3 text-lg',
    xl: iconOnly ? 'p-4' : 'px-8 py-4 text-xl',
  };

  const iconSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        variantClasses,
        sizeClasses[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        !disabled && !loading && !variant.startsWith('glass') && 'hover:scale-105 active:scale-95',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className={cn('animate-spin', iconSizeClasses[size])}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {!iconOnly && <span>Carregando...</span>}
        </>
      ) : (
        <>
          {leftIcon && (
            <span className={cn('flex-shrink-0', iconSizeClasses[size])}>
              {leftIcon}
            </span>
          )}
          {!iconOnly && <span>{children}</span>}
          {iconOnly && children}
          {rightIcon && (
            <span className={cn('flex-shrink-0', iconSizeClasses[size])}>
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
