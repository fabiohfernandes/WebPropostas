
# Template — Prompt Mestre para Proposta Comercial (PT-BR)

> **Como usar:**  
> 1) Substitua os campos `{{CHAVES}}` com seus dados.  
> 2) Deixe `[[OPCIONAL: ...]]` quando quiser acionar partes extras.  
> 3) Diga “GERAR VERSÃO EXECUTIVA” ou “GERAR VERSÃO COMPLETA” no final.

---

## 0) Instruções de Produção

- **Objetivo:** gerar uma proposta comercial **abrangente, detalhada, inovadora e decisiva**, com linguagem **profissional e comercial**, que **fundamente** o orçamento com **dados de mercado** e **provas** (cases/estatísticas) obtidas por **pesquisa na web**.  
- **Tom & Estilo:** claro, direto, orientado a valor; evite jargão desnecessário; destaque números e benefícios mensuráveis.  
- **Formato de Saída:** Markdown estruturado, com títulos `##` e tabelas.  
- **Citações:** ao usar dados online, **cite a fonte** (nome do veículo/organização e ano).  
- **Resultados esperados:** proposta com **Resumo Executivo, Dor & Oportunidade, Proposta de Valor, Escopo, Modelo de Preço, Tração/Provas, Plano de Implantação, Equipe, Cronograma, Termos Comerciais, Próximos Passos**.

---

## 1) Entrada — Dados do Projeto

**Empresa (proponente)**  
- Nome: {{NOME_DA_EMPRESA_PROPONENTE}}  
- Responsável que envia: {{NOME_DO_REMETENTE}} – cargo: {{CARGO}}  
- Contatos: {{EMAIL}} | {{TELEFONE}} | {{WHATSAPP/TELEGRAM}} | site: {{WEBSITE}} | endereço: {{ENDERECO}}  
- Produto/linha: {{PRODUTO}}  
- Objeto desta proposta: {{OBJETO}}  
- Escopo macro: {{ESCOPO_MACRO}}  
- Mercado-alvo a atingir: {{MERCADO_ALVO}}  
- Forma de pagamento: {{FORMA_DE_PAGAMENTO}}  
- Valor estimado (se já houver): {{VALOR_ESTIMADO}}

**Cliente (contratante)**  
- Nome da empresa/cliente: {{CLIENTE_NOME}}  
- Responsável: {{CLIENTE_RESPONSAVEL}} – cargo: {{CARGO}}  
- Área de atuação: {{AREA_ATUACAO}}  
- Website: {{CLIENTE_WEBSITE}}  
- Principais dores: {{PRINCIPAIS_DORES}}  
- Motivo do contato: {{MOTIVO_DO_CONTATO}}  
- Objetivos esperados: {{OBJETIVOS_ESPERADOS}}  
- Prazos estipulados: {{PRAZOS}}

---

## 2) Parâmetros de Pesquisa & Personalização

- **Pesquisar na web?** SIM  
- **Âmbito da pesquisa:** dados de mercado do setor de {{SETOR}}, tamanho de mercado (TAM/SAM/SOM), tendências recentes (últimos 12–24 meses), benchmarks de performance, estudos de caso comparáveis no Brasil e exterior, métricas de ROI e payback.  
- **Cruzamento com o cliente:** identificar como as tendências do setor impactam {{CLIENTE_NOME}} e como a proposta captura oportunidades ou mitiga riscos.  
- **Geografia foco:** {{PAÍS/REGIÃO}}  
- **Período de dados:** preferência por 2023–{{ANO_ATUAL}}.  
- **Incluir provas:** estatísticas com fonte, cases (nome, resultado, métrica), prêmios/certificações relevantes.  
- **Privacidade:** não incluir dados sensíveis do cliente; usar somente informações públicas ou fornecidas acima.

---

## 3) Estrutura Essencial da Proposta (saída esperada)

### 3.1 Resumo Executivo (1 página)
- **Problema → Solução → Impacto (em números).**  
- **Oferta:** o que entregamos, para quem e por quanto (faixa/estrutura).  
- **Pedido (CTA):** condições, próximo passo (ex.: agendar kick-off, assinatura).

### 3.2 Dor do Cliente & Oportunidade
- **Contexto e urgência:** dados de mercado + benchmarks atuais.  
- **Quem sofre a dor (personas/segmentos)** e **custo de não agir**.  
- **Janela de oportunidade** (por que agora).

### 3.3 Proposta de Valor Clara
- **Benefícios mensuráveis:** ↑ receita, ↓ custo, ↓ risco, ↑ velocidade/time-to-value.  
- **3 diferenciais** que realmente importam para {{CLIENTE_NOME}} com mini-provas.

### 3.4 Produto/Serviço
- **Incluso:** escopo, entregáveis, limites.  
- **Como funciona:** fluxo simples, cronograma macro, dependências do cliente.  
- **Tabela de entregáveis (exemplo):**

