# Guia de Gerenciamento de Clientes

**Versão:** 2.0.0
**Última Atualização:** Outubro 2025

## 📋 Índice

1. [Introdução](#introdução)
2. [Cadastrando Clientes](#cadastrando-clientes)
3. [Organizando Clientes](#organizando-clientes)
4. [Importação em Massa](#importação-em-massa)
5. [Integração com CRM](#integração-com-crm)
6. [Conformidade LGPD](#conformidade-lgpd)
7. [Melhores Práticas](#melhores-práticas)

---

## 1. Introdução

O módulo de Clientes do WebPropostas foi projetado para ser simples, mas poderoso. Ele permite gerenciar todos os seus contatos de forma organizada, com conformidade total com a LGPD.

### 1.1 Recursos Principais

- ✅ Cadastro completo com validação de CPF/CNPJ
- ✅ Validação automática de CEP (ViaCEP)
- ✅ Histórico completo de propostas por cliente
- ✅ Tags e categorização personalizada
- ✅ Importação em massa via Excel/CSV
- ✅ Exportação de dados (LGPD compliance)
- ✅ Busca inteligente e filtros avançados

---

## 2. Cadastrando Clientes

### 2.1 Criando Cliente Manualmente

**Passo 1:** Acesse Clientes no menu lateral

**Passo 2:** Clique em **"+ Novo Cliente"**

**Passo 3:** Preencha o formulário completo:

#### Informações Básicas (Obrigatórias)

```
Nome/Razão Social: ___________________________________
Email:            ___________________________________
Telefone:         (__)_____-____
```

**Validações Automáticas:**
- Email: formato válido e único no sistema
- Telefone: formato brasileiro com DDD

#### Documento (Obrigatório)

Escolha o tipo de documento:

**Para Pessoa Física (CPF):**
```
Tipo: [●] CPF [ ] CNPJ
CPF:  ___.___.___-__

Exemplo: 123.456.789-01
```

**Para Pessoa Jurídica (CNPJ):**
```
Tipo: [ ] CPF [●] CNPJ
CNPJ: __.___.___/____-__

Exemplo: 12.345.678/0001-90
```

> 💡 **Dica:** O sistema valida automaticamente CPF/CNPJ usando algoritmo oficial da Receita Federal.

#### Informações da Empresa (Opcional)

```
Nome da Empresa:     ___________________________________
Cargo/Posição:       ___________________________________
Website:             ___________________________________
```

#### Endereço Completo (Opcional mas Recomendado)

```
CEP:                 _____-___   [🔍 Buscar]
Rua:                 ___________________________________
Número:              _______
Complemento:         ___________________________________
Bairro:              ___________________________________
Cidade:              ___________________________________
Estado:              __  [Lista suspensa com UFs]
```

**Busca Automática por CEP:**
1. Digite o CEP
2. Clique em **"Buscar"** 🔍
3. Sistema preenche automaticamente: rua, bairro, cidade e estado
4. Você só precisa informar número e complemento

#### Observações e Tags

```
Observações Internas:
┌────────────────────────────────────────────────┐
│ Cliente VIP - Prioridade em atendimento       │
│ Preferência de contato: WhatsApp             │
│ Melhor horário: 14h-18h                       │
└────────────────────────────────────────────────┘

Tags: [VIP] [Recorrente] [Tech] [+ Adicionar Tag]
```

**Passo 4:** Clique em **"Salvar Cliente"**

### 2.2 Exemplo Completo Preenchido

```json
{
  "tipo": "Pessoa Jurídica",
  "razao_social": "Tech Innovations Ltda",
  "email": "contato@techinnovations.com.br",
  "telefone": "(11) 98765-4321",
  "cnpj": "12.345.678/0001-90",

  "empresa": {
    "nome_fantasia": "Tech Innovations",
    "website": "https://techinnovations.com.br"
  },

  "endereco": {
    "cep": "01310-100",
    "rua": "Avenida Paulista",
    "numero": "1578",
    "complemento": "Conjunto 501",
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "estado": "SP"
  },

  "observacoes": "Cliente desde 2024. Prefere contato via WhatsApp.",
  "tags": ["VIP", "Tecnologia", "Recorrente"]
}
```

---

## 3. Organizando Clientes

### 3.1 Sistema de Tags

Tags ajudam a categorizar e encontrar clientes rapidamente.

**Tags Sugeridas:**

**Por Prioridade:**
- 🔴 `VIP` - Clientes de alta prioridade
- 🟡 `Importante` - Clientes relevantes
- 🟢 `Regular` - Clientes padrão

**Por Setor:**
- `Tecnologia` - Empresas de tech
- `Varejo` - Lojas e e-commerce
- `Serviços` - Empresas de serviços
- `Indústria` - Setor industrial
- `Educação` - Escolas, universidades

**Por Status:**
- `Ativo` - Cliente com propostas ativas
- `Inativo` - Sem propostas nos últimos 6 meses
- `Prospecto` - Ainda não fechou negócio
- `Cliente` - Já fechou alguma proposta

**Por Região:**
- `SP` - São Paulo
- `RJ` - Rio de Janeiro
- `SC` - Santa Catarina
- etc.

**Criando Nova Tag:**

1. Na tela de clientes, clique em **"Gerenciar Tags"**
2. Clique em **"+ Nova Tag"**
3. Defina:
   - Nome da tag
   - Cor (para identificação visual)
   - Descrição (opcional)
4. Clique em **"Criar"**

### 3.2 Busca e Filtros Avançados

**Barra de Busca Inteligente:**

```
🔍 [Buscar por nome, email, empresa, documento...]
```

A busca procura em:
- Nome/Razão Social
- Email
- Nome da Empresa
- CPF/CNPJ
- Telefone
- Cidade
- Tags

**Filtros Laterais:**

```
┌─────────────────────────┐
│ FILTROS                 │
├─────────────────────────┤
│ Tipo de Documento       │
│ [ ] CPF                 │
│ [ ] CNPJ                │
│                         │
│ Tags                    │
│ [ ] VIP                 │
│ [ ] Tecnologia          │
│ [ ] Ativo               │
│ [Ver todas...]          │
│                         │
│ Localização             │
│ Estado: [Todos ▼]      │
│ Cidade: [Todas ▼]      │
│                         │
│ Status de Propostas     │
│ [ ] Com proposta ativa  │
│ [ ] Sem propostas       │
│ [ ] Arquivados          │
│                         │
│ [Limpar Filtros]        │
└─────────────────────────┘
```

**Exemplos de Busca:**

| Busca                    | Resultado                                    |
|--------------------------|---------------------------------------------|
| `Tech`                   | Todos com "Tech" no nome ou empresa         |
| `@gmail.com`             | Todos com email do Gmail                    |
| `11 9`                   | Todos com telefone DDD 11                   |
| `São Paulo`              | Todos da cidade de São Paulo                |
| `tag:VIP`                | Todos com a tag VIP                         |
| `12.345.678`             | Busca por documento parcial                 |

### 3.3 Visualizações Personalizadas

**Modo Lista (Padrão):**
```
┌────────────────────────────────────────────────────────────────────┐
│ Nome/Empresa          Email                Telefone        Tags    │
├────────────────────────────────────────────────────────────────────┤
│ Tech Innovations      contato@tech.com     (11) 98765-4321 [VIP]  │
│ StartupXYZ           startup@xyz.com       (11) 91234-5678 [Tech] │
│ Empresa ABC Ltda     abc@empresa.com       (21) 99999-8888 [VIP]  │
└────────────────────────────────────────────────────────────────────┘
```

**Modo Cards:**
```
┌──────────────────────┐  ┌──────────────────────┐
│ Tech Innovations     │  │ StartupXYZ          │
│ [VIP] [Tecnologia]   │  │ [Tech] [Prospecto]  │
│                      │  │                      │
│ 📧 contato@tech.com  │  │ 📧 startup@xyz.com  │
│ 📱 (11) 98765-4321   │  │ 📱 (11) 91234-5678  │
│ 📊 5 propostas       │  │ 📊 2 propostas      │
│                      │  │                      │
│ [Ver Detalhes]       │  │ [Ver Detalhes]      │
└──────────────────────┘  └──────────────────────┘
```

**Alternar Visualização:**
Clique nos ícones no canto superior direito: `[≡ Lista]` `[▦ Cards]`

---

## 4. Importação em Massa

### 4.1 Preparando Planilha

**Passo 1:** Baixe o modelo Excel

1. Na tela de Clientes, clique em **"Importar"**
2. Clique em **"Baixar Modelo"**
3. Arquivo `modelo-importacao-clientes.xlsx` será baixado

**Passo 2:** Preencha a Planilha

| nome                | email              | telefone       | documento_tipo | documento          | empresa          | cep       | cidade      | estado | tags          |
|---------------------|--------------------|----------------|----------------|--------------------|------------------|-----------|-------------|--------|---------------|
| Tech Innovations    | tech@example.com   | 11987654321    | CNPJ           | 12345678000190     | Tech Innovations | 01310100  | São Paulo   | SP     | VIP,Tech      |
| João Silva          | joao@example.com   | 11912345678    | CPF            | 12345678901        | Consultoria JS   | 04567000  | São Paulo   | SP     | Consultoria   |
| Empresa ABC         | abc@example.com    | 21999998888    | CNPJ           | 98765432000145     | Empresa ABC      | 20040020  | Rio de Janeiro | RJ  | VIP,Varejo    |

**Regras de Preenchimento:**

- **nome:** Obrigatório. Nome completo ou razão social
- **email:** Obrigatório. Email válido e único
- **telefone:** Somente números, com DDD (11987654321)
- **documento_tipo:** "CPF" ou "CNPJ"
- **documento:** Somente números (sem pontos, traços)
- **cep:** Somente números (01310100)
- **tags:** Separadas por vírgula (VIP,Tech,Ativo)

**Passo 3:** Faça o Upload

1. Clique em **"Selecionar Arquivo"**
2. Escolha sua planilha preenchida
3. Clique em **"Iniciar Importação"**

### 4.2 Processo de Importação

**Validação Automática:**

```
┌─────────────────────────────────────────────────┐
│ VALIDANDO PLANILHA...                           │
├─────────────────────────────────────────────────┤
│ ✅ Formato do arquivo: OK                       │
│ ✅ Colunas obrigatórias: OK                     │
│ ✅ Total de registros: 150                      │
│                                                 │
│ Verificando dados...                            │
│ ✅ Emails válidos: 148                          │
│ ⚠️ Emails inválidos: 2                          │
│ ✅ Documentos válidos: 145                      │
│ ⚠️ Documentos inválidos: 5                      │
│ ✅ Telefones válidos: 150                       │
│                                                 │
│ [Ver Erros] [Continuar Importação]             │
└─────────────────────────────────────────────────┘
```

**Tratamento de Erros:**

Se houver erros, você pode:

1. **Visualizar Erros:** Lista detalhada com linha e tipo de erro
2. **Baixar Relatório:** Excel com erros marcados
3. **Importar Parcialmente:** Importa apenas registros válidos
4. **Corrigir e Reimportar:** Corrige planilha e tenta novamente

**Confirmação Final:**

```
┌─────────────────────────────────────────────────┐
│ CONFIRMAR IMPORTAÇÃO                            │
├─────────────────────────────────────────────────┤
│ Total a importar: 145 clientes                  │
│                                                 │
│ Duplicatas encontradas: 3                       │
│ Como proceder?                                  │
│ (●) Pular clientes duplicados                   │
│ ( ) Atualizar dados dos existentes              │
│ ( ) Importar como novos (sufixo numérico)       │
│                                                 │
│ [Cancelar]            [Confirmar Importação]    │
└─────────────────────────────────────────────────┘
```

**Resultado:**

```
✅ Importação concluída!

145 clientes importados com sucesso
3 clientes pulados (duplicatas)
2 clientes com erro (veja relatório)

[Baixar Relatório Completo] [Ver Clientes Importados]
```

---

## 5. Integração com CRM

### 5.1 Integrações Disponíveis

WebPropostas se integra com principais CRMs do mercado:

- **RD Station** - Sincronização bidirecional de contatos
- **HubSpot** - Importação automática de deals
- **Pipedrive** - Sincronização de organizações
- **Salesforce** - Integração via API
- **ActiveCampaign** - Sync de contatos e tags

### 5.2 Configurando Integração (Exemplo: RD Station)

**Passo 1:** Acessar Integrações

1. Clique em **⚙️ Configurações** no menu
2. Vá em **"Integrações"**
3. Selecione **"RD Station"**

**Passo 2:** Conectar Conta

1. Clique em **"Conectar RD Station"**
2. Faça login na sua conta RD Station
3. Autorize o acesso do WebPropostas
4. Aguarde confirmação de conexão

**Passo 3:** Configurar Sincronização

```
┌─────────────────────────────────────────────────┐
│ CONFIGURAÇÃO RD STATION                         │
├─────────────────────────────────────────────────┤
│ Direção da Sincronização:                       │
│ [✓] RD Station → WebPropostas                   │
│ [✓] WebPropostas → RD Station                   │
│                                                 │
│ Campos a Sincronizar:                           │
│ [✓] Nome                                        │
│ [✓] Email                                       │
│ [✓] Telefone                                    │
│ [✓] Empresa                                     │
│ [✓] Tags                                        │
│ [ ] Endereço completo                           │
│                                                 │
│ Frequência:                                     │
│ (●) Tempo real (recomendado)                    │
│ ( ) A cada 1 hora                               │
│ ( ) A cada 6 horas                              │
│ ( ) Diariamente                                 │
│                                                 │
│ [Salvar Configurações] [Testar Conexão]         │
└─────────────────────────────────────────────────┘
```

**Passo 4:** Teste e Ative

1. Clique em **"Testar Conexão"**
2. Sistema faz sincronização teste
3. Verifique se dados foram transferidos corretamente
4. Clique em **"Ativar Sincronização"**

---

## 6. Conformidade LGPD

### 6.1 Princípios de Privacidade

WebPropostas está 100% em conformidade com a LGPD (Lei 13.709/2018).

**Bases Legais Implementadas:**

- ✅ **Consentimento:** Cliente autoriza tratamento de dados
- ✅ **Execução de Contrato:** Dados necessários para proposta
- ✅ **Legítimo Interesse:** Marketing e comunicação
- ✅ **Cumprimento Legal:** Obrigações fiscais e tributárias

### 6.2 Direitos dos Titulares

Seus clientes têm direito a:

1. **Acesso:** Ver quais dados você tem sobre eles
2. **Correção:** Solicitar correção de dados incorretos
3. **Exclusão:** Solicitar remoção de dados pessoais
4. **Portabilidade:** Receber dados em formato estruturado
5. **Oposição:** Revogar consentimento de tratamento

**Como Processar Solicitações:**

**Exemplo: Cliente Solicita Exclusão de Dados**

1. Cliente envia email para seu DPO (Data Protection Officer)
2. Acesse o cadastro do cliente no WebPropostas
3. Clique em **⚙️ Ações** → **"Processar Solicitação LGPD"**
4. Selecione tipo: **"Exclusão de Dados"**
5. Sistema gera relatório de impacto:

```
┌─────────────────────────────────────────────────┐
│ ANÁLISE DE IMPACTO - EXCLUSÃO DE DADOS          │
├─────────────────────────────────────────────────┤
│ Cliente: João Silva                             │
│ Email: joao@example.com                         │
│                                                 │
│ Dados que serão excluídos:                      │
│ ✓ Nome completo                                 │
│ ✓ Email                                         │
│ ✓ Telefone                                      │
│ ✓ Endereço                                      │
│                                                 │
│ Dados que serão MANTIDOS (obrigação legal):     │
│ ⚠️ CPF/CNPJ (legislação tributária - 5 anos)    │
│ ⚠️ Notas fiscais emitidas (Receita Federal)     │
│ ⚠️ Contratos assinados (Código Civil)           │
│                                                 │
│ Propostas associadas: 3                         │
│ Contratos assinados: 1                          │
│                                                 │
│ ⚠️ ATENÇÃO: Esta ação é IRREVERSÍVEL            │
│                                                 │
│ [Cancelar] [Gerar Relatório] [Confirmar Exclusão]│
└─────────────────────────────────────────────────┘
```

6. Confirme a exclusão
7. Sistema anonimiza dados do cliente
8. Gera comprovante de exclusão
9. Envia comprovante ao cliente

### 6.3 Termo de Consentimento

Ao cadastrar cliente, sistema registra:

```json
{
  "consentimento": {
    "data": "2025-10-15T14:30:00Z",
    "ip": "192.168.1.100",
    "base_legal": "Consentimento",
    "finalidade": "Envio de propostas comerciais",
    "categorias_dados": ["identificacao", "contato", "empresa"],
    "prazo_retencao": "5 anos após último contato",
    "compartilhamento": "Não compartilhado com terceiros",
    "direitos_titular": "Acesso, correção, exclusão, portabilidade"
  }
}
```

### 6.4 Exportação de Dados (Portabilidade)

Cliente pode solicitar cópia de todos os dados:

1. Acesse cadastro do cliente
2. Clique em **⚙️** → **"Exportar Dados do Cliente"**
3. Sistema gera arquivo JSON estruturado:

```json
{
  "cliente": {
    "identificacao": {
      "nome": "João Silva",
      "email": "joao@example.com",
      "telefone": "(11) 98765-4321"
    },
    "empresa": {
      "nome": "Consultoria JS",
      "cnpj": "12.345.678/0001-90"
    },
    "endereco": {
      "cep": "01310-100",
      "logradouro": "Av. Paulista, 1578"
    },
    "propostas": [
      {
        "id": "prop-001",
        "titulo": "Website Corporativo",
        "data": "2025-10-01",
        "valor": 15000,
        "status": "fechada"
      }
    ],
    "historico_acesso": [
      {
        "data": "2025-10-15T14:30:00Z",
        "acao": "Visualizou proposta prop-001",
        "ip": "192.168.1.100"
      }
    ]
  }
}
```

4. Envie arquivo ao cliente via email criptografado

---

## 7. Melhores Práticas

### 7.1 Higienização de Dados

**Mantenha dados sempre atualizados:**

✅ **Faça limpeza trimestral:**
- Remova emails inválidos (bounce)
- Atualize telefones desatualizados
- Corrija endereços incorretos
- Remova duplicatas

✅ **Use validação em tempo real:**
- Email: verifica domínio existe
- CPF/CNPJ: algoritmo de validação
- CEP: busca automática ViaCEP
- Telefone: formato brasileiro

✅ **Enriqueça dados gradualmente:**
- Adicione informações em cada contato
- Atualize tags conforme evolução do relacionamento
- Registre preferências de comunicação

### 7.2 Segmentação Efetiva

**Crie segmentos significativos:**

**Por Valor de Negócio:**
```
💎 Platinum: Clientes acima de R$ 100k/ano
🥇 Gold:     Clientes de R$ 50k-100k/ano
🥈 Silver:   Clientes de R$ 10k-50k/ano
🥉 Bronze:   Clientes abaixo de R$ 10k/ano
```

**Por Engajamento:**
```
🔥 Hot:      Proposta ativa ou fechada nos últimos 30 dias
🌡️ Warm:     Proposta ativa ou fechada nos últimos 90 dias
❄️ Cold:     Sem atividade há mais de 90 dias
🧊 Frozen:   Sem atividade há mais de 1 ano
```

**Por Ciclo de Vendas:**
```
🎯 Prospecto:        Ainda não fechou negócio
🤝 Cliente:          Já fechou 1+ propostas
⭐ Cliente Recorrente: Fecha regularmente
👑 Conta Estratégica: Alto valor + recorrência
```

### 7.3 Automações Recomendadas

**1. Follow-up Automático**
```
SE cliente está "Cold" (90 dias sem contato)
ENTÃO enviar email de reengajamento
E marcar tag "Reativação"
```

**2. Alertas de Aniversário**
```
SE aniversário do cliente
ENTÃO notificar responsável
E enviar email automático de parabéns
```

**3. Score de Propensão**
```
CALCULAR score baseado em:
- Frequência de fechamentos (40%)
- Valor médio de proposta (30%)
- Taxa de aprovação (20%)
- Tempo de resposta (10%)

SE score > 80
ENTÃO marcar como "VIP"
```

### 7.4 Políticas de Retenção

**Defina ciclo de vida dos dados:**

| Tipo de Dado           | Tempo de Retenção          | Ação Após Vencimento       |
|------------------------|----------------------------|----------------------------|
| Dados cadastrais       | 5 anos sem atividade       | Anonimizar                 |
| Propostas não fechadas | 2 anos                     | Arquivar                   |
| Propostas fechadas     | 5 anos (obrigação fiscal)  | Manter                     |
| Logs de acesso         | 6 meses                    | Excluir                    |
| Contratos assinados    | 10 anos (Código Civil)     | Manter                     |

**Configurar política:**

1. Vá em **⚙️ Configurações** → **"Retenção de Dados"**
2. Defina regras para cada tipo de dado
3. Ative limpeza automática
4. Sistema notifica antes de excluir

---

## 🎯 Checklist de Excelência

Use este checklist para garantir gestão profissional de clientes:

**Cadastro:**
- [ ] Todos os campos obrigatórios preenchidos
- [ ] CPF/CNPJ validado
- [ ] Email verificado (enviou email teste)
- [ ] Telefone no formato correto com DDD
- [ ] Tags relevantes aplicadas
- [ ] Observações importantes registradas

**Manutenção:**
- [ ] Revisão trimestral de dados
- [ ] Remoção de duplicatas
- [ ] Atualização de informações desatualizadas
- [ ] Verificação de emails com bounce
- [ ] Limpeza de clientes inativos (LGPD)

**LGPD:**
- [ ] Consentimento registrado
- [ ] Base legal documentada
- [ ] Prazo de retenção definido
- [ ] Processo de DSR implementado
- [ ] DPO (Encarregado) definido

**Integração:**
- [ ] CRM sincronizado
- [ ] Tags mapeadas entre sistemas
- [ ] Duplicatas tratadas
- [ ] Sincronização bidirecional ativa

---

**Próximo Guia:** [03 - Relatórios e Analytics](./03-RELATORIOS.md)

---

**WebPropostas - Gestão Inteligente de Clientes** 🎯

*Versão 2.0.0 | Outubro 2025*
