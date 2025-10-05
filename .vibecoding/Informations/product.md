# Product Requirements Document (PRD)
## AI-Driven Commercial Proposal Platform

**Product:** WebPropostas
**Domain:** infigital.net
**Owner:** Fabio Hartmann Fernandes (Metamentes / In-Digital World)
**Version:** 2.0 (Consolidated & Updated)
**Date:** October 5, 2025
**Status:** Production Live - Enhancement Planning

---

## 0. Context & Current Status

### Platform Vision
A **secure, AI-powered web platform** that streamlines the commercial proposal lifecycle from creation to contract signature. The platform enables businesses to import designs from third-party tools (Canva, Gamma), collaborate with clients in real-time, edit with AI assistance, and automatically generate contracts upon approval.

### Current Implementation Status (October 2025)
- ✅ **Production Deployment**: Live on Railway infrastructure
- ✅ **Core Proposal Platform**: Creation, editing, client access operational
- ✅ **Authentication**: Multi-tenant JWT-based system
- ✅ **Client Collaboration**: Interactive review with comments and approvals
- ✅ **Analytics**: Real-time dashboard with conversion tracking
- 🚧 **AI Features**: OpenAI GPT-4 integration planned (Phase 20)
- 🚧 **Design Import**: Canva/Gamma pipeline planned (Phase 21)
- 🚧 **Contract Automation**: Generation and e-signature planned (Phase 23)

### North Star Metric
**Proposal → Signed Contract conversion rate** and **time-to-close reduction**

---

## 1. Goals & Non-Goals

### 1.1 Primary Goals

**G1. Import & Foundation**
- Pull proposal layouts/content from third-party editors (Canva, Gamma)
- Preserve structure, texts, images with ≥95% visual fidelity
- ✅ Current: Manual proposal creation operational (import planned Phase 21)

**G2. AI-Enhanced Editing**
- Inline editing with AI assistance for rewriting, summarization, tone adjustments
- Image generation/editing via Nano Banana API integration
- Multi-language support (pt-BR ↔ en)
- ✅ Current: Manual editing operational (AI planned Phase 20)

**G3. Client Collaboration**
- Private, secure proposal review environment
- Comment and change-request workflow
- View tracking and engagement analytics
- ✅ Current: COMPLETED - Full collaboration system operational

**G4. Contract & Signature**
- Auto-generate contracts from proposal content
- Digital signature integration (DocuSign/Clicksign/Autentique)
- Multi-channel notifications (Email, WhatsApp, Telegram)
- Post-signature production kickoff automation
- 🚧 Planned: Phase 23-24

**G5. Dynamic Hosting**
- Auto-create unique subdomains per proposal
- AWS Route 53 integration with automatic SSL/TLS
- CDN delivery via CloudFront
- 🚧 Planned: Phase 25 (Current: Railway URLs operational)

**G6. Analytics & Compliance**
- Track views, comments, time-to-close, version history
- LGPD-compliant audit logging
- Data minimization and access control
- ✅ Current: COMPLETED - LGPD audit logs operational

### 1.2 Non-Goals (v1)
- Full DTP feature parity with Canva/Gamma
- Real-time collaborative multi-cursor editing (sequential edits supported)
- In-platform payment processing (optional future enhancement)
- White-label customization (future enterprise feature)

---

## 2. Target Users & Personas

### 2.1 Primary Users

**Founder/Account Executive (Internal)**
- Creates/imports proposals
- Edits content with AI assistance
- Publishes to clients
- Manages revisions and communications
- Closes deals and tracks conversions

**Client Reviewer (External)**
- Receives private link with secure access
- Reviews proposal content
- Adds comments and requests changes
- Approves sections and final proposal

**Legal/Operations (Internal)**
- Reviews final documents
- Generates contracts
- Validates data and compliance
- Handles signature workflow
- Manages production kickoff

**Admin (Internal)**
- Manages users and organizations
- Configures templates and settings
- Oversees system security
- Handles audit and compliance

### 2.2 User Problems Addressed
- ✅ Time-consuming proposal creation cycles (streamlined platform)
- ✅ Inconsistent formatting across proposals (template system)
- ✅ Lack of client engagement tracking (analytics dashboard operational)
- 🚧 Manual contract generation (automation planned Phase 23)
- ✅ Difficulty managing multiple proposals (dashboard operational)

