# 🔑 OpenAI API Key - Guia de Configuração

**Para AI Proposal Builder - Phase 0**

---

## 📍 Onde Configurar a OpenAI API Key

### 1️⃣ Desenvolvimento Local (Docker)

**Arquivo:** `services/api/.env`

**Localização:**
```
d:\OrçamentosOnline\
└── services/
    └── api/
        └── .env  ← AQUI!
```

**Conteúdo (já criado para você):**
```env
# AI Proposal Builder - OpenAI Integration
OPENAI_API_KEY=sk-proj-COLE_SUA_CHAVE_AQUI
```

**⚠️ IMPORTANTE:**
- Este arquivo `.env` **NÃO será commitado** no Git (já está em `.gitignore`)
- É seguro colocar sua chave aqui para desenvolvimento local
- Substitua `sk-proj-COLE_SUA_CHAVE_AQUI` pela sua chave real

---

### 2️⃣ Railway (Produção/Staging)

**Não use arquivo `.env` no Railway!**

Configure a variável de ambiente direto no Dashboard do Railway:

#### Passo a Passo:

1. **Acesse o Railway Dashboard:**
   ```
   https://railway.app/project/[seu-projeto-id]
   ```

2. **Selecione o serviço API:**
   - Clique no card do serviço "API" ou "backend"

3. **Vá em "Variables":**
   - No menu lateral, clique em "Variables"

4. **Adicione a nova variável:**
   - Clique em "+ New Variable"
   - **Variable Name:** `OPENAI_API_KEY`
   - **Value:** `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Clique em "Add"

5. **Redeploy o serviço:**
   - Railway vai fazer redeploy automaticamente
   - OU clique em "Deployments" → "Redeploy"

6. **Verificar logs:**
   ```bash
   railway logs --service=api
   ```
   - Procure por: "OpenAI API initialized" (ou similar)
   - **NÃO deve mostrar:** "OpenAI API key not found"

---

## 🎫 Como Obter sua OpenAI API Key

### Passo 1: Criar Conta OpenAI

1. Acesse: https://platform.openai.com/signup
2. Cadastre-se com email ou Google/Microsoft
3. Confirme seu email

### Passo 2: Adicionar Método de Pagamento

⚠️ **IMPORTANTE:** OpenAI requer cartão de crédito, mesmo para uso pequeno

1. Acesse: https://platform.openai.com/account/billing/overview
2. Clique em "Add payment method"
3. Adicione cartão de crédito válido
4. Configure limite de gastos (recomendado: $5-10 USD para testes)

### Passo 3: Criar API Key

1. Acesse: https://platform.openai.com/api-keys
2. Clique em "+ Create new secret key"
3. **Nome sugerido:** "WebPropostas Development" ou "WebPropostas Production"
4. **Permissions:** Escolha "All" (ou "Read and Write")
5. Clique em "Create secret key"
6. **⚠️ COPIE IMEDIATAMENTE:** Você só verá a chave uma vez!
   ```
   sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
7. Guarde em local seguro (ex: 1Password, LastPass, arquivo criptografado)

### Passo 4: Configurar Limite de Gastos

**Altamente recomendado para evitar surpresas!**

1. Acesse: https://platform.openai.com/account/limits
2. Configure "Monthly budget":
   - **Para testes:** $5 USD (~R$ 25)
   - **Para produção:** $20-50 USD (~R$ 100-250)
3. Configure "Email alerts" para avisos de 50%, 75% e 90% do limite

---

## 💰 Custos Estimados

### GPT-4o (Recomendado para desenvolvimento)
- **Preço:** $2.50/1M tokens input + $10.00/1M tokens output
- **Por proposta:** ~10K-15K tokens total
- **Custo por proposta:** ~$0.10-0.15 USD (~R$ 0.50-0.80)

### GPT-o1 (Reasoning - Mais caro)
- **Preço:** $15.00/1M tokens input + $60.00/1M tokens output
- **Por proposta:** ~10K-15K tokens total
- **Custo por proposta:** ~$0.60-0.80 USD (~R$ 3.00-4.00)

### Budget Recomendado para Testes Week 1:

