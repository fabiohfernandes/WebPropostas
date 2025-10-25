# Project Memory - WebPropostas

**Purpose:** Living document that serves as Claude Code's persistent memory across all sessions. This file is automatically read at the start of every session and continuously updated throughout development.

**⚠️ CRITICAL:** This file MUST be read at the beginning of EVERY Claude Code session along with `NOTES.md` and `DEVELOPMENT.md`.

---

## Project Identity

**Name:** WebPropostas
**Domain:** infigital.net
**Owner:** Fabio Hartmann Fernandes (Metamentes / In-Digital World)
**Location:** Florianópolis - SC - Brazil
**Type:** Multi-tier SaaS Platform
**Market:** Brazilian B2B/B2C commercial proposal and project management

---

## What This Platform Is

**Original Vision (Phases 1-19):**
AI-driven commercial proposal platform for creating, sharing, and closing proposals.

**Current Vision (Phases 20-46):**
Complete lifecycle project management ecosystem + marketplace discovery platform. Beyond proposals to become the single source of truth for multi-vendor projects with built-in service discovery.

**Value Proposition:**
Transform how Brazilian businesses and families discover services, receive proposals, and manage complex projects - from marketplace search to final delivery - with complete financial tracking, media documentation, and multi-user collaboration.

---

## Current Status Snapshot

**Last Updated:** 2025-01-06

### Production Status
- **Environment:** Railway (production), Docker Compose (development)
- **Frontend:** Live at Railway URL (Next.js 14)
- **Backend:** Live at Railway URL (Node.js/Express)
- **Database:** PostgreSQL 15 on Railway
- **Current Phase:** Phase 19 Complete, Phase 20-45 Planned

### What's Working (Production Ready)
✅ **Authentication:** JWT with access/refresh tokens, Zustand state management
✅ **Multi-tenancy:** Organization-scoped data isolation
✅ **Proposals:** Full CRUD with 4-state workflow (Aberta, Alterações Solicitadas, Fechada, Rejeitada)
✅ **Client Collaboration:** Comments, change requests, approvals
✅ **Dashboard:** Real-time statistics, conversion tracking
✅ **Reports:** Month-over-month analysis with growth metrics
✅ **Glassmorphism UI:** Modern design system throughout
✅ **Docker Containerization:** Full stack (Nginx, API, Frontend, PostgreSQL, Redis)
✅ **LGPD Compliance:** Audit logs, consent tracking, data minimization

### What's In Development
🚧 **Railway Frontend Deployment:** Frontend service Railway configuration
🚧 **AI Integration:** OpenAI GPT-4 for content assistance (Phase 20)
🚧 **Design Import:** Canva/Gamma import pipeline (Phase 21)

### What's Planned (Roadmap)
📝 **Phase 20-25:** AI features, design import, contracts, notifications, subdomains
📝 **Phase 26-39:** Multi-tier SaaS transformation (Freemium/Standard/Professional)
📝 **Phase 40-41:** Advanced reporting and analytics (4 weeks)
📝 **Phase 42:** Automated follow-up system (3 weeks)
📝 **Phase 43:** Distribution lists and campaigns (5 weeks)
📝 **Phase 44-45:** Client Portal & Project Management Hub (8 weeks) ⭐ **MAJOR FEATURE**
📝 **Phase 46:** 🆕 Marketplace Search & Discovery (4 weeks) ⭐ **REVOLUTIONARY FEATURE**

---

## Architectural Understanding

### Technology Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, React 18, Tailwind CSS, Framer Motion
- **Backend:** Node.js 18+, Express.js, JWT authentication
- **Database:** PostgreSQL 15 (primary), Redis 7 (cache/sessions)
- **State:** Zustand (auth), React Query (data fetching)
- **Deployment:** Railway (production), Docker Compose (development)
- **Future:** OpenAI GPT-4, WhatsApp Business API, AWS Route 53, Cloudflare R2

### Core Architecture Patterns

**Multi-Tenant Model:**
```
organizations (root)
  ├── users (organization_id FK)
  ├── clients (organization_id FK)
  ├── proposals (organization_id FK)
  └── all other entities scope to organization
```

