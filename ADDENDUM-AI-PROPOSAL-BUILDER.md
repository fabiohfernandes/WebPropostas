# WebPropostas V2 - Adendo: AI Proposal Builder
## Primeira Funcionalidade V2 a Ser Implementada

**Versão:** 1.0
**Data:** Outubro de 2025
**Prioridade:** CRÍTICA - Implementação Imediata
**Branch:** `feature/v2-ai-proposal-builder`

---

## 📋 Sumário Executivo

Este adendo altera a **ordem de implementação do roadmap V2**, priorizando o **AI Proposal Builder** como **Fase 0 (Semanas 1-3)** antes de todas as outras funcionalidades. Esta decisão estratégica foi tomada porque:

1. **Maior Impacto Imediato:** Reduz 80% do tempo de criação de propostas (de 3 horas para 30 minutos)
2. **Menor Complexidade Técnica:** Não depende do canvas editor ou sistema de templates
3. **Validação do Valor da IA:** Prova o conceito antes de investir em assinaturas e marketplace
4. **Feedback Rápido:** Permite coletar dados reais de uso para refinar outras features V2

**Resultado Esperado:** Corretor preenche formulário interativo → IA gera proposta completa profissional → Revisa/edita em múltiplas iterações → Publica para cliente

---

## 🎯 Visão do Produto

### O Que É

**AI Proposal Builder** é uma interface conversacional guiada que usa **ChatGPT-4o** (velocidade) e **GPT-o1** (raciocínio complexo) para ajudar corretores a construir propostas comerciais completas através de um diálogo estruturado, eliminando a necessidade de escrever do zero.

### Como Funciona (User Journey)

```
┌─────────────────────────────────────────────────────────────────┐
│  1. INFORMAÇÕES BÁSICAS                                         │
│                                                                 │
│  👤 Cliente: [Nome da empresa]                                  │
│  📧 Contato: [Email] | [Telefone]                               │
│  🏢 Setor: [Dropdown: Imobiliário/Tech/Consultoria/...]        │
│  💼 Tipo de Proposta: [Venda/Serviço/Parceria/Investimento]    │
│                                                                 │
│  [Próximo Passo]                                                │
└─────────────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. CONTEXTO DO PROJETO (IA Pergunta Dinamicamente)            │
│                                                                 │
│  🤖 "Ótimo! Me conte sobre o projeto que você está              │
│      propondo para [Nome da empresa]..."                        │
│                                                                 │
│  📝 [Campo de texto expandível]                                 │
│  💡 Exemplos:                                                   │
│  • "Desenvolvimento de site institucional"                      │
│  • "Venda de apartamento 3 quartos no Centro"                  │
│  • "Consultoria em transformação digital"                      │
│                                                                 │
│  🤖 Perguntas Inteligentes da IA:                               │
│  • "Qual o principal problema que isso resolve?"                │
│  • "Qual o prazo esperado para entrega/fechamento?"             │
│  • "Existe algum orçamento estimado ou range de valores?"       │
│                                                                 │
│  [Voltar] [Gerar Primeira Versão]                               │
└─────────────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. GERAÇÃO DA PROPOSTA (Loading com Progresso)                │
│                                                                 │
│  🤖 Gerando sua proposta...                                     │
│                                                                 │
│  ✅ Pesquisando dados de mercado...                             │
│  ✅ Estruturando resumo executivo...                            │
│  ⏳ Calculando proposta de valor...                             │
│  ⏳ Detalhando escopo e entregáveis...                          │
│  ⏳ Criando cronograma e preços...                              │
│                                                                 │
│  Tempo estimado: 45-90 segundos                                 │
│  [Usar GPT-o1 para raciocínio mais profundo? +30s]              │
└─────────────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. REVISÃO INTERATIVA (Split Screen)                           │
│                                                                 │
│  ┌─────────────────┬─────────────────────────────────────────┐ │
│  │ ÍNDICE          │ PREVIEW (Markdown Renderizado)          │ │
│  ├─────────────────┼─────────────────────────────────────────┤ │
│  │ ✅ Resumo Exec. │ ## Resumo Executivo                     │ │
│  │ ⚠️ Dor/Oportun. │ [Cliente] enfrenta o desafio de...      │ │
│  │ 📝 Proposta     │ Nossa solução oferece:                  │ │
│  │ 💰 Preços       │ - Benefício 1: ↑ 25% receita            │ │
│  │ 📊 Cronograma   │ - Benefício 2: ↓ 40% custos             │ │
│  │ 📄 Termos       │                                         │ │
│  │                 │ ## Dor do Cliente & Oportunidade        │ │
│  │ [+ Adicionar]   │ Segundo dados do setor [Fonte, 2025],   │ │
│  │                 │ empresas que não investem em...         │ │
│  └─────────────────┴─────────────────────────────────────────┘ │
│                                                                 │
│  🤖 Chat de Ajustes:                                            │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Você: "A seção de preços está muito genérica"             │ │
│  │                                                           │ │
│  │ IA: "Entendi! Vou detalhar mais os preços. Você          │ │
│  │     prefere tabela itemizada ou pacotes fechados?"       │ │
│  │                                                           │ │
│  │ Você: "Tabela itemizada"                                  │ │
│  │                                                           │ │
│  │ IA: ✅ Atualizei a seção "Modelo de Precificação"         │ │
│  │     com tabela detalhada. Confira agora!                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [Voltar ao Início] [Refazer Tudo] [Publicar Proposta]         │
└─────────────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────────────┐
│  5. PUBLICAÇÃO                                                  │
│                                                                 │
│  ✅ Proposta Salva!                                             │
│                                                                 │
│  🔗 Link: https://webpropostas.com.br/p/abc123xyz               │
│     [Copiar Link] [Enviar por Email] [Baixar PDF]              │
│                                                                 │
│  📧 Enviar para cliente:                                        │
│  Para: [cliente@empresa.com.br]                                 │
│  Assunto: [Proposta Comercial - Projeto XYZ]                   │
│  Mensagem: [Pré-preenchida com IA]                             │
│                                                                 │
│  [Enviar Agora] [Agendar Envio] [Voltar ao Editor]             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Especificação de Interface (UI/UX)

### Tela 1: Wizard de Onboarding (Passo a Passo)

**Layout:** Wizard com 4 passos visuais (dots indicator no topo)

**Passo 1/4: Informações do Cliente**
```typescript
<FormSection title="Quem é o cliente?">
  <Input label="Nome da Empresa" required placeholder="Ex: Imobiliária Silva & Costa" />
  <Input label="Responsável" placeholder="Ex: João Silva - Diretor Comercial" />
  <Input label="Email" type="email" required />
  <Input label="Telefone" mask="(00) 00000-0000" />
  <Select label="Setor de Atuação" options={[
    "Imobiliário - Venda de Imóveis",
    "Imobiliário - Locação",
    "Imobiliário - Administração de Condomínios",
    "Tecnologia - Software",
    "Consultoria - Gestão",
    "Outro (especificar)"
  ]} />
