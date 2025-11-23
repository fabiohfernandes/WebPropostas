# WebPropostas Platform Expansion Plan
## From Proposal Platform to Complete Supply & Demand Marketplace

**Document Version:** 1.0
**Created:** November 22, 2025
**Branch:** New_Features
**Status:** Strategic Planning Phase

---

## Executive Summary

### The Vision Evolution

**Before:** WebPropostas - A platform for professionals to create and send commercial proposals to clients.

**After:** WebPropostas - A comprehensive **Supply & Demand Marketplace** that connects:
- Sellers with Buyers (Products & Goods)
- Service Providers with Clients (Services & Projects)
- Job Seekers with Employers (Talent & Recruitment)

### Core Philosophy
> "It doesn't matter if you're selling products, offering services, or seeking employment. It doesn't matter if you're buying goods, hiring contractors, or recruiting employees. **WebPropostas connects supply with demand.**"

---

## Platform Architecture Expansion

### Current State (25 Modules)
```
┌─────────────────────────────────────────────────────────────┐
│                    WEBPROPOSTAS v1.0                        │
├─────────────────────────────────────────────────────────────┤
│  PROVIDER PORTAL (16 modules)                               │
│  ├── Dashboard, Proposals, Clients, Templates               │
│  ├── Campaigns, Contracts, Financial, Projects              │
│  └── Settings (Company, Users, Billing, Integrations, Security) │
├─────────────────────────────────────────────────────────────┤
│  CLIENT PORTAL (4 modules)                                  │
│  ├── Client Dashboard, Proposals Inbox                      │
│  └── Marketplace, Vendors Management                        │
├─────────────────────────────────────────────────────────────┤
│  TEMPLATE BUILDER (~60-70% complete)                        │
│  └── Visual drag-and-drop editor with AI                    │
└─────────────────────────────────────────────────────────────┘
```

### Future State (40+ Modules)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        WEBPROPOSTAS v2.0                                    │
│                   "Complete Supply & Demand Marketplace"                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      SUPPLY SIDE (OFFER)                            │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │   SELLERS       │  │ SERVICE         │  │ JOB SEEKERS     │     │   │
│  │  │   PORTAL        │  │ PROVIDERS       │  │ PORTAL          │     │   │
│  │  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤     │   │
│  │  │ • Product       │  │ • Service       │  │ • CV/Resume     │     │   │
│  │  │   Catalog       │  │   Proposals     │  │   Builder       │     │   │
│  │  │ • E-Commerce    │  │ • Project       │  │ • Portfolio     │     │   │
│  │  │   Integration   │  │   Management    │  │   Showcase      │     │   │
│  │  │ • Inventory     │  │ • Contracts     │  │ • Video         │     │   │
│  │  │ • Shipping      │  │ • Campaigns     │  │   Presentation  │     │   │
│  │  │ • Orders        │  │ • Templates     │  │ • Skills &      │     │   │
│  │  │                 │  │                 │  │   Certifications│     │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      DEMAND SIDE (SEARCH)                           │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │   BUYERS        │  │ SERVICE         │  │ EMPLOYERS       │     │   │
│  │  │   PORTAL        │  │ HIRERS          │  │ PORTAL          │     │   │
│  │  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤     │   │
│  │  │ • Product       │  │ • Provider      │  │ • Job           │     │   │
│  │  │   Search        │  │   Marketplace   │  │   Postings      │     │   │
│  │  │ • Comparison    │  │ • Request for   │  │ • Candidate     │     │   │
│  │  │   Engine        │  │   Proposals     │  │   Search        │     │   │
│  │  │ • Order         │  │ • Project       │  │ • ATS           │     │   │
│  │  │   Management    │  │   Tracking      │  │   (Tracking)    │     │   │
│  │  │ • Purchase      │  │ • Vendor        │  │ • Interview     │     │   │
│  │  │   History       │  │   Management    │  │   Scheduling    │     │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    SHARED INFRASTRUCTURE                            │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  • Unified Search Engine (Products, Services, Talent)               │   │
│  │  • AI-Powered Matching Algorithm                                    │   │
│  │  • Universal Document Builder (Proposals, CVs, Catalogs)            │   │
│  │  • Integrated Payment System                                        │   │
│  │  • Rating & Review System                                           │   │
│  │  • Messaging & Communication Hub                                    │   │
│  │  • Analytics & Reporting                                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## New Module Categories

### Category A: Job Seekers Portal (SUPPLY - Talent)

