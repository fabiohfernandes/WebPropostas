# WebPropostas - Complete Navigation Structure
## All 25 Modules Mapped

**Date:** January 6, 2025
**Status:** Complete Specification
**Implementation:** Phase 29

---

## 🏠 Public Pages (No Authentication Required)

### Landing & Marketing
1. **/** - Main landing page with dual-portal explanation
2. **/about** - About WebPropostas
3. **/pricing** - Pricing plans comparison
4. **/contact** - Contact form
5. **/help** - Help center & documentation
6. **/templates** - Public template gallery

### Authentication
7. **/auth/login** - Login (detects provider vs client)
8. **/auth/register** - Registration with role selection
9. **/auth/forgot-password** - Password recovery
10. **/auth/reset-password** - Password reset

---

## 🔵 PROVIDER PORTAL (15 Modules)

### Module 1: Dashboard (`/provider/dashboard`)
**Purpose:** Central business overview
**Features:**
- KPI cards (Proposals, Revenue, Conversion Rate, Active Clients)
- Recent proposals list
- Activity feed
- Conversion chart (6 months)
- Marketplace leads widget
- AI suggestions widget

**Components:**
- DashboardHeader
- Sidebar
- KPICard (×4)
- RecentProposalsWidget
- ActivityFeed
- ConversionChart
- MarketplaceLeadsWidget
- AISuggestionsWidget

**Access:** `/provider/dashboard`

---

### Module 2: Client Management (`/provider/clients`)
**Purpose:** Full CRM for client relationships
**Features:**
- Client list with search/filter
- Client detail view with contact history
- Add/Edit client forms
- Document repository per client
- Communication history timeline
- Tags and segmentation
- Import/Export clients

**Sub-pages:**
- `/provider/clients` - Client list
- `/provider/clients/new` - Add new client
- `/provider/clients/:id` - Client detail
- `/provider/clients/:id/edit` - Edit client

**Access:** `/provider/clients`

---

### Module 3: Proposal Management (`/provider/proposals`)
**Purpose:** Create, edit, and track all proposals
**Features:**
- Proposals list (all statuses)
- Proposal editor (text-based)
- Visual template builder integration
- Status tracking (Aberta, Alterações, Fechada, Rejeitada)
- Client feedback/comments
- Version history
- Share links generation
- PDF export

**Sub-pages:**
- `/provider/proposals` - All proposals list
- `/provider/proposals/new` - Create proposal (text editor)
- `/provider/proposals/:id` - Proposal detail/edit
- `/provider/proposals/builder/:id` - Visual template builder

**Access:** `/provider/proposals`

---

### Module 4: Template Builder (`/provider/templates`)
**Purpose:** Visual template creation (Proprietary Builder)
**Features:**
- Drag-and-drop canvas (Konva.js)
- Element library (Text, Images, Shapes, Icons)
- AI content generation
- Brand assets management
- Template library (personal + shared)
- Canva/Gamma import (planned)
- Multi-page support
- Export to PDF/HTML

**Sub-pages:**
- `/provider/templates` - Template library
- `/provider/templates/new` - Create template
- `/provider/templates/:id/edit` - Edit template
- `/provider/templates/:id/preview` - Preview template

**Access:** `/provider/templates`

---

### Module 5: Campaigns (`/provider/campaigns`)
**Purpose:** Automated marketing campaigns
**Features:**
- Campaign builder (email/WhatsApp/Telegram sequences)
- Audience segmentation
- A/B testing support
- Schedule and automation
- Campaign analytics
- Template library for messages
- Follow-up reminders

**Sub-pages:**
- `/provider/campaigns` - Campaign list
- `/provider/campaigns/new` - Create campaign
- `/provider/campaigns/:id` - Campaign detail
- `/provider/campaigns/:id/analytics` - Campaign analytics

**Access:** `/provider/campaigns`

---

### Module 6: Marketplace Listings (`/provider/marketplace`)
**Purpose:** Manage service listings and leads
**Features:**
- Create/edit service listings
- Pricing and packages
- Portfolio showcase
- Lead inbox
- Quote request management
- Performance analytics
- Review management

**Sub-pages:**
- `/provider/marketplace/my-listings` - My service listings
- `/provider/marketplace/new-listing` - Create listing
- `/provider/marketplace/leads` - Leads inbox
- `/provider/marketplace/analytics` - Performance metrics

**Access:** `/provider/marketplace`

---

### Module 7: Contracts (`/provider/contracts`)
**Purpose:** Contract generation and e-signature
**Features:**
- Auto-generate from approved proposals
- Contract templates
- E-signature integration (DocuSign/Clicksign/Autentique)
- Status tracking (Draft, Pending, Signed, Archived)
- Legal clause library
- Contract analytics

**Sub-pages:**
- `/provider/contracts` - All contracts
- `/provider/contracts/generate/:proposalId` - Generate from proposal
- `/provider/contracts/:id` - Contract detail/edit
- `/provider/contracts/:id/sign` - Signature flow