</FormSection>
```

**Passo 2/4: Tipo de Proposta**
```typescript
<RadioCards>
  <Card value="venda-imovel" icon="🏠">
    <h3>Venda de Imóvel</h3>
    <p>Proposta para vender casa, apartamento, terreno, etc.</p>
  </Card>
  <Card value="servico" icon="💼">
    <h3>Prestação de Serviço</h3>
    <p>Consultoria, desenvolvimento, manutenção, etc.</p>
  </Card>
  <Card value="parceria" icon="🤝">
    <h3>Proposta de Parceria</h3>
    <p>Joint venture, co-marketing, distribuição, etc.</p>
  </Card>
  <Card value="investimento" icon="💰">
    <h3>Captação de Investimento</h3>
    <p>Pitch deck, business plan, roadshow, etc.</p>
  </Card>
</RadioCards>
```

**Passo 3/4: Contexto do Projeto (Chat Interativo)**
```typescript
<ChatInterface>
  <AIMessage>
    Ótimo! Agora me conte sobre o projeto que você está propondo
    para <strong>{clientName}</strong>. Quanto mais detalhes, melhor
    a proposta que vou gerar para você! 📝
  </AIMessage>

  <UserInput
    multiline
    minHeight="150px"
    placeholder="Ex: Estou propondo a venda de um apartamento de 3 quartos no Centro de Florianópolis, com 120m², 2 vagas de garagem, frente mar. O cliente é investidor e quer alugar. Imóvel reformado em 2024, condomínio com piscina e academia. Preço: R$ 850.000."
  />

  <AISuggestions>
    💡 Dica: Inclua informações como:
    • O que você está oferecendo (produto/serviço)
    • Principal benefício ou diferencial
    • Prazo estimado de entrega/fechamento
    • Faixa de valor (se já souber)
  </AISuggestions>

  {/* IA faz perguntas adicionais dinamicamente */}
  <AIFollowUpQuestions>
    <Question>Qual o principal problema que isso resolve para o cliente?</Question>
    <Question>Existe algum concorrente ou alternativa que o cliente está considerando?</Question>
    <Question>Qual o deadline ideal para fechamento?</Question>
  </AIFollowUpQuestions>
</ChatInterface>
```

**Passo 4/4: Configurações Avançadas (Opcionais)**
```typescript
<AccordionSettings>
  <Section title="Tom e Estilo da Proposta" defaultExpanded>
    <RadioGroup>
      <Radio value="formal">Formal e Corporativo</Radio>
      <Radio value="profissional" checked>Profissional e Direto</Radio>
      <Radio value="amigavel">Amigável e Consultivo</Radio>
    </RadioGroup>
  </Section>

  <Section title="Nível de Detalhamento">
    <RadioGroup>
      <Radio value="executivo">Executivo (2-4 páginas)</Radio>
      <Radio value="completo" checked>Completo (8-12 páginas)</Radio>
    </RadioGroup>
  </Section>

  <Section title="Pesquisa de Mercado">
    <Checkbox checked>Incluir dados e estatísticas do setor</Checkbox>
    <Checkbox checked>Buscar cases e benchmarks similares</Checkbox>
    <Checkbox>Comparar com concorrentes conhecidos</Checkbox>
  </Section>

  <Section title="IA a Usar">
    <RadioGroup>
      <Radio value="gpt-4o" checked>
        GPT-4o (Rápido - 45s)
        <Badge>Recomendado</Badge>
      </Radio>
      <Radio value="gpt-o1">
        GPT-o1 (Raciocínio Profundo - 90s)
        <Badge premium>Premium</Badge>
      </Radio>
    </RadioGroup>
  </Section>