**Authentication Flow:**
1. Login → JWT access token (15m) + refresh token (7d)
2. Zustand store (client-side)
3. Axios interceptors (auto-attach Bearer token)
4. Token refresh hook (auto-renew before expiration)
5. Logout → Server invalidation + client clear

**Proposal Lifecycle:**
```
Aberta (blue) → Client reviews
  ↓
Alterações Solicitadas (yellow) → Client requests changes
  ↓
Fechada (green) → Approved, ready for contract
  or
Rejeitada (red) → Rejected
```

**File Structure (Critical):**
```
services/
├── frontend/           # Next.js 14 App Router
│   ├── src/app/       # Pages (auth, dashboard, clients, reports, proposal)
│   ├── src/components/ # React components (barrel exports)
│   ├── src/store/     # Zustand (auth, ui, types)
│   ├── src/hooks/     # Custom hooks (useAuth, useTokenRefresh)
│   └── src/lib/       # API client (Axios with interceptors)
├── api/               # Express.js REST API
│   ├── src/models/    # Database models (uses DATABASE_URL)
│   ├── src/routes/    # API endpoints
│   ├── src/middleware/ # Validation, LGPD
│   └── src/utils/     # Brazilian validators (CPF/CNPJ)
└── database/          # PostgreSQL schemas and migrations
```

---

## Critical Technical Details (Don't Forget)

### Database Facts
- **Name:** `webpropostas` ⚠️ (NOT `orcamentos` - old name)
- **Access:** `docker exec webpropostas-postgres psql -U webpropostas_user -d webpropostas`
- **Templates:** Stored in PostgreSQL `proposal_templates` table (NOT JSON file)
- **Container Prefix:** All containers start with `webpropostas-`

### API Endpoints
- **Base:** `http://localhost:3000/api/v1` (dev) / Railway URL (prod)
- **Frontend:** `http://localhost:3001` (dev) / Railway URL (prod)

### Docker Network
- Custom bridge: `orcamentos-network` (172.20.0.0/16)
- nginx: 172.20.0.10 (ports 80, 443)
- api: 172.20.0.20 (port 3000)
- frontend: 172.20.0.21 (port 3001)
- postgres: 172.20.0.30 (port 5432)
- redis: 172.20.0.40 (port 6379)

### Environment Variables (Production)
- **API:** `DATABASE_URL` (Railway auto-generated), `JWT_SECRET`, `JWT_REFRESH_SECRET`
- **Frontend:** `NEXT_PUBLIC_API_URL` (Railway API domain)
- **Railway Critical:** Set root directory IMMEDIATELY (`services/api` or `services/frontend`)

### Brazilian Market Specifics
- **Language:** Portuguese (pt-BR) throughout
- **Currency:** Real Brasileiro (R$)
- **Validation:** CPF/CNPJ via `brazilianValidators.js`
- **Tax Compliance:** NFe (Nota Fiscal Eletrônica) storage and validation
- **LGPD:** Brazilian data protection law compliance
- **Payments:** Mercado Pago integration (planned)
- **Messaging:** WhatsApp Business API (Meta) for notifications

---

## Pricing Tiers (Multi-Tier SaaS Model)

| Tier | Price | Proposals | Clients | Key Features |
|------|-------|-----------|---------|--------------|
| **Freemium** | R$ 0 | 3 total | 1 (name only) | PDF export only (10/mo), no AI, no portal |
| **Standard** | R$ 97/mo | 100/mo | 10 (contact info) | AI editing (50K tokens), hosted proposals, basic reports, basic portal |
| **Professional** | R$ 247/mo | Unlimited | Unlimited | Advanced AI (200K tokens), full portal, campaigns, custom branding |

**Professional Tier Killer Features:**
- Client Portal with project management
- Multi-vendor project coordination
- Financial tracking with NFe
- Media library (unlimited storage)
- Multi-user collaboration
- Campaign management with WhatsApp Business API

---

