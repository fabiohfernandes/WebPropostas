# Phase 19.5: Subscription System Implementation

**Duration:** 3 weeks
**Priority:** 🔴 CRITICAL (Must complete before Phase 20)
**Operational Cost:** $100-200/month (payment processor fees - variable)
**Based on:** User_experience_guide.md

---

## 📋 OVERVIEW

Implement a complete three-tier subscription system (Freemium, Standard, Professional) with payment integration for Brazilian and international markets, feature gating, and usage quota management.

**Why Critical:** This is the revenue foundation for WebPropostas. All future features depend on knowing which plan the user is on.

---

## 💰 SUBSCRIPTION TIERS

### Freemium (R$ 0/month)
**Limits:**
- ❌ 1 client (name only)
- ❌ 3 proposals maximum
- ❌ 3 ready-made templates (view only)
- ❌ No template builder access
- ❌ No AI assistance
- ❌ Cannot edit after creation
- ❌ No hosting (PDF download only - 10/month)
- ❌ No analytics

**Value Proposition:** Try before you buy

---

### Standard (R$ 79/month)
**Limits:**
- ✅ 10 clients (name + contact)
- ✅ 100 proposals maximum
- ✅ 10 ready-made templates + create custom
- ✅ Template builder (cannot save)
- ✅ AI content assistance (with token limits)
- ✅ Manual editing after creation
- ✅ Images in templates
- ✅ WebPropostas-branded hosting
- ✅ Basic analytics

**Value Proposition:** Professional proposals with AI assistance

---

### Professional (R$ 199/month)
**Limits:**
- ✅ Unlimited clients (name + contact + logo)
- ✅ Unlimited proposals
- ✅ Unlimited templates + save/load custom
- ✅ Full template builder access
- ✅ Advanced AI assistance + editing
- ✅ AI-powered editing after creation
- ✅ Images + videos + charts in templates
- ✅ Custom-branded hosting
- ✅ Advanced analytics with AI evaluation

**Value Proposition:** Complete proposal automation with AI intelligence

---

## 🗓️ WEEK 1: PLAN ARCHITECTURE & DATABASE

### Day 1-2: Database Schema Design

#### New Tables

