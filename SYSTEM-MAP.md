# WebPropostas System Map
**Quick Reference - Read This First When Lost**

> **📝 LIVING DOCUMENT**: This file is continuously updated whenever new system components,
> configurations, or important patterns are created. Always check here first before searching
> the codebase to avoid wasting tokens.

## 🗄️ DATABASE CONFIGURATION

### Active Databases
- **Database Name**: `webpropostas` ⚠️ **THIS IS THE ACTIVE DATABASE**
- **Old Database**: `orcamentos` (deprecated, ignore this)
- **Container**: `webpropostas-postgres`
- **User**: `webpropostas_user`
- **Password**: `dev_postgres_password_123` (development)
- **Port**: `5432`
- **Host**: `postgres` (inside Docker) or `localhost` (from host machine)

### Connection Strings
```bash
# From host machine
postgresql://webpropostas_user:dev_postgres_password_123@localhost:5432/webpropostas

# From Docker containers (API uses this)
postgresql://webpropostas_user:dev_postgres_password_123@postgres:5432/webpropostas
```

### Database Access Commands
```bash
# Connect to database via Docker
docker exec -it webpropostas-postgres psql -U webpropostas_user -d webpropostas

# Quick query
docker exec webpropostas-postgres psql -U webpropostas_user -d webpropostas -c "SELECT COUNT(*) FROM proposal_templates;"

# List all tables
docker exec webpropostas-postgres psql -U webpropostas_user -d webpropostas -c "\dt"
```

## 🐳 DOCKER CONTAINERS

### Container Names & Services
```
webpropostas-frontend    → Frontend (Next.js) - Port 3001
webpropostas-api         → Backend API (Express) - Port 3000
webpropostas-postgres    → PostgreSQL Database - Port 5432
webpropostas-redis       → Redis Cache - Port 6379
```

### Container Commands
```bash
# Restart a service
docker restart webpropostas-api
docker restart webpropostas-frontend

# View logs
docker logs -f webpropostas-api
docker logs -f webpropostas-frontend

# Execute commands inside container
docker exec webpropostas-api env | grep DATABASE
docker exec webpropostas-postgres psql -U webpropostas_user -d webpropostas -c "\dt"

# Stop all
docker-compose down

# Start all
docker-compose up -d
```

## 📂 DATA STORAGE LOCATIONS

### Templates
**⚠️ CRITICAL: Templates are stored in DATABASE, NOT JSON file**

- **Primary Storage**: PostgreSQL table `proposal_templates` in `webpropostas` database
- **JSON File**: `services/api/src/data/proposal-templates.json` (DEPRECATED - only used for seeding)
- **Seeding Script**: `services/api/src/scripts/seed-templates.js`

### How Templates Work
1. **JSON file** → Only used by seed script to populate database
2. **Database table** → Actual source of truth for templates
3. **API endpoint** → Reads from database, NOT from JSON file
4. **Frontend** → Fetches from API endpoint `/api/v1/templates`

### To Clear Templates
```bash
# Wrong way (this does nothing)
# Editing the JSON file - API doesn't read from it

# Right way - Clear database
docker exec webpropostas-postgres psql -U webpropostas_user -d webpropostas -c "DELETE FROM proposal_templates;"
```

### Proposals
- **Storage**: PostgreSQL table `proposals` in `webpropostas` database
- **API Route**: `/api/v1/proposals`
- **Model**: `services/api/src/models/Proposal.js`

### Clients
- **Storage**: PostgreSQL table `clients` in `webpropostas` database
- **API Route**: `/api/v1/clients`
- **Model**: `services/api/src/models/Client.js`

### Users
- **Storage**: PostgreSQL table `users` in `webpropostas` database
- **API Route**: `/api/v1/auth`
- **Authentication**: JWT tokens (access + refresh)

## 🌐 API ARCHITECTURE

### Base URL
- **Development**: `http://localhost:3000`
- **API Version**: `/api/v1`

### Key Endpoints

#### Templates
```
GET    /api/v1/templates          → List all templates (from DATABASE)
GET    /api/v1/templates/:id      → Get single template (from DATABASE)
GET    /api/v1/templates/categories → Get categories (from DATABASE)
GET    /api/v1/templates/sectors  → Get sectors (from DATABASE)
POST   /api/v1/templates/:id/use  → Create proposal from template
```

#### Proposals
```
GET    /api/v1/proposals          → List proposals
POST   /api/v1/proposals          → Create proposal
GET    /api/v1/proposals/:id      → Get proposal
PUT    /api/v1/proposals/:id      → Update proposal
DELETE /api/v1/proposals/:id      → Delete proposal
```

