# Complete UI/UX Structure - WebPropostas V3.0

**Document:** Full Application Structure Map
**Date:** October 5, 2025
**Purpose:** Visualize entire platform before implementation

---

## 🎨 Design Philosophy

**Visual Language:**
- Glassmorphism UI throughout
- Smooth animations and transitions
- Clear visual hierarchy
- Accessibility-first approach
- Brazilian market aesthetic (vibrant, warm, professional)

**Status Indicators:**
- ✅ **IMPLEMENTED** - Feature working and tested
- 🚧 **EM DESENVOLVIMENTO** - Placeholder/work in progress
- 📋 **PLANEJADO** - Designed but not started
- 💡 **CONCEPT** - Future idea

---

## 📱 Application Map

### 🌐 Public Pages (Unauthenticated)

#### 1. Landing Page `/`
**Status:** 🚧 EM DESENVOLVIMENTO

**Sections:**
- Hero Section
  - Headline: "Transforme Propostas em Contratos com IA"
  - Subheadline: "Plataforma completa para criar, enviar e gerenciar propostas comerciais"
  - CTA: "Começar Gratuitamente" / "Ver Demonstração"
  - Hero Animation: Animated proposal creation flow

- Feature Showcase (3 columns)
  - 🎨 **Editor Visual**: Arraste e solte elementos
  - 🤖 **IA Integrada**: Conteúdo inteligente
  - 📊 **Analytics**: Acompanhe cada visualização

- Template Gallery Preview
  - 6 template cards with hover effects
  - "Ver Todos os Templates" button

- Pricing Tiers Preview
  - 3 cards: Gratuito, Padrão, Profissional
  - Quick comparison table

- Social Proof
  - Customer testimonials (3 cards)
  - Company logos (6 clients)
  - Stats: "X propostas criadas" / "X empresas confiam"

- Footer
  - Product links / Resources / Company / Legal

---

#### 2. Pricing Page `/pricing`
**Status:** 🚧 EM DESENVOLVIMENTO

**Content:**
- Hero: "Planos que Crescem com Seu Negócio"
- Toggle: Mensal / Anual (20% desconto)

**Three Pricing Cards:**

**Gratuito (R$ 0/mês)**
- ✅ 3 propostas/mês
- ✅ 1 cliente
- ✅ 3 templates pré-prontos
- ✅ Download em PDF
- ❌ Sem IA
- ❌ Sem hospedagem
- CTA: "Começar Grátis"

**Padrão (R$ 97/mês)**
- ✅ 100 propostas/mês
- ✅ 10 clientes
- ✅ 10 templates + criar (sem salvar)
- ✅ Hospedagem WebPropostas
- ✅ IA com limite de tokens
- ✅ Analytics básico
- CTA: "Iniciar Teste de 14 Dias"

**Profissional (R$ 247/mês)**
- ✅ Propostas ilimitadas
- ✅ Clientes ilimitados
- ✅ Templates ilimitados + salvar
- ✅ Hospedagem personalizada
- ✅ IA ilimitada
- ✅ Analytics avançado
- ✅ Vídeos e gráficos
- ✅ Suporte prioritário
- CTA: "Falar com Vendas"

**Comparison Table:**
- Full feature breakdown (20+ rows)

---

#### 3. Templates Gallery `/templates`
**Status:** 🚧 EM DESENVOLVIMENTO

**Layout:**
- Filter sidebar
  - Categoria (Serviços, Produtos, Consultoria, etc.)
  - Setor (Tecnologia, Marketing, Construção, etc.)
  - Estilo (Moderno, Clássico, Minimalista, etc.)

- Template Grid (3 columns)
  - Template preview image
  - Template name
  - Category badge
  - "Ver Detalhes" / "Usar Template" buttons

- Template Detail Modal
  - Full preview
  - Description
  - Included sections
  - "Cadastre-se para Usar" or "Criar com Este Template"

---

#### 4. About Page `/about`
**Status:** 📋 PLANEJADO

**Sections:**
- Company story
- Mission & values
- Team (with photos)
- Contact information

---

#### 5. Help Center `/help`
**Status:** 📋 PLANEJADO

**Content:**
- Search bar
- FAQ categories
- Getting started guide
- Video tutorials
- Contact support

---

### 🔐 Authentication Pages

#### 6. Login Page `/auth/login`
**Status:** ✅ IMPLEMENTED

**Features:**
- ✅ Email/password form
- ✅ Password visibility toggle
- ✅ "Esqueceu sua senha?" link
- ✅ "Cadastre-se" link
- ✅ Validation errors
- ✅ Empty database detection with helpful toast

---

#### 7. Register Page `/auth/register`
**Status:** ✅ IMPLEMENTED (Basic)
**Enhancement:** 🚧 EM DESENVOLVIMENTO

