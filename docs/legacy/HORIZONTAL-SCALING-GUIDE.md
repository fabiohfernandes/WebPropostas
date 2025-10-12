# Horizontal Scaling Guide - WebPropostas V2.0

## 🎯 Scaling Strategy Overview

This guide covers horizontal scaling (adding more instances) for the WebPropostas platform to handle:
- **10,000+ concurrent users**
- **100,000+ proposals/month**
- **99.95% uptime SLA**

---

## 📊 Current vs Target Architecture

### Before Scaling (Single Instance)
```
┌─────────────────────────────────────────┐
│  Railway Container                      │
│  ┌───────────────────────────────────┐ │
│  │  WebPropostas API (Port 3000)    │ │
│  │  - Node.js Express               │ │
│  │  - 1 CPU, 512MB RAM              │ │
│  │  - ~100 concurrent users         │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  PostgreSQL (Railway)                   │
│  - Single database instance             │
│  - Connection pool: 20 connections      │
└─────────────────────────────────────────┘
```

**Limitations:**
- ❌ Single point of failure
- ❌ Limited to vertical scaling (bigger machines)
- ❌ No load distribution
- ❌ Downtime during deployments

---

### After Scaling (Multi-Instance)
```
                    ┌─────────────────────┐
                    │   Load Balancer     │
                    │  (Railway/Nginx)    │
                    └─────────┬───────────┘
                              │
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ API Instance│  │ API Instance│  │ API Instance│
    │      #1     │  │      #2     │  │      #3     │
    │  Port 3000  │  │  Port 3000  │  │  Port 3000  │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           │                │                │
           └────────────────┼────────────────┘
                            ↓
              ┌─────────────────────────────┐
              │   Redis Cluster (Shared)    │
              │   - Session storage         │
              │   - Rate limiting           │
              │   - Cache layer             │
              └──────────────┬──────────────┘
                            ↓
              ┌─────────────────────────────┐
              │  PostgreSQL Primary         │
              │  + Read Replicas (2x)       │
              │  - Connection pooling       │
              │  - PgBouncer (optional)     │
              └─────────────────────────────┘
```

**Benefits:**
- ✅ High availability (no single point of failure)
- ✅ Load distribution across instances
- ✅ Zero-downtime deployments (rolling updates)
- ✅ Auto-scaling based on traffic
- ✅ Better resource utilization

---

## 🏗️ Implementation Steps

### Phase 1: Stateless Application (Week 1)

**Goal:** Make API stateless for horizontal scaling

#### 1.1 Remove In-Memory Session Storage

**Before (Stateful):**
```javascript
// ❌ Bad: Sessions stored in server memory
const session = require('express-session');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore() // ❌ Won't work with multiple instances
}));
```

**After (Stateless):**
```javascript
// ✅ Good: JWT tokens (no server-side session)
const jwt = require('jsonwebtoken');

// Generate token on login
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// Verify token on each request
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

#### 1.2 Externalize Cache to Redis

**Already Implemented:** ✅
- Redis cache utility in `src/utils/cache.js`
- All caching goes through Redis (shared across instances)
- No local in-memory caching

#### 1.3 Database Connection Pooling

**Already Implemented:** ✅
- Connection pool in `src/database/connection-pool.js`
- Each instance has its own pool
- Total connections = instances × pool_size

**Configuration for 3 instances:**
```javascript
// Each instance: 10 connections
// Total: 3 instances × 10 = 30 connections
{
  max: 10,  // Per instance
  min: 2
}
```

---

### Phase 2: Load Balancer Configuration (Week 1-2)

#### 2.1 Railway Load Balancer (Automatic)

Railway automatically load balances when you scale:

```bash
# Scale to 3 instances via Railway CLI
railway scale --replicas 3

