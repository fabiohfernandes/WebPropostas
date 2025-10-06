# Product Requirements Document
## Gaussian Splatting Hosting Platform

**Version:** 1.0  
**Last Updated:** October 2025  
**Status:** Planning Phase

---

## 1. Executive Summary

### 1.1 Product Overview
A self-hosted platform for creating, processing, hosting, and sharing Gaussian Splatting 3D reconstructions. The platform enables users to upload source imagery, process it into 3D Gaussian Splatting models, and embed interactive 3D viewers into external applications, specifically integrating with a proposals platform.

### 1.2 Business Objectives
- Provide on-premise Gaussian Splatting processing capabilities
- Enable seamless integration with proposals platform for immersive 3D presentations
- Eliminate dependency on third-party hosting services (Luma AI, Polycam, etc.)
- Scale from proof-of-concept to enterprise deployment
- Reduce per-project costs through self-hosting

### 1.3 Target Users
- **Primary:** Sales teams creating proposals with 3D visualizations
- **Secondary:** Marketing teams, real estate professionals, architects
- **Technical:** DevOps/IT managing infrastructure

---

## 2. Technical Architecture

### 2.1 System Components

#### Core Services
1. **Upload Service**
   - Multi-file image/video upload
   - Format validation (JPEG, PNG, MP4, MOV)
   - Metadata extraction (EXIF, camera parameters)
   - Storage management

2. **Processing Pipeline**
   - Structure from Motion (SfM) - COLMAP
   - 3D Gaussian Splatting training
   - Model optimization and compression
   - Quality assurance checks

3. **Viewer Service**
   - WebGL-based 3D viewer
   - Embedding API for proposals platform
   - Viewer customization (branding, controls)
   - Performance optimization

4. **API Gateway**
   - RESTful API for integrations
   - Webhook notifications
   - Authentication & authorization
   - Rate limiting

5. **Storage Layer**
   - Object storage for source files
   - Model file storage (PLY format)
   - CDN for viewer assets
   - Database for metadata

### 2.2 Technology Stack

#### Backend
- **Processing:** Python 3.10+
  - COLMAP for SfM
  - PyTorch for GS training
  - Nerfstudio/gsplat libraries
- **API:** Node.js/FastAPI
- **Database:** PostgreSQL 14+
- **Queue System:** Redis + Celery/Bull
- **Storage:** MinIO (S3-compatible)

#### Frontend
- **Admin Dashboard:** React/Next.js
- **3D Viewer:** Three.js + custom GS renderer
- **Embedding SDK:** JavaScript library

#### Infrastructure
- **Containerization:** Docker + Kubernetes
- **Reverse Proxy:** Nginx
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack

---

## 3. Hardware Requirements

### 3.1 Phase 1: Development/POC (1-5 projects/month)

#### Compute Node
- **CPU:** AMD Ryzen 9 7950X or Intel i9-13900K (16+ cores)
- **RAM:** 64GB DDR5
- **GPU:** NVIDIA RTX 4090 (24GB VRAM) or RTX 4080 (16GB)
- **Storage:** 
  - 2TB NVMe SSD (OS + working files)
  - 4TB SSD (processed models)
- **Network:** 10Gbps NIC
- **Estimated Cost:** $4,000-6,000

#### Storage Server (Optional for Phase 1)
- **NAS/SAN:** Synology DS923+ or TrueNAS
- **Capacity:** 12TB usable (RAID 5/6)
- **Estimated Cost:** $1,500-2,500

### 3.2 Phase 2: Production (10-50 projects/month)

#### Compute Cluster (3 nodes)
**Per Node:**
- **CPU:** AMD EPYC 7443P or Xeon Silver 4316 (24+ cores)
- **RAM:** 128GB ECC DDR4
- **GPU:** 2x NVIDIA RTX 4090 or A5000 (24GB each)
- **Storage:** 
  - 1TB NVMe (OS)
  - 4TB NVMe RAID (scratch space)
- **Estimated Cost per Node:** $12,000-18,000
- **Total Cluster:** $36,000-54,000

#### Storage Infrastructure
- **Primary Storage:** TrueNAS with 48TB usable
- **Backup:** Additional 48TB cold storage
- **Estimated Cost:** $8,000-12,000

#### Network Infrastructure
- **Switch:** 10Gbps managed switch (24 ports)
- **Firewall:** pfSense/OPNsense appliance
- **Estimated Cost:** $2,000-3,000