#### Module A1: CV/Resume Builder
**Description:** Rich visual curriculum builder using existing Template Builder infrastructure
**Features:**
- Drag-and-drop CV creation with AI assistance
- Multiple CV formats (Classic, Modern, Creative, ATS-Optimized)
- AI-powered content suggestions
- Skills highlighting with visual indicators
- Experience timeline visualization
- Education & certification showcase
- Language proficiency indicators
- Portfolio integration (images, videos, links)
- QR code for digital sharing
- PDF/Web export options

**Reuses:**
- Template Builder (100% compatible)
- AI text generation (GPT-4)
- Image upload system
- Video embedding
- Color scheme system
- Typography system

#### Module A2: Professional Portfolio
**Description:** Showcase work samples, projects, and achievements
**Features:**
- Project gallery with rich media
- Case study presentations
- Video introductions
- Before/after showcases
- Client testimonials
- Achievement badges
- GitHub/Behance/Dribbble integration
- Custom domain support (yourname.webpropostas.com.br)

#### Module A3: Job Application Manager
**Description:** Track and manage job applications
**Features:**
- Application tracking dashboard
- Status monitoring (Applied, Viewed, Interview, Offer, Rejected)
- Calendar integration for interviews
- Document version control
- Cover letter generator (AI-powered)
- Application analytics

#### Module A4: Skills & Certifications
**Description:** Verified skills and certifications showcase
**Features:**
- Skill endorsements
- Certificate upload with verification
- LinkedIn import
- Skill assessment tests
- Badge system
- Industry certifications catalog

#### Module A5: Job Search & Alerts
**Description:** Find relevant job opportunities
**Features:**
- Advanced search filters
- Location-based search
- Salary range filters
- Remote/Hybrid/On-site options
- Job alerts via email/WhatsApp
- Recommended jobs (AI-powered)
- Company profiles view

---

### Category B: Employers Portal (DEMAND - Recruitment)

#### Module B1: Job Posting Manager
**Description:** Create and manage job listings
**Features:**
- Rich job description editor
- Salary transparency options
- Benefits showcase
- Company culture highlights
- Application requirements
- Screening questions
- Multi-location posting
- Expiration management

#### Module B2: Candidate Search Engine
**Description:** Search and discover talent
**Features:**
- Full-text search across CVs
- Filter by skills, experience, location
- AI-powered candidate matching
- Saved searches
- Candidate pools
- Boolean search support
- Proximity search

#### Module B3: Applicant Tracking System (ATS)
**Description:** Manage recruitment pipeline
**Features:**
- Kanban-style pipeline view
- Custom hiring stages
- Collaborative evaluation
- Interview scheduling
- Email templates
- Rejection handling
- Offer management
- Onboarding integration

#### Module B4: Interview Management
**Description:** Schedule and conduct interviews
**Features:**
- Calendar integration
- Video interview scheduling
- Interview scorecards
- Panel interview coordination
- Automated reminders
- Interview notes
- Recording (with consent)

#### Module B5: Company Profile & Employer Branding
**Description:** Showcase company to attract talent
**Features:**
- Company page builder
- Team showcase
- Office photos/videos
- Benefits & perks listing
- Company values
- Employee testimonials
- Glassdoor-style reviews

---

### Category C: Enhanced Product Marketplace (Existing + New)

#### Module C1: Product Catalog Manager
**Description:** Manage product listings
**Features:**
- Product listing builder
- Category management
- Variant management (size, color, etc.)
- Pricing tiers
- Inventory tracking
- Product images/videos
- Specification sheets
- Compare products

#### Module C2: E-Commerce Integration
**Description:** Connect with e-commerce platforms
**Features:**
- Shopify integration
- WooCommerce integration
- Mercado Livre integration
- Payment gateway integration
- Order synchronization
- Inventory sync

#### Module C3: Request for Quotation (RFQ)
**Description:** Buyers request quotes from multiple sellers
**Features:**
- RFQ creation wizard
- Multi-vendor distribution
- Quote comparison
- Negotiation tools
- Deadline management
- Bulk purchasing

---

### Category D: Universal Search Engine

#### Module D1: Unified Search Portal
**Description:** Single search interface for everything
**Features:**
- Search products, services, and talent
- Category filters
- Location filters
- Price/salary range filters
- Rating filters
- Availability filters
- AI-powered relevance ranking