## Recent Major Decisions (Last 30 Days)

### 2025-01-06: Client Portal & Project Management Hub
**What:** Added Phase 44-45 (8 weeks implementation)
**Why:** Transform from proposal tool into complete project management ecosystem
**Impact:**
- Target market expansion: families, couples, individuals (not just B2B)
- Customer LTV increase: 6 months → 18-24 months
- Premium pricing justified: R$ 247/mo for R$ 100K-1M projects
- Competitive moat: no competitor offers this combination

**7 Use Cases Added:**
1. Home Construction (R$ 500K, 18 months)
2. Vehicle Repair (R$ 18.5K, insurance claims)
3. Children's Education (R$ 24K/year, multiple activities)
4. Wedding Planning (R$ 80K, 15 vendors)
5. Home Renovation (R$ 120K, 4 months)
6. Corporate Events (R$ 150K, 500 attendees)
7. Healthcare (R$ 32K, orthodontics)

### 2025-01-06: Advanced Features (Phases 40-43)
**What:** Reporting, automated follow-ups, campaigns
**Why:** Improve retention and add marketing automation
**Features:**
- Client/sector/product reports with export
- Tiered reminder system (X days, monthly, semi-annual, annual)
- Client segmentation and campaign management
- WhatsApp Business API integration

---

## Development Methodology

### "Vibe Coding" Approach
1. **Vision & Taste:** Clear product intent with strong UX focus
2. **Tight Loops:** Plan → Build → Test → Learn cycles
3. **Proof:** Runnable code and demos at each iteration
4. **Quality Bars:** Automated checks
5. **Calm Defaults:** Sensible assumptions
6. **Human-in-the-Loop:** Sign-offs at key gates

### Multi-Agent System
- **MAESTRO:** Central orchestrator (always invoke first)
- **Alpha Crew (10):** Research & Planning
- **Beta Crew (58):** Development & Implementation
- **Gamma Crew (10):** Quality, Security, Deployment

**Key Agents:**
- **ORION:** Full-stack development
- **NOVA:** Frontend (Next.js/React)
- **CASSANDRA:** Database
- **AURELIA:** UI/UX (glassmorphism)
- **RAILWAY CONDUCTOR:** Deployment
- **TESTER:** Autonomous stress testing
- **FORTRESS:** Security & LGPD

---

## Critical Operating Rules (NEVER VIOLATE)

### Docker-Only Development
- ❌ **NEVER** run `npm run dev` locally
- ✅ **ALWAYS** use Docker: `docker-compose restart frontend`
- ✅ Apply changes via container restart
- ✅ All services must be containerized

### Permission-Based Actions
- ❌ **NEVER** install packages without permission
- ❌ **NEVER** create Docker resources without approval
- ❌ **NEVER** run npm install automatically
- ✅ **ALWAYS** ask before installing anything

### User Interaction
- ✅ **ALWAYS** ask for "NEXT" before new phase
- ✅ **ALWAYS** ask for testing approval at milestones
- ✅ **ALWAYS** wait for confirmation before proceeding
- ✅ **ASSUME** user is not an experienced coder
- ✅ **TEACH** and explain everything clearly

### Transparency
- ✅ **NEVER** lie about development progress
- ✅ **NEVER** show features as ready when they're not
- ✅ **ALWAYS** tell the truth about implementation status
- ✅ **UPDATE** development.md at every milestone

### Color Pickers
- ❌ **BANNED:** HTML `<input type="color">`
- ✅ **REQUIRED:** Use ColorDropdown component from color scheme system

---

## Common Development Commands

### Docker (Primary Method)
```bash
# Start all services
docker-compose up -d

# Restart specific service (after code changes)
docker-compose restart frontend
docker-compose restart api

# View logs
docker-compose logs -f frontend
docker-compose logs -f api

# Stop all
docker-compose down

# Clean slate (removes volumes)
docker-compose down -v

# Database access
docker exec -it webpropostas-postgres psql -U webpropostas_user -d webpropostas
```

