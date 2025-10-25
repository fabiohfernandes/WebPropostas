// ============================================================================
// Avatar Component - User Profile Images
// ============================================================================

import React from 'react';
import { cn } from '@/utils';

export interface AvatarProps {
  /** Avatar image source */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback initials */
  fallback?: string;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Shape */
  shape?: 'circle' | 'square';
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Theme */
  theme?: 'default' | 'provider' | 'client';
  /** Custom className */
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  fallback,
  size = 'md',
  shape = 'circle',
  status,
  theme = 'default',
  className,
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-3xl',
  };

  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
    '2xl': 'w-6 h-6',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
  };

  const themeClasses = {
    default: 'bg-primary-100 text-primary-700',
    provider: 'bg-provider-100 text-provider-700',
    client: 'bg-client-100 text-client-700',
  };

  const statusColors = {
    online: 'bg-success-500',
    offline: 'bg-gray-400',
    away: 'bg-warning-500',
    busy: 'bg-error-500',
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'flex items-center justify-center font-semibold overflow-hidden',
          'border-2 border-white shadow-sm',
          sizeClasses[size],
          shapeClasses[shape],
          !src && themeClasses[theme],
          className
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{fallback || alt.charAt(0).toUpperCase()}</span>
        )}
      </div>

      {/* Status Indicator */}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
            statusSizeClasses[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};

// Avatar Group Component
export interface AvatarGroupProps {
  /** Array of avatar props */
  avatars: Omit<AvatarProps, 'className'>[];
  /** Maximum avatars to show */
  max?: number;
  /** Size for all avatars */
  size?: AvatarProps['size'];
  /** Custom className */
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 5,
  size = 'md',
  className,
}) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = Math.max(0, avatars.length - max);

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="ring-2 ring-white"
          style={{ zIndex: visibleAvatars.length - index }}
        >
          <Avatar {...avatar} size={size} />
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold ring-2 ring-white',
            size && sizeClasses[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-24 h-24 text-3xl',
};

export default Avatar;
