# Product Requirements Document (PRD)
## AI-Driven Commercial Proposal Platform

**Product:** WebPropostas
**Domain:** infigital.net
**Owner:** Fabio Hartmann Fernandes (Metamentes / In-Digital World)
**Version:** 3.0 (Multi-Tier SaaS - Major Realignment)
**Date:** October 5, 2025
**Status:** Production Live - Multi-Tier Transformation In Progress

---

## 0. Context & Current Status

### Platform Vision
A **multi-tier SaaS platform** that democratizes professional proposal creation through three pricing tiers (Freemium, Standard, Professional). The platform combines a **visual template builder**, **AI-powered content assistance**, and **client collaboration** to streamline the commercial proposal lifecycle from template creation to contract signature.

### Business Model Evolution
**Current (Phases 1-19):** Single-tier unlimited access platform
**Target (Phases 26-42):** Multi-tier SaaS with freemium growth model

**Key Transformation:**
- 🎯 **Freemium Tier**: Free entry point with PDF-only exports (3 proposals, 1 client)
- 🎯 **Standard Tier**: R$ 97/month - AI editing + hosted proposals (100/month, 10 clients)
- 🎯 **Professional Tier**: R$ 247/month - Unlimited + template builder + advanced AI + custom branding

### Current Implementation Status (October 2025)
**Phase 1-19 Complete (Foundation Platform):**
- ✅ **Production Deployment**: Live on Railway infrastructure
- ✅ **Core Proposal Platform**: Creation, editing, client access operational
- ✅ **Authentication**: Multi-tenant JWT-based system
- ✅ **Client Collaboration**: Interactive review with comments and approvals
- ✅ **Analytics**: Real-time dashboard with conversion tracking

**Phase 26-42 Planned (Multi-Tier Transformation):**
- 🚧 **Pricing Tiers**: Three-tier SaaS model (Phase 27 - 3 weeks)
- 🚧 **Payment Integration**: Stripe + Mercado Pago (Phase 28 - 4 weeks)
- 🚧 **Template Builder**: Visual structured editor (Phase 33-35 - 16 weeks)
- 🚧 **AI Integration**: GPT-4 with token limits (Phase 36-37 - 6 weeks)
- 🚧 **Four Dashboards**: Clients, Proposals, Templates, Analytics (Phase 40-41 - 4 weeks)

### North Star Metrics
**Primary:** Freemium → Paid conversion rate (target: 5-8%)
**Secondary:** Proposal → Signed Contract conversion rate (target: 40%+)
**Tertiary:** Monthly Recurring Revenue (MRR) growth

---

## 0.5 Pricing Tiers & Feature Matrix

### Three-Tier SaaS Model

| Feature Category | Freemium (R$ 0) | Standard (R$ 97/mo) | Professional (R$ 247/mo) |
|------------------|-----------------|---------------------|--------------------------|
| **Proposals/Month** | 3 total | 100 per month | Unlimited |
| **Clients** | 1 (name only) | 10 (name + contact) | Unlimited (+ logo) |
| **Templates** | 3 pre-built (use only) | 10 pre-built + create | Unlimited + save/load |
| **Template Builder** | ❌ View only | ❌ Create, no save | ✅ Full access + library |
| **AI Content Editing** | ❌ No | ✅ Basic (50K tokens/mo) | ✅ Advanced (200K tokens/mo) |
| **Hosting** | ❌ PDF download only (10/mo) | ✅ WebPropostas branding | ✅ Custom branding |
| **Analytics Dashboard** | ❌ No | ✅ Basic (general + client) | ✅ Advanced (+ product + AI insights) |
| **Advanced Reports** | ❌ No | ✅ Client reports only | ✅ Client + Sector + Product + Custom |
| **Report Export** | ❌ No | ✅ PDF only | ✅ PDF + Excel + CSV |
| **Rich Media** | Text only | Text + Images | Text + Images + Videos + Charts |
| **Client Collaboration** | ❌ No | ✅ Comments + approval | ✅ Full collaboration |
| **Automated Reminders** | ❌ No | ✅ Email only (basic schedule) | ✅ Multi-channel + custom intervals |
| **Campaign Management** | ❌ No | ❌ No | ✅ Full segmentation + multi-channel |
| **Distribution Lists** | ❌ No | ❌ No | ✅ Advanced filtering + campaigns |
| **WhatsApp Integration** | ❌ No | ❌ No | ✅ Business API (campaigns + reminders) |
| **Client Portal Access** | ❌ No | ✅ Basic (view proposals only) | ✅ Full (project management) |
| **Project Folders** | ❌ No | ❌ No | ✅ Unlimited multi-vendor projects |
| **Media Library** | ❌ No | ❌ No | ✅ Unlimited storage (fair use) |
| **Financial Tracking** | ❌ No | ❌ No | ✅ Invoices, NFe, tax reports |
| **Multi-User Projects** | ❌ No | ❌ No | ✅ Invite family/collaborators |
| **Contract Generation** | ❌ No | ❌ No | ✅ Automated (future) |
| **Support** | Community | Email (48h) | Priority (24h) + Chat |
| **2FA Security** | ✅ Yes | ✅ Yes | ✅ Yes |
| **LGPD Compliance** | ✅ Yes | ✅ Yes | ✅ Yes |

### Pricing Strategy Rationale

**Freemium Tier (R$ 0/month):**
- **Purpose:** User acquisition, market penetration, viral growth
- **Target:** Freelancers, students, occasional users
- **Conversion Goal:** 5-8% to Standard tier within 3 months
- **Limitations:** PDF-only export forces upgrade for professional hosting

**Standard Tier (R$ 97/month):**
- **Purpose:** Core revenue generator, small business focus
- **Target:** Small agencies, consultants, B2B service providers
- **Value Proposition:** AI editing + hosted proposals + client collaboration
- **Competitive Position:** 30% cheaper than international competitors (Proposify $49 USD, PandaDoc $49 USD)

**Professional Tier (R$ 247/month):**
- **Purpose:** Premium features, enterprise capabilities
- **Target:** Marketing agencies, large consultancies, enterprises
- **Value Proposition:** Unlimited proposals + template builder + custom branding + advanced AI
- **Upsell Path:** Template saving is killer feature for agencies with reusable templates

### Annual Pricing (17% Discount)
- **Standard Annual:** R$ 970/year (save R$ 194 vs monthly)
- **Professional Annual:** R$ 2,470/year (save R$ 494 vs monthly)

### Revenue Projections (Conservative)

**Year 1 (12 months post-launch):**
- 1,000 Freemium users (0% revenue, 100% acquisition)
- 80 Standard annual (R$ 77,600) + 20 Standard monthly (R$ 23,280)
- 15 Professional annual (R$ 37,050) + 5 Professional monthly (R$ 14,820)
- **Total Year 1 Revenue:** R$ 152,750 (~$30,750 USD)
- **MRR by Month 12:** R$ 13,405 (~$2,700 USD)

**Year 2:**
- 5,000 Freemium users
- 400 Standard annual + 100 Standard monthly
- 80 Professional annual + 20 Professional monthly
- **Total Year 2 Revenue:** R$ 819,120 (~$165,000 USD)
- **MRR by Month 24:** R$ 68,260 (~$13,750 USD)

**Year 3:**
- 15,000 Freemium users
- 1,200 Standard annual + 300 Standard monthly
- 240 Professional annual + 60 Professional monthly
- **Total Year 3 Revenue:** R$ 2,487,000 (~$501,000 USD)
- **MRR by Month 36:** R$ 207,250 (~$41,750 USD)

