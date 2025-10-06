# Guia de Início Rápido - WebPropostas

**Versão:** 2.0.0
**Última Atualização:** Outubro 2025

## Bem-vindo ao WebPropostas! 🎉

Este guia irá ajudá-lo a começar a usar a plataforma WebPropostas em minutos. Ao final deste tutorial, você será capaz de criar, enviar e gerenciar propostas comerciais profissionais.

---

## 📋 Índice

1. [Primeiro Acesso](#primeiro-acesso)
2. [Entendendo o Dashboard](#entendendo-o-dashboard)
3. [Criando Sua Primeira Proposta](#criando-sua-primeira-proposta)
4. [Cadastrando Clientes](#cadastrando-clientes)
5. [Enviando Proposta ao Cliente](#enviando-proposta-ao-cliente)
6. [Acompanhando Status](#acompanhando-status)
7. [Próximos Passos](#próximos-passos)

---

## 1. Primeiro Acesso

### 1.1 Fazendo Login

1. Acesse a plataforma em: `https://webpropostas.infigital.net`
2. Clique em **"Entrar"** no canto superior direito
3. Digite suas credenciais:
   - **Email:** seu@email.com
   - **Senha:** sua senha segura
4. Clique em **"Entrar"**

### 1.2 Ambiente de Demonstração

Para testar a plataforma, você pode usar as credenciais de demonstração:

```
Email: demo@webpropostas.com
Senha: demo123
```

> ⚠️ **Importante:** Os dados de demonstração são resetados diariamente.

### 1.3 Primeiro Login

No seu primeiro login, você será direcionado para:

1. **Tour Guiado** - Uma introdução rápida aos recursos principais
2. **Configuração Inicial** - Personalizar logo, dados da empresa e assinatura
3. **Dashboard Principal** - Visão geral das suas propostas

---

## 2. Entendendo o Dashboard

O Dashboard é o coração do WebPropostas. Ele exibe:

### 2.1 Métricas Principais (Cards Superiores)

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Total Propostas │ Taxa Conversão  │ Valor Total     │ Clientes Ativos │
│      24         │     58.3%       │  R$ 145.000     │       15        │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

- **Total de Propostas:** Quantidade total criada
- **Taxa de Conversão:** % de propostas fechadas
- **Valor Total:** Soma das propostas aprovadas
- **Clientes Ativos:** Clientes com propostas em andamento

### 2.2 Gráficos de Desempenho

- **Propostas por Status:** Gráfico de pizza mostrando distribuição
- **Tendência Mensal:** Linha do tempo de criação de propostas
- **Top Clientes:** Ranking dos clientes com mais propostas

### 2.3 Lista de Propostas Recentes

Tabela com suas últimas propostas:

| Proposta                    | Cliente           | Status                     | Valor        | Data       |
|----------------------------|-------------------|----------------------------|--------------|------------|
| Website Corporativo        | Empresa ABC       | 🟢 Fechada                | R$ 15.000    | 15/10/2025 |
| App Mobile E-commerce      | Tech Solutions    | 🟡 Alterações Solicitadas | R$ 45.000    | 12/10/2025 |
| Branding Completo          | StartupXYZ        | 🔵 Aberta                 | R$ 8.500     | 10/10/2025 |

**Status possíveis:**
- 🔵 **Aberta:** Aguardando revisão do cliente
- 🟡 **Alterações Solicitadas:** Cliente pediu modificações
- 🟢 **Fechada:** Cliente aceitou (ganhou!)
- 🔴 **Rejeitada:** Cliente recusou

---

## 3. Criando Sua Primeira Proposta

### 3.1 Duas Formas de Criar

**Opção 1: Do Zero**
1. Clique em **"+ Nova Proposta"** no menu superior
2. Escolha **"Criar do Zero"**

**Opção 2: Usar Template (Recomendado)**
1. Clique em **"+ Nova Proposta"**
2. Escolha **"Usar Template"**
3. Navegue pela galeria de templates
4. Selecione o template que mais se adequa ao seu projeto

### 3.2 Passo a Passo - Usando Template

#### Passo 1: Escolher Template

```
┌─────────────────────────────────────────────────────────────┐
│  GALERIA DE TEMPLATES                                       │
├─────────────────────────────────────────────────────────────┤
│  Filtros: [Categoria ▼] [Setor ▼] [🔍 Buscar...]          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Desenvolvimento│  │   Design     │  │  Consultoria │    │
│  │      Web       │  │   Gráfico    │  │   Estratégica│    │
│  │                │  │              │  │              │    │
│  │  [Ver Detalhes]│  │ [Ver Detalhes]│ │ [Ver Detalhes]│    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

1. Navegue pelos templates disponíveis
2. Clique em **"Ver Detalhes"** para preview
3. Clique em **"Usar Template"**

#### Passo 2: Preencher Informações

O sistema irá solicitar informações para personalizar o template:

```json
{
  "Informações Básicas": {
    "Nome da Proposta": "Website Corporativo - Empresa ABC",
    "Nome do Trabalho": "Desenvolvimento Website Institucional",
    "Cliente": "Empresa ABC Ltda" // Selecione cliente existente ou crie novo
  },

  "Campos Personalizados do Template": {
    "Nome da Empresa": "Empresa ABC Ltda",
    "Tipo de Projeto": "Website Institucional Responsivo",
    "Prazo de Entrega": "60 dias corridos",
    "Valor Total": "R$ 15.000,00"
  },

  "Conteúdo": {
    "Apresentação": "Texto introdutório personalizado...",
    "Escopo do Trabalho": "Detalhamento completo do que será entregue...",
    "Termos e Condições": "Prazo, pagamento, garantias..."
  },

  "Configurações de Acesso": {
    "Senha do Cliente": "SenhaSegura123!", // Cliente usará para acessar
    "Número de Acesso": "PROP-2025-001" // Identificador único
  }
}
```

#### Passo 3: Revisar e Criar

1. Revise todas as informações preenchidas
2. Clique em **"Preview"** para ver como o cliente verá
3. Se estiver tudo OK, clique em **"Criar Proposta"**
4. Proposta criada com sucesso! ✅

### 3.3 Editando Proposta Criada

Após criar, você pode:

1. **Editar Conteúdo:** Clique no ícone ✏️ de cada seção
2. **Adicionar Anexos:** PDFs, apresentações, documentos
3. **Alterar Design:** Cores, fontes, logo da empresa
4. **Configurar Notificações:** Email, WhatsApp, Telegram

---

## 4. Cadastrando Clientes

### 4.1 Criar Novo Cliente

1. No menu lateral, clique em **"Clientes"**
2. Clique em **"+ Novo Cliente"**
3. Preencha o formulário:

```
┌─────────────────────────────────────────────────┐
│  NOVO CLIENTE                                   │
├─────────────────────────────────────────────────┤
│  Nome/Razão Social: ________________________   │
│  Email:            ________________________   │
│  Telefone:         (__)_____-____            │
│  Empresa:          ________________________   │
│                                                 │
│  Documento:        [CPF] [CNPJ]              │
│                    __.___.___/____-__         │
│                                                 │
│  Endereço (Opcional)                           │
│  CEP:              _____-___                  │
│  Rua:              ________________________   │
│  Número:           _____                      │
│  Complemento:      ________________________   │
│  Bairro:           ________________________   │
│  Cidade:           ________________________   │
│  Estado:           __                         │
│                                                 │
│  Observações:                                   │
│  ________________________________________      │
│  ________________________________________      │
│                                                 │
│  [Cancelar]              [Salvar Cliente]     │
└─────────────────────────────────────────────────┘
```

4. Clique em **"Salvar Cliente"**

### 4.2 Importar Lista de Clientes

Para importar vários clientes de uma vez:

1. Clique em **"Importar"** na tela de Clientes
2. Baixe o modelo de planilha Excel/CSV
3. Preencha com os dados dos seus clientes
4. Faça upload do arquivo
5. Revise os dados importados
6. Confirme a importação

---

## 5. Enviando Proposta ao Cliente

### 5.1 Preparar Envio

Antes de enviar, verifique:

- ✅ Todas as seções estão completas
- ✅ Valores e prazos estão corretos
- ✅ Cliente está cadastrado com email válido
- ✅ Logo e identidade visual estão corretas

### 5.2 Formas de Envio

**Opção 1: Email Automático** (Recomendado)

1. Na tela da proposta, clique em **"Enviar ao Cliente"**
2. Escolha **"Enviar por Email"**
3. Personalize a mensagem de email:

```
Para: contato@empresaabc.com
Assunto: Proposta Comercial - Website Corporativo

Prezado Cliente,

Segue o link para acessar sua proposta comercial personalizada:

🔗 Link: https://webpropostas.infigital.net/proposta/abc123

📱 Número de Acesso: PROP-2025-001
🔐 Senha: SenhaSegura123!

A proposta está válida por 30 dias.

Qualquer dúvida, estou à disposição!

Atenciosamente,
Seu Nome
```

4. Clique em **"Enviar Agora"**

**Opção 2: WhatsApp**

1. Clique em **"Enviar ao Cliente"**
2. Escolha **"Enviar por WhatsApp"**
3. Sistema gera mensagem pré-formatada
4. Abre WhatsApp Web com mensagem pronta
5. Clique em enviar

**Opção 3: Link Direto**

1. Clique em **"Copiar Link"**
2. Compartilhe por qualquer canal (Telegram, SMS, etc.)

### 5.3 Cliente Acessa a Proposta

Quando o cliente clicar no link:

1. Verá tela de login do cliente
2. Insere número de acesso e senha
3. Acessa proposta completa e interativa
4. Pode deixar comentários em seções
5. Pode aceitar, rejeitar ou solicitar alterações

---

## 6. Acompanhando Status

### 6.1 Notificações em Tempo Real

Você recebe notificação quando:

- 🔔 Cliente visualiza a proposta pela primeira vez
- 💬 Cliente deixa comentário em alguma seção
- ✅ Cliente aceita a proposta
- 🔄 Cliente solicita alterações
- ❌ Cliente rejeita a proposta

### 6.2 Analytics da Proposta

Clique em **"Ver Analytics"** para visualizar:

```
┌─────────────────────────────────────────────────────┐
│  ANALYTICS DA PROPOSTA                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📊 Visualizações: 12                              │
│  ⏱️ Tempo Médio de Leitura: 8 minutos             │
│  📱 Dispositivos: 75% Mobile | 25% Desktop         │
│                                                     │
│  Seções Mais Lidas:                                │
│  1. Escopo do Trabalho      (100% dos acessos)    │
│  2. Valores e Prazos        (100% dos acessos)    │
│  3. Termos e Condições      (83% dos acessos)     │
│  4. Apresentação            (75% dos acessos)     │
│                                                     │
│  🕐 Histórico de Acessos:                          │
│  15/10/2025 14:30 - Primeiro acesso               │
│  15/10/2025 14:45 - Segunda visualização          │
│  16/10/2025 09:15 - Terceira visualização         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 6.3 Respondendo Comentários

Quando cliente deixa comentário:

1. Você recebe notificação
2. Acesse a proposta
3. Vá até a seção comentada
4. Responda diretamente no sistema
5. Cliente recebe notificação da sua resposta

### 6.4 Processando Alterações Solicitadas

Se cliente pedir alterações:

1. Status muda para 🟡 **"Alterações Solicitadas"**
2. Revise os comentários do cliente
3. Faça as modificações necessárias
4. Mude status para 🔵 **"Aberta"** novamente
5. Notifique o cliente sobre as atualizações

---

## 7. Próximos Passos

Agora que você domina o básico, explore recursos avançados:

### 7.1 Recursos Avançados

- 📊 **[Relatórios e Analytics](./03-RELATORIOS.md)** - Análise profunda de desempenho
- 🎨 **[Personalização Avançada](./04-PERSONALIZACAO.md)** - Branding e design
- 🤖 **[Automações](./05-AUTOMACOES.md)** - Workflows automáticos
- 📝 **[Contratos Automáticos](./06-CONTRATOS.md)** - Geração pós-aprovação
- 👥 **[Trabalho em Equipe](./07-COLABORACAO.md)** - Múltiplos usuários

### 7.2 Dicas Pro

💡 **Organize com Tags**
Crie tags para categorizar propostas: "Urgente", "Recorrente", "VIP", etc.

💡 **Use Modelos de Email**
Crie templates de email para diferentes tipos de envio.

💡 **Configure Lembretes**
Agende follow-ups automáticos para propostas sem resposta.

💡 **Backup Regular**
Exporte suas propostas mensalmente para backup.

### 7.3 Atalhos de Teclado

Economize tempo com atalhos:

| Atalho          | Ação                          |
|----------------|-------------------------------|
| `Ctrl + N`     | Nova Proposta                 |
| `Ctrl + K`     | Novo Cliente                  |
| `Ctrl + S`     | Salvar Alterações             |
| `Ctrl + P`     | Preview da Proposta           |
| `Ctrl + E`     | Enviar ao Cliente             |
| `Ctrl + /`     | Busca Global                  |

---

## 🆘 Precisa de Ajuda?

### Suporte Técnico

- 📧 **Email:** suporte@webpropostas.com
- 💬 **Chat:** Clique no ícone no canto inferior direito
- 📚 **Base de Conhecimento:** https://help.webpropostas.com
- 🎥 **Vídeo Tutoriais:** https://youtube.com/@webpropostas

### Comunidade

- 👥 **Fórum:** https://forum.webpropostas.com
- 💭 **Telegram:** t.me/webpropostas
- 📱 **WhatsApp:** (48) 9999-9999

---

## 🎓 Certificação

Complete todos os guias de usuário e ganhe seu certificado de WebPropostas Expert!

**Próximo Guia:** [02 - Gerenciamento de Clientes](./02-CLIENTES.md)

---

**WebPropostas - Transformando Propostas em Contratos Fechados** 🚀

*Versão 2.0.0 | Última atualização: Outubro 2025*