**Form Fields:**
- Nome completo
- Email
- Telefone (opcional)
- Empresa
- Senha
- Confirmar senha
- Aceitar termos

**Enhancements Needed:**
- 2FA setup option
- Email verification flow
- Plan selection integration

---

#### 8. Forgot Password `/auth/forgot-password`
**Status:** 📋 PLANEJADO

**Flow:**
1. Email input
2. Send reset link
3. Check email message
4. Reset password form (from email link)
5. Success confirmation

---

#### 9. Email Verification `/auth/verify-email`
**Status:** 📋 PLANEJADO

**Content:**
- Verification code input
- Resend code option
- Success/error states

---

### 🏠 Dashboard Pages (Authenticated)

#### 10. Main Dashboard `/dashboard`
**Status:** ✅ IMPLEMENTED (Basic Structure)
**Enhancement:** 🚧 EM DESENVOLVIMENTO

**Current Layout:**
- Header with user menu
- Sidebar navigation
- Main content area

**Content Sections:**

**Quick Stats (4 cards):**
- 📄 Total de Propostas (com variação mensal)
- 👥 Total de Clientes (com variação mensal)
- 📈 Taxa de Conversão (porcentagem)
- 💰 Valor Total (propostas fechadas)

**Quick Actions:**
- ➕ Nova Proposta
- 👤 Novo Cliente
- 📋 Novo Template (Profissional)
- 📊 Ver Relatórios

**Recent Proposals Table:**
- Cliente
- Título da proposta
- Status badge (Aberta/Em revisão/Fechada/Rejeitada)
- Valor
- Data de criação
- Ações (Ver/Editar/Duplicar/Excluir)

**Activity Feed:**
- Recent actions timeline
- Client interactions
- Proposal status changes

**Charts (If Professional Plan):**
- Proposals by status (pie chart)
- Proposals over time (line chart)
- Conversion funnel

---

#### 11. Proposals List `/dashboard/proposals`
**Status:** 🚧 EM DESENVOLVIMENTO

**Header:**
- Search bar
- Filter dropdown (Status/Cliente/Data)
- Sort dropdown
- "Nova Proposta" button

**View Options:**
- 📋 List view (default)
- 🎴 Card view
- 📊 Kanban board (by status)

**Proposal Card/Row:**
- Thumbnail/preview
- Título
- Cliente
- Status badge
- Valor
- Última atualização
- Quick actions menu

**Filters:**
- Todos
- Abertas
- Em Revisão (Alterações Solicitadas)
- Fechadas
- Rejeitadas

**Bulk Actions:**
- Select multiple
- Export to PDF
- Delete selected
- Change status

---

#### 12. Proposal Creator `/dashboard/proposals/new`
**Status:** 🚧 EM DESENVOLVIMENTO

**Step 1: Choose Starting Point**
- ✨ Começar do Zero
- 📋 Usar Template
- 📄 Duplicar Proposta Existente
- 🤖 Criar com IA (descrever o que precisa)

**Step 2: Basic Information**
- Cliente (dropdown ou criar novo)
- Título da proposta
- Descrição breve
- Validade
- Valor estimado

**Step 3: Template Selection (if chosen)**
- Template gallery filtered view
- Preview on click
- Select and proceed

**Step 4: Visual Builder** (Main Editor)

**Left Sidebar - Elements:**
- 📝 Text blocks
- 🎨 Headings (H1-H6)
- 📋 Lists (ordered/unordered)
- 🖼️ Images
- 📹 Videos (Pro)
- 📊 Charts (Pro)
- 📈 Tables
- 💰 Pricing tables
- ✍️ Signatures
- 🔗 Buttons/CTAs
- ➗ Dividers
- 🎯 Custom HTML (Pro)

**Center - Canvas:**
- Drag and drop workspace
- Live preview
- Responsive viewport toggles (Desktop/Tablet/Mobile)
- Section management (add/remove/reorder)

**Right Sidebar - Properties:**
- Element settings
- Styling options
- 🤖 AI Assistant panel
  - "Melhorar este texto"
  - "Sugerir conteúdo"
  - "Traduzir"
  - Token counter (Standard/Pro)

**Top Toolbar:**
- Save draft
- Preview
- Send to client
- Export PDF
- Settings
- Undo/Redo

**AI Features:**
- 💡 Content suggestions per section
- 🎨 Design recommendations
- 📊 Automatic chart generation from data
- 🔤 Tone adjustment (formal/casual/technical)

---

#### 13. Proposal Detail/Edit `/dashboard/proposals/[id]`
**Status:** 🚧 EM DESENVOLVIMENTO