# Or via Railway dashboard:
# Settings → Deployments → Replicas: 3
```

Railway handles:
- ✅ Round-robin load balancing
- ✅ Health checks
- ✅ SSL termination
- ✅ Auto-scaling based on CPU/memory

#### 2.2 Custom Nginx Load Balancer (Alternative)

If self-hosting, use Nginx:

```nginx
# /etc/nginx/conf.d/webpropostas.conf
upstream webpropostas_backend {
    # Load balancing algorithm
    least_conn;  # Send to instance with fewest connections

    # Backend instances
    server api-1.webpropostas.internal:3000 max_fails=3 fail_timeout=30s;
    server api-2.webpropostas.internal:3000 max_fails=3 fail_timeout=30s;
    server api-3.webpropostas.internal:3000 max_fails=3 fail_timeout=30s;

    # Health checks
    keepalive 32;
}

server {
    listen 80;
    server_name api.webpropostas.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Load balancer configuration
    location / {
        proxy_pass http://webpropostas_backend;
        proxy_http_version 1.1;

        # Headers for backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "";

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Buffering
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://webpropostas_backend/api/v1/health;
        access_log off;
    }
}
```

---

### Phase 3: Distributed Rate Limiting (Week 2)

**Already Implemented:** ✅
- Rate limiting with Redis in `src/middleware/rate-limiter.js`
- Shared rate limit counters across all instances
- Prevents bypass by hitting different instances

**How it works:**
```javascript
// Request hits Instance #1
Rate limiter checks Redis: "user:123:requests" = 45

// Next request hits Instance #2 (load balanced)
Rate limiter checks same Redis key: "user:123:requests" = 46

// Consistent rate limiting across all instances!
```

---

### Phase 4: Database Read Replicas (Week 3)

#### 4.1 PostgreSQL Read Replicas

**Setup:**
```javascript
// src/database/connection-pool.js

// Primary database (writes)
const primaryPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10
});

// Read replica 1 (reads)
const readReplica1 = new Pool({
  connectionString: process.env.DATABASE_READ_REPLICA_1_URL,
  max: 20  // More connections for reads
});

// Read replica 2 (reads)
const readReplica2 = new Pool({
  connectionString: process.env.DATABASE_READ_REPLICA_2_URL,
  max: 20
});

// Smart query router
async function query(text, params, { readOnly = false } = {}) {
  if (readOnly) {
    // Round-robin between read replicas
    const replica = Math.random() > 0.5 ? readReplica1 : readReplica2;
    return replica.query(text, params);
  } else {
    // Write to primary
    return primaryPool.query(text, params);
  }
}

// Usage
// Reads go to replicas
const proposals = await query('SELECT * FROM proposals WHERE user_id = $1', [userId], { readOnly: true });

// Writes go to primary
const result = await query('INSERT INTO proposals (...) VALUES (...)', [...]);
```

#### 4.2 PgBouncer (Connection Pooler)

Install PgBouncer between app and database:

```ini
# /etc/pgbouncer/pgbouncer.ini
[databases]
orcamentos = host=db.railway.internal port=5432 dbname=orcamentos

[pgbouncer]
listen_addr = *
listen_port = 6432
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt

# Pool sizing
pool_mode = transaction
max_client_conn = 300  # Total from all app instances
default_pool_size = 25 # Actual DB connections
reserve_pool_size = 5
```

**Benefits:**
- 300 app connections → 25 actual DB connections
- Reduces database load
- Better connection reuse

---

### Phase 5: Auto-Scaling Configuration (Week 4)

#### 5.1 Railway Auto-Scaling

```yaml
# railway.json
{
  "autoscaling": {
    "enabled": true,
    "minReplicas": 2,
    "maxReplicas": 10,
    "targetCPU": 70,      # Scale up when CPU > 70%
    "targetMemory": 80    # Scale up when Memory > 80%
  }
}
```

#### 5.2 Kubernetes (If self-hosting)

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webpropostas-api
spec:
  replicas: 3  # Initial replicas
  selector:
    matchLabels:
      app: webpropostas-api
  template:
    metadata:
      labels:
        app: webpropostas-api
    spec:
      containers:
      - name: api
        image: webpropostas/api:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            cpu: 500m
            memory: 512Mi
          limits:
            cpu: 1000m
            memory: 1Gi
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: redis-secrets
              key: url

---
# Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webpropostas-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webpropostas-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80

---
# Service (Load Balancer)
apiVersion: v1
kind: Service
metadata:
  name: webpropostas-api-service
spec:
  type: LoadBalancer
  selector:
    app: webpropostas-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
```

