# WebPropostas Marketplace - Database Schema Extension

**Date Created:** January 6, 2025
**Purpose:** Database schema for Phase 46 - Marketplace Search & Discovery
**Status:** Specification Document (Pre-Implementation)

---

## 🎯 Overview

This document defines the complete database schema extension needed to support the **Marketplace Search & Discovery** module - transforming WebPropostas from a proposal management platform into a full marketplace where clients can discover and request services from providers.

---

## 📊 New Tables Required

### 1. marketplace_categories

**Purpose:** Hierarchical category system for organizing listings

```sql
CREATE TABLE IF NOT EXISTS marketplace_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Category hierarchy
  parent_id UUID REFERENCES marketplace_categories(id) ON DELETE SET NULL,

  -- Category info
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL, -- URL-friendly: 'construction-contractors'
  description TEXT,
  icon VARCHAR(50), -- Icon name from icon library

  -- Display
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false, -- Featured on homepage

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- Stats
  listing_count INTEGER DEFAULT 0, -- Denormalized for performance

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_marketplace_categories_parent_id ON marketplace_categories(parent_id);
CREATE INDEX idx_marketplace_categories_slug ON marketplace_categories(slug);
CREATE INDEX idx_marketplace_categories_is_active ON marketplace_categories(is_active);
CREATE INDEX idx_marketplace_categories_display_order ON marketplace_categories(display_order);

-- Example data structure:
-- 🏗️ Construction (parent_id: NULL)
--   ├── Contractors (parent_id: construction_id)
--   ├── Architects (parent_id: construction_id)
--   └── Engineers (parent_id: construction_id)
-- 🏠 Real Estate (parent_id: NULL)
--   ├── Apartments (parent_id: real_estate_id)
--   ├── Houses (parent_id: real_estate_id)
--   └── Commercial (parent_id: real_estate_id)
```

---

### 2. marketplace_listings

**Purpose:** Core listing entity - products, services, and campaigns available in marketplace

