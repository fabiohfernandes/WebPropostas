/**
 * AI Proposal Generator Service
 *
 * Handles AI-powered proposal generation using OpenAI GPT-4o and GPT-o1
 * Integrates with proposal template and web search for market data
 *
 * @module services/AIProposalGenerator
 * @requires openai
 */

const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');

class AIProposalGenerator {
  constructor() {
    // Initialize OpenAI client
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Template cache
    this.templateCache = null;

    // Progress callbacks storage
    this.progressCallbacks = new Map();
  }

  /**
   * Load proposal template from file system
   */
  async loadTemplate() {
    if (this.templateCache) return this.templateCache;

    try {
      const templatePath = path.join(__dirname, '../../templates/proposal-template.md');
      this.templateCache = await fs.readFile(templatePath, 'utf-8');
      return this.templateCache;
    } catch (error) {
      console.warn('Template file not found, using default template');
      return this.getDefaultTemplate();
    }
  }

  /**
   * Default template if file not found
   */
  getDefaultTemplate() {
    return `# Proposta Comercial

## 1. Resumo Executivo
## 2. Dor do Cliente & Oportunidade
## 3. Proposta de Valor
## 4. Produto/Serviço
## 5. Modelo de Precificação
## 6. Tração & Provas
## 7. Go-to-Market & Implantação
## 8. Riscos & Mitigação
## 9. Equipe & Governança
## 10. Cronograma & Marcos
## 11. Termos Comerciais
## 12. Próximos Passos`;
  }

  /**
   * Build system prompt for OpenAI
   */
  buildSystemPrompt(settings) {
    const toneMap = {
      'formal': 'extremamente formal e corporativo, adequado para grandes empresas e executivos C-level',
      'profissional': 'profissional e direto ao ponto, equilibrando formalidade com clareza',
      'amigavel': 'amigável e consultivo, construindo relacionamento enquanto mantém profissionalismo'
    };

    const tone = toneMap[settings.tone] || toneMap['profissional'];
    const detailLevel = settings.detail === 'executivo' ? 'concisa (2-4 páginas)' : 'completa e detalhada (8-12 páginas)';

    return `Você é um especialista sênior em redação de propostas comerciais brasileiras com 15+ anos de experiência.

SEU OBJETIVO:
Gerar uma proposta comercial ${detailLevel} em formato Markdown, com tom ${tone}.

ESTRUTURA OBRIGATÓRIA (em ordem):
## 1. Resumo Executivo
- Problema → Solução → Impacto (em números)
- Oferta clara e pedido (CTA)

## 2. Dor do Cliente & Oportunidade
- Contexto de mercado com dados atuais
- Custo de não agir
- Janela de oportunidade (por que agora)

## 3. Proposta de Valor Clara
- 3-5 benefícios mensuráveis (use números: ↑ X%, ↓ Y%)
- 3 diferenciais que importam

## 4. Produto/Serviço
- Escopo detalhado, entregáveis, limites
- Tabela de entregáveis com critérios de aceite

## 5. Modelo de Precificação
- Estrutura clara (fixo/variável/assinatura)
- Tabela de preços detalhada
- O que está incluso vs. adicional

## 6. Tração & Provas
- Cases, depoimentos, métricas (ROI, NPS, payback)
- Certificações, prêmios

## 7. Go-to-Market & Implantação
- Plano de adoção, onboarding
- Suporte e atendimento

## 8. Riscos Operacionais & Mitigação
- Tabela de riscos (probabilidade, impacto, mitigação)
- Segurança, continuidade, compliance (LGPD)

## 9. Equipe & Governança
- Papéis, responsabilidades, experiências

## 10. Cronograma & Marcos
- Tabela de fases com datas e critérios de aceite

## 11. Termos Comerciais
- Preço, impostos, pagamento, reajuste
- Vigência, garantias, confidencialidade, propriedade intelectual

## 12. Próximos Passos
- Kick-off, assinatura, acessos
- Ponto focal e timeline

REGRAS CRÍTICAS:
✅ Use APENAS Markdown (##, ###, tabelas, bullets, **bold**)
✅ Quantifique TUDO (use faixas: "15-25%", "R$ 50k-80k")
✅ Cite fontes de dados externos: "Segundo CBIC (2024)..."
✅ Evite jargão desnecessário; priorize CLAREZA
✅ Cada feature deve ter resultado de negócio (métrica)
✅ Use tabelas para: preços, cronograma, riscos, entregáveis
✅ Inclua CTAs claros em cada seção

FORMATO DE TABELAS (exemplo):
| Item | Descrição | Quantidade | Preço Unit. | Subtotal |
|------|-----------|------------|-------------|----------|
| ... | ... | ... | R$ ... | R$ ... |

NUNCA:
❌ Deixe seções vazias ou genéricas
❌ Use "a ser definido", "conforme demanda"
❌ Prometa sem quantificar ("aumentar vendas" → "↑ 25-40% vendas")
❌ Esqueça de citar fontes de dados de mercado

MERCADO BRASILEIRO:
- Use Real brasileiro (R$) em todos os valores
- Considere LGPD em riscos/compliance
- Formas de pagamento: PIX, boleto, cartão
- Impostos: mencione se inclui ou não ISS/ICMS`;
  }

