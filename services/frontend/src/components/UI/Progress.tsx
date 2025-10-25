// ============================================================================
// Progress Component - Progress Bars and Indicators
// ============================================================================

import React from 'react';
import { cn } from '@/utils';

export interface ProgressProps {
  /** Current value */
  value: number;
  /** Maximum value */
  max?: number;
  /** Show label with percentage */
  showLabel?: boolean;
  /** Custom label */
  label?: string;
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'provider' | 'client';
  /** Striped pattern */
  striped?: boolean;
  /** Animated stripes */
  animated?: boolean;
  /** Custom className */
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  showLabel = false,
  label,
  size = 'md',
  variant = 'default',
  striped = false,
  animated = false,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantClasses = {
    default: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600',
    provider: 'bg-provider-600',
    client: 'bg-client-600',
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Label */}
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            {label || `${Math.round(percentage)}%`}
          </span>
          {label && showLabel && (
            <span className="text-sm font-medium text-gray-700">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Track */}
      <div
        className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
      >
        {/* Progress Bar */}
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            variantClasses[variant],
            striped &&
              'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:30px_100%]',
            animated && striped && 'animate-progress-stripes'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

// Circular Progress Component
export interface CircularProgressProps {
  /** Current value */
  value: number;
  /** Maximum value */
  max?: number;
  /** Size in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Color variant */
  variant?: ProgressProps['variant'];
  /** Show percentage in center */
  showValue?: boolean;
  /** Custom label in center */
  label?: string;
  /** Custom className */
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showValue = true,
  label,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const variantColors = {
    default: '#3b82f6', // primary-600
    success: '#16a34a', // success-600
    warning: '#d97706', // warning-600
    error: '#dc2626', // error-600
    provider: '#3b82f6', // provider-600
    client: '#10b981', // client-600
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={variantColors[variant]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>

      {/* Center Label */}
      {(showValue || label) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {label ? (
              <span className="text-sm font-medium text-gray-700">{label}</span>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Skeleton Loader Component
export const Skeleton: React.FC<{
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}> = ({ className, variant = 'text', width, height }) => {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variantClasses[variant],
        className
      )}
      style={{
        width: width || (variant === 'circular' ? height : '100%'),
        height: height || (variant === 'text' ? '1rem' : '100%'),
      }}
    />
  );
};

export default Progress;
