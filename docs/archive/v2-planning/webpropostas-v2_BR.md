# WebPropostas V2 - Documento de Requisitos do Produto (PRD)

**Versão:** 2.0.0
**Data:** Outubro de 2025
**Status:** Planejamento & Desenvolvimento
**Branch:** `feature/webpropostas-v2`
**Autor:** Equipe de Produto & MAESTRO AI Orchestrator

---

## Resumo Executivo

O WebPropostas V2 representa uma grande evolução da plataforma, transformando-a de uma simples ferramenta de gestão de propostas em uma plataforma abrangente de criação e monetização de propostas com inteligência artificial. Esta versão introduz três capacidades principais:

1. **Designer Visual de Templates** - Editor estilo Canva com drag-and-drop para criar e salvar templates reutilizáveis
2. **Modelo de Assinatura em Camadas** - Planos Freemium, Standard e Premium com controle de recursos
3. **Marketplace de Tokens de IA** - Sistema baseado em créditos para geração de texto com IA e recarga

### Visão Central

Democratizar a criação profissional de propostas para profissionais liberais, pequenas empresas e empreendedores que não possuem expertise em design ou redação. Permitir que qualquer pessoa crie propostas bonitas, persuasivas e consistentes com a marca através de ferramentas visuais intuitivas e assistência de IA.

---

## Índice