### 3.3 Phase 3: Enterprise Scale (100+ projects/month)

#### Compute Cluster (10+ nodes)
- Scale horizontally with Kubernetes
- Consider GPU-optimized cloud bursting (AWS EC2 P4/P5)
- Dedicated ingress/processing/rendering nodes

#### Storage
- Distributed object storage (Ceph/GlusterFS)
- 200TB+ capacity with replication
- CDN integration for global delivery

#### Estimated Total: $200,000-300,000

---

## 4. Capture Equipment Requirements

### 4.1 Essential Equipment (Startup)

#### 360° Camera Option
- **Insta360 X3/X4**
  - 8K 360° capture
  - Excellent for environments/interiors
  - **Cost:** $500-600

#### Smartphone + Stabilizer
- **iPhone 15 Pro or Samsung S24 Ultra**
  - 4K 60fps capability
  - Computational photography
  - **Cost:** $1,000-1,200
- **DJI OM 6 Gimbal**
  - Smooth motion capture
  - **Cost:** $150-200

### 4.2 Professional Equipment (Growth Phase)

#### DSLR/Mirrorless Setup
- **Sony A7 IV or Canon R6 Mark II**
  - High-resolution stills (33MP+)
  - 4K video
  - **Cost:** $2,500-3,000
- **Wide-angle lens:** 16-35mm f/2.8
  - **Cost:** $1,200-2,000

#### Drone (Optional)
- **DJI Mavic 3 or Air 3**
  - Aerial 3D reconstruction
  - 4K/5K capture
  - **Cost:** $1,500-2,500

#### LiDAR Scanner (Advanced)
- **iPhone Pro with LiDAR** (already owned)
- **Or Faro Focus S70 (Industrial)**
  - High-precision scanning
  - **Cost:** $25,000-40,000 (only for specialized use cases)

### 4.3 Accessories
- Extra batteries (3-5 per device): $200-400
- High-capacity SD cards (128GB+, V90): $200-300
- Portable lighting kit: $300-500
- Tripod/monopod: $150-300
- **Total Accessories:** $850-1,500

### 4.4 Recommended Starter Kit
**Total: $2,000-3,000**
- Insta360 X4: $600
- iPhone 15 Pro: $1,200
- DJI OM 6: $180
- Accessories: $1,000

---

## 5. Software & Licensing

### 5.1 Open Source (Free)
- **COLMAP:** Structure from Motion
- **Nerfstudio:** Training framework
- **gsplat:** PyTorch GS library
- **Blender:** 3D editing (optional)