**Tabs:**
- 📝 **Editor**: Same as creator
- 👁️ **Preview**: Client view simulation
- 📊 **Analytics**: View tracking, time spent per section, heatmap
- 💬 **Comments**: Client feedback thread
- 📜 **History**: Version timeline, changes log

**Analytics Dashboard:**
- 👀 Total views
- ⏱️ Average time viewed
- 🔥 Section heatmap (most viewed)
- 📱 Device breakdown
- 🌍 Location tracking
- ⏰ View timeline
- 📥 Download count

---

#### 14. Clients List `/dashboard/clients`
**Status:** 🚧 EM DESENVOLVIMENTO

**Header:**
- Search clients
- Filter by status (Ativo/Inativo)
- Add new client button

**Client Cards/List:**
- Avatar/Logo
- Name
- Company
- Email/Phone
- Total proposals
- Conversion rate
- Last interaction
- Quick actions

**Filters:**
- Todos os clientes
- Com propostas abertas
- Com propostas fechadas
- Sem propostas

---

#### 15. Client Detail `/dashboard/clients/[id]`
**Status:** 🚧 EM DESENVOLVIMENTO

**Header:**
- Client info editing
- Archive/Delete client
- Create proposal button

**Sections:**

**Client Information:**
- 👤 Nome
- 🏢 Empresa
- 📧 Email
- 📱 Telefone
- 📍 Endereço
- 🎂 Data de cadastro
- 🏷️ Tags/Categorias
- 📎 Anexos

**Proposals History:**
- All proposals for this client
- Status breakdown
- Timeline view

**Activity Feed:**
- All interactions
- Email opens
- Proposal views
- Comments

**Analytics:**
- Engagement score
- Response time
- Conversion rate
- Total value

---

#### 16. Templates Page `/dashboard/templates`
**Status:** 🚧 EM DESENVOLVIMENTO

**For Free/Standard:**
- Gallery of available templates
- Preview only
- "Upgrade para Salvar" message

**For Professional:**
- My Templates tab
- Public Templates tab
- Create new template
- Template categories
- Search and filter

**Template Card:**
- Preview thumbnail
- Name
- Category
- Last modified
- Usage count
- Actions (Edit/Duplicate/Delete/Share)

---

#### 17. Template Builder `/dashboard/templates/builder`
**Status:** 🚧 EM DESENVOLVIMENTO (Pro Only)

**Same as Proposal Creator but:**
- Save as template option
- Template settings:
  - Name
  - Description
  - Category
  - Visibility (Private/Team/Public)
  - Thumbnail upload
  - Default values

---

#### 18. Analytics Dashboard `/dashboard/analytics`
**Status:** 🚧 EM DESENVOLVIMENTO

**Overview Tab:**
- Total proposals timeline
- Conversion funnel
- Revenue over time
- Client acquisition

**Proposals Tab:**
- Performance by proposal
- Best performing templates
- Average time to close
- Win/loss analysis

**Clients Tab:**
- Client engagement scores
- Most active clients
- Client lifetime value
- Client acquisition cost

**AI Usage Tab (Standard/Pro):**
- Tokens consumed
- Most used AI features
- Cost tracking
- Optimization suggestions

**Product Tab (Pro):**
- Most proposed products/services
- Pricing analysis
- Bundle performance
- Upsell opportunities

---

#### 19. Reports `/dashboard/reports`
**Status:** 🚧 EM DESENVOLVIMENTO

**Report Types:**
- 📊 Sales Pipeline
- 💰 Revenue Forecast
- 👥 Client Insights
- ⏱️ Time to Close
- 📈 Growth Metrics
- 🎯 Goal Tracking

**Report Builder:**
- Date range selector
- Metrics selection
- Visualization type
- Export options (PDF/Excel/CSV)
- Schedule reports

---

#### 20. Settings `/dashboard/settings`
**Status:** 🚧 EM DESENVOLVIMENTO

**Tabs:**

**👤 Profile:**
- Personal information
- Avatar upload
- Email preferences
- Password change
- 2FA settings

**🏢 Company:**
- Company details
- Logo upload
- Brand colors
- Email signature
- Custom domain (Pro)

**💳 Billing:**
- Current plan
- Payment method
- Billing history
- Upgrade/downgrade
- Cancel subscription

**👥 Team (Pro):**
- Invite members
- Manage roles
- Team permissions
- Activity log

**🔗 Integrations:**
- Email providers
- Payment gateways
- CRM connections
- Zapier/webhooks
- API keys

**⚙️ Preferences:**
- Language
- Timezone
- Currency
- Notifications
- Email alerts

---

### 👀 Client-Facing Pages

#### 21. Proposal View `/proposal/[token]`
**Status:** ✅ IMPLEMENTED (Basic)
**Enhancement:** 🚧 EM DESENVOLVIMENTO