</AccordionSettings>

<ButtonGroup>
  <Button variant="secondary" onClick={goBack}>Voltar</Button>
  <Button variant="primary" onClick={generateProposal} loading={isGenerating}>
    🤖 Gerar Proposta com IA
  </Button>
</ButtonGroup>
```

---

### Tela 2: Geração em Progresso (Loading State)

**Layout:** Fullscreen loading com progresso real

```typescript
<GenerationProgress>
  <AnimatedIcon>🤖</AnimatedIcon>
  <Title>Gerando sua proposta com Inteligência Artificial...</Title>

  <ProgressSteps>
    <Step status="completed">
      <Icon>✅</Icon>
      <Label>Analisando informações fornecidas</Label>
      <Time>3s</Time>
    </Step>

    <Step status="completed">
      <Icon>✅</Icon>
      <Label>Pesquisando dados de mercado e tendências</Label>
      <Time>12s</Time>
    </Step>

    <Step status="in-progress">
      <Icon>⏳</Icon>
      <Label>Estruturando proposta de valor e diferenciais</Label>
      <Time>18s até agora...</Time>
    </Step>

    <Step status="pending">
      <Icon>⏸️</Icon>
      <Label>Detalhando escopo, entregáveis e cronograma</Label>
    </Step>

    <Step status="pending">
      <Icon>⏸️</Icon>
      <Label>Calculando modelo de precificação</Label>
    </Step>

    <Step status="pending">
      <Icon>⏸️</Icon>
      <Label>Revisão final e formatação</Label>
    </Step>
  </ProgressSteps>

  <EstimatedTime>
    Tempo estimado restante: <strong>35 segundos</strong>
  </EstimatedTime>

  <TipRotator>
    💡 <strong>Dica:</strong> Propostas com dados de mercado convertem
    40% mais que propostas genéricas (Fonte: Gartner, 2024)
  </TipRotator>
</GenerationProgress>
```

---

### Tela 3: Editor de Proposta com Chat IA (Split View)

**Layout:** 2 colunas (30% sidebar + 70% preview) com chat flutuante

```typescript
<ProposalEditor>
  {/* SIDEBAR ESQUERDA - Navegação por Seções */}
  <Sidebar width="30%">
    <Header>
      <Title>Sua Proposta</Title>
      <Badge>{proposalStatus}</Badge>
    </Header>

    <SectionTree>
      <SectionItem active status="complete">
        <Icon>📋</Icon> Resumo Executivo
        <Progress>100%</Progress>
      </SectionItem>

      <SectionItem status="warning">
        <Icon>⚠️</Icon> Dor do Cliente & Oportunidade
        <WarningBadge>Revisar</WarningBadge>
      </SectionItem>

      <SectionItem status="complete">
        <Icon>💎</Icon> Proposta de Valor
      </SectionItem>

      <SectionItem status="complete">
        <Icon>📦</Icon> Produto/Serviço
      </SectionItem>

      <SectionItem status="incomplete">
        <Icon>💰</Icon> Modelo de Precificação
        <ActionButton>Detalhar</ActionButton>
      </SectionItem>

      <SectionItem status="complete">
        <Icon>📊</Icon> Cronograma & Marcos
      </SectionItem>

      <SectionItem status="complete">
        <Icon>📄</Icon> Termos Comerciais
      </SectionItem>

      <Divider />

      <ActionButtons>
        <Button icon="➕" variant="ghost">Adicionar Seção</Button>
        <Button icon="🔄" variant="ghost">Refazer Tudo</Button>
      </ActionButtons>
    </SectionTree>
  </Sidebar>

  {/* PREVIEW ÁREA - Markdown Renderizado */}
  <PreviewPane width="70%">
    <Toolbar>
      <ButtonGroup>
        <IconButton icon="👁️" active>Preview</IconButton>
        <IconButton icon="📝">Markdown</IconButton>
        <IconButton icon="📄">PDF</IconButton>
      </ButtonGroup>

      <Spacer />

      <ButtonGroup>
        <IconButton icon="💾">Salvar Rascunho</IconButton>
        <IconButton icon="📤">Enviar</IconButton>
        <Button variant="primary">Publicar</Button>
      </ButtonGroup>
    </Toolbar>

    <MarkdownPreview>
      {/* Renderiza proposta com highlights em seções editadas */}
      <Section id="resumo-executivo" edited>
        <EditBadge>Editado há 2 min</EditBadge>
        <h2>📋 Resumo Executivo</h2>
        <p>
          A <strong>Imobiliária Silva & Costa</strong> enfrenta o desafio
          de atrair investidores para imóveis de alto padrão em um mercado
          competitivo. Nossa proposta apresenta um apartamento premium de
          3 quartos no Centro de Florianópolis...
        </p>
      </Section>

      <Section id="dor-oportunidade">
        <h2>⚠️ Dor do Cliente & Oportunidade</h2>
        {/* Conteúdo... */}
      </Section>

      {/* Mais seções... */}
    </MarkdownPreview>
  </PreviewPane>

  {/* CHAT FLUTUANTE - IA Assistant */}
  <FloatingChat position="bottom-right" minimized={chatMinimized}>
    <ChatHeader>
      <AIAvatar>🤖</AIAvatar>
      <Title>Assistente IA</Title>
      <Actions>
        <IconButton icon="➖" onClick={minimizeChat} />
        <IconButton icon="✖️" onClick={closeChat} />
      </Actions>
    </ChatHeader>

    <ChatMessages>
      <AIMessage>
        Olá! Sua proposta foi gerada. Quer que eu faça algum ajuste?
        Pode me pedir para:

        • Detalhar mais qualquer seção
        • Mudar tom (mais formal/informal)
        • Adicionar/remover partes
        • Recalcular preços
        • Melhorar argumentação
      </AIMessage>

      <UserMessage>
        A seção de preços está muito genérica
      </UserMessage>

      <AIMessage>
        Entendi! Vou detalhar mais os preços. Você prefere:

        1️⃣ Tabela itemizada (cada item com preço)
        2️⃣ Pacotes fechados (planos Bronze/Prata/Ouro)
        3️⃣ Comparativo (nossa oferta vs. concorrência)
      </AIMessage>

      <UserMessage>
        Tabela itemizada
      </UserMessage>

      <AIMessage typing>
        ⏳ Gerando tabela detalhada de preços...
      </AIMessage>

      <AIMessage>
        ✅ Pronto! Atualizei a seção "Modelo de Precificação"
        com uma tabela detalhada. Role até lá para conferir!

        <ActionButton>Ver Seção Atualizada</ActionButton>
      </AIMessage>
    </ChatMessages>

    <ChatInput>
      <Textarea
        placeholder="Digite sua solicitação ou pergunta..."
        onEnter={sendMessage}
      />
      <SendButton>Enviar</SendButton>
    </ChatInput>

    <QuickActions>
      <Chip>➕ Adicionar seção</Chip>
      <Chip>🎨 Mudar tom</Chip>
      <Chip>📊 Mais dados</Chip>
      <Chip>💰 Ajustar preços</Chip>
    </QuickActions>
  </FloatingChat>