### Testing
```bash
# Frontend tests
cd services/frontend
npm test
npm run test:coverage

# Backend tests
cd services/api
npm test
npm run test:integration
```

### Railway Deployment
```bash
railway login
cd services/api  # or services/frontend
railway init
railway up
railway logs
```

---

## Known Issues & Solutions

### Railway Deployment
- **Build timeout:** Root directory not set → Set `services/api` in Settings → Source
- **No URL:** Public Networking disabled → Enable in Settings → Networking
- **DB errors:** Wrong DATABASE_URL → Copy exact string from Railway Variables

### Local Development
- **Port conflicts:** Services running → Stop processes or change ports
- **DB refused:** PostgreSQL not started → `docker-compose up -d postgres`
- **CORS errors:** Wrong CORS_ORIGIN → Match frontend URL in API .env

---

## Next Milestone to Achieve

**Current Target:** Phase 20 - AI Integration (4 weeks)

**What Needs to Be Done:**
1. OpenAI GPT-4 API integration
2. Content assistance features (rewrite, translate, tone shift)
3. Token management by tier (50K/200K tokens per month)
4. Cost monitoring and optimization
5. AI response time <500ms target

**Blockers:** None identified
**Dependencies:** OpenAI API key, billing setup
**Estimated Start:** Awaiting user approval to proceed

**Next After Phase 20:**
- Phase 21: Design Import (Canva/Gamma) - 6 weeks
- Phase 22: Media Processing (Nano Banana) - 4 weeks
- Phase 23: Contract Automation - 6 weeks

---

## Problems Solved (Historical Record)

### Phase 1-19 (Foundation - September 2025)
✅ Multi-tenant architecture with organization isolation
✅ JWT authentication with refresh tokens
✅ Four-state proposal workflow
✅ Client collaboration with comments
✅ Real-time dashboard and analytics
✅ Glassmorphism UI design system
✅ Docker containerization (all services)
✅ Railway backend deployment
✅ LGPD compliance framework
✅ Brazilian market validators (CPF/CNPJ)

### Recent (December 2025 - January 2026)
✅ PRD expansion with Phases 40-45
✅ Client Portal comprehensive specification
✅ 7 real-world use cases across industries
✅ Cross-industry application matrix
✅ Database schema for portal features (8 new tables)
✅ API endpoint design (83 new endpoints)
✅ 🆕 Marketplace Search & Discovery (Phase 46) - JANUARY 6, 2025

---

## Recent Updates & Changes

### January 6, 2025 - 🚀 MARKETPLACE MODULE ADDED (MAJOR EXPANSION)

**Decision:** Transform WebPropostas from "receive proposals" platform into full marketplace where clients can actively discover and request services.

**What Changed:**
1. **New Module:** Marketplace Search & Discovery (Phase 46)
   - Product/service/campaign search across all categories
   - Advanced filtering (location, price, rating, availability)
   - Provider profiles with portfolios and reviews
   - Quote request system (one form → multiple providers)
   - Map view with geolocation
   - Save/favorite listings
   - Integrated workflow: Search → Quote → Proposal → Project → Payment

2. **Database Schema:** 6 new tables designed
   - `marketplace_categories` (hierarchical)
   - `marketplace_listings` (core entity - 10,000+ expected)
   - `marketplace_quote_requests` (lead generation)
   - `marketplace_reviews` (trust & transparency)
   - `marketplace_saved_listings` (user favorites)
   - `marketplace_listing_views` (analytics)
   - See: `MARKETPLACE-SCHEMA.md` for complete specification

3. **Search Categories Defined:**
   - 🏗️ Construction & Home Services (contractors, architects, engineers)
   - 🏠 Real Estate (apartments, houses, commercial properties)
   - 🚗 Vehicles (cars, motorcycles, dealerships)
   - 👨‍🏫 Personal Services (teachers, cooks, trainers, professionals)
   - 🎉 Event Services (weddings, catering, photographers)

4. **Business Model Impact:**
   - Premium listings: R$ 47/month
   - Lead generation: R$ 5-15 per quote request
   - Featured placement: R$ 97/month
   - Future marketplace commission: 2-5%
   - Strong network effects (more providers = more clients = more value)