### Operational Costs (Monthly)
- Infrastructure (Railway): $57/month
- AI APIs (OpenAI GPT-4): $300-800/month (scales with usage)
- Media Storage (Cloudflare R2): $2-20/month
- Email (Amazon SES): $5-15/month
- Payment Processing (Stripe): 3.4% + R$ 0.40 per transaction
- DNS/CDN (Cloudflare): $0-20/month
- **Total:** ~$557/month average (~R$ 2,785)

**Net Profit Trajectory:**
- **Year 1:** R$ 10,620/month by Month 12 (79% margin)
- **Year 2:** R$ 65,475/month by Month 24 (96% margin)
- **Year 3:** R$ 204,465/month by Month 36 (99% margin)

**Break-Even:** ~175 paid subscribers (mix of Standard/Professional) = Month 3-4 post-launch

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

**G7. Advanced Reporting & Analytics**
- Reports by client, sector, product type
- Conversion metrics and performance tracking
- Client engagement analysis
- Revenue analytics by segment
- 🚧 Planned: Phase 40-41

**G8. Automated Follow-Up System**
- Intelligent reminder scheduling for pending proposals
- Multi-tiered reminder strategy (first X days, then monthly, semi-annual, annual)
- Multi-channel delivery (email, WhatsApp)
- Configurable reminder intervals per proposal
- 🚧 Planned: Phase 42

**G9. Distribution Lists & Campaigns**
- Custom client segmentation by multiple criteria
- Targeted campaign creation (new projects, launches, announcements)
- Multi-channel distribution (WhatsApp, email)
- Segmentation filters: area of activity, interests, class, income, city, state
- Campaign analytics and engagement tracking
- 🚧 Planned: Phase 43

**G10. Client Portal & Project Management Hub**
- Centralized dashboard for all received proposals
- Project tracking across multiple service providers
- Media library (photos, videos, documents from providers)
- Financial management (invoices, receipts, tax documentation)
- Project folders for complex multi-vendor projects
- Spending tracking and budget management
- Contract repository with schedules and obligations
- Complete project memory and audit trail
- 🚧 Planned: Phase 44-45

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

**Client Portal User (External - Phase 44-45)**
- Manages all received proposals in one place
- Tracks project progress across multiple vendors
- Stores and organizes media (photos, videos, documents)
- Manages financial documents (invoices, receipts, tax records)
- Creates project folders for complex endeavors (e.g., home construction)
- Monitors spending and budgets
- Accesses contracts, schedules, and obligations
- Maintains complete project history and audit trail

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

### 4.5 Advanced Reporting & Analytics (Planned - Phase 40-41)

**Report Types:**

**Client Reports:**
- Proposals sent per client (total, by period)
- Client conversion rates (proposals → closed)
- Average time-to-close per client
- Client engagement metrics (views, comments, time spent)
- Revenue generated per client
- Client lifetime value (CLV)

**Sector/Industry Reports:**
- Proposals by industry vertical (e.g., real estate, tech, consulting)
- Conversion rates by sector
- Average proposal value by sector
- Sector growth trends
- Market penetration analysis

**Product/Service Reports:**
- Proposals by product/service type
- Product conversion rates
- Product revenue contribution
- Product bundle analysis
- Popular service combinations

**Time-Series Analytics:**
- Month-over-month growth metrics
- Seasonal trends analysis
- Year-over-year comparisons
- Proposal velocity tracking
- Revenue forecasting

**Technical Specifications:**
```yaml
Reporting_Engine:
  Database_Queries: Optimized PostgreSQL aggregations
  Caching: Redis for report results (1-hour TTL)
  Export_Formats: PDF, Excel, CSV
  Scheduling: Daily/weekly/monthly automated reports

Visualization:
  Charts: Line, bar, pie, heatmap
  Libraries: Chart.js or Recharts
  Interactive_Filters: Date range, client, sector, product
  Drill_Down: Click-through to detailed views

Performance_Targets:
  Report_Generation: <5 seconds
  Export_Time: <10 seconds
  Real_Time_Updates: Dashboard refresh every 30 seconds
```

### 4.6 Automated Follow-Up System (Planned - Phase 42)

**Reminder Strategy:**

**Tiered Schedule:**
- **First Reminder:** X days after proposal sent (configurable, default 3 days)
- **Second Reminder:** Monthly if no response
- **Third Reminder:** Semi-annually (6 months)
- **Fourth Reminder:** Annually (12 months)

**Configurable Per Proposal:**
- Enable/disable automatic reminders
- Custom first reminder interval (1-30 days)
- Custom frequency after first reminder
- Max number of reminders
- Stop reminders on client interaction

**Multi-Channel Delivery:**
- Email (primary)
- WhatsApp Business API (optional)
- Telegram Bot (optional)
- SMS (future consideration)

**Message Templates:**
- Personalized with client name, proposal title
- Professional tone with urgency escalation
- Call-to-action links to proposal
- Option to request more time or decline

**Technical Specifications:**
```yaml
Reminder_Scheduler:
  Job_Queue: Bull or BullMQ with Redis
  Cron_Jobs: Daily check for pending reminders
  Retry_Logic: 3 attempts with exponential backoff
  Delivery_Tracking: Log all sent reminders

Message_Service:
  Email: Amazon SES or SendGrid
  WhatsApp: WhatsApp Business API (Meta)
  Telegram: Telegram Bot API
  Templating: Handlebars with i18n support

User_Controls:
  Dashboard: View all scheduled reminders
  Management: Pause, reschedule, cancel reminders
  Preferences: Set default intervals per organization
  Client_Opt_Out: Respect unsubscribe requests

Analytics:
  Response_Rate: Track reminder effectiveness
  Best_Timing: Analyze optimal reminder intervals
  Channel_Performance: Compare email vs WhatsApp response
```

### 4.7 Distribution Lists & Campaign Management (Planned - Phase 43)

**Client Segmentation Filters:**

**Demographic:**
- Income level (A, B, C, D, E classes)
- Company size (employees, revenue)
- Location (city, state, region)

**Professional:**
- Area of activity/industry
- Job title/role
- Department/function

**Behavioral:**
- Interests/preferences (stored in client profile)
- Past proposal topics
- Engagement history
- Previous purchases/closures

**Custom Tags:**
- User-defined labels
- Project types
- Relationship status
- Priority level

**Campaign Types:**

**Launch Campaigns:**
- New building/property announcements
- Shopping mall openings
- Product/service launches
- Event invitations

**Promotional Campaigns:**
- Seasonal offers
- Limited-time proposals
- Exclusive opportunities
- Partnership announcements

**Distribution Channels:**
- WhatsApp bulk messaging (with Meta compliance)
- Email campaigns
- SMS (future)
- Multi-channel simultaneous delivery

**Technical Specifications:**
```yaml
Segmentation_Engine:
  Filter_Builder: Visual query builder interface
  Boolean_Logic: AND/OR/NOT operators
  Save_Segments: Reusable audience lists
  Dynamic_Lists: Auto-update based on criteria

Campaign_Management:
  Template_Editor: Rich text editor with merge fields
  Preview_Mode: Test send to small group
  Scheduling: Send now or schedule future
  Throttling: Rate limiting to avoid spam flags

Compliance:
  LGPD_Consent: Only send to opted-in contacts
  Unsubscribe: One-click opt-out in all messages
  Audit_Trail: Log all campaign sends
  Frequency_Caps: Limit messages per client per period

Analytics:
  Delivery_Rates: Track successful sends
  Open_Rates: Email open tracking (pixel)
  Click_Rates: Track link clicks in messages
  Conversion_Tracking: Proposals opened from campaigns
  A_B_Testing: Compare different message versions

WhatsApp_Integration:
  Provider: WhatsApp Business API via Meta
  Message_Types: Text, media, templates
  Rate_Limits: Respect WhatsApp tier limits
  Template_Approval: Pre-approved message templates
  Cost_Tracking: Monitor per-message costs
```

