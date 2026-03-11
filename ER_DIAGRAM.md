# 📊 Resumey - ER Diagram & Data Flow Documentation

## Database Design & Data Architecture for Resume Builder

---

## 📋 Table of Contents

1. [Current Data Model (Local Storage)](#1-current-data-model-local-storage)
2. [Future Database ER Diagram](#2-future-database-er-diagram)
3. [Data Flow Diagrams](#3-data-flow-diagrams)
4. [Entity Relationships](#4-entity-relationships)
5. [Data Validation Rules](#5-data-validation-rules)
6. [Migration Strategy](#6-migration-strategy)

---

## 1. Current Data Model (Local Storage)

Since Resumey currently uses **localStorage** for data persistence, the data model is represented as JSON structures stored in the browser.

### Local Storage Keys

```
localStorage Keys:
├── resume-draft           # Current resume being edited
├── resume-templates       # Available templates
├── user-preferences       # Theme, language settings
├── saved-resumes          # Previously created resumes
└── analytics-data         # Usage statistics (future)
```

### Resume Data Structure

```json
{
  "id": "resume-1772734345321",
  "title": "Software Development Resume",
  "template": "modern",
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-123-4567",
    "location": "New York, NY",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "website": "https://johndoe.dev"
  },
  "summary": "Experienced software developer with 5+ years...",
  "experience": [
    {
      "id": "exp-1",
      "company": "Tech Corp",
      "position": "Senior Software Engineer",
      "startDate": "2022-01",
      "endDate": null,
      "current": true,
      "location": "New York, NY",
      "description": "Led development of microservices architecture...",
      "achievements": [
        "Improved system performance by 40%",
        "Mentored 3 junior developers"
      ],
      "technologies": ["React", "Node.js", "AWS"]
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "school": "University of Technology",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "startDate": "2018-09",
      "endDate": "2022-05",
      "gpa": "3.8",
      "location": "Boston, MA",
      "achievements": ["Dean's List", "CS Club President"]
    }
  ],
  "skills": [
    "JavaScript", "TypeScript", "React", "Node.js",
    "Python", "SQL", "AWS", "Docker", "Git"
  ],
  "projects": [
    {
      "id": "proj-1",
      "name": "E-commerce Platform",
      "description": "Full-stack e-commerce solution built with React and Node.js",
      "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
      "url": "https://myecommerce.com",
      "github": "https://github.com/johndoe/ecommerce",
      "startDate": "2023-03",
      "endDate": "2023-08",
      "highlights": [
        "Processed 10,000+ transactions",
        "99.9% uptime achieved"
      ]
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "name": "AWS Solutions Architect",
      "issuer": "Amazon Web Services",
      "date": "2023-06",
      "url": "https://aws.amazon.com/certification/",
      "credentialId": "AWS-SAA-123456"
    }
  ],
  "languages": [
    {
      "name": "English",
      "proficiency": "Native"
    },
    {
      "name": "Spanish",
      "proficiency": "Intermediate"
    }
  ],
  "metadata": {
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:45:00Z",
    "version": "1.0",
    "wordCount": 450,
    "atsScore": 85
  }
}
```

### Current Data Relationships (Conceptual)

```
Resume (Root)
├── Personal Info (1:1)
├── Summary (1:1)
├── Experience (1:N)
├── Education (1:N)
├── Skills (1:N)
├── Projects (1:N)
├── Certifications (1:N)
├── Languages (1:N)
└── Metadata (1:1)
```

---

## 2. Future Database ER Diagram

When migrating to a database, here's the proposed relational structure:

### Entity-Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           RESUME BUILDER DATABASE                        │
│                                                                         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │     USERS       │    │    RESUMES      │    │   TEMPLATES     │     │
│  │                 │    │                 │    │                 │     │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │     │
│  │ │ user_id     │ │    │ │ resume_id   │ │    │ │ template_id │ │     │
│  │ │ email       │ │    │ │ user_id     │◄┼────┼┘ template_id │ │     │
│  │ │ name        │ │    │ │ title       │ │    │ │ name        │ │     │
│  │ │ password    │ │    │ │ template_id │─┼────┼►│ description │ │     │
│  │ │ created_at  │ │    │ │ created_at  │ │    │ │ preview_url │ │     │
│  │ │ updated_at  │ │    │ │ updated_at  │ │    │ │ is_active   │ │     │
│  │ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │     │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘     │
│          │                            │                      │         │
│          │                            │                      │         │
│          ▼                            ▼                      ▼         │
│                                                                         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │ PERSONAL_INFO   │    │   EXPERIENCE    │    │    SKILLS       │     │
│  │                 │    │                 │    │                 │     │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │     │
│  │ │ resume_id   │◄┼────┼┘ resume_id   │ │    │ │ resume_id   │◄┼────┼───┐
│  │ │ full_name   │ │    │ │ company     │ │    │ │ skill_name  │ │    │   │
│  │ │ email       │ │    │ │ position    │ │    │ │ category    │ │    │   │
│  │ │ phone       │ │    │ │ start_date  │ │    │ │ proficiency │ │    │   │
│  │ │ location    │ │    │ │ end_date    │ │    │ └─────────────┘ │    │   │
│  │ │ linkedin    │ │    │ │ description │ │    │                 │    │   │
│  │ │ github      │ │    │ └─────────────┘ │    │  SKILL_CATEGORIES   │    │
│  │ └─────────────┘ │    │                 │    │  ┌─────────────┐ │    │   │
│  └─────────────────┘    │    ACHIEVEMENTS   │    │ │ category_id │ │    │   │
│          ▲              │  ┌─────────────┐ │    │ │ name        │ │    │   │
│          │              │  │ exp_id      │ │    │ └─────────────┘ │    │   │
│          │              │  │ achievement │ │    └─────────────────┘    │   │
│          │              │  └─────────────┘ │                           │   │
│          │              └──────────────────┘                           │   │
│          │                                                           │   │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │   │
│  │   EDUCATION     │    │   PROJECTS      │    │ CERTIFICATIONS  │     │   │
│  │                 │    │                 │    │                 │     │   │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │     │   │
│  │ │ resume_id   │◄┼────┼┘ resume_id   │ │    │ │ resume_id   │◄┼────┼┐  │
│  │ │ school      │ │    │ │ name        │ │    │ │ name        │ │  │  │
│  │ │ degree      │ │    │ │ description │ │    │ │ issuer      │ │  │  │
│  │ │ field       │ │    │ │ url         │ │    │ │ date        │ │  │  │
│  │ │ start_date  │ │    │ │ github      │ │    │ │ url         │ │  │  │
│  │ │ end_date    │ │    │ │ start_date  │ │    │ └─────────────┘ │  │  │
│  │ └─────────────┘ │    │ │ end_date    │ │    │                 │  │  │
│  └─────────────────┘    │ └─────────────┘ │    │   ISSUERS         │  │  │
│                         │                 │    │  ┌─────────────┐ │  │  │
│          ▲              │   TECHNOLOGIES   │    │ │ issuer_id   │ │  │  │
│          │              │  ┌─────────────┐ │    │ │ name        │ │  │  │
│          │              │  │ proj_id     │ │    │ │ website     │ │  │  │
│          │              │  │ technology  │ │    │ └─────────────┘ │  │  │
│          │              │  └─────────────┘ │    └─────────────────┘  │  │
│          │              └──────────────────┘                         │  │
│          │                                                         │  │
│  ┌─────────────────┐    ┌─────────────────┐                         │  │
│  │   LANGUAGES     │    │   ANALYTICS     │                         │  │
│  │                 │    │                 │                         │  │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │                         │  │
│  │ │ resume_id   │◄┼────┼┘ resume_id   │ │                         │  │
│  │ │ name        │ │    │ │ event_type  │ │                         │  │
│  │ │ proficiency │ │    │ │ event_data  │ │                         │  │
│  │ └─────────────┘ │    │ │ timestamp   │ │                         │  │
│  └─────────────────┘    │ └─────────────┘ │                         │  │
│                         └─────────────────┘                         │  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Database Schema (SQL DDL)

```sql
-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Templates table
CREATE TABLE templates (
    template_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    preview_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resumes table
CREATE TABLE resumes (
    resume_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    template_id INTEGER REFERENCES templates(template_id),
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Personal info table
CREATE TABLE personal_info (
    resume_id INTEGER PRIMARY KEY REFERENCES resumes(resume_id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    linkedin VARCHAR(500),
    github VARCHAR(500),
    website VARCHAR(500),
    summary TEXT
);

-- Experience table
CREATE TABLE experience (
    exp_id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resumes(resume_id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experience achievements (one-to-many)
CREATE TABLE experience_achievements (
    achievement_id SERIAL PRIMARY KEY,
    exp_id INTEGER REFERENCES experience(exp_id) ON DELETE CASCADE,
    achievement TEXT NOT NULL
);

-- Education table
CREATE TABLE education (
    edu_id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resumes(resume_id) ON DELETE CASCADE,
    school VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    gpa VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resumes(resume_id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    proficiency VARCHAR(20) DEFAULT 'Beginner'
);

-- Projects table
CREATE TABLE projects (
    proj_id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resumes(resume_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(500),
    github VARCHAR(500),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project technologies (many-to-many)
CREATE TABLE project_technologies (
    proj_id INTEGER REFERENCES projects(proj_id) ON DELETE CASCADE,
    technology VARCHAR(100) NOT NULL,
    PRIMARY KEY (proj_id, technology)
);

-- Certifications table
CREATE TABLE certifications (
    cert_id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resumes(resume_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    date DATE,
    url VARCHAR(500),
    credential_id VARCHAR(100)
);

-- Languages table
CREATE TABLE languages (
    lang_id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resumes(resume_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    proficiency VARCHAR(20) DEFAULT 'Beginner'
);

-- Analytics table
CREATE TABLE analytics (
    analytics_id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resumes(resume_id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_resumes_template_id ON resumes(template_id);
CREATE INDEX idx_experience_resume_id ON experience(resume_id);
CREATE INDEX idx_education_resume_id ON education(resume_id);
CREATE INDEX idx_skills_resume_id ON skills(resume_id);
CREATE INDEX idx_projects_resume_id ON projects(resume_id);
CREATE INDEX idx_certifications_resume_id ON certifications(resume_id);
CREATE INDEX idx_languages_resume_id ON languages(resume_id);
CREATE INDEX idx_analytics_resume_id ON analytics(resume_id);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
```

---

## 3. Data Flow Diagrams

### 3.1 Resume Creation Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Landing   │───▶│ Template   │───▶│   Form      │───▶│  Preview    │
│   Page      │    │ Selection  │    │   Steps     │    │   & Edit    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Auto-save   │    │   State     │    │ Validation │    │   PDF       │
│ to Local    │    │ Management │    │   Rules     │    │ Generation  │
│ Storage     │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### 3.2 Detailed Component Data Flow

```
User Interaction
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│   Custom    │────▶│   Custom    │
│ Components  │     │    Hooks    │     │ Validators  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   useState  │     │ useLocal-  │     │   Zod       │
│   Updates   │     │   Storage  │     │   Schema    │
│             │     │   Hook     │     │ Validation  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Local       │     │ Browser    │     │   Error     │
│ Storage     │     │   API      │     │ Messages    │
│ Persistence │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

### 3.3 PDF Generation Flow

```
Resume Data (JSON)
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│   Canvas    │────▶│   PDF.js   │
│ Template    │     │ Rendering   │     │   Library  │
│ Component   │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   HTML/CSS  │────▶│   PNG/JPG   │────▶│   PDF       │
│   to Image  │     │   Images    │     │   Document  │
│ Conversion  │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Download  │     │   File      │     │   Browser   │
│   Trigger   │     │   Blob      │     │   Download  │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

### 3.4 Template Rendering Flow

```
Template Selection
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Template    │────▶│   Resume    │────▶│   Dynamic   │
│   Config    │     │    Data     │     │   Import    │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│   Tailwind  │────▶│   Styled    │
│ Component   │     │   Classes   │     │   Output    │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Print     │     │   Mobile    │     │   A4        │
│   Styles    │     │ Responsive  │     │   Layout    │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 4. Entity Relationships

### 4.1 Cardinality Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| User → Resumes | 1:N | One user can create multiple resumes |
| Resume → Personal Info | 1:1 | Each resume has one set of personal info |
| Resume → Experience | 1:N | Each resume can have multiple experiences |
| Resume → Education | 1:N | Each resume can have multiple education entries |
| Resume → Skills | 1:N | Each resume can have multiple skills |
| Resume → Projects | 1:N | Each resume can have multiple projects |
| Resume → Certifications | 1:N | Each resume can have multiple certifications |
| Resume → Languages | 1:N | Each resume can have multiple languages |
| Resume → Analytics | 1:N | Each resume can have multiple analytics events |
| Resume → Template | N:1 | Multiple resumes can use the same template |
| Experience → Achievements | 1:N | Each experience can have multiple achievements |
| Project → Technologies | 1:N | Each project can use multiple technologies |

### 4.2 Data Dependencies

```
STRONG DEPENDENCIES (Required)
├── Resume → Personal Info (full_name required)
├── Resume → Template (must select template)
├── Experience → Company + Position (required fields)
├── Education → School + Degree (required fields)
└── Skills → Skill Name (required field)

WEAK DEPENDENCIES (Optional)
├── Personal Info → Contact Details (email, phone, etc.)
├── Experience → Location, Achievements
├── Education → GPA, Achievements
├── Projects → URL, GitHub, Technologies
├── Certifications → URL, Credential ID
└── Languages → Proficiency Level
```

### 4.3 Data Integrity Rules

```sql
-- Foreign Key Constraints
ALTER TABLE resumes ADD CONSTRAINT fk_resumes_user
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

ALTER TABLE resumes ADD CONSTRAINT fk_resumes_template
    FOREIGN KEY (template_id) REFERENCES templates(template_id);

-- Check Constraints
ALTER TABLE skills ADD CONSTRAINT chk_proficiency
    CHECK (proficiency IN ('Beginner', 'Intermediate', 'Advanced', 'Expert'));

ALTER TABLE languages ADD CONSTRAINT chk_lang_proficiency
    CHECK (proficiency IN ('Beginner', 'Intermediate', 'Advanced', 'Native'));

-- Unique Constraints
ALTER TABLE users ADD CONSTRAINT uniq_users_email UNIQUE (email);
ALTER TABLE personal_info ADD CONSTRAINT uniq_personal_resume UNIQUE (resume_id);
```

---

## 5. Data Validation Rules

### 5.1 Field-Level Validation

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| full_name | string | Yes | 1-100 chars | "John Doe" |
| email | string | Yes | Valid email format | "john@example.com" |
| phone | string | No | 10-15 digits | "+1-555-123-4567" |
| linkedin | string | No | Valid URL | "https://linkedin.com/in/johndoe" |
| github | string | No | Valid URL | "https://github.com/johndoe" |
| company | string | Yes | 1-100 chars | "Tech Corporation" |
| position | string | Yes | 1-100 chars | "Senior Developer" |
| start_date | date | Yes | Past/future date | "2022-01-15" |
| end_date | date | No | After start_date | "2023-12-31" |
| degree | string | Yes | 1-100 chars | "Bachelor of Science" |
| school | string | Yes | 1-100 chars | "MIT" |
| gpa | string | No | 0.0-4.0 or 0-100 | "3.8" |
| skill_name | string | Yes | 1-50 chars | "JavaScript" |
| project_name | string | Yes | 1-100 chars | "E-commerce Platform" |
| cert_name | string | Yes | 1-100 chars | "AWS Solutions Architect" |

### 5.2 Business Logic Validation

```typescript
// Date validation
export function validateDateRange(startDate: string, endDate?: string): boolean {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  // Start date can't be in future
  if (start > new Date()) return false;

  // End date must be after start date (if provided)
  if (end && end <= start) return false;

  return true;
}

// Skill validation
export function validateSkill(skill: string): boolean {
  const trimmed = skill.trim();
  return trimmed.length >= 1 && trimmed.length <= 50;
}

// URL validation
export function validateUrl(url: string): boolean {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// GPA validation
export function validateGPA(gpa: string): boolean {
  if (!gpa) return true; // Optional field

  // Check for 0.0-4.0 format
  const gpa4Scale = parseFloat(gpa);
  if (!isNaN(gpa4Scale) && gpa4Scale >= 0 && gpa4Scale <= 4.0) {
    return true;
  }

  // Check for percentage format (0-100)
  const gpaPercent = parseFloat(gpa);
  if (!isNaN(gpaPercent) && gpaPercent >= 0 && gpaPercent <= 100) {
    return true;
  }

  return false;
}
```

### 5.3 Cross-Field Validation

```typescript
// Resume completeness validation
export function validateResumeCompleteness(data: ResumeData): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required sections
  if (!data.personalInfo?.fullName) {
    errors.push('Full name is required');
  }

  if (!data.experience?.length) {
    errors.push('At least one work experience is required');
  }

  if (!data.education?.length) {
    errors.push('At least one education entry is required');
  }

  if (!data.skills?.length) {
    errors.push('At least one skill is required');
  }

  // Warnings for better resumes
  if (!data.summary) {
    warnings.push('Consider adding a professional summary');
  }

  if (!data.projects?.length) {
    warnings.push('Adding projects can strengthen your resume');
  }

  if (data.experience?.length && data.experience.length < 2) {
    warnings.push('Consider adding more work experience');
  }

  return { errors, warnings };
}

// Date consistency validation
export function validateDateConsistency(data: ResumeData): ValidationResult {
  const errors: string[] = [];

  // Check experience dates
  data.experience?.forEach((exp, index) => {
    if (!validateDateRange(exp.startDate, exp.endDate)) {
      errors.push(`Experience ${index + 1}: Invalid date range`);
    }
  });

  // Check education dates
  data.education?.forEach((edu, index) => {
    if (!validateDateRange(edu.startDate, edu.endDate)) {
      errors.push(`Education ${index + 1}: Invalid date range`);
    }
  });

  // Check project dates
  data.projects?.forEach((proj, index) => {
    if (!validateDateRange(proj.startDate, proj.endDate)) {
      errors.push(`Project ${index + 1}: Invalid date range`);
    }
  });

  return { errors, warnings: [] };
}
```

---

## 6. Migration Strategy

### 6.1 From Local Storage to Database

```typescript
// Migration script (pseudo-code)
async function migrateLocalStorageToDatabase(userId: string) {
  // 1. Get all localStorage keys
  const resumeKeys = Object.keys(localStorage).filter(key =>
    key.startsWith('resume-')
  );

  // 2. Parse and validate each resume
  const resumes = resumeKeys.map(key => {
    const data = JSON.parse(localStorage.getItem(key));
    return validateResumeData(data);
  });

  // 3. Create user account if needed
  const user = await createUser({ userId, email: 'migrated@example.com' });

  // 4. Insert resumes into database
  for (const resume of resumes) {
    await createResume(user.id, resume);
  }

  // 5. Clear localStorage
  resumeKeys.forEach(key => localStorage.removeItem(key));

  // 6. Update user preferences
  localStorage.setItem('migration-completed', 'true');
}
```

### 6.2 Data Transformation Mapping

```typescript
// Local Storage → Database mapping
const dataMapping = {
  // Resume level
  'id': 'resume_id',
  'title': 'title',
  'template': 'template_id',

  // Personal info
  'personalInfo': {
    'fullName': 'full_name',
    'email': 'email',
    'phone': 'phone',
    'location': 'location',
    'linkedin': 'linkedin',
    'github': 'github',
    'website': 'website'
  },

  // Experience
  'experience': {
    'company': 'company',
    'position': 'position',
    'startDate': 'start_date',
    'endDate': 'end_date',
    'current': 'current',
    'description': 'description',
    'achievements': 'experience_achievements',
    'technologies': 'technologies'
  },

  // Education
  'education': {
    'school': 'school',
    'degree': 'degree',
    'field': 'field',
    'startDate': 'start_date',
    'endDate': 'end_date',
    'gpa': 'gpa',
    'achievements': 'achievements'
  },

  // Skills
  'skills': 'skills',

  // Projects
  'projects': {
    'name': 'name',
    'description': 'description',
    'url': 'url',
    'github': 'github',
    'startDate': 'start_date',
    'endDate': 'end_date',
    'technologies': 'project_technologies'
  },

  // Certifications
  'certifications': {
    'name': 'name',
    'issuer': 'issuer',
    'date': 'date',
    'url': 'url',
    'credentialId': 'credential_id'
  },

  // Languages
  'languages': {
    'name': 'name',
    'proficiency': 'proficiency'
  }
};
```

### 6.3 Database Indexes Strategy

```sql
-- Performance indexes
CREATE INDEX CONCURRENTLY idx_resumes_user_created ON resumes(user_id, created_at DESC);
CREATE INDEX CONCURRENTLY idx_experience_resume_date ON experience(resume_id, start_date DESC);
CREATE INDEX CONCURRENTLY idx_skills_resume_name ON skills(resume_id, skill_name);
CREATE INDEX CONCURRENTLY idx_analytics_timestamp ON analytics(timestamp DESC);

-- Partial indexes for active records
CREATE INDEX CONCURRENTLY idx_active_templates ON templates(template_id) WHERE is_active = true;

-- Full-text search indexes
CREATE INDEX CONCURRENTLY idx_resume_title_search ON resumes USING gin(to_tsvector('english', title));
CREATE INDEX CONCURRENTLY idx_personal_name_search ON personal_info USING gin(to_tsvector('english', full_name));
```

### 6.4 Backup and Recovery

```sql
-- Backup strategy
CREATE OR REPLACE FUNCTION backup_resume(resume_id INTEGER)
RETURNS JSONB AS $$
DECLARE
    resume_data JSONB;
BEGIN
    -- Aggregate all resume data into JSON
    SELECT jsonb_build_object(
        'personal_info', (SELECT row_to_json(pi) FROM personal_info pi WHERE pi.resume_id = $1),
        'experience', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'company', e.company,
                    'position', e.position,
                    'start_date', e.start_date,
                    'achievements', (
                        SELECT jsonb_agg(achievement)
                        FROM experience_achievements ea
                        WHERE ea.exp_id = e.exp_id
                    )
                )
            )
            FROM experience e
            WHERE e.resume_id = $1
        ),
        'education', (
            SELECT jsonb_agg(row_to_json(ed))
            FROM education ed
            WHERE ed.resume_id = $1
        ),
        'skills', (
            SELECT jsonb_agg(row_to_json(s))
            FROM skills s
            WHERE s.resume_id = $1
        )
    ) INTO resume_data;

    RETURN resume_data;
END;
$$ LANGUAGE plpgsql;
```

---

## 📝 Summary

This ER diagram and data flow documentation covers:

1. **Current Local Storage Model**: JSON-based data structures
2. **Future Database Schema**: Complete relational database design
3. **Data Flow Diagrams**: Component interaction and data movement
4. **Entity Relationships**: Cardinality and dependencies
5. **Validation Rules**: Field and business logic validation
6. **Migration Strategy**: From local storage to database

### Key Insights

| Aspect | Current (Local) | Future (Database) |
|--------|----------------|-------------------|
| **Persistence** | Browser storage | Server-side database |
| **Sharing** | Not possible | Multi-user support |
| **Backup** | Manual | Automated |
| **Analytics** | Limited | Comprehensive |
| **Performance** | Fast (client-side) | Scalable (indexed queries) |
| **Offline** | Works offline | Requires connection |

---

**Happy Learning! 🚀**

*This documentation provides a complete blueprint for understanding and extending the data architecture of Resumey.*
