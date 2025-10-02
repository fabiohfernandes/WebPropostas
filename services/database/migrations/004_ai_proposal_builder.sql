-- Migration: AI Proposal Builder Tables
-- Version: V2 Phase 0
-- Date: October 2025
-- Description: Creates tables for AI-powered proposal generation system

-- =====================================================
-- 1. AI Proposal Sessions (tracking generation jobs)
-- =====================================================
CREATE TABLE IF NOT EXISTS ai_proposal_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,

  -- Input from user (wizard data)
  client_info JSONB NOT NULL, -- { companyName, contactName, email, phone, sector }
  proposal_type VARCHAR(50) NOT NULL, -- 'venda-imovel' | 'servico' | 'parceria' | 'investimento'
  project_context TEXT NOT NULL, -- Free-form description from user
  settings JSONB NOT NULL, -- { tone, detail, includeMarketResearch, aiModel }

  -- Generation status
  status VARCHAR(20) NOT NULL DEFAULT 'processing', -- 'processing' | 'completed' | 'failed'
  progress JSONB, -- { currentStep, totalSteps, stepName, elapsedTime }

  -- Result (when completed)
  generated_proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,

  -- AI metadata
  ai_model VARCHAR(50), -- 'gpt-4o' | 'gpt-o1-preview'
  tokens_used INTEGER DEFAULT 0,
  generation_time_ms INTEGER, -- Total time in milliseconds
  sources_used JSONB, -- Array of sources cited by AI: [{ title, publisher, year, url }]

  -- Timestamps
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_ai_sessions_user ON ai_proposal_sessions(user_id);
CREATE INDEX idx_ai_sessions_org ON ai_proposal_sessions(organization_id);
CREATE INDEX idx_ai_sessions_status ON ai_proposal_sessions(status);
CREATE INDEX idx_ai_sessions_created ON ai_proposal_sessions(created_at DESC);

-- =====================================================
-- 2. AI Proposal Chat (conversation history)
-- =====================================================
CREATE TABLE IF NOT EXISTS ai_proposal_chat (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,

  -- Message details
  role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,

  -- Context (section being edited, selected text, etc)
  context JSONB, -- { currentSection, selectedText, action }

  -- AI response metadata (if role = 'assistant')
  updated_sections VARCHAR(100)[], -- Array of section IDs that were modified
  tokens_used INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_chat_proposal ON ai_proposal_chat(proposal_id, created_at);
CREATE INDEX idx_ai_chat_user ON ai_proposal_chat(user_id);

-- =====================================================
-- 3. AI Proposal Versions (snapshots for undo/redo)
-- =====================================================
CREATE TABLE IF NOT EXISTS ai_proposal_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE NOT NULL,
  version_number INTEGER NOT NULL,

  -- Complete snapshot of proposal at this version
  content JSONB NOT NULL, -- All sections as structured JSON
  markdown TEXT NOT NULL, -- Full Markdown representation

  -- Change tracking
  change_description TEXT, -- "Detailed pricing section", "Made tone more formal", etc.
  changed_by_user_id UUID REFERENCES users(id),
  changed_via_ai BOOLEAN DEFAULT false, -- true if change was AI-assisted

  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_versions_proposal ON ai_proposal_versions(proposal_id, version_number DESC);
CREATE UNIQUE INDEX idx_ai_versions_unique ON ai_proposal_versions(proposal_id, version_number);

-- =====================================================
-- 4. Extend proposals table for AI-generated flag
-- =====================================================
ALTER TABLE proposals
ADD COLUMN IF NOT EXISTS generated_by_ai BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS ai_session_id UUID REFERENCES ai_proposal_sessions(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS ai_model_used VARCHAR(50);

-- Index for filtering AI-generated proposals
CREATE INDEX IF NOT EXISTS idx_proposals_ai_generated ON proposals(generated_by_ai) WHERE generated_by_ai = true;

-- =====================================================
-- 5. Add token tracking to users table
-- =====================================================
ALTER TABLE users
ADD COLUMN IF NOT EXISTS ai_tokens_used_lifetime INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS ai_tokens_used_this_month INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS ai_tokens_reset_date DATE DEFAULT DATE_TRUNC('month', NOW());

-- =====================================================
-- 6. Function to auto-increment version numbers
-- =====================================================
CREATE OR REPLACE FUNCTION get_next_version_number(p_proposal_id UUID)
RETURNS INTEGER AS $$
DECLARE
  next_version INTEGER;
BEGIN
  SELECT COALESCE(MAX(version_number), 0) + 1
  INTO next_version
  FROM ai_proposal_versions
  WHERE proposal_id = p_proposal_id;

  RETURN next_version;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 7. Trigger to update timestamps
-- =====================================================
CREATE OR REPLACE FUNCTION update_ai_session_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ai_session_update_timestamp
BEFORE UPDATE ON ai_proposal_sessions
FOR EACH ROW
EXECUTE FUNCTION update_ai_session_timestamp();

-- =====================================================
-- 8. Comments for documentation
-- =====================================================
COMMENT ON TABLE ai_proposal_sessions IS 'Tracks AI proposal generation jobs with status and metadata';
COMMENT ON TABLE ai_proposal_chat IS 'Stores conversation history between user and AI for proposal refinement';
COMMENT ON TABLE ai_proposal_versions IS 'Maintains version history for undo/redo functionality';

COMMENT ON COLUMN ai_proposal_sessions.status IS 'Current status: processing (generating), completed (ready), failed (error occurred)';
COMMENT ON COLUMN ai_proposal_sessions.progress IS 'Real-time progress: { currentStep: 3, totalSteps: 6, stepName: "Generating pricing", elapsedTime: 45 }';
COMMENT ON COLUMN ai_proposal_chat.context IS 'Contextual information: { currentSection: "pricing", selectedText: "...", action: "make_formal" }';
COMMENT ON COLUMN ai_proposal_versions.content IS 'Structured JSON with all proposal sections: { sections: [...], metadata: {...} }';

-- =====================================================
-- 9. Sample data for testing (optional - remove in production)
-- =====================================================
-- Uncomment below for local development testing:
/*
INSERT INTO ai_proposal_sessions (
  user_id,
  organization_id,
  client_info,
  proposal_type,
  project_context,
  settings,
  status
) VALUES (
  (SELECT id FROM users LIMIT 1),
  (SELECT id FROM organizations LIMIT 1),
  '{"companyName": "Imobiliária Silva", "contactName": "João Silva", "email": "joao@silva.com.br", "phone": "(48) 99999-9999", "sector": "Imobiliário - Venda"}',
  'venda-imovel',
  'Proposta para venda de apartamento 3 quartos no Centro de Florianópolis, 120m², 2 vagas, frente mar. Cliente é investidor.',
  '{"tone": "profissional", "detail": "completo", "includeMarketResearch": true, "aiModel": "gpt-4o"}',
  'processing'
);
*/

-- =====================================================
-- Migration complete
-- =====================================================