</ProposalEditor>
```

---

## 🔧 Especificação Técnica

### Arquitetura Backend

**Novos Endpoints API:**

```typescript
// 1. Iniciar geração de proposta
POST /api/v1/ai/proposals/generate
{
  clientInfo: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    sector: string;
  };
  proposalType: 'venda-imovel' | 'servico' | 'parceria' | 'investimento';
  projectContext: string; // Descrição livre do usuário
  settings: {
    tone: 'formal' | 'profissional' | 'amigavel';
    detail: 'executivo' | 'completo';
    includeMarketResearch: boolean;
    aiModel: 'gpt-4o' | 'gpt-o1';
  };
}

Response: {
  sessionId: string;
  status: 'processing';
  estimatedTime: number; // segundos
}

// 2. Verificar progresso (polling ou SSE)
GET /api/v1/ai/proposals/generate/:sessionId/status

Response: {
  status: 'processing' | 'completed' | 'failed';
  progress: {
    currentStep: number;
    totalSteps: number;
    stepName: string;
    elapsedTime: number;
  };
  result?: {
    proposalId: string;
    markdown: string;
    sections: Section[];
    metadata: {
      aiModel: string;
      tokensUsed: number;
      generationTime: number;
      sourcesUsed: Source[];
    };
  };
  error?: string;
}

// 3. Chat de ajustes
POST /api/v1/ai/proposals/:proposalId/chat
{
  message: string;
  context?: {
    currentSection?: string;
    selectedText?: string;
  };
}

Response: {
  aiResponse: string;
  updatedSections?: Section[]; // Seções que foram alteradas
  suggestedActions?: Action[];
}

// 4. Atualizar seção específica
PATCH /api/v1/ai/proposals/:proposalId/sections/:sectionId
{
  instruction: string; // "Detalhar mais", "Tornar mais formal", etc.
  aiAssisted: boolean;
}

Response: {
  updatedSection: Section;
  tokensUsed: number;
}

// 5. Publicar proposta
POST /api/v1/ai/proposals/:proposalId/publish
{
  sendEmail?: {
    to: string;
    subject: string;
    message: string;
  };
}

Response: {
  publicUrl: string;
  pdfUrl: string;
  emailSent: boolean;
}
```

---

### Integração OpenAI (Multi-Model)

```typescript
// services/ai/proposalGenerator.ts

import OpenAI from 'openai';
import { WebSearchTool } from './tools/webSearch';
import { ProposalTemplate } from './templates';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateProposalParams {
  clientInfo: ClientInfo;
  proposalType: ProposalType;
  projectContext: string;
  settings: ProposalSettings;
}

export class AIProposalGenerator {

