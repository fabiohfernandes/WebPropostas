# AI Proposal Builder - Backend Setup Complete ✅

**Status:** Semana 1 - Backend Completo
**Data:** Outubro 2025
**Branch:** `feature/v2-ai-proposal-builder`

---

## 📋 O Que Foi Implementado

### 1. Database Migration ✅
**Arquivo:** `services/database/migrations/004_ai_proposal_builder.sql`

**3 Novas Tabelas:**
- `ai_proposal_sessions` - Rastreia jobs de geração com status e progresso
- `ai_proposal_chat` - Histórico de conversação usuário ↔ IA
- `ai_proposal_versions` - Versionamento para undo/redo

**Extensões:**
- `proposals` - Flag `generated_by_ai`, referência `ai_session_id`
- `users` - Tracking de tokens consumidos (`ai_tokens_used_lifetime`, `ai_tokens_used_this_month`)

**Funções Helper:**
- `get_next_version_number(proposal_id)` - Auto-incrementa versões
- Trigger automático para atualizar `updated_at`

---

### 2. OpenAI Service ✅
**Arquivo:** `services/api/src/services/AIProposalGenerator.js`

**Features:**
- ✅ Integração OpenAI SDK (GPT-4o + GPT-o1)
- ✅ System prompt profissional (12 seções padrão)
- ✅ Streaming com callbacks de progresso
- ✅ Parser Markdown → JSON estruturado
- ✅ Extração de metadados (fontes, estatísticas, tabelas)
- ✅ Chat para refinamento de seções
- ✅ Estimativa de tokens consumidos

**Métodos Principais:**
```javascript
aiGenerator.generate(params, sessionId, onProgress)
aiGenerator.chat(proposalMarkdown, userMessage, context)
```

---

### 3. API Endpoints ✅
**Arquivo:** `services/api/src/routes/ai-proposals.js`

**5 Endpoints Implementados:**

#### `POST /api/v1/ai/proposals/generate`
Inicia geração de proposta com IA

**Request Body:**
```json
{
  "clientInfo": {
    "companyName": "Imobiliária Silva",
    "contactName": "João Silva",
    "email": "joao@silva.com.br",
    "phone": "(48) 99999-9999",
    "sector": "Imobiliário - Venda"
  },
  "proposalType": "venda-imovel",
  "projectContext": "Apartamento 3 quartos, 120m², frente mar...",
  "settings": {
    "tone": "profissional",
    "detail": "completo",
    "includeMarketResearch": true,
    "aiModel": "gpt-4o"
  }
}
```

**Response:**
```json
{
  "sessionId": "uuid-here",
  "status": "processing",
  "estimatedTime": 60
}
```

---

#### `GET /api/v1/ai/proposals/generate/:sessionId/status`
Verifica progresso da geração (polling a cada 2s)

**Response (Processing):**
```json
{
  "status": "processing",
  "progress": {
    "currentStep": 3,
    "totalSteps": 6,
    "stepName": "Gerando: Modelo de Precificação",
    "elapsedTime": 35
  }
}
```

**Response (Completed):**
```json
{
  "status": "completed",
  "progress": { ... },
  "result": {
    "proposalId": "uuid",
    "markdown": "# Proposta Comercial\n\n...",
    "sections": [
      {
        "id": "section-1",
        "number": 1,
        "title": "Resumo Executivo",
        "content": "..."
      }
    ],
    "metadata": {
      "aiModel": "gpt-4o",
      "tokensUsed": 12500,
      "generationTime": 58000,
      "sourcesUsed": ["CBIC (2024)", "Secovi (2025)"]
    }
  }
}
```

---

#### `POST /api/v1/ai/proposals/:proposalId/chat`
Chat com IA para refinar proposta

**Request Body:**
```json
{
  "message": "Detalhe mais a seção de preços",
  "context": {
    "currentSection": "section-5",
    "selectedText": "Preço sob consulta"
  }
}
```

**Response:**
```json
{
  "message": "Entendi! Vou detalhar...",
  "updatedSections": [
    {
      "number": 5,
      "title": "Modelo de Precificação",
      "content": "## 5. Modelo de Precificação\n\n..."
    }
  ],
  "tokensUsed": 850
}
```

---

#### `GET /api/v1/ai/proposals/:proposalId/versions`
Lista histórico de versões