**Campaign Workflow:**
```yaml
1_Create_Segment:
  - Define filters
  - Preview recipient count
  - Save segment for future use

2_Design_Message:
  - Choose template or create new
  - Personalize with merge fields
  - Add media (images, PDFs, links)
  - Set call-to-action

3_Test_Campaign:
  - Send test to internal users
  - Verify formatting and links
  - Check compliance (opt-in status)

4_Schedule_Send:
  - Send immediately or schedule
  - Set time zone considerations
  - Enable throttling if needed

5_Monitor_Results:
  - Real-time delivery tracking
  - Engagement metrics dashboard
  - Response management
  - ROI calculation
```

### 4.8 Client Portal & Project Management Hub (Planned - Phase 44-45)

**Overview:**
A comprehensive client-facing portal that transforms the platform from a simple proposal review system into a complete project management and financial tracking solution. Ideal for complex, multi-vendor projects like home construction, renovations, events, or any scenario requiring coordination across multiple service providers.

**Core Features:**

#### **4.8.1 Proposal Management Dashboard**

**All Proposals View:**
- Centralized list of all proposals received across all providers
- Filter by status (pending, accepted, rejected, in-progress, completed)
- Search by provider, service type, date range, project
- Sort by date, amount, status, priority
- Quick actions (view, accept, reject, archive)

**Proposal Organization:**
- Tag proposals with custom labels
- Star/favorite important proposals
- Archive old or rejected proposals
- Link related proposals to projects

**Technical Specifications:**
```yaml
Dashboard_Features:
  List_View: Sortable table with pagination
  Card_View: Visual grid with thumbnails
  Filters: Multi-select with AND/OR logic
  Search: Full-text search across proposal content
  Bulk_Actions: Select multiple for archiving/tagging

Performance:
  Load_Time: <2 seconds for 1000+ proposals
  Real_Time_Updates: WebSocket for status changes
  Caching: Redis for frequently accessed data
```

#### **4.8.2 Project Folders (Multi-Vendor Coordination)**

**Use Case Example: Home Construction**
Create a project folder "Casa Nova - 2026" containing:
- Architecture proposals and contracts
- Engineering proposals (structural, electrical, plumbing)
- Construction/builder contracts
- Interior design proposals
- Furniture quotes
- Landscaping proposals
- Finishing materials (flooring, paint, fixtures)

**Project Features:**
- Create unlimited project folders
- Assign proposals to projects
- Project timeline with milestones
- Overall project budget tracking
- Progress tracking across all vendors
- Project-level notes and documents
- Share project view with family members (multi-user access)

**Project Dashboard:**
- Total project spending (actual vs. budgeted)
- Payment schedule across all vendors
- Upcoming obligations and deadlines
- Project completion percentage
- Vendor performance ratings
- Project activity timeline

**Technical Specifications:**
```yaml
Project_Structure:
  Hierarchy: Client → Projects → Proposals/Contracts/Documents
  Permissions: Owner, viewer, collaborator roles
  Sharing: Invite family/partners via email

Budget_Tracking:
  Currency: BRL with multi-currency support (future)
  Categories: Custom budget categories
  Alerts: Notifications when nearing budget limits
  Reports: Spending by vendor, category, time period
```

#### **4.8.3 Media Library & Progress Tracking**

**Service Provider Uploads:**
Vendors can upload progress photos/videos to client projects:
- Construction progress photos (daily/weekly)
- Before/after comparisons
- Video walkthroughs
- 360° virtual tours
- Drone footage (for large projects)
- Time-lapse videos

**Client Organization:**
- Automatic organization by date, vendor, project phase
- Tag media with custom labels (foundation, framing, finishing, etc.)
- Create albums/collections
- Download original files
- Share media with stakeholders
- Comments and annotations on media

**Media Features:**
- Image viewer with zoom/pan
- Video player with playback controls
- Thumbnail generation
- EXIF data preservation (date, location, camera)
- Bulk download (ZIP archives)
- Slideshow mode

**Technical Specifications:**
```yaml
Storage:
  Provider: S3-compatible (Cloudflare R2)
  Max_File_Size: 100MB per file
  Supported_Formats:
    Images: JPG, PNG, HEIC, WebP, RAW
    Videos: MP4, MOV, AVI, WebM
    Documents: PDF, DOC, XLS, DWG

Processing:
  Thumbnails: Auto-generated multiple sizes
  Video_Transcoding: H.264 for web playback
  Compression: Smart compression for storage optimization

Organization:
  Structure: /projects/{project_id}/media/{vendor_id}/{date}/
  Tagging: Multi-tag support with autocomplete
  Search: Full-text search in metadata
```

#### **4.8.4 Financial Management & Tax Documentation**

**Invoice & Receipt Storage:**
- Upload invoices from all vendors
- Scan/photo receipts via mobile
- OCR extraction of key data (date, amount, vendor, tax ID)
- Link invoices to proposals/contracts
- Payment status tracking (pending, paid, overdue)

**Tax Documentation (IRS/Receita Federal):**
- NFe (Nota Fiscal Eletrônica) repository
- Automatic organization by tax year
- CPF/CNPJ validation and tracking
- Deduction categories for tax filing
- Export reports for accountant
- Total spending by year/category

**Payment Tracking:**
- Payment schedule across all projects
- Upcoming payments dashboard
- Payment history with proof of payment
- Overdue payment alerts
- Payment method tracking (bank transfer, credit card, check)

**Financial Reports:**
- Total spending by project
- Spending by vendor
- Spending by category (labor, materials, services)
- Monthly spending trends
- Tax year summaries
- Budget vs. actual comparisons

**Technical Specifications:**
```yaml
Invoice_Management:
  OCR_Engine: Google Vision API or Tesseract
  Extracted_Fields: Date, total, vendor, tax_id, items
  Validation: Cross-check with proposal amounts

Tax_Compliance:
  NFe_Storage: XML + PDF storage
  Validation: Schema validation for NFe XML
  Tax_Year_Export: CSV/Excel for accountants
  Categories: Customizable tax deduction categories

Financial_Analytics:
  Charts: Spending over time, by category, by vendor
  Alerts: Budget overruns, late payments
  Export: PDF reports, Excel spreadsheets
```

#### **4.8.5 Contract Repository & Obligations Tracker**

**Contract Management:**
- Store all signed contracts
- Link contracts to proposals
- Version tracking for amendments
- Contract expiration alerts
- Renewal reminders
- Warranty tracking

**Obligations & Schedules:**
- Extract obligations from contracts
- Payment schedules with auto-reminders
- Delivery/milestone schedules
- Warranty periods
- Service agreements (maintenance, support)
- Penalties/late fees tracking

**Schedule Dashboard:**
- Calendar view of all obligations
- Upcoming deadlines (7/30/90 days)
- Overdue items
- Vendor performance (on-time vs. late)
- Payment schedule across all contracts

