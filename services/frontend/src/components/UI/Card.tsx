// ============================================================================
// Card Component - Glassmorphism Design
// AURELIA Agent - Design System and UI Specialist
// ============================================================================

import { FC, ReactNode } from 'react';
import { cn } from '@/utils';

export interface CardProps {
  /** Card content */
  children: ReactNode;
  /** Card title */
  title?: string;
  /** Card subtitle/description */
  subtitle?: string;
  /** Header actions (buttons, etc.) */
  headerAction?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Visual variant */
  variant?: 'default' | 'glass' | 'glass-provider' | 'glass-client' | 'bordered' | 'elevated' | 'flat';
  /** Theme (provider blue or client green) */
  theme?: 'default' | 'provider' | 'client';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Hover effect */
  hoverable?: boolean;
  /** Clickable card */
  onClick?: () => void;
  /** Custom className */
  className?: string;
}

export const Card: FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  variant = 'default',
  theme = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
  className,
}) => {
  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    glass: 'glass-card',
    'glass-provider': 'glass-card-provider',
    'glass-client': 'glass-card-client',
    bordered: 'bg-white border-2 border-gray-300',
    elevated: 'bg-white shadow-xl border border-gray-100',
    flat: 'bg-gray-50',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl transition-all duration-200',
        variantClasses[variant],
        paddingClasses[padding],
        hoverable && 'hover:shadow-lg hover:scale-[1.02]',
        isClickable && 'cursor-pointer',
        className
      )}
    >
      {/* Header */}
      {(title || subtitle || headerAction) && (
        <div className="mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-600">
                  {subtitle}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="flex-shrink-0">
                {headerAction}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div>{children}</div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

// Stat Card variant
export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

export const StatCard: FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  variant = 'default',
  className,
}) => {
  const variantClasses = {
    default: 'glass-card',
    primary: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white',
    success: 'bg-gradient-to-br from-green-500 to-green-600 text-white',
    warning: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white',
    error: 'bg-gradient-to-br from-red-500 to-red-600 text-white',
  };

  const isColored = variant !== 'default';

  return (
    <div
      className={cn(
        'rounded-xl p-6 transition-all duration-200 hover:scale-105',
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className={cn(
              'text-sm font-medium',
              isColored ? 'text-white/80' : 'text-gray-600'
            )}
          >
            {label}
          </p>
          <p
            className={cn(
              'mt-2 text-3xl font-bold',
              isColored ? 'text-white' : 'text-gray-900'
            )}
          >
            {value}
          </p>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive
                    ? isColored
                      ? 'text-white'
                      : 'text-green-600'
                    : isColored
                    ? 'text-white'
                    : 'text-red-600'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              'rounded-lg p-3',
              isColored ? 'bg-white/20' : 'bg-primary-100'
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