### 5.2 Commercial Licenses
- **NVIDIA CUDA Toolkit:** Free
- **PyTorch:** Free
- **Docker Enterprise:** $750-1,500/year (optional)
- **SSL Certificates:** $50-200/year (or Let's Encrypt free)

### 5.3 Cloud Services (Optional Hybrid)
- **AWS/GCP Credits:** $100-500/month for bursting
- **CDN:** Cloudflare/Bunny CDN $20-200/month

---

## 6. Implementation Roadmap

### Phase 0: Pre-Development (Weeks 1-4)
**Duration:** 4 weeks  
**Team:** 1 Full-stack developer, 1 ML/3D engineer

#### Week 1-2: Research & Requirements
- [ ] Audit existing Gaussian Splatting implementations
- [ ] Test open-source training pipelines (gsplat, Nerfstudio)
- [ ] Define API contracts with proposals platform team
- [ ] Create technical specification document

#### Week 3-4: Infrastructure Setup
- [ ] Procure Phase 1 hardware (1 compute node)
- [ ] Set up development environment
- [ ] Install CUDA, PyTorch, COLMAP
- [ ] Configure Docker development environment
- [ ] Set up version control (Git repo structure)

**Deliverables:**
- Technical specification document
- Development environment operational
- Hardware procurement completed

**Budget:** $6,000-8,000 (hardware + setup)

---

### Phase 1: MVP Development (Months 1-3)
**Duration:** 12 weeks  
**Team:** 2-3 developers

#### Month 1: Core Processing Pipeline
**Weeks 1-2:**
- [ ] Implement file upload service (REST API)
- [ ] Build image preprocessing pipeline
- [ ] Integrate COLMAP for SfM reconstruction
- [ ] Create job queue system (Celery/Redis)

**Weeks 3-4:**
- [ ] Implement Gaussian Splatting training
- [ ] Add basic progress tracking
- [ ] Create model optimization pipeline
- [ ] Implement file storage (local/MinIO)

#### Month 2: Viewer & API
**Weeks 5-6:**
- [ ] Develop web-based 3D viewer (Three.js + GS renderer)
- [ ] Implement viewer controls (pan, zoom, rotate)
- [ ] Create embedding SDK for proposals platform
- [ ] Build admin dashboard (project management)

**Weeks 7-8:**
- [ ] RESTful API for project CRUD operations
- [ ] Authentication system (JWT)
- [ ] Webhook system for processing status
- [ ] API documentation (OpenAPI/Swagger)

#### Month 3: Integration & Testing
**Weeks 9-10:**
- [ ] Integrate with proposals platform (API + SDK)
- [ ] End-to-end testing with real captures
- [ ] Performance optimization
- [ ] Error handling and retry logic

**Weeks 11-12:**
- [ ] User acceptance testing
- [ ] Documentation (user guides, API docs)
- [ ] Bug fixes and refinements
- [ ] MVP launch preparation

**Deliverables:**
- Functional MVP platform
- 3D viewer embeddable in proposals
- API documentation
- 5-10 test projects processed

**Success Metrics:**
- Process 1 project per day
- 10-30 minute processing time (depending on input)
- 95%+ successful processing rate

**Budget:** $30,000-45,000 (salaries, ~$0 infrastructure assuming already purchased)

---

### Phase 2: Production Hardening (Months 4-6)
**Duration:** 12 weeks  
**Team:** 3-4 developers + 1 DevOps

#### Month 4: Infrastructure Scale-Up
- [ ] Implement Kubernetes orchestration
- [ ] Set up multi-node processing cluster (3 nodes)
- [ ] Configure distributed storage (TrueNAS/Ceph)
- [ ] Implement CDN for viewer assets
- [ ] Set up monitoring (Prometheus + Grafana)
- [ ] Configure automated backups

#### Month 5: Feature Enhancement
- [ ] Advanced viewer features (measurements, annotations)
- [ ] Batch processing capabilities
- [ ] Model compression options (quality tiers)
- [ ] User management and permissions
- [ ] Analytics dashboard
- [ ] Viewer customization (white-labeling)

#### Month 6: Security & Compliance
- [ ] Security audit and penetration testing
- [ ] Implement rate limiting and DDoS protection
- [ ] Data encryption at rest and in transit
- [ ] GDPR compliance features (data deletion)
- [ ] Backup and disaster recovery testing
- [ ] Load testing and performance tuning

**Deliverables:**
- Production-ready platform
- Scalable infrastructure (10-50 projects/month)
- Security-hardened deployment
- Complete monitoring and alerting

**Success Metrics:**
- 99.5% uptime
- Process 10+ concurrent projects
- <15 minute average processing time
- Zero data loss incidents

**Budget:** $70,000-100,000 (team + $40K hardware)

---

### Phase 3: Advanced Features (Months 7-12)
**Duration:** 24 weeks  
**Team:** 4-5 developers + 1 DevOps + 1 PM

#### Months 7-8: AI Enhancement
- [ ] Automatic scene optimization
- [ ] Intelligent camera path suggestions
- [ ] Quality prediction before processing
- [ ] Auto-cropping and cleanup
- [ ] Neural upsampling for low-res inputs

#### Months 9-10: Collaboration Features
- [ ] Real-time collaborative viewing
- [ ] Commenting and annotation system
- [ ] Version control for models
- [ ] Team workspaces
- [ ] Approval workflows for proposals integration

#### Months 11-12: Enterprise Features
- [ ] SSO integration (SAML, OAuth)
- [ ] Advanced analytics and reporting
- [ ] Custom viewer themes and branding
- [ ] API rate limiting tiers
- [ ] Multi-region deployment support
- [ ] White-label reseller capabilities

**Deliverables:**
- Enterprise-grade platform
- Advanced AI features
- Full proposals platform integration suite
- Comprehensive analytics

**Budget:** $150,000-200,000 (team salaries)

---

## 7. Integration with Proposals Platform

### 7.1 Integration Architecture

#### Embedding Flow
1. **Proposal Creation:**
   - User creates proposal in proposals platform
   - Adds 3D visualization section

2. **Asset Selection:**
   - Proposals platform calls GS Platform API
   - Lists available 3D projects
   - User selects project(s) to embed

3. **Viewer Injection:**
   - Proposals platform embeds viewer SDK
   - Passes project ID and configuration
   - Viewer loads 3D model from GS platform

#### API Endpoints Required

```
GET /api/v1/projects
- List all projects (with pagination, filters)
- Returns: project metadata, thumbnail URLs

GET /api/v1/projects/{id}
- Get specific project details
- Returns: project data, viewer URL, embed code

GET /api/v1/projects/{id}/embed
- Get embed configuration
- Returns: viewer config JSON

POST /api/v1/webhooks
- Receive processing status updates
- Payload: project_id, status, progress, errors
```

### 7.2 Embedding SDK

#### JavaScript SDK Features
```javascript
// Initialize viewer
const viewer = new GaussianSplattingViewer({
  containerId: 'viewer-container',
  projectId: 'abc123',
  apiKey: 'your-api-key',
  baseUrl: 'https://gs-platform.yourdomain.com',
  options: {
    autoRotate: true,
    controls: true,
    annotations: true,
    branding: {
      logo: 'https://yourlogo.png',
      watermark: false
    }
  }
});

// Events
viewer.on('loaded', () => console.log('Model loaded'));
viewer.on('error', (err) => console.error(err));
```

### 7.3 Authentication Flow
1. **API Keys:** Generate scoped API keys in GS platform
2. **JWT Tokens:** Short-lived tokens for viewer sessions
3. **CORS Configuration:** Whitelist proposals platform domain

### 7.4 Webhook Integration
```json
{
  "event": "processing.completed",
  "project_id": "abc123",
  "status": "success",
  "data": {
    "viewer_url": "https://gs-platform.com/view/abc123",
    "embed_code": "<iframe src='...'></iframe>",
    "thumbnail": "https://cdn.gs-platform.com/thumbs/abc123.jpg",
    "processing_time": 847,
    "model_size": 45678912
  }
}
```

---

## 8. Prerequisites Checklist

### 8.1 Technical Prerequisites

#### Skills Required
- [ ] **Python Development:** PyTorch, NumPy, computer vision
- [ ] **Backend Development:** Node.js/FastAPI, REST APIs
- [ ] **Frontend Development:** React, Three.js, WebGL
- [ ] **DevOps:** Docker, Kubernetes, Linux administration
- [ ] **3D Graphics:** Understanding of 3D rendering, camera geometry
- [ ] **Machine Learning:** Basic neural network training

#### Knowledge Areas
- [ ] Structure from Motion (SfM) algorithms
- [ ] Gaussian Splatting fundamentals
- [ ] 3D reconstruction techniques
- [ ] GPU computing and CUDA
- [ ] Distributed systems architecture
- [ ] Web performance optimization

### 8.2 Infrastructure Prerequisites

#### Network
- [ ] Static IP address or dynamic DNS
- [ ] Minimum 100 Mbps upload bandwidth
- [ ] Firewall rules configured (ports 80, 443, 22)
- [ ] SSL certificate (Let's Encrypt or commercial)

#### Development Tools
- [ ] Git version control
- [ ] CI/CD pipeline (GitHub Actions/GitLab CI)
- [ ] Code editor (VS Code with Python/JS extensions)
- [ ] GPU monitoring tools (nvidia-smi, nvtop)

#### Accounts & Services
- [ ] Domain name registered
- [ ] GitHub/GitLab organization
- [ ] Docker Hub or private registry
- [ ] Monitoring service account (Grafana Cloud, optional)
- [ ] CDN account (Cloudflare, optional)

### 8.3 Capture Prerequisites

#### Training & Documentation
- [ ] Gaussian Splatting capture best practices guide
- [ ] Equipment operation manuals
- [ ] Sample capture workflows for different scenarios:
  - Indoor environments
  - Outdoor scenes
  - Objects (360° turntable)
  - Architectural exteriors

#### Quality Standards
- [ ] Minimum image resolution: 1920x1080
- [ ] Minimum capture frame rate: 30fps for video
- [ ] Recommended overlap: 70-80% between images
- [ ] Lighting conditions: Avoid extreme contrast/direct sun
- [ ] Coverage: 360° coverage for full scenes

---

## 9. Cost Breakdown Summary

### 9.1 Initial Investment (Phase 1)

| Category | Item | Cost |
|----------|------|------|
| **Hardware** | Compute node (GPU workstation) | $5,000 |
| **Hardware** | Storage (NAS/SSD) | $2,000 |
| **Capture** | Starter equipment kit | $2,500 |
| **Infrastructure** | Networking, UPS, cables | $1,000 |
| **Software** | Licenses (optional commercial) | $500 |
| **Development** | 3 months (2 developers) | $45,000 |
| **TOTAL** | | **$56,000** |

### 9.2 Year 1 Operating Costs

| Category | Monthly | Annual |
|----------|---------|--------|
| **Team** | $30,000 | $360,000 |
| **Infrastructure** | $500 | $6,000 |
| **Electricity** (GPUs running) | $300 | $3,600 |
| **Internet** | $100 | $1,200 |
| **Maintenance** | $200 | $2,400 |
| **CDN/Cloud** (optional) | $200 | $2,400 |
| **TOTAL** | **$31,300** | **$375,600** |

### 9.3 Scaling Costs (Phase 2-3)

| Phase | Hardware | Team Growth | Annual Total |
|-------|----------|-------------|--------------|
| **Phase 2** | +$40,000 | +1 DevOps | +$120,000/yr |
| **Phase 3** | +$150,000 | +2 developers | +$240,000/yr |

---

## 10. Risk Analysis

### 10.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **GPU shortage/price volatility** | High | Medium | Secure hardware early; consider cloud bursting |
| **Processing quality inconsistent** | High | Medium | Extensive testing; quality prediction ML model |
| **Viewer performance on low-end devices** | Medium | High | Multiple quality tiers; progressive loading |
| **Data loss** | Critical | Low | 3-2-1 backup strategy; RAID arrays |
| **Scaling bottlenecks** | Medium | Medium | Load testing; horizontal scaling architecture |

### 10.2 Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Competitor enters market** | Medium | High | Focus on proposals integration; build moat |
| **Technology obsolescence** | Medium | Low | Modular architecture; stay current with research |
| **High infrastructure costs** | Medium | Medium | Right-size hardware; usage-based scaling |
| **Low adoption rate** | High | Medium | Strong proposals platform integration; training |

---

## 11. Success Metrics & KPIs

### 11.1 Technical KPIs
- **Processing Success Rate:** >95%
- **Average Processing Time:** <20 minutes
- **System Uptime:** >99.5%
- **Viewer Load Time:** <3 seconds
- **API Response Time:** <200ms (p95)

### 11.2 Business KPIs
- **Monthly Active Projects:** Track growth
- **Proposals Integration Usage:** % of proposals with 3D
- **Processing Volume:** Projects/month
- **Storage Efficiency:** GB per project
- **Cost per Project:** Total cost / projects processed

### 11.3 User Experience KPIs
- **User Satisfaction Score:** >4.5/5
- **Feature Adoption Rate:** % using advanced features
- **Support Ticket Volume:** Track decrease over time
- **Time to First Successful Project:** <30 minutes

---

## 12. Next Steps

### Immediate Actions (Next 2 Weeks)
1. **Approve budget** and secure funding for Phase 1
2. **Order hardware** (lead time: 1-2 weeks)
3. **Hire/assign** technical team
4. **Set up development environment** and repositories
5. **Conduct capture equipment research** and testing

### Month 1 Priorities
1. Begin MVP development (upload + processing pipeline)
2. Test Gaussian Splatting training with sample data
3. Design API contracts with proposals team
4. Create project management board (Jira/Linear)

### Stakeholder Alignment
- [ ] Engineering team kickoff
- [ ] Weekly progress reviews with proposals platform team
- [ ] Monthly executive updates
- [ ] Quarterly roadmap reviews

---

## 13. Appendices

### Appendix A: Glossary
- **Gaussian Splatting:** 3D reconstruction technique using 3D Gaussians
- **SfM:** Structure from Motion - 3D reconstruction from images
- **COLMAP:** Open-source SfM software
- **PLY:** Polygon File Format for 3D models
- **WebGL:** JavaScript API for 3D graphics in browsers

### Appendix B: References
- Gaussian Splatting Paper: "3D Gaussian Splatting for Real-Time Radiance Field Rendering"
- COLMAP Documentation: https://colmap.github.io/
- Nerfstudio: https://docs.nerf.studio/
- gsplat: https://github.com/nerfstudio-project/gsplat

### Appendix C: Contact Information
- **Product Owner:** [Your Name]
- **Technical Lead:** [To be assigned]
- **Proposals Platform Integration:** [Proposals team contact]

---

**Document Version History**
- v1.0 (2025-10-06): Initial comprehensive PRD