**Technical Specifications:**
```yaml
Contract_Storage:
  Formats: PDF (primary), DOCX (editable)
  Versioning: Track amendments and addendums
  E_Signature_Integration: Link to DocuSign/Clicksign records

Obligation_Tracking:
  Types: Payment, delivery, milestone, warranty
  Reminders: Email/WhatsApp/Push notifications
  Recurrence: One-time, monthly, quarterly, annual
  Dependencies: Link related obligations

Calendar_Integration:
  Export: iCal/Google Calendar format
  Sync: Two-way sync with external calendars (future)
```

#### **4.8.6 Project Memory & Audit Trail**

**Complete Project History:**
- Every proposal received
- All communications (emails, messages)
- All documents and media
- Payment history
- Status changes and approvals
- Notes and decisions

**Search & Discovery:**
- Full-text search across all project data
- Filter by date, vendor, category, amount
- Timeline view of project events
- Export complete project archive

**Reporting:**
- Final project report with all spending
- Vendor performance summary
- Lessons learned documentation
- Project timeline visualization
- Photo galleries (before/during/after)

**Technical Specifications:**
```yaml
Audit_Trail:
  Logging: Every action logged with timestamp
  Immutability: Append-only audit log
  Retention: Unlimited (configurable)

Export_Options:
  Full_Archive: ZIP with all files + metadata
  Project_Report: PDF with summary + photos
  Financial_Summary: Excel with all transactions
  Timeline: Visual PDF timeline

Search_Engine:
  Technology: PostgreSQL full-text + Elasticsearch (future)
  Indexing: All text content, OCR text from images
  Speed: <500ms for complex queries
```

#### **4.8.7 Multi-User Access & Permissions**

**Sharing Projects:**
- Invite family members/partners
- Role-based permissions (owner, editor, viewer)
- Per-project access control
- Activity notifications

**Technical Specifications:**
```yaml
Access_Control:
  Roles:
    - Owner: Full control, can delete project
    - Editor: Add/edit content, cannot delete
    - Viewer: Read-only access
    - Accountant: Financial data only

Invitations:
  Method: Email invitation with magic link
  Expiration: 7 days for acceptance
  Revocation: Instant access removal

Activity_Feed:
  Events: Uploads, edits, approvals, payments
  Notifications: Real-time + daily digest
```

#### **4.8.8 Real-World Use Cases Across Industries**

The Client Portal serves diverse scenarios beyond construction, demonstrating platform versatility:

---

**Use Case 1: Home Construction Project**
```yaml
Project_Name: "Casa Nova - Florianópolis 2026"
Client: Couple (João & Maria Silva)
Duration: 18 months
Budget: R$ 500,000
Vendors: 12 service providers

Proposals_Managed:
  - Architecture (3 proposals, 1 accepted - R$ 45,000)
  - Structural Engineering (R$ 18,000)
  - Electrical Engineering (R$ 12,000)
  - Plumbing Engineering (R$ 8,000)
  - Builder/General Contractor (R$ 280,000)
  - Interior Design (R$ 35,000)
  - Furniture & Fixtures (R$ 55,000)
  - Flooring & Finishes (R$ 28,000)
  - Landscaping (R$ 19,000)

Media_Library:
  - 800+ progress photos (foundation → finishing)
  - 50+ construction videos
  - 12 drone footage clips
  - 3D renderings and plans

Financial_Tracking:
  - 80+ NFe invoices
  - Payment schedule (24 installments)
  - Tax deduction documentation
  - Budget vs. actual tracking

Obligations:
  - 150+ scheduled payments
  - Delivery milestones
  - Inspection deadlines
  - Warranty tracking (5-year structural, 1-year finishes)

Collaborators:
  - João (Owner): Full access
  - Maria (Owner): Full access
  - Accountant (Viewer): Financial data only

Key_Benefits:
  - Complete project memory for future reference
  - All spending organized for tax filing
  - Warranty and contract repository
  - Vendor contact information preserved
```

---

**Use Case 2: Vehicle Body Shop Repair (Post-Accident)**
```yaml
Project_Name: "BMW X5 - Collision Repair (May 2026)"
Client: Pedro Almeida
Duration: 45 days
Budget: R$ 18,500
Vendors: 5 service providers

Proposals_Managed:
  - Body Shop #1 (declined - R$ 22,000 too high)
  - Body Shop #2 (declined - 60 day timeline)
  - Body Shop #3 (accepted - R$ 18,500, 45 days) ✅
  - Paint Specialist (subcontractor - R$ 4,200)
  - Glass Replacement (R$ 2,800)

Media_Library:
  - 25 damage photos (insurance documentation)
  - 40+ repair progress photos (daily updates)
  - 10 before/after comparison photos
  - Final delivery video walkthrough
  - PDI (Pre-Delivery Inspection) checklist photos

Financial_Tracking:
  - Insurance claim documentation (R$ 15,000 coverage)
  - Out-of-pocket expenses (R$ 3,500)
  - 3 NFe invoices from vendors
  - Payment proof to insurance company
  - Warranty documentation (6-month paint warranty)

Obligations:
  - Weekly progress check-ins
  - Insurance adjuster visit (scheduled)
  - Final inspection before delivery
  - 30-day follow-up appointment
  - 6-month warranty check

Timeline:
  - Day 1: Damage assessment, insurance photos
  - Day 3: Proposals received, vendor selected
  - Day 5-35: Repair work with photo updates
  - Day 36: Paint and detailing
  - Day 40: Final inspection
  - Day 45: Vehicle delivery

Key_Benefits:
  - Insurance claim documentation (photos + invoices)
  - Daily repair progress visibility
  - Warranty and service records for resale value
  - Vendor comparison for future reference
  - Complete repair history preserved
```

---

**Use Case 3: Children's Extracurricular Activities & Courses**
```yaml
Project_Name: "Lucas & Ana - Education & Activities 2026"
Client: Mother (Camila Rodrigues)
Duration: 12 months (school year)
Budget: R$ 24,000 (R$ 2,000/month)
Vendors: 8 service providers

Proposals_Managed:
  Lucas (10 years old):
    - English Course (R$ 350/month - accepted)
    - Soccer Training (R$ 280/month - accepted)
    - Math Tutoring (R$ 200/month - accepted)
    - Swimming Lessons (declined - schedule conflict)

  Ana (7 years old):
    - Ballet Classes (R$ 320/month - accepted)
    - Art Classes (R$ 180/month - accepted)
    - Piano Lessons (R$ 400/month - accepted)
    - Gymnastics (on waitlist)

Media_Library:
  - 200+ class photos and videos
  - Performance videos (ballet recital, soccer games)
  - Art project photos
  - Progress certificates and diplomas
  - Report cards and evaluations

Financial_Tracking:
  - 96 monthly tuition invoices (8 activities × 12 months)
  - Registration fees and materials
  - Uniform and equipment costs
  - Recital/event tickets
  - Tax deduction for education expenses

Obligations:
  - Monthly tuition payments (8 different dates)
  - Recital and presentation dates
  - Parent-teacher meetings
  - Semester evaluations
  - Registration renewal deadlines
  - Vacation schedule coordination

Budget_Breakdown:
  - Lucas English: R$ 4,200/year
  - Lucas Soccer: R$ 3,360/year
  - Lucas Math: R$ 2,400/year
  - Ana Ballet: R$ 3,840/year
  - Ana Art: R$ 2,160/year
  - Ana Piano: R$ 4,800/year
  - Materials & Events: R$ 3,240/year
  Total: R$ 24,000/year

Collaborators:
  - Camila (Owner): Full access
  - Husband (Viewer): View schedules and payments
  - Accountant (Viewer): Financial data for tax deductions

Key_Benefits:
  - Centralized schedule for all activities
  - Budget control across multiple children
  - Performance and progress documentation
  - Tax deduction documentation (education expenses)
  - Easy vendor contact for schedule changes
  - Historical record of children's development
```