---

## 🔧 Configuration Files

### docker-compose.yml (Multi-Instance)

```yaml
version: '3.8'

services:
  # API Instance 1
  api-1:
    build: ./services/api
    container_name: webpropostas-api-1
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@postgres:5432/orcamentos
      - REDIS_URL=redis://redis:6379
      - INSTANCE_ID=1
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  # API Instance 2
  api-2:
    build: ./services/api
    container_name: webpropostas-api-2
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@postgres:5432/orcamentos
      - REDIS_URL=redis://redis:6379
      - INSTANCE_ID=2
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  # API Instance 3
  api-3:
    build: ./services/api
    container_name: webpropostas-api-3
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@postgres:5432/orcamentos
      - REDIS_URL=redis://redis:6379
      - INSTANCE_ID=3
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  # Nginx Load Balancer
  nginx:
    image: nginx:alpine
    container_name: webpropostas-lb
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - api-1
      - api-2
      - api-3
    restart: unless-stopped

  # PostgreSQL
  postgres:
    image: postgres:15-alpine
    container_name: webpropostas-postgres
    environment:
      POSTGRES_DB: orcamentos
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  # Redis
  redis:
    image: redis:7-alpine
    container_name: webpropostas-redis
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

---

## 📊 Monitoring & Observability

### Health Check Endpoint

```javascript
// src/routes/health.js
router.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    instance: process.env.INSTANCE_ID || 'unknown',
    uptime: process.uptime(),

    // Database health
    database: await dbPool.healthCheck(),

    // Redis health
    cache: {
      connected: cache.isConnected,
      stats: await cache.getStats()
    },

    // Memory usage
    memory: process.memoryUsage(),

    // CPU usage
    cpu: process.cpuUsage()
  };

  res.json(health);
});
```

### Metrics Collection (Prometheus)

```javascript
// src/middleware/metrics.js
const promClient = require('prom-client');

// Create metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code', 'instance']
});

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code', 'instance']
});

// Middleware
function metricsMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;

    httpRequestDuration.observe({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
      instance: process.env.INSTANCE_ID
    }, duration);

    httpRequestTotal.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
      instance: process.env.INSTANCE_ID
    });
  });

  next();
}

// Metrics endpoint
router.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
```

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] All services are stateless (no in-memory storage)
- [ ] Redis cache is configured and tested
- [ ] Database connection pooling is optimized
- [ ] Rate limiting uses Redis (distributed)
- [ ] Health check endpoint returns accurate status
- [ ] Environment variables are set correctly

### Deployment
- [ ] Deploy to staging environment first
- [ ] Run load tests (target: 1000 concurrent users)
- [ ] Monitor for memory leaks over 24 hours
- [ ] Test zero-downtime deployment (rolling update)
- [ ] Verify load balancer distributes traffic evenly
- [ ] Check database connection counts

### Post-Deployment
- [ ] Monitor error rates (target: < 0.1%)
- [ ] Check API response times (target: < 150ms p95)
- [ ] Verify auto-scaling triggers correctly
- [ ] Test instance failure recovery
- [ ] Document any issues in incident log

---

## 🎯 Performance Targets

| Metric                  | Single Instance | Multi-Instance (3x) | Improvement |
|-------------------------|-----------------|---------------------|-------------|
| Max Concurrent Users    | 100             | 1,000+              | 10x         |
| Requests/Second         | 50              | 500+                | 10x         |
| Response Time (p95)     | 300ms           | < 150ms             | 50% faster  |
| Uptime                  | 99.5%           | 99.95%              | +0.45%      |
| Recovery Time           | 5 minutes       | < 30 seconds        | 10x faster  |

---

**Target Completion:** End of Q4 2025
**Status:** Infrastructure ready, awaiting production deployment
