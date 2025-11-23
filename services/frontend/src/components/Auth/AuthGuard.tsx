// ============================================================================
// Authentication Guard Component
// Protects routes and ensures user is authenticated before rendering content
// ============================================================================

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { constants } from '@/config';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ children, redirectTo = '/auth/login' }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, tokens, isLoading } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    // Give Zustand persist middleware time to hydrate from localStorage
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if not authenticated after hydration
  useEffect(() => {
    if (isHydrated && !isLoading && !isAuthenticated && !tokens) {
      console.log('🔒 AuthGuard: Not authenticated, redirecting to login');
      router.push(redirectTo);
    }
  }, [isHydrated, isLoading, isAuthenticated, tokens, router, redirectTo]);

  // Show loading while hydrating or checking auth
  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (redirect will happen)
  if (!isAuthenticated && !tokens) {
    return null;
  }

  return <>{children}</>;
}