#### Module D2: AI Matching Engine
**Description:** Smart recommendations
**Features:**
- Job-to-Candidate matching
- Service-to-Client matching
- Product-to-Buyer matching
- Collaborative filtering
- Content-based filtering
- Real-time recommendations

---

## Implementation Phases

### Phase 32: Foundation & Architecture (2 weeks)
**Goals:**
- Database schema expansion for new entities
- API routes structure for new modules
- Navigation system update
- User role expansion (Job Seeker, Employer)

**Deliverables:**
- [ ] Database migrations for CV, Jobs, Applications tables
- [ ] New user types and permissions
- [ ] Unified search index structure
- [ ] API endpoint planning document

### Phase 33: CV/Resume Builder (3 weeks)
**Goals:**
- Adapt Template Builder for CV creation
- CV-specific templates and components
- AI content assistance for CVs

**Deliverables:**
- [ ] CV Builder interface
- [ ] 10+ CV templates
- [ ] AI experience description generator
- [ ] Skills visualization components
- [ ] PDF export for CVs

### Phase 34: Job Seeker Portal (3 weeks)
**Goals:**
- Complete job seeker experience
- Portfolio system
- Application tracking

**Deliverables:**
- [ ] Professional portfolio pages
- [ ] Job search interface
- [ ] Application manager
- [ ] Skills & certifications module

### Phase 35: Employer Portal - Job Posting (2 weeks)
**Goals:**
- Job posting creation and management
- Company profiles

**Deliverables:**
- [ ] Job posting editor
- [ ] Company profile builder
- [ ] Job listings page
- [ ] Employer dashboard

### Phase 36: Employer Portal - ATS & Recruitment (3 weeks)
**Goals:**
- Complete applicant tracking
- Interview management
- Candidate search

**Deliverables:**
- [ ] ATS pipeline interface
- [ ] Candidate search engine
- [ ] Interview scheduling
- [ ] Evaluation system

### Phase 37: Unified Search Engine (2 weeks)
**Goals:**
- Single search for all marketplace types
- AI matching implementation

**Deliverables:**
- [ ] Unified search interface
- [ ] Elasticsearch/Meilisearch integration
- [ ] AI recommendation engine
- [ ] Advanced filters

### Phase 38: Integration & Polish (2 weeks)
**Goals:**
- Cross-module integration
- Performance optimization
- Mobile responsiveness

**Deliverables:**
- [ ] All modules integrated
- [ ] Performance optimized
- [ ] Mobile-first responsive design
- [ ] User testing feedback incorporated

---

## Database Schema Expansion

### New Tables Required