1. [Objetivos de Negócio](#objetivos-de-negócio)
2. [Usuários-Alvo](#usuários-alvo)
3. [Especificações de Recursos](#especificações-de-recursos)
   - [3.1 Designer Visual de Templates](#31-designer-visual-de-templates)
   - [3.2 Sistema de Assinatura em Camadas](#32-sistema-de-assinatura-em-camadas)
   - [3.3 Marketplace de Tokens de IA](#33-marketplace-de-tokens-de-ia)
4. [Histórias de Usuário & Casos de Uso](#histórias-de-usuário--casos-de-uso)
5. [Arquitetura Técnica](#arquitetura-técnica)
6. [Requisitos de UI/UX](#requisitos-de-uiux)
7. [Requisitos de Integração](#requisitos-de-integração)
8. [Estratégia de Monetização](#estratégia-de-monetização)
9. [Métricas de Sucesso](#métricas-de-sucesso)
10. [Roadmap de Desenvolvimento](#roadmap-de-desenvolvimento)
11. [Avaliação de Riscos](#avaliação-de-riscos)
12. [Apêndice](#apêndice)

---

## 1. Objetivos de Negócio

### Objetivos Principais
- **Geração de Receita:** Estabelecer receita recorrente através de assinaturas em camadas
- **Aquisição de Usuários:** Atrair 10.000+ usuários nos primeiros 6 meses via modelo freemium
- **Diferenciação de Mercado:** Posicionar como o "Canva para Propostas Comerciais"
- **Retenção na Plataforma:** Aumentar retenção através de bibliotecas de templates e investimento em IA

### Critérios de Sucesso
- Taxa de conversão freemium → pago de 15% em 3 meses
- 50+ templates criados por usuário pago (média)
- 80% de satisfação do usuário com o designer de templates
- R$ 50K+ MRR em 6 meses após lançamento do V2

---

## 2. Usuários-Alvo

### Personas Principais

#### 1. **Freelancer Solo Sofia**
- **Perfil:** Designer gráfica, 28 anos, trabalha sozinha
- **Dores:** Tempo limitado para escrever propostas, sem orçamento para designers
- **Necessidades:** Templates rápidos e profissionais; assistência de IA para redação
- **Plano Ideal:** Standard (R$ 79/mês)

#### 2. **Corretor de Imóveis Roberto**
- **Perfil:** Corretor independente, 42 anos, 20 imóveis/mês
- **Dores:** Criação repetitiva de propostas, consistência de marca
- **Necessidades:** Templates específicos por tipo de imóvel (terreno, apartamento, casa, aluguel)
- **Plano Ideal:** Premium (R$ 199/mês)

#### 3. **Dona de Agência Ana**
- **Perfil:** Agência de marketing, 5 funcionários, 100+ propostas/ano
- **Dores:** Colaboração em equipe, padronização de templates
- **Necessidades:** Propostas ilimitadas, branding personalizado, uso alto de IA
- **Plano Ideal:** Premium (R$ 199/mês)

#### 4. **Estudante Empreendedor Lucas**
- **Perfil:** Universitário, startup em fase inicial
- **Dores:** Orçamento zero, necessidades básicas de proposta
- **Necessidades:** Ferramenta gratuita para testar product-market fit
- **Plano Ideal:** Freemium (grátis)

---

## 3. Especificações de Recursos

### 3.1 Designer Visual de Templates

#### Visão Geral
Editor de canvas com drag-and-drop (similar ao Canva/Figma) que permite aos usuários projetar, personalizar e salvar templates reutilizáveis de propostas com geração de conteúdo assistida por IA.

#### Capacidades Principais

##### 3.1.1 Editor de Canvas
- **Canvas Infinito:** Prancheta com scroll e zoom (25%-400%)
- **Grade & Guias:** Snap-to-grid, guias de alinhamento, réguas
- **Visualização Responsiva:** Modos de visualização desktop, tablet, mobile
- **Colaboração em Tempo Real:** Múltiplos usuários editando simultaneamente (somente Premium)

##### 3.1.2 Biblioteca de Elementos de Design

| Tipo de Elemento | Descrição | Freemium | Standard | Premium |
|------------------|-----------|----------|----------|---------|
| **Caixas de Texto** | Editor de texto rico com fontes, tamanhos, cores | ✅ | ✅ | ✅ |
| **Ícones** | 10.000+ ícones vetoriais da biblioteca | ❌ | ✅ | ✅ |
| **Imagens** | Upload de fotos (máx 5MB) | ❌ | ✅ (10/mês) | ✅ (ilimitado) |
| **Vídeos** | Incorporar links YouTube/Vimeo | ❌ | ✅ | ✅ |
| **Formas** | Retângulos, círculos, linhas, setas | ✅ (básico) | ✅ | ✅ |
| **Gráficos** | Gráficos de barras, linha, pizza | ❌ | ❌ | ✅ |
| **Diagramas Inteligentes** | Fluxogramas, linhas do tempo, organogramas | ❌ | ❌ | ✅ |
| **Tabelas** | Tabelas de preços, grades de comparação | ✅ (básico) | ✅ | ✅ |
| **Listas com Marcadores** | Estilos personalizados de marcadores, numeração | ✅ | ✅ | ✅ |

##### 3.1.3 Caixas de Conteúdo com IA

**Conceito:** Containers especiais de texto que usam IA para gerar conteúdo de propostas baseado em inputs do usuário.

**Fluxo de Trabalho:**
1. Usuário adiciona "Caixa de Conteúdo IA" ao canvas
2. Define campos de entrada (nome do produto, preço, recursos, etc.)
3. Clica no botão "Gerar Texto"
4. IA cria conteúdo contextual usando GPT-4
5. Usuário revisa/edita o texto gerado
6. Consome tokens de IA do saldo do usuário

**Tipos de Caixa de Conteúdo:**
- **Caixa de Descrição de Produto**
  - Entradas: Nome do produto, recursos (lista), público-alvo
  - Saída: Descrição convincente de 150-300 palavras

- **Caixa de Justificativa de Preço**
  - Entradas: Preço, condições de pagamento, preços concorrentes
  - Saída: Parágrafo de proposta de valor

- **Caixa de Destaque de Localização** (Imobiliário)
  - Entradas: Endereço, bairro, comodidades
  - Saída: Pontos de venda da localização

- **Caixa de Visão Geral do Serviço**
  - Entradas: Nome do serviço, entregáveis, cronograma
  - Saída: Resumo profissional do serviço

- **Caixa de Resumo Executivo**
  - Entradas: Contexto da proposta, dores do cliente, solução
  - Saída: Resumo executivo pronto para C-level

**Consumo de Tokens de IA:**
- Descrição de Produto: 500 tokens (~R$ 0,01)
- Justificativa de Preço: 300 tokens (~R$ 0,006)
- Destaque de Localização: 400 tokens (~R$ 0,008)
- Visão Geral do Serviço: 450 tokens (~R$ 0,009)
- Resumo Executivo: 800 tokens (~R$ 0,016)

##### 3.1.4 Gestão de Templates

**Salvar Template:**
- Nome do template (obrigatório)
- Tags de categoria/indústria (imobiliário, consultoria, design, etc.)
- Tags de estilo (moderno, corporativo, criativo, minimalista)
- Auto-geração de thumbnail
- Visibilidade pública/privada (somente Premium)

**Biblioteca de Templates:**
- Templates salvos do usuário (filtráveis por categoria/estilo)
- Templates da comunidade (usuários Premium podem publicar)
- Templates pré-construídos (50+ curados pela equipe WebPropostas)

**Uso de Template:**
- Selecionar template da biblioteca
- Auto-popular com dados do cliente/proposta
- IA preenche caixas de conteúdo baseado no contexto da proposta
- Exportar com um clique para proposta voltada ao cliente

**Limitações por Plano:**
| Recurso | Freemium | Standard | Premium |
|---------|----------|----------|---------|
| Salvar Templates | ❌ | ❌ | ✅ |
| Usar Templates Pré-construídos | ✅ (3 apenas) | ✅ (todos) | ✅ (todos) |
| Categorias de Template | ❌ | ✅ | ✅ |
| Templates da Comunidade | ❌ | ✅ (usar apenas) | ✅ (publicar & usar) |
| Compartilhamento de Template | ❌ | ❌ | ✅ |

##### 3.1.5 Assets de Design

**Kit de Marca (Somente Premium):**
- Upload de logo (PNG/SVG)
- Definir cores da marca (primária, secundária, destaque)
- Definir fontes da marca (da biblioteca ou upload)
- Aplicar marca automaticamente em todos os templates

**Assets de Stock:**
- 100.000+ fotos de stock (integração Unsplash/Pexels)
- 50.000+ ilustrações (unDraw, Storyset)
- Pacotes de ícones (Heroicons, Font Awesome, customizados)
- Standard: 10 downloads/mês
- Premium: Downloads ilimitados

##### 3.1.6 Exportação & Publicação

**Formatos de Exportação:**
- PDF (alta resolução, pronto para impressão)
- Link Web Interativo (proposta hospedada)
- PowerPoint (PPTX) - somente Premium
- HTML/CSS (somente Premium)

**Opções de Publicação:**
- Gerar URL único (propostas.com.br/p/[id-único])
- Subdomínio personalizado (Premium: nomedocliente.webpropostas.com.br)
- Incorporar no site (código iframe) - Premium
- Proteção por senha (Standard & Premium)
- Data de expiração (Standard & Premium)

---

### 3.2 Sistema de Assinatura em Camadas

#### Visão Geral
Modelo de monetização de três camadas com diferenciação clara de recursos e caminhos de upgrade.

#### Comparação de Planos

| Recurso | Freemium | Standard | Premium |
|---------|----------|----------|---------|
| **Preço** | Grátis Sempre | R$ 79/mês | R$ 199/mês |
| **Preço Anual** | - | R$ 790/ano (17% desc) | R$ 1.990/ano (17% desc) |
| **Propostas Hospedadas** | 3 ativas | 50 ativas | Ilimitadas |
| **Designer de Templates** | ❌ | ✅ (sem salvar) | ✅ (salvar ilimitado) |
| **Geração de Texto IA** | ❌ | ✅ (10k tokens/mês) | ✅ (50k tokens/mês) |
| **Upload de Logo** | ❌ | ✅ | ✅ |
| **URL do Site na Proposta** | ❌ | ✅ | ✅ |
| **Branding Personalizado** | ❌ | ❌ | ✅ (kit de marca completo) |
| **Fotos de Stock** | ❌ | 10/mês | Ilimitado |
| **Incorporação de Vídeos** | ❌ | ✅ | ✅ |
| **Gráficos & Diagramas** | ❌ | ❌ | ✅ |
| **Exportar para PPTX** | ❌ | ❌ | ✅ |
| **Subdomínio Personalizado** | ❌ | ❌ | ✅ |
| **Dashboard de Análises** | ❌ | Básico | Avançado |
| **Suporte por Email** | ❌ | ✅ | Prioritário ✅ |
| **Colaboração** | ❌ | ❌ | ✅ (3 membros) |
| **Acesso à API** | ❌ | ❌ | ✅ |
| **White-label** | ❌ | ❌ | ✅ |

#### Implementação de Controle de Recursos

**Abordagem Técnica:**
- Middleware verifica o nível de assinatura do usuário antes de permitir acesso aos recursos
- Frontend exibe prompts de upgrade para recursos bloqueados
- Degradação gradual (ex: máx 3 propostas mostra "upgrade" na 4ª tentativa)

**Prompts de Upgrade:**
- Modais in-app com explicações de benefícios
- Indicadores visuais (ícones de cadeado, badges "Premium")
- CTAs contextuais ("Faça upgrade para salvar templates")
- Períodos de teste (7 dias Premium para usuários Standard)

#### Gestão de Assinatura

**Dashboard do Usuário:**
- Exibição do plano atual com medidores de uso
  - Propostas: 2/3 usadas (Freemium)
  - Tokens IA: 4.523/10.000 restantes (Standard)
  - Templates Salvos: 12/ilimitado (Premium)

**Fluxo de Upgrade:**
1. Usuário clica em CTA "Fazer Upgrade"
2. Página de comparação de planos
3. Seleção de método de pagamento (cartão de crédito, PIX, boleto)
4. Confirmação & ativação instantânea
5. Email de boas-vindas com guia dos novos recursos

**Fluxo de Downgrade:**
- Permitido apenas no final do ciclo de cobrança
- Retenção de dados: templates permanecem mas ficam somente leitura
- Período de graça: 30 dias para re-upgrade antes da exclusão

**Cancelamento:**
- Cancelamento self-service (sem atrito)
- Pesquisa de saída (opcional)
- Opção de exportação de dados (PDF de todas as propostas)
- Oferta de reativação (20% desconto por 3 meses)

---

### 3.3 Marketplace de Tokens de IA

#### Visão Geral
Sistema baseado em créditos para geração de texto com IA, com opções flexíveis de recarga para monetizar usuários heavy e prevenir churn.

#### Economia de Tokens

**Preço de Tokens:**
- 1 token ≈ 1 palavra gerada pela IA
- Pacotes base:
  - **Pacote Iniciante:** 5.000 tokens = R$ 15 (R$ 0,003/token)
  - **Pacote Crescimento:** 20.000 tokens = R$ 50 (R$ 0,0025/token) - 17% desconto
  - **Pacote Pro:** 50.000 tokens = R$ 100 (R$ 0,002/token) - 33% desconto
  - **Pacote Empresarial:** 200.000 tokens = R$ 300 (R$ 0,0015/token) - 50% desconto

**Tokens Incluídos (Mensalmente):**
- Freemium: 0 tokens
- Standard: 10.000 tokens (~20 seções geradas por IA)
- Premium: 50.000 tokens (~100 seções geradas por IA)

**Política de Rollover:**
- Tokens incluídos: Use ou perca (reset mensal)
- Tokens comprados: Rollover indefinido, sem expiração

#### Recursos do Marketplace

**Fluxo de Compra:**
1. Usuário está com tokens baixos (< 1.000 restantes)
2. Notificação in-app: "Seus créditos de IA estão acabando"
3. Clique abre o Marketplace de Tokens
4. Selecionar pacote (slider visual para quantidade)
5. Pagamento (instantâneo via Stripe/Mercado Pago)
6. Tokens adicionados imediatamente ao saldo

**Dashboard de Tokens:**
- Exibição de saldo em tempo real (widget no cabeçalho)
- Histórico de uso (lista de gerações de IA com custo em tokens)
- Botão de recarga (sempre acessível)
- Opção de recarga automática (auto-compra quando saldo < limite)

**Gamificação:**
- Badges de conquista (ex: "Usuário Power de IA - 100k tokens usados")
- Bônus de indicação (500 tokens grátis por indicação bem-sucedida)
- Ranking mensal (uso mais criativo de IA ganha 10k tokens)

#### Rastreamento de Uso de IA

**Análises:**
- Tokens consumidos por proposta
- Tipos de caixa de conteúdo IA mais usados
- Custo por proposta (ajuda usuários a otimizar)
- Previsões (ex: "Neste ritmo, você precisará de 15k tokens a mais este mês")

**Alertas:**
- 20% restante: Email de lembrete gentil
- 10% restante: Modal in-app com CTA de recarga
- 0% restante: Bloquear recursos de IA, prompt de upgrade

**Proteção de Excesso:**
- Limite rígido: IA para quando tokens = 0 (sem cobranças surpresa)
- Opção de limite suave (Premium): Auto-compra do próximo nível quando esgotado

---

## 4. Histórias de Usuário & Casos de Uso

### Designer de Templates

**HU-DT-01: Como corretor de imóveis, quero criar um template de listagem de propriedade para poder gerar propostas rapidamente para diferentes imóveis.**
- Critérios de Aceitação:
  - Adicionar caixas de texto, imagens, tabela de preços
  - Salvar template com nome "Listagem de Propriedade - Apartamento"
  - Reutilizar template para 10 apartamentos diferentes
  - Cada um leva < 5 minutos para personalizar

**HU-DT-02: Como consultor freelancer, quero que a IA escreva minhas descrições de serviço para não gastar horas na redação.**
- Critérios de Aceitação:
  - Adicionar caixa de conteúdo IA "Visão Geral do Serviço"
  - Entrada: nome do serviço, entregáveis, cronograma
  - Clicar em "Gerar Texto"
  - Receber descrição profissional de 200 palavras em < 10 segundos
  - Editar/aprovar texto gerado

**HU-DT-03: Como dona de agência, quero aplicar cores e logo da minha marca em todos os templates automaticamente.**
- Critérios de Aceitação:
  - Upload de logo no Kit de Marca (Premium)
  - Definir 3 cores da marca
  - Selecionar "Aplicar Marca" em qualquer template
  - Logo aparece no cabeçalho, cores atualizam em todo o template

### Gestão de Assinatura

**HU-GA-01: Como usuário freemium, quero ver o que estou perdendo para entender o valor do upgrade.**
- Critérios de Aceitação:
  - Recursos bloqueados mostram ícone de "cadeado"
  - Hover exibe nome do recurso + "Faça upgrade para Standard"
  - Clique abre modal de comparação de planos
  - Explicações claras de benefícios (não apenas listas de recursos)

**HU-GA-02: Como usuário Standard se aproximando do limite de 50 propostas, quero ser avisado antes de ser bloqueado.**
- Critérios de Aceitação:
  - Em 40 propostas: Notificação por email
  - Em 48 propostas: Banner in-app "2 propostas restantes"
  - Em 50 propostas: Bloquear criação com CTA de upgrade
  - Opção de deletar propostas antigas para liberar espaço

**HU-GA-03: Como usuário Premium, quero convidar membros da equipe para colaborar em templates.**
- Critérios de Aceitação:
  - Configurações → Equipe → Convidar por email
  - Enviar convite com função (Editor/Visualizador)
  - Membro da equipe cria conta, entra automaticamente no workspace
  - Biblioteca de templates compartilhada, pools de tokens IA separados

### Marketplace de Tokens de IA

**HU-MT-01: Como usuário pesado de IA, quero comprar tokens em volume com desconto.**
- Critérios de Aceitação:
  - Marketplace de Tokens mostra 4 níveis de pacote
  - Slider para selecionar quantidade personalizada (5k - 500k)
  - Preço ajusta dinamicamente (descontos por volume visíveis)
  - Checkout com método de pagamento salvo (compra com 1 clique)

**HU-MT-02: Como usuário que esqueceu de recarregar, quero recarga automática para prevenir interrupção do trabalho.**
- Critérios de Aceitação:
  - Configurações → Recarga Automática → Habilitar
  - Definir limite (ex: "quando saldo < 2.000 tokens")
  - Selecionar pacote para auto-compra
  - Notificação por email em evento de recarga automática

**HU-MT-03: Como usuário consciente do orçamento, quero ver custos de IA antes de gerar texto.**
- Critérios de Aceitação:
  - Caixa de conteúdo IA mostra custo estimado em tokens (ex: "~500 tokens")
  - Tooltip explica: "Isso custará aproximadamente R$ 1,50"
  - Botão de confirmar: "Gerar (500 tokens)"
  - Pós-geração mostra custo real: "Usou 523 tokens"

---

## 5. Arquitetura Técnica

### Componentes do Sistema

#### Arquitetura Frontend

**Stack Tecnológico:**
- **Framework:** Next.js 14 (App Router)
- **Engine de Canvas:** Fabric.js ou Konva.js para drag-and-drop
- **Gestão de Estado:** Zustand + React Query
- **Componentes UI:** Radix UI + Tailwind CSS
- **Editor de Texto Rico:** TipTap ou Slate.js
- **Tempo Real:** Socket.io para colaboração (Premium)

**Módulos Principais:**
```
/app
  /template-designer
    /[templateId]/editor     # Editor de canvas
    /library                 # Galeria de templates
    /new                     # Criar do zero
  /marketplace
    /tokens                  # Compra de tokens IA
    /subscription            # Gestão de planos
  /dashboard
    /analytics               # Rastreamento de uso
    /team                    # Colaboração (Premium)
```

#### Arquitetura Backend

**Endpoints da API:**

**Designer de Templates:**
```
POST   /api/v1/templates                    # Criar template
GET    /api/v1/templates                    # Listar templates do usuário
GET    /api/v1/templates/:id                # Obter detalhes do template
PUT    /api/v1/templates/:id                # Atualizar template
DELETE /api/v1/templates/:id                # Deletar template
POST   /api/v1/templates/:id/duplicate      # Clonar template
GET    /api/v1/templates/community          # Templates públicos (Premium)
POST   /api/v1/templates/:id/publish        # Publicar na comunidade (Premium)
```

**Geração de Conteúdo IA:**
```
POST   /api/v1/ai/generate-text             # Gerar conteúdo
  Body: {
    boxType: "product-description",
    inputs: { name: "...", features: [...] },
    userId: "uuid",
    templateId: "uuid"
  }
  Response: {
    text: "Conteúdo gerado...",
    tokensUsed: 523,
    cost: 0.015,
    remainingBalance: 4477
  }

GET    /api/v1/ai/token-balance              # Verificar saldo de tokens
POST   /api/v1/ai/estimate-cost              # Estimar tokens antes da geração
```

**Assinatura & Cobrança:**
```
GET    /api/v1/subscriptions/plans           # Listar planos disponíveis
POST   /api/v1/subscriptions/subscribe       # Assinar plano
PUT    /api/v1/subscriptions/upgrade         # Fazer upgrade de plano
DELETE /api/v1/subscriptions/cancel          # Cancelar assinatura
GET    /api/v1/subscriptions/usage           # Métricas de uso
POST   /api/v1/billing/create-checkout       # Sessão de checkout Stripe
POST   /api/v1/billing/webhooks              # Webhooks Stripe
```

**Marketplace de Tokens:**
```
GET    /api/v1/marketplace/packages          # Listar pacotes de tokens
POST   /api/v1/marketplace/purchase          # Comprar tokens
GET    /api/v1/marketplace/history           # Histórico de compras
POST   /api/v1/marketplace/auto-refill       # Configurar recarga automática
```

#### Schema do Banco de Dados

**Novas Tabelas:**

```sql
-- Planos de Assinatura
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL, -- 'freemium', 'standard', 'premium'
  display_name VARCHAR(100),
  price_monthly DECIMAL(10,2),
  price_annual DECIMAL(10,2),
  features JSONB, -- Feature flags
  ai_tokens_monthly INTEGER,
  max_proposals INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Assinaturas de Usuários
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  plan_id UUID REFERENCES subscription_plans(id),
  status VARCHAR(20), -- 'active', 'cancelled', 'past_due'
  stripe_subscription_id VARCHAR(255),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Saldos de Tokens IA
CREATE TABLE ai_token_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE,
  included_tokens INTEGER DEFAULT 0, -- Da assinatura
  purchased_tokens INTEGER DEFAULT 0, -- Do marketplace
  total_tokens INTEGER GENERATED ALWAYS AS (included_tokens + purchased_tokens) STORED,
  last_reset_at TIMESTAMP, -- Reset mensal para tokens incluídos
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Transações de Tokens IA
CREATE TABLE ai_token_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(20), -- 'generation', 'purchase', 'refund', 'reset'
  tokens_delta INTEGER, -- Positivo para compra, negativo para uso
  balance_after INTEGER,
  metadata JSONB, -- { proposalId, contentBoxType, cost, etc. }
  created_at TIMESTAMP DEFAULT NOW()
);

-- Templates
CREATE TABLE proposal_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- 'real-estate', 'consulting', etc.
  style_tags VARCHAR(100)[], -- ['modern', 'corporate']
  thumbnail_url VARCHAR(500),
  canvas_data JSONB, -- JSON do canvas Fabric.js
  is_public BOOLEAN DEFAULT FALSE, -- Templates da comunidade
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Logs de Uso de Template
CREATE TABLE template_usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES proposal_templates(id),
  user_id UUID REFERENCES users(id),
  proposal_id UUID REFERENCES proposals(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pacotes de Tokens (Marketplace)
CREATE TABLE token_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100),
  tokens INTEGER,
  price DECIMAL(10,2),
  discount_percentage INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Compras de Tokens
CREATE TABLE token_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  package_id UUID REFERENCES token_packages(id),
  tokens_purchased INTEGER,
  amount_paid DECIMAL(10,2),
  payment_method VARCHAR(50),
  stripe_payment_intent_id VARCHAR(255),
  status VARCHAR(20), -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Configurações de Recarga Automática
CREATE TABLE auto_refill_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE,
  enabled BOOLEAN DEFAULT FALSE,
  threshold_tokens INTEGER,
  package_id UUID REFERENCES token_packages(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Integrações com Terceiros

**Provedor de IA:**
- **Primário:** OpenAI GPT-4 Turbo
- **Fallback:** Anthropic Claude 3 Sonnet
- **Gestão de Custos:** Contagem de tokens, rate limiting, caching

**Processamento de Pagamento:**
- **Internacional:** Stripe (cartões de crédito, renovação automática)
- **Brasil:** Mercado Pago (PIX, boleto bancário)
- **Webhooks:** Eventos do ciclo de vida da assinatura

**Armazenamento de Assets:**
- **Uploads de Usuário:** AWS S3 (imagens, logos)
- **Assets de Stock:** Unsplash API, Pexels API
- **CDN:** Cloudflare para entrega

**Análises:**
- **Análises de Produto:** Mixpanel
- **Rastreamento de Erros:** Sentry
- **Performance:** Vercel Analytics

---

## 6. Requisitos de UI/UX

### Princípios de Design

1. **Simplicidade em Primeiro Lugar:** Sem curva de aprendizado para não-designers
2. **Feedback Visual:** Toda ação tem resposta visual imediata
3. **Divulgação Progressiva:** Recursos avançados ocultos até serem necessários
4. **Mobile-Friendly:** Visualizador de canvas responsivo (editor é apenas desktop)

### Telas Principais

#### 6.1 Designer de Templates - Editor de Canvas

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] Editor de Template       [Salvar] [Visualizar] [Publicar] │
├─────────────────────────────────────────────────────────────┤
│ ┌──────┐ │                                                │
│ │Texto │ │                                                │
│ │Imagem│ │           CANVAS (Scroll Infinito)            │
│ │Ícones│ │                                                │
│ │Vídeo │ │         [Solte elementos aqui]                │
│ │IA 🤖 │ │                                                │
│ │Formas│ │                                                │
│ └──────┘ │                                                │
│Ferrament.│                                                │
└──────────┴────────────────────────────────────────────────┘
│ [Zoom: 100%]  [Grade Ativa]  [Desfazer] [Refazer]        │
└─────────────────────────────────────────────────────────────┘
```

**Barra Lateral Esquerda (Recolhível):**
- Biblioteca de elementos (drag-and-drop)
- Buscar elementos
- Recentemente usados

**Painel de Propriedades Direito:**
- Configurações específicas do elemento (fonte, cor, tamanho)
- Ferramentas de alinhamento
- Camadas (trazer para frente, enviar para trás)

**Barra de Ferramentas Superior:**
- Salvar template
- Visualizar (abre em nova aba)
- Publicar na comunidade (Premium)
- Compartilhar (copiar link)
- Exportar (PDF, PPTX)

**Interação da Caixa de Conteúdo IA:**
1. Clicar em "IA 🤖" na barra lateral
2. Arrastar para o canvas
3. Configurar caixa (tamanho, posição)
4. Clicar em "Configurar Entradas de IA"
5. Modal abre:
   ```
   ┌─────────────────────────────────────┐
   │  Gerar Descrição de Produto          │
   ├─────────────────────────────────────┤
   │  Nome do Produto: [________________] │
   │  Recursos:        [________________] │
   │                   [+ Adicionar recurso]│
   │  Público-Alvo:    [________________] │
   │                                      │
   │  Custo Estimado: ~500 tokens (R$1,50)│
   │                                      │
   │  [Cancelar]      [Gerar Texto 🪄]   │
   └─────────────────────────────────────┘
   ```
6. Revisar texto gerado, editar se necessário
7. Clicar em "Aplicar ao Canvas"

#### 6.2 Página de Planos de Assinatura

**Tabela de Comparação (Cards Horizontais):**
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  FREEMIUM   │  │  STANDARD   │  │   PREMIUM   │
│   Grátis    │  │  R$ 79/mês  │  │ R$ 199/mês  │
├─────────────┤  ├─────────────┤  ├─────────────┤
│ ✓ 3 Props   │  │ ✓ 50 Props  │  │ ✓ Ilimitado │
│ ✗ Templates │  │ ✓ Designer  │  │ ✓ Salvar Tmp│
│ ✗ Texto IA  │  │ ✓ 10k Tokens│  │ ✓ 50k Tokens│
│ ✗ Logo      │  │ ✓ Logo      │  │ ✓ Kit Marca │
│             │  │             │  │ ✓ Análises  │
│             │  │             │  │ ✓ Equipe (3)│
│ [Atual]     │  │ [Upgrade]   │  │ [Upgrade]   │
└─────────────┘  └─────────────┘  └─────────────┘
```

**Toggle Anual:**
- Alternar entre preços mensais/anuais
- Badge "Economize 17%" no anual

**Comparação de Recursos Expansível:**
- Clicar em "Ver todos os recursos" → tabela completa de comparação
- Destacar diferenças entre planos

#### 6.3 Marketplace de Tokens de IA

**Widget do Dashboard (Sempre Visível):**
```
┌────────────────────────────┐
│ 🪙 Tokens IA: 4.523 / 10k │
│ ████████░░ 45%            │
│ [Recarregar]              │
└────────────────────────────┘
```

**Página do Marketplace:**
```
┌─────────────────────────────────────────────────────────────┐
│              Marketplace de Tokens IA                        │
├─────────────────────────────────────────────────────────────┤
│  Seu Saldo: 4.523 tokens | Incluídos Mensalmente: 10.000    │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │INICIANTE │ │CRESCIMENT│ │   PRO    │ │EMPRESARIAL│      │
│  │  5k      │ │  20k     │ │  50k     │ │  200k    │      │
│  │  R$ 15   │ │  R$ 50   │ │  R$ 100  │ │  R$ 300  │      │
│  │          │ │  17% desc│ │  33% desc│ │  50% desc│      │
│  │ [Comprar]│ │ [Comprar]│ │ [Comprar]│ │ [Comprar]│      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                              │
│  ⚙️ Recarga Automática: [Desligada] Quando < 2.000, comprar│
│                         pacote Crescimento                   │
│                                                              │
│  Compras Recentes:                                          │
│  • 15 Jan - Pacote Crescimento (20k) - R$ 50               │
│  • 28 Dez - Pacote Iniciante (5k) - R$ 15                  │
└─────────────────────────────────────────────────────────────┘
```

#### 6.4 Biblioteca de Templates

**Visualização em Galeria:**
```
┌─────────────────────────────────────────────────────────────┐
│  Biblioteca de Templates [Buscar] [Filtrar ▼] [Ordem: Recente ▼]│
├─────────────────────────────────────────────────────────────┤
│  Seus Templates (12) | Comunidade (250) | Pré-construídos (50)│
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │[Preview] │ │[Preview] │ │[Preview] │ │[Preview] │      │
│  │          │ │          │ │          │ │ 👑       │      │
│  │Imóveis   │ │Marketing │ │Consultori│ │Template  │      │
│  │Apartament│ │Proposta  │ │Serviços  │ │Premium   │      │
│  │          │ │          │ │          │ │          │      │
│  │[Usar][📝]│ │[Usar][📝]│ │[Usar][📝]│ │[Upgrade] │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                              │
│  [+ Criar Novo Template]                                    │
└─────────────────────────────────────────────────────────────┘
```

**Filtros:**
- Categoria (Imóveis, Consultoria, Design, etc.)
- Estilo (Moderno, Corporativo, Criativo, Minimalista)
- Esquema de Cores (Vibrante, Monocromático, Pastéis)
- Acesso por Plano (Freemium, Standard, Premium)

---

## 7. Requisitos de Integração

### 7.1 Pontos de Integração com V1

**Fluxo de Criação de Proposta:**
1. Usuário cria proposta (fluxo V1 existente)
2. Nova opção: botão "Usar Template"
3. Abre modal da biblioteca de templates
4. Selecionar template → Auto-popular campos da proposta
5. IA preenche caixas de conteúdo com contexto da proposta
6. Continuar para fluxo V1 de revisão/envio

**Interação com Cliente:**
- Templates usados em propostas voltadas ao cliente
- Cliente vê proposta polida e com marca
- Comentários/aprovações funcionam inalterados (funcionalidade V1)

**Integração com Dashboard:**
- Adicionar aba "Templates" à navegação principal
- Adicionar widget "Tokens" ao cabeçalho
- Adicionar prompts de "Upgrade" para recursos bloqueados

### 7.2 Migração de Dados

**Usuários Existentes:**
- Todos os usuários começam no plano Freemium
- Anúncio por email: "Atualizamos o WebPropostas!"
- Período de graça de 30 dias: Manter limites de proposta existentes
- Após 30 dias: Aplicar limites freemium (3 propostas)

**Propostas Existentes:**
- Permanecem acessíveis (sem exclusão)
- Usuários acima do limite veem: "Faça upgrade para criar mais propostas"
- Opção: Deletar propostas antigas para liberar slots (Freemium)

### 7.3 Feature Flags

**Lançamento Gradual:**
- Semana 1: Designer de Templates (beta, somente Premium)
- Semana 2: Caixas de Conteúdo IA (beta, todos os planos)
- Semana 3: Marketplace de Tokens (beta)
- Semana 4: Planos de assinatura (aplicar limites)
- Semana 5: Lançamento público

**Testes A/B:**
- Testar preços: R$ 79 vs R$ 99 para Standard
- Testar custos de IA: Nível grátis com 1k tokens vs somente pago
- Testar prompts de upgrade: Modal vs banner

---

## 8. Estratégia de Monetização

### 8.1 Fluxos de Receita

**Primário (Recorrente):**
- Assinaturas Standard: R$ 79/mês × 1.000 usuários = R$ 79.000/mês
- Assinaturas Premium: R$ 199/mês × 300 usuários = R$ 59.700/mês
- **Meta Total de MRR:** R$ 138.700/mês

**Secundário (Pontual):**
- Compras de Tokens IA: R$ 50 média × 500 compras/mês = R$ 25.000/mês
- Assinaturas anuais (pagamento antecipado)
- Planos empresariais customizados

### 8.2 Estratégia de Preços

**Freemium:**
- Propósito: Geração de leads, crescimento viral
- Meta de conversão: 15% para pago em 90 dias
- Limitação chave: 3 propostas (suficiente para testar, insuficiente para negócio)

**Standard (R$ 79/mês):**
- Target: Freelancers solo, pequenas agências
- Sweet spot: Mais propostas + IA básica + logo
- Caminho de upsell: Acabam os tokens → Compram mais → Percebem que Premium tem melhor valor

**Premium (R$ 199/mês):**
- Target: Agências, power users, equipes imobiliárias
- Proposta de valor: Propostas ilimitadas + biblioteca de templates + colaboração em equipe
- Ancoragem: Posicionado como 2,5× preço Standard mas 10× valor

**Marketplace de Tokens:**
- Margem: 70% (custos OpenAI ~30% do preço do token)
- Cross-sell: Usuários Standard que precisam mais tokens → upgrade para Premium (melhor valor)

### 8.3 Táticas de Crescimento

**Funil Freemium:**
1. Usuário se cadastra (grátis)
2. Cria 3 propostas (vê o valor)
3. Atinge limite na 4ª proposta
4. Modal de upgrade: "Faça upgrade para Standard para 50 propostas"
5. Conversão: 15% upgrade

**Escassez de Tokens:**
- Usuários Standard recebem 10k tokens/mês
- Usuário médio precisa de 15k tokens/mês (escassez projetada)
- Opções: Comprar 5k tokens (R$ 15) ou upgrade para Premium (melhor valor)

**Prova Social:**
- Templates da comunidade (usuários Premium publicam)
- Página de showcase: "Veja o que profissionais estão criando"
- Depoimentos de usuários pagantes

**Programa de Indicação:**
- Dar 500 tokens grátis por indicação cadastrada
- Usuário indicado recebe 500 tokens na primeira compra
- Loop viral: Usuários convidam clientes/colegas

---

## 9. Métricas de Sucesso

### 9.1 KPIs de Negócio

**Receita:**
- MRR (Monthly Recurring Revenue): Meta de R$ 138k no mês 6
- ARPU (Average Revenue Per User): Meta de R$ 45
- Relação LTV/CAC: Mínimo 3:1

**Crescimento de Usuários:**
- Total de Usuários: 10.000 no mês 6
- Usuários Pagos: 1.300 no mês 6 (13% conversão)
- Usuários Premium: 300 no mês 6 (3% do total)

**Retenção:**
- Taxa de Churn Mensal: < 5%
- Retenção Anual: > 70%
- Taxa de Reativação: 20% dos usuários com churn

### 9.2 KPIs de Produto

**Designer de Templates:**
- Templates Criados: 50+ por usuário pago
- Uso de Template: 80% das propostas usam templates
- Adoção de Caixa de Conteúdo IA: 60% dos templates incluem caixas IA

**Marketplace de Tokens de IA:**
- Taxa de Compra de Tokens: 30% dos usuários Standard compram tokens
- Compra Média: R$ 50/mês
- Adoção de Recarga Automática: 15% dos compradores de tokens

**Assinatura:**
- Conversão Freemium → Pago: 15% em 90 dias
- Upgrade Standard → Premium: 20% em 6 meses
- Adoção de Plano Anual: 30% dos usuários pagos

### 9.3 Engajamento de Usuário

**Ativação:**
- Tempo para Primeiro Template: < 10 minutos
- Tempo para Primeira Geração IA: < 15 minutos
- Templates Criados na Primeira Semana: 3+ (indicador de power user)

**Retenção:**
- Relação DAU/MAU: 30% (produto sticky)
- Usuários Ativos Semanalmente (WAU): 60% do total
- Retenção em 30 Dias: 70%

### 9.4 Métricas Operacionais

**Custos de IA:**
- Custo por Geração IA: < R$ 0,50
- Margem Bruta em Tokens: > 70%
- Desperdício de Tokens (tokens incluídos não usados): < 30%

**Suporte:**
- Volume de Tickets: < 5% dos usuários/mês
- Tempo de Primeira Resposta: < 2 horas
- Tempo de Resolução: < 24 horas

---

## 10. Roadmap de Desenvolvimento

### Fase 1: Fundação (Semanas 1-4)

**Semana 1-2: Infraestrutura**
- ✅ Criar branch `feature/webpropostas-v2`
- ✅ Configurar novas tabelas do banco de dados (assinaturas, tokens, templates)
- ✅ Implementar integração Stripe (assinaturas)
- ✅ Implementar integração Mercado Pago (PIX/boleto)
- ✅ Configurar integração com API OpenAI

**Semana 3-4: Sistema de Assinatura**
- ✅ Construir página de comparação de planos
- ✅ Implementar lógica de assinatura (assinar, upgrade, cancelar)
- ✅ Middleware de controle de recursos
- ✅ Rastreamento de uso (propostas, tokens)
- ✅ Dashboard de cobrança

**Entrega:** Sistema de assinatura funcional, sem designer de templates ainda

### Fase 2: Designer de Templates MVP (Semanas 5-8)

**Semana 5-6: Editor de Canvas**
- ✅ Integrar canvas Fabric.js
- ✅ Elementos drag-and-drop (texto, formas, imagens)
- ✅ Edição básica (redimensionar, mover, rotacionar, deletar)
- ✅ Salvar/carregar estado do canvas (JSON)

**Semana 7-8: Caixas de Conteúdo IA**
- ✅ Componente de caixa de conteúdo IA
- ✅ Construtor de formulário de entrada (campos dinâmicos)
- ✅ API de geração de texto OpenAI
- ✅ Rastreamento de consumo de tokens
- ✅ Revisar/editar texto gerado

**Entrega:** Usuários podem criar templates com geração de texto IA

### Fase 3: Biblioteca de Templates & Assets (Semanas 9-12)

**Semana 9-10: Gestão de Templates**
- ✅ Salvar template com metadados (nome, categoria, tags)
- ✅ Biblioteca de templates (visualização em grade, busca, filtro)
- ✅ Usar template na criação de proposta
- ✅ Templates da comunidade (Premium)

**Semana 11-12: Assets de Design**
- ✅ Integração de biblioteca de ícones (10.000+ ícones)
- ✅ API de fotos de stock (Unsplash/Pexels)
- ✅ Kit de Marca (logo, cores, fontes) - Premium
- ✅ Gráficos & diagramas - Premium

**Entrega:** Designer de templates completo com biblioteca de assets

### Fase 4: Marketplace de Tokens (Semanas 13-14)

**Semana 13:**
- ✅ Definição de pacotes de tokens (Iniciante, Crescimento, Pro, Empresarial)
- ✅ UI da página do Marketplace
- ✅ Fluxo de compra (Stripe/Mercado Pago)
- ✅ Widget de saldo de tokens no dashboard

**Semana 14:**
- ✅ Configuração de recarga automática
- ✅ Análises de uso de tokens
- ✅ Alertas de saldo baixo
- ✅ Histórico de compras

**Entrega:** Marketplace de tokens ao vivo

### Fase 5: Recursos Avançados (Semanas 15-16)

**Semana 15:**
- ✅ Exportar para PPTX (Premium)
- ✅ Subdomínio personalizado (Premium)
- ✅ Colaboração em tempo real (Premium)
- ✅ Dashboard de análises avançadas

**Semana 16:**
- ✅ Opção white-label (Premium)
- ✅ Acesso à API (Premium)
- ✅ Gestão de equipe (convidar, funções)

**Entrega:** Todos os recursos Premium completos

### Fase 6: Testes & Refinamento (Semanas 17-18)

**Semana 17:**
- ✅ Testes end-to-end (todos os fluxos de usuário)
- ✅ Testes de carga (1000 usuários simultâneos)
- ✅ Auditoria de segurança (OWASP Top 10)
- ✅ Auditoria de acessibilidade (WCAG 2.1 AA)

**Semana 18:**
- ✅ Correção de bugs dos testes
- ✅ Otimização de performance
- ✅ Documentação (guias do usuário, docs da API)
- ✅ Treinamento da equipe de suporte

**Entrega:** V2 pronto para produção

### Fase 7: Lançamento Beta (Semana 19)

- ✅ Convidar 100 usuários beta (power users existentes)
- ✅ Coletar feedback (pesquisas, entrevistas)
- ✅ Iterar sobre pontos de dor da UX
- ✅ Monitorar métricas (ativação, engajamento, bugs)

### Fase 8: Lançamento Público (Semana 20)

- ✅ Anúncio por email para todos os usuários
- ✅ Post no blog & press release
- ✅ Campanha em redes sociais
- ✅ Anúncios pagos (Google, Facebook)
- ✅ Monitorar métricas de lançamento
- ✅ Cobertura de suporte 24/7

### Fase 9: Pós-Lançamento (Semanas 21-24)

**Semana 21-22:**
- ✅ Analisar funil de conversão
- ✅ Testes A/B de preços & prompts
- ✅ Otimizar fluxo de onboarding
- ✅ Adicionar recursos faltantes do feedback

**Semana 23-24:**
- ✅ Escalar infraestrutura (se necessário)
- ✅ Expandir capacidades de IA (GPT-4o, Claude 3.5)
- ✅ Planejar roadmap V2.1
- ✅ Casos de estudo & histórias de sucesso

**Entrega:** V2 estável com 1.000+ usuários pagos

---

## 11. Avaliação de Riscos

### 11.1 Riscos Técnicos

**Risco:** Performance do editor de canvas degrada com templates complexos (100+ elementos)
- **Mitigação:** Implementar virtualização (renderizar apenas elementos visíveis)
- **Probabilidade:** Média
- **Impacto:** Alto

**Risco:** Custos de API de IA excedem projeções (mudanças de preço OpenAI)
- **Mitigação:** Estratégia multi-provedor (Claude como fallback), caching agressivo
- **Probabilidade:** Média
- **Impacto:** Alto

**Risco:** Colaboração em tempo real causa conflitos de dados
- **Mitigação:** Implementação de Operational Transformation (OT) ou CRDT
- **Probabilidade:** Baixa
- **Impacto:** Médio

**Risco:** Problemas de performance do banco de dados com JSON grande do canvas
- **Mitigação:** Armazenamento separado para dados do canvas (S3), caching CDN
- **Probabilidade:** Baixa
- **Impacto:** Médio

### 11.2 Riscos de Negócio

**Risco:** Usuários freemium não convertem para pago (< 10% conversão)
- **Mitigação:** Testes A/B de limites (3 vs 5 propostas), melhores prompts de upgrade
- **Probabilidade:** Média
- **Impacto:** Alto

**Risco:** Preço Premium (R$ 199) é muito alto para mercado brasileiro
- **Mitigação:** Preços regionais, introduzir plano intermediário (R$ 129)
- **Probabilidade:** Baixa
- **Impacto:** Médio

**Risco:** Marketplace de tokens canibaliza upgrades para Premium
- **Mitigação:** Precificar tokens alto o suficiente para que Premium seja melhor valor
- **Probabilidade:** Média
- **Impacto:** Médio

**Risco:** Concorrentes copiam recursos em 6 meses
- **Mitigação:** Construir efeitos de rede (templates da comunidade), fosso de marca
- **Probabilidade:** Alta
- **Impacto:** Médio

### 11.3 Riscos de Experiência do Usuário

**Risco:** Designer de templates é muito complexo para não-designers
- **Mitigação:** Testes extensivos com usuários, tutoriais interativos, templates
- **Probabilidade:** Média
- **Impacto:** Alto

**Risco:** Texto gerado por IA é de baixa qualidade ou irrelevante
- **Mitigação:** Engenharia de prompts, loop de feedback do usuário, edição manual
- **Probabilidade:** Baixa
- **Impacto:** Alto

**Risco:** Usuários acabam tokens e fazem churn ao invés de comprar
- **Mitigação:** Tokens incluídos generosos (10k/mês), mensagens claras de valor
- **Probabilidade:** Média
- **Impacto:** Médio

### 11.4 Riscos de Conformidade

**Risco:** Conteúdo gerado por IA viola direitos autorais ou contém viés
- **Mitigação:** Disclaimers, moderação de conteúdo, cláusula de responsabilidade do usuário
- **Probabilidade:** Baixa
- **Impacto:** Alto

**Risco:** Falha no processamento de pagamento (downtime Stripe/Mercado Pago)
- **Mitigação:** Provedores de pagamento redundantes, opção de pagamento offline (boleto)
- **Probabilidade:** Baixa
- **Impacto:** Médio

**Risco:** Problemas de conformidade LGPD com rastreamento de uso de IA
- **Mitigação:** Anonimizar logs de IA, política de privacidade transparente, consentimento do usuário
- **Probabilidade:** Baixa
- **Impacto:** Alto

---

## 12. Apêndice

### 12.1 Glossário

- **Token de IA:** Unidade de capacidade de geração de texto IA (1 token ≈ 1 palavra)
- **Canvas:** Workspace do editor visual onde templates são projetados
- **Caixa de Conteúdo:** Container editável para texto, imagens ou conteúdo gerado por IA
- **Freemium:** Plano grátis com recursos limitados
- **Template:** Design de proposta reutilizável com placeholders para conteúdo dinâmico
- **Kit de Marca:** Coleção de logo, cores e fontes (recurso Premium)
- **Template da Comunidade:** Template compartilhado publicamente criado por usuários

### 12.2 Análise Competitiva

| Recurso | WebPropostas V2 | Canva | PandaDoc | Proposify |
|---------|----------------|-------|----------|-----------|
| Geração de Texto IA | ✅ | ❌ | ❌ | ❌ |
| Designer Drag-Drop | ✅ | ✅ | ❌ | ✅ |
| Salvar Templates | ✅ | ✅ | ✅ | ✅ |
| Workflow de Propostas | ✅ | ❌ | ✅ | ✅ |
| Plano Freemium | ✅ (3 propostas) | ✅ (limitado) | ❌ | ❌ |
| Foco Mercado Brasileiro | ✅ | ❌ | ❌ | ❌ |
| Preço (Plano Pro) | R$ 199/mês | R$ 180/mês | $49/mês | $49/mês |

**Vantagens Competitivas:**
1. Única ferramenta de propostas com redação IA integrada
2. Única ferramenta projetada para mercado brasileiro (PIX, boleto, Português)
3. Menor barreira de entrada (freemium vs concorrentes apenas pagos)
4. Tudo-em-um (design + workflow + IA) vs ferramentas fragmentadas

### 12.3 Personas de Usuário - Detalhado

#### Persona 1: Consultora Freelancer Sofia

**Demografia:**
- Idade: 28
- Localização: São Paulo, SP
- Educação: MBA em Marketing
- Renda: R$ 8.000/mês

**Contexto:**
- 3 anos como consultora independente
- Clientes: 5-10 pequenas empresas
- Propostas: 20-30 por mês
- Ferramentas atuais: Google Docs, Canva (grátis)

**Dores:**
- Gasta 3-4 horas escrevendo cada proposta
- Propostas parecem "genéricas" (sem marca)
- Sem tempo para aprender ferramentas de design
- Perde clientes devido a resposta lenta

**Objetivos:**
- Criar propostas profissionais em < 30 minutos
- Branding consistente em todas as propostas
- Impressionar clientes com design moderno
- Ganhar 30% mais negócios

**Objeções ao WebPropostas:**
- "R$ 79/mês vale a pena?"
- "Realmente vou economizar tempo?"
- "E se os clientes não gostarem dos templates?"

**Cenário de Sucesso:**
1. Cadastra no freemium, cria 3 propostas de teste
2. Adora os templates, frustrada com limite de 3 propostas
3. Faz upgrade para Standard (R$ 79/mês)
4. Cria 15 templates para diferentes tipos de serviço
5. Usa IA para toda redação, economiza 20 horas/mês
6. Após 3 meses, ROI é claro: 2 clientes extras ganhos = R$ 16k receita
7. Vira advogada, indica 5 amigos freelancers

#### Persona 2: Corretor de Imóveis Roberto

**Demografia:**
- Idade: 42
- Localização: Florianópolis, SC
- Educação: Graduação em Administração
- Renda: R$ 25.000/mês (baseada em comissão)

**Contexto:**
- 15 anos no mercado imobiliário
- Especializado em imóveis de alto padrão
- Propostas: 50+ por mês
- Ferramentas atuais: Templates Word, fotos de stock

**Dores:**
- Trabalho repetitivo (mesmo formato de proposta para cada imóvel)
- Propostas faltam "fator uau"
- Difícil se diferenciar de outros corretores
- Sem forma de rastrear performance da proposta

**Objetivos:**
- Agilizar criação de proposta (5 minutos por imóvel)
- Branding de luxo (logo, fontes de alto padrão)
- Templates para apartamentos, casas, terrenos, aluguéis
- Análises sobre quais propostas convertem

**Objeções ao WebPropostas:**
- "Premium é caro (R$ 199/mês)"
- "Já tenho um sistema"
- "E se clientes preferirem PDFs?"

**Cenário de Sucesso:**
1. Vê concorrente usando WebPropostas, propostas parecem incríveis
2. Cadastra no freemium, testa com 3 imóveis de luxo
3. Clientes elogiam qualidade de apresentação
4. Faz upgrade para Premium (precisa propostas ilimitadas + kit de marca)
5. Cria 10 templates (por tipo de imóvel, faixa de preço)
6. Adiciona logo da agência, cores da marca a todos os templates
7. Usa IA para escrever descrições de imóveis (economiza 10 horas/semana)
8. Após 1 mês: Fecha 3 negócios extras = R$ 45k comissão
9. ROI: 225× no primeiro mês

---

## 13. Questões Abertas & Decisões Necessárias

### 13.1 Preços

**Q1:** Devemos oferecer um plano intermediário entre Standard e Premium?
- **Opção A:** Manter 3 níveis (mais simples, decisão mais fácil)
- **Opção B:** Adicionar "Profissional" a R$ 129 (mais receita, mas paralisia de decisão)
- **Decisão:** A DEFINIR - Teste A/B durante beta

**Q2:** Usuários freemium devem receber algum token de IA?
- **Opção A:** 0 tokens (plano atual) - incentivo forte para upgrade
- **Opção B:** 1.000 tokens - experimentar IA, depois paywall
- **Decisão:** A DEFINIR - Testar ambos em coortes beta

### 13.2 Recursos de IA

**Q3:** Devemos suportar geração de imagem IA (DALL-E, Midjourney)?
- **Prós:** Mais valor, diferenciação
- **Contras:** Custos altos, moderação necessária
- **Decisão:** Recurso V2.1 (não no lançamento)

**Q4:** Quais modelos de IA devemos suportar?
- **Opção A:** Apenas GPT-4 Turbo (mais simples, mais barato)
- **Opção B:** GPT-4 + Claude 3 (redundância, comparação de qualidade)
- **Decisão:** Opção B - Usar Claude como fallback

### 13.3 Técnico

**Q5:** Templates devem ter versionamento (estilo Git)?
- **Prós:** Usuários podem reverter mudanças, edição mais segura
- **Contras:** UX complexa, mais armazenamento
- **Decisão:** Recurso V2.1 (não no lançamento)

**Q6:** Colaboração em tempo real: Obrigatório no lançamento ou pós-lançamento?
- **Opção A:** Recurso de lançamento (mais tempo dev, arriscado)
- **Opção B:** Pós-lançamento (mais rápido para mercado)
- **Decisão:** Opção B - Lançar sem, adicionar em V2.1

### 13.4 Go-to-Market

**Q7:** Devemos oferecer plano Premium apenas anual para aumentar fluxo de caixa?
- **Prós:** R$ 1.990 antecipado (vs R$ 199/mês)
- **Contras:** Barreira de entrada
- **Decisão:** Oferecer mensal + anual (17% desconto anual)

**Q8:** Programa de indicação: Recompensa em tokens ou dinheiro?
- **Opção A:** 500 tokens grátis por indicação
- **Opção B:** R$ 10 crédito por indicação
- **Decisão:** Opção A (mantém usuários no ecossistema)

---

## 14. Checklist de Sucesso

### Pré-Lançamento
- [ ] Todos os recursos V2 implementados e testados
- [ ] Migrações de banco de dados scriptadas e testadas
- [ ] Webhooks Stripe/Mercado Pago verificados
- [ ] Rate limits da API de IA configurados
- [ ] Feature flags para rollout gradual
- [ ] Documentação de usuário escrita (central de ajuda)
- [ ] Equipe de suporte treinada nos novos recursos
- [ ] Feedback de usuários beta incorporado
- [ ] Benchmarks de performance atingidos (< 3s carregamento de página)
- [ ] Auditoria de segurança aprovada (OWASP)
- [ ] Conformidade LGPD verificada (política de privacidade atualizada)

### Dia do Lançamento
- [ ] Deploy para produção (do branch `feature/webpropostas-v2`)
- [ ] Habilitar feature flags (rollout gradual)
- [ ] Anúncio por email enviado para todos os usuários
- [ ] Post no blog publicado
- [ ] Posts em redes sociais agendados
- [ ] Campanhas de anúncios pagos ativadas
- [ ] Dashboards de monitoramento ativos (Sentry, Mixpanel)
- [ ] Equipe de suporte de prontidão (24/7 na primeira semana)

### Semana 1 Pós-Lançamento
- [ ] 1.000+ usuários ativaram recursos V2
- [ ] 100+ assinaturas pagas (10% conversão)
- [ ] 500+ templates criados
- [ ] 5.000+ gerações de texto IA
- [ ] < 5% taxa de erro (sem bugs críticos)
- [ ] Pesquisa NPS enviada aos primeiros 500 usuários
- [ ] Feedback priorizado para V2.1

### Mês 1 Pós-Lançamento
- [ ] 5.000+ usuários totais
- [ ] 500+ usuários pagos (10% conversão mantida)
- [ ] R$ 50k+ MRR alcançado
- [ ] 70%+ retenção em 30 dias
- [ ] 3+ templates por usuário pago (média)
- [ ] Casos de estudo publicados (3 histórias de sucesso)
- [ ] Roadmap V2.1 finalizado

---

## 15. Conclusão

O WebPropostas V2 representa um upgrade transformacional que posiciona a plataforma como a ferramenta líder de criação de propostas com IA para o mercado brasileiro. Ao combinar ferramentas intuitivas de design visual com geração de texto de ponta com IA, capacitamos não-designers e não-escritores a criar propostas profissionais e persuasivas que ganham negócios.

**Fatores-Chave de Sucesso:**
1. **Simplicidade:** Sem curva de aprendizado para não-designers
2. **Valor da IA:** Economiza horas em redação, gera texto profissional
3. **Monetização:** Caminhos claros de upgrade, proposta de valor forte
4. **Fit de Mercado:** Feito sob medida para usuários brasileiros (PIX, boleto, Português)

**Próximos Passos:**
1. Revisar e aprovar este PRD
2. Criar especificações técnicas detalhadas
3. Iniciar desenvolvimento da Fase 1 (infraestrutura)
4. Revisões de progresso semanais com stakeholders
5. Lançamento beta na Semana 19
6. Lançamento público na Semana 20

**Assinaturas de Aprovação:**

- [ ] Dono do Produto: ___________________ Data: _______
- [ ] Líder de Engenharia: ________________ Data: _______
- [ ] Líder de Design: ____________________ Data: _______
- [ ] Dono do Negócio: ___________________ Data: _______

---

**Controle do Documento:**
- **Versão:** 1.0
- **Última Atualização:** Outubro de 2025
- **Próxima Revisão:** Após Lançamento Beta (Semana 19)
- **Distribuição:** Equipes de Produto, Engenharia, Design, Negócios
- **Confidencialidade:** Apenas Interno

---

*Este PRD é um documento vivo e será atualizado baseado em feedback de usuários, descobertas técnicas e mudanças de mercado ao longo do ciclo de desenvolvimento do V2.*