**Current:**
- Public proposal view
- Basic layout

**Enhancements Needed:**
- Beautiful presentation mode
- Interactive elements
- Comment system UI
- Approval buttons
- Signature capture
- Download PDF option
- Share buttons

**Header:**
- Company logo/branding
- Proposal title
- Status badge

**Content:**
- Rendered proposal sections
- Smooth scrolling
- Section navigation
- Progress indicator

**Footer Actions:**
- ✅ Aprovar Proposta
- ✏️ Solicitar Alterações
- ❌ Rejeitar
- 💬 Comentar
- 📥 Baixar PDF
- 📤 Compartilhar

**Comments Panel:**
- Add comment by section
- Reply to comments
- Resolve threads
- Notify creator

---

#### 22. Client Login `/client/login`
**Status:** 📋 PLANEJADO

**For returning clients:**
- Email/password
- Or magic link via email
- Access all their proposals

---

#### 23. Contract Signing `/contract/[token]`
**Status:** 📋 PLANEJADO

**Flow:**
1. Review final proposal
2. Electronic signature
3. DocuSign/Clicksign integration
4. Download signed copy
5. Confirmation email

---

### 🛠️ Admin Pages (Future)

#### 24. Admin Dashboard `/admin`
**Status:** 💡 CONCEPT

**Metrics:**
- Total users
- Active subscriptions
- Revenue MRR/ARR
- Churn rate
- System health

---

#### 25. User Management `/admin/users`
**Status:** 💡 CONCEPT

**Features:**
- User list
- Impersonate user
- Suspend/activate
- Plan changes
- Support tickets

---

## 🎨 Component Library Needed

### Navigation Components
- ✅ TopNav (with user menu)
- ✅ Sidebar (collapsible)
- 🚧 Breadcrumbs
- 🚧 Tabs
- 🚧 Pagination

### Layout Components
- ✅ DashboardLayout
- ✅ AuthLayout
- 🚧 PublicLayout (for landing/pricing)
- 🚧 EmptyState
- 🚧 LoadingState

### Form Components
- ✅ Input (text, email, password)
- ✅ Button
- 🚧 Select/Dropdown
- 🚧 Checkbox
- 🚧 Radio
- 🚧 Toggle/Switch
- 🚧 DatePicker
- 🚧 FileUpload
- 🚧 RichTextEditor
- 🚧 ColorPicker

### Data Display
- 🚧 Table (with sorting, filtering)
- 🚧 Card
- 🚧 List
- 🚧 Stats/Metrics
- 🚧 Badge
- 🚧 Tag
- 🚧 Avatar
- 🚧 Progress bar
- 🚧 Charts (using Chart.js or Recharts)

### Feedback
- ✅ Toast/Notification
- 🚧 Modal/Dialog
- 🚧 Tooltip
- 🚧 Alert
- 🚧 Skeleton
- 🚧 Spinner

### Editor Components
- 🚧 DragDropCanvas
- 🚧 ElementPalette
- 🚧 PropertyPanel
- 🚧 AIAssistant
- 🚧 TemplateSelector

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1440px
```

---

## 🎨 Color System

```css
/* Primary (Brand) */
--primary-50: #e0f2fe
--primary-600: #0284c7
--primary-700: #0369a1

/* Secondary (Neutral) */
--gray-50: #f9fafb
--gray-900: #111827

/* Status Colors */
--success: #10b981 (green)
--warning: #f59e0b (yellow)
--error: #ef4444 (red)
--info: #3b82f6 (blue)
```

---

## 🚀 Implementation Priority

### Phase 1: Foundation (2 weeks)
1. Component library completion
2. Layout templates
3. Navigation structure
4. Design system documentation

### Phase 2: Public Pages (1 week)
5. Landing page
6. Pricing page
7. Templates gallery
8. Help center basics

### Phase 3: Dashboard Core (2 weeks)
9. Enhanced dashboard
10. Proposals list
11. Clients list
12. Settings pages

### Phase 4: Editor (3 weeks)
13. Visual proposal builder
14. AI integration
15. Template builder
16. Preview system

### Phase 5: Client Experience (1 week)
17. Proposal view enhancements
18. Comment system
19. Approval workflow
20. Contract integration

### Phase 6: Analytics (1 week)
21. Analytics dashboard
22. Reports builder
23. Data visualizations

---

**Total Estimated Time:** 10-12 weeks for complete UI/UX implementation

**Next Steps:**
1. Review and approve this structure
2. Create Figma/design mockups for key pages
3. Build component library
4. Implement page by page with placeholders
5. Add "🚧 EM DESENVOLVIMENTO" indicators everywhere

---

**Last Updated:** October 5, 2025