---

**Use Case 4: Wedding Planning & Coordination**
```yaml
Project_Name: "Casamento Fernanda & Ricardo - Dezembro 2026"
Client: Couple (Fernanda & Ricardo)
Duration: 10 months (planning period)
Budget: R$ 80,000
Vendors: 15 service providers
Guests: 150 people

Proposals_Managed:
  - Wedding Venue (5 proposals, 1 accepted - R$ 18,000)
  - Catering/Buffet (4 proposals, 1 accepted - R$ 25,000)
  - Photography & Video (3 proposals, 1 accepted - R$ 8,500)
  - Wedding Dress & Alterations (R$ 6,000)
  - Groom's Suit (R$ 2,500)
  - Decoration & Flowers (R$ 7,500)
  - Wedding Cake (3 proposals, 1 accepted - R$ 1,800)
  - Music/DJ (R$ 3,200)
  - Invitations & Stationery (R$ 1,500)
  - Wedding Planner (R$ 4,000)
  - Hair & Makeup (R$ 1,200)
  - Transportation (R$ 800)

Media_Library:
  - Venue tour photos and videos
  - Food tasting photos
  - Dress fitting photos
  - Decoration mockups and samples
  - Cake design photos
  - Venue setup photos (day before)
  - Professional wedding photos (400+)
  - Wedding video (full ceremony + reception)

Financial_Tracking:
  - 40+ vendor invoices and NFe
  - Payment schedule (deposits, installments, final payments)
  - Guest gift tracking
  - Honeymoon expenses (separate project)
  - Credit card vs. cash payments
  - Budget tracking by category

Obligations:
  - Venue deposit deadline
  - Final headcount confirmation (30 days before)
  - Dress final fitting (2 weeks before)
  - Catering payment schedule (3 installments)
  - Music playlist submission
  - Seating chart finalization
  - Vendor final confirmations (1 week before)
  - Day-of timeline coordination

Timeline:
  - Month 1-2: Venue selection, save the date
  - Month 3-4: Catering, photography, dress shopping
  - Month 5-6: Invitations, decoration planning
  - Month 7-8: Final fittings, cake tasting, music
  - Month 9: Final payments, confirmations
  - Month 10: Wedding week, day-of coordination

Budget_Categories:
  - Venue & Catering: R$ 43,000 (54%)
  - Photography/Video: R$ 8,500 (11%)
  - Attire (bride + groom): R$ 8,500 (11%)
  - Decoration/Flowers: R$ 7,500 (9%)
  - Wedding Planner: R$ 4,000 (5%)
  - Music/Entertainment: R$ 3,200 (4%)
  - Cake: R$ 1,800 (2%)
  - Other (invites, transport, etc.): R$ 3,500 (4%)

Collaborators:
  - Fernanda (Owner): Full access
  - Ricardo (Owner): Full access
  - Wedding Planner (Editor): Can add vendors and updates
  - Parents (Viewer): View progress and budget
  - Maid of Honor (Viewer): Timeline and vendor contacts

Key_Benefits:
  - All vendor contracts in one place
  - Payment schedule prevents missed deadlines
  - Complete wedding memory (photos + documents)
  - Budget control by category
  - Vendor contact info for future recommendations
  - Timeline coordination across 15 vendors
  - Honeymoon planning (separate project folder)
```

---

**Use Case 5: Home Renovation Project**
```yaml
Project_Name: "Apartamento Leblon - Reforma Completa"
Client: Family (Santos Family)
Duration: 4 months
Budget: R$ 120,000
Vendors: 9 service providers

Proposals_Managed:
  - Interior Designer (R$ 12,000)
  - General Contractor (R$ 65,000)
  - Electrician (R$ 8,500)
  - Plumber (R$ 6,500)
  - Custom Cabinetry (R$ 18,000)
  - Flooring Specialist (R$ 9,500)
  - Painter (R$ 4,200)
  - Air Conditioning Installation (R$ 7,800)

Media_Library:
  - 300+ demolition and construction photos
  - Before photos of every room
  - 3D renderings from designer
  - Daily progress photos
  - After photos for each completed room
  - Time-lapse video of full renovation

Financial_Tracking:
  - 45 invoices and receipts
  - Payment schedule coordinated across vendors
  - Materials vs. labor cost breakdown
  - Change order documentation
  - Property value increase estimate

Obligations:
  - Building permit approvals
  - Condo board notifications
  - Material delivery schedules
  - Inspection checkpoints
  - Final walkthrough with each vendor
  - 1-year warranty tracking

Key_Benefits:
  - Property value documentation (before/after)
  - Complete renovation history for future buyers
  - Vendor performance for recommendations
  - Budget control during unexpected issues
  - Warranty and contact info preservation
```

---

**Use Case 6: Corporate Event Planning**
```yaml
Project_Name: "Tech Summit 2026 - Annual Conference"
Client: Marketing Manager (Startup TechBrasil)
Duration: 6 months (planning period)
Budget: R$ 150,000
Attendees: 500 people
Vendors: 20+ service providers

Proposals_Managed:
  - Event Venue (convention center - R$ 35,000)
  - Catering (breakfast, lunch, coffee breaks - R$ 40,000)
  - AV Equipment & Tech Support (R$ 15,000)
  - Stage Design & Branding (R$ 12,000)
  - Photography & Videography (R$ 8,000)
  - Event App & Registration Platform (R$ 6,500)
  - Security Services (R$ 4,000)
  - Transportation (shuttle service - R$ 3,500)
  - Accommodation (hotel block - R$ 25,000)
  - Swag & Merchandise (R$ 8,000)

Media_Library:
  - Event photos (1000+ professional shots)
  - Keynote presentation recordings
  - Attendee testimonial videos
  - Social media content
  - Venue setup time-lapse

Financial_Tracking:
  - 60+ vendor invoices
  - Sponsorship revenue tracking
  - Ticket sales reconciliation
  - ROI calculation per session
  - Tax documentation for business expenses

Obligations:
  - Speaker confirmation deadlines
  - Venue payment milestones
  - Marketing campaign launches
  - Registration deadline
  - Final headcount to catering
  - Post-event survey distribution

Key_Benefits:
  - Complete event documentation for next year
  - Vendor performance evaluation
  - Budget vs. actual analysis
  - Sponsorship fulfillment proof
  - Event archive for marketing
```

---

**Use Case 7: Medical Treatment & Healthcare Management**
```yaml
Project_Name: "Tratamento Ortodôntico - Família Costa"
Client: Parents managing children's healthcare
Duration: 24 months
Budget: R$ 32,000
Patients: 3 children

Proposals_Managed:
  - Orthodontist (2 proposals, 1 accepted - R$ 28,000)
  - Dental X-rays & Scans (R$ 1,200)
  - Retainer Replacement (R$ 800)
  - Emergency Visits (R$ 2,000 budget)

Media_Library:
  - Progress photos (monthly)
  - X-ray images and scans
  - Before/after smile comparisons
  - Treatment plan documents

Financial_Tracking:
  - 24 monthly payment invoices
  - Insurance reimbursement claims
  - Tax deduction documentation
  - Payment receipts for warranty claims

Obligations:
  - Monthly adjustment appointments
  - 6-month cleaning checkups
  - Annual X-ray updates
  - Retainer delivery dates

Key_Benefits:
  - Insurance claim documentation
  - Tax deduction for medical expenses
  - Treatment history for future reference
  - Before/after documentation
  - Multiple children in one project
```