  /**
   * Gera proposta usando GPT-4o (rápido) ou GPT-o1 (raciocínio)
   */
  async generate(params: GenerateProposalParams): Promise<GeneratedProposal> {

    // 1. Seleciona modelo baseado nas configurações
    const model = params.settings.aiModel === 'gpt-o1'
      ? 'o1-preview'
      : 'gpt-4o';

    // 2. Carrega template apropriado
    const template = ProposalTemplate.load(params.proposalType);

    // 3. Pesquisa dados de mercado (se habilitado)
    let marketData = null;
    if (params.settings.includeMarketResearch) {
      marketData = await WebSearchTool.research({
        sector: params.clientInfo.sector,
        query: `${params.clientInfo.sector} market size Brazil 2024 trends`,
        maxResults: 5,
      });
    }

    // 4. Monta prompt complexo com template
    const systemPrompt = this.buildSystemPrompt(template, params.settings);
    const userPrompt = this.buildUserPrompt(params, marketData);

    // 5. Gera proposta com streaming para progresso
    const stream = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: model === 'o1-preview' ? 32000 : 16000,
    });

    let fullResponse = '';
    let currentSection = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullResponse += content;

      // Detecta mudança de seção para progresso
      if (content.includes('##')) {
        currentSection = content.match(/##\s+(.*)/)?.[1] || '';
        await this.updateProgress(params.sessionId, currentSection);
      }
    }

    // 6. Parseia markdown em seções estruturadas
    const sections = this.parseMarkdownToSections(fullResponse);

    // 7. Extrai metadados (fontes citadas, estatísticas, etc)
    const metadata = this.extractMetadata(fullResponse);

    return {
      markdown: fullResponse,
      sections,
      metadata,
      tokensUsed: this.estimateTokens(fullResponse),
      model,
    };
  }

  /**
   * Chat para ajustes incrementais
   */
  async chat(proposalId: string, userMessage: string, context?: ChatContext): Promise<ChatResponse> {

    const proposal = await this.getProposal(proposalId);

    // Mantém histórico de conversação
    const messages = [
      {
        role: 'system',
        content: `Você é um assistente especializado em melhorar propostas comerciais.
                  A proposta atual está em formato Markdown. Quando o usuário pedir ajustes,
                  retorne apenas a parte modificada em Markdown, precedida de "UPDATED_SECTION: [nome]".`
      },
      {
        role: 'user',
        content: `Proposta atual:\n\n${proposal.markdown}\n\n---\n\nUsuário pediu: ${userMessage}`
      }
    ];

    if (context?.selectedText) {
      messages.push({
        role: 'user',
        content: `Texto selecionado: "${context.selectedText}"`
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
      max_tokens: 4000,
    });

    const aiResponse = response.choices[0].message.content;

    // Detecta se IA modificou alguma seção
    const updatedSections = this.extractUpdatedSections(aiResponse);

    if (updatedSections.length > 0) {
      await this.updateProposalSections(proposalId, updatedSections);
    }

    return {
      message: aiResponse,
      updatedSections,
      tokensUsed: response.usage?.total_tokens || 0,
    };
  }

  /**
   * Monta system prompt baseado no template
   */
  private buildSystemPrompt(template: Template, settings: ProposalSettings): string {
    const basePrompt = `Você é um especialista em redação de propostas comerciais brasileiras.
Seu objetivo é gerar uma proposta ${settings.detail === 'executivo' ? 'concisa (2-4 páginas)' : 'completa (8-12 páginas)'}
com tom ${settings.tone}.

ESTRUTURA OBRIGATÓRIA:
${template.sections.map((s, i) => `${i + 1}. ${s.title}`).join('\n')}

REGRAS:
- Saída APENAS em Markdown (use ##, ###, tabelas, bullets)
- Quantifique benefícios com números e faixas (ex: "↑ 25-40% receita")
- Cite fontes de dados externos (ex: "Segundo CBIC 2024...")
- Evite jargão; priorize clareza e impacto
- Use tabelas para preços, cronogramas, riscos
- Inclua CTAs claros em cada seção

FORMATO DE TABELAS:
| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Valor    | Valor    | Valor    |`;

    return basePrompt;
  }

  /**
   * Monta user prompt com dados fornecidos
   */
  private buildUserPrompt(params: GenerateProposalParams, marketData: any): string {
    let prompt = `DADOS DO PROJETO:

Cliente: ${params.clientInfo.companyName}
Contato: ${params.clientInfo.contactName} (${params.clientInfo.email})
Setor: ${params.clientInfo.sector}
Tipo de Proposta: ${params.proposalType}

CONTEXTO DO PROJETO:
${params.projectContext}`;

    if (marketData) {
      prompt += `\n\nDADOS DE MERCADO (use para fundamentar proposta):
${marketData.summary}

Fontes:
${marketData.sources.map((s: any) => `- ${s.title} (${s.publisher}, ${s.year})`).join('\n')}`;
    }

    prompt += `\n\nGERE AGORA a proposta comercial completa em Markdown seguindo a estrutura obrigatória.`;

    return prompt;
  }

  // ... outros métodos auxiliares
}
```

---

### Frontend Components (React/Next.js)

```typescript
// app/ai-builder/page.tsx

'use client';

import { useState } from 'react';
import { ProposalWizard } from '@/components/AIBuilder/ProposalWizard';
import { ProposalEditor } from '@/components/AIBuilder/ProposalEditor';
import { useAIProposalGeneration } from '@/hooks/useAIProposalGeneration';

export default function AIBuilderPage() {
  const [step, setStep] = useState<'wizard' | 'editor'>('wizard');
  const [proposalId, setProposalId] = useState<string | null>(null);

  const { generate, isGenerating, progress } = useAIProposalGeneration();

  const handleGenerate = async (data: WizardData) => {
    const result = await generate(data);
    setProposalId(result.proposalId);
    setStep('editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {step === 'wizard' && (
        <ProposalWizard
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          progress={progress}
        />
      )}

      {step === 'editor' && proposalId && (
        <ProposalEditor
          proposalId={proposalId}
          onBack={() => setStep('wizard')}
        />
      )}
    </div>
  );
}
```

```typescript
// hooks/useAIProposalGeneration.ts