  /**
   * Build user prompt with client data
   */
  buildUserPrompt(clientInfo, proposalType, projectContext, marketData) {
    let prompt = `GERE UMA PROPOSTA COMERCIAL COMPLETA:

===== INFORMAÇÕES DO CLIENTE =====
Empresa: ${clientInfo.companyName}
Contato: ${clientInfo.contactName}
Email: ${clientInfo.email}
Telefone: ${clientInfo.phone || 'Não informado'}
Setor de Atuação: ${clientInfo.sector}

===== TIPO DE PROPOSTA =====
${this.getProposalTypeDescription(proposalType)}

===== CONTEXTO DO PROJETO =====
${projectContext}

`;

    // Add market data if available
    if (marketData && marketData.summary) {
      prompt += `===== DADOS DE MERCADO (use para fundamentar a proposta) =====
${marketData.summary}

Fontes para citar:
${marketData.sources.map(s => `- ${s.title} (${s.publisher}, ${s.year})`).join('\n')}

`;
    }

    prompt += `===== INSTRUÇÕES FINAIS =====
GERE AGORA a proposta comercial COMPLETA em Markdown, seguindo rigorosamente a estrutura de 12 seções.

IMPORTANTE:
- Conecte os dados de mercado ao contexto de ${clientInfo.companyName}
- Use números e faixas realistas baseados no setor de ${clientInfo.sector}
- Seja específico nos entregáveis e prazos
- Inclua tabelas em TODAS as seções que precisam (preços, cronograma, riscos)`;

    return prompt;
  }

  /**
   * Get proposal type description
   */
  getProposalTypeDescription(type) {
    const descriptions = {
      'venda-imovel': 'Proposta de Venda de Imóvel - Apresentar imóvel para potencial comprador/investidor',
      'servico': 'Proposta de Prestação de Serviço - Oferecer serviço profissional/consultoria',
      'parceria': 'Proposta de Parceria Comercial - Joint venture, co-marketing, distribuição',
      'investimento': 'Proposta de Captação de Investimento - Pitch para investidores/fundos'
    };

    return descriptions[type] || 'Proposta Comercial Geral';
  }

  /**
   * Generate proposal using OpenAI
   *
   * @param {Object} params - Generation parameters
   * @param {string} sessionId - Session ID for progress tracking
   * @param {Function} onProgress - Callback for progress updates
   */
  async generate(params, sessionId, onProgress = null) {
    const { clientInfo, proposalType, projectContext, settings, marketData } = params;

    // Store progress callback
    if (onProgress) {
      this.progressCallbacks.set(sessionId, onProgress);
    }

    try {
      // Select model
      const model = settings.aiModel === 'gpt-o1' ? 'o1-preview' : 'gpt-4o';

      // Build prompts
      const systemPrompt = this.buildSystemPrompt(settings);
      const userPrompt = this.buildUserPrompt(clientInfo, proposalType, projectContext, marketData);

      // Report progress
      this.reportProgress(sessionId, 1, 6, 'Analisando informações fornecidas', 0);

      // Call OpenAI with streaming
      const stream = await this.openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: model === 'o1-preview' ? 32000 : 16000,
      });

      let fullResponse = '';
      let currentSection = '';
      let sectionCount = 0;
      const startTime = Date.now();

      // Process stream
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;

        // Detect section changes for progress updates
        if (content.includes('##')) {
          const match = content.match(/##\s+\d+\.\s+(.*)/);
          if (match) {
            sectionCount++;
            currentSection = match[1];

            // Map section to step (1-6 steps mapped to 12 sections)
            const step = Math.min(6, Math.floor(sectionCount / 2) + 1);
            const elapsed = Math.floor((Date.now() - startTime) / 1000);

            this.reportProgress(sessionId, step, 6, `Gerando: ${currentSection}`, elapsed);
          }
        }
      }

      const totalTime = Date.now() - startTime;

      // Parse markdown into structured sections
      const sections = this.parseMarkdownToSections(fullResponse);

      // Extract metadata (sources, stats, etc)
      const metadata = this.extractMetadata(fullResponse, marketData);

      // Estimate tokens (rough approximation)
      const tokensUsed = this.estimateTokens(systemPrompt + userPrompt + fullResponse);

      // Final progress
      this.reportProgress(sessionId, 6, 6, 'Proposta gerada com sucesso!', Math.floor(totalTime / 1000));