---

## 3. Key User Stories

### 3.1 Import from Canva/Gamma (Planned - Phase 21)
**As an AE**, I paste a share/export link and the system fetches and reconstructs the layout (texts, images, styles) as close as technically possible.

**Acceptance Criteria:**
- ≥90% structural fidelity on supported blocks
- All text content editable post-import
- Images maintain resolution and positioning
- CSS styling accurately replicated
- Unsupported elements downgraded gracefully with alert
- Import time <30 seconds per design

### 3.2 AI-Augmented Editing (Planned - Phase 20)
**As an AE**, I select a text block and ask AI to "make it more executive/shorter/Portuguese→English" with change-preview and one-click apply.

**As an AE**, I select an image block and request variations/edits via Nano Banana with prompts; result replaces or adds new block.

**Acceptance Criteria:**
- AI response time <500ms for text suggestions
- Multi-language support (pt-BR, en, es)
- Context-aware content recommendations
- Image generation <10 seconds
- Cost monitoring and optimization active

### 3.3 Private Publishing with Auth (✅ IMPLEMENTED)
**As an AE**, I publish to a private URL with secure authentication, optional expiry, and view tracking.

**As a Client**, I enter credentials, add comments, upload reference files, and request changes.

**Current Implementation:**
- ✅ Proposal-specific authentication operational
- ✅ Comment system with resolution tracking
- ✅ Four-state workflow (Aberta, Alterações Solicitadas, Fechada, Rejeitada)
- ✅ Three-option client workflow (Accept | Request Changes | Reject)
- ✅ View tracking and engagement analytics

### 3.4 Contract Generation & e-Signature (Planned - Phase 23)
**As Ops/Legal**, I click "Generate Contract"; the system merges content into a juridical template (pt-BR), outputs PDF, and sends for e-signature.

**As an AE**, when signed, I receive email + WhatsApp/Telegram notifications and production checklist opens automatically.

**Acceptance Criteria:**
- Contract generation <10 seconds
- Multi-party signature workflow
- Brazilian e-signature providers integrated (Clicksign/Autentique)
- Automated notification delivery >95% success rate
- Complete audit trail maintained

### 3.5 Subdomain Automation (Planned - Phase 25)
**As an Admin**, each new proposal gets a unique subdomain with valid TLS cert and CDN config automatically.

**Acceptance Criteria:**
- Pattern: `proposal-<id>.infigital.net`
- DNS propagation <60 seconds
- Automatic SSL certificate generation
- CloudFront CDN integration
- Multi-tenant isolation validated

### 3.6 Auditability & LGPD (✅ IMPLEMENTED)
**As Admin/Legal**, I can export an audit trail including who viewed, what was edited, when, and by whom; PII minimized and access-controlled.

**Current Implementation:**
- ✅ LGPD audit logging operational
- ✅ Organization-scoped data isolation
- ✅ User consent tracking
- ✅ Data retention policies
- ✅ Access control with JWT security

---

## 4. Functional Requirements

### 4.1 Import Pipelines (Planned - Phase 21)

**Inputs:** Share/export link (prefer export to HTML/JSON when available)

**Strategies:**
1. **Official Export APIs** (preferred) → HTML/JSON + media assets
2. **Headless Fetcher** (browser automation) for authenticated export jobs
3. **Fallback:** PDF import → structured OCR + layout inference (reduced fidelity)

**Technical Specifications:**
```yaml
Canva_Integration:
  Authentication: OAuth 2.0 flow
  API_Endpoints: Export, Design metadata
  Asset_Extraction: Images, fonts, colors, layout
  Fidelity_Target: 95%+ visual accuracy

Gamma_Integration:
  Authentication: API key or OAuth
  Export_Format: HTML/JSON preferred
  Content_Parsing: Slides, text, media
  Fidelity_Target: 95%+ visual accuracy

Import_Process:
  1_Fetch: Retrieve design data from API
  2_Parse: Extract content, styles, assets
  3_Normalize: Convert to platform format
  4_Validate: Check fidelity and completeness
  5_Store: Save assets to S3-compatible storage
  6_Render: Display in proposal editor
```

