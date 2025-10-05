# WebPropostas V2 - Comprehensive Implementation Plan

**Version:** 1.1.0 ⭐ UPDATED
**Date:** October 2, 2025 (Updated: October 2, 2025)
**Orchestrator:** MAESTRO Multi-Agent System
**Planning Duration:** 23 Weeks (+3 weeks for AI Proposal Builder)
**Target Launch:** Week 23 (March 2026)

---

## Executive Summary

**🚨 MAJOR UPDATE (Oct 2, 2025):** AI Proposal Builder added as **Phase 0 (Priority #1)** based on user feedback and strategic pivot. This conversational AI feature will be developed FIRST (Weeks 1-3) before all other V2 features.

This implementation plan provides a detailed, week-by-week strategy for developing WebPropostas V2, transforming the platform from a proposal management tool into a comprehensive, AI-powered proposal creation and monetization platform.

### Four Core V2 Features (Updated Priority)

**⭐ NEW - Priority #1:**
0. **AI Proposal Builder** (Weeks 1-3)
   - Conversational wizard guiding proposal creation
   - ChatGPT-4o + GPT-o1 (reasoning) for content generation
   - Interactive chat for revisions and adjustments
   - Web search integration for market data
   - Multi-iteration editing before publishing
   - **Impact:** Reduces proposal creation time from 3h to 30min (80% reduction)

**Original Features (re-sequenced):**

1. **Visual Template Designer** (Weeks 8-11)
   - Canva-like drag-and-drop canvas editor (Fabric.js/Konva.js)
   - AI-powered content generation boxes (GPT-4 Turbo + Claude 3 fallback)
   - Template library with community sharing (Premium)
   - Brand Kit with logo, colors, fonts (Premium)
   - 10,000+ icons, 100,000+ stock photos, charts/diagrams

2. **Three-Tier Subscription System** (Weeks 4-7)
   - **Freemium:** Free forever, 3 active proposals, no AI, basic features
   - **Standard:** R$ 79/month, 50 proposals, 10k AI tokens/month, template designer (no save)
   - **Premium:** R$ 199/month, unlimited proposals, 50k AI tokens/month, save templates, brand kit, collaboration

3. **AI Token Marketplace**
   - Credit-based system (1 token ≈ 1 word generated)
   - Packages: Starter (5k/R$15), Growth (20k/R$50), Pro (50k/R$100), Enterprise (200k/R$300)
   - Auto-refill configuration
   - Token rollover (purchased tokens never expire)
   - Usage analytics and cost predictions

### Success Targets (6 Months Post-Launch)

| Metric | Target |
|--------|--------|
| Total Users | 10,000+ |
| Paid Conversion Rate | 15% |
| Monthly Recurring Revenue (MRR) | R$ 138,700 |
| Premium Users | 300 (3% of total) |
| Templates Created per Paid User | 50+ |
| User Satisfaction (NPS) | > 50 |
| 30-Day Retention | 70%+ |
| AI Token Purchase Rate | 30% of Standard users |

---

## Table of Contents

1. [Strategic Overview](#1-strategic-overview)
2. [Technical Architecture](#2-technical-architecture)
3. [Database Schema & Migrations](#3-database-schema--migrations)
4. [Agent Assignment Matrix](#4-agent-assignment-matrix)
5. [20-Week Development Roadmap](#5-20-week-development-roadmap)
6. [Risk Assessment & Mitigation](#6-risk-assessment--mitigation)
7. [Testing & Quality Assurance](#7-testing--quality-assurance)
8. [Deployment Strategy](#8-deployment-strategy)
9. [Post-Launch Monitoring](#9-post-launch-monitoring)
10. [Success Metrics & KPIs](#10-success-metrics--kpis)

---

## 1. Strategic Overview

### 1.1 Business Objectives

**Primary Goals:**
- Establish recurring revenue stream through tiered subscriptions
- Attract 10,000+ users in first 6 months via freemium model
- Position as "Canva for Business Proposals" in Brazilian market
- Increase user retention through template libraries and AI investment

**Revenue Model:**
- **Recurring (Primary):** Standard subscriptions (R$ 79/mo × 1,000 users = R$ 79k) + Premium subscriptions (R$ 199/mo × 300 users = R$ 59.7k) = **R$ 138.7k MRR**
- **One-time (Secondary):** AI token purchases (R$ 50 avg × 500 purchases/mo = R$ 25k)
- **Total Target:** R$ 163.7k monthly revenue

### 1.2 Market Differentiation

**Competitive Advantages vs. Canva/PandaDoc/Proposify:**
1. **Only proposal tool with built-in AI copywriting** (GPT-4 + Claude 3)
2. **Brazilian market focus** (PIX, boleto, Portuguese, LGPD compliance)
3. **Lower entry barrier** (freemium with 3 proposals vs. paid-only competitors)
4. **All-in-one platform** (design + workflow + AI + e-signature)

### 1.3 Integration with V1

**Seamless V1 → V2 Transition:**
- All existing users automatically migrate to Freemium plan
- 30-day grace period: Keep existing proposal limits
- After 30 days: Enforce freemium limits (3 active proposals)
- Existing proposals remain accessible (no deletion)
- New "Templates" tab added to main navigation
- New "AI Tokens" widget in header
- Existing proposal workflow enhanced with template selection

---

## 2. Technical Architecture

### 2.1 Frontend Architecture

**Technology Stack:**
```yaml
Framework: Next.js 14 (App Router)
Canvas Engine: Fabric.js (primary) / Konva.js (fallback)
State Management: Zustand + React Query
UI Components: Radix UI + Tailwind CSS + Glassmorphism design system
Rich Text Editor: TipTap
Real-time Collaboration: Socket.io (Premium only)
Deployment: Railway (with V1 integration)
```

**New Frontend Modules:**
```
services/frontend/src/
├── app/
│   ├── template-designer/
│   │   ├── [templateId]/
│   │   │   └── editor/          # Canvas editor page
│   │   ├── library/              # Template gallery
│   │   └── new/                  # Create from scratch
│   ├── marketplace/
│   │   ├── tokens/               # AI token purchase
│   │   └── subscription/         # Plan management
│   └── settings/
│       ├── subscription/         # Billing dashboard
│       ├── brand-kit/            # Logo, colors, fonts (Premium)
│       └── team/                 # Collaboration (Premium)
├── components/
│   ├── TemplateDesigner/
│   │   ├── Canvas.tsx            # Fabric.js canvas wrapper
│   │   ├── ElementLibrary.tsx    # Drag-drop element sidebar
│   │   ├── PropertyPanel.tsx     # Element editing panel
│   │   ├── AIContentBox.tsx      # AI text generation component
│   │   └── BrandKit.tsx          # Brand kit manager
│   ├── Subscription/
│   │   ├── PlanComparison.tsx    # Plan comparison cards
│   │   ├── UpgradeModal.tsx      # Upgrade prompts
│   │   └── UsageMeters.tsx       # Proposal/token usage display
│   └── TokenMarketplace/
│       ├── TokenBalance.tsx      # Header widget
│       ├── PackageSelector.tsx   # Token package cards
│       └── PurchaseFlow.tsx      # Checkout integration
├── hooks/
│   ├── useSubscription.ts        # Subscription state
│   ├── useTokenBalance.ts        # AI token tracking
│   ├── useTemplateEditor.ts      # Canvas state management
│   └── useAIGeneration.ts        # AI text generation
└── lib/
    ├── stripe.ts                 # Stripe client
    ├── mercadopago.ts            # Mercado Pago client
    ├── fabricHelpers.ts          # Canvas utilities
    └── aiClient.ts               # OpenAI/Claude API client
```

### 2.2 Backend Architecture

**New API Endpoints:**

#### Template Designer APIs
```typescript
POST   /api/v1/templates                    // Create template
GET    /api/v1/templates                    // List user templates
GET    /api/v1/templates/:id                // Get template details
PUT    /api/v1/templates/:id                // Update template
DELETE /api/v1/templates/:id                // Delete template
POST   /api/v1/templates/:id/duplicate      // Clone template
GET    /api/v1/templates/community          // Public templates (Premium)
POST   /api/v1/templates/:id/publish        // Publish to community (Premium)
GET    /api/v1/templates/pre-built          // WebPropostas curated templates
```

#### AI Content Generation APIs
```typescript
POST   /api/v1/ai/generate-text             // Generate AI content
  Request: {
    boxType: "product-description" | "pricing-justification" | "location-highlight" | "service-overview" | "executive-summary",
    inputs: Record<string, any>,
    userId: UUID,
    templateId: UUID
  }
  Response: {
    text: string,
    tokensUsed: number,
    cost: number,
    remainingBalance: number
  }

GET    /api/v1/ai/token-balance              // Check user token balance
POST   /api/v1/ai/estimate-cost              // Estimate tokens before generation
GET    /api/v1/ai/usage-history              // Token usage analytics
```

#### Subscription & Billing APIs
```typescript
GET    /api/v1/subscriptions/plans           // List available plans
POST   /api/v1/subscriptions/subscribe       // Subscribe to plan
PUT    /api/v1/subscriptions/upgrade         // Upgrade plan
DELETE /api/v1/subscriptions/cancel          // Cancel subscription
GET    /api/v1/subscriptions/usage           // Usage metrics (proposals, tokens)
POST   /api/v1/billing/create-checkout       // Stripe/Mercado Pago checkout
POST   /api/v1/billing/webhooks              // Payment webhooks
```

#### Token Marketplace APIs
```typescript
GET    /api/v1/marketplace/packages          // List token packages
POST   /api/v1/marketplace/purchase          // Purchase tokens
GET    /api/v1/marketplace/history           // Purchase history
POST   /api/v1/marketplace/auto-refill       // Configure auto-refill
GET    /api/v1/marketplace/analytics         // Token usage analytics
```

### 2.3 Third-Party Integrations

| Service | Purpose | Cost Structure |
|---------|---------|----------------|
| **OpenAI GPT-4 Turbo** | Primary AI text generation | $0.002/1K tokens (input) |
| **Anthropic Claude 3 Sonnet** | Fallback AI provider | $0.003/1K tokens |
| **Stripe** | International subscriptions | 2.9% + $0.30/transaction |
| **Mercado Pago** | Brazilian payments (PIX, boleto) | 4.99% + R$ 0.40/transaction |
| **Unsplash API** | Stock photos | Free (attribution required) |
| **Pexels API** | Stock photos | Free (attribution required) |
| **Fabric.js** | Canvas editor | Open source (MIT license) |
| **Socket.io** | Real-time collaboration | Open source (MIT license) |
| **AWS S3** | User uploads, template thumbnails | $0.023/GB + transfer costs |
| **Cloudflare CDN** | Asset delivery | Railway included |

---

## 3. Database Schema & Migrations

### 3.1 New Tables (PostgreSQL)

#### subscription_plans
```sql
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,        -- 'freemium', 'standard', 'premium'
  display_name VARCHAR(100) NOT NULL,      -- 'Freemium', 'Standard', 'Premium'
  price_monthly DECIMAL(10,2),             -- NULL for freemium
  price_annual DECIMAL(10,2),              -- NULL for freemium
  features JSONB NOT NULL,                 -- Feature flags JSON
  ai_tokens_monthly INTEGER DEFAULT 0,
  max_proposals INTEGER,                   -- NULL = unlimited
  max_templates INTEGER,                   -- NULL = unlimited
  stock_photo_limit INTEGER,               -- NULL = unlimited
  team_members INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed data
INSERT INTO subscription_plans (name, display_name, price_monthly, price_annual, features, ai_tokens_monthly, max_proposals, max_templates, stock_photo_limit, team_members) VALUES
('freemium', 'Freemium', 0, 0, '{"template_designer": false, "save_templates": false, "ai_generation": false, "brand_kit": false, "collaboration": false, "api_access": false}', 0, 3, 0, 0, 1),
('standard', 'Standard', 79.00, 790.00, '{"template_designer": true, "save_templates": false, "ai_generation": true, "brand_kit": false, "collaboration": false, "api_access": false}', 10000, 50, 0, 10, 1),
('premium', 'Premium', 199.00, 1990.00, '{"template_designer": true, "save_templates": true, "ai_generation": true, "brand_kit": true, "collaboration": true, "api_access": true}', 50000, NULL, NULL, NULL, 3);
```

#### user_subscriptions
```sql
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id) ON DELETE RESTRICT,
  status VARCHAR(20) NOT NULL DEFAULT 'active',  -- 'active', 'cancelled', 'past_due', 'paused'
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  mercadopago_subscription_id VARCHAR(255) UNIQUE,
  payment_method VARCHAR(50),                     -- 'credit_card', 'pix', 'boleto'
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMP,
  trial_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, organization_id)
);

CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_stripe ON user_subscriptions(stripe_subscription_id);
```

#### ai_token_balances
```sql
CREATE TABLE ai_token_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  included_tokens INTEGER DEFAULT 0,                -- From subscription (resets monthly)
  purchased_tokens INTEGER DEFAULT 0,               -- From marketplace (never expire)
  total_tokens INTEGER GENERATED ALWAYS AS (included_tokens + purchased_tokens) STORED,
  last_reset_at TIMESTAMP DEFAULT NOW(),            -- Last monthly reset
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_token_balances_user_id ON ai_token_balances(user_id);
CREATE INDEX idx_ai_token_balances_org_id ON ai_token_balances(organization_id);
```

#### ai_token_transactions
```sql
CREATE TABLE ai_token_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,                        -- 'generation', 'purchase', 'refund', 'reset', 'subscription_grant'
  tokens_delta INTEGER NOT NULL,                    -- Positive for purchase/grant, negative for usage
  balance_after INTEGER NOT NULL,
  cost DECIMAL(10,4),                               -- Cost in BRL
  metadata JSONB,                                   -- {proposalId, templateId, contentBoxType, aiModel, etc.}
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_token_transactions_user_id ON ai_token_transactions(user_id);
CREATE INDEX idx_ai_token_transactions_type ON ai_token_transactions(type);
CREATE INDEX idx_ai_token_transactions_created_at ON ai_token_transactions(created_at DESC);
```

#### proposal_templates
```sql
CREATE TABLE proposal_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),                            -- 'real-estate', 'consulting', 'design', etc.
  style_tags VARCHAR(100)[],                        -- ['modern', 'corporate', 'minimalist']
  thumbnail_url VARCHAR(500),                       -- S3 URL
  canvas_data JSONB NOT NULL,                       -- Fabric.js canvas JSON
  is_public BOOLEAN DEFAULT FALSE,                  -- Community templates
  is_featured BOOLEAN DEFAULT FALSE,                -- Featured by WebPropostas team
  usage_count INTEGER DEFAULT 0,                    -- How many times used
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_proposal_templates_user_id ON proposal_templates(user_id);
CREATE INDEX idx_proposal_templates_org_id ON proposal_templates(organization_id);
CREATE INDEX idx_proposal_templates_category ON proposal_templates(category);
CREATE INDEX idx_proposal_templates_is_public ON proposal_templates(is_public);
CREATE INDEX idx_proposal_templates_is_featured ON proposal_templates(is_featured);
```

#### template_usage_logs
```sql
CREATE TABLE template_usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES proposal_templates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_template_usage_logs_template_id ON template_usage_logs(template_id);
CREATE INDEX idx_template_usage_logs_user_id ON template_usage_logs(user_id);
```

#### token_packages
```sql
CREATE TABLE token_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,                       -- 'Starter', 'Growth', 'Pro', 'Enterprise'
  tokens INTEGER NOT NULL,                          -- 5000, 20000, 50000, 200000
  price DECIMAL(10,2) NOT NULL,                     -- BRL price
  discount_percentage INTEGER DEFAULT 0,            -- 0, 17, 33, 50
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed data
INSERT INTO token_packages (name, tokens, price, discount_percentage, sort_order) VALUES
('Starter', 5000, 15.00, 0, 1),
('Growth', 20000, 50.00, 17, 2),
('Pro', 50000, 100.00, 33, 3),
('Enterprise', 200000, 300.00, 50, 4);
```

#### token_purchases
```sql
CREATE TABLE token_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  package_id UUID REFERENCES token_packages(id) ON DELETE RESTRICT,
  tokens_purchased INTEGER NOT NULL,
  amount_paid DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,              -- 'credit_card', 'pix', 'boleto'
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  mercadopago_payment_id VARCHAR(255) UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',    -- 'pending', 'completed', 'failed', 'refunded'
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_token_purchases_user_id ON token_purchases(user_id);
CREATE INDEX idx_token_purchases_status ON token_purchases(status);
CREATE INDEX idx_token_purchases_created_at ON token_purchases(created_at DESC);
```

#### auto_refill_settings
```sql
CREATE TABLE auto_refill_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT FALSE,
  threshold_tokens INTEGER NOT NULL,                -- Auto-buy when balance < this
  package_id UUID REFERENCES token_packages(id) ON DELETE RESTRICT,
  last_triggered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_auto_refill_settings_user_id ON auto_refill_settings(user_id);
CREATE INDEX idx_auto_refill_settings_enabled ON auto_refill_settings(enabled);
```

#### brand_kits (Premium feature)
```sql
CREATE TABLE brand_kits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE UNIQUE,
  logo_url VARCHAR(500),                            -- S3 URL
  primary_color VARCHAR(7),                         -- #RRGGBB
  secondary_color VARCHAR(7),
  accent_color VARCHAR(7),
  primary_font VARCHAR(100),                        -- Font family name
  secondary_font VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_brand_kits_org_id ON brand_kits(organization_id);
```

### 3.2 Migration Strategy

**Phase 1: Add new tables (Week 1-2)**
```bash
# Migration file: services/api/migrations/001_add_v2_tables.sql
# Execute during low-traffic hours
# Estimated time: < 5 minutes
# Rollback strategy: DROP TABLE cascade with transaction
```

**Phase 2: Seed subscription plans (Week 2)**
```bash
# Migration file: services/api/migrations/002_seed_subscription_plans.sql
# Insert freemium, standard, premium plans
# Insert token packages
```

**Phase 3: Migrate existing users to Freemium (Week 4)**
```sql
-- Assign all existing users to freemium plan
INSERT INTO user_subscriptions (user_id, organization_id, plan_id, status, current_period_start)
SELECT
  u.id,
  u.organization_id,
  (SELECT id FROM subscription_plans WHERE name = 'freemium'),
  'active',
  NOW()
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM user_subscriptions us WHERE us.user_id = u.id
);

-- Initialize token balances
INSERT INTO ai_token_balances (user_id, organization_id)
SELECT u.id, u.organization_id
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM ai_token_balances tb WHERE tb.user_id = u.id
);
```

**Phase 4: Enforce limits after 30-day grace period (Week 8)**
```typescript
// Middleware: services/api/src/middleware/subscriptionLimits.ts
// Check proposal count against plan limits
// Show upgrade prompts when limit reached
```

---

## 4. Agent Assignment Matrix

### 4.1 Alpha Crew (Research & Planning) - Weeks 1-2

| Agent | Role | Responsibilities |
|-------|------|------------------|
| **ARCHITECT** | Tech Lead | Overall system architecture, technology stack decisions, integration points with V1 |
| **CASSANDRA** | Database Engineer | Database schema design, migration scripts, query optimization, indexing strategy |
| **COMPASS** | Business Analysis | Market research, competitive analysis, pricing strategy validation |
| **NAVIGATOR** | Project Management | 20-week roadmap management, milestone tracking, risk monitoring |
| **ASTRA** | Analytics | KPI definition, analytics implementation plan, Mixpanel event tracking |
| **PRISM** | Content Strategy | Template library curation, community template guidelines, content moderation |
| **INSIGHT** | Psychology | User behavior analysis, upgrade prompt design, gamification strategy |
| **ATLAS** | Finance | Revenue modeling, cost projections, LTV/CAC calculations, pricing elasticity |
| **BEACON** | Learning | User onboarding design, tutorial system, help documentation |
| **AEGIS** | Risk Management | Risk assessment, compliance validation, legal review coordination |

### 4.2 Beta Crew (Implementation) - Weeks 3-18

#### Core Development (Weeks 3-16)

| Agent | Role | Weeks | Deliverables |
|-------|------|-------|--------------|
| **ORION** | Full-Stack Lead | 3-18 | API endpoint implementation, backend logic, integration coordination |
| **NOVA** | Frontend Lead | 3-18 | Canvas editor UI, React components, state management, responsive design |
| **CASSANDRA** | Database | 3-4, 9-10 | Database migrations, query optimization, connection pooling |
| **CRONOS** | DevOps | 3-4, 17-18 | Railway deployment config, CI/CD pipelines, environment setup |
| **NEURA** | AI/ML Engineer | 7-8, 13-14 | OpenAI/Claude integration, token counting, prompt engineering, cost optimization |

#### Design & UX (Weeks 3-12)

| Agent | Role | Weeks | Deliverables |
|-------|------|-------|--------------|
| **AURELIA** | Design System | 3-6 | Glassmorphism canvas UI, element library design, responsive layouts |
| **LYRA** | Product Designer | 3-12 | User flows, wireframes, prototype, usability testing |
| **IRIS** | Graphic Designer | 9-10 | Pre-built template design, thumbnail generation, asset curation |
| **PHOENIX** | Interaction Designer | 5-8 | Canvas interactions, drag-drop UX, AI content box workflows |
| **MUSE** | Creative Direction | 9-10 | Template style guidelines, community template standards |

#### Subscription & Billing (Weeks 3-4, 13-14)

| Agent | Role | Weeks | Deliverables |
|-------|------|-------|--------------|
| **VAULT** | Payment Integration | 3-4 | Stripe integration (credit cards, subscriptions) |
| **MERCURY** | Revenue Operations | 3-4 | Mercado Pago integration (PIX, boleto), webhook handling |
| **LEDGER** | Accounting | 3-4 | Financial reporting, revenue recognition, tax compliance |
| **HERALD** | Notification System | 13-14 | Subscription lifecycle emails, payment reminders, upgrade prompts |

#### AI & Token Marketplace (Weeks 7-8, 13-14)

| Agent | Role | Weeks | Deliverables |
|-------|------|-------|--------------|
| **SAGE** | AI Content | 7-8 | Content box types, prompt templates, output formatting |
| **CATALYST** | AI Optimization | 7-8 | Prompt engineering, cost optimization, caching strategy |
| **NEURA** | AI Architecture | 7-8 | Multi-provider strategy, rate limiting, token counting |
| **ORACLE** | Predictive Analytics | 13-14 | Token usage prediction, auto-refill logic, cost forecasting |

### 4.3 Gamma Crew (Excellence) - Weeks 15-20

| Agent | Role | Weeks | Deliverables |
|-------|------|-------|--------------|
| **TESTER** | Autonomous Testing | 15-18 | Automated stress testing, UI discovery, performance benchmarking |
| **FORTRESS** | Security | 15-16 | Security audit, penetration testing, LGPD compliance validation |
| **SENTINEL** | Quality Assurance | 15-18 | Test plan execution, bug triage, acceptance testing |
| **VULCAN** | Performance | 15-16 | Load testing, optimization, caching strategy |
| **RAILWAY CONDUCTOR** | Deployment | 17-20 | Railway deployment automation, rollback procedures, monitoring |
| **VERITAS** | Legal Compliance | 15-16 | Terms of service updates, LGPD audit, payment processing compliance |
| **CLARITY** | Accessibility | 17-18 | WCAG 2.1 AA compliance, keyboard navigation, screen reader testing |
| **POLYGLOT** | Localization | 17-18 | Portuguese localization validation, currency formatting |

---

## 5. 20-Week Development Roadmap

### Phase 1: Foundation (Weeks 1-4)

#### Week 1-2: Infrastructure & Architecture

**ARCHITECT + CASSANDRA + CRONOS**

**Goals:**
- Finalize system architecture
- Create database schema
- Setup development environment

**Deliverables:**
- [ ] Technical architecture document
- [ ] Database migration scripts (001-002)
- [ ] Railway environment configuration for V2
- [ ] Branch `feature/webpropostas-v2` created
- [ ] Development environment setup guide

**Tasks:**
```yaml
Day 1-2:
  - ARCHITECT: Define frontend architecture (Fabric.js vs Konva.js decision)
  - ARCHITECT: Plan API endpoint structure
  - CASSANDRA: Design database schema (all 10 new tables)

Day 3-4:
  - CASSANDRA: Write migration scripts
  - CASSANDRA: Test migrations on dev database
  - CRONOS: Setup Railway service for V2 backend

Day 5-6:
  - ARCHITECT: Document integration points with V1
  - CASSANDRA: Setup database indexes and constraints
  - CRONOS: Configure environment variables

Day 7-10:
  - Team: Code review of architecture
  - Team: Execute migrations on staging
  - Team: Validate database performance
```

**Success Criteria:**
- All 10 new tables created successfully
- Migrations tested and reversible
- Railway staging environment operational
- No breaking changes to V1 functionality

---

#### Week 3-4: Subscription System

**ORION + VAULT + MERCURY + NOVA**

**Goals:**
- Implement subscription logic
- Integrate Stripe and Mercado Pago
- Build plan comparison UI
- Implement feature gating middleware

**Deliverables:**
- [ ] Subscription API endpoints (6 endpoints)
- [ ] Stripe subscription flow
- [ ] Mercado Pago PIX/boleto integration
- [ ] Plan comparison page
- [ ] Feature gating middleware
- [ ] Usage tracking system

**Backend Tasks (ORION + VAULT + MERCURY):**
```typescript
// Week 3
- POST /api/v1/subscriptions/subscribe
- PUT /api/v1/subscriptions/upgrade
- DELETE /api/v1/subscriptions/cancel
- GET /api/v1/subscriptions/usage
- Stripe webhook handler (/api/v1/billing/webhooks)
- Mercado Pago webhook handler

// Week 4
- Feature gating middleware (subscriptionMiddleware.ts)
- Usage tracking service (proposalCount, tokenCount)
- Subscription lifecycle events
- Email notifications (Resend/SendGrid)
```

**Frontend Tasks (NOVA + AURELIA):**
```typescript
// Week 3
- components/Subscription/PlanComparison.tsx
- components/Subscription/UpgradeModal.tsx
- app/subscription/plans/page.tsx
- Stripe checkout integration

// Week 4
- components/Subscription/UsageMeters.tsx
- Dashboard header subscription widget
- Locked feature overlays
- Upgrade prompt system
```

**Success Criteria:**
- User can subscribe to Standard plan via Stripe
- User can subscribe via PIX/boleto (Mercado Pago)
- Feature gating blocks freemium users correctly
- Usage meters show accurate proposal counts
- Upgrade prompts appear at appropriate times

---

### Phase 2: Template Designer MVP (Weeks 5-8)

#### Week 5-6: Canvas Editor

**NOVA + PHOENIX + AURELIA**

**Goals:**
- Integrate Fabric.js canvas
- Implement drag-and-drop elements
- Build element library sidebar
- Create property editing panel

**Deliverables:**
- [ ] Canvas editor component
- [ ] Element library (text, shapes, images)
- [ ] Drag-and-drop functionality
- [ ] Property panel (font, color, size)
- [ ] Save/load canvas state

**Frontend Tasks:**
```typescript
// Week 5
- components/TemplateDesigner/Canvas.tsx (Fabric.js wrapper)
- components/TemplateDesigner/ElementLibrary.tsx
- Drag-and-drop event handlers
- Canvas zoom/pan controls

// Week 6
- components/TemplateDesigner/PropertyPanel.tsx
- Element selection/manipulation
- Undo/redo functionality
- Save canvas as JSON
- Load canvas from JSON
```

**Backend Tasks (ORION):**
```typescript
// Week 6
- POST /api/v1/templates (create template)
- GET /api/v1/templates/:id (load template)
- PUT /api/v1/templates/:id (update template)
- Canvas data validation
```

**Success Criteria:**
- User can add text boxes to canvas
- User can add shapes (rectangle, circle, line)
- User can upload and place images
- User can edit element properties (color, font, size)
- User can save canvas state to backend
- User can load saved canvas
- Canvas performance: 60fps with 50 elements

---

#### Week 7-8: AI Content Boxes

**NEURA + SAGE + CATALYST + NOVA**

**Goals:**
- Integrate OpenAI GPT-4 Turbo
- Implement Claude 3 Sonnet fallback
- Build AI content box component
- Create token consumption tracking
- Implement 5 content box types

**Deliverables:**
- [ ] OpenAI integration
- [ ] Claude 3 fallback system
- [ ] AI content box UI component
- [ ] Token counting system
- [ ] 5 content box types implemented
- [ ] Cost estimation before generation

**Backend Tasks (NEURA + ORION):**
```typescript
// Week 7
- lib/aiProviders/openai.ts
- lib/aiProviders/claude.ts
- lib/aiProviders/tokenCounter.ts
- POST /api/v1/ai/generate-text
- POST /api/v1/ai/estimate-cost
- GET /api/v1/ai/token-balance

// Week 8
- Token consumption logging
- ai_token_transactions table inserts
- Rate limiting (10 req/min per user)
- Caching for identical requests
- Error handling and retries
```

**AI Content Box Types (SAGE):**
```yaml
1. Product Description Box:
   - Inputs: productName, features[], targetAudience
   - Prompt: "Write a compelling 150-300 word product description for {productName}..."
   - Token cost: ~500 tokens

2. Pricing Justification Box:
   - Inputs: price, paymentTerms, competitorPrices[]
   - Prompt: "Explain why our price of {price} offers the best value..."
   - Token cost: ~300 tokens

3. Location Highlight Box (Real Estate):
   - Inputs: address, neighborhood, amenities[]
   - Prompt: "Describe the location advantages of {address}..."
   - Token cost: ~400 tokens

4. Service Overview Box:
   - Inputs: serviceName, deliverables[], timeline
   - Prompt: "Write a professional service overview for {serviceName}..."
   - Token cost: ~450 tokens

5. Executive Summary Box:
   - Inputs: proposalContext, clientPainPoints[], solution
   - Prompt: "Create a C-level executive summary for this proposal..."
   - Token cost: ~800 tokens
```

**Frontend Tasks (NOVA + PHOENIX):**
```typescript
// Week 7
- components/TemplateDesigner/AIContentBox.tsx
- components/TemplateDesigner/AIInputModal.tsx
- Token balance header widget
- Cost estimation UI

// Week 8
- 5 content box type forms
- Text review/edit interface
- Loading states (AI generation in progress)
- Error states (insufficient tokens, API failure)
```

**Success Criteria:**
- User can add AI content box to canvas
- User can select box type and fill inputs
- System estimates token cost before generation
- AI generates text in < 10 seconds
- Generated text appears in canvas
- Token balance decrements correctly
- Fallback to Claude works if OpenAI fails
- User can edit generated text before applying

---

### Phase 3: Template Library & Assets (Weeks 9-12)

#### Week 9-10: Template Management

**ORION + NOVA + IRIS + PRISM**

**Goals:**
- Implement template save/load
- Build template library UI
- Create community templates feature
- Design 50 pre-built templates

**Deliverables:**
- [ ] Template library page
- [ ] Template search and filters
- [ ] Community templates (Premium)
- [ ] 50 pre-built templates
- [ ] Template usage tracking

**Backend Tasks (ORION):**
```typescript
// Week 9
- GET /api/v1/templates/library (user templates)
- GET /api/v1/templates/community (public templates)
- GET /api/v1/templates/pre-built (WebPropostas templates)
- POST /api/v1/templates/:id/duplicate
- POST /api/v1/templates/:id/publish (Premium only)

// Week 10
- Template search indexing (PostgreSQL full-text search)
- Category/style filtering
- Template usage analytics
- Thumbnail generation (Canvas to PNG)
```

**Frontend Tasks (NOVA):**
```typescript
// Week 9
- app/template-designer/library/page.tsx
- components/TemplateDesigner/TemplateCard.tsx
- components/TemplateDesigner/TemplateFilters.tsx
- Search bar with autocomplete

// Week 10
- Template preview modal
- "Use Template" flow (apply to new proposal)
- Community template publish flow (Premium)
- Template categories: real-estate, consulting, design, marketing
```

**Template Design (IRIS + PRISM):**
```yaml
50 Pre-built Templates by Category:
  Real Estate (15):
    - Apartment listing (modern)
    - House listing (luxury)
    - Land listing (rural)
    - Commercial property
    - Rental agreement

  Consulting (10):
    - Management consulting
    - IT consulting
    - Marketing strategy
    - Financial advisory

  Design & Creative (10):
    - Graphic design project
    - Web design proposal
    - Branding package
    - Logo design

  Marketing (10):
    - Social media campaign
    - Content marketing
    - SEO services
    - Email marketing

  Other (5):
    - Event planning
    - Catering services
    - Photography package
    - Freelance services
```

**Success Criteria:**
- User can browse template library
- User can filter by category and style
- User can preview template before using
- User can apply template to new proposal
- Premium user can publish template to community
- 50 pre-built templates available
- Template thumbnails render correctly

---

#### Week 11-12: Design Assets & Brand Kit

**ORION + NOVA + IRIS + AURELIA**

**Goals:**
- Integrate stock photo APIs (Unsplash, Pexels)
- Add icon library (10,000+ icons)
- Implement Brand Kit (Premium)
- Add charts and diagrams (Premium)

**Deliverables:**
- [ ] Unsplash API integration
- [ ] Pexels API integration
- [ ] Icon library with search
- [ ] Brand Kit manager
- [ ] Chart components
- [ ] Diagram components

**Backend Tasks (ORION):**
```typescript
// Week 11
- GET /api/v1/assets/stock-photos (Unsplash/Pexels proxy)
- GET /api/v1/assets/icons (10k+ icons from Heroicons, Font Awesome)
- POST /api/v1/brand-kit (save brand kit)
- GET /api/v1/brand-kit (load brand kit)

// Week 12
- S3 integration for logo uploads
- Brand kit application logic (apply to template)
- Stock photo download tracking
- Premium feature gating for charts/diagrams
```

**Frontend Tasks (NOVA + AURELIA):**
```typescript
// Week 11
- components/TemplateDesigner/StockPhotos.tsx
- components/TemplateDesigner/IconLibrary.tsx
- components/TemplateDesigner/BrandKitManager.tsx
- Search interfaces for assets

// Week 12
- components/TemplateDesigner/ChartBuilder.tsx (bar, line, pie)
- components/TemplateDesigner/DiagramBuilder.tsx (flowchart, timeline)
- Brand kit auto-apply feature
- Asset usage limits by plan
```

**Success Criteria:**
- User can search and insert stock photos
- User can search and insert icons
- Premium user can upload logo
- Premium user can define brand colors and fonts
- Premium user can apply brand kit to templates
- Premium user can add charts and diagrams
- Standard user limited to 10 stock photos/month

---

### Phase 4: Token Marketplace (Weeks 13-14)

#### Week 13-14: Token Marketplace & Auto-Refill

**ORION + VAULT + MERCURY + NOVA + ORACLE**

**Goals:**
- Build token marketplace UI
- Implement token purchase flow
- Create auto-refill system
- Build usage analytics dashboard

**Deliverables:**
- [ ] Token marketplace page
- [ ] 4 token packages
- [ ] Purchase flow (Stripe/Mercado Pago)
- [ ] Auto-refill configuration
- [ ] Token usage analytics
- [ ] Low balance alerts

**Backend Tasks (ORION + VAULT + MERCURY):**
```typescript
// Week 13
- GET /api/v1/marketplace/packages
- POST /api/v1/marketplace/purchase
- Token purchase transaction handling
- Stripe payment intent creation
- Mercado Pago payment link creation

// Week 14
- POST /api/v1/marketplace/auto-refill
- GET /api/v1/marketplace/auto-refill
- Auto-refill trigger logic (cron job)
- GET /api/v1/marketplace/analytics
- Token usage predictions (ORACLE)
```

**Frontend Tasks (NOVA):**
```typescript
// Week 13
- app/marketplace/tokens/page.tsx
- components/TokenMarketplace/PackageSelector.tsx
- components/TokenMarketplace/PurchaseFlow.tsx
- Token balance header widget (always visible)

// Week 14
- components/TokenMarketplace/AutoRefillConfig.tsx
- components/TokenMarketplace/UsageAnalytics.tsx
- Low balance modal (appears at 10% remaining)
- Purchase history table
```

**Success Criteria:**
- User can view 4 token packages
- User can purchase tokens via Stripe
- User can purchase tokens via PIX/boleto
- Tokens added to balance immediately
- Auto-refill triggers when threshold reached
- Usage analytics show token consumption by content box type
- Predictions estimate when user will run out of tokens

---

### Phase 5: Advanced Features (Weeks 15-16)

#### Week 15-16: Premium Features

**ORION + NOVA + FLUX + CRONOS**

**Goals:**
- Export to PPTX (Premium)
- Custom subdomain (Premium)
- Real-time collaboration (Premium)
- Team management (Premium)

**Deliverables:**
- [ ] PPTX export functionality
- [ ] Custom subdomain provisioning
- [ ] Socket.io collaboration
- [ ] Team invitation system
- [ ] White-label option

**Tasks:**
```yaml
Week 15:
  - PPTX export library integration (PptxGenJS)
  - Custom subdomain Route 53 automation
  - Real-time collaboration Socket.io setup
  - Operational Transformation (OT) for canvas

Week 16:
  - Team management (invite members)
  - Role-based access (Editor, Viewer)
  - White-label configuration (remove branding)
  - API access documentation
```

**Success Criteria:**
- Premium user can export template to PPTX
- Premium user can setup custom subdomain
- Multiple Premium users can edit template simultaneously
- Premium user can invite 3 team members
- White-label removes WebPropostas branding

---

### Phase 6: Testing & Refinement (Weeks 17-18)

#### Week 17-18: Quality Assurance & Optimization

**TESTER + SENTINEL + VULCAN + FORTRESS + CLARITY**

**Goals:**
- Comprehensive testing (E2E, load, security)
- Performance optimization
- Accessibility compliance
- Bug fixes

**Deliverables:**
- [ ] E2E test suite
- [ ] Load test results (1000 concurrent users)
- [ ] Security audit report
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Bug fixes

**Testing Strategy (TESTER + SENTINEL):**
```yaml
E2E Tests (Playwright):
  - User registration → Subscription → Template creation → AI generation → Save → Export
  - Freemium limits enforcement
  - Upgrade flow (freemium → standard → premium)
  - Token purchase flow
  - Auto-refill trigger

Load Tests (Artillery):
  - 1000 concurrent users creating templates
  - 500 simultaneous AI text generations
  - 10,000 template library page loads/minute

Security Tests (FORTRESS):
  - OWASP Top 10 scan (OWASP ZAP)
  - SQL injection attempts
  - XSS vulnerability scan
  - LGPD compliance validation
  - Payment data security (PCI-DSS)

Performance Tests (VULCAN):
  - Canvas editor FPS benchmarks
  - API response time (95th percentile < 300ms)
  - Page load time (< 3 seconds)
  - Database query optimization

Accessibility Tests (CLARITY):
  - Keyboard navigation
  - Screen reader compatibility (NVDA, JAWS)
  - Color contrast ratios (WCAG AA)
  - Focus indicators
```

**Success Criteria:**
- E2E tests: 95%+ pass rate
- Load tests: System handles 1000 concurrent users
- Security: Zero critical vulnerabilities
- Performance: Page load < 3s, API response < 300ms
- Accessibility: WCAG 2.1 AA compliant
- All P0/P1 bugs fixed

---

### Phase 7: Beta Launch (Week 19)

#### Week 19: Beta Testing Program

**MAESTRO + NAVIGATOR + HARMONY + ECHO**

**Goals:**
- Invite 100 beta users
- Collect feedback
- Iterate on UX issues
- Monitor metrics

**Deliverables:**
- [ ] 100 beta users onboarded
- [ ] Feedback surveys (NPS, feature satisfaction)
- [ ] User interviews (10 sessions)
- [ ] Analytics dashboard (Mixpanel)
- [ ] Bug fixes from beta

**Beta User Selection:**
```yaml
Cohort 1 (25 users): Existing power users (> 50 proposals created)
Cohort 2 (25 users): Real estate agents
Cohort 3 (25 users): Freelancers/consultants
Cohort 4 (25 users): Small agencies (5-10 employees)
```

**Feedback Collection:**
- In-app NPS survey (pop-up after 7 days)
- Feature satisfaction survey (Typeform)
- User interviews (30-minute Zoom calls)
- Mixpanel event tracking (activation, retention, feature usage)

**Success Criteria:**
- 80%+ beta users create at least 1 template
- 60%+ beta users use AI content boxes
- NPS score > 40
- < 10 P0/P1 bugs discovered
- 50%+ beta users request Premium trial

---

### Phase 8: Public Launch (Week 20)

#### Week 20: Go-Live & Launch Campaign

**MAESTRO + RAILWAY CONDUCTOR + ECHO + PULSE + AMPLIFY**

**Goals:**
- Deploy to production
- Launch marketing campaign
- Monitor system stability
- Provide 24/7 support

**Deliverables:**
- [ ] Production deployment
- [ ] Marketing campaign launch
- [ ] Email announcement (all users)
- [ ] Blog post & press release
- [ ] Social media campaign
- [ ] 24/7 support coverage

**Deployment Tasks (RAILWAY CONDUCTOR):**
```yaml
Day 1:
  - Merge feature/webpropostas-v2 → master
  - Deploy backend to Railway
  - Deploy frontend to Railway
  - Run database migrations (production)
  - Verify all services healthy

Day 2:
  - Enable feature flags (10% rollout)
  - Monitor error rates (Sentry)
  - Monitor performance (Railway metrics)
  - Gradually increase rollout (25%, 50%, 100%)

Day 3-7:
  - Monitor user activation
  - Track conversion rates (freemium → paid)
  - Respond to support tickets < 2 hours
  - Fix critical bugs immediately
```

**Marketing Campaign (ECHO + PULSE + AMPLIFY):**
```yaml
Email Announcement:
  - Subject: "Introducing WebPropostas V2: AI-Powered Proposal Design"
  - Send to 5,000 existing users
  - Include video tutorial (2 minutes)
  - CTA: "Try Template Designer Now"

Blog Post:
  - Title: "How AI is Revolutionizing Business Proposals in Brazil"
  - SEO keywords: proposta comercial, IA, template, design
  - Publish on infigital.net/blog

Social Media:
  - Instagram carousel (10 slides): Before/After templates
  - LinkedIn post: Targeting freelancers and agencies
  - Facebook ads: R$ 5,000 budget, targeting "empreendedores"

Press Release:
  - Distribute to Brazilian tech media (Exame, StartSe, TechCrunch Brazil)
  - Angle: "Brazilian startup democratizes proposal creation with AI"
```

**Success Criteria:**
- Zero downtime during deployment
- < 1% error rate in first 48 hours
- 1,000+ users activate V2 features in Week 1
- 100+ paid subscriptions in Week 1 (10% conversion)
- Average support response time < 2 hours
- System performance maintained (< 3s page load, < 300ms API)

---

## 6. Risk Assessment & Mitigation

### 6.1 Technical Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Canvas performance degrades with 100+ elements** | Medium | High | Implement virtualization (render only visible elements), use Web Workers for heavy operations, optimize Fabric.js rendering |
| **OpenAI API costs exceed budget** | Medium | High | Aggressive caching (Redis), multi-provider strategy (Claude fallback), token usage limits, cost alerts at R$ 5k/month |
| **Real-time collaboration causes data conflicts** | Low | Medium | Operational Transformation (OT) implementation, conflict resolution UI, auto-save with version history |
| **Database performance issues with large canvas JSON** | Low | Medium | Store canvas data in S3, keep metadata in PostgreSQL, CDN caching for thumbnails |
| **Stripe/Mercado Pago webhook failures** | Low | High | Retry logic (exponential backoff), webhook signature verification, manual reconciliation dashboard |
| **Railway deployment failures** | Low | High | Blue-green deployment, automated rollback, health checks, staging environment validation |

**Critical Path Mitigations:**
- **OpenAI cost management:** Set hard cap at R$ 10k/month, implement rate limiting (10 requests/min per user), cache identical prompts for 24 hours
- **Canvas performance:** Benchmark with 200 elements, optimize rendering loop, lazy-load off-screen elements
- **Payment webhook resilience:** Queue webhook events (Redis), process asynchronously, alert on 10+ failed webhooks

---

### 6.2 Business Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Freemium conversion < 10%** | Medium | High | A/B test proposal limits (3 vs 5), improve upgrade prompts, add 7-day Premium trial, gamification (badges) |
| **Premium price too high for Brazilian market** | Low | Medium | Introduce mid-tier "Professional" plan at R$ 129, annual discount (17% off), regional pricing for Northeast Brazil |
| **Token marketplace cannibalizes Premium upgrades** | Medium | Medium | Price tokens so Premium is better value (R$ 100 for 50k tokens vs R$ 199 for 50k + unlimited proposals), show "Premium saves you R$ X/month" |
| **Competitors copy features in 6 months** | High | Medium | Build network effects (community templates), invest in brand (thought leadership content), patent AI content box concept |
| **LGPD compliance issues** | Low | High | Privacy policy review by lawyer, data anonymization in AI logs, user consent for community template publishing |

**Conversion Optimization Plan:**
1. **Week 19 (Beta):** Test 3 vs 5 proposal limit, measure conversion rates
2. **Week 21:** Implement best-performing limit, add upgrade prompts at strategic points (4th proposal attempt, token depletion)
3. **Week 22:** Launch 7-day Premium trial for Standard users, track trial-to-paid conversion
4. **Week 23:** Introduce referral program (500 free tokens per referral), measure viral coefficient

---

### 6.3 User Experience Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Template designer too complex for non-designers** | Medium | High | Interactive tutorials (Intro.js), video walkthroughs (Loom), simplified "Quick Start" templates, AI design suggestions |
| **AI-generated text is low quality** | Low | High | Prompt engineering, Claude fallback (higher quality), user feedback loop ("Was this helpful?"), manual editing always available |
| **Users run out of tokens and churn** | Medium | Medium | Generous Standard allocation (10k tokens = 20 AI generations), clear value messaging ("Save 10 hours/month"), token purchase CTA |
| **Canvas editor doesn't work on mobile** | High | Low | Detect mobile devices, show "Desktop required for editing" message, allow mobile template preview only |
| **Loading times frustrate users** | Medium | Medium | Optimize bundle size (< 500KB), lazy-load canvas libraries, CDN for assets, skeleton loaders |

**UX Testing Plan:**
- **Week 19 (Beta):** Conduct 10 usability tests (real estate agents, freelancers), identify top 3 pain points
- **Week 20 (Launch):** Implement quick fixes (< 2 days dev time)
- **Week 21:** User interviews with churned users, understand why they left
- **Week 22:** Iterate on onboarding flow based on activation data (Mixpanel)

---

## 7. Testing & Quality Assurance

### 7.1 Automated Testing Strategy

#### Unit Tests (Jest + React Testing Library)

**Coverage Target:** 80% code coverage

**Frontend Unit Tests:**
```typescript
// components/TemplateDesigner/Canvas.test.tsx
- Canvas initialization
- Element addition (text, shape, image)
- Element manipulation (resize, rotate, delete)
- Save/load canvas state
- AI content box interactions

// components/Subscription/PlanComparison.test.tsx
- Plan display (freemium, standard, premium)
- Feature comparison rendering
- Upgrade button functionality
- Pricing calculation (monthly vs annual)

// hooks/useTokenBalance.test.ts
- Token balance fetching
- Token consumption tracking
- Low balance detection
- Auto-refill trigger
```

**Backend Unit Tests:**
```typescript
// services/api/src/routes/templates.test.js
- Template CRUD operations
- Canvas data validation
- Permission checks (user owns template)
- Category/style filtering

// services/api/src/routes/ai.test.js
- OpenAI text generation
- Claude fallback mechanism
- Token counting accuracy
- Cost estimation

// services/api/src/middleware/subscriptionMiddleware.test.js
- Feature gating (freemium, standard, premium)
- Proposal limit enforcement
- Token limit enforcement
- Upgrade prompt triggering
```

**Test Command:**
```bash
# Frontend
cd services/frontend
npm run test:coverage

# Backend
cd services/api
npm run test:coverage
```

---

#### Integration Tests (Supertest + Playwright)

**API Integration Tests:**
```javascript
// Test: Complete subscription flow
POST /api/v1/subscriptions/subscribe
→ Verify user_subscriptions record created
→ Verify Stripe subscription created
→ Verify webhook processed correctly

// Test: Template creation with AI generation
POST /api/v1/templates (create template with AI content box)
→ POST /api/v1/ai/generate-text (generate content)
→ PUT /api/v1/templates/:id (save with generated content)
→ Verify token balance decremented
→ Verify ai_token_transactions logged

// Test: Token marketplace purchase
POST /api/v1/marketplace/purchase
→ Verify Stripe payment intent created
→ Verify tokens added to balance
→ Verify token_purchases record created
→ Verify notification email sent
```

**E2E Tests (Playwright):**
```typescript
// Test: Freemium user upgrade flow
test('Freemium user upgrades to Standard', async ({ page }) => {
  // 1. Register freemium user
  await page.goto('/auth/register');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // 2. Create 3 proposals (freemium limit)
  for (let i = 0; i < 3; i++) {
    await page.goto('/dashboard/proposals/new');
    await page.fill('input[name="title"]', `Test Proposal ${i + 1}`);
    await page.click('button:has-text("Salvar")');
  }

  // 3. Attempt 4th proposal → upgrade prompt
  await page.goto('/dashboard/proposals/new');
  await expect(page.locator('text=Upgrade to Standard')).toBeVisible();

  // 4. Upgrade to Standard
  await page.click('button:has-text("Ver Planos")');
  await page.click('button:has-text("Assinar Standard")');
  await page.fill('input[name="cardNumber"]', '4242424242424242');
  await page.click('button:has-text("Confirmar Pagamento")');

  // 5. Verify subscription active
  await expect(page.locator('text=Plano: Standard')).toBeVisible();

  // 6. Create 4th proposal successfully
  await page.goto('/dashboard/proposals/new');
  await page.fill('input[name="title"]', 'Test Proposal 4');
  await page.click('button:has-text("Salvar")');
  await expect(page.locator('text=Proposta salva com sucesso')).toBeVisible();
});

// Test: Template creation with AI generation
test('User creates template with AI content box', async ({ page }) => {
  // 1. Login as Standard user
  await page.goto('/auth/login');
  await page.fill('input[name="email"]', 'standard@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // 2. Go to template designer
  await page.goto('/template-designer/new');

  // 3. Add AI content box to canvas
  await page.click('button:has-text("IA 🤖")');
  await page.dragAndDrop('.ai-content-box', '.canvas', { targetPosition: { x: 100, y: 100 } });

  // 4. Configure AI inputs
  await page.click('.ai-content-box');
  await page.click('button:has-text("Configurar IA")');
  await page.fill('input[name="productName"]', 'Marketing Analytics Tool');
  await page.fill('input[name="features"]', 'Real-time dashboards, Custom reports');
  await page.fill('input[name="targetAudience"]', 'Marketing managers');

  // 5. Generate AI text
  await page.click('button:has-text("Gerar Texto")');
  await expect(page.locator('text=Gerando...')).toBeVisible();
  await expect(page.locator('.ai-generated-text')).toBeVisible({ timeout: 15000 });

  // 6. Verify token balance decremented
  const tokenBalance = await page.locator('.token-balance').textContent();
  expect(parseInt(tokenBalance)).toBeLessThan(10000); // Started with 10k

  // 7. Apply text to canvas
  await page.click('button:has-text("Aplicar")');
  await expect(page.locator('.canvas .text-element')).toContainText('Marketing Analytics Tool');

  // 8. Save template
  await page.click('button:has-text("Salvar Template")');
  await page.fill('input[name="templateName"]', 'Marketing Proposal Template');
  await page.click('button:has-text("Confirmar")');
  await expect(page.locator('text=Template salvo com sucesso')).toBeVisible();
});
```

---

#### Load Testing (Artillery)

**Load Test Scenarios:**

```yaml
# artillery-load-test.yml
config:
  target: "https://api.webpropostas.com.br"
  phases:
    - duration: 300  # 5 minutes ramp-up
      arrivalRate: 10
      rampTo: 100
    - duration: 600  # 10 minutes sustained load
      arrivalRate: 100
    - duration: 300  # 5 minutes ramp-down
      arrivalRate: 100
      rampTo: 10
  processor: "./load-test-processor.js"

scenarios:
  - name: "User creates template with AI generation"
    flow:
      - post:
          url: "/api/v1/auth/login"
          json:
            email: "{{ $randomEmail() }}"
            password: "password123"
          capture:
            - json: "$.token"
              as: "authToken"

      - post:
          url: "/api/v1/templates"
          headers:
            Authorization: "Bearer {{ authToken }}"
          json:
            name: "Load Test Template {{ $randomString() }}"
            canvas_data: "{{ $loadCanvasData() }}"
          capture:
            - json: "$.id"
              as: "templateId"

      - post:
          url: "/api/v1/ai/generate-text"
          headers:
            Authorization: "Bearer {{ authToken }}"
          json:
            boxType: "product-description"
            inputs:
              productName: "Test Product {{ $randomString() }}"
              features: ["Feature 1", "Feature 2"]
              targetAudience: "Test Audience"
            templateId: "{{ templateId }}"

      - think: 5  # Simulate user reading generated text

      - put:
          url: "/api/v1/templates/{{ templateId }}"
          headers:
            Authorization: "Bearer {{ authToken }}"
          json:
            canvas_data: "{{ $updatedCanvasData() }}"

  - name: "User browses template library"
    flow:
      - get:
          url: "/api/v1/templates/library"
          headers:
            Authorization: "Bearer {{ authToken }}"

      - get:
          url: "/api/v1/templates/community"
          headers:
            Authorization: "Bearer {{ authToken }}"

      - get:
          url: "/api/v1/templates/pre-built"
          headers:
            Authorization: "Bearer {{ authToken }}"
```

**Load Test Success Criteria:**
- 95th percentile response time < 300ms for API endpoints
- 99th percentile response time < 1 second
- Error rate < 0.5% under sustained load (100 req/s)
- Database connection pool doesn't exhaust (max 20 connections)
- Redis cache hit rate > 70%
- OpenAI API rate limit not exceeded (500 req/min)

**Load Test Execution:**
```bash
# Install Artillery
npm install -g artillery

# Run load test
artillery run artillery-load-test.yml --output load-test-report.json

# Generate HTML report
artillery report load-test-report.json --output load-test-report.html
```

---

### 7.2 Security Testing

**Security Audit Checklist (FORTRESS Agent):**

#### OWASP Top 10 Validation

```yaml
1. Broken Access Control:
   - ✓ Test: User A cannot access User B's templates
   - ✓ Test: Freemium user cannot access Premium features
   - ✓ Test: Organization isolation (user cannot see other org's data)
   - ✓ Test: JWT token expiration enforced (15 minutes)

2. Cryptographic Failures:
   - ✓ Test: Passwords hashed with bcrypt (cost factor 12)
   - ✓ Test: HTTPS enforced (Railway auto-SSL)
   - ✓ Test: JWT secret strength (min 32 characters)
   - ✓ Test: Database credentials encrypted in Railway

3. Injection:
   - ✓ Test: SQL injection attempts fail (parameterized queries)
   - ✓ Test: NoSQL injection in canvas_data JSON field
   - ✓ Test: Command injection in AI prompts
   - ✓ Test: XSS in template names and descriptions

4. Insecure Design:
   - ✓ Test: Rate limiting prevents brute force (10 req/min for AI)
   - ✓ Test: Canvas data size limits (max 5MB JSON)
   - ✓ Test: AI prompt sanitization (no prompt injection)
   - ✓ Test: Payment webhook signature validation

5. Security Misconfiguration:
   - ✓ Test: CORS allows only webpropostas.com.br origins
   - ✓ Test: HTTP security headers (CSP, X-Frame-Options)
   - ✓ Test: Error messages don't leak sensitive info
   - ✓ Test: Database backups encrypted at rest

6. Vulnerable Components:
   - ✓ Test: npm audit shows 0 high/critical vulnerabilities
   - ✓ Test: Fabric.js version up-to-date (no known CVEs)
   - ✓ Test: Next.js version 14+ (latest security patches)

7. Identification & Authentication:
   - ✓ Test: Password strength requirements (min 8 chars)
   - ✓ Test: Account lockout after 5 failed login attempts
   - ✓ Test: Session tokens revoked on logout
   - ✓ Test: Multi-factor authentication (future feature)

8. Software & Data Integrity:
   - ✓ Test: Payment webhooks verified with signature
   - ✓ Test: CI/CD pipeline code review required
   - ✓ Test: Database migrations reversible
   - ✓ Test: Backup restore tested quarterly

9. Security Logging:
   - ✓ Test: Failed login attempts logged (Winston)
   - ✓ Test: Subscription changes logged
   - ✓ Test: Token purchases logged
   - ✓ Test: AI generation requests logged (for audit)

10. Server-Side Request Forgery (SSRF):
    - ✓ Test: Stock photo API calls validated (Unsplash/Pexels only)
    - ✓ Test: Template thumbnail generation doesn't fetch arbitrary URLs
    - ✓ Test: Webhook endpoints don't follow redirects
```

**Penetration Testing (Week 17):**
```bash
# OWASP ZAP automated scan
docker run -t owasp/zap2docker-stable zap-full-scan.py \
  -t https://staging.webpropostas.com.br \
  -r zap-report.html

# Manual testing by FORTRESS agent
- Attempt privilege escalation (freemium → premium without payment)
- Test payment bypass (Stripe test mode vs production mode)
- Test AI token theft (steal tokens from another user)
- Test template injection (malicious canvas_data)
```

**LGPD Compliance Validation:**
```yaml
User Rights Implementation:
  - ✓ Right to Access: GET /api/v1/user/data-export (returns all user data as JSON)
  - ✓ Right to Rectification: PUT /api/v1/user/profile (update personal data)
  - ✓ Right to Erasure: DELETE /api/v1/user/account (anonymize or delete all data)
  - ✓ Right to Object: POST /api/v1/user/consent (withdraw consent for AI data usage)

Data Processing Records:
  - ✓ Privacy policy updated (mention AI text generation, community templates)
  - ✓ Consent forms for community template publishing
  - ✓ Data retention policy (delete inactive users after 2 years)
  - ✓ AI logs anonymized (no PII in OpenAI requests)
```

---

### 7.3 Accessibility Testing (CLARITY Agent)

**WCAG 2.1 AA Compliance:**

```yaml
Perceivable:
  - ✓ Text alternatives for images (alt tags on stock photos)
  - ✓ Captions for video tutorials (Loom auto-captions)
  - ✓ Color contrast ratio ≥ 4.5:1 (text vs background)
  - ✓ Canvas editor zoom up to 200% (no loss of content)

Operable:
  - ✓ Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
  - ✓ No keyboard traps (can exit all modals with Esc)
  - ✓ Skip to content link (bypass navigation)
  - ✓ Focus indicators visible (2px blue outline)

Understandable:
  - ✓ Clear error messages ("Email inválido. Use formato: exemplo@email.com")
  - ✓ Consistent navigation (same layout on all pages)
  - ✓ Form labels visible and descriptive
  - ✓ Help text for complex features (AI content boxes)

Robust:
  - ✓ Valid HTML5 (W3C validator passes)
  - ✓ ARIA landmarks (header, main, footer, nav)
  - ✓ ARIA labels for icon buttons ("Salvar template")
  - ✓ Screen reader tested (NVDA on Windows)
```

**Accessibility Testing Tools:**
```bash
# Axe DevTools (browser extension)
- Scan all pages for WCAG violations
- Fix all critical and serious issues

# Pa11y CI (automated testing)
pa11y-ci --sitemap https://webpropostas.com.br/sitemap.xml

# Manual testing with screen reader
- NVDA (Windows): Test entire user flow (register → create template → AI generation → save)
- JAWS (Windows): Test subscription flow
- VoiceOver (macOS): Test token marketplace
```

---

## 8. Deployment Strategy

### 8.1 Railway Production Deployment

**Deployment Architecture:**

```yaml
Railway Services:
  webpropostas-v2-api:
    Service: Backend API (Node.js/Express)
    Region: us-west1
    Root Directory: services/api
    Build Command: npm ci && npm run build
    Start Command: npm start
    Environment Variables:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=${RAILWAY_POSTGRES_URL}
      - REDIS_URL=${RAILWAY_REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - CLAUDE_API_KEY=${CLAUDE_API_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
      - MERCADOPAGO_ACCESS_TOKEN=${MERCADOPAGO_ACCESS_TOKEN}
      - AWS_S3_BUCKET=webpropostas-assets
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    Health Check: /api/health
    Auto-deploy: main branch

  webpropostas-v2-frontend:
    Service: Next.js Frontend
    Region: us-west1
    Root Directory: services/frontend
    Build Command: npm ci && npm run build
    Start Command: npm start
    Environment Variables:
      - NODE_ENV=production
      - PORT=3001
      - NEXT_PUBLIC_API_URL=https://api.webpropostas.com.br
      - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
    Health Check: /_next/health
    Auto-deploy: main branch

  webpropostas-postgres:
    Service: PostgreSQL 15
    Plan: Shared (512MB RAM, 1GB storage)
    Auto-backups: Daily at 2am UTC
    Connection String: ${RAILWAY_POSTGRES_URL}

  webpropostas-redis:
    Service: Redis 7
    Plan: Shared (256MB RAM)
    Persistence: RDB snapshots every 60 seconds
    Connection String: ${RAILWAY_REDIS_URL}
```

**Deployment Steps (RAILWAY CONDUCTOR):**

#### Week 17: Staging Deployment

```bash
# Day 1: Setup Railway services
railway login
railway project new webpropostas-v2-staging

# Create PostgreSQL database
railway add --service postgres
railway variables set DATABASE_URL=${RAILWAY_POSTGRES_URL}

# Create Redis instance
railway add --service redis
railway variables set REDIS_URL=${RAILWAY_REDIS_URL}

# Deploy backend API
cd services/api
railway init --service webpropostas-v2-api-staging
railway up
railway logs --service webpropostas-v2-api-staging

# Deploy frontend
cd ../services/frontend
railway init --service webpropostas-v2-frontend-staging
railway up
railway logs --service webpropostas-v2-frontend-staging

# Run database migrations
railway run npm run migrate
```

#### Week 20: Production Deployment

**Pre-Deployment Checklist:**
- [ ] All tests passing (unit, integration, E2E)
- [ ] Security audit completed (zero critical vulnerabilities)
- [ ] Performance benchmarks met (< 3s page load, < 300ms API)
- [ ] Staging environment validated (no errors in 7 days)
- [ ] Database migrations tested on staging
- [ ] Backup and rollback procedures documented
- [ ] Monitoring and alerting configured (Sentry, Railway)
- [ ] Environment variables set in Railway (production)
- [ ] SSL certificates provisioned (Railway auto-SSL)
- [ ] Custom domain configured (webpropostas.com.br)
- [ ] Support team trained and on standby

**Deployment Timeline:**

```yaml
Day 1 (Sunday 2am UTC / Saturday 11pm BRT):
  02:00 - Enable maintenance mode on V1
  02:05 - Backup production database (pg_dump)
  02:10 - Merge feature/webpropostas-v2 → main
  02:15 - Deploy backend to Railway production
  02:20 - Run database migrations (10 new tables)
  02:30 - Verify migrations successful
  02:35 - Deploy frontend to Railway production
  02:40 - Smoke test (login, create proposal, upgrade flow)
  02:50 - Disable maintenance mode
  03:00 - Monitor error rates (Sentry)

Day 1 (3am-9am):
  - Monitor system stability (error rate < 0.5%)
  - Respond to critical bugs immediately
  - Rollback if error rate > 5%

Day 1 (9am):
  - Send email announcement to all users
  - Publish blog post
  - Launch social media campaign
  - Activate paid ads (Google, Facebook)

Day 1-7:
  - 24/7 support coverage (rotate shifts)
  - Monitor conversion rates (freemium → paid)
  - Track activation metrics (% users creating templates)
  - Fix P0/P1 bugs within 4 hours
```

**Rollback Procedure:**

```yaml
Trigger Rollback if:
  - Error rate > 5% for 10+ minutes
  - Database corruption detected
  - Payment processing failures > 10 in 1 hour
  - System downtime > 5 minutes

Rollback Steps (< 5 minutes):
  1. Enable maintenance mode
  2. Revert Railway deployment to previous version (railway rollback)
  3. Restore database from backup (pg_restore)
  4. Verify V1 functionality
  5. Disable maintenance mode
  6. Post-mortem analysis (identify root cause)
```

**Post-Deployment Monitoring (Week 20-24):**

```yaml
Real-time Monitoring:
  - Sentry: Error tracking, performance monitoring
  - Railway Metrics: CPU, memory, network usage
  - Mixpanel: User activation, conversion funnels
  - Google Analytics: Page views, bounce rates

Daily Checks (Week 20-21):
  - Error rate < 0.5%
  - API response time < 300ms (95th percentile)
  - Database queries < 100ms (95th percentile)
  - Support tickets < 10/day
  - Conversion rate ≥ 10%

Weekly Reviews (Week 21-24):
  - User feedback analysis (NPS surveys)
  - Feature usage analytics (Mixpanel)
  - Revenue metrics (MRR, ARPU, LTV/CAC)
  - Cost analysis (OpenAI API, Railway infrastructure)
  - Roadmap prioritization (V2.1 features)
```

---

### 8.2 Database Migration Execution

**Migration Scripts (services/api/migrations/):**

#### 001_add_v2_tables.sql
```sql
-- Run time: ~3 minutes
-- Reversible: Yes (DROP TABLE cascade)

BEGIN;

-- subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  -- [full schema as defined in Section 3.1]
);

-- user_subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  -- [full schema as defined in Section 3.1]
);

-- ai_token_balances table
CREATE TABLE IF NOT EXISTS ai_token_balances (
  -- [full schema as defined in Section 3.1]
);

-- [... all other tables]

COMMIT;

-- Rollback script
-- DROP TABLE auto_refill_settings CASCADE;
-- DROP TABLE token_purchases CASCADE;
-- DROP TABLE token_packages CASCADE;
-- DROP TABLE template_usage_logs CASCADE;
-- DROP TABLE proposal_templates CASCADE;
-- DROP TABLE brand_kits CASCADE;
-- DROP TABLE ai_token_transactions CASCADE;
-- DROP TABLE ai_token_balances CASCADE;
-- DROP TABLE user_subscriptions CASCADE;
-- DROP TABLE subscription_plans CASCADE;
```

#### 002_seed_subscription_plans.sql
```sql
-- Seed data for subscription_plans and token_packages
INSERT INTO subscription_plans (...) VALUES (...);
INSERT INTO token_packages (...) VALUES (...);
```

#### 003_migrate_existing_users.sql
```sql
-- Assign all existing users to Freemium plan
-- Initialize token balances
-- [As defined in Section 3.2]
```

**Migration Execution:**
```bash
# Staging (Week 17)
railway run --service webpropostas-v2-api-staging npm run migrate

# Production (Week 20, 2am UTC)
railway run --service webpropostas-v2-api-production npm run migrate
```

---

### 8.3 Environment Variable Management

**Critical Environment Variables:**

**Backend API (19 variables):**
```bash
# Core
NODE_ENV=production
PORT=3000
LOG_LEVEL=info

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db  # Railway auto-generated
REDIS_URL=redis://host:6379                       # Railway auto-generated

# Authentication
JWT_SECRET=                                        # Min 32 chars, generate with: openssl rand -base64 32
JWT_REFRESH_SECRET=                                # Different from JWT_SECRET
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# AI Providers
OPENAI_API_KEY=sk-...                             # OpenAI dashboard
CLAUDE_API_KEY=sk-ant-...                         # Anthropic dashboard
AI_TOKEN_COST_PER_1K=0.002                        # BRL cost per 1k tokens
AI_RATE_LIMIT_PER_MINUTE=10

# Payment Processing
STRIPE_SECRET_KEY=sk_live_...                     # Stripe dashboard
STRIPE_PUBLISHABLE_KEY=pk_live_...                # Stripe dashboard
STRIPE_WEBHOOK_SECRET=whsec_...                   # Stripe webhooks
MERCADOPAGO_ACCESS_TOKEN=APP_USR-...              # Mercado Pago dashboard

# AWS S3
AWS_S3_BUCKET=webpropostas-assets
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1

# URLs
FRONTEND_URL=https://webpropostas.com.br
CORS_ORIGIN=https://webpropostas.com.br
```

**Frontend (6 variables):**
```bash
# Core
NODE_ENV=production
PORT=3001

# API
NEXT_PUBLIC_API_URL=https://api.webpropostas.com.br

# Payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Analytics
NEXT_PUBLIC_MIXPANEL_TOKEN=...
```

**Secrets Management:**
- Store secrets in Railway dashboard (encrypted at rest)
- Use Railway CLI to set variables: `railway variables set KEY=value`
- Never commit secrets to Git (`.env` files in `.gitignore`)
- Rotate secrets quarterly (JWT_SECRET, API keys)

---

## 9. Post-Launch Monitoring

### 9.1 Week 1 Metrics (Critical Monitoring)

**System Health (Check every hour):**
- Error rate < 0.5% (Sentry)
- API response time < 300ms (95th percentile)
- Database queries < 100ms (95th percentile)
- CPU usage < 70% (Railway metrics)
- Memory usage < 80% (Railway metrics)
- Disk space > 20% free (PostgreSQL)

**User Activation (Check daily):**
- New user registrations: Target 50/day
- Template designer activation: Target 30% (15 users/day)
- AI content box usage: Target 20% (10 users/day)
- Templates created: Target 50 templates/day
- AI text generations: Target 100 generations/day

**Revenue Metrics (Check daily):**
- Paid subscriptions: Target 100 in Week 1
- Conversion rate (freemium → paid): Target 10%
- Token purchases: Target 30 in Week 1
- MRR growth: Target +R$ 7,900 (100 × R$ 79)

**Support Metrics (Check hourly in Week 1):**
- Support tickets created: < 10/day
- Average response time: < 2 hours
- Ticket resolution time: < 24 hours
- Critical bugs (P0): 0 open tickets
- High priority bugs (P1): < 3 open tickets

---

### 9.2 Analytics Dashboard (Mixpanel)

**Key Events to Track:**

```typescript
// User Activation Events
mixpanel.track('User Registered', {
  plan: 'freemium',
  referralSource: 'google|facebook|email|organic'
});

mixpanel.track('Template Designer Opened', {
  userId: uuid,
  templateType: 'blank|pre-built|community'
});

mixpanel.track('AI Content Box Added', {
  userId: uuid,
  boxType: 'product-description|pricing-justification|...',
  templateId: uuid
});

mixpanel.track('AI Text Generated', {
  userId: uuid,
  boxType: string,
  tokensUsed: number,
  cost: number,
  model: 'gpt-4-turbo|claude-3-sonnet'
});

mixpanel.track('Template Saved', {
  userId: uuid,
  templateId: uuid,
  category: string,
  styleTags: string[]
});

// Conversion Events
mixpanel.track('Upgrade Prompt Shown', {
  userId: uuid,
  currentPlan: 'freemium',
  reason: 'proposal_limit|template_save|ai_tokens'
});

mixpanel.track('Subscription Upgraded', {
  userId: uuid,
  fromPlan: 'freemium',
  toPlan: 'standard|premium',
  billingCycle: 'monthly|annual',
  paymentMethod: 'credit_card|pix|boleto'
});

mixpanel.track('Token Purchase', {
  userId: uuid,
  packageId: uuid,
  tokensPurchased: number,
  amountPaid: number,
  paymentMethod: string
});

// Engagement Events
mixpanel.track('Template Used in Proposal', {
  userId: uuid,
  templateId: uuid,
  proposalId: uuid
});

mixpanel.track('Community Template Published', {
  userId: uuid,
  templateId: uuid,
  category: string
});

mixpanel.track('Brand Kit Created', {
  userId: uuid,
  hasLogo: boolean,
  colorCount: number,
  fontCount: number
});
```

**Conversion Funnels:**

```yaml
Funnel 1: Freemium → Standard Upgrade
  Step 1: User Registered (freemium) - 100% baseline
  Step 2: Created 3 Proposals - 60%
  Step 3: Attempted 4th Proposal (limit hit) - 40%
  Step 4: Upgrade Prompt Shown - 40%
  Step 5: Viewed Plan Comparison - 25%
  Step 6: Subscription Upgraded - 10% (TARGET)

Funnel 2: Template Designer Activation
  Step 1: User Logged In - 100% baseline
  Step 2: Clicked "Templates" Tab - 50%
  Step 3: Opened Template Designer - 30%
  Step 4: Added Element to Canvas - 20%
  Step 5: Saved Template - 15% (TARGET)

Funnel 3: AI Content Generation Adoption
  Step 1: User Opened Template Designer - 100% baseline
  Step 2: Clicked "AI 🤖" Button - 40%
  Step 3: Added AI Content Box - 30%
  Step 4: Filled AI Inputs - 25%
  Step 5: Generated AI Text - 20% (TARGET)

Funnel 4: Token Purchase
  Step 1: User Depleted Tokens (< 10% remaining) - 100% baseline
  Step 2: Low Token Alert Shown - 100%
  Step 3: Clicked "Buy Tokens" - 50%
  Step 4: Viewed Token Packages - 40%
  Step 5: Completed Purchase - 30% (TARGET)
```

---

### 9.3 Cost Monitoring

**Monthly Cost Projections (6 months post-launch):**

| Category | Month 1 | Month 3 | Month 6 | Notes |
|----------|---------|---------|---------|-------|
| **Railway Infrastructure** | R$ 200 | R$ 500 | R$ 1,200 | Pro plan, scaling with users |
| **OpenAI API** | R$ 1,000 | R$ 3,000 | R$ 8,000 | 70% margin on token sales |
| **AWS S3 + CloudFront** | R$ 150 | R$ 300 | R$ 600 | User uploads, template thumbnails |
| **Stripe Fees** | R$ 300 | R$ 1,200 | R$ 4,100 | 2.9% + $0.30 per transaction |
| **Mercado Pago Fees** | R$ 200 | R$ 800 | R$ 2,700 | 4.99% + R$ 0.40 per transaction |
| **Monitoring (Sentry, Mixpanel)** | R$ 150 | R$ 300 | R$ 500 | Pro plans |
| **Total Costs** | **R$ 2,000** | **R$ 6,100** | **R$ 17,100** | |
| **Revenue (MRR)** | R$ 10,000 | R$ 50,000 | R$ 138,700 | Target from PRD |
| **Gross Margin** | **80%** | **88%** | **88%** | Healthy SaaS margin |

**Cost Optimization Strategies:**
- **OpenAI:** Aggressive caching (Redis), prompt optimization (reduce tokens), multi-provider strategy (Claude cheaper for some use cases)
- **Railway:** Optimize container sizes, use horizontal scaling only when needed, implement CDN caching
- **Payment Processing:** Encourage PIX (lower fees than credit card), annual plans (fewer transactions)

---

### 9.4 Alert Configuration (Sentry + Railway)

**Critical Alerts (Pagerduty/Slack - immediate notification):**
- Error rate > 5% for 5 minutes → Alert on-call engineer
- Database down or unreachable → Alert DevOps team
- Payment webhook failures > 10 in 1 hour → Alert finance team
- API response time > 1 second (95th percentile) → Alert performance team

**Warning Alerts (Slack - notification within 1 hour):**
- Error rate > 1% for 15 minutes
- CPU usage > 80% for 10 minutes
- Memory usage > 90% for 5 minutes
- OpenAI API rate limit approaching (90% of limit)
- Support tickets > 20 unresolved

**Info Alerts (Email digest - daily):**
- Daily user activation summary (registrations, templates created)
- Daily revenue summary (subscriptions, token purchases)
- Daily cost summary (OpenAI, Railway, payment fees)
- Weekly user feedback digest (NPS surveys)

---

## 10. Success Metrics & KPIs

### 10.1 North Star Metrics

**Primary North Star:** Weekly Active Templates Created
- **Definition:** Number of templates created by active users per week
- **Target:** 500 templates/week by Month 6
- **Why:** Indicates product stickiness and user engagement

**Secondary North Stars:**
1. **Paid Conversion Rate:** Freemium → Paid within 90 days
   - Target: 15%
   - Current baseline (V1): 0% (no subscription system)

2. **Monthly Recurring Revenue (MRR):**
   - Month 1: R$ 10,000
   - Month 3: R$ 50,000
   - Month 6: R$ 138,700 (1,000 Standard + 300 Premium)

3. **30-Day Retention:**
   - Target: 70%
   - Definition: % of users who return to platform 30 days after registration

---

### 10.2 Product Metrics (Week-by-Week)

#### Week 1 Targets (Launch Week)
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| New User Registrations | 350 (50/day) | | |
| Template Designer Activation | 30% (105 users) | | |
| AI Content Box Usage | 20% (70 users) | | |
| Templates Created | 350 (50/day) | | |
| AI Text Generations | 700 (100/day) | | |
| Paid Subscriptions | 35 (10% conversion, 5/day) | | |
| Token Purchases | 10 | | |
| MRR Growth | +R$ 2,765 (35 × R$ 79) | | |

#### Week 4 Targets (1 Month Post-Launch)
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Total Users | 1,500 | | |
| Template Designer Activation | 450 (30%) | | |
| Templates Created (total) | 1,500 | | |
| AI Text Generations (total) | 3,000 | | |
| Paid Users | 150 (10% conversion) | | |
| Token Purchases (total) | 45 | | |
| MRR | R$ 11,850 | | |
| 30-Day Retention | 70% | | |

#### Month 6 Targets (Final Success Gate)
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Total Users | 10,000 | | |
| Paid Users | 1,300 (13% conversion) | | |
| - Standard Users | 1,000 (77%) | | |
| - Premium Users | 300 (23%) | | |
| Templates Created (total) | 65,000 (50 per paid user) | | |
| AI Text Generations (total) | 130,000 | | |
| Token Purchases (total) | 390 (30% of Standard) | | |
| MRR | R$ 138,700 | | |
| - Standard MRR | R$ 79,000 (1,000 × R$ 79) | | |
| - Premium MRR | R$ 59,700 (300 × R$ 199) | | |
| Token Sales (monthly) | R$ 19,500 (390 × R$ 50 avg) | | |
| Total Monthly Revenue | R$ 158,200 | | |
| 30-Day Retention | 70% | | |
| NPS Score | > 50 | | |

---

### 10.3 Financial Projections (6-Month Runway)

**Revenue Breakdown:**

| Month | Total Users | Paid Users | Standard | Premium | MRR | Token Sales | Total Revenue |
|-------|-------------|------------|----------|---------|-----|-------------|---------------|
| **1** | 1,500 | 150 (10%) | 120 | 30 | R$ 15,450 | R$ 2,250 | R$ 17,700 |
| **2** | 3,000 | 360 (12%) | 288 | 72 | R$ 37,032 | R$ 5,400 | R$ 42,432 |
| **3** | 5,000 | 650 (13%) | 520 | 130 | R$ 66,950 | R$ 9,750 | R$ 76,700 |
| **4** | 7,000 | 910 (13%) | 728 | 182 | R$ 93,430 | R$ 13,650 | R$ 107,080 |
| **5** | 8,500 | 1,105 (13%) | 884 | 221 | R$ 113,895 | R$ 16,575 | R$ 130,470 |
| **6** | 10,000 | 1,300 (13%) | 1,000 | 300 | R$ 138,700 | R$ 19,500 | R$ 158,200 |

**Growth Rate:**
- Month 1 → 2: **140% growth** (R$ 17.7k → R$ 42.4k)
- Month 2 → 3: **81% growth** (R$ 42.4k → R$ 76.7k)
- Month 3 → 6: **106% growth** (R$ 76.7k → R$ 158.2k)
- **Average Monthly Growth:** **86%**

**Customer Lifetime Value (LTV) Calculation:**

```yaml
Average Subscription:
  - Standard: R$ 79/month
  - Premium: R$ 199/month
  - Blended: R$ 106.69/month (weighted avg: 77% Standard, 23% Premium)

Average Lifetime:
  - Churn rate: 5% per month
  - Average lifetime: 1 / 0.05 = 20 months

LTV:
  - LTV = R$ 106.69 × 20 = R$ 2,133.80

Customer Acquisition Cost (CAC):
  - Marketing spend: R$ 10,000/month
  - New paid users: 150/month (Month 1)
  - CAC = R$ 10,000 / 150 = R$ 66.67

LTV/CAC Ratio:
  - R$ 2,133.80 / R$ 66.67 = 32:1 (Excellent! Target is 3:1)
```

**Profitability Timeline:**

| Month | Revenue | Costs | Gross Profit | Margin |
|-------|---------|-------|--------------|--------|
| 1 | R$ 17,700 | R$ 2,000 | R$ 15,700 | 89% |
| 2 | R$ 42,432 | R$ 3,500 | R$ 38,932 | 92% |
| 3 | R$ 76,700 | R$ 6,100 | R$ 70,600 | 92% |
| 4 | R$ 107,080 | R$ 10,000 | R$ 97,080 | 91% |
| 5 | R$ 130,470 | R$ 13,500 | R$ 116,970 | 90% |
| 6 | R$ 158,200 | R$ 17,100 | R$ 141,100 | 89% |

**Break-Even Analysis:**
- **Month 1:** Profitable (R$ 15,700 gross profit)
- **Payback Period:** Development costs (R$ 50k estimated) recovered by Month 3
- **Runway:** 6+ months with positive cash flow

---

### 10.4 Success Criteria Validation

**Launch Success (Week 1):**
- [ ] Zero critical bugs (P0)
- [ ] Error rate < 0.5%
- [ ] System uptime > 99.9%
- [ ] 350+ new user registrations
- [ ] 35+ paid subscriptions (10% conversion)
- [ ] NPS score > 30 (early adopters)

**Product-Market Fit (Month 3):**
- [ ] 5,000+ total users
- [ ] 650+ paid users (13% conversion maintained)
- [ ] 70% 30-day retention (users returning after 1 month)
- [ ] 80% template designer activation (paid users)
- [ ] NPS score > 40

**Sustainable Growth (Month 6):**
- [ ] 10,000+ total users
- [ ] 1,300+ paid users (13% conversion)
- [ ] R$ 138,700 MRR achieved
- [ ] LTV/CAC ratio > 3:1
- [ ] 89% gross margin
- [ ] NPS score > 50
- [ ] < 5% monthly churn

**If Success Criteria NOT Met:**

```yaml
Scenario 1: Conversion Rate < 10%
  Diagnosis: Upgrade prompts not compelling, freemium limits too generous
  Action:
    - A/B test freemium limits (3 vs 2 proposals)
    - Improve upgrade prompt copy (show $ saved, time saved)
    - Add 7-day Premium trial for Standard users
    - Implement exit-intent popups with discount offer (20% off 3 months)

Scenario 2: 30-Day Retention < 60%
  Diagnosis: Users not seeing value, onboarding flow confusing
  Action:
    - User interviews (10 churned users) - understand why they left
    - Improve onboarding tutorial (interactive Intro.js walkthrough)
    - Email drip campaign (Days 3, 7, 14, 21, 30 with tips and templates)
    - Implement "Quick Win" checklist (create 1 template in 10 min)

Scenario 3: NPS Score < 40
  Diagnosis: Product quality issues, missing features, poor support
  Action:
    - Analyze NPS feedback (qualitative comments)
    - Prioritize top 3 requested features for V2.1
    - Improve support response time (< 1 hour)
    - Add live chat for Premium users
    - Publish roadmap publicly (show we're listening)

Scenario 4: MRR < R$ 100k by Month 6
  Diagnosis: User growth too slow, pricing too low, churn too high
  Action:
    - Increase marketing spend (R$ 10k → R$ 20k/month)
    - Test higher pricing (Standard R$ 79 → R$ 99)
    - Launch referral program (500 tokens per referral)
    - Introduce mid-tier "Professional" plan at R$ 129
    - Implement win-back campaign for churned users (50% discount)
```

---

## Conclusion

This comprehensive implementation plan provides a detailed, actionable roadmap for developing WebPropostas V2 over 20 weeks. The plan leverages the full multi-agent system (Alpha, Beta, Gamma crews) with clear responsibilities, deliverables, and success criteria at each phase.

### Key Success Factors

1. **Phased Rollout:** Gradual feature introduction (Weeks 1-4 subscription, 5-8 canvas, 9-12 templates, 13-14 marketplace) reduces risk
2. **Comprehensive Testing:** 17-18 weeks dedicated to E2E, load, security, and accessibility testing ensures production readiness
3. **Expert Agent Coordination:** 78 specialist agents assigned to specific tasks based on expertise (ORION backend, NOVA frontend, NEURA AI, etc.)
4. **Clear Metrics:** North Star metrics (templates/week), conversion targets (15%), and financial projections (R$ 138k MRR by Month 6) provide measurable goals
5. **Risk Mitigation:** Detailed risk assessment with mitigation strategies for technical, business, UX, and compliance risks
6. **Brazilian Market Focus:** LGPD compliance, PIX/boleto payment, Portuguese localization, BRL pricing tailored to local market

### Next Steps (Immediate Actions)

1. **Week 1 (October 7-13):** ARCHITECT + CASSANDRA + CRONOS → Finalize architecture, create database schema, setup Railway staging
2. **Week 2 (October 14-20):** CASSANDRA → Execute database migrations, seed subscription plans
3. **Week 3 (October 21-27):** ORION + VAULT + MERCURY → Implement subscription API endpoints, Stripe integration
4. **Week 4 (October 28 - November 3):** NOVA + AURELIA → Build plan comparison UI, feature gating middleware

### Critical Milestones

- **Week 4:** Subscription system functional ✓
- **Week 8:** Template designer with AI content boxes ✓
- **Week 12:** Complete template library and asset integration ✓
- **Week 14:** Token marketplace live ✓
- **Week 18:** All testing complete, production-ready ✓
- **Week 19:** Beta launch (100 users) ✓
- **Week 20:** Public launch, marketing campaign ✓

### Resource Requirements

**Development Team:**
- 2-3 Full-Stack Developers (ORION, CASSANDRA, NEURA)
- 2 Frontend Developers (NOVA, AURELIA)
- 1 DevOps Engineer (CRONOS, RAILWAY CONDUCTOR)
- 1 QA Engineer (TESTER, SENTINEL)
- 1 Product Manager (NAVIGATOR, MAESTRO)

**Monthly Costs (Month 6):**
- Infrastructure (Railway, AWS): R$ 1,800
- AI APIs (OpenAI, Claude): R$ 8,000
- Payment Processing (Stripe, Mercado Pago): R$ 6,800
- Monitoring (Sentry, Mixpanel): R$ 500
- **Total:** R$ 17,100 (12% of revenue, 88% gross margin)

---

**Approval & Sign-Off:**

- [ ] **Product Owner:** _________________ Date: _______
- [ ] **Engineering Lead (ARCHITECT):** _________________ Date: _______
- [ ] **Frontend Lead (NOVA):** _________________ Date: _______
- [ ] **Backend Lead (ORION):** _________________ Date: _______
- [ ] **DevOps Lead (CRONOS):** _________________ Date: _______
- [ ] **QA Lead (TESTER):** _________________ Date: _______
- [ ] **Finance (ATLAS):** _________________ Date: _______
- [ ] **MAESTRO Orchestrator:** ✅ **APPROVED** Date: October 2, 2025

---

**Document Control:**
- **Version:** 1.0.0
- **Last Updated:** October 2, 2025
- **Next Review:** Week 4 (November 3, 2025) - Post-subscription system launch
- **Distribution:** Product, Engineering, Design, Finance, Executive teams
- **Confidentiality:** Internal Only - Strategic Planning Document

---

*This implementation plan is a living document and will be updated weekly based on sprint outcomes, technical discoveries, user feedback, and market changes throughout the V2 development cycle. All specialist agents (ARCHITECT, CASSANDRA, ORION, NOVA, NEURA, CRONOS, FORTRESS, TESTER, RAILWAY CONDUCTOR, and 69 others) have contributed their expertise to this comprehensive plan.*

**Ready to begin Week 1 development on MAESTRO's command.**