---

### **Cross-Industry Application Summary**

The Client Portal demonstrates value across:

| Industry | Primary Use | Key Features | Typical Duration | Budget Range |
|----------|-------------|--------------|------------------|--------------|
| **Construction** | Home building, renovation | Multi-vendor coordination, progress photos, NFe tracking | 6-24 months | R$ 100K-1M+ |
| **Automotive** | Body shop, customization | Insurance documentation, progress photos, warranties | 1-3 months | R$ 5K-50K |
| **Education** | Courses, tutoring, activities | Schedule coordination, performance tracking, tax deductions | 12 months | R$ 10K-50K |
| **Events** | Weddings, parties, conferences | Vendor coordination, timeline management, budget control | 3-12 months | R$ 30K-300K |
| **Healthcare** | Treatments, therapies | Medical documentation, insurance claims, appointment tracking | 6-36 months | R$ 10K-100K |
| **Professional Services** | Legal, consulting, accounting | Document repository, billable hours, project phases | 3-18 months | R$ 20K-200K |

**Common Pain Points Solved:**
- ✅ Scattered proposals and contracts across email, WhatsApp, paper
- ✅ Lost receipts and invoices during tax season
- ✅ Forgotten payment deadlines and late fees
- ✅ Difficulty tracking project progress across multiple vendors
- ✅ No central repository for warranties and service records
- ✅ Inability to share project status with family/partners
- ✅ Lost vendor contact information for future needs
- ✅ No audit trail for dispute resolution

### 4.9 Subdomain Provisioning - AWS (Planned - Phase 25)

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

-- Extended client data for segmentation (Phase 40-43)
CREATE TABLE client_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) UNIQUE,
  -- Demographic data
  income_class VARCHAR(10),
  -- Class: A, B, C, D, E
  company_size VARCHAR(50),
  -- Size: micro, small, medium, large, enterprise
  annual_revenue DECIMAL(15,2),
  employee_count INTEGER,
  -- Location
  city VARCHAR(255),
  state VARCHAR(100),
  region VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Brazil',
  -- Professional data
  industry VARCHAR(100),
  -- Industry: real_estate, tech, consulting, retail, etc.
  area_of_activity VARCHAR(100),
  job_title VARCHAR(255),
  department VARCHAR(100),
  -- Behavioral data
  interests JSONB,
  -- Array of interest tags
  preferences JSONB,
  -- Communication, content preferences
  engagement_score INTEGER DEFAULT 0,
  -- 0-100 engagement score
  relationship_status VARCHAR(50) DEFAULT 'prospect',
  -- Status: prospect, active, dormant, inactive
  priority_level VARCHAR(50) DEFAULT 'medium',
  -- Priority: low, medium, high, vip
  -- Custom tags
  tags JSONB,
  -- Array of custom tags
  custom_fields JSONB,
  -- Additional custom data
  -- Consent and compliance
  marketing_consent BOOLEAN DEFAULT false,
  whatsapp_consent BOOLEAN DEFAULT false,
  email_consent BOOLEAN DEFAULT true,
  sms_consent BOOLEAN DEFAULT false,
  consent_date TIMESTAMP,
  unsubscribed_at TIMESTAMP,
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Proposal reminders (Phase 42)
CREATE TABLE proposal_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  reminder_type VARCHAR(50) NOT NULL,
  -- Type: first, monthly, semiannual, annual
  scheduled_for TIMESTAMP NOT NULL,
  sent_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  -- Status: pending, sent, failed, cancelled
  channel VARCHAR(50),
  -- Channel: email, whatsapp, telegram
  message_template TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Campaign segments (Phase 43)
CREATE TABLE campaign_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  filters JSONB NOT NULL,
  -- Stored filter criteria
  is_dynamic BOOLEAN DEFAULT true,
  -- Dynamic: auto-update based on filters
  cached_count INTEGER,
  last_calculated_at TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Marketing campaigns (Phase 43)
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  segment_id UUID REFERENCES campaign_segments(id),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  -- Type: launch, promotional, announcement
  subject VARCHAR(255),
  message TEXT NOT NULL,
  channels JSONB,
  -- Array: ['email', 'whatsapp']
  status VARCHAR(50) DEFAULT 'draft',
  -- Status: draft, scheduled, sending, sent, failed
  scheduled_for TIMESTAMP,
  sent_at TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Campaign recipients tracking (Phase 43)
CREATE TABLE campaign_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id),
  channel VARCHAR(50) NOT NULL,
  -- Channel: email, whatsapp, telegram
  status VARCHAR(50) DEFAULT 'pending',
  -- Status: pending, sent, delivered, opened, clicked, failed, bounced, unsubscribed
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Campaign analytics (Phase 43)
CREATE TABLE campaign_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) UNIQUE,
  total_recipients INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  bounced_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  unsubscribed_count INTEGER DEFAULT 0,
  proposals_opened INTEGER DEFAULT 0,
  proposals_closed INTEGER DEFAULT 0,
  revenue_generated DECIMAL(15,2) DEFAULT 0,
  cost DECIMAL(10,2) DEFAULT 0,
  roi DECIMAL(10,2),
  -- Return on Investment
  calculated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Client portal projects (Phase 44-45)
CREATE TABLE client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100),
  -- Type: construction, renovation, event, general
  status VARCHAR(50) DEFAULT 'active',
  -- Status: planning, active, on_hold, completed, archived
  start_date DATE,
  target_end_date DATE,
  actual_end_date DATE,
  budget_total DECIMAL(15,2),
  budget_spent DECIMAL(15,2) DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  -- 0-100
  tags JSONB,
  -- Array of custom tags
  settings JSONB,
  -- Project-specific settings
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Project proposals mapping (Phase 44-45)
CREATE TABLE project_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE,
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  category VARCHAR(100),
  -- Category: architecture, engineering, construction, design, furniture, etc.
  order_index INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, proposal_id)
);

-- Project media library (Phase 44-45)
CREATE TABLE project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id),
  -- Can be client or service provider
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  -- Type: image, video, document
  file_size BIGINT,
  -- Size in bytes
  mime_type VARCHAR(100),
  storage_path VARCHAR(500),
  thumbnail_path VARCHAR(500),
  caption TEXT,
  tags JSONB,
  -- Array of tags
  exif_data JSONB,
  -- EXIF metadata for images
  uploaded_date DATE,
  phase VARCHAR(100),
  -- Project phase: foundation, framing, finishing, etc.
  vendor_id UUID REFERENCES users(id),
  -- Service provider who uploaded
  is_public BOOLEAN DEFAULT false,
  -- Share with project collaborators
  created_at TIMESTAMP DEFAULT NOW()
);

-- Financial documents (Phase 44-45)
CREATE TABLE financial_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE,
  proposal_id UUID REFERENCES proposals(id),
  -- Link to proposal if applicable
  document_type VARCHAR(50) NOT NULL,
  -- Type: invoice, receipt, nfe, payment_proof, contract
  vendor_name VARCHAR(255),
  vendor_tax_id VARCHAR(50),
  -- CPF or CNPJ
  document_number VARCHAR(100),
  -- Invoice/NFe number
  issue_date DATE,
  due_date DATE,
  payment_date DATE,
  amount DECIMAL(15,2) NOT NULL,
  tax_amount DECIMAL(15,2),
  category VARCHAR(100),
  -- Category: labor, materials, services, equipment
  payment_status VARCHAR(50) DEFAULT 'pending',
  -- Status: pending, paid, overdue, cancelled
  payment_method VARCHAR(50),
  -- Method: bank_transfer, credit_card, check, cash
  nfe_xml_path VARCHAR(500),
  -- NFe XML file path
  pdf_path VARCHAR(500),
  ocr_data JSONB,
  -- Extracted OCR data
  tax_year INTEGER,
  is_tax_deductible BOOLEAN DEFAULT false,
  deduction_category VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Project obligations and schedules (Phase 44-45)