```sql
-- ============================================
-- JOB SEEKERS / CV SYSTEM
-- ============================================

-- CVs/Resumes
CREATE TABLE cvs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    content JSONB NOT NULL, -- Same structure as proposals
    template_id UUID REFERENCES cv_templates(id),
    status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
    visibility VARCHAR(50) DEFAULT 'private', -- private, public, searchable
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CV Templates (extends proposal_templates concept)
CREATE TABLE cv_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- classic, modern, creative, ats-friendly
    industry VARCHAR(100), -- tech, design, business, healthcare, etc.
    thumbnail_url TEXT,
    structure JSONB NOT NULL,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Professional Experience
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    cv_id UUID REFERENCES cvs(id),
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE, -- NULL = current
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    achievements JSONB, -- Array of achievements
    skills_used JSONB, -- Array of skill IDs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Education
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    cv_id UUID REFERENCES cvs(id),
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255),
    start_date DATE,
    end_date DATE,
    grade VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100), -- technical, soft, language, tool
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Skills (many-to-many)
CREATE TABLE user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    skill_id UUID REFERENCES skills(id),
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
    years_experience INTEGER,
    is_primary BOOLEAN DEFAULT false,
    endorsements_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, skill_id)
);

-- Certifications
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255) NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    credential_id VARCHAR(255),
    credential_url TEXT,
    verification_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Projects
CREATE TABLE portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_url TEXT,
    repository_url TEXT,
    media JSONB, -- Array of images/videos
    technologies JSONB, -- Array of tech used
    start_date DATE,
    end_date DATE,
    is_featured BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- EMPLOYERS / RECRUITMENT SYSTEM
-- ============================================

-- Companies (extends organizations)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    logo_url TEXT,
    cover_image_url TEXT,
    description TEXT,
    industry VARCHAR(100),
    company_size VARCHAR(50), -- 1-10, 11-50, 51-200, 201-500, 500+
    founded_year INTEGER,
    website TEXT,
    linkedin_url TEXT,
    locations JSONB, -- Array of office locations
    benefits JSONB, -- Array of benefits
    culture_values JSONB, -- Array of values
    is_verified BOOLEAN DEFAULT false,
    rating DECIMAL(3,2),
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Postings
CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    posted_by UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    description TEXT NOT NULL,
    requirements JSONB, -- Array of requirements
    responsibilities JSONB, -- Array of responsibilities
    employment_type VARCHAR(50), -- full-time, part-time, contract, freelance, internship
    experience_level VARCHAR(50), -- entry, mid, senior, lead, executive
    location VARCHAR(255),
    is_remote BOOLEAN DEFAULT false,
    remote_type VARCHAR(50), -- fully-remote, hybrid, on-site
    salary_min DECIMAL(15,2),
    salary_max DECIMAL(15,2),
    salary_currency VARCHAR(3) DEFAULT 'BRL',
    salary_period VARCHAR(50) DEFAULT 'month', -- hour, month, year
    show_salary BOOLEAN DEFAULT true,
    required_skills JSONB, -- Array of skill IDs
    nice_to_have_skills JSONB,
    benefits JSONB,
    application_deadline DATE,
    status VARCHAR(50) DEFAULT 'draft', -- draft, published, paused, closed, filled
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

-- Job Applications
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_posting_id UUID REFERENCES job_postings(id),
    applicant_id UUID REFERENCES users(id),
    cv_id UUID REFERENCES cvs(id),
    cover_letter TEXT,
    answers JSONB, -- Screening question answers
    status VARCHAR(50) DEFAULT 'new', -- new, reviewed, shortlisted, interviewing, offer, hired, rejected
    stage VARCHAR(100), -- Custom pipeline stage
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    notes TEXT,
    rejection_reason TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interview Schedule
CREATE TABLE interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES job_applications(id),
    scheduled_by UUID REFERENCES users(id),
    interview_type VARCHAR(50), -- phone, video, in-person, technical, hr
    scheduled_at TIMESTAMP NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    location TEXT,
    meeting_url TEXT,
    interviewers JSONB, -- Array of interviewer user IDs
    notes TEXT,
    feedback JSONB, -- Structured feedback
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, completed, cancelled, no-show
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved Candidates (Talent Pool)
CREATE TABLE saved_candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    candidate_id UUID REFERENCES users(id),
    pool_name VARCHAR(255),
    notes TEXT,
    tags JSONB,
    saved_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Alerts
CREATE TABLE job_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    keywords TEXT,
    location VARCHAR(255),
    employment_type VARCHAR(50),
    experience_level VARCHAR(50),
    salary_min DECIMAL(15,2),
    is_remote BOOLEAN,
    frequency VARCHAR(50) DEFAULT 'daily', -- instant, daily, weekly
    is_active BOOLEAN DEFAULT true,
    last_sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- UNIFIED SEARCH / MARKETPLACE
-- ============================================

-- Search Index (for fast searching)
CREATE TABLE search_index (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL, -- product, service, cv, job
    entity_id UUID NOT NULL,
    title VARCHAR(500),
    description TEXT,
    keywords JSONB,
    location VARCHAR(255),
    price_min DECIMAL(15,2),
    price_max DECIMAL(15,2),
    category VARCHAR(100),
    subcategory VARCHAR(100),
    rating DECIMAL(3,2),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    search_vector TSVECTOR,
    UNIQUE(entity_type, entity_id)
);

-- Create full-text search index
CREATE INDEX search_index_fts ON search_index USING GIN(search_vector);
CREATE INDEX search_index_entity ON search_index(entity_type, entity_id);
CREATE INDEX search_index_category ON search_index(category, subcategory);
```

---

## API Routes Expansion

### New API Endpoints

