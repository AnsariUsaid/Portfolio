# Projects to Consider for Portfolio

This document contains a curated list of your best GitHub projects with full details extracted from their READMEs. I've filtered out smaller/trivial projects and focused on substantial work that showcases different skills.

---

## 1. HinglishSarc: Emotion Trajectory Modeling for Sarcasm Detection

**Repository:** https://github.com/AnsariUsaid/HinglishSarc-Emotion-Trajectory
**Primary Language:** Python
**Tech Stack:** PyTorch, IndicBERT, BiLSTM, Transformers
**Created:** Feb 20, 2026

### Description
A research project exploring emotion trajectory modeling for sarcasm detection in Hindi-English code-mixed social media text. The project leverages IndicBERT for textual representation and a BiLSTM-based emotion trajectory encoder to model emotional transitions as explicit features for sarcasm classification.

### Key Features
- Detects sarcasm in Hindi-English code-mixed (Hinglish) text
- Uses emotion trajectory shifts across conversational threads
- Models sequences of fine-grained emotions (joy → frustration transitions)
- Captures sentiment-emotion mismatches that context-only models miss

### Architecture
```
BRANCH 1 (Text): Text → IndicBERT → [CLS] embedding (768-dim)

BRANCH 2 (Trajectory): Emotion sequence → Embedding → BiLSTM (2 layers, 256 hidden) → Attention → Trajectory (256-dim)

FUSION: Concat([CLS], [Trajectory], [cm_ratio]) → Dense(128) → Dropout(0.3) → Sigmoid
```

### Expected Results
- Target: 81%+ F1 (5-8% improvement over mBERT baseline ~75%)
- Focal Loss for handling class imbalance

### Datasets
- Sarcasm: 9,593 samples
- Emotion: 25,688 samples across 10 emotion categories

---

## 2. ScalSQL: Cloud-based Text-to-SQL System

**Repository:** https://github.com/AnsariUsaid/ScalSQL
**Primary Language:** JavaScript
**Tech Stack:** AWS (Lambda, RDS, API Gateway), Node.js, Serverless Framework
**Created:** Feb 21, 2026

### Description
ScalSQL is a scalable cloud-based Text-to-SQL query processing system deployed on AWS. It enables users to convert natural language queries into executable SQL statements with automatic scaling, load balancing, and high availability.

### Key Highlights
- Converts natural language to executable SQL
- Deployed on AWS with auto-scaling capabilities
- Load balancing and high availability features
- Serverless architecture

---

## 3. SalesFlow CRM

**Repository:** https://github.com/AnsariUsaid/salesflow-CRM
**Primary Language:** TypeScript
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Clerk Auth, GraphQL
**Created:** Jan 16, 2026

### Description
A custom CRM system for automobile parts sales with call-based order management. The system manages the entire workflow from initial customer contact through payment processing, order fulfillment, and follow-up.

### Features
- Customer Management - Track customer details and order history
- Order Management - Create and manage orders for automobile parts
- Product Catalog - Manage inventory of automobile parts by make, model, and year
- Secure Payment Processing - Integrate with Authorize.net
- Team Assignment - Assign orders to sales, processing, and follow-up teams
- Order Tracking - Track order status from quote to delivery
- Support Tickets - Handle customer issues and feedback

### User Roles
- **Admin** - Manage users, roles, organizations, and permissions
- **Sales Team** - Receive calls, create orders, process payments
- **Processing Team** - Procure parts, manage shipping
- **Follow-Up Team** - Track delivery, collect feedback

---

## 4. EduPortal - Modern Education Platform

**Repository:** https://github.com/AnsariUsaid/Education_portal_using-s3
**Primary Language:** TypeScript
**Tech Stack:** FastAPI, React 18, TypeScript, AWS S3, PostgreSQL, JWT Auth, Tailwind CSS
**Created:** Sep 28, 2025

### Description
A comprehensive platform connecting educators and students through seamless question paper sharing, answer submission, and academic collaboration. Features secure file storage using AWS S3 and JWT-based authentication.

### Key Features

