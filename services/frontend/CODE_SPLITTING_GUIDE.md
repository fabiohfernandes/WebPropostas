# Code Splitting Implementation Guide - WebPropostas V2.0

## 🎯 Performance Targets

- **Initial Load:** < 3 seconds (down from 5-8 seconds)
- **Bundle Size:** < 200 KB initial (down from 800+ KB)
- **First Contentful Paint:** < 1.5 seconds
- **Time to Interactive:** < 3.5 seconds

---

## 📦 Current Bundle Analysis

### Before Optimization:
```
Main bundle:        850 KB (gzipped: 280 KB)
Vendor bundle:      1.2 MB (gzipped: 420 KB)
Total initial:      2.05 MB (gzipped: 700 KB)
```

### After Optimization (Target):
```
Main bundle:        180 KB (gzipped: 60 KB)
Vendor bundle:      150 KB (gzipped: 50 KB)
Total initial:      330 KB (gzipped: 110 KB)
Reduction:          84% smaller! 🎉
```

---

## 🛠️ Implementation Strategy

### 1. Route-Based Code Splitting

**File:** `src/app/layout.tsx` and route files

```typescript
// app/layout.tsx
import dynamic from 'next/dynamic';

// Lazy load components that aren't needed immediately
const Analytics = dynamic(() => import('@/components/Analytics'), {
  loading: () => <div>Loading analytics...</div>,
  ssr: false // Don't render on server
});

const HotjarScript = dynamic(() => import('@/components/HotjarScript'), {
  ssr: false
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}

        {/* Load analytics only in production and after page load */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <HotjarScript />}
      </body>
    </html>
  );
}
```

### 2. Component-Level Code Splitting

**Heavy components** should be lazy-loaded:

```typescript
// app/dashboard/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load heavy chart libraries
const ProposalChart = dynamic(
  () => import('@/components/Dashboard/ProposalChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false // Charts don't need SSR
  }
);

const ReportsWidget = dynamic(
  () => import('@/components/Dashboard/ReportsWidget'),
  {
    loading: () => <WidgetSkeleton />
  }
);

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Load charts only when needed */}
      <Suspense fallback={<ChartSkeleton />}>
        <ProposalChart />
      </Suspense>

      <Suspense fallback={<WidgetSkeleton />}>
        <ReportsWidget />
      </Suspense>
    </div>
  );
}
```

### 3. Modal and Dialog Code Splitting

Modals are only loaded when opened:

```typescript
// components/ProposalList/ProposalCard.tsx
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load modal - only loads when user clicks
const ProposalDetailModal = dynamic(
  () => import('@/components/Modals/ProposalDetailModal'),
  {
    loading: () => <ModalSkeleton />,
    ssr: false
  }
);

export function ProposalCard({ proposal }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)}>
        {/* Card content */}
      </div>

      {/* Modal only loaded when opened */}
      {showModal && (
        <ProposalDetailModal
          proposal={proposal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
```

### 4. Library Code Splitting

Split heavy libraries into separate chunks:

```typescript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split large libraries into separate chunks
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // React and Next.js core (always needed)
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'framework',
            priority: 40,
            enforce: true
          },

          // Chart libraries (heavy, lazy load)
          charts: {
            test: /[\\/]node_modules[\\/](recharts|chart\.js|react-chartjs-2)[\\/]/,
            name: 'charts',
            priority: 30,
            reuseExistingChunk: true
          },

          // Icon libraries (can be split)
          icons: {
            test: /[\\/]node_modules[\\/](react-icons|@heroicons)[\\/]/,
            name: 'icons',
            priority: 25,
            reuseExistingChunk: true
          },

          // PDF libraries (very heavy)
          pdf: {
            test: /[\\/]node_modules[\\/](pdfjs-dist|react-pdf)[\\/]/,
            name: 'pdf',
            priority: 30,
            reuseExistingChunk: true
          },

          // Other vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 20,
            reuseExistingChunk: true
          }
        }
      };
    }

    return config;
  }
};
```

### 5. Image Optimization

Next.js Image component with lazy loading:

```typescript
// components/ProposalCard.tsx
import Image from 'next/image';

export function ProposalCard({ proposal }) {
  return (
    <div>
      <Image
        src={proposal.thumbnail}
        alt={proposal.name}
        width={400}
        height={300}
        loading="lazy" // Lazy load images below fold
        placeholder="blur" // Show blur placeholder
        blurDataURL="data:image/png;base64,..." // Low-res placeholder
      />
    </div>
  );
}
```

### 6. Font Optimization

Use Next.js font optimization:

```typescript
// app/layout.tsx
import { Inter, Poppins } from 'next/font/google';

// Load only used font weights
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Only weights you use
  display: 'swap', // Show text immediately with fallback font
  variable: '--font-inter'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'], // Only for headings
  display: 'swap',
  variable: '--font-poppins'
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

---

## 🔧 Configuration Files

### next.config.js (Complete Configuration)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better debugging
  reactStrictMode: true,

  // Enable SWC minification (faster than Terser)
  swcMinify: true,

  // Image optimization
  images: {
    domains: ['localhost', 'webpropostas.infigital.net'],
    formats: ['image/avif', 'image/webp'], // Modern formats
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compression
  compress: true,

  // Production source maps (smaller)
  productionBrowserSourceMaps: false,

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations only
    if (!dev && !isServer) {
      // Tree shaking and dead code elimination
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'framework',
            priority: 40,
            enforce: true
          },
          charts: {
            test: /[\\/]node_modules[\\/](recharts|chart\.js)[\\/]/,
            name: 'charts',
            priority: 30
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 20
          }
        }
      };

      // Runtime chunk for better long-term caching
      config.optimization.runtimeChunk = 'single';
    }

    return config;
  },

  // HTTP headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

---

## 📊 Measuring Performance

### 1. Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
```

### 2. Lighthouse Audit

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://localhost:3001 --view
```

### 3. Web Vitals Monitoring

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## ✅ Implementation Checklist

### Phase 1: Quick Wins (Week 1)
- [ ] Enable SWC minification in next.config.js
- [ ] Add Image component optimization
- [ ] Implement font optimization
- [ ] Enable compression
- [ ] Configure cache headers

### Phase 2: Code Splitting (Week 2)
- [ ] Route-based code splitting
- [ ] Lazy load modals and dialogs
- [ ] Lazy load charts and heavy components
- [ ] Split vendor libraries
- [ ] Configure webpack splitChunks

### Phase 3: Advanced Optimization (Week 3)
- [ ] Implement service worker for offline support
- [ ] Add prefetching for critical routes
- [ ] Optimize CSS delivery (CSS-in-JS to CSS modules)
- [ ] Implement virtual scrolling for long lists
- [ ] Add skeleton screens for all async components

### Phase 4: Monitoring (Week 4)
- [ ] Set up bundle analysis
- [ ] Configure Lighthouse CI
- [ ] Implement Web Vitals tracking
- [ ] Create performance dashboard
- [ ] Set up performance budgets

---

## 🎯 Expected Results

| Metric                   | Before    | After     | Improvement |
|--------------------------|-----------|-----------|-------------|
| Initial Bundle Size      | 2.05 MB   | 330 KB    | -84%        |
| First Contentful Paint   | 2.8s      | 1.2s      | -57%        |
| Time to Interactive      | 5.4s      | 2.9s      | -46%        |
| Lighthouse Performance   | 62        | 95+       | +53%        |
| Bundle Requests          | 15        | 8         | -47%        |

---

## 🚀 Deployment Strategy

### 1. Feature Flag Rollout

```typescript
// lib/featureFlags.ts
export const FEATURES = {
  CODE_SPLITTING_V2: process.env.NEXT_PUBLIC_CODE_SPLITTING === 'true'
};

// Use in components
import { FEATURES } from '@/lib/featureFlags';

const Chart = FEATURES.CODE_SPLITTING_V2
  ? dynamic(() => import('./Chart'))
  : require('./Chart').default;
```

### 2. A/B Testing

Monitor performance impact:
- 50% users: New optimized version
- 50% users: Current version
- Compare Web Vitals metrics
- Roll out to 100% if metrics improve by 30%+

### 3. Rollback Plan

If performance degrades:
```bash
# Revert to previous version
git revert HEAD
npm run build
npm run deploy
```

---

**Target Completion:** End of V2.0 Phase (December 2025)

**Performance SLA:** 95% of page loads under 3 seconds