5. **Documentation Created:**
   - `COMPLETE-VISION.md` updated (Module #2 on client side)
   - `MARKETPLACE-SCHEMA.md` (complete database design, 600+ lines)
   - `PRESENTATION-PLAN.md` updated (new marketplace demo section)
   - Presentation page specifications with ASCII mockups
   - Demo script updated (15 min client journey now includes marketplace)

**Why This Is Revolutionary:**
- Only platform offering: Search → Quote → Proposal → Project Management → Payment tracking (all in one)
- Unlike GetNinjas/Habitissimo: Integrated proposal quality + project management
- Network effect moat: More providers = better search = more clients = more value
- Competitive advantage: Every provider has verified portfolio from platform proposals

**Implementation Priority:**
- For presentation (Jan 13): Placeholder page with sample listings
- Post-presentation: Full search, filters, quote requests, reviews

### January 6, 2025 - Vision Document Translation
- Translated visão_geral.md (Portuguese) to overview.md (English)
- Original vision document outlines comprehensive platform modules
- Document shows initial vision before current roadmap development
- Notable differences from current implementation:
  - Original vision included extensive client-side portal features
  - Many modules align with current Phase 44-45 (Client Portal) plans
  - Template builder concept matches current Phase 26-39 implementation

## Open Questions & Decisions Needed

*None currently - awaiting user direction for Phase 20 implementation*

---

## Files to Always Reference

**At Session Start (MANDATORY):**
1. `NOTES.md` - User's strategic decisions
2. `PROJECT-MEMORY.md` - This file (Claude's memory)
3. `DEVELOPMENT.md` - Current development status
4. `CLAUDE.md` - Operating guidelines

**For Requirements:**
- `.vibecoding/Informations/product.md` - Complete PRD
- `.vibecoding/Informations/roadmap.md` - Implementation timeline

**For Architecture:**
- `SYSTEM-MAP.md` - System architecture and data flow
- `services/api/API_DOCUMENTATION.md` - API reference

**For Deployment:**
- `RAILWAY-DEPLOYMENT.md` - Railway procedures
- `.vibecoding/Procedures/Railway_*.md` - Railway troubleshooting

---

## Session Checklist (Read Every Time)

**Before Starting Work:**
- [ ] Read NOTES.md for latest user decisions
- [ ] Read PROJECT-MEMORY.md (this file) for context
- [ ] Read DEVELOPMENT.md for current status
- [ ] Check CLAUDE.md for operating rules
- [ ] Verify which phase we're in (currently Phase 19 complete)
- [ ] Confirm next milestone with user before proceeding

**During Work:**
- [ ] Update PROJECT-MEMORY.md with decisions made
- [ ] Update DEVELOPMENT.md when milestones achieved
- [ ] Follow Docker-only development (no local services)
- [ ] Ask permission before installing anything
- [ ] Teach and explain (assume non-technical user)

**Before Ending Session:**
- [ ] Commit significant changes to git
- [ ] Update PROJECT-MEMORY.md with session summary
- [ ] Note any blockers or decisions needed
- [ ] Prepare clear status for next session

---

## Quick Reference

**I am stuck, what do I do?**
→ Read `SYSTEM-MAP.md` for complete architecture

**User wants new feature:**
→ Update `NOTES.md` with decision, then update `PROJECT-MEMORY.md`, then implement

**Ready to code:**
→ Confirm which phase, get "NEXT" approval, use Docker only

**Deployment issue:**
→ Check `RAILWAY-DEPLOYMENT.md` and `.vibecoding/Procedures/Railway_*.md`

**Need specialist help:**
→ Invoke MAESTRO, who coordinates appropriate agent (ORION, NOVA, CASSANDRA, etc.)

---

**Last Updated:** 2025-01-06
**Last Session:** Initial project memory creation
**Next Action:** Awaiting user direction for Phase 20 (AI Integration) or other priority
**Status:** ✅ Production stable, roadmap defined, ready for next phase