```sql
CREATE TABLE IF NOT EXISTS marketplace_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Ownership
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES marketplace_categories(id) ON DELETE RESTRICT,

  -- Listing type
  listing_type VARCHAR(20) NOT NULL, -- 'service', 'product', 'campaign'

  -- Basic info
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL, -- URL-friendly: 'home-painting-florianopolis-123'
  description TEXT NOT NULL,
  short_description VARCHAR(500), -- For cards/previews

  -- Pricing
  price_type VARCHAR(20) NOT NULL, -- 'fixed', 'range', 'quote', 'negotiable'
  price_min DECIMAL(12,2), -- Minimum price (or fixed price)
  price_max DECIMAL(12,2), -- Maximum price (for ranges)
  currency VARCHAR(3) DEFAULT 'BRL',
  price_unit VARCHAR(50), -- 'per hour', 'per project', 'per month', 'per m²'

  -- Media
  cover_image_url TEXT,
  gallery_images JSONB, -- Array of image URLs: ["url1", "url2", ...]
  video_url TEXT, -- YouTube/Vimeo embed URL

  -- Location
  location_type VARCHAR(20) DEFAULT 'local', -- 'local', 'regional', 'national', 'international'
  location_city VARCHAR(100),
  location_state VARCHAR(2),
  location_country VARCHAR(2) DEFAULT 'BR',
  latitude DECIMAL(10,8), -- For map view
  longitude DECIMAL(11,8), -- For map view
  service_radius_km INTEGER, -- How far provider travels (for local services)

  -- Details
  features JSONB, -- Array of feature strings: ["Licensed", "10+ years exp", "Free quote"]
  tags TEXT[], -- Searchable tags: ['painting', 'renovation', 'residential']
  specifications JSONB, -- Flexible key-value pairs for product details

  -- Availability
  is_available BOOLEAN DEFAULT true,
  availability_schedule JSONB, -- Business hours, seasonal availability
  lead_time_days INTEGER, -- Typical time to start project

  -- Status
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'active', 'paused', 'inactive', 'flagged'
  visibility VARCHAR(20) DEFAULT 'public', -- 'public', 'private', 'premium_only'

  -- Moderation
  is_verified BOOLEAN DEFAULT false, -- Admin verified listing
  verified_at TIMESTAMP,
  verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
  moderation_notes TEXT,

  -- Performance metrics (denormalized for speed)
  view_count INTEGER DEFAULT 0,
  quote_request_count INTEGER DEFAULT 0,
  conversion_count INTEGER DEFAULT 0, -- Accepted proposals
  rating_average DECIMAL(3,2) DEFAULT 0, -- 0.00 to 5.00
  rating_count INTEGER DEFAULT 0,

  -- Promotion
  is_featured BOOLEAN DEFAULT false, -- Featured in category
  is_promoted BOOLEAN DEFAULT false, -- Paid promotion
  promoted_until TIMESTAMP,

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_marketplace_listings_user_id ON marketplace_listings(user_id);
CREATE INDEX idx_marketplace_listings_category_id ON marketplace_listings(category_id);
CREATE INDEX idx_marketplace_listings_status ON marketplace_listings(status);
CREATE INDEX idx_marketplace_listings_listing_type ON marketplace_listings(listing_type);
CREATE INDEX idx_marketplace_listings_slug ON marketplace_listings(slug);
CREATE INDEX idx_marketplace_listings_location ON marketplace_listings(location_city, location_state);
CREATE INDEX idx_marketplace_listings_price_range ON marketplace_listings(price_min, price_max);
CREATE INDEX idx_marketplace_listings_is_featured ON marketplace_listings(is_featured);
CREATE INDEX idx_marketplace_listings_is_promoted ON marketplace_listings(is_promoted);
CREATE INDEX idx_marketplace_listings_rating ON marketplace_listings(rating_average DESC);

-- Full-text search index
CREATE INDEX idx_marketplace_listings_search ON marketplace_listings
  USING gin(to_tsvector('portuguese', title || ' ' || COALESCE(description, '')));

-- Geolocation index for proximity search
CREATE INDEX idx_marketplace_listings_location_gist ON marketplace_listings
  USING gist(ll_to_earth(latitude, longitude)) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Tags index for tag-based filtering
CREATE INDEX idx_marketplace_listings_tags ON marketplace_listings USING gin(tags);
```

---

### 3. marketplace_quote_requests

**Purpose:** Track quote requests from clients to providers via marketplace

```sql
CREATE TABLE IF NOT EXISTS marketplace_quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Parties
  listing_id UUID NOT NULL REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Seller
  client_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Buyer (NULL if not registered)

  -- Request details
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20),

  -- Project info
  project_description TEXT NOT NULL,
  project_budget_min DECIMAL(12,2),
  project_budget_max DECIMAL(12,2),
  project_start_date DATE,
  project_location VARCHAR(255),

  -- Custom fields from listing
  custom_fields JSONB, -- Answers to provider's custom questions

  -- Attachments
  attachments JSONB, -- Array of file URLs (photos, documents, etc.)

  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'viewed', 'proposal_sent', 'declined', 'expired'

  -- Response tracking
  provider_viewed_at TIMESTAMP,
  provider_responded_at TIMESTAMP,
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL, -- Created proposal

  -- Client notifications
  notification_sent_at TIMESTAMP,
  reminder_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days')
);

-- Indexes
CREATE INDEX idx_marketplace_quote_requests_listing_id ON marketplace_quote_requests(listing_id);
CREATE INDEX idx_marketplace_quote_requests_provider_id ON marketplace_quote_requests(provider_id);
CREATE INDEX idx_marketplace_quote_requests_client_id ON marketplace_quote_requests(client_id);
CREATE INDEX idx_marketplace_quote_requests_status ON marketplace_quote_requests(status);
CREATE INDEX idx_marketplace_quote_requests_created_at ON marketplace_quote_requests(created_at DESC);
```

---

### 4. marketplace_reviews

**Purpose:** Client reviews and ratings for listings/providers