| Entregável | Descrição | Critérios de Aceite | Responsável | Prazo |
|---|---|---|---|---|

### 3.5 Modelo de Precificação
- **Estrutura:** {{FIXO / VARIÁVEL / ASSINATURA / HÍBRIDO}}.  
- **Incluso vs. adicional**, **premissas** e **SLAs**.  
- **Tabela de preços (exemplo):**

| Item | Quantidade/Unidade | Preço Unit. | Subtotal | Observações |
|---|---|---:|---:|---|

### 3.6 Tração & Provas
- **Estudos de caso**, **depoimentos**, **métricas (ROI, NPS, payback)**.  
- **Demonstrações/PoCs**, **certificações**, **prêmios**.

### 3.7 Go-to-Market & Implantação
- **Plano de adoção**, onboarding, capacitação, materiais de enablement.  
- **Suporte & Atendimento** (canais, tempos, escalonamento).

### 3.8 Riscos Operacionais & Mitigação
- Segurança, continuidade, backups, compliance (ex.: LGPD).  
- **Tabela de riscos (exemplo):**

| Risco | Prob. | Impacto | Mitigação | Plano de Contingência |
|---|---:|---:|---|---|

### 3.9 Equipe & Governança
- Quem faz o quê, experiências relevantes, parceiros críticos.  
- Papéis e responsabilidades (RACI simplificado).

### 3.10 Cronograma & Marcos (Roadmap)
- **Fases, entregas, critérios de aceite** por fase.  
- **Linha do tempo (datas e checkpoints).**  
- **Tabela (exemplo):**

| Fase | Entregas | Duração | Início | Fim | Critérios de Aceite |
|---|---|---:|---|---|---|

### 3.11 Termos Comerciais
- **Preço**, impostos, condições de pagamento, reajuste.  
- **Vigência**, garantias, confidencialidade, **propriedade intelectual**.  
- [[OPCIONAL: cláusulas de saída / rescisão, multas e SLA detalhado]]

### 3.12 Próximos Passos
- Reunião de kick-off, assinatura, pagamento inicial, acesso a dados.  
- Ponto focal, prazos imediatos e checklists de início.

---

## 4) Brainstorming (para enriquecer a proposta)

- **Ideia principal:** {{IDEIA_PRINCIPAL}}  
- **Descrição:** {{DESCRICAO_DA_IDEA}}  
- **Soluções propostas:** {{LISTA_DE_SOLUCOES}}  
- **Dores sanadas:** {{DORES_SANADAS}}

---

## 5) Regras de Escrita & Enfoque de Valor

- Conectar cada feature a um **resultado de negócio** (métrica).  
- Sempre que possível, **quantificar** (ex.: “redução de 15–25% no CAC”).  
- Evitar promessas vagas; usar **faixas com base em benchmarks**.  
- Destacar **TCO** (custo total de propriedade) e **payback** estimado.  
- Incluir **chamada de ação clara** e **timeline** realista.

---

## 6) Blocos de Tabelas (modelos prontos)

**6.1 Premissas & Dependências do Cliente**

| Premissa/Dependência | Responsável | Impacto se ausente | Prazo |
|---|---|---|---|

**6.2 SLA (exemplo)**

| Métrica | Padrão | Janela | Procedimento de Escalonamento |
|---|---|---|---|

**6.3 Indicadores de Sucesso**

| KPI | Linha de Base | Meta 90 dias | Meta 180 dias |
|---|---:|---:|---:|

---

## 7) Variante de Entrega

- **GERAR VERSÃO EXECUTIVA (2–4 páginas):** manter 3.1 a 3.5 + 3.10 + 3.12.  
- **GERAR VERSÃO COMPLETA (detalhada):** incluir todas as seções 3.1–3.12 + anexos.

---

## 8) Fechamento (modelo pronto)

**Conclusão**  
Reforçar alinhamento com objetivos de {{CLIENTE_NOME}}, retorno esperado e próximos passos.

**Agradecimentos**  
Agradecemos a oportunidade e permanecemos à disposição para esclarecimentos.

**Disponibilidade**  
{{JANELA_DE_DISPONIBILIDADE}} | Contatos: {{EMAIL}} | {{TELEFONE}} | {{WHATSAPP/TELEGRAM}} | {{WEBSITE}}

**Assinatura**  
{{NOME_DO_REMETENTE}} – {{CARGO}} — {{NOME_DA_EMPRESA_PROPONENTE}}  
Local e data: {{CIDADE}}, {{DATA_COMPLETA}}

---

# Prompt de Execução (copiar-colar)

> **Cole TUDO abaixo em uma única mensagem para gerar a proposta.**