#### Authentication
```
POST   /api/v1/auth/register      → Register user
POST   /api/v1/auth/login         → Login user
POST   /api/v1/auth/refresh       → Refresh token
POST   /api/v1/auth/logout        → Logout user
```

### API Routes Files
- **Templates**: `services/api/src/routes/templates.js`
- **Proposals**: `services/api/src/routes/proposal-platform.js`
- **Auth**: `services/api/src/routes/client-auth.js`
- **AI Proposals**: `services/api/src/routes/ai-proposals.js`

### Database Connection in API
```javascript
// API uses this environment variable
process.env.DATABASE_URL = "postgresql://webpropostas_user:dev_postgres_password_123@postgres:5432/webpropostas"

// Connection is in:
// - services/api/src/models/database.js (main pool)
// - services/api/src/routes/templates.js (creates own pool)
```

## 🎨 FRONTEND ARCHITECTURE

### Frontend URLs
- **Development**: `http://localhost:3001`
- **Templates Page**: `http://localhost:3001/templates`
- **Dashboard**: `http://localhost:3001/dashboard`

### How Frontend Fetches Data

#### Templates Flow
1. User visits `/templates` page
2. Page component: `services/frontend/src/app/templates/page.tsx`
3. Calls API: `api.get('/templates')` via `services/frontend/src/lib/api.ts`
4. API calls: `http://localhost:3000/api/v1/templates`
5. API queries: PostgreSQL `proposal_templates` table in `webpropostas` database
6. Returns JSON to frontend
7. Frontend renders templates

#### API Client Configuration
```javascript
// File: services/frontend/src/lib/api.ts
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'
});
```

### Environment Variables

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:3000
```

#### Backend (.env)
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://webpropostas_user:dev_postgres_password_123@postgres:5432/webpropostas
REDIS_URL=redis://redis:6379
JWT_SECRET=your-jwt-secret-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
CORS_ORIGIN=http://localhost:3001
```

## 🔄 DATA FLOW DIAGRAMS

### Template CRUD Flow
```
Frontend (templates/page.tsx)
    ↓ HTTP GET /api/v1/templates
API (routes/templates.js)
    ↓ SQL Query
PostgreSQL (webpropostas.proposal_templates)
    ↓ JSON Response
Frontend (renders templates)
```

### Proposal Creation Flow
```
Frontend (dashboard)
    ↓ HTTP POST /api/v1/proposals
API (routes/proposal-platform.js)
    ↓ Validation & SQL INSERT
PostgreSQL (webpropostas.proposals)
    ↓ JSON Response
Frontend (updates UI)
```

## 🔍 TROUBLESHOOTING CHECKLIST

### "Templates not showing / wrong count"
1. ✅ Check correct database: `webpropostas` (NOT `orcamentos`)
2. ✅ Query actual table: `docker exec webpropostas-postgres psql -U webpropostas_user -d webpropostas -c "SELECT COUNT(*) FROM proposal_templates;"`
3. ✅ Ignore JSON file - it's not used by API
4. ✅ Check API is running: `docker ps | grep api`
5. ✅ Check API logs: `docker logs webpropostas-api`
6. ✅ Clear browser cache: Ctrl+Shift+R or Cmd+Shift+R

### "Database connection errors"
1. ✅ Check container is running: `docker ps | grep postgres`
2. ✅ Check database name is `webpropostas` (NOT `orcamentos`)
3. ✅ Check environment variable: `docker exec webpropostas-api env | grep DATABASE_URL`
4. ✅ Verify connection string includes `/webpropostas` at the end

### "Frontend can't reach API"
1. ✅ Check API is running: `curl http://localhost:3000/api/v1/templates`
2. ✅ Check CORS settings in API
3. ✅ Check frontend env: `NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1`
4. ✅ Check both containers are on same network: `docker network inspect webpropostas-network`

### "Changes not appearing"
1. ✅ Restart containers: `docker restart webpropostas-api webpropostas-frontend`
2. ✅ Clear browser cache: Hard refresh (Ctrl+F5)
3. ✅ Check you're modifying the right database: `webpropostas` (NOT `orcamentos`)

## 📋 QUICK REFERENCE COMMANDS