```sql
CREATE TABLE IF NOT EXISTS marketplace_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Entities
  listing_id UUID NOT NULL REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES users(id) ON DELETE SET NULL,
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL, -- Which proposal this reviews

  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  review_text TEXT,

  -- Dimensions (optional detailed ratings)
  rating_quality INTEGER CHECK (rating_quality >= 1 AND rating_quality <= 5),
  rating_communication INTEGER CHECK (rating_communication >= 1 AND rating_communication <= 5),
  rating_timeline INTEGER CHECK (rating_timeline >= 1 AND rating_timeline <= 5),
  rating_value INTEGER CHECK (rating_value >= 1 AND rating_value <= 5),

  -- Media
  photos JSONB, -- Array of photo URLs

  -- Client info (if not registered)
  client_name VARCHAR(255),
  client_email VARCHAR(255),

  -- Verification
  is_verified_purchase BOOLEAN DEFAULT false, -- Review from actual client
  verified_at TIMESTAMP,

  -- Moderation
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'flagged'
  moderation_notes TEXT,
  moderated_at TIMESTAMP,
  moderated_by UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Provider response
  provider_response TEXT,
  provider_responded_at TIMESTAMP,

  -- Helpfulness
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_marketplace_reviews_listing_id ON marketplace_reviews(listing_id);
CREATE INDEX idx_marketplace_reviews_provider_id ON marketplace_reviews(provider_id);
CREATE INDEX idx_marketplace_reviews_client_id ON marketplace_reviews(client_id);
CREATE INDEX idx_marketplace_reviews_status ON marketplace_reviews(status);
CREATE INDEX idx_marketplace_reviews_rating ON marketplace_reviews(rating DESC);
CREATE INDEX idx_marketplace_reviews_created_at ON marketplace_reviews(created_at DESC);
```

---

### 5. marketplace_saved_listings

**Purpose:** Allow clients to save/favorite listings for later

```sql
CREATE TABLE IF NOT EXISTS marketplace_saved_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Entities
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES marketplace_listings(id) ON DELETE CASCADE,

  -- Organization
  collection_name VARCHAR(100), -- Custom collection: 'Wedding Vendors', 'Home Renovation'
  notes TEXT, -- Personal notes about this listing

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Prevent duplicates
  UNIQUE(user_id, listing_id)
);

-- Indexes
CREATE INDEX idx_marketplace_saved_listings_user_id ON marketplace_saved_listings(user_id);
CREATE INDEX idx_marketplace_saved_listings_listing_id ON marketplace_saved_listings(listing_id);
CREATE INDEX idx_marketplace_saved_listings_collection ON marketplace_saved_listings(user_id, collection_name);
```

---

### 6. marketplace_listing_views

**Purpose:** Track detailed view analytics for listings

```sql
CREATE TABLE IF NOT EXISTS marketplace_listing_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Entities
  listing_id UUID NOT NULL REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL if anonymous

  -- Tracking
  ip_address INET,
  user_agent TEXT,
  device_type VARCHAR(20), -- 'mobile', 'tablet', 'desktop'
  referrer_url TEXT,

  -- Location
  country VARCHAR(2),
  city VARCHAR(100),

  -- Session
  session_id VARCHAR(100), -- Group views in same session
  time_spent_seconds INTEGER,

  -- Timestamp
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_marketplace_listing_views_listing_id ON marketplace_listing_views(listing_id);
CREATE INDEX idx_marketplace_listing_views_viewer_id ON marketplace_listing_views(viewer_id);
CREATE INDEX idx_marketplace_listing_views_created_at ON marketplace_listing_views(created_at DESC);
CREATE INDEX idx_marketplace_listing_views_session ON marketplace_listing_views(session_id);
```

---

## 🔄 Modified Existing Tables

### users table - Add marketplace fields

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS provider_profile JSONB;
-- Example structure:
-- {
--   "company_description": "Full-service construction company...",
--   "years_in_business": 15,
--   "team_size": 12,
--   "certifications": ["CREA-SC", "ISO 9001"],
--   "service_areas": ["Florianópolis", "São José"],
--   "portfolio_url": "https://...",
--   "business_hours": {...}
-- }