      return {
        markdown: fullResponse,
        sections,
        metadata,
        tokensUsed,
        generationTimeMs: totalTime,
        aiModel: model,
      };

    } catch (error) {
      console.error('Error generating proposal:', error);

      // Report error via progress
      this.reportProgress(sessionId, 0, 6, `Erro: ${error.message}`, 0);

      throw error;
    } finally {
      // Cleanup progress callback
      this.progressCallbacks.delete(sessionId);
    }
  }

  /**
   * Report progress to callback
   */
  reportProgress(sessionId, currentStep, totalSteps, stepName, elapsedTime) {
    const callback = this.progressCallbacks.get(sessionId);
    if (callback) {
      callback({
        currentStep,
        totalSteps,
        stepName,
        elapsedTime,
      });
    }
  }

  /**
   * Parse markdown into structured sections
   */
  parseMarkdownToSections(markdown) {
    const sections = [];
    const sectionRegex = /^##\s+(\d+)\.\s+(.+)$/gm;

    let match;
    let lastIndex = 0;

    while ((match = sectionRegex.exec(markdown)) !== null) {
      if (lastIndex > 0) {
        // Extract content of previous section
        const content = markdown.substring(lastIndex, match.index).trim();
        sections[sections.length - 1].content = content;
      }

      sections.push({
        id: `section-${match[1]}`,
        number: parseInt(match[1]),
        title: match[2],
        content: '',
      });

      lastIndex = sectionRegex.lastIndex;
    }

    // Last section
    if (sections.length > 0 && lastIndex > 0) {
      sections[sections.length - 1].content = markdown.substring(lastIndex).trim();
    }

    return sections;
  }

  /**
   * Extract metadata (sources, stats, tables)
   */
  extractMetadata(markdown, marketData) {
    const metadata = {
      sourcesUsed: [],
      tablesCount: 0,
      statsCount: 0,
    };

    // Extract sources from markdown (citations like "Segundo CBIC (2024)")
    const citationRegex = /Segundo\s+([^(]+)\s+\((\d{4})\)/gi;
    let match;
    const citedSources = new Set();

    while ((match = citationRegex.exec(markdown)) !== null) {
      citedSources.add(`${match[1].trim()} (${match[2]})`);
    }

    metadata.sourcesUsed = Array.from(citedSources);

    // Add market data sources if used
    if (marketData && marketData.sources) {
      marketData.sources.forEach(source => {
        metadata.sourcesUsed.push(`${source.title} (${source.publisher}, ${source.year})`);
      });
    }

    // Count tables
    const tableRegex = /^\|.+\|$/gm;
    metadata.tablesCount = (markdown.match(tableRegex) || []).length / 3; // Rough estimate (header + separator + rows)

    // Count statistics (numbers with %, R$, etc)
    const statsRegex = /(\d+[.,]?\d*\s*(%|R\$|mil|milhões?|bilhões?))/gi;
    metadata.statsCount = (markdown.match(statsRegex) || []).length;

    return metadata;
  }

  /**
   * Estimate tokens used (rough approximation)
   */
  estimateTokens(text) {
    // Rough estimate: 1 token ≈ 4 characters in Portuguese
    return Math.ceil(text.length / 4);
  }

  /**
   * Chat-based refinement of proposal sections
   */
  async chat(proposalMarkdown, userMessage, context = {}) {
    try {
      const messages = [
        {
          role: 'system',
          content: `Você é um assistente especializado em melhorar propostas comerciais.

CONTEXTO: O usuário tem uma proposta em Markdown e quer fazer ajustes.

QUANDO O USUÁRIO PEDIR MUDANÇAS:
1. Identifique qual seção precisa ser alterada
2. Retorne APENAS a seção modificada em Markdown
3. Preceda a seção com: UPDATED_SECTION: [número]. [nome da seção]

EXEMPLO DE RESPOSTA:
UPDATED_SECTION: 5. Modelo de Precificação

## 5. Modelo de Precificação

[conteúdo modificado aqui em Markdown]

REGRAS:
- Mantenha o tom e estilo da proposta original
- Se o usuário pedir "mais detalhes", expanda sem mudar o sentido
- Se pedir "mais formal/informal", ajuste o tom
- Se pedir "adicionar dados", pesquise mentalmente e adicione com fonte
- SEMPRE retorne Markdown válido`
        },
        {
          role: 'user',
          content: `Proposta atual:\n\n${proposalMarkdown}\n\n---\n\nUsuário pediu: ${userMessage}`
        }
      ];

      // Add context if available
      if (context.selectedText) {
        messages.push({
          role: 'user',
          content: `Texto selecionado pelo usuário: "${context.selectedText}"`
        });
      }

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 4000,
      });

      const aiResponse = response.choices[0].message.content;

      // Extract updated sections
      const updatedSections = this.extractUpdatedSections(aiResponse);

      return {
        message: aiResponse,
        updatedSections,
        tokensUsed: response.usage?.total_tokens || 0,
      };

    } catch (error) {
      console.error('Error in AI chat:', error);
      throw error;
    }
  }

  /**
   * Extract updated sections from AI response
   */
  extractUpdatedSections(aiResponse) {
    const sections = [];
    const regex = /UPDATED_SECTION:\s*(\d+)\.\s*(.+?)\n([\s\S]+?)(?=UPDATED_SECTION:|$)/g;

    let match;
    while ((match = regex.exec(aiResponse)) !== null) {
      sections.push({
        number: parseInt(match[1]),
        title: match[2].trim(),
        content: match[3].trim(),
      });
    }

    return sections;
  }
}

module.exports = new AIProposalGenerator();
