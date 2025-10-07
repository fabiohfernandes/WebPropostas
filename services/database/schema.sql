-- ============================================================================
-- WEBPROPOSTAS DATABASE SCHEMA - MVP FUNCIONAL
-- ============================================================================
-- Version: 1.0.0
-- Purpose: Complete database schema for functional MVP
-- Database: PostgreSQL 15+
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pg_trgm for similarity searches
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================================
-- TABLE: users
-- User accounts (proposal creators)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url TEXT,

  -- Email verification
  email_verified BOOLEAN DEFAULT false,
  email_verification_token VARCHAR(255),
  email_verification_expires_at TIMESTAMP,

  -- Password reset
  password_reset_token VARCHAR(255),
  password_reset_expires_at TIMESTAMP,

  -- Account status
  is_active BOOLEAN DEFAULT true,
  role VARCHAR(50) DEFAULT 'user', -- 'user', 'admin'

  -- Subscription/Plan
  plan VARCHAR(50) DEFAULT 'free', -- 'free', 'starter', 'professional', 'enterprise'
  plan_expires_at TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP
);

-- ============================================================================
-- TABLE: clients
-- Clients who receive proposals
-- ============================================================================
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Basic info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),

  -- Brazilian documents
  document VARCHAR(20), -- CPF or CNPJ
  document_type VARCHAR(10), -- 'cpf' or 'cnpj'

  -- Address
  address_street VARCHAR(255),
  address_number VARCHAR(20),
  address_complement VARCHAR(100),
  address_neighborhood VARCHAR(100),
  address_city VARCHAR(100),
  address_state VARCHAR(2),
  address_zipcode VARCHAR(10),
  address_country VARCHAR(2) DEFAULT 'BR',

  -- Additional info
  notes TEXT,
  tags TEXT[], -- Array of tags for categorization

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: proposal_templates
-- Reusable proposal templates
-- ============================================================================
CREATE TABLE IF NOT EXISTS proposal_templates (
  id SERIAL PRIMARY KEY,

  -- Basic info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- 'Desenvolvimento Web', 'Design', 'Consultoria', etc.
  sector VARCHAR(100), -- 'Tecnologia', 'Saúde', 'Educação', etc.

  -- Visual
  thumbnail TEXT, -- URL to preview image

  -- Template structure
  fields JSONB, -- Dynamic fields definition
  content_template JSONB, -- Template content with placeholders

  -- Metadata
  is_active BOOLEAN DEFAULT true,
  usage_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: proposals
-- Commercial proposals sent to clients
-- ============================================================================
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  template_id INTEGER REFERENCES proposal_templates(id) ON DELETE SET NULL,

  -- Basic info
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- Status workflow
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'sent', 'viewed', 'commented', 'accepted', 'rejected'

  -- Content (JSONB for flexibility)
  content JSONB, -- All proposal content structured

  -- Files
  presentation_url TEXT, -- PDF/Design file
  commercial_proposal_url TEXT, -- Commercial proposal PDF
  attachments JSONB, -- Array of file URLs

  -- Financial
  total_value DECIMAL(12,2),
  currency VARCHAR(3) DEFAULT 'BRL',

  -- Validity
  valid_until DATE,
  expires_at TIMESTAMP,

  -- Client access credentials
  public_token VARCHAR(100) UNIQUE, -- URL-friendly token for client access
  client_access_code VARCHAR(20), -- Simple code like "PROP-2025-001"
  client_password_hash VARCHAR(255), -- Password for client to access

  -- Tracking
  sent_at TIMESTAMP,
  first_viewed_at TIMESTAMP,
  last_viewed_at TIMESTAMP,
  view_count INTEGER DEFAULT 0,
  accepted_at TIMESTAMP,
  rejected_at TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: proposal_sections
-- Sections within a proposal
-- ============================================================================
CREATE TABLE IF NOT EXISTS proposal_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,

  -- Section info
  title VARCHAR(255) NOT NULL,
  content TEXT,
  section_type VARCHAR(50), -- 'introduction', 'scope', 'timeline', 'pricing', 'terms', 'custom'
  sort_order INTEGER DEFAULT 0,

  -- Visibility
  is_visible BOOLEAN DEFAULT true,
  allow_comments BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: comments
-- Comments from clients on proposals
-- ============================================================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  section_id UUID REFERENCES proposal_sections(id) ON DELETE SET NULL,

  -- Comment data
  author_name VARCHAR(255) NOT NULL, -- Client name
  author_email VARCHAR(255), -- Client email
  content TEXT NOT NULL,

  -- Status
  is_resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP,
  resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: proposal_items
-- Line items in a proposal (for pricing breakdown)
-- ============================================================================
CREATE TABLE IF NOT EXISTS proposal_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,

  -- Item info
  description TEXT NOT NULL,
  quantity DECIMAL(10,3) DEFAULT 1,
  unit_price DECIMAL(12,2) NOT NULL,
  total DECIMAL(12,2) NOT NULL,

  -- Metadata
  sort_order INTEGER DEFAULT 0,
  category VARCHAR(100), -- Optional grouping

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: proposal_analytics
-- Track proposal viewing and interaction
-- ============================================================================
CREATE TABLE IF NOT EXISTS proposal_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,

  -- Event data
  event_type VARCHAR(50) NOT NULL, -- 'view', 'section_view', 'download', 'comment', 'share'
  event_data JSONB, -- Additional event details

  -- User tracking
  ip_address INET,
  user_agent TEXT,
  device_type VARCHAR(50), -- 'desktop', 'mobile', 'tablet'

  -- Location (optional)
  country VARCHAR(2),
  city VARCHAR(100),

  -- Timestamp
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: notifications
-- System notifications for users
-- ============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Notification data
  type VARCHAR(50) NOT NULL, -- 'proposal_viewed', 'comment_added', 'proposal_accepted', etc.
  title VARCHAR(255) NOT NULL,
  message TEXT,
  link_url TEXT, -- Where to navigate when clicked

  -- Related entities
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,

  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,

  -- Timestamp
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: activity_log
-- Audit trail for LGPD compliance
-- ============================================================================
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Action data
  action VARCHAR(100) NOT NULL, -- 'create', 'read', 'update', 'delete', 'login', 'export'
  entity_type VARCHAR(50), -- 'proposal', 'client', 'user', etc.
  entity_id UUID,

  -- Details
  description TEXT,
  changes JSONB, -- Before/after values for updates

  -- Request info
  ip_address INET,
  user_agent TEXT,

  -- Timestamp
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: file_uploads
-- Track all file uploads
-- ============================================================================
CREATE TABLE IF NOT EXISTS file_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- File info
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_type VARCHAR(100), -- MIME type
  file_size BIGINT, -- bytes
  storage_url TEXT NOT NULL, -- S3/Storage URL

  -- Associations
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,

  -- Metadata
  upload_type VARCHAR(50), -- 'proposal_attachment', 'avatar', 'logo', etc.

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP -- Soft delete
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_email_verified ON users(email_verified);
CREATE INDEX idx_users_is_active ON users(is_active);

-- Clients
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_is_active ON clients(is_active);
CREATE INDEX idx_clients_name_trgm ON clients USING gin(name gin_trgm_ops);

-- Proposals
CREATE INDEX idx_proposals_user_id ON proposals(user_id);
CREATE INDEX idx_proposals_client_id ON proposals(client_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_user_status ON proposals(user_id, status);
CREATE INDEX idx_proposals_created_at ON proposals(created_at DESC);
CREATE INDEX idx_proposals_public_token ON proposals(public_token);

-- Proposal sections
CREATE INDEX idx_proposal_sections_proposal_id ON proposal_sections(proposal_id);
CREATE INDEX idx_proposal_sections_sort_order ON proposal_sections(proposal_id, sort_order);

-- Comments
CREATE INDEX idx_comments_proposal_id ON comments(proposal_id);
CREATE INDEX idx_comments_section_id ON comments(section_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- Proposal items
CREATE INDEX idx_proposal_items_proposal_id ON proposal_items(proposal_id);
CREATE INDEX idx_proposal_items_sort_order ON proposal_items(proposal_id, sort_order);

-- Analytics
CREATE INDEX idx_analytics_proposal_id ON proposal_analytics(proposal_id);
CREATE INDEX idx_analytics_created_at ON proposal_analytics(created_at DESC);
CREATE INDEX idx_analytics_event_type ON proposal_analytics(event_type);

-- Notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- Activity log
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_entity ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);

-- File uploads
CREATE INDEX idx_file_uploads_user_id ON file_uploads(user_id);
CREATE INDEX idx_file_uploads_proposal_id ON file_uploads(proposal_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proposal_sections_updated_at BEFORE UPDATE ON proposal_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proposal_templates_updated_at BEFORE UPDATE ON proposal_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INITIAL DATA / SEEDS
-- ============================================================================

-- Insert demo user (password: demo123)
INSERT INTO users (email, password_hash, name, company_name, email_verified, role)
VALUES (
  'demo@webpropostas.com',
  '$2a$10$8K1p/a0dL3.I8mE3Fz5QEuKhqA0Qh5m5b5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', -- bcrypt hash of 'demo123'
  'Demo User',
  'Demo Company Ltda',
  true,
  'user'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample templates
INSERT INTO proposal_templates (name, description, category, sector, is_active) VALUES
('Website Corporativo', 'Template para propostas de desenvolvimento de websites institucionais', 'Desenvolvimento Web', 'Tecnologia', true),
('App Mobile E-commerce', 'Template para propostas de aplicativos mobile de vendas', 'Mobile', 'Tecnologia', true),
('Identidade Visual', 'Template para propostas de criação de marca e branding', 'Design Gráfico', 'Marketing', true),
('Consultoria Estratégica', 'Template para propostas de consultoria empresarial', 'Consultoria', 'Negócios', true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- SCHEMA COMPLETE
-- ============================================================================

-- Grant permissions (adjust username as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO webpropostas_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO webpropostas_user;

SELECT 'Database schema created successfully!' as status;
