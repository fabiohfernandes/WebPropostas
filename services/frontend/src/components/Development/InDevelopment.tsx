// ============================================================================
// In Development Placeholder Component
// AURELIA Agent - Design System and UI Specialist
// ============================================================================

'use client';

import { FC, ReactNode } from 'react';
import {
  WrenchScrewdriverIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/utils';

export interface InDevelopmentProps {
  /** Title of the feature */
  title?: string;
  /** Description of what's coming */
  description?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Visual variant */
  variant?: 'default' | 'card' | 'banner' | 'inline';
  /** Icon to display */
  icon?: 'wrench' | 'sparkles' | 'rocket' | 'code';
  /** Estimated completion */
  eta?: string;
  /** Show animated construction indicator */
  animated?: boolean;
  /** Custom className */
  className?: string;
  /** Children content (optional preview) */
  children?: ReactNode;
}

const icons = {
  wrench: WrenchScrewdriverIcon,
  sparkles: SparklesIcon,
  rocket: RocketLaunchIcon,
  code: CodeBracketIcon,
};

export const InDevelopment: FC<InDevelopmentProps> = ({
  title = 'Em Desenvolvimento',
  description = 'Esta funcionalidade está sendo construída e estará disponível em breve.',
  size = 'md',
  variant = 'default',
  icon = 'wrench',
  eta,
  animated = true,
  className,
  children,
}) => {
  const Icon = icons[icon];

  const sizeClasses = {
    sm: 'p-4 gap-2',
    md: 'p-6 gap-3',
    lg: 'p-8 gap-4',
    xl: 'p-12 gap-6',
    full: 'min-h-[400px] p-12 gap-6',
  };

  const variantClasses = {
    default: 'bg-gradient-to-br from-primary-50/80 to-primary-100/80 backdrop-blur-sm border border-primary-200/50 rounded-xl',
    card: 'glass-card border-2 border-dashed border-primary-300/50',
    banner: 'bg-gradient-to-r from-yellow-50/90 to-orange-50/90 backdrop-blur-sm border-l-4 border-yellow-500',
    inline: 'bg-yellow-50/50 border border-yellow-200/50 rounded-md',
  };

  const textSizeClasses = {
    sm: {
      title: 'text-sm font-semibold',
      description: 'text-xs',
      badge: 'text-xs px-2 py-0.5',
    },
    md: {
      title: 'text-lg font-bold',
      description: 'text-sm',
      badge: 'text-sm px-3 py-1',
    },
    lg: {
      title: 'text-xl font-bold',
      description: 'text-base',
      badge: 'text-sm px-3 py-1',
    },
    xl: {
      title: 'text-2xl font-bold',
      description: 'text-lg',
      badge: 'text-base px-4 py-1.5',
    },
    full: {
      title: 'text-3xl font-bold',
      description: 'text-xl',
      badge: 'text-base px-4 py-1.5',
    },
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {/* Animated Icon */}
      <div className="relative">
        <Icon
          className={cn(
            'text-primary-600',
            size === 'sm' ? 'w-8 h-8' : '',
            size === 'md' ? 'w-12 h-12' : '',
            size === 'lg' ? 'w-16 h-16' : '',
            (size === 'xl' || size === 'full') ? 'w-20 h-20' : '',
            animated && 'animate-bounce'
          )}
        />
        {animated && (
          <div className="absolute -top-1 -right-1">
            <SparklesIcon className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
        )}
      </div>

      {/* Badge */}
      <div
        className={cn(
          'inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-semibold shadow-lg',
          textSizeClasses[size].badge
        )}
      >
        <span>🚧</span>
        <span>EM DESENVOLVIMENTO</span>
      </div>

      {/* Title */}
      <h3
        className={cn(
          'text-gray-900',
          textSizeClasses[size].title
        )}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          className={cn(
            'text-gray-600 max-w-md',
            textSizeClasses[size].description
          )}
        >
          {description}
        </p>
      )}

      {/* ETA Badge */}
      {eta && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <RocketLaunchIcon className="w-4 h-4" />
          <span>Previsão: {eta}</span>
        </div>
      )}

      {/* Preview Content */}
      {children && (
        <div className="mt-4 w-full opacity-50 pointer-events-none blur-[1px]">
          {children}
        </div>
      )}

      {/* Decorative Elements */}
      {variant !== 'inline' && (
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl" />
        </div>
      )}
    </div>
  );
};

// Smaller inline variant for compact spaces
export const InDevelopmentInline: FC<Omit<InDevelopmentProps, 'variant' | 'size'>> = (props) => (
  <InDevelopment {...props} variant="inline" size="sm" animated={false} />
);

// Banner variant for full-width notifications
export const InDevelopmentBanner: FC<Omit<InDevelopmentProps, 'variant'>> = (props) => (
  <InDevelopment {...props} variant="banner" />
);

// Feature card variant
export const FeatureInDevelopment: FC<InDevelopmentProps> = (props) => (
  <InDevelopment {...props} variant="card" size="lg" icon="sparkles" />
);

export default InDevelopment;