**subscriptions table:**
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) UNIQUE,
  plan_type VARCHAR(20) NOT NULL, -- 'freemium', 'standard', 'professional'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'past_due', 'trialing'

  -- Payment provider info
  stripe_subscription_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  mercadopago_subscription_id VARCHAR(255),
  mercadopago_customer_id VARCHAR(255),

  -- Billing
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT false,

  -- Timestamps
  trial_start TIMESTAMP,
  trial_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_org ON subscriptions(organization_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

**usage_quotas table:**
```sql
CREATE TABLE usage_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) UNIQUE,

  -- Current usage counts
  clients_count INTEGER DEFAULT 0,
  proposals_count INTEGER DEFAULT 0,
  templates_count INTEGER DEFAULT 0,
  pdf_downloads_month INTEGER DEFAULT 0,
  ai_tokens_used_month INTEGER DEFAULT 0,

  -- Last reset (for monthly limits)
  last_reset_at TIMESTAMP DEFAULT NOW(),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_usage_quotas_org ON usage_quotas(organization_id);
```

**plan_features table (configuration):**
```sql
CREATE TABLE plan_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_type VARCHAR(20) UNIQUE NOT NULL,

  -- Limits
  max_clients INTEGER, -- NULL = unlimited
  max_proposals INTEGER, -- NULL = unlimited
  max_templates INTEGER, -- NULL = unlimited
  max_pdf_downloads_month INTEGER, -- NULL = unlimited
  max_ai_tokens_month INTEGER, -- NULL = unlimited

  -- Features (boolean flags)
  can_edit_proposals BOOLEAN DEFAULT false,
  can_use_template_builder BOOLEAN DEFAULT false,
  can_save_templates BOOLEAN DEFAULT false,
  can_use_ai BOOLEAN DEFAULT false,
  can_use_ai_editing BOOLEAN DEFAULT false,
  can_upload_images BOOLEAN DEFAULT false,
  can_upload_videos BOOLEAN DEFAULT false,
  can_use_charts BOOLEAN DEFAULT false,
  can_host_proposals BOOLEAN DEFAULT false,
  can_custom_brand BOOLEAN DEFAULT false,
  can_access_analytics BOOLEAN DEFAULT false,
  can_access_ai_analytics BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed data
INSERT INTO plan_features (plan_type, max_clients, max_proposals, max_templates, max_pdf_downloads_month, max_ai_tokens_month,
  can_edit_proposals, can_use_template_builder, can_save_templates, can_use_ai, can_use_ai_editing,
  can_upload_images, can_upload_videos, can_use_charts, can_host_proposals, can_custom_brand,
  can_access_analytics, can_access_ai_analytics)
VALUES
  ('freemium', 1, 3, 3, 10, NULL,
   false, false, false, false, false,
   false, false, false, false, false,
   false, false),
  ('standard', 10, 100, 10, NULL, 50000,
   true, true, false, true, false,
   true, false, false, true, false,
   true, false),
  ('professional', NULL, NULL, NULL, NULL, 200000,
   true, true, true, true, true,
   true, true, true, true, true,
   true, true);
```

**payment_transactions table (audit log):**
```sql
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  subscription_id UUID REFERENCES subscriptions(id),

  provider VARCHAR(20), -- 'stripe', 'mercadopago'
  provider_transaction_id VARCHAR(255),

  amount_cents INTEGER, -- stored in cents (7900 = R$ 79.00)
  currency VARCHAR(3) DEFAULT 'BRL',

  status VARCHAR(20), -- 'pending', 'completed', 'failed', 'refunded'
  transaction_type VARCHAR(20), -- 'subscription', 'upgrade', 'downgrade'

  metadata JSONB,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payment_transactions_org ON payment_transactions(organization_id);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);
```

---

### Day 3: Backend API - Subscription Service

**File:** `services/api/src/services/subscriptionService.js`

```javascript
const { pool } = require('../models/database');

class SubscriptionService {
  // Get organization's subscription details
  async getSubscription(organizationId) {
    const result = await pool.query(
      `SELECT s.*, pf.*
       FROM subscriptions s
       JOIN plan_features pf ON s.plan_type = pf.plan_type
       WHERE s.organization_id = $1`,
      [organizationId]
    );
    return result.rows[0];
  }

  // Get organization's current usage
  async getUsageQuotas(organizationId) {
    const result = await pool.query(
      'SELECT * FROM usage_quotas WHERE organization_id = $1',
      [organizationId]
    );
    return result.rows[0];
  }

  // Check if organization can perform action
  async canPerformAction(organizationId, action) {
    const subscription = await this.getSubscription(organizationId);
    const usage = await this.getUsageQuotas(organizationId);

    switch(action) {
      case 'create_client':
        if (subscription.max_clients === null) return true;
        return usage.clients_count < subscription.max_clients;

      case 'create_proposal':
        if (subscription.max_proposals === null) return true;
        return usage.proposals_count < subscription.max_proposals;

      case 'create_template':
        if (subscription.max_templates === null) return true;
        return usage.templates_count < subscription.max_templates;

      case 'download_pdf':
        if (subscription.max_pdf_downloads_month === null) return true;
        return usage.pdf_downloads_month < subscription.max_pdf_downloads_month;

      case 'use_ai':
        return subscription.can_use_ai;

      case 'edit_proposal':
        return subscription.can_edit_proposals;

      case 'use_template_builder':
        return subscription.can_use_template_builder;

      case 'save_template':
        return subscription.can_save_templates;

      default:
        return false;
    }
  }

  // Increment usage counter
  async incrementUsage(organizationId, counterType) {
    const columnMap = {
      'client': 'clients_count',
      'proposal': 'proposals_count',
      'template': 'templates_count',
      'pdf': 'pdf_downloads_month',
      'ai_tokens': 'ai_tokens_used_month'
    };

    const column = columnMap[counterType];
    if (!column) throw new Error('Invalid counter type');

    await pool.query(
      `UPDATE usage_quotas
       SET ${column} = ${column} + 1, updated_at = NOW()
       WHERE organization_id = $1`,
      [organizationId]
    );
  }

  // Reset monthly counters (run via cron job)
  async resetMonthlyCounters() {
    await pool.query(`
      UPDATE usage_quotas
      SET pdf_downloads_month = 0,
          ai_tokens_used_month = 0,
          last_reset_at = NOW()
    `);
  }

  // Create new subscription (for new organizations)
  async createSubscription(organizationId, planType = 'freemium') {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Create subscription
      await client.query(
        `INSERT INTO subscriptions (organization_id, plan_type, status)
         VALUES ($1, $2, 'active')`,
        [organizationId, planType]
      );

      // Create usage quotas
      await client.query(
        `INSERT INTO usage_quotas (organization_id)
         VALUES ($1)`,
        [organizationId]
      );

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Upgrade/downgrade subscription
  async changePlan(organizationId, newPlanType) {
    await pool.query(
      `UPDATE subscriptions
       SET plan_type = $1, updated_at = NOW()
       WHERE organization_id = $2`,
      [newPlanType, organizationId]
    );
  }
}

module.exports = new SubscriptionService();
```

---

### Day 4: Backend API - Middleware for Feature Gating

**File:** `services/api/src/middleware/featureGating.js`

```javascript
const subscriptionService = require('../services/subscriptionService');

// Middleware to check if user can perform action
const requireFeature = (action) => {
  return async (req, res, next) => {
    try {
      const organizationId = req.user.organization_id;

      const canPerform = await subscriptionService.canPerformAction(
        organizationId,
        action
      );

      if (!canPerform) {
        const subscription = await subscriptionService.getSubscription(organizationId);
        return res.status(403).json({
          error: 'Feature not available in your plan',
          currentPlan: subscription.plan_type,
          requiredFeature: action,
          upgradeUrl: '/settings/subscription'
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Error checking subscription' });
    }
  };
};

// Middleware to check quota before creation
const checkQuota = (resourceType) => {
  return async (req, res, next) => {
    try {
      const organizationId = req.user.organization_id;

      const canCreate = await subscriptionService.canPerformAction(
        organizationId,
        `create_${resourceType}`
      );

      if (!canCreate) {
        const subscription = await subscriptionService.getSubscription(organizationId);
        const usage = await subscriptionService.getUsageQuotas(organizationId);

        return res.status(403).json({
          error: `${resourceType} limit reached`,
          currentPlan: subscription.plan_type,
          currentUsage: usage[`${resourceType}s_count`],
          limit: subscription[`max_${resourceType}s`],
          upgradeUrl: '/settings/subscription'
        });
      }

      // Store for use after successful creation
      req.trackUsage = { resourceType, organizationId };
      next();
    } catch (error) {
      res.status(500).json({ error: 'Error checking quota' });
    }
  };
};

// Middleware to increment usage after successful creation
const trackUsage = async (req, res, next) => {
  if (req.trackUsage) {
    const { resourceType, organizationId } = req.trackUsage;
    await subscriptionService.incrementUsage(organizationId, resourceType);
  }
  next();
};

module.exports = {
  requireFeature,
  checkQuota,
  trackUsage
};
```

---

### Day 5: API Endpoints for Subscription

**File:** `services/api/src/routes/subscription.js`

```javascript
const express = require('express');
const router = express.Router();
const subscriptionService = require('../services/subscriptionService');
const { authenticateToken } = require('../middleware/auth');

// Get current subscription details
router.get('/current', authenticateToken, async (req, res) => {
  try {
    const subscription = await subscriptionService.getSubscription(
      req.user.organization_id
    );
    const usage = await subscriptionService.getUsageQuotas(
      req.user.organization_id
    );

    res.json({
      subscription,
      usage,
      upgradeAvailable: subscription.plan_type !== 'professional'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available plans
router.get('/plans', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM plan_features ORDER BY plan_type'
    );

    const plans = result.rows.map(plan => ({
      ...plan,
      pricing: {
        freemium: { monthly: 0, yearly: 0 },
        standard: { monthly: 7900, yearly: 79000 }, // cents
        professional: { monthly: 19900, yearly: 199000 }
      }[plan.plan_type]
    }));

    res.json({ plans });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change plan (will integrate with payment in Week 2)
router.post('/change-plan', authenticateToken, async (req, res) => {
  try {
    const { newPlanType } = req.body;

    if (!['freemium', 'standard', 'professional'].includes(newPlanType)) {
      return res.status(400).json({ error: 'Invalid plan type' });
    }

    await subscriptionService.changePlan(
      req.user.organization_id,
      newPlanType
    );

    res.json({ success: true, message: 'Plan changed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

---

## ✅ WEEK 1 SUCCESS CRITERIA

Before proceeding to Week 2, verify:

- [ ] All 4 database tables created successfully
- [ ] Plan features seeded for all 3 tiers
- [ ] Subscription service methods working
- [ ] Feature gating middleware functional
- [ ] API endpoints returning correct data
- [ ] Can get current subscription details
- [ ] Can check if action is allowed
- [ ] Usage quotas tracked correctly
- [ ] Manual plan change works (no payment yet)

**Testing Checklist:**
```bash
# Create test organization and subscription
# Try to create 4 clients on freemium plan (should fail on 2nd)
# Try to create 4 proposals on freemium plan (should fail on 4th)
# Upgrade to standard, verify limits increased
# Test each feature flag (can_use_ai, can_edit_proposals, etc.)
```

---

## 🔄 WEEK 2 & WEEK 3 SPECS

I'll create detailed Week 2 (Payment Integration) and Week 3 (Feature Gating UI) specifications after Week 1 is approved and tested.

---

**Ready for approval?** Should I proceed with creating the migration files and implementation code for Week 1?