**Constraints:**
- Respect TOS/licensing agreements
- Store only necessary assets
- Show import summary with unsupported blocks
- Provide manual fix prompts for degraded elements

### 4.2 Proposal Editor (Current + Planned Enhancements)

#### Current Implementation ✅
- Block-based content structure
- Rich text editing
- Manual image/media upload
- Section organization (Presentation, Commercial, Scope, Terms)
- Auto-save functionality
- Version tracking

#### Planned Enhancements (Phase 20-22)
**Block Types:**
- Rich text, Image, Video, Gallery
- Button/Links, Columns/Sections
- Pricing Table, Timeline/Roadmap, FAQ
- Custom HTML blocks

**AI Features (Phase 20):**
- Rewrite, translate (pt-BR ↔ en, es)
- Tone shift (formal, casual, executive)
- Summarize and expand content
- Auto-generate sections from templates
- Extract scope to SOW (Statement of Work)
- Detect inconsistencies in content

**Media Features (Phase 22):**
- Upload, URL embed
- AI image/video via Nano Banana
- Drag-drop interface
- Alt-text for accessibility
- Basic crop/resize/filters

**Versioning:**
- Auto-save every 30 seconds
- Named versions with timestamps
- Diff view between versions
- One-click rollback

**Comments & Tasks:**
- Inline comments on sections
- Resolve/reopen workflow
- Assign to team members
- Due dates and priorities
- Simple Kanban per proposal

### 4.3 Publishing & Access Control (✅ IMPLEMENTED)

**Current Implementation:**
- ✅ Private by default with unique access credentials
- ✅ Proposal-specific authentication (username/password)
- ✅ Session management with JWT tokens
- ✅ View tracking and analytics

**Planned Enhancements:**
- Magic link authentication option
- One-Time Passcode (OTP) via email/SMS/WhatsApp
- Email whitelist functionality
- Expiration dates and auto-revocation

**Client Workspace (✅ Operational):**
- ✅ Comment threads on sections
- ✅ Request changes workflow
- ✅ Section-by-section approval
- ✅ Final proposal approval
- File attachment uploads (planned)

**Analytics (✅ Operational):**
- ✅ Unique visits tracking
- ✅ Total time on proposal
- ✅ Last seen timestamp
- Section heatmap (planned v2)

### 4.4 Contract Generation & Signature (Planned - Phase 23)

**Templates:**
- DOCX/Markdown contract templates
- Variable placeholders (Company, Scope, SLAs, Price, Payment terms, LGPD clauses)
- Brazilian legal compliance validation
- Multi-language template support

**Merge Engine:**
- Populate fields from proposal data
- Conditional sections based on proposal type
- Export to PDF with formatting preservation
- Template versioning and approval workflow

**Signature Integration:**
- **Primary:** Clicksign (Brazilian market leader)
- **Secondary:** Autentique (alternative Brazilian provider)
- **International:** DocuSign for global clients
- **Fallback:** Simple e-sign module (draw/type signature)

**Technical Specifications:**
```yaml
Contract_Generation:
  Template_Engine: Handlebars or similar
  Data_Mapping: Proposal → Contract fields
  PDF_Generation: Puppeteer or similar
  Processing_Time: <10 seconds target

E_Signature_Providers:
  Clicksign:
    API_Version: v2
    Features: Multi-party, templates, webhooks
    Cost: Per-envelope pricing

  Autentique:
    API_Version: v2
    Features: Multi-party, Brazilian compliance
    Cost: Per-document pricing

  DocuSign:
    API_Version: v2.1
    Features: International support
    Cost: Per-envelope pricing

Post_Signature_Workflow:
  1_Webhook: Receive signature completion event
  2_Notify: Email (SES) + WhatsApp (Business API) + Telegram Bot
  3_Update_Status: Mark proposal as "Fechada" (Closed)
  4_Production: Auto-create production checklist/tasks
  5_Archive: Store signed document securely
```

### 4.5 Subdomain Provisioning - AWS (Planned - Phase 25)