```
5 propostas GPT-4o:    ~$0.75 USD  (~R$ 4.00)
5 propostas GPT-o1:    ~$3.50 USD  (~R$ 18.00)
Chat adjustments (10): ~$0.50 USD  (~R$ 2.50)
─────────────────────────────────────────────
TOTAL:                 ~$4.75 USD  (~R$ 24.50)
```

**Limite sugerido inicial:** $5 USD (~R$ 25)

---

## ✅ Verificar se Está Funcionando

### Teste 1: Variável Configurada Corretamente

**Local:**
```bash
cd services/api
cat .env | grep OPENAI_API_KEY

# Deve mostrar:
# OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

**Railway:**
```bash
railway variables --service=api | grep OPENAI_API_KEY

# Deve mostrar:
# OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

### Teste 2: API Key Válida

Teste direto com cURL:

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer sk-proj-SUA_CHAVE_AQUI"

# Se válida, retorna lista de modelos:
# {
#   "data": [
#     { "id": "gpt-4o", ... },
#     { "id": "o1-preview", ... }
#   ]
# }

# Se inválida, retorna erro:
# {
#   "error": {
#     "message": "Incorrect API key provided",
#     "type": "invalid_request_error"
#   }
# }
```

### Teste 3: Geração de Proposta

1. Iniciar backend:
   ```bash
   cd services/api
   npm run dev
   ```

2. Fazer request de teste:
   ```bash
   curl -X POST http://localhost:3000/api/v1/ai/proposals/generate \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer SEU_JWT_TOKEN" \
     -d '{
       "clientInfo": {
         "companyName": "Teste Ltda",
         "email": "teste@teste.com",
         "sector": "Tecnologia"
       },
       "proposalType": "servico",
       "projectContext": "Desenvolvimento de sistema web para gestão de propostas",
       "settings": {
         "tone": "profissional",
         "detail": "completo",
         "aiModel": "gpt-4o",
         "includeMarketResearch": false
       }
     }'
   ```

3. **Se funcionar:**
   ```json
   {
     "sessionId": "uuid-xxxx-xxxx-xxxx",
     "status": "processing",
     "estimatedTime": 60
   }
   ```

4. **Se API key estiver errada:**
   ```json
   {
     "error": "OpenAI API error: Incorrect API key provided"
   }
   ```

---

## 🐛 Troubleshooting

### Problema: "OpenAI API key not found"

**Causa:** Variável de ambiente não configurada

**Solução Local:**
```bash
# Verificar se .env existe
ls services/api/.env

# Se não existir, criar:
cp services/api/.env.example services/api/.env

# Editar e adicionar chave:
nano services/api/.env
# ou
code services/api/.env

# Adicionar linha:
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx

# Reiniciar backend:
cd services/api
npm run dev
```

**Solução Railway:**
```bash
# Via CLI:
railway variables set OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx --service=api

# Via Dashboard:
# 1. Abrir Railway Dashboard
# 2. Service API → Variables
# 3. + New Variable
# 4. Name: OPENAI_API_KEY
# 5. Value: sk-proj-xxxxxxxxxxxxx
# 6. Add
```

### Problema: "Incorrect API key provided"

**Causa:** Chave inválida ou expirada

**Solução:**
1. Acessar: https://platform.openai.com/api-keys
2. Verificar se a chave ainda está ativa
3. Se necessário, criar nova chave
4. Atualizar .env (local) ou Railway Variables (produção)
5. Reiniciar serviço

### Problema: "You exceeded your current quota"

**Causa:** Limite de gastos atingido ou sem método de pagamento

**Solução:**
1. Acessar: https://platform.openai.com/account/billing/overview
2. Verificar se há método de pagamento ativo
3. Verificar se atingiu limite mensal
4. Se necessário, aumentar limite ou adicionar créditos

### Problema: "Rate limit exceeded"

**Causa:** Muitas requisições em pouco tempo (limite: 3-5 req/min no free tier)

**Solução:**
1. Aguardar 1 minuto entre requests
2. Implementar retry logic com exponential backoff (já feito no AIProposalGenerator.js)
3. Considerar upgrade para tier pago ($5/mês = 90 req/min)

---

## 🔒 Segurança - Boas Práticas

### ✅ FAÇA:
- [x] Guarde a API key em `.env` (local) ou Railway Variables (produção)
- [x] Configure `.gitignore` para excluir `.env` do repositório
- [x] Use diferentes chaves para dev, staging, e produção
- [x] Configure limites de gastos no OpenAI Dashboard
- [x] Monitore uso regularmente
- [x] Revogue chaves antigas ao criar novas

### ❌ NÃO FAÇA:
- [ ] **NUNCA** commite `.env` no Git
- [ ] **NUNCA** exponha a chave no frontend (NEXT_PUBLIC_*)
- [ ] **NUNCA** compartilhe a chave em Slack, email, ou chats
- [ ] **NUNCA** faça hardcode da chave no código
- [ ] **NUNCA** use a mesma chave para dev e produção

---

## 📊 Monitoramento de Uso

### OpenAI Dashboard:
https://platform.openai.com/account/usage

**Métricas disponíveis:**
- Requests por dia
- Tokens consumidos (input + output)
- Custos acumulados
- Modelos mais usados

**Recomendação:**
- Verificar diariamente durante testes
- Configurar alertas de email em 50%, 75% e 90% do budget

### Logs do Backend:

**Local:**
```bash
cd services/api
npm run dev

