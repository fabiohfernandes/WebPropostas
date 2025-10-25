// ============================================================================
// Table Component - Data Tables
// ============================================================================

import React from 'react';
import { cn } from '@/utils';

export interface Column<T = any> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
}

export interface TableProps<T = any> {
  /** Table columns */
  columns: Column<T>[];
  /** Table data */
  data: T[];
  /** Variant */
  variant?: 'default' | 'striped' | 'bordered';
  /** Theme */
  theme?: 'default' | 'provider' | 'client';
  /** Hoverable rows */
  hoverable?: boolean;
  /** Clickable rows */
  onRowClick?: (row: T, index: number) => void;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Custom className */
  className?: string;
}

export function Table<T = any>({
  columns,
  data,
  variant = 'default',
  theme = 'default',
  hoverable = false,
  onRowClick,
  loading = false,
  emptyMessage = 'Nenhum dado encontrado',
  stickyHeader = false,
  className,
}: TableProps<T>) {
  const themeClasses = {
    default: 'text-primary-600',
    provider: 'text-provider-600',
    client: 'text-client-600',
  };

  const getAlignment = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  const getCellValue = (row: T, column: Column<T>, index: number) => {
    const value = (row as any)[column.key];
    if (column.render) {
      return column.render(value, row, index);
    }
    return value;
  };

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Header */}
        <thead
          className={cn(
            'bg-gray-50',
            stickyHeader && 'sticky top-0 z-10'
          )}
        >
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                style={{ width: column.width }}
                className={cn(
                  'px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider',
                  getAlignment(column.align),
                  column.sortable && 'cursor-pointer hover:bg-gray-100'
                )}
              >
                <div className="flex items-center gap-2">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody
          className={cn(
            'bg-white divide-y divide-gray-200',
            variant === 'striped' && '[&>tr:nth-child(even)]:bg-gray-50'
          )}
        >
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center">
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row, rowIndex)}
                className={cn(
                  hoverable && 'hover:bg-gray-50 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                      getAlignment(column.align)
                    )}
                  >
                    {getCellValue(row, column, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Table Cell Components for common patterns
export const TableCell = {
  Badge: ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'error' }) => {
    const variantClasses = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-success-100 text-success-800',
      warning: 'bg-warning-100 text-warning-800',
      error: 'bg-error-100 text-error-800',
    };
    return (
      <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variantClasses[variant])}>
        {children}
      </span>
    );
  },

  Actions: ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-2">
      {children}
    </div>
  ),

  Currency: ({ value, currency = 'BRL' }: { value: number; currency?: string }) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
    });
    return <span>{formatter.format(value)}</span>;
  },

  Date: ({ value }: { value: Date | string }) => {
    const date = typeof value === 'string' ? new Date(value) : value;
    return <span>{date.toLocaleDateString('pt-BR')}</span>;
  },
};

export default Table;