**Pattern:** `proposal-<ULID>.infigital.net` (kebab-case)

**AWS Infrastructure:**
```yaml
Route_53:
  Domain: infigital.net (hosted zone)
  Record_Type: A/AAAA or CNAME
  API_Automation: AWS SDK for Node.js
  TTL: 300 seconds

TLS_Certificates:
  Provider: AWS Certificate Manager (ACM)
  Type: Wildcard (*.infigital.net)
  Validation: DNS validation
  Auto_Renewal: Enabled

Content_Delivery:
  CloudFront:
    Origin: ALB or S3 bucket
    Cache_Policy: Optimized for dynamic content
    Security: AWS WAF integration
    Gzip_Compression: Enabled

  S3_Assets:
    Bucket_Structure: /proposals/<id>/assets/
    Access: CloudFront OAI (Origin Access Identity)
    Encryption: AES-256 at rest

Multi_Tenant_Isolation:
  Routing: By hostname (proposal-*.infigital.net)
  Database: Organization-scoped queries (current implementation)
  Assets: Per-proposal S3 prefixes
  Sessions: Proposal-specific JWT tokens
```

**Automation Flow:**
1. Proposal created → Generate ULID
2. Background job creates Route 53 record
3. Wait for DNS propagation (<60s)
4. Validate ACM certificate (if new subdomain pattern)
5. Configure CloudFront distribution
6. Warm CDN cache
7. Mark proposal as "ready for publishing"

**Current Alternative (Railway):**
- Production URLs via Railway infrastructure
- Automatic HTTPS via Railway
- Manual subdomain configuration available

---

## 5. Non-Functional Requirements

### 5.1 Performance

**Current Benchmarks (✅ Operational):**
- Page Load Time: ~2 seconds (target: <3s) ✅
- API Response Time: <200ms average ✅
- Database Query Time: <50ms average ✅

**Future Targets (Phases 20-25):**
- AI Response Time: <500ms for content suggestions
- Import Time: <30 seconds for design imports
- Contract Generation: <10 seconds end-to-end
- Subdomain Provisioning: <60 seconds DNS propagation

**Scalability:**
- Support 10,000+ concurrent users (Phase 25)
- Handle 1M+ proposals in database
- Process 100+ AI requests/second (Phase 20)
- 99.9% uptime target

### 5.2 Security & Compliance

**Current Implementation (✅ Operational):**
- ✅ JWT authentication with access/refresh tokens
- ✅ HTTPS/TLS via Railway
- ✅ Password hashing with bcrypt
- ✅ Organization-scoped data isolation
- ✅ LGPD audit logging
- ✅ Session management with Redis
- ✅ CORS configuration

**Planned Enhancements:**
- Multi-factor authentication (2FA)
- API rate limiting (advanced)
- Web Application Firewall (WAF)
- DDoS protection via CloudFront
- Regular penetration testing
- Automated vulnerability scanning

**LGPD Compliance (✅ Implemented):**
```yaml
Data_Protection:
  Lawful_Basis: Explicit consent and legitimate interest
  Data_Minimization: Collect only necessary information
  Purpose_Limitation: Use data only for stated purposes
  Storage_Limitation: Implement data retention policies

User_Rights:
  Access: Export personal data on request
  Rectification: Update incorrect data
  Erasure: Right to be forgotten
  Portability: Data export in standard formats

Technical_Safeguards:
  Encryption_at_Rest: Database encryption enabled
  Encryption_in_Transit: TLS 1.3 for all communications
  Access_Controls: Role-based with audit logging
  Backup_Security: Encrypted backups operational
```

### 5.3 Availability & Reliability

**Current Status (Railway):**
- 99.9% uptime via Railway managed services
- Automatic health checks
- Zero-downtime deployments
- Database backups (Railway managed)

**Future Enhancements (AWS):**
- Multi-AZ deployment for high availability
- Auto-scaling based on load
- CloudWatch monitoring and alerting
- Disaster recovery procedures
- Database read replicas for performance

### 5.4 Accessibility

**WCAG 2.2 AA Compliance Targets:**
- Screen reader compatibility
- Keyboard navigation support
- Color contrast ratios (4.5:1 minimum)
- Alt text for all images
- ARIA labels for interactive elements
- Focus indicators for all focusable elements