### Most Used Commands
```bash
# Check database content
docker exec webpropostas-postgres psql -U webpropostas_user -d webpropostas -c "SELECT id, name, category FROM proposal_templates LIMIT 5;"

# Clear all templates
docker exec webpropostas-postgres psql -U webpropostas_user -d webpropostas -c "DELETE FROM proposal_templates;"

# Seed templates from JSON
docker exec webpropostas-api node src/scripts/seed-templates.js

# Restart everything
docker-compose restart

# View API logs
docker logs -f webpropostas-api

# View Frontend logs
docker logs -f webpropostas-frontend

# Test API endpoint
curl http://localhost:3000/api/v1/templates | jq '.data.templates | length'
```

## 🎯 KEY TAKEAWAYS

1. **Templates live in DATABASE (`webpropostas.proposal_templates`), NOT in JSON file**
2. **Database name is `webpropostas`, NOT `orcamentos`**
3. **Container names all start with `webpropostas-`**
4. **API reads from database via `DATABASE_URL` environment variable**
5. **Frontend fetches from API at `http://localhost:3000/api/v1`**
6. **JSON file is only for seeding, not for runtime data**

## 📝 ARCHITECTURE SUMMARY

```
┌─────────────────────────────────────────────────┐
│  FRONTEND (Next.js)                             │
│  http://localhost:3001                          │
│  Container: webpropostas-frontend               │
│                                                 │
│  • Fetches data via HTTP from API               │
│  • Uses axios client (lib/api.ts)               │
│  • NEXT_PUBLIC_API_URL env var                  │
└────────────────┬────────────────────────────────┘
                 │ HTTP Requests
                 ↓
┌─────────────────────────────────────────────────┐
│  BACKEND API (Express)                          │
│  http://localhost:3000                          │
│  Container: webpropostas-api                    │
│                                                 │
│  • Routes in src/routes/                        │
│  • Connects to PostgreSQL via DATABASE_URL      │
│  • Database: webpropostas (NOT orcamentos)      │
└────────────────┬────────────────────────────────┘
                 │ SQL Queries
                 ↓
┌─────────────────────────────────────────────────┐
│  POSTGRESQL DATABASE                            │
│  Port: 5432                                     │
│  Container: webpropostas-postgres               │
│                                                 │
│  • Database: webpropostas                       │
│  • User: webpropostas_user                      │
│  • Tables: proposal_templates, proposals, etc.  │
│  • ⚠️ This is the SOURCE OF TRUTH               │
└─────────────────────────────────────────────────┘
```

---

## 🗺️ VERSION ROADMAP: V1.0 → V8.0+ (2024-2032)

### Master Roadmap Reference

**📄 Complete Document:** [WEBPROPOSTAS-VERSION-ROADMAP.md](WEBPROPOSTAS-VERSION-ROADMAP.md)

**8 Major Versions:**
- **V1.0** Foundation (✅ COMPLETED) - Dec 2024-Sep 2025
- **V2.0** Production Ready (🚧 IN PROGRESS) - Sep-Dec 2025
- **V3.0** Visual Editor & Multi-Tier (🎯 CURRENT) - Oct 2025-Aug 2026
- **V4.0** AI Image Generation (📅 PLANNED) - 2026-2027
- **V5.0** AI Video Creation (📅 PLANNED) - 2027-2028
- **V6.0** Gaussian Splatting & 3D (📅 PLANNED) - 2028-2029
- **V7.0** Metaverse Introduction (🔮 VISIONARY) - 2029-2030
- **V8.0+** Future Expansion (💡 CONCEPT) - 2031+

### Quick Version Summary

**V3.0 - Visual Editor** (NEXT - Oct 2025)
- Gamma/Canva-style template builder
- 3-tier pricing (R$ 0 / R$ 97 / R$ 247)
- Team collaboration (multi-user editing)
- AI content assistance (GPT-4)

**V4.0 - AI Images** (2026-2027)
- Sora, Flux, DALL-E 3, Nano Banana, Midjourney
- Auto-generate images from proposal content

**V5.0 - AI Videos** (2027-2028)
- Runway, Pika, HeyGen, Sora video
- Auto-storyboarding and voiceover

**V6.0 - Gaussian Splatting** (2028-2029)
- Luma AI, Polycam 3D scanning
- Interactive product viewers in browser

**V7.0 - Metaverse** (2029-2030)
- VR/AR immersive proposals
- MetaHuman AI guides
- R$ 997/mês tier

**Full specifications:** [WEBPROPOSTAS-VERSION-ROADMAP.md](WEBPROPOSTAS-VERSION-ROADMAP.md) (80 pages)

---

**Last Updated**: 2025-10-06
**Purpose**: Prevent wasting time searching for basic system information
**Usage**: Read this FIRST when confused about data flow, storage, or connectivity