CREATE TABLE project_obligations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE,
  contract_id UUID REFERENCES contracts(id),
  -- Link to contract if exists
  proposal_id UUID REFERENCES proposals(id),
  obligation_type VARCHAR(50) NOT NULL,
  -- Type: payment, delivery, milestone, warranty, service
  title VARCHAR(255) NOT NULL,
  description TEXT,
  vendor_name VARCHAR(255),
  due_date DATE,
  completion_date DATE,
  amount DECIMAL(15,2),
  status VARCHAR(50) DEFAULT 'pending',
  -- Status: pending, completed, overdue, cancelled
  recurrence VARCHAR(50),
  -- Recurrence: none, monthly, quarterly, annual
  reminder_days_before INTEGER DEFAULT 7,
  -- Days before to send reminder
  priority VARCHAR(50) DEFAULT 'medium',
  -- Priority: low, medium, high, critical
  dependencies JSONB,
  -- Array of obligation IDs this depends on
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Project collaborators (Phase 44-45)
CREATE TABLE project_collaborators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE,
  user_email VARCHAR(255) NOT NULL,
  -- Email of invited collaborator
  user_name VARCHAR(255),
  role VARCHAR(50) NOT NULL,
  -- Role: owner, editor, viewer, accountant
  invitation_token VARCHAR(255) UNIQUE,
  invitation_status VARCHAR(50) DEFAULT 'pending',
  -- Status: pending, accepted, expired, revoked
  invited_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,
  expires_at TIMESTAMP,
  last_access TIMESTAMP,
  permissions JSONB,
  -- Granular permissions
  created_at TIMESTAMP DEFAULT NOW()
);

-- Project activity log (Phase 44-45)
CREATE TABLE project_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  -- User or collaborator who performed action
  activity_type VARCHAR(100) NOT NULL,
  -- Type: proposal_added, media_uploaded, payment_made, milestone_completed, etc.
  description TEXT,
  entity_type VARCHAR(50),
  -- Entity: proposal, media, document, obligation
  entity_id UUID,
  -- ID of related entity
  metadata JSONB,
  -- Additional activity data
  created_at TIMESTAMP DEFAULT NOW()
);

-- Project notes (Phase 44-45)
CREATE TABLE project_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255),
  content TEXT NOT NULL,
  note_type VARCHAR(50) DEFAULT 'general',
  -- Type: general, decision, lesson_learned, issue
  tags JSONB,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
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

**Advanced Reports (Phase 40-41):**
- `GET /api/v1/reports/clients` - Client performance reports
- `GET /api/v1/reports/clients/:id` - Individual client report
- `GET /api/v1/reports/sectors` - Sector/industry reports
- `GET /api/v1/reports/products` - Product/service reports
- `GET /api/v1/reports/time-series` - Time-series analytics
- `POST /api/v1/reports/export` - Export report (PDF/Excel/CSV)
- `GET /api/v1/reports/scheduled` - List scheduled reports
- `POST /api/v1/reports/schedule` - Schedule automated report

**Reminders (Phase 42):**
- `GET /api/v1/reminders` - List all scheduled reminders
- `GET /api/v1/reminders/proposal/:id` - Get proposal reminders
- `POST /api/v1/reminders` - Create manual reminder
- `PUT /api/v1/reminders/:id` - Update reminder schedule
- `DELETE /api/v1/reminders/:id` - Cancel reminder
- `POST /api/v1/reminders/:id/send-now` - Send reminder immediately
- `GET /api/v1/reminders/settings` - Get organization reminder defaults
- `PUT /api/v1/reminders/settings` - Update reminder defaults

**Client Segmentation (Phase 43):**
- `GET /api/v1/segments` - List all segments
- `POST /api/v1/segments` - Create new segment
- `GET /api/v1/segments/:id` - Get segment details
- `PUT /api/v1/segments/:id` - Update segment
- `DELETE /api/v1/segments/:id` - Delete segment
- `GET /api/v1/segments/:id/preview` - Preview segment recipients
- `POST /api/v1/segments/:id/refresh` - Recalculate dynamic segment

**Campaigns (Phase 43):**
- `GET /api/v1/campaigns` - List all campaigns
- `POST /api/v1/campaigns` - Create new campaign
- `GET /api/v1/campaigns/:id` - Get campaign details
- `PUT /api/v1/campaigns/:id` - Update campaign
- `DELETE /api/v1/campaigns/:id` - Delete campaign
- `POST /api/v1/campaigns/:id/test` - Send test campaign
- `POST /api/v1/campaigns/:id/schedule` - Schedule campaign
- `POST /api/v1/campaigns/:id/send` - Send campaign immediately
- `GET /api/v1/campaigns/:id/analytics` - Get campaign analytics
- `GET /api/v1/campaigns/:id/recipients` - List campaign recipients
- `POST /api/v1/campaigns/:id/cancel` - Cancel scheduled campaign

**Client Profiles (Phase 40-43):**
- `GET /api/v1/clients/:id/profile` - Get extended client profile
- `PUT /api/v1/clients/:id/profile` - Update client profile
- `POST /api/v1/clients/:id/tags` - Add tags to client
- `DELETE /api/v1/clients/:id/tags/:tag` - Remove client tag
- `PUT /api/v1/clients/:id/consent` - Update marketing consent

**Client Portal - Projects (Phase 44-45):**
- `GET /api/v1/client-portal/projects` - List all client projects
- `POST /api/v1/client-portal/projects` - Create new project
- `GET /api/v1/client-portal/projects/:id` - Get project details
- `PUT /api/v1/client-portal/projects/:id` - Update project
- `DELETE /api/v1/client-portal/projects/:id` - Delete project
- `GET /api/v1/client-portal/projects/:id/dashboard` - Get project dashboard
- `POST /api/v1/client-portal/projects/:id/proposals` - Add proposal to project
- `DELETE /api/v1/client-portal/projects/:id/proposals/:proposalId` - Remove proposal
- `GET /api/v1/client-portal/projects/:id/budget` - Get budget details
- `PUT /api/v1/client-portal/projects/:id/budget` - Update budget

**Client Portal - Media Library (Phase 44-45):**
- `GET /api/v1/client-portal/projects/:id/media` - List project media
- `POST /api/v1/client-portal/projects/:id/media` - Upload media file
- `GET /api/v1/client-portal/media/:mediaId` - Get media details
- `PUT /api/v1/client-portal/media/:mediaId` - Update media metadata
- `DELETE /api/v1/client-portal/media/:mediaId` - Delete media
- `POST /api/v1/client-portal/media/:mediaId/tags` - Add tags to media
- `GET /api/v1/client-portal/projects/:id/media/albums` - List albums
- `POST /api/v1/client-portal/projects/:id/media/download` - Bulk download media

**Client Portal - Financial Documents (Phase 44-45):**
- `GET /api/v1/client-portal/projects/:id/finances` - List financial documents
- `POST /api/v1/client-portal/projects/:id/finances` - Upload financial document
- `GET /api/v1/client-portal/finances/:docId` - Get document details
- `PUT /api/v1/client-portal/finances/:docId` - Update document
- `DELETE /api/v1/client-portal/finances/:docId` - Delete document
- `POST /api/v1/client-portal/finances/:docId/ocr` - Extract OCR data
- `GET /api/v1/client-portal/projects/:id/finances/reports` - Financial reports
- `GET /api/v1/client-portal/finances/tax-year/:year` - Tax year summary
- `POST /api/v1/client-portal/finances/export` - Export for accountant