**Current Status:**
- Partial compliance implemented
- Full audit planned for Phase 20

---

## 6. Technical Architecture

### 6.1 Current Technology Stack (✅ Production)

**Frontend:**
```yaml
Framework: Next.js 14 with App Router
Language: TypeScript with React 18
Styling: Tailwind CSS with glassmorphism design system
State_Management: Zustand (auth), React Query (data fetching)
Animation: Framer Motion
Build_Tool: Turbopack (Next.js 14)
```

**Backend:**
```yaml
Runtime: Node.js 18+
Framework: Express.js
Authentication: JWT with access/refresh tokens
API_Architecture: RESTful with JSON
Validation: express-validator
Logging: Winston
```

**Database:**
```yaml
Primary_Database: PostgreSQL 15 (Railway managed)
Cache: Redis 7 for sessions and data caching
ORM: Raw SQL with pg (PostgreSQL client)
Schema: Multi-tenant with organization isolation
Tables: users, organizations, clients, proposals, sections, comments, activities, lgpd_logs
```

**Infrastructure (Current):**
```yaml
Production: Railway
  - Frontend service: Next.js app
  - Backend service: Node.js/Express API
  - PostgreSQL: Managed database
  - Redis: Managed cache
  - SSL/TLS: Automatic HTTPS
  - Monitoring: Railway dashboard

Development: Docker Compose
  - All services containerized
  - Local development environment
  - Hot reload enabled
  - Health checks configured
```

### 6.2 Future Technology Enhancements

**AI/ML Layer (Phase 20-22):**
```yaml
OpenAI_GPT4:
  Use_Cases: Content generation, rewriting, translation
  API_Version: v1
  Cost_Optimization: Caching, request batching

Nano_Banana_API:
  Use_Cases: Image generation, editing, video processing
  Integration: RESTful API
  Processing: Async with job queue

Vector_Database (Optional):
  Provider: Pinecone or Weaviate
  Use_Case: Enhanced AI context and retrieval
```

**Infrastructure Evolution (Phase 25):**
```yaml
AWS_Services:
  Route_53: DNS and subdomain management
  Certificate_Manager: SSL/TLS automation
  CloudFront: CDN for global delivery
  S3: Media and asset storage
  Lambda: Serverless functions
  API_Gateway: Request routing and throttling
  EventBridge: Event-driven automation

Migration_Strategy:
  1_Hybrid: Railway + AWS services
  2_Gradual: Move services incrementally
  3_Full_AWS: Complete migration (optional)
```

---

## 7. Database Schema

### 7.1 Current Schema (✅ Implemented)