ALTER TABLE users ADD COLUMN IF NOT EXISTS marketplace_stats JSONB;
-- Example structure:
-- {
--   "total_listings": 5,
--   "active_listings": 3,
--   "total_quotes_received": 142,
--   "total_proposals_sent": 87,
--   "conversion_rate": 0.612,
--   "average_rating": 4.8,
--   "total_reviews": 23
-- }

ALTER TABLE users ADD COLUMN IF NOT EXISTS is_marketplace_seller BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketplace_verified BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketplace_verified_at TIMESTAMP;
```

---

## 📈 Database Functions & Triggers

### Function: Update listing stats when review is added

```sql
CREATE OR REPLACE FUNCTION update_listing_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE marketplace_listings
  SET
    rating_average = (
      SELECT AVG(rating)::DECIMAL(3,2)
      FROM marketplace_reviews
      WHERE listing_id = NEW.listing_id AND status = 'approved'
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM marketplace_reviews
      WHERE listing_id = NEW.listing_id AND status = 'approved'
    )
  WHERE id = NEW.listing_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_listing_rating_trigger
AFTER INSERT OR UPDATE ON marketplace_reviews
FOR EACH ROW
WHEN (NEW.status = 'approved')
EXECUTE FUNCTION update_listing_rating();
```

---

### Function: Update category listing count

```sql
CREATE OR REPLACE FUNCTION update_category_listing_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Increment for new active listings
  IF (TG_OP = 'INSERT' AND NEW.status = 'active') OR
     (TG_OP = 'UPDATE' AND OLD.status != 'active' AND NEW.status = 'active') THEN
    UPDATE marketplace_categories
    SET listing_count = listing_count + 1
    WHERE id = NEW.category_id;
  END IF;

  -- Decrement for removed active listings
  IF (TG_OP = 'DELETE' AND OLD.status = 'active') OR
     (TG_OP = 'UPDATE' AND OLD.status = 'active' AND NEW.status != 'active') THEN
    UPDATE marketplace_categories
    SET listing_count = listing_count - 1
    WHERE id = COALESCE(OLD.category_id, NEW.category_id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_category_listing_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON marketplace_listings
FOR EACH ROW
EXECUTE FUNCTION update_category_listing_count();
```

---

### Function: Update listing view count

```sql
CREATE OR REPLACE FUNCTION increment_listing_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE marketplace_listings
  SET
    view_count = view_count + 1,
    last_activity_at = CURRENT_TIMESTAMP
  WHERE id = NEW.listing_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_listing_view_count_trigger
AFTER INSERT ON marketplace_listing_views
FOR EACH ROW
EXECUTE FUNCTION increment_listing_view_count();
```

---

## 🔍 Search Queries

### Full-text search with filters

```sql
-- Search for "contractor florianópolis" with price range and rating filter
SELECT
  l.*,
  u.name as provider_name,
  u.company_name,
  c.name as category_name,
  ts_rank(
    to_tsvector('portuguese', l.title || ' ' || COALESCE(l.description, '')),
    plainto_tsquery('portuguese', 'contractor florianópolis')
  ) as relevance_score
FROM marketplace_listings l
JOIN users u ON l.user_id = u.id
JOIN marketplace_categories c ON l.category_id = c.id
WHERE
  l.status = 'active'
  AND l.is_available = true
  AND to_tsvector('portuguese', l.title || ' ' || COALESCE(l.description, '')) @@
      plainto_tsquery('portuguese', 'contractor florianópolis')
  AND l.location_city ILIKE '%florianópolis%'
  AND l.price_min >= 10000
  AND l.price_max <= 200000
  AND l.rating_average >= 4.0
ORDER BY
  l.is_promoted DESC,
  l.is_featured DESC,
  relevance_score DESC,
  l.rating_average DESC
LIMIT 20
OFFSET 0;
```

---

### Proximity search (find services near location)

```sql
-- Find services within 30km of coordinates (Florianópolis center)
SELECT
  l.*,
  earth_distance(
    ll_to_earth(-27.5945, -48.5477),  -- Florianópolis coordinates
    ll_to_earth(l.latitude, l.longitude)
  ) / 1000 as distance_km
FROM marketplace_listings l
WHERE
  l.status = 'active'
  AND l.latitude IS NOT NULL
  AND l.longitude IS NOT NULL
  AND earth_box(ll_to_earth(-27.5945, -48.5477), 30000) @> ll_to_earth(l.latitude, l.longitude)
ORDER BY distance_km ASC
LIMIT 20;
```

---

## 📊 Sample Data (Seeds)

```sql
-- Insert top-level categories
INSERT INTO marketplace_categories (name, slug, description, icon, display_order, is_active, is_featured) VALUES
('Construção e Reformas', 'construcao-reformas', 'Serviços de construção, reforma e manutenção', '🏗️', 1, true, true),
('Imóveis', 'imoveis', 'Apartamentos, casas e imóveis comerciais', '🏠', 2, true, true),
('Veículos', 'veiculos', 'Compra e venda de carros, motos e mais', '🚗', 3, true, true),
('Serviços Pessoais', 'servicos-pessoais', 'Aulas, educação e serviços domésticos', '👨‍🏫', 4, true, false),
('Eventos', 'eventos', 'Planejamento de casamentos, festas e eventos', '🎉', 5, true, false);

-- Insert subcategories for Construção e Reformas
INSERT INTO marketplace_categories (parent_id, name, slug, description, icon, display_order, is_active) VALUES
((SELECT id FROM marketplace_categories WHERE slug = 'construcao-reformas'), 'Construtoras', 'construtoras', 'Empresas de construção civil', '🏢', 1, true),
((SELECT id FROM marketplace_categories WHERE slug = 'construcao-reformas'), 'Arquitetos', 'arquitetos', 'Projetos arquitetônicos residenciais e comerciais', '📐', 2, true),
((SELECT id FROM marketplace_categories WHERE slug = 'construcao-reformas'), 'Engenheiros', 'engenheiros', 'Engenharia civil, elétrica e estrutural', '⚙️', 3, true),
((SELECT id FROM marketplace_categories WHERE slug = 'construcao-reformas'), 'Pintores', 'pintores', 'Serviços de pintura residencial e comercial', '🎨', 4, true),
((SELECT id FROM marketplace_categories WHERE slug = 'construcao-reformas'), 'Paisagismo', 'paisagismo', 'Jardinagem e paisagismo', '🌳', 5, true);

-- Sample listing: Construction company in Florianópolis
INSERT INTO marketplace_listings (
  user_id,
  category_id,
  listing_type,
  title,
  slug,
  description,
  short_description,
  price_type,
  price_min,
  price_max,
  price_unit,
  location_city,
  location_state,
  latitude,
  longitude,
  service_radius_km,
  features,
  tags,
  status,
  is_available,
  rating_average,
  rating_count
) VALUES (
  (SELECT id FROM users WHERE email = 'demo@webpropostas.com'),
  (SELECT id FROM marketplace_categories WHERE slug = 'construtoras'),
  'service',
  'Construções Silva - Construção e Reforma em Florianópolis',
  'construcoes-silva-florianopolis',
  'Empresa especializada em construção civil, reformas residenciais e comerciais com mais de 15 anos de experiência. Equipe qualificada e projetos sob medida.',
  'Construção e reforma com qualidade e garantia. 15 anos de experiência.',
  'range',
  50000.00,
  500000.00,
  'por projeto',
  'Florianópolis',
  'SC',
  -27.5945,
  -48.5477,
  50,
  '["CREA-SC Licenciado", "Equipe própria de 12 profissionais", "Garantia de 5 anos", "Orçamento gratuito", "Financiamento disponível"]',
  ARRAY['construção', 'reforma', 'florianópolis', 'construtora'],
  'active',
  true,
  4.8,
  15
);
```

---

## 🚀 Migration Plan

### Phase 1: Core Marketplace Tables (Week 1)
- Create `marketplace_categories` table
- Create `marketplace_listings` table
- Create basic indexes
- Seed initial categories

### Phase 2: Quote & Review System (Week 2)
- Create `marketplace_quote_requests` table
- Create `marketplace_reviews` table
- Create `marketplace_saved_listings` table
- Create triggers for rating updates

### Phase 3: Analytics & Optimization (Week 3)
- Create `marketplace_listing_views` table
- Add full-text search indexes
- Add geolocation indexes
- Optimize query performance

### Phase 4: Integration & Testing (Week 4)
- Update existing `users` table with marketplace fields
- Create database functions and triggers
- Performance testing with sample data
- Load testing with 10,000+ listings

---

## 📝 API Endpoint Requirements

Based on this schema, the following API endpoints will be needed:

### Public Endpoints (No Auth Required)
- `GET /api/v1/marketplace/categories` - List all categories
- `GET /api/v1/marketplace/search` - Search listings with filters
- `GET /api/v1/marketplace/listings/:id` - Get single listing details
- `GET /api/v1/marketplace/listings/:id/reviews` - Get reviews for listing
- `POST /api/v1/marketplace/quote-requests` - Submit quote request

### Authenticated Client Endpoints
- `GET /api/v1/marketplace/saved` - Get saved listings
- `POST /api/v1/marketplace/saved/:listingId` - Save listing
- `DELETE /api/v1/marketplace/saved/:listingId` - Unsave listing
- `POST /api/v1/marketplace/reviews` - Submit review
- `GET /api/v1/marketplace/my-quote-requests` - Get my quote requests

### Authenticated Provider Endpoints
- `GET /api/v1/marketplace/my-listings` - Get my listings
- `POST /api/v1/marketplace/listings` - Create new listing
- `PUT /api/v1/marketplace/listings/:id` - Update listing
- `DELETE /api/v1/marketplace/listings/:id` - Delete listing
- `GET /api/v1/marketplace/quote-requests` - Get quote requests for my listings
- `PUT /api/v1/marketplace/quote-requests/:id/respond` - Respond to quote request
- `GET /api/v1/marketplace/analytics/:listingId` - Get listing analytics

### Admin Endpoints
- `GET /api/v1/admin/marketplace/listings` - Moderate all listings
- `PUT /api/v1/admin/marketplace/listings/:id/verify` - Verify listing
- `GET /api/v1/admin/marketplace/reviews` - Moderate reviews
- `PUT /api/v1/admin/marketplace/reviews/:id/approve` - Approve review

---

## 🎯 Performance Considerations

### Estimated Storage Requirements
- **10,000 listings**: ~50 MB (5 KB average per listing)
- **100,000 reviews**: ~100 MB (1 KB average per review)
- **1,000,000 views**: ~500 MB (0.5 KB average per view)
- **Total for 1 year**: ~1-2 GB database growth

### Query Performance Targets
- Category listing: < 50ms
- Search with filters: < 200ms
- Single listing detail: < 100ms
- Proximity search: < 300ms
- User's saved listings: < 100ms

### Caching Strategy
- Cache popular categories (Redis, 1 hour TTL)
- Cache featured listings (Redis, 30 min TTL)
- Cache provider profiles (Redis, 1 hour TTL)
- Cache search results (Redis, 15 min TTL with query hash)

---

## ✅ Implementation Checklist

- [ ] Create all 6 new marketplace tables
- [ ] Add indexes for performance
- [ ] Create database functions and triggers
- [ ] Modify users table with marketplace fields
- [ ] Seed initial categories (5 top-level, 20+ subcategories)
- [ ] Create sample listings for demonstration (50+)
- [ ] Implement full-text search
- [ ] Implement geolocation search
- [ ] Set up Redis caching layer
- [ ] Write database migration scripts
- [ ] Create API endpoints (25+ endpoints)
- [ ] Write integration tests for all queries
- [ ] Performance testing with load data
- [ ] Documentation for API endpoints

---

**Document Status:** Complete specification for marketplace database schema
**Next Steps:** Review with stakeholders → Implement Phase 1 migrations → Build API layer
**Estimated Implementation Time:** 4 weeks for complete marketplace functionality