# Procurar por logs do AIProposalGenerator:
# "Starting proposal generation with GPT-4o..."
# "Generation completed in 45.3s"
# "Tokens used: 12,543 (estimated cost: $0.12)"
```

**Railway:**
```bash
railway logs --service=api --tail

# Filtrar por OpenAI:
railway logs --service=api | grep -i openai
```

---

## 📝 Checklist de Configuração

### Para Desenvolvimento Local:
- [ ] Criar conta OpenAI
- [ ] Adicionar método de pagamento
- [ ] Criar API key (nome: "WebPropostas Development")
- [ ] Configurar limite de gastos ($5 USD)
- [ ] Copiar API key
- [ ] Editar `services/api/.env`
- [ ] Adicionar linha: `OPENAI_API_KEY=sk-proj-xxxxx`
- [ ] Reiniciar backend: `cd services/api && npm run dev`
- [ ] Testar geração de proposta
- [ ] Verificar logs: sem erros
- [ ] Monitorar uso no OpenAI Dashboard

### Para Railway (Produção/Staging):
- [ ] Criar API key separada (nome: "WebPropostas Production")
- [ ] Configurar limite de gastos ($20-50 USD)
- [ ] Acessar Railway Dashboard
- [ ] Service API → Variables
- [ ] + New Variable: `OPENAI_API_KEY=sk-proj-xxxxx`
- [ ] Aguardar redeploy automático
- [ ] Verificar logs: `railway logs --service=api`
- [ ] Testar geração de proposta em staging
- [ ] Monitorar custos diariamente

---

## 🎯 Próximos Passos

Após configurar a OpenAI API key:

1. **Testar localmente:**
   ```bash
   cd services/frontend && npm run dev
   # Abrir: http://localhost:3001/ai-builder
   # Gerar proposta de teste
   ```

2. **Deploy no Railway** (Week 2):
   - Seguir guia em `WEEK1-NEXT-STEPS.md`
   - Seção "Deploy no Railway (Staging)"

3. **Beta Testing:**
   - 5 propostas de teste (diferentes tipos)
   - Medir tempos e custos
   - Coletar feedback

---

## 📞 Suporte

**Dúvidas sobre OpenAI:**
- Documentação: https://platform.openai.com/docs
- Status: https://status.openai.com
- Support: https://help.openai.com

**Dúvidas sobre WebPropostas:**
- Consultar: `AI-PROPOSAL-BUILDER-BACKEND-SETUP.md`
- Troubleshooting: Seção específica neste documento
- Issues: Criar issue no repositório com tag `openai-config`

---

**✅ Arquivo `.env` já foi criado para você em: `services/api/.env`**

**🔑 Próximo passo:**
1. Obter OpenAI API key em https://platform.openai.com/api-keys
2. Editar `services/api/.env` e colar sua chave
3. Reiniciar backend e testar!

✓ guardrails-ok