import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface GenerationProgress {
  currentStep: number;
  totalSteps: number;
  stepName: string;
  elapsedTime: number;
}

export function useAIProposalGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);

  const generate = useCallback(async (data: WizardData) => {
    setIsGenerating(true);
    setProgress({
      currentStep: 1,
      totalSteps: 6,
      stepName: 'Iniciando...',
      elapsedTime: 0,
    });

    try {
      // 1. Inicia geração
      const { sessionId } = await api.post('/ai/proposals/generate', data);

      // 2. Poll para progresso
      const pollInterval = setInterval(async () => {
        const status = await api.get(`/ai/proposals/generate/${sessionId}/status`);

        setProgress(status.progress);

        if (status.status === 'completed') {
          clearInterval(pollInterval);
          setIsGenerating(false);
          return status.result;
        }

        if (status.status === 'failed') {
          clearInterval(pollInterval);
          setIsGenerating(false);
          throw new Error(status.error);
        }
      }, 2000); // Check a cada 2 segundos

    } catch (error) {
      setIsGenerating(false);
      setProgress(null);
      throw error;
    }
  }, []);

  return { generate, isGenerating, progress };
}
```

---

## 📊 Database Schema (Novas Tabelas)

```sql
-- Sessões de geração IA (para tracking e retry)
CREATE TABLE ai_proposal_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  organization_id UUID REFERENCES organizations(id) NOT NULL,

  -- Input do usuário
  client_info JSONB NOT NULL,
  proposal_type VARCHAR(50) NOT NULL,
  project_context TEXT NOT NULL,
  settings JSONB NOT NULL,

  -- Status da geração
  status VARCHAR(20) NOT NULL DEFAULT 'processing', -- processing | completed | failed
  progress JSONB,

  -- Resultado
  generated_proposal_id UUID REFERENCES proposals(id),

  -- Metadados da IA
  ai_model VARCHAR(50),
  tokens_used INTEGER,
  generation_time_ms INTEGER,
  sources_used JSONB, -- Fontes citadas pela IA

  -- Timestamps
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_sessions_user ON ai_proposal_sessions(user_id);
CREATE INDEX idx_ai_sessions_status ON ai_proposal_sessions(status);