```sql
-- Multi-tenant organization structure
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  domain VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User authentication and management
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Client information
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  company VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Proposal management
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  client_id UUID REFERENCES clients(id),
  title VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'aberta',
  -- Status: aberta, alteracoes_solicitadas, fechada, rejeitada
  content JSONB,
  client_access_token VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  closed_at TIMESTAMP
);

-- Proposal sections (for structured content)
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  -- Type: presentation, commercial, scope, terms
  content JSONB,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Client comments and feedback
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  section VARCHAR(100),
  content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  -- Status: open, resolved
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Activity and audit logs
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  proposal_id UUID REFERENCES proposals(id),
  action VARCHAR(100) NOT NULL,
  metadata JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);

-- LGPD compliance and audit
CREATE TABLE lgpd_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  data_type VARCHAR(100),
  purpose TEXT,
  legal_basis VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 7.2 Future Schema Additions (Phases 20-25)

```sql
-- Contract templates (Phase 23)
CREATE TABLE contract_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  variables JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Generated contracts (Phase 23)
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id),
  template_id UUID REFERENCES contract_templates(id),
  content TEXT NOT NULL,
  pdf_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'draft',
  -- Status: draft, sent, signed, rejected
  signature_provider VARCHAR(50),
  signature_id VARCHAR(255),
  signed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Notification logs (Phase 24)
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id),
  user_id UUID REFERENCES users(id),
  channel VARCHAR(50) NOT NULL,
  -- Channel: email, whatsapp, telegram
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  -- Status: pending, sent, delivered, failed
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subdomain management (Phase 25)
CREATE TABLE subdomains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id) UNIQUE,
  subdomain VARCHAR(100) UNIQUE NOT NULL,
  dns_status VARCHAR(50) DEFAULT 'pending',
  -- Status: pending, active, failed
  cdn_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  activated_at TIMESTAMP
);
```

---

## 8. API Endpoints

### 8.1 Current Endpoints (✅ Implemented)

**Authentication:**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user

**Proposals:**
- `GET /api/v1/proposals` - List all proposals (org-scoped)
- `POST /api/v1/proposals` - Create new proposal
- `GET /api/v1/proposals/:id` - Get proposal details
- `PUT /api/v1/proposals/:id` - Update proposal
- `DELETE /api/v1/proposals/:id` - Delete proposal
- `POST /api/v1/proposals/:id/close` - Close proposal (accept)
- `POST /api/v1/proposals/:id/reject` - Reject proposal
- `POST /api/v1/proposals/:id/request-changes` - Request changes

**Client Access:**
- `POST /api/v1/client/auth` - Client authentication
- `GET /api/v1/client/proposal/:token` - Get proposal by token
- `POST /api/v1/client/proposal/:id/comment` - Add comment

**Dashboard & Analytics:**
- `GET /api/v1/dashboard/stats` - Dashboard statistics
- `GET /api/v1/analytics/proposal/:id` - Proposal analytics

**Clients:**
- `GET /api/v1/clients` - List all clients (org-scoped)
- `POST /api/v1/clients` - Create client
- `GET /api/v1/clients/:id` - Get client details
- `PUT /api/v1/clients/:id` - Update client
- `DELETE /api/v1/clients/:id` - Delete client

### 8.2 Future Endpoints (Phases 20-25)

**AI Features (Phase 20):**
- `POST /api/v1/ai/rewrite` - AI content rewriting
- `POST /api/v1/ai/translate` - AI translation
- `POST /api/v1/ai/generate` - AI content generation
- `POST /api/v1/ai/suggestions` - Get AI suggestions

**Design Import (Phase 21):**
- `POST /api/v1/import/canva` - Import from Canva
- `POST /api/v1/import/gamma` - Import from Gamma
- `GET /api/v1/import/status/:jobId` - Check import status

**Media Processing (Phase 22):**
- `POST /api/v1/media/generate` - Generate AI image
- `POST /api/v1/media/edit` - Edit image with AI
- `POST /api/v1/media/upload` - Upload media

**Contracts (Phase 23):**
- `POST /api/v1/contracts/generate` - Generate contract
- `POST /api/v1/contracts/:id/send` - Send for signature
- `GET /api/v1/contracts/:id/status` - Check signature status
- `POST /api/v1/contracts/webhook` - Signature webhook

**Notifications (Phase 24):**
- `POST /api/v1/notifications/send` - Send notification
- `GET /api/v1/notifications/preferences` - Get user preferences
- `PUT /api/v1/notifications/preferences` - Update preferences

**Subdomains (Phase 25):**
- `POST /api/v1/subdomains/provision` - Provision subdomain
- `GET /api/v1/subdomains/:id/status` - Check subdomain status
- `DELETE /api/v1/subdomains/:id` - Remove subdomain

---

## 9. Success Metrics & KPIs

### 9.1 Business Metrics

**Conversion Metrics:**
- Proposal → Signature conversion rate (target: 40%+)
- Time-to-close reduction (target: 50% improvement)
- Client engagement rate (target: 80%+ view proposals)
- Comment-to-approval ratio

**User Adoption:**
- Active organizations (target: 100+ by Q2 2026)
- Proposals created per month (growth tracking)
- Monthly active users (MAU)
- User retention rate (target: 85%+ annual)

**Revenue Metrics:**
- Monthly Recurring Revenue (MRR) growth
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- LTV:CAC ratio (target: 3:1+)

### 9.2 Technical Metrics

**Performance (Current ✅):**
- Page Load Time: ~2 seconds ✅
- API Response Time: <200ms average ✅
- Database Query Time: <50ms average ✅
- Uptime: 99.9% (Railway managed) ✅

**Performance (Future Targets):**
- AI Response Time: <500ms
- Import Success Rate: >95%
- Contract Generation: <10 seconds
- Notification Delivery: >95%

**Quality Metrics:**
- Test Coverage: 80%+ (target)
- Zero Critical Vulnerabilities
- Mean Time to Recovery: <1 hour
- Change Failure Rate: <5%

---

## 10. Risks & Mitigation

### 10.1 Technical Risks

| Risk | Probability | Impact | Mitigation | Status |
|------|-------------|--------|------------|--------|
| **Third-Party API Limits** | High | High | Multiple provider fallbacks, abstraction layers | Planning |
| **Import Fidelity Issues** | Medium | High | Extensive testing, manual override options | Planning |
| **AI Cost Overruns** | Medium | Medium | Caching, batching, monitoring dashboards | Planning |
| **Railway Scaling Limits** | Low | Medium | AWS migration plan ready (Phase 25) | Monitored |
| **Security Vulnerabilities** | Low | High | Regular audits, automated scanning | Active |

### 10.2 Business Risks

| Risk | Probability | Impact | Mitigation | Status |
|------|-------------|--------|------------|--------|
| **Market Competition** | Medium | Medium | Unique AI features, rapid iteration | Active |
| **User Adoption** | Medium | High | Strong onboarding, educational content | Active |
| **Regulatory Changes** | Low | High | Flexible compliance framework | Active |
| **Budget Constraints** | Medium | Medium | Phased rollout, cost optimization | Active |

---

## 11. Implementation Roadmap

### 11.1 Completed Phases (✅)
- **Phases 1-19:** Foundation, deployment, testing (COMPLETED)
- **Current Status:** Production live on Railway

### 11.2 Future Phases

**Phase 20: AI Integration (Q4 2025 - 4 weeks)**
- OpenAI GPT-4 integration
- Content assistance and generation
- Cost: $500-1,000/month

**Phase 21: Design Import (Q4 2025-Q1 2026 - 6 weeks)**
- Canva/Gamma import pipeline
- Visual fidelity validation
- Cost: $800-1,500/month

**Phase 22: Media Processing (Q1 2026 - 4 weeks)**
- Nano Banana API integration
- Image/video editing
- Cost: $1,000-2,000/month

**Phase 23: Contract Automation (Q1-Q2 2026 - 6 weeks)**
- Contract generation
- E-signature integration
- Cost: $200-500/month

**Phase 24: Multi-Channel Notifications (Q2 2026 - 4 weeks)**
- Email, WhatsApp, Telegram
- Cost: $300-800/month

**Phase 25: Dynamic Subdomains (Q2 2026 - 3 weeks)**
- AWS Route 53 integration
- Automatic SSL/TLS
- Cost: $100-300/month

**Total Future Timeline:** 27 weeks (6.75 months)
**Total Future Operational Cost:** $2,900-6,100/month

---

## 12. Appendices

### 12.1 Glossary

- **LGPD:** Lei Geral de Proteção de Dados (Brazilian Data Protection Law)
- **ULID:** Universally Unique Lexicographically Sortable Identifier
- **JWT:** JSON Web Token
- **ACM:** AWS Certificate Manager
- **CDN:** Content Delivery Network
- **SOW:** Statement of Work
- **OTP:** One-Time Passcode
- **DSR:** Data Subject Rights
- **MRR:** Monthly Recurring Revenue
- **MAU:** Monthly Active Users

### 12.2 References

- [Next.js Documentation](https://nextjs.org/docs)
- [Railway Documentation](https://docs.railway.app)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [AWS Route 53 Documentation](https://docs.aws.amazon.com/route53)
- [LGPD Compliance Guide](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)

---

**Document Status:** ✅ CONSOLIDATED AND CURRENT
**Next Review:** Upon Phase 20 (AI Integration) approval
**Version Control:** Synced with DEVELOPMENT.md and planning.md
**Last Updated:** October 5, 2025

*Document prepared by MAESTRO Multi-Agent Orchestrator*
*Consolidates: Original product.md + product_comp.md + Current implementation status*