**Response:**
```json
{
  "versions": [
    {
      "id": "uuid",
      "version_number": 3,
      "change_description": "AI chat: Detalhe mais a seção de preços",
      "changed_via_ai": true,
      "created_at": "2025-10-02T14:35:00Z"
    },
    { ... }
  ]
}
```

---

#### `POST /api/v1/ai/proposals/:proposalId/publish`
Publica proposta e envia email (opcional)

**Request Body:**
```json
{
  "sendEmail": {
    "to": "cliente@empresa.com.br",
    "subject": "Proposta Comercial - Projeto XYZ",
    "message": "Segue proposta..."
  }
}
```

**Response:**
```json
{
  "publicUrl": "https://webpropostas.com.br/proposal/uuid",
  "pdfUrl": "https://webpropostas.com.br/proposal/uuid/pdf",
  "emailSent": true
}
```

---

### 4. Integração no Index.js ✅

**Mudanças:**
```javascript
// Import
const aiProposalsRouter = require('./routes/ai-proposals');

// Registro da rota (com middleware authenticate)
app.use('/api/v1/ai/proposals', authenticate, aiProposalsRouter);
```

---

## 🚀 Como Rodar Localmente

### Passo 1: Instalar Dependências OpenAI

```bash
cd services/api
npm install openai dotenv
```

### Passo 2: Configurar .env

Adicionar em `services/api/.env`:

```bash
# OpenAI API
OPENAI_API_KEY=sk-proj-your-key-here

# Estimativa de custos GPT-4o:
# Input: $0.005/1K tokens
# Output: $0.015/1K tokens
# Proposta média: ~12K tokens = R$ 0,50-0,80
```

### Passo 3: Rodar Migration do Banco

```bash
cd services/database

# Local development (Docker)
docker exec -i webpropostas-postgres psql -U webpropostas_user -d webpropostas < migrations/004_ai_proposal_builder.sql

# Ou via CLI direto
psql postgresql://webpropostas_user:password@localhost:5432/webpropostas -f migrations/004_ai_proposal_builder.sql
```

**Verificar se tabelas foram criadas:**
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_name LIKE 'ai_%';

-- Deve retornar:
-- ai_proposal_sessions
-- ai_proposal_chat
-- ai_proposal_versions
```

### Passo 4: Iniciar Backend

```bash
cd services/api
npm run dev

# Ou com Docker Compose
cd ../../
docker-compose up api --build
```

**Backend deve iniciar na porta 3000:**
```
🚀 Server running on http://localhost:3000
✅ Database connected
✅ AI Proposals routes loaded
```

---

## 🧪 Como Testar

### Teste 1: Gerar Proposta com IA

**1. Fazer login para obter token:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@webpropostas.com.br",
    "password": "admin123"
  }'
```

**Copiar o `token` da resposta.**

**2. Iniciar geração:**
```bash
curl -X POST http://localhost:3000/api/v1/ai/proposals/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "clientInfo": {
      "companyName": "Imobiliária Teste",
      "contactName": "João da Silva",
      "email": "joao@teste.com.br",
      "phone": "(48) 99999-9999",
      "sector": "Imobiliário - Venda de Imóveis"
    },
    "proposalType": "venda-imovel",
    "projectContext": "Estou propondo a venda de um apartamento de 3 quartos no Centro de Florianópolis, com 120m², 2 vagas de garagem, frente mar. O cliente é investidor e quer alugar. Imóvel reformado em 2024. Preço: R$ 850.000.",
    "settings": {
      "tone": "profissional",
      "detail": "completo",
      "includeMarketResearch": false,
      "aiModel": "gpt-4o"
    }
  }'
```

**Resposta esperada:**
```json
{
  "sessionId": "abc123...",
  "status": "processing",
  "estimatedTime": 60
}
```

**3. Verificar progresso (polling):**
```bash
curl -X GET http://localhost:3000/api/v1/ai/proposals/generate/SESSION_ID_AQUI/status \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Executar a cada 2-3 segundos até `status: "completed"`.**

**Resposta final:**
```json
{
  "status": "completed",
  "result": {
    "proposalId": "xyz789...",
    "markdown": "# Proposta Comercial\n\n## 1. Resumo Executivo...",
    "sections": [...],
    "metadata": {
      "tokensUsed": 12340,
      "generationTime": 58200
    }
  }
}
```

---

### Teste 2: Chat para Ajustes

```bash
curl -X POST http://localhost:3000/api/v1/ai/proposals/PROPOSAL_ID_AQUI/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "message": "Detalhe mais a seção de preços com tabela itemizada",
    "context": {
      "currentSection": "section-5"
    }
  }'