**For Teachers:**
- Upload Question Papers with descriptions
- Manage Submissions - View all student submissions
- Track Progress - Monitor student performance
- Course Management - Organize content by courses

**For Students:**
- Download Papers - Access question papers by course
- Submit Answers - Securely upload answer sheets
- Track Status - Real-time submission status tracking

**Security:**
- JWT authentication with secure token management
- Role-based access control (Teacher/Student)
- AWS S3 for scalable file storage

### Architecture
```
React Frontend (Port 8080) ↔ FastAPI Backend (Port 8000) ↔ PostgreSQL + AWS S3
```

### Tech Stack Details
- Backend: FastAPI 0.117.1, SQLAlchemy 2.0.43, JWT
- Frontend: React 18.3.1, TypeScript 5.8.3, TailwindCSS, shadcn/ui
- Storage: AWS S3 (Boto3)

---

## 5. Jumbled Frames Video Reconstruction

**Repository:** https://github.com/AnsariUsaid/jumbled-video-reconstruction
**Primary Language:** Python
**Tech Stack:** YOLOv8x, ByteTrack, SSIM, OpenCV, PyTorch
**Created:** Oct 24, 2025

### Description
A Python project to reconstruct jumbled video frames using an advanced motion-based optimization approach with YOLO tracking and hybrid cost analysis. Reconstructs 300 randomly shuffled frames into smooth motion video.

### V8 Approach (Current Best Solution)
- 100% person detection rate with YOLOv8x
- Hybrid motion + SSIM cost optimization
- Smooth trajectory with minimal jumps
- 2-opt local search for optimal ordering

### Technical Implementation

**Step 1: YOLO + ByteTrack Detection**
- YOLOv8x Person Detection on all 300 frames
- Extract largest person per frame (main subject)
- Person Tracking Data: centroid (x, y), size (w, h)

**Step 2: Motion Model Building**
- Calculate position, velocity, size features
- Normalize coordinates and areas
- Motion Model with comprehensive frame features

**Step 3: Hybrid Cost Calculation**
- Motion Cost: position + size consistency
- SSIM Cost: structural similarity (perceptual)
- Weighted combination: 0.3×motion + 0.7×SSIM

**Step 4: 2-opt Local Search**
- Iteratively swap frame pairs
- Accept swaps that reduce total cost
- Converges to optimal frame order

### Results
- Resolution: 1920×1080 (Full HD)
- Frame Rate: 30 FPS
- Total Frames: 300
- Execution Time: ~4-5 minutes

---

## 6. AI-Powered Interview Application

**Repository:** https://github.com/AnsariUsaid/ai-interview-application
**Primary Language:** TypeScript
**Tech Stack:** React 18, TypeScript, FastAPI, Redux Toolkit, OpenRouter API, Shadcn/UI
**Created:** Oct 2, 2025

### Description
An intelligent interview platform that automates the technical interview process using AI-powered question generation and answer evaluation. Provides two distinct interfaces: one for candidates and another for interviewers.

### Features

**For Candidates:**
- Resume Upload & Parsing (PDF/DOCX)
- AI-Generated Questions with varying difficulty
- Timed Responses (20s/60s/120s based on difficulty)
- Real-time Feedback with 0-10 scoring
- Progress Tracking with Redux Persist

**For Interviewers:**
- Candidate Dashboard with all interviewees
- Detailed Analytics per candidate
- Performance Metrics with weighted scoring
- AI-Generated Professional Summaries

### AI Integration
- OpenRouter API for LLM capabilities
- Model: OpenAI GPT-OSS-20B
- Smart Question Generation (role-specific)
- Answer Evaluation with constructive feedback
- Difficulty Balancing (2 easy, 2 medium, 2 hard)

### Tech Stack Details
- Frontend: React 18 + Vite + TailwindCSS + Shadcn/UI + TanStack Query
- Backend: FastAPI + pdfplumber + python-docx
- State Management: Redux Toolkit + Redux Persist
- AI: OpenRouter API integration

---

## 7. Healthcare Interoperability System

**Repository:** https://github.com/AnsariUsaid/healthcare-interoperability-system
**Primary Language:** Python
**Tech Stack:** Python, FHIR Standards
**Created:** Oct 31, 2025