**Access:** `/provider/contracts`

---

### Module 8: Financial Management (`/provider/financeiro`)
**Purpose:** Invoice and financial tracking
**Features:**
- Invoice creation and management
- NFe generation (Brazilian tax invoice)
- Payment tracking
- Revenue reports
- Expense tracking
- Financial dashboard
- Integration with accounting systems

**Sub-pages:**
- `/provider/financeiro` - Financial dashboard
- `/provider/financeiro/invoices` - Invoice management
- `/provider/financeiro/nfe` - NFe generation
- `/provider/financeiro/reports` - Financial reports
- `/provider/financeiro/expenses` - Expense tracking

**Access:** `/provider/financeiro`

---

### Module 9: Analytics & Reports (`/provider/analytics`)
**Purpose:** Business intelligence and insights
**Features:**
- Proposal conversion funnel
- Revenue trends
- Client acquisition metrics
- Performance by service category
- Time-to-close analysis
- Marketplace performance
- Custom report builder
- Export to PDF/Excel

**Access:** `/provider/analytics`

---

### Module 10: Settings - Profile (`/provider/settings/profile`)
**Purpose:** User profile management
**Features:**
- Personal information
- Avatar/photo
- Contact details
- Password change
- Email preferences
- Two-factor authentication

**Access:** `/provider/settings/profile`

---

### Module 11: Settings - Company (`/provider/settings/company`)
**Purpose:** Company/organization settings
**Features:**
- Company information
- Business address
- Tax IDs (CNPJ, IE)
- Bank account details
- Legal documents repository
- Team members management

**Access:** `/provider/settings/company`

---

### Module 12: Settings - Branding (`/provider/settings/branding`)
**Purpose:** Brand identity customization
**Features:**
- Logo upload
- Brand colors
- Typography selection
- Email signatures
- Proposal footer customization
- Watermark settings

**Access:** `/provider/settings/branding`

---

### Module 13: Settings - Integrations (`/provider/settings/integrations`)
**Purpose:** Third-party integrations
**Features:**
- API keys management
- OAuth connections (Google, Microsoft)
- CRM integrations
- Accounting software (QuickBooks, Xero)
- E-signature providers
- Storage services (Google Drive, Dropbox)
- Communication (WhatsApp Business API, Telegram)

**Access:** `/provider/settings/integrations`

---

### Module 14: Settings - Billing (`/provider/settings/billing`)
**Purpose:** Subscription and payment management
**Features:**
- Current plan details
- Usage metrics
- Upgrade/downgrade options
- Payment method management
- Billing history
- Invoices download

**Access:** `/provider/settings/billing`

---

### Module 15: Help & Documentation (`/provider/help`)
**Purpose:** Support and learning resources
**Features:**
- Knowledge base search
- Video tutorials
- FAQs
- Live chat support
- Feature request submission
- Bug reporting
- Community forum link

**Access:** `/provider/help`

---

## 🟢 CLIENT PORTAL (10 Modules)

### Module 16: Client Dashboard (`/client/dashboard`)
**Purpose:** Client central overview
**Features:**
- Active projects summary
- Pending proposals inbox
- Recent activity feed
- Budget overview
- Upcoming milestones
- Favorite vendors quick access

**Components:**
- DashboardHeader
- Sidebar
- ProjectSummaryCards
- ProposalsInbox
- ActivityFeed
- BudgetWidget
- MilestonesTimeline

**Access:** `/client/dashboard`

---

### Module 17: Marketplace Search (`/marketplace`)
**Purpose:** Discover and browse service providers
**Features:**
- Advanced search (category, location, price, rating)
- Provider cards with stats
- Filter panel (category, location, price range, rating)
- Favorite/bookmark providers
- Compare providers side-by-side
- Quote request form
- Provider profiles

**Sub-pages:**
- `/marketplace` - Search & browse
- `/marketplace/search` - Search results
- `/marketplace/:id` - Provider detail (✅ IMPLEMENTED)
- `/marketplace/saved` - Saved listings
- `/marketplace/quote-requests` - My quote requests

**Access:** `/marketplace` ✅ IMPLEMENTED

---

### Module 18: Proposals Inbox (`/client/proposals`)
**Purpose:** View and manage received proposals
**Features:**
- Proposals list (all statuses)
- Proposal viewer
- Accept/Request Changes/Reject actions
- Comments and feedback
- Side-by-side comparison
- Download PDF
- Share with family/team

**Sub-pages:**
- `/client/proposals` - Proposals inbox
- `/client/proposals/view/:id` - View proposal
- `/client/proposals/compare` - Compare multiple proposals

**Access:** `/client/proposals`

---

### Module 19: Project Management (`/client/projects`)
**Purpose:** Track and manage construction/service projects
**Features:**
- Project list
- Project dashboard (overview, timeline, budget)
- Vendor management (multiple vendors per project)
- Document repository
- Progress photos/videos gallery
- Task checklist
- Budget vs actual tracking
- Team collaboration (family members)