```

**Resposta:**
```json
{
  "message": "✅ Atualizei a seção...",
  "updatedSections": [{ ... }],
  "tokensUsed": 650
}
```

---

### Teste 3: Listar Versões

```bash
curl -X GET http://localhost:3000/api/v1/ai/proposals/PROPOSAL_ID/versions \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

### Teste 4: Publicar Proposta

```bash
curl -X POST http://localhost:3000/api/v1/ai/proposals/PROPOSAL_ID/publish \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "sendEmail": {
      "to": "cliente@empresa.com.br",
      "subject": "Proposta Comercial",
      "message": "Segue proposta anexa"
    }
  }'
```

---

## 📊 Monitoramento de Custos

**Verificar tokens consumidos por usuário:**
```sql
SELECT
  u.name,
  u.email,
  u.ai_tokens_used_lifetime,
  u.ai_tokens_used_this_month,
  u.ai_tokens_reset_date
FROM users u
WHERE u.ai_tokens_used_lifetime > 0
ORDER BY u.ai_tokens_used_lifetime DESC;
```

**Verificar sessões de geração:**
```sql
SELECT
  s.id,
  s.status,
  s.ai_model,
  s.tokens_used,
  s.generation_time_ms,
  s.started_at,
  s.completed_at,
  u.name as user_name
FROM ai_proposal_sessions s
JOIN users u ON u.id = s.user_id
ORDER BY s.started_at DESC
LIMIT 20;
```

**Custo estimado:**
```sql
SELECT
  ai_model,
  COUNT(*) as total_generations,
  SUM(tokens_used) as total_tokens,
  ROUND(SUM(tokens_used) * 0.00003, 2) as estimated_cost_brl
FROM ai_proposal_sessions
WHERE status = 'completed'
GROUP BY ai_model;
```

---

## ⚠️ Troubleshooting

### Erro: "OPENAI_API_KEY not set"

**Solução:**
```bash
# Adicionar no .env
echo "OPENAI_API_KEY=sk-proj-..." >> services/api/.env

# Reiniciar servidor
npm run dev
```

---

### Erro: "Table ai_proposal_sessions does not exist"

**Solução:**
```bash
# Rodar migration
cd services/database
psql $DATABASE_URL -f migrations/004_ai_proposal_builder.sql
```

---

### Erro: "Request timeout after 2 minutes"

**Causa:** GPT-o1 pode levar mais de 90 segundos.

**Solução:**
```javascript
// Aumentar timeout do Express (index.js)
app.use((req, res, next) => {
  req.setTimeout(180000); // 3 minutos
  next();
});
```

---

### Geração muito lenta (>2 minutos)

**Diagnóstico:**
1. Verificar qual modelo está sendo usado (`gpt-4o` vs `gpt-o1`)
2. Checar logs da OpenAI API
3. Verificar conexão de internet

**Otimizações:**
- Usar `gpt-4o` (3x mais rápido que `gpt-o1`)
- Desabilitar `includeMarketResearch` (economiza 10-15s)
- Reduzir `detail` para `executivo` (menos conteúdo)

---

## 📈 Próximos Passos

### Semana 2: Frontend Wizard
- [ ] Criar página `/ai-builder`
- [ ] Wizard de 4 passos (formulários)
- [ ] Loading screen com progresso
- [ ] Editor split-view com preview

### Semana 3: Pesquisa Web + Publicação
- [ ] Integrar Tavily/SerpAPI para dados de mercado
- [ ] Geração de PDF com Puppeteer
- [ ] Email automático ao publicar
- [ ] Analytics de uso da IA

---

## ✅ Checklist de Validação

Antes de considerar Semana 1 completa:

- [x] Migration criada e documentada
- [x] Tabelas no banco de dados funcionando
- [x] OpenAI SDK integrado
- [x] 5 endpoints API implementados
- [x] Rotas registradas no index.js
- [x] Teste manual via cURL funcionando
- [ ] **Teste E2E:** Gerar proposta completa de ponta a ponta
- [ ] **Code review:** ORION + NEURA revisam código
- [ ] **Deploy staging:** Testar em ambiente Railway

---

**Status Atual:** Backend 90% Completo ✅
**Bloqueadores:** Nenhum
**Pronto para:** Frontend Development (Semana 2)

**Autor:** MAESTRO + ORION + NEURA
**Data:** Outubro 2025
