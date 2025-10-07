// ============================================================================
// Template Builder - Main Page
// Week 1 Implementation - AURELIA (Design System) + NOVA (Frontend) + LYRA (UX)
// ============================================================================

'use client';

import { BuilderLayout } from '@/components/Builder';
import { AuthGuard } from '@/components';

export default function TemplateBuildPage() {
  return (
    <AuthGuard>
      <BuilderLayout />
    </AuthGuard>
  );
}