**Sub-pages:**
- `/client/projects` - All projects
- `/client/projects/new` - Create project
- `/client/projects/:id/overview` - Project overview
- `/client/projects/:id/vendors` - Vendor management
- `/client/projects/:id/financeiro` - Financial tracking
- `/client/projects/:id/gallery` - Progress photos/videos
- `/client/projects/:id/documents` - Document repository
- `/client/projects/:id/settings` - Project settings

**Access:** `/client/projects`

---

### Module 20: Vendors (`/client/vendors`)
**Purpose:** Saved vendors and relationship management
**Features:**
- Saved vendors list
- Vendor profiles
- Contact history
- Reviews and ratings
- Document sharing
- Communication log
- Favorite/unfavorite

**Sub-pages:**
- `/client/vendors` - Saved vendors
- `/client/vendors/:id` - Vendor profile

**Access:** `/client/vendors`

---

### Module 21: Client Financial (`/client/financeiro`)
**Purpose:** Personal project financial tracking
**Features:**
- Financial dashboard (all projects)
- Payment schedule
- Invoice repository
- Budget vs actual comparison
- Expense categorization
- Financial reports
- Export to Excel

**Sub-pages:**
- `/client/financeiro` - Financial dashboard
- `/client/financeiro/payments` - Payment schedule
- `/client/financeiro/invoices` - Invoice repository
- `/client/financeiro/reports` - Financial reports

**Access:** `/client/financeiro`

---

### Module 22: Client Settings - Profile (`/client/settings/profile`)
**Purpose:** Client profile management
**Features:**
- Personal information
- Avatar/photo
- Contact details
- Password change
- Email preferences
- Notification settings

**Access:** `/client/settings/profile`

---

### Module 23: Client Settings - Family (`/client/settings/family`)
**Purpose:** Family/team collaboration
**Features:**
- Add family members
- Permission management
- Shared project access
- Activity visibility controls
- Invite via email

**Access:** `/client/settings/family`

---

### Module 24: Client Settings - Notifications (`/client/settings/notifications`)
**Purpose:** Notification preferences
**Features:**
- Email notifications toggle
- WhatsApp notifications
- Telegram notifications
- Frequency settings
- Notification types (proposals, projects, payments)
- Quiet hours configuration

**Access:** `/client/settings/notifications`

---

### Module 25: Client Help (`/client/help`)
**Purpose:** Client support and resources
**Features:**
- Knowledge base
- FAQs
- Video guides
- Live chat support
- Contact support team
- Community forum

**Access:** `/client/help`

---

## 📊 Module Summary

### Provider Modules (15):
1. Dashboard
2. Client Management (CRM)
3. Proposal Management
4. Template Builder ⭐ (Proprietary)
5. Campaigns
6. Marketplace Listings
7. Contracts
8. Financial Management
9. Analytics & Reports
10. Settings - Profile
11. Settings - Company
12. Settings - Branding
13. Settings - Integrations
14. Settings - Billing
15. Help & Documentation

### Client Modules (10):
16. Client Dashboard
17. Marketplace Search ✅ (Implemented)
18. Proposals Inbox
19. Project Management
20. Vendors
21. Client Financial
22. Client Settings - Profile
23. Client Settings - Family
24. Client Settings - Notifications
25. Client Help

---

## 🚀 Implementation Status

### ✅ Completed:
- Landing Page
- Provider Dashboard (Enhanced)
- Marketplace Search & Provider Profile
- Component Library (18 components)
- Glassmorphism Design System

### 🚧 Next Phase (Phase 29):
Create placeholder pages for all 25 modules with:
- Navigation sidebar
- Module header with breadcrumb
- Content area with module description
- "Coming Soon" or "In Development" badges
- Link to related modules

### 📋 Implementation Priority:
**Week 1:** Provider core (Modules 1-4)
**Week 2:** Client core (Modules 16-18)
**Week 3:** Provider advanced (Modules 5-9)
**Week 4:** Client advanced (Modules 19-21)
**Week 5:** Settings and Help (Modules 10-15, 22-25)
**Week 6:** Integration and testing
**Week 7:** Polish and deployment

---

## 🎯 Navigation Structure

### Provider Sidebar
```
📊 Dashboard
👥 Clientes
📄 Propostas
🎨 Templates
📣 Campanhas
🔍 Marketplace
📋 Contratos
💰 Financeiro
📈 Analytics
⚙️ Configurações
  ├─ Perfil
  ├─ Empresa
  ├─ Branding
  ├─ Integrações
  └─ Cobrança
❓ Ajuda
```

### Client Sidebar
```
📊 Dashboard
🔍 Marketplace
📥 Propostas
🏗️ Projetos
👤 Fornecedores
💰 Financeiro
⚙️ Configurações
  ├─ Perfil
  ├─ Família
  └─ Notificações
❓ Ajuda
```

---

**Ready for Phase 29 Implementation!**