```
# CV / Resume Management
GET    /api/v1/cvs                    # List user's CVs
POST   /api/v1/cvs                    # Create new CV
GET    /api/v1/cvs/:id                # Get CV details
PUT    /api/v1/cvs/:id                # Update CV
DELETE /api/v1/cvs/:id                # Delete CV
POST   /api/v1/cvs/:id/publish        # Publish CV
GET    /api/v1/cvs/:id/pdf            # Export as PDF
GET    /api/v1/cvs/public/:slug       # Public CV view

# CV Templates
GET    /api/v1/cv-templates           # List CV templates
GET    /api/v1/cv-templates/:id       # Get template details

# Skills Management
GET    /api/v1/skills                 # List all skills
GET    /api/v1/skills/search          # Search skills
POST   /api/v1/user/skills            # Add skill to profile
PUT    /api/v1/user/skills/:id        # Update skill proficiency
DELETE /api/v1/user/skills/:id        # Remove skill

# Experience & Education
GET    /api/v1/experiences            # List experiences
POST   /api/v1/experiences            # Add experience
PUT    /api/v1/experiences/:id        # Update experience
DELETE /api/v1/experiences/:id        # Delete experience

GET    /api/v1/education              # List education
POST   /api/v1/education              # Add education
PUT    /api/v1/education/:id          # Update education
DELETE /api/v1/education/:id          # Delete education

# Portfolio
GET    /api/v1/portfolio              # List portfolio projects
POST   /api/v1/portfolio              # Add project
PUT    /api/v1/portfolio/:id          # Update project
DELETE /api/v1/portfolio/:id          # Delete project

# Job Postings (Employer)
GET    /api/v1/jobs                   # List job postings
POST   /api/v1/jobs                   # Create job posting
GET    /api/v1/jobs/:id               # Get job details
PUT    /api/v1/jobs/:id               # Update job
DELETE /api/v1/jobs/:id               # Delete job
POST   /api/v1/jobs/:id/publish       # Publish job
POST   /api/v1/jobs/:id/close         # Close job posting

# Job Search (Public)
GET    /api/v1/jobs/search            # Search jobs
GET    /api/v1/jobs/featured          # Featured jobs
GET    /api/v1/jobs/:slug             # Public job view

# Applications
GET    /api/v1/applications           # List user's applications (job seeker)
POST   /api/v1/jobs/:id/apply         # Apply to job
GET    /api/v1/applications/:id       # Get application status
PUT    /api/v1/applications/:id       # Update application (withdraw)

# Applicant Management (Employer)
GET    /api/v1/jobs/:id/applications  # List applications for job
PUT    /api/v1/applications/:id/status # Update application status
POST   /api/v1/applications/:id/schedule-interview # Schedule interview

# Candidate Search (Employer)
GET    /api/v1/candidates/search      # Search candidates
GET    /api/v1/candidates/:id         # View candidate profile
POST   /api/v1/candidates/:id/save    # Save to talent pool

# Companies
GET    /api/v1/companies              # List companies
GET    /api/v1/companies/:slug        # Company profile
PUT    /api/v1/company                # Update own company

# Interviews
GET    /api/v1/interviews             # List interviews
POST   /api/v1/interviews             # Schedule interview
PUT    /api/v1/interviews/:id         # Update interview
DELETE /api/v1/interviews/:id         # Cancel interview

# Unified Search
GET    /api/v1/search                 # Universal search
GET    /api/v1/search/products        # Search products only
GET    /api/v1/search/services        # Search services only
GET    /api/v1/search/jobs            # Search jobs only
GET    /api/v1/search/candidates      # Search candidates only

# Job Alerts
GET    /api/v1/job-alerts             # List user's alerts
POST   /api/v1/job-alerts             # Create alert
PUT    /api/v1/job-alerts/:id         # Update alert
DELETE /api/v1/job-alerts/:id         # Delete alert
```

---

## Frontend Pages Expansion

### New Routes Required

```
/talent                           # Job Seekers landing page
/talent/cv                        # CV management dashboard
/talent/cv/new                    # Create new CV
/talent/cv/:id/edit               # Edit CV
/talent/cv/:id/preview            # Preview CV
/talent/portfolio                 # Portfolio management
/talent/applications              # Application tracking
/talent/jobs                      # Job search
/talent/jobs/:id                  # Job details
/talent/jobs/:id/apply            # Apply to job
/talent/alerts                    # Job alerts management

/employer                         # Employers landing page
/employer/dashboard               # Employer dashboard
/employer/jobs                    # Job postings list
/employer/jobs/new                # Create job posting
/employer/jobs/:id/edit           # Edit job posting
/employer/jobs/:id/applications   # View applications
/employer/candidates              # Candidate search
/employer/candidates/:id          # Candidate profile
/employer/talent-pool             # Saved candidates
/employer/interviews              # Interview schedule
/employer/company                 # Company profile editor

/cv/:slug                         # Public CV view
/company/:slug                    # Public company profile
/job/:slug                        # Public job posting

/search                           # Universal search page
/search/jobs                      # Job search results
/search/services                  # Service search results
/search/products                  # Product search results
/search/talent                    # Talent search results
```

