'use client';

/**
 * AI Proposal Builder - Main Page
 *
 * Wizard-based interface for AI-powered proposal generation
 * Flow: Wizard (4 steps) → Generation (progress) → Editor (review/chat)
 */

import { useState } from 'react';
import { ProposalWizard } from '@/components/AIBuilder/ProposalWizard';
import { GenerationProgress } from '@/components/AIBuilder/GenerationProgress';
import { ProposalEditor } from '@/components/AIBuilder/ProposalEditor';

type PageState = 'wizard' | 'generating' | 'editor';

interface WizardData {
  clientInfo: {
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    sector: string;
  };
  proposalType: string;
  projectContext: string;
  settings: {
    tone: string;
    detail: string;
    includeMarketResearch: boolean;
    aiModel: string;
  };
}

export default function AIBuilderPage() {
  const [pageState, setPageState] = useState<PageState>('wizard');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [wizardData, setWizardData] = useState<WizardData | null>(null);

  /**
   * Handle wizard completion - start generation
   */
  const handleWizardComplete = async (data: WizardData) => {
    setWizardData(data);
    setPageState('generating');

    // sessionId will be set by GenerationProgress component
  };

  /**
   * Handle generation completion - move to editor
   */
  const handleGenerationComplete = (proposalId: string) => {
    setProposalId(proposalId);
    setPageState('editor');
  };

  /**
   * Handle back from editor to wizard
   */
  const handleBackToWizard = () => {
    setPageState('wizard');
    setSessionId(null);
    setProposalId(null);
    setWizardData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Wizard Flow */}
      {pageState === 'wizard' && (
        <ProposalWizard
          onComplete={handleWizardComplete}
          initialData={wizardData}
        />
      )}

      {/* Generation Progress */}
      {pageState === 'generating' && wizardData && (
        <GenerationProgress
          wizardData={wizardData}
          onComplete={handleGenerationComplete}
          onBack={handleBackToWizard}
        />
      )}

      {/* Editor with Chat */}
      {pageState === 'editor' && proposalId && (
        <ProposalEditor
          proposalId={proposalId}
          onBack={handleBackToWizard}
        />
      )}
    </div>
  );
}
