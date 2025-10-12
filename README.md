# WebPropostas - AI-Driven Commercial Proposal Platform

An intelligent commercial proposal platform featuring a proprietary visual template builder, AI-powered content generation, and automated contract workflows.

## 🗂️ Repository Structure

```
WebPropostas/
├── .vibecoding/              # Project documentation and AI agent definitions
│   ├── Informations/         # Product requirements, roadmap, planning
│   ├── Procedures/           # Best practices, deployment procedures
│   ├── Prompt/               # System prompts and guardrails
│   ├── References/           # Design references and resources
│   ├── Team/                 # Multi-agent specialist definitions
│   └── Troubleshooting/      # Bug solving protocols
│
├── services/                 # Microservices architecture
│   ├── frontend/             # Next.js 14 frontend with template builder
│   ├── api/                  # Node.js/Express backend API
│   └── database/             # PostgreSQL schema and migrations
│
├── assets/                   # Static assets
│   ├── logos/                # Brand logos and graphics
│   └── favicons/             # Favicon assets
│
├── docs/                     # Documentation
│   └── legacy/               # Archived/historical documentation
│
├── scripts/                  # Utility scripts
│   ├── archive/              # One-time development scripts (archived)
│   └── deployment/           # Deployment and infrastructure scripts
│
├── CLAUDE.md                 # 🔴 Main instructions for Claude Code
├── DEVELOPMENT.md            # Current development status and progress
├── SYSTEM-MAP.md             # System architecture and data flow
│
├── docker-compose.yml        # Docker orchestration (development)
├── docker-compose.dev.yml    # Development environment configuration
├── docker-compose.prod.yml   # Production environment configuration
│
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment variables template
├── railway.env.example       # Railway deployment environment template
│
├── package.json              # Root package.json (if needed)
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- PostgreSQL 15+ (or use Docker)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WebPropostas
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start all services with Docker**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3001
   - API: http://localhost:3000
   - Adminer (DB): http://localhost:8080
   - Redis Commander: http://localhost:8081

### Local Development (without Docker)

See individual service READMEs:
- [Frontend Development](services/frontend/README.md)
- [API Development](services/api/README.md)

## 📚 Documentation

### Essential Reading
1. **[CLAUDE.md](CLAUDE.md)** - Project instructions for Claude Code (AI assistant)
2. **[SYSTEM-MAP.md](SYSTEM-MAP.md)** - System architecture overview
3. **[DEVELOPMENT.md](DEVELOPMENT.md)** - Current development status

### Detailed Documentation
- **Product Requirements**: `.vibecoding/Informations/product.md`
- **Implementation Roadmap**: `.vibecoding/Informations/roadmap.md`
- **Template Builder Roadmap**: `.vibecoding/Informations/TEMPLATE-BUILDER-ROADMAP.md`
- **Best Practices**: `.vibecoding/Procedures/Best_practices.md`

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand
- **Backend**: Node.js, Express, JWT Authentication
- **Database**: PostgreSQL 15, Redis 7
- **Infrastructure**: Docker, Railway, AWS (planned)
- **AI/ML**: OpenAI GPT-4, DALL-E 3 (planned)

### Key Features
- ⭐ **Proprietary Visual Template Builder** - Drag-and-drop editor with AI content generation
- 🤖 **AI-Enhanced Editing** - OpenAI GPT-4 integration for text generation
- 🖼️ **AI Image Generation** - DALL-E 3 integration (Professional tier)
- 👥 **Client Collaboration** - Real-time review and approval workflows
- 📄 **Contract Generation** - Automated proposal-to-contract conversion
- 📧 **Multi-Channel Notifications** - Email, WhatsApp, Telegram integration
- 🌐 **Dynamic Hosting** - Automatic subdomain creation with AWS Route 53

## 🔧 Development Workflow

### Docker Commands
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f [service-name]

# Restart a service
docker-compose restart [service-name]

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### Database Access
```bash
# Access PostgreSQL CLI
docker exec -it webpropostas-postgres psql -U webpropostas_user -d webpropostas

# Access Redis CLI
docker exec -it webpropostas-redis redis-cli
```

## 🤖 Multi-Agent Development

This project uses "Vibe Coding" methodology with multiple AI specialist agents coordinated by MAESTRO. See `.vibecoding/Team/` for agent definitions.

### Key Agents
- **MAESTRO**: Central orchestrator
- **AURELIA**: Design System & UI Specialist
- **NOVA**: Frontend Development Specialist
- **ORION**: Full-Stack Development Specialist
- **CASSANDRA**: Database Engineer Specialist
- **RAILWAY CONDUCTOR**: Railway Deployment Specialist
- **TESTER**: Autonomous Stress Testing Specialist

## 📦 Deployment

### Railway Deployment
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Deploy: See `.vibecoding/Procedures/Railway_*.md` for detailed guides

### Environment Variables
See `.env.example` for required environment variables.

## 🧪 Testing

```bash
# Frontend tests
cd services/frontend
npm test

# Backend tests
cd services/api
npm test

# Integration tests
cd services/api
npm run test:integration
```

## 📄 License

[License information]

## 🤝 Contributing

This project follows the "Vibe Coding" methodology. See `.vibecoding/Procedures/Best_practices.md` for contribution guidelines.

## 📞 Contact

**Domain**: infigital.net
**Location**: Florianópolis - SC - Brazil

---

**Note**: For AI assistants working on this project, always read [CLAUDE.md](CLAUDE.md) first for important instructions and guidelines.
