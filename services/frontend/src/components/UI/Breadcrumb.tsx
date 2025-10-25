// ============================================================================
// Breadcrumb Component - Navigation Breadcrumbs
// ============================================================================

import React from 'react';
import { cn } from '@/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator */
  separator?: React.ReactNode;
  /** Theme */
  theme?: 'default' | 'provider' | 'client';
  /** Custom className */
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  theme = 'default',
  className,
}) => {
  const themeClasses = {
    default: 'text-primary-600 hover:text-primary-700',
    provider: 'text-provider-600 hover:text-provider-700',
    client: 'text-client-600 hover:text-client-700',
  };

  const defaultSeparator = (
    <svg
      className="w-5 h-5 text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isClickable = !isLast && (item.href || item.onClick);

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2">
                  {separator || defaultSeparator}
                </span>
              )}

              {isClickable ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className={cn(
                    'inline-flex items-center gap-2 text-sm font-medium transition-colors',
                    themeClasses[theme]
                  )}
                >
                  {item.icon && (
                    <span className="w-4 h-4">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span
                  className={cn(
                    'inline-flex items-center gap-2 text-sm font-medium',
                    isLast ? 'text-gray-500' : 'text-gray-700'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon && (
                    <span className="w-4 h-4">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