---

## User Roles Expansion

### Current Roles
- **User** (service provider)
- **Admin**

### New Roles
- **Service Provider** (existing "user" - proposals, services)
- **Product Seller** (products, e-commerce)
- **Job Seeker** (CVs, applications, portfolio)
- **Employer** (job postings, recruitment, ATS)
- **Buyer** (purchase products, hire services)
- **Admin**
- **Super Admin**

### Role Combinations
Users can have multiple roles simultaneously:
- A freelancer can be both a **Service Provider** AND a **Job Seeker**
- A company can be both an **Employer** AND a **Buyer**
- An individual can be a **Seller**, **Service Provider**, AND **Job Seeker**

---

## UI/UX Considerations

### Homepage Redesign
The homepage should guide users to their relevant portal:

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEBPROPOSTAS                                 │
│          "Connect Supply with Demand"                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   What would you like to do today?                              │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│   │   SELL      │  │   OFFER     │  │   FIND      │           │
│   │  Products   │  │  Services   │  │   A Job     │           │
│   └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│   │    BUY      │  │    HIRE     │  │  RECRUIT    │           │
│   │  Products   │  │  Services   │  │   Talent    │           │
│   └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                 │
│   [Universal Search Bar: "Search products, services, jobs..."] │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Navigation Structure
```
Main Navigation:
├── Marketplace
│   ├── Products
│   ├── Services
│   └── Jobs
├── For Providers
│   ├── Dashboard
│   ├── My Proposals
│   ├── My Products
│   └── My Services
├── For Job Seekers
│   ├── My CVs
│   ├── My Applications
│   ├── Job Search
│   └── Portfolio
├── For Employers
│   ├── Post a Job
│   ├── My Job Postings
│   ├── Candidates
│   └── Company Profile
└── For Buyers
    ├── My Orders
    ├── My Projects
    └── Saved Items
```

---

## Timeline Summary

| Phase | Description | Duration | Cumulative |
|-------|-------------|----------|------------|
| 32 | Foundation & Architecture | 2 weeks | 2 weeks |
| 33 | CV/Resume Builder | 3 weeks | 5 weeks |
| 34 | Job Seeker Portal | 3 weeks | 8 weeks |
| 35 | Employer Portal - Job Posting | 2 weeks | 10 weeks |
| 36 | Employer Portal - ATS & Recruitment | 3 weeks | 13 weeks |
| 37 | Unified Search Engine | 2 weeks | 15 weeks |
| 38 | Integration & Polish | 2 weeks | 17 weeks |

**Total Estimated Time: 17 weeks (~4 months)**

---

## Success Metrics

### Job Seeker Metrics
- Number of CVs created
- Number of job applications
- Application-to-interview rate
- Job placement rate

### Employer Metrics
- Number of job postings
- Time-to-hire
- Candidate quality score
- Employer satisfaction

### Platform Metrics
- Cross-portal engagement (users using multiple portals)
- Search-to-action conversion rate
- Overall marketplace transactions
- User retention rate

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Scope creep | High | High | Strict phase boundaries, MVP approach |
| Performance with larger dataset | Medium | Medium | Elasticsearch, caching, pagination |
| Competition from established platforms | High | High | Focus on integration, unique value prop |
| User adoption of new features | Medium | Medium | Gradual rollout, user feedback loops |
| Technical complexity | Medium | Medium | Leverage existing infrastructure |

---

## Competitive Advantages

### Why WebPropostas for Jobs?

1. **Unified Platform**: Users already trust WebPropostas for business transactions
2. **Rich CV Builder**: Same powerful Template Builder for stunning CVs
3. **AI Integration**: GPT-4 for CV writing, job descriptions, matching
4. **Brazilian Market Focus**: LGPD compliant, BRL currency, Portuguese-first
5. **Cross-Selling**: Freelancers can both offer services AND seek employment
6. **Integrated Payments**: Already have financial infrastructure

### Unique Value Proposition
> "The only platform where you can sell products, offer services, find clients, seek employment, and recruit talent - all in one place."

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Prioritize features** for MVP
3. **Begin Phase 32** (Foundation & Architecture)
4. **Set up tracking** for new metrics

---

**Document Status:** READY FOR REVIEW
**Prepared By:** MAESTRO Multi-Agent Orchestrator
**Date:** November 22, 2025
**Next Action:** Await user approval to begin Phase 32 implementation