```
Me ajude a criar uma PROPOSTA COMERCIAL, seguindo fielmente as instruções:

[ESTILO & FORMATO]
- Linguagem profissional e comercial, com foco em valor de negócio.
- Saída em Markdown com títulos e tabelas.
- Use bullets claros, métricas e faixas numéricas quando couber.
- Cite fontes ao usar dados externos (nome do veículo/organização + ano).

[PESQUISA NA WEB]
- Pesquise dados recentes (2023–{{ANO_ATUAL}}) sobre o setor de {{SETOR}} e o mercado de {{PAÍS/REGIÃO}}.
- Recolha: tamanho de mercado, tendências, benchmarks operacionais, cases comparáveis (Brasil e internacional), métricas típicas de ROI e payback.
- Conecte cada dado ao contexto de {{CLIENTE_NOME}} (implicações práticas).
- Inclua até 3–6 referências com breve identificação (sem links brutos).

[ENTRADA – DADOS]
Empresa (proponente)
- Nome: {{NOME_DA_EMPRESA_PROPONENTE}}
- Responsável: {{NOME_DO_REMETENTE}} – {{CARGO}}
- Contatos: {{EMAIL}} | {{TELEFONE}} | {{WHATSAPP/TELEGRAM}} | {{WEBSITE}} | {{ENDERECO}}
- Produto/linha: {{PRODUTO}}
- Objeto: {{OBJETO}}
- Escopo macro: {{ESCOPO_MACRO}}
- Mercado-alvo: {{MERCADO_ALVO}}
- Pagamento: {{FORMA_DE_PAGAMENTO}}
- Valor estimado: {{VALOR_ESTIMADO}}

Cliente (contratante)
- Nome: {{CLIENTE_NOME}}
- Responsável: {{CLIENTE_RESPONSAVEL}} – {{CARGO}}
- Atuação: {{AREA_ATUACAO}}
- Site: {{CLIENTE_WEBSITE}}
- Dores: {{PRINCIPAIS_DORES}}
- Motivo: {{MOTIVO_DO_CONTATO}}
- Objetivos: {{OBJETIVOS_ESPERADOS}}
- Prazos: {{PRAZOS}}

[ESTRUTURA OBRIGATÓRIA]
3.1 Resumo Executivo (1 página)
3.2 Dor do Cliente & Oportunidade
3.3 Proposta de Valor (benefícios mensuráveis + 3 diferenciais)
3.4 Produto/Serviço (escopo, entregáveis, limites, fluxo, dependências)
3.5 Modelo de Precificação (estrutura + incluso vs. adicional + premissas + SLAs)
3.6 Tração & Provas (cases, depoimentos, ROI/NPS/payback, prêmios)
3.7 Go-to-Market & Implantação (adoção, onboarding, capacitação, suporte)
3.8 Riscos & Mitigação (segurança, backup, continuidade, compliance)
3.9 Equipe & Governança (papéis, responsabilidades, parceiros)
3.10 Cronograma & Marcos (fases, critérios de aceite, timeline)
3.11 Termos Comerciais (preço, impostos, pagamento, reajuste, vigência, garantias, confidencialidade, PI)
3.12 Próximos Passos (kick-off, assinatura, pagamento inicial, acessos)

[BLOCOS DE TABELAS – INCLUIR]
- Entregáveis | Critérios de Aceite | Responsáveis | Prazos
- Preços (itens, unidades, subtotal, observações)
- Riscos (probabilidade, impacto, mitigação, contingência)
- KPIs (linha de base, meta 90/180 dias)

[CHECKLIST DE QUALIDADE – VALIDAR]
- Cada benefício está ligado a uma métrica de negócio?
- Existem números (faixas) que ilustrem ROI/payback/TCO?
- Premissas e limites do escopo estão claros?
- Prazos e critérios de aceite são verificáveis?
- Próximo passo (CTA) explícito?

[VARIANTE DE SAÍDA]
- GERAR VERSÃO: {{EXECUTIVA ou COMPLETA}}
```

---

## Checklist Final (antes de enviar ao cliente)

- [ ] Resumo Executivo cabe em 1 página e é autoexplicativo.  
- [ ] Dores do cliente foram reescritas em **linguagem de impacto** (custo de não agir).  
- [ ] Proposta de Valor traz **números** (faixas realistas) e **3 diferenciais** relevantes.  
- [ ] Escopo e limites estão claros; há **critérios de aceite** por entregável/fase.  
- [ ] Preços mostram **o que inclui** e **o que é adicional**; SLAs listados.  
- [ ] Cronograma tem datas, marcos e responsáveis.  
- [ ] Riscos e mitigação foram mapeados (inclusive segurança/continuidade).  
- [ ] Termos comerciais (impostos, reajuste, vigência, PI) constam explicitamente.  
- [ ] CTA (próximos passos) está visível e simples de executar em 48–72h.  