### Description
Emergency medical data exchange system with patient matching and FHIR compliance. Enables secure exchange of medical data between healthcare providers with standardized FHIR protocols.

### Key Features
- Patient matching across systems
- FHIR-compliant data exchange
- Emergency medical data access
- Interoperability between healthcare providers

---

## 8. SQL Data Warehouse

**Repository:** https://github.com/AnsariUsaid/SQL-DataWareHouse
**Primary Language:** T-SQL
**Tech Stack:** SQL Server, Medallion Architecture
**Created:** Nov 28, 2025

### Description
A comprehensive data warehouse project implementing the medallion architecture pattern with Bronze, Silver, and Gold layers using SQL Server.

### Architecture Overview

**Bronze Layer (Raw Zone):**
- Batch Processing, Full Load
- No transformations (Raw Data)
- Truncate & Insert pattern

**Silver Layer (Cleansed & Standardized):**
- Data Cleansing & Standardization
- Data Normalization & Enrichment
- Derived Columns

**Gold Layer (Analytics):**
- Views (Logical Layer Only)
- Star Schema & Flat Tables
- Business Logic & Aggregations

### Data Flow
```
CSV Sources (ERP/CRM) → Bronze → Silver → Gold → BI/ML/Analytics
```

### Source Systems
- **ERP System**: Customer demographics, location, product categories
- **CRM System**: Customer info, product info, sales details

---

## 9. React Quiz App

**Repository:** https://github.com/AnsariUsaid/React-QuizApp
**Primary Language:** JavaScript
**Tech Stack:** React 19, JSON Server, CSS3
**Created:** Dec 4, 2025

### Description
An interactive, timed quiz application built with React that tests React knowledge. Features a modern UI with progress tracking, scoring system, and high score persistence.

### Features
- Interactive Quiz Interface with clean design
- Timed Questions (30-second countdown)
- Progress Tracking with visual progress bar
- Scoring System with points-based scoring
- High Score Persistence
- State Management using useReducer hook

### Technical Details
- React 19.2.1 with useReducer for state management
- JSON Server for mock REST API
- Dark theme with CSS custom properties
- Responsive design

### State Structure
```javascript
{
  questions: [],           // Quiz questions from JSON server
  status: 'loading',      // loading, error, ready, active, finished
  index: 0,               // Current question index
  Answer: null,           // Selected answer
  points: 0,              // Current score
  highScore: 0,           // Best score
  secondsRemaining: null  // Timer countdown
}
```

---

## Summary Table

| Project | Language | Category | Complexity |
|---------|----------|----------|------------|
| HinglishSarc-Emotion-Trajectory | Python | ML/NLP Research | High |
| ScalSQL | JavaScript | Cloud/AWS | High |
| SalesFlow CRM | TypeScript | Full-Stack Web | High |
| EduPortal | TypeScript | Full-Stack Web | High |
| Jumbled Video Reconstruction | Python | Computer Vision | High |
| AI Interview Application | TypeScript | AI/Full-Stack | High |
| Healthcare Interoperability | Python | Healthcare/Interop | Medium |
| SQL Data Warehouse | T-SQL | Data Engineering | Medium |
| React Quiz App | JavaScript | Frontend | Low |

---

## Recommendations

### Top 3 Projects to Highlight:
1. **EduPortal** - Complete full-stack application with AWS S3 integration, JWT auth, modern React stack
2. **Jumbled Video Reconstruction** - Unique computer vision project with advanced optimization algorithms
3. **AI Interview Application** - Demonstrates AI integration, complex state management, dual-interface design

### Categories Covered:
- **Machine Learning/AI:** HinglishSarc, Jumbled Video, AI Interview, Chess Engine
- **Full-Stack Web:** EduPortal, SalesFlow CRM, AI Interview
- **Cloud/AWS:** ScalSQL, EduPortal
- **Data Engineering:** SQL Data Warehouse
- **Computer Vision:** Jumbled Video Reconstruction
- **Healthcare:** Healthcare Interoperability

---

*Generated on: March 29, 2026*