-- Chat de ajustes (histórico de conversação)
CREATE TABLE ai_proposal_chat (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID REFERENCES proposals(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,

  -- Mensagem
  role VARCHAR(10) NOT NULL, -- 'user' | 'assistant'
  content TEXT NOT NULL,

  -- Contexto (seção sendo editada, texto selecionado, etc)
  context JSONB,

  -- Resultado da IA (se role = assistant)
  updated_sections VARCHAR(100)[], -- IDs das seções modificadas
  tokens_used INTEGER,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_chat_proposal ON ai_proposal_chat(proposal_id);

-- Versionamento de propostas (snapshots antes de cada ajuste IA)
CREATE TABLE ai_proposal_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID REFERENCES proposals(id) NOT NULL,
  version_number INTEGER NOT NULL,

  -- Snapshot completo
  content JSONB NOT NULL, -- Todas as seções
  markdown TEXT NOT NULL,

  -- Motivo da versão
  change_description TEXT,
  changed_by_user_id UUID REFERENCES users(id),

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_versions_proposal ON ai_proposal_versions(proposal_id);
CREATE UNIQUE INDEX idx_ai_versions_proposal_number ON ai_proposal_versions(proposal_id, version_number);
```

---

## 🎯 Métricas de Sucesso

### KPIs de Adoção

| Métrica | Meta Semana 4 | Meta Mês 3 | Como Medir |
|---------|---------------|------------|------------|
| **Usuários que testam AI Builder** | 60% | 85% | % de usuários ativos que iniciam wizard |
| **Propostas geradas com IA** | 40% | 70% | % de propostas criadas via AI vs. manual |
| **Taxa de conclusão do wizard** | 75% | 85% | % que completa 4 passos e gera proposta |
| **Iterações médias por proposta** | 2-3 | 3-5 | Média de ajustes via chat antes de publicar |
| **Tempo médio de geração** | <90s | <60s | Tempo de wizard completo até proposta pronta |
| **NPS do AI Builder** | >60 | >75 | Pesquisa pós-publicação: "Recomendaria?" |

### KPIs de Qualidade da IA

| Métrica | Meta | Como Medir |
|---------|------|------------|
| **Propostas publicadas sem edição** | 15-25% | % de propostas enviadas ao cliente sem ajustes manuais |
| **Taxa de aprovação client** | 30-40% | % de propostas geradas com IA que cliente aprova (vs. 21% atual) |
| **Seções mais editadas** | Preços (50%), Cronograma (35%) | Heatmap de seções ajustadas via chat |
| **Tokens médios por proposta** | 8.000-12.000 | Média de tokens consumidos (GPT-4o) |
| **Custo médio por proposta** | R$ 0,50-0,80 | Custo OpenAI por geração completa |

### KPIs de Negócio

| Métrica | Meta Mês 3 | Impacto Esperado |
|---------|-----------|------------------|
| **Redução de tempo de criação** | 75% | De 3 horas para 45 minutos |
| **Aumento de propostas enviadas/mês** | +150% | De 15 para 37 propostas/mês por corretor |
| **Conversão Freemium → Standard** | 18% | AI Builder é killer feature para upgrade |
| **Churn reduction** | -30% | Usuários veem valor imediato, renovam |
| **Referral rate** | +40% | "Olha que legal, a IA escreve pra mim!" |

---

## 🚀 Roadmap de Implementação (3 Semanas)

### Semana 1: Wizard + Geração Básica

**Objetivo:** Usuário consegue gerar primeira proposta com IA

**Tarefas:**

**Backend (ORION + NEURA):**
- [ ] Criar tabelas `ai_proposal_sessions`, `ai_proposal_chat`, `ai_proposal_versions`
- [ ] Endpoint `POST /api/v1/ai/proposals/generate` (GPT-4o apenas)
- [ ] Endpoint `GET /api/v1/ai/proposals/generate/:sessionId/status` (polling)
- [ ] Integração OpenAI com streaming
- [ ] Template básico de proposta (12 seções padrão)
- [ ] Parser Markdown → JSON (seções estruturadas)

**Frontend (NOVA):**
- [ ] Página `/ai-builder` (rota protegida)
- [ ] Wizard de 4 passos (form components)
- [ ] Tela de loading com progresso
- [ ] Hook `useAIProposalGeneration` com polling
- [ ] Tratamento de erros e retry

**Testes:**
- [ ] Teste E2E: Preencher wizard → Gerar proposta → Ver resultado
- [ ] Teste de carga: 10 gerações simultâneas
- [ ] Teste de custo: Limitar a 15.000 tokens por proposta

**Entregável:** AI Builder funcional (versão beta sem chat de ajustes)

---

### Semana 2: Editor Interativo + Chat IA

**Objetivo:** Usuário pode revisar e ajustar proposta com IA

**Tarefas:**

**Backend (ORION + NEURA):**
- [ ] Endpoint `POST /api/v1/ai/proposals/:id/chat`
- [ ] Endpoint `PATCH /api/v1/ai/proposals/:id/sections/:sectionId`
- [ ] Sistema de versionamento (snapshot antes de cada ajuste)
- [ ] Detecção de seções modificadas (diff Markdown)
- [ ] Rate limiting (max 20 ajustes por proposta)

**Frontend (NOVA):**
- [ ] Editor split-view (sidebar + preview)
- [ ] Navegação por seções com status visual
- [ ] Chat flutuante com IA
- [ ] Markdown preview com syntax highlighting
- [ ] Quick actions (chips de ações comuns)
- [ ] Diff visual (mostrar o que mudou)

**UX:**
- [ ] Onboarding tooltip: "Peça para a IA ajustar qualquer parte"
- [ ] Exemplos de prompts úteis
- [ ] Atalhos de teclado (Ctrl+K para abrir chat)

**Entregável:** Editor completo com chat de ajustes

---

### Semana 3: Pesquisa Web + GPT-o1 + Publicação

**Objetivo:** IA busca dados reais e usuário publica proposta

**Tarefas:**

**Backend (NEURA + ORION):**
- [ ] Integração Tavily/SerpAPI para pesquisa web
- [ ] Suporte a GPT-o1 (modelo de raciocínio)
- [ ] Endpoint `POST /api/v1/ai/proposals/:id/publish`
- [ ] Geração de PDF com LibreOffice/Puppeteer
- [ ] Email automático ao cliente com link

**Frontend (NOVA):**
- [ ] Toggle "Pesquisar dados de mercado" no wizard
- [ ] Seletor de modelo IA (GPT-4o vs GPT-o1)
- [ ] Modal de publicação com preview de email
- [ ] Agendamento de envio (data/hora futura)
- [ ] Compartilhamento (link público, PDF download)

**Qualidade:**
- [ ] Validação de fontes citadas (checkar se existem)
- [ ] Sanitização de Markdown (prevenir XSS)
- [ ] Watermark "Gerado com IA" em PDF (opcional)

**Analytics:**
- [ ] Tracking de eventos (wizard_started, proposal_generated, section_edited, published)
- [ ] Logging de prompts e respostas (para debugging)
- [ ] Dashboard admin com métricas de uso da IA

**Entregável:** AI Builder completo e em produção

---

## 💰 Impacto no Business Plan

### Alteração de Custos

**Novo Item de Custo: OpenAI API**

| Cenário | Propostas/Mês | Tokens Médios | Custo GPT-4o* | Custo GPT-o1** | Total/Mês |
|---------|---------------|---------------|---------------|----------------|-----------|
| Mês 1 (350 usuários) | 525 | 10.000 | R$ 1.575 | R$ 0 | R$ 1.575 |
| Mês 3 (850 usuários) | 1.275 | 10.000 | R$ 3.825 | R$ 255 | R$ 4.080 |
| Mês 6 (2.100 usuários) | 3.150 | 10.000 | R$ 9.450 | R$ 630 | R$ 10.080 |
| Mês 12 (5.800 usuários) | 8.700 | 10.000 | R$ 26.100 | R$ 1.740 | R$ 27.840 |

_*GPT-4o: $0.005/1K tokens input + $0.015/1K tokens output ≈ R$ 0,10/proposta_
_**GPT-o1: $15/1M tokens input + $60/1M tokens output ≈ R$ 4,00/proposta (Premium only, 20% uso)_

**Margem com AI Builder:**
- Receita adicional (conversões): +R$ 12.000/mês (mês 6)
- Custo OpenAI: -R$ 10.080/mês (mês 6)
- **Margem Líquida:** +R$ 1.920/mês (19% ROI em custo de IA)

**Justificativa:** AI Builder aumenta conversão Freemium → Pago de 15% para 22% (+47%), compensando custo de IA

---

### Atualização de Pricing (Opcional - Mês 3)

**Monetizar AI Builder:**

**Opção A - Incluir no Standard/Premium (Recomendado):**
- Standard (R$ 79): 20 propostas com IA/mês
- Premium (R$ 199): Propostas com IA ilimitadas + GPT-o1

**Opção B - Add-on Separado:**
- AI Builder: +R$ 29/mês (10 propostas com IA)
- AI Builder Pro: +R$ 79/mês (ilimitado + GPT-o1)

**Decisão:** Testar Opção A por 3 meses, migrar para B se custo explodir

---

## 🔄 Integração com Roadmap V2 Existente

### Nova Numeração de Fases

**ANTES:**
- Fase 1: Infraestrutura & Subscriptions (Semanas 1-4)
- Fase 2: Template Designer MVP (Semanas 5-8)
- Fase 3: Template Library (Semanas 9-12)
- Fase 4: Token Marketplace (Semanas 13-14)
- Fase 5: Advanced Features (Semanas 15-16)
- Fase 6: Testing (Semanas 17-18)
- Fase 7: Beta Launch (Semana 19)
- Fase 8: Public Launch (Semana 20)

**DEPOIS (com AI Builder):**

**⭐ Fase 0: AI Proposal Builder (Semanas 1-3) - NOVO**
- Semana 1: Wizard + Geração Básica
- Semana 2: Editor Interativo + Chat IA
- Semana 3: Pesquisa Web + GPT-o1 + Publicação

**Fase 1: Infraestrutura & Subscriptions (Semanas 4-7) - AJUSTADO**
- Database schema (mantém 10 tabelas originais)
- Stripe + Mercado Pago
- Feature gating middleware
- **NOVO:** Contabilizar tokens IA no usage tracking

**Fase 2: Template Designer MVP (Semanas 8-11) - MANTIDO**
- Fabric.js canvas editor
- **INTEGRAÇÃO:** "Importar proposta gerada por IA" para template

**Fase 3: Template Library (Semanas 12-15) - MANTIDO**
- Salvar templates
- **INTEGRAÇÃO:** Templates pré-populam wizard da IA

**Fase 4: Token Marketplace (Semanas 16-17) - MANTIDO**
- Marketplace de tokens
- **INTEGRAÇÃO:** Tokens IA contabilizados aqui também

**Fase 5: Advanced Features (Semanas 18-19) - MANTIDO**

**Fase 6: Testing (Semanas 20-21) - AJUSTADO +1 SEMANA**

**Fase 7: Beta Launch (Semana 22) - AJUSTADO**

**Fase 8: Public Launch (Semana 23) - AJUSTADO**

**Total: 23 semanas** (vs. 20 originais - **+3 semanas** para AI Builder)

---

## ✅ Checklist de Aprovação

Antes de iniciar desenvolvimento, validar:

- [ ] **Aprovação do Founder:** Priorizar AI Builder como Fase 0?
- [ ] **Budget OpenAI:** Aprovar R$ 1.575 - R$ 27.840/mês em custos de IA?
- [ ] **Timeline:** Aceitar +3 semanas no roadmap total (20 → 23 semanas)?
- [ ] **Acesso API OpenAI:** Conta configurada com limites adequados?
- [ ] **Legal:** Termos de uso mencionam "conteúdo gerado por IA"?
- [ ] **UX Research:** Validar wireframes do wizard com 5 corretores beta?
- [ ] **Equipe:** ORION (backend), NOVA (frontend), NEURA (AI) disponíveis?

---

## 📝 Próximos Passos Imediatos

**Se aprovado:**

1. **Dia 1-2:** NEURA cria PoC de integração OpenAI (teste de custos reais)
2. **Dia 3-5:** NOVA cria wireframe navegável (Figma → Vercel preview)
3. **Dia 6-7:** Teste com 10 corretores beta (validação de UX)
4. **Dia 8:** Kickoff oficial da Semana 1 de desenvolvimento

**Documentos a Criar:**
- [ ] Technical Specification Document (TSD) detalhado
- [ ] API Contract (OpenAPI spec)
- [ ] Figma Design System atualizado
- [ ] Test Plan para AI Builder

---

**Autor:** MAESTRO Multi-Agent Orchestrator
**Revisores:** ORION (Backend), NOVA (Frontend), NEURA (AI/ML), ARCHITECT (System Design)
**Data:** Outubro 2025
**Status:** Aguardando Aprovação do Founder

---

*Este adendo substitui a ordem original do roadmap V2, priorizando o AI Proposal Builder como primeira funcionalidade a ser desenvolvida baseado no maior impacto para o usuário e menor risco técnico.*
