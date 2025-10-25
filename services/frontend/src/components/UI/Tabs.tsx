// ============================================================================
// Tabs Component - Navigation Tabs
// ============================================================================

import React, { useState } from 'react';
import { cn } from '@/utils';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  /** Array of tabs */
  tabs: Tab[];
  /** Default active tab ID */
  defaultTab?: string;
  /** Controlled active tab */
  activeTab?: string;
  /** On tab change callback */
  onChange?: (tabId: string) => void;
  /** Variant */
  variant?: 'default' | 'pills' | 'underline';
  /** Theme */
  theme?: 'default' | 'provider' | 'client';
  /** Full width tabs */
  fullWidth?: boolean;
  /** Custom className */
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  theme = 'default',
  fullWidth = false,
  className,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs[0]?.id || ''
  );

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    setInternalActiveTab(tabId);
    onChange?.(tabId);
  };

  const themeClasses = {
    default: {
      active: 'border-primary-600 text-primary-600',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    },
    provider: {
      active: 'border-provider-600 text-provider-600',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    },
    client: {
      active: 'border-client-600 text-client-600',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    },
  };

  const pillThemeClasses = {
    default: {
      active: 'bg-primary-100 text-primary-700',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
    },
    provider: {
      active: 'bg-provider-100 text-provider-700',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
    },
    client: {
      active: 'bg-client-100 text-client-700',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
    },
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Default & Underline Variant */}
      {(variant === 'default' || variant === 'underline') && (
        <div className="border-b border-gray-200">
          <nav
            className={cn(
              'flex',
              fullWidth ? 'w-full' : '-mb-px space-x-8'
            )}
            aria-label="Tabs"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id, tab.disabled)}
                  disabled={tab.disabled}
                  className={cn(
                    'group inline-flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors',
                    fullWidth && 'flex-1 justify-center',
                    isActive
                      ? themeClasses[theme].active
                      : themeClasses[theme].inactive,
                    tab.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.icon && (
                    <span className={cn('w-5 h-5', isActive ? 'text-current' : 'text-gray-400')}>
                      {tab.icon}
                    </span>
                  )}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={cn(
                        'ml-2 px-2 py-0.5 rounded-full text-xs font-medium',
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600'
                      )}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Pills Variant */}
      {variant === 'pills' && (
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id, tab.disabled)}
                disabled={tab.disabled}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all',
                  fullWidth && 'flex-1 justify-center',
                  isActive
                    ? pillThemeClasses[theme].active
                    : pillThemeClasses[theme].inactive,
                  tab.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {tab.icon && <span className="w-5 h-5">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={cn(
                      'ml-1 px-2 py-0.5 rounded-full text-xs font-medium',
                      isActive ? 'bg-white' : 'bg-gray-200'
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Tab Panel Component
export interface TabPanelProps {
  /** Tab ID this panel belongs to */
  tabId: string;
  /** Currently active tab */
  activeTab: string;
  /** Panel content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  tabId,
  activeTab,
  children,
  className,
}) => {
  if (activeTab !== tabId) return null;

  return (
    <div
      role="tabpanel"
      className={cn('py-4 animate-fade-in', className)}
    >
      {children}
    </div>
  );
};

export default Tabs;
