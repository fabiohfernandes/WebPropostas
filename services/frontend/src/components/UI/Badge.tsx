// ============================================================================
// Badge Component
// AURELIA Agent - Design System and UI Specialist
// ============================================================================

import { FC, ReactNode } from 'react';
import { cn } from '@/utils';

export interface BadgeProps {
  /** Badge content */
  children: ReactNode;
  /** Visual variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Rounded style */
  rounded?: 'md' | 'lg' | 'full';
  /** Icon before text */
  icon?: ReactNode;
  /** Dot indicator */
  dot?: boolean;
  /** Removable badge */
  onRemove?: () => void;
  /** Custom className */
  className?: string;
}

export const Badge: FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'md',
  icon,
  dot,
  onRemove,
  className,
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 border border-gray-300',
    primary: 'bg-primary-100 text-primary-800 border border-primary-300',
    success: 'bg-green-100 text-green-800 border border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    error: 'bg-red-100 text-red-800 border border-red-300',
    info: 'bg-blue-100 text-blue-800 border border-blue-300',
    purple: 'bg-purple-100 text-purple-800 border border-purple-300',
    pink: 'bg-pink-100 text-pink-800 border border-pink-300',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  const roundedClasses = {
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const dotColors = {
    default: 'bg-gray-400',
    primary: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium transition-all',
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses[rounded],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-2 h-2 rounded-full animate-pulse',
            dotColors[variant]
          )}
        />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex-shrink-0 hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

// Status Badge Component
export interface StatusBadgeProps {
  status: 'aberta' | 'alteracoes_solicitadas' | 'fechada' | 'rejeitada';
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const statusConfig = {
    aberta: {
      label: 'Aberta',
      variant: 'info' as const,
      dot: true,
    },
    alteracoes_solicitadas: {
      label: 'Alterações Solicitadas',
      variant: 'warning' as const,
      dot: true,
    },
    fechada: {
      label: 'Fechada',
      variant: 'success' as const,
      dot: false,
    },
    rejeitada: {
      label: 'Rejeitada',
      variant: 'error' as const,
      dot: false,
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      size={size}
      dot={config.dot}
      rounded="full"
    >
      {config.label}
    </Badge>
  );
};

export default Badge;