**Client Portal - Obligations & Schedules (Phase 44-45):**
- `GET /api/v1/client-portal/projects/:id/obligations` - List obligations
- `POST /api/v1/client-portal/projects/:id/obligations` - Create obligation
- `GET /api/v1/client-portal/obligations/:id` - Get obligation details
- `PUT /api/v1/client-portal/obligations/:id` - Update obligation
- `DELETE /api/v1/client-portal/obligations/:id` - Delete obligation
- `POST /api/v1/client-portal/obligations/:id/complete` - Mark as completed
- `GET /api/v1/client-portal/obligations/calendar` - Calendar view
- `GET /api/v1/client-portal/obligations/upcoming` - Upcoming obligations

**Client Portal - Collaborators (Phase 44-45):**
- `GET /api/v1/client-portal/projects/:id/collaborators` - List collaborators
- `POST /api/v1/client-portal/projects/:id/collaborators/invite` - Invite collaborator
- `PUT /api/v1/client-portal/collaborators/:id` - Update collaborator role
- `DELETE /api/v1/client-portal/collaborators/:id` - Remove collaborator
- `POST /api/v1/client-portal/collaborators/accept/:token` - Accept invitation
- `GET /api/v1/client-portal/collaborators/my-projects` - Projects I collaborate on

**Client Portal - Activity & Notes (Phase 44-45):**
- `GET /api/v1/client-portal/projects/:id/activity` - Project activity feed
- `GET /api/v1/client-portal/projects/:id/notes` - List project notes
- `POST /api/v1/client-portal/projects/:id/notes` - Create note
- `PUT /api/v1/client-portal/notes/:id` - Update note
- `DELETE /api/v1/client-portal/notes/:id` - Delete note
- `POST /api/v1/client-portal/notes/:id/pin` - Pin/unpin note

**Client Portal - Reports & Export (Phase 44-45):**
- `GET /api/v1/client-portal/projects/:id/summary` - Project summary report
- `POST /api/v1/client-portal/projects/:id/export` - Export project archive
- `GET /api/v1/client-portal/projects/:id/timeline` - Project timeline
- `GET /api/v1/client-portal/dashboard` - Client portal overview

---

## 9. Success Metrics & KPIs

### 9.1 Business Metrics

**Conversion Metrics:**
- Proposal → Signature conversion rate (target: 40%+)
- Time-to-close reduction (target: 50% improvement)
- Client engagement rate (target: 80%+ view proposals)
- Comment-to-approval ratio
- Reminder response rate (target: 25%+ respond after reminder)
- Campaign conversion rate (target: 10%+ open proposals from campaigns)
- Client portal adoption rate (target: 60%+ of clients use portal)
- Multi-project client percentage (target: 30%+ manage multiple projects)

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
- Report Generation: <5 seconds
- Campaign Delivery: >98% success rate
- Reminder Delivery: >95% success rate
- Media Upload/Processing: <30 seconds for 100MB files
- OCR Processing: <5 seconds per document
- Project Dashboard Load: <3 seconds for 100+ items

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

**Phase 26-39: Multi-Tier SaaS Transformation (Q2-Q3 2026 - 16 weeks)**
- Pricing tiers implementation
- Payment integration (Stripe + Mercado Pago)
- Template builder (16-week implementation)
- AI token management by tier
- Four dashboards: Clients, Proposals, Templates, Analytics

**Phase 40-41: Advanced Reporting & Analytics (Q3 2026 - 4 weeks)**
- Client performance reports
- Sector/industry analytics
- Product/service reports
- Time-series analysis
- Automated report scheduling
- Export functionality (PDF, Excel, CSV)
- Cost: Minimal (PostgreSQL + Redis optimization)

**Phase 42: Automated Follow-Up System (Q4 2026 - 3 weeks)**
- Tiered reminder scheduling (first X days, monthly, semi-annual, annual)
- Multi-channel delivery (Email, WhatsApp, Telegram)
- Configurable intervals per proposal
- Client opt-out management
- Reminder effectiveness analytics
- Cost: $100-300/month (messaging services)

**Phase 43: Distribution Lists & Campaign Management (Q4 2026 - 5 weeks)**
- Client segmentation engine (demographic, professional, behavioral)
- Visual filter builder with boolean logic
- Campaign creation and templates
- Multi-channel distribution (WhatsApp Business API, Email)
- Launch campaigns (buildings, shopping malls, events)
- Campaign analytics and ROI tracking
- LGPD compliance (consent management, unsubscribe)
- A/B testing capabilities
- Cost: $500-1,500/month (WhatsApp API + messaging costs scale with usage)

**Phase 44-45: Client Portal & Project Management Hub (Q4 2026 - Q1 2027 - 8 weeks)**

**Phase 44: Core Portal (5 weeks)**
- Project creation and management
- Proposal organization and linking
- Media library with upload/tagging
- Financial document management
- Basic reporting and dashboards
- Cost: $200-500/month (storage + OCR)

**Phase 45: Advanced Features (3 weeks)**
- Multi-user collaboration and permissions
- Obligations and schedule tracking
- Complete project memory and audit trail
- Advanced financial reports and tax documentation
- Project export and archiving
- Calendar integration
- Cost: Additional $100-300/month

**Detailed Implementation (Phase 44-45):**

**Week 1-2: Foundation**
- Database schema implementation (8 new tables)
- Project CRUD APIs
- Basic project dashboard UI
- Proposal linking functionality

**Week 3-4: Media & Documents**
- Media upload system (S3/Cloudflare R2)
- Thumbnail generation and processing
- Financial document upload
- OCR integration (Google Vision API/Tesseract)

**Week 5-6: Financial Management**
- Payment tracking system
- Budget management
- Financial reports and charts
- Tax documentation (NFe support)
- Export for accountants

**Week 7: Collaboration**
- Multi-user invitation system
- Role-based permissions
- Activity feed and notifications
- Project notes and commenting

**Week 8: Polish & Integration**
- Obligations tracker with calendar view
- Project timeline visualization
- Complete project export (ZIP archive)
- Mobile responsiveness
- Performance optimization
- Testing and QA

**Total Future Timeline:** 51 weeks (~12.75 months)
**Total Future Operational Cost:** $3,800-8,700/month (scales with user growth and storage)

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
- **CLV:** Customer Lifetime Value
- **ROI:** Return on Investment
- **A/B Testing:** Split testing to compare two versions
- **Segmentation:** Dividing clients into groups based on criteria
- **Campaign:** Targeted message sent to a group of clients
- **Distribution List:** Saved segment for repeated campaign use
- **Engagement Score:** Metric tracking client interaction level
- **Reminder Cadence:** Scheduled frequency of follow-up messages
- **WhatsApp Business API:** Official Meta API for business messaging
- **Opt-in/Opt-out:** User consent management for marketing communications
- **Client Portal:** Client-facing project management and financial tracking system
- **Project Folder:** Container for organizing multi-vendor proposals and contracts
- **NFe:** Nota Fiscal Eletrônica (Brazilian electronic invoice)
- **OCR:** Optical Character Recognition for extracting text from images
- **Project Collaborator:** Family member or partner with shared project access
- **Obligation:** Scheduled task or payment with due date and reminders

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
