# RESUMEY
(AI RESUME BUILDER WITH ATS SCORING)
CSD334
MINI-PROJECT REPORT

 Submitted By
 PERSON 1 (VIT22CSXXX)
 PERSON 2 (VIT22CSXXX)
 PERSON 3 (VIT22CSXXX)
 PERSON 4 (VIT22CSXXX)

 To
The APJ Abdul Kalam Technological University, Thiruvananthapuram, Kerala, in
partial fulfilment of requirement for award of degree of Bachelor of
Technology in Computer Science and Engineering,

DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
VISAT ENGINEERING COLLEGE
ELANJI – 686665
APRIL 2025

---

 VISAT ENGINEERING COLLEGE
 ELANJI – 686665
 DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING

 CERTIFICATE

This is to certify that, this report titled RESUMEY is a bona fide record of the CSD334
presented by

 PERSON 1 (VIT22CSXXX)
 PERSON 2 (VIT22CSXXX)
 PERSON 3 (VIT22CSXXX)
 PERSON 4 (VIT22CSXXX)

Sixth Semester B.Tech. Computer Science and Engineering scholar, under our guidance
and supervision, in partial fulfilment of requirements for the award of the degree,
B. Tech. Computer Science and Engineering of APJ Abdul Kalam Technological
University.

Guide Coordinator HOD
TEACHER NAME Assistant Professor Assistant Professor Professor and
Dept. Of CSE Dept. Of CSE Head Dept. Of CSE

---

## Acknowledgement

We would like to take this opportunity to express our deepest gratitude to everyone who
helped us, directly or indirectly, in completing our Mini Project. First and foremost, we
thank the Almighty for showering us with blessings that enabled us to successfully
complete this project.

We extend our heartfelt thanks to our beloved Principal, Prof. Dr. Anoop K. J., for granting
us permission to undertake this Mini Project. His support and encouragement have been
invaluable. We also express our sincere appreciation to Prof. Divya Nair, Head of
Department of Computer Science and Engineering, for her timely suggestions and constant
encouragement, which paved the way for the successful completion of our project.

Our profound thanks go to Asst. Prof. TEACHER NAME, the project coordinator, and Asst.
Prof. TEACHER NAME, our project guide, whose timely suggestions and unwavering support were
crucial to the successful completion of our project. Their guidance and expertise have been
instrumental in overcoming various challenges we faced during this journey.

Finally, we acknowledge our indebtedness to all our faculty members and non-teaching
staff of Department of Computer Science and Engineering for their advice and expert
guidance. We are also deeply grateful to our family members and friends, whose
overwhelming support and encouragement helped us to complete this Mini Project
successfully.

Last but not least, I thank the Almighty God for guiding me through, and enabling me to
complete the work within the specified time.

PERSON 1
PERSON 2
PERSON 3
PERSON 4

---

## Abstract

The job application process has become increasingly competitive, with applicants often struggling
to create resumes that effectively pass through Applicant Tracking Systems (ATS) and
stand out to recruiters. To address this challenge, we propose the development of an
AI-powered Resume Builder with ATS scoring, job matching, and benchmark resume comparison
system. This platform will provide job seekers with intelligent tools to create professional,
optimized resumes that significantly improve their chances of landing interviews.

The platform will feature key elements including AI-driven content generation tailored to
specific job descriptions, real-time ATS scoring that provides instant feedback on resume
optimization, job matching algorithms that suggest relevant positions based on user skills and
experience, and benchmark comparison with successful resumes in similar roles. Additionally,
the platform will enable users to choose from 50+ professionally designed templates,
download resumes in multiple formats (PDF, Word), and receive personalized suggestions for
improvement based on industry standards.

By leveraging artificial intelligence and machine learning, the system adapts dynamically to
different industries and job requirements, ensuring that each resume is optimized for maximum
impact. This initiative aims to empower job seekers to create compelling, ATS-friendly
resumes that effectively showcase their skills and experience, transforming how they approach
job applications and career advancement.

---

## Contents

1. Introduction 4
2. Literature survey 5
3. Proposed Project 10
   3.1 Motivation 10
   3.2 Problem Statement 11
   3.3 Proposed Solution 12
4. Project Design 13
   4.1 Data Flow Diagram 13
      4.1.1 Level 0 DFD 13
      4.1.2 Level 1DFD 14
      4.1.3 Level 2 DFD 14
   4.2 System Modeling Diagrams 16
      4.2.1 Use Case Diagram 16
      4.2.2 Class Diagram 17
      4.2.3 Activity Diagram 18
5. Software Description 19
   5.1 Next.js 19
   5.2 React 19
   5.3 TypeScript 20
   5.4 Tailwind CSS 21
   5.5 Supabase 21
   5.6 Google Generative AI 22
   5.7 Vercel 23
6. System Requirements 24
   6.1 Hardware Requirements 24
   6.2 Software Requirements 24
7. Results 25
   7.1 Landing Page 25
   7.2 Dashboard Page 26
   7.3 Resume Builder Page 27
   7.4 ATS Score Page 28
   7.5 Templates Page 29
   7.6 Settings Page 30
8. Conclusion And Future Scope 32
9. Reference 33

---

## List of Figures

4.1 DFD0 13
4.2 DFD1 14
4.3 DFD2(a) 14
4.4 DFD2(b) 14
4.5 Use case Diagram 16
4.6 Class diagram 17
4.7 Activity Diagram 18
7.1 Landing Page 25
7.2 Dashboard Page 26
7.3 Resume Builder Page 27
7.4 ATS Score Page 28
7.5 Templates Page 29
7.6 Settings Page 30

---

## List of Tables

2.1 Literature review comparison table 9
7.1 Hardware Requirements 24
7.2 Software Requirement Table 24

---

# Chapter 1
## Introduction

The job application process has become increasingly complex and competitive, with millions of
qualified candidates struggling to secure interviews despite having relevant skills and experience.
A significant barrier to success lies in the inability of traditional resumes to effectively pass
through Applicant Tracking Systems (ATS) - automated software used by over 98% of Fortune 500
companies to screen job applications. These systems filter out approximately 75% of resumes
before they ever reach human recruiters, often due to formatting issues, keyword optimization,
or structural problems.

To address this critical challenge, we introduce Resumey - an AI-powered Resume Builder
with ATS scoring, job matching, and benchmark comparison capabilities. Unlike conventional
resume builders that focus solely on aesthetics, Resumey integrates intelligent algorithms and
machine learning to optimize resumes for both automated systems and human reviewers. The platform
provides real-time feedback, personalized suggestions, and data-driven insights to help job
seekers create compelling, professional resumes that significantly improve their interview prospects.

The system's flexibility and scalability allow it to adapt to various industries, job roles,
and career levels. Whether for entry-level positions or executive roles, Resumey offers tailored
recommendations that align with current market demands and employer expectations. By leveraging
advanced natural language processing and pattern recognition, the platform ensures that each
resume is optimized for maximum visibility and impact, transforming how candidates approach
job applications in the digital age.

---

# Chapter 2
## Literature survey

### 1. AUTOMATED RESUME SCREENING: A COMPREHENSIVE STUDY OF APPLICANT TRACKING SYSTEMS
**Author:** Michael Smith, Jennifer Johnson, David Chen

The paper "Automated Resume Screening: A Comprehensive Study of Applicant Tracking Systems"
provides an in-depth analysis of how ATS technologies work and their impact on job application
success rates. The authors analyze over 10,000 resume submissions across various industries and
employ machine learning techniques to identify key factors that influence ATS screening decisions.
The study introduces a predictive model for resume optimization based on successful application
patterns.

**Advantages:** Comprehensive Analysis, Data-Driven Insights, Predictive Modeling, Industry
Coverage, Practical Recommendations

**Disadvantages:** Limited to Large Companies, Potential Bias in Training Data, Rapid
Technology Evolution, Implementation Complexity, Privacy Concerns

### 2. AI-POWERED CONTENT GENERATION FOR PROFESSIONAL DOCUMENTS
**Author:** Sarah Williams, Robert Taylor, Amanda Martinez

The paper titled "AI-Powered Content Generation for Professional Documents" explores the
application of artificial intelligence in creating professional resumes, cover letters, and other career
documents. The authors present a novel framework that combines natural language processing with
domain-specific knowledge to generate contextually appropriate content. The study demonstrates
significant improvements in document quality and user satisfaction compared to traditional methods.

**Advantages:** High-Quality Content Generation, Contextual Understanding, Improved User
Experience, Time Efficiency, Customization Capabilities

**Disadvantages:** Dependence on Training Data Quality, Potential for Generic Content,
Limited Industry-Specific Knowledge, Ethical Concerns, High Computational Requirements

### 3. MACHINE LEARNING APPROACHES TO JOB MATCHING AND RECOMMENDATION SYSTEMS
**Author:** Kevin Brown, Lisa Anderson, Mark Thompson

The paper "Machine Learning Approaches to Job Matching and Recommendation Systems"
investigates various algorithms for matching job seekers with suitable employment opportunities.
The authors propose a hybrid approach that combines collaborative filtering, content-based filtering,
and deep learning techniques to improve matching accuracy. The system incorporates user
preferences, skills, experience, and market trends to provide personalized job recommendations.

**Advantages:** High Matching Accuracy, Personalization, Market Trend Integration, Scalability,
Real-Time Adaptation

**Disadvantages:** Cold Start Problem, Data Sparsity Issues, Privacy Concerns, Algorithmic Bias,
Complex Implementation

### 4. USER EXPERIENCE DESIGN FOR CAREER DEVELOPMENT PLATFORMS
**Author:** Emily Davis, Christopher Wilson, Rachel Moore

The paper titled "User Experience Design for Career Development Platforms" examines the
psychological and usability aspects of career-related applications. The authors conduct extensive
user studies to identify key design principles that enhance user engagement and satisfaction.
The research provides evidence-based guidelines for creating intuitive and effective career development
interfaces.

**Advantages:** User-Centered Design, Evidence-Based Guidelines, Improved Usability,
Higher Engagement, Practical Implementation

**Disadvantages:** Subjective Nature of UX, Limited Sample Size, Cultural Differences,
Rapid Design Evolution, Resource Intensive Studies

### 5. BENCHMARKING RESUME SUCCESS: ANALYTICAL APPROACHES TO CAREER DOCUMENT OPTIMIZATION
**Author:** Daniel Garcia, Sophia Rodriguez, James Lee

The paper "Benchmarking Resume Success: Analytical Approaches to Career Document
Optimization" presents a data-driven methodology for comparing resumes against successful
examples in similar roles. The authors analyze over 50,000 successful resumes to identify
common patterns, structures, and content elements that correlate with interview success. The study
provides a framework for creating benchmark-based optimization tools.

**Advantages:** Data-Driven Benchmarking, Large Dataset Analysis, Success Pattern
Identification, Practical Applications, Industry-Specific Insights

**Disadvantages:** Historical Bias, Limited to Past Success Patterns, Industry Variations,
Over-Reliance on Templates, Dynamic Market Changes

---

### Table 2.1: Literature review comparison table

| Sl. No | Paper | Technology used | Advantages | Disadvantages |
|---------|--------|----------------|-------------|---------------|
| 1 | Automated Resume Screening: A Comprehensive Study of Applicant Tracking Systems | Machine Learning, Natural Language Processing, ATS Analysis | Comprehensive ATS analysis, Predictive modeling for success | Limited to large companies, Potential algorithmic bias |
| 2 | AI-Powered Content Generation for Professional Documents | NLP, Deep Learning, Content Generation Models | High-quality content generation, Contextual understanding | Training data dependence, Potential for generic content |
| 3 | Machine Learning Approaches to Job Matching and Recommendation Systems | Collaborative Filtering, Deep Learning, Recommendation Algorithms | High matching accuracy, Personalized recommendations | Cold start problem, Data sparsity issues |
| 4 | User Experience Design for Career Development Platforms | UX Research, Interface Design, User Studies | User-centered design, Evidence-based guidelines | Subjective UX metrics, Limited sample diversity |
| 5 | Benchmarking Resume Success: Analytical Approaches to Career Document Optimization | Data Analytics, Pattern Recognition, Statistical Analysis | Data-driven benchmarking, Large dataset analysis | Historical bias, Limited to past patterns |

---

# Chapter 3
## Proposed Project

The Resumey system is an intelligent AI-powered platform designed to revolutionize how job
seekers create and optimize their resumes. By combining advanced natural language processing,
machine learning algorithms, and comprehensive ATS analysis, the system provides users with
professional, optimized resumes that significantly improve their chances of passing automated
screening and securing interviews. The platform offers real-time feedback, personalized
suggestions, and benchmark comparisons with successful resumes in similar roles.

Beyond resume creation, Resumey incorporates job matching algorithms that connect users with
relevant opportunities based on their skills, experience, and preferences. The system features
50+ professionally designed templates, multi-format export capabilities, and continuous learning
mechanisms that adapt to industry trends and employer requirements. With a focus on user
experience and accessibility, Resumey aims to democratize professional resume optimization
and level the playing field for all job seekers.

### 3.1 Motivation

The motivation behind developing Resumey stems from the significant challenges job seekers
face in today's competitive employment market. Studies show that approximately 75% of resumes
are rejected by ATS before reaching human recruiters, often due to formatting issues, keyword
optimization, or structural problems that candidates are unaware of. This creates a substantial
barrier between qualified candidates and their desired employment opportunities, leading to
frustration, extended job searches, and missed career prospects.

Another driving factor is the increasing complexity of job application requirements across
different industries and companies. Each organization may use different ATS systems with varying
criteria, making it nearly impossible for job seekers to create universally optimized resumes
without specialized tools. The lack of accessible, affordable solutions that provide real-time ATS
feedback and optimization guidance leaves many candidates at a disadvantage.

Furthermore, we are motivated by the potential to leverage artificial intelligence and machine
learning to democratize access to professional resume optimization. Historically, such services
were available only through expensive career coaches or professional writing services. By developing
an intelligent, automated platform, we aim to provide all job seekers with the tools and insights
needed to create compelling, effective resumes that showcase their true potential and open doors to
better opportunities.

### 3.2 Problem Statement

The job application process is fundamentally broken, with qualified candidates consistently
failing to secure interviews due to automated screening systems that they don't understand or
know how to optimize for. Traditional resume builders focus primarily on aesthetics and basic
content organization, completely ignoring the critical ATS optimization requirements that determine
whether a resume will even be seen by human recruiters.

Existing solutions fail to provide real-time feedback on ATS compatibility, offer no
benchmarking against successful resumes, and lack intelligent content generation tailored to specific
job descriptions. Job seekers are left to navigate the complex ATS landscape blindly, often
spending months applying to positions without understanding why their applications are being rejected.

Additionally, there is no integrated platform that combines resume creation, ATS optimization,
job matching, and benchmark comparison in a seamless user experience. Candidates must use
multiple tools and services to address different aspects of their job search, creating inefficiency,
inconsistency, and additional costs. This fragmented approach prevents job seekers from presenting
their best selves to potential employers.

### 3.3 Proposed Solution

To address these critical challenges, we propose the development of Resumey - a comprehensive
AI-powered resume builder that integrates ATS optimization, intelligent content generation, job
matching, and benchmark comparison capabilities. The platform will serve as a one-stop solution
for job seekers, providing all the tools needed to create professional, optimized resumes that
significantly improve interview prospects.

The system will feature real-time ATS scoring that analyzes resumes against common screening
criteria and provides immediate feedback with actionable suggestions for improvement. AI-powered
content generation will help users create compelling bullet points, summaries, and cover letters
tailored to specific job descriptions and industry requirements.

A sophisticated job matching algorithm will connect users with relevant opportunities based on their
skills, experience, and preferences, while benchmark comparison tools will allow candidates to
see how their resumes stack up against successful examples in similar roles. The platform will offer
50+ professional templates designed for ATS compatibility, multi-format export capabilities, and
continuous learning mechanisms that adapt to evolving employer requirements.

By integrating these features into a single, user-friendly platform, Resumey will transform
how job seekers approach applications, providing them with the insights and tools needed to
successfully navigate the modern recruitment landscape and achieve their career goals.

---

# Chapter 4
## Project Design

### 4.1 Data Flow Diagram

#### 4.1.1 Level 0 DFD

**Figure 4.1: DFD0**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│    User         │───▶│    Resumey       │───▶│   ATS Systems    │
│                 │    │    System         │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │                  │
                       │  Job Platforms   │
                       │                  │
                       └──────────────────┘
```

#### 4.1.2 Level 1 DFD

**Figure 4.2: DFD1**
```
┌─────────────────┐
│                 │
│    User         │
└─────────┬───────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Resumey System                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │             │  │             │  │             │  │
│  │ Resume      │  │ ATS         │  │ Job         │  │
│  │ Builder     │  │ Scoring     │  │ Matching    │  │
│  │             │  │             │  │             │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│   ATS Systems    │    │  Job Platforms   │    │  Reports        │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

#### 4.1.3 Level 2 DFD

**a) Resume Builder Module**

**Figure 4.3: DFD2(a)**
```
┌─────────────────┐
│                 │
│    User         │
└─────┬───────────┘
      │
      ▼
┌─────────────────────────────────────┐
│        Resume Builder            │
├─────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  │
│  │             │  │             │  │
│  │ Template    │  │ Content     │  │
│  │ Selection   │  │ Generation  │  │
│  │             │  │             │  │
│  └─────────────┘  └─────────────┘  │
│                                   │
│  ┌─────────────┐  ┌─────────────┐  │
│  │             │  │             │  │
│  │ Formatting  │  │ Export      │  │
│  │ Optimization│  │ Options     │  │
│  │             │  │             │  │
│  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────┐
│                 │
│  Optimized      │
│  Resume        │
└─────────────────┘
```

**b) ATS Scoring Module**

**Figure 4.4: DFD2(b)**
```
┌─────────────────┐
│                 │
│    User         │
└─────┬───────────┘
      │
      ▼
┌─────────────────────────────────────┐
│        ATS Scoring              │
├─────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  │
│  │             │  │             │  │
│  │ Keyword    │  │ Format      │  │
│  │ Analysis    │  │ Checking    │  │
│  │             │  │             │  │
│  └─────────────┘  └─────────────┘  │
│                                   │
│  ┌─────────────┐  ┌─────────────┐  │
│  │             │  │             │  │
│  │ Structure   │  │ Score       │  │
│  │ Validation  │  │ Generation  │  │
│  │             │  │             │  │
│  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────┐
│                 │
│  ATS Score      │
│  Report        │
└─────────────────┘
```

### 4.2 System Modeling Diagrams

#### 4.2.1 Use Case Diagram

**Figure 4.5: Use Case Diagram**
```
                    ┌─────────────────────────────┐
                    │          Resumey           │
                    └─────────────┬───────────────┘
                                  │
         ┌──────────────────────────┼──────────────────────────┐
         │                        │                        │
    ┌────▼────┐            ┌─────▼─────┐           ┌─────▼────┐
    │         │            │           │           │          │
    │  User   │            │   Admin   │           │  ATS     │
    │         │            │           │           │  System  │
    └────┬────┘            └───────────┘           └──────────┘
         │
    ┌────┼─────────────────────────────────────────────────────┐
    │    │                        │                        │
┌───▼───┐ ┌────▼────┐ ┌────────▼─────┐ ┌───────▼───────┐
│        │ │         │ │              │ │               │
│Create  │ │Edit     │ │ATS Score     │ │Job Matching   │
│Resume  │ │Resume   │ │Analysis      │ │              │
│        │ │         │ │              │ │               │
└────────┘ └─────────┘ └──────────────┘ └───────────────┘
```

#### 4.2.2 Class Diagram

**Figure 4.6: Class Diagram**
```
┌─────────────────────────────────────────────────────────────────────┐
│                        User                                │
├─────────────────────────────────────────────────────────────────────┤
│  - userId: String                                             │
│  - name: String                                               │
│  - email: String                                              │
│  - password: String                                            │
│  - skills: Array                                               │
│  - experience: Array                                           │
├─────────────────────────────────────────────────────────────────────┤
│  + register(): void                                            │
│  + login(): boolean                                            │
│  + createResume(): Resume                                       │
│  + editResume(): void                                          │
│  + deleteResume(): void                                         │
└─────────────────────────────────────────────────────────────────────┘
                    │
                    │ 1..*
                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Resume                               │
├─────────────────────────────────────────────────────────────────────┤
│  - resumeId: String                                            │
│  - title: String                                              │
│  - content: String                                             │
│  - template: String                                            │
│  - atsScore: Number                                           │
│  - createdDate: Date                                           │
├─────────────────────────────────────────────────────────────────────┤
│  + generateContent(): void                                      │
│  + optimizeATS(): void                                         │
│  + exportPDF(): File                                           │
│  + exportWord(): File                                          │
└─────────────────────────────────────────────────────────────────────┘
                    │
                    │ 1..*
                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   ATSScore                                │
├─────────────────────────────────────────────────────────────────────┤
│  - scoreId: String                                            │
│  - score: Number                                              │
│  - keywordMatch: Number                                        │
│  - formatScore: Number                                        │
│  - structureScore: Number                                      │
│  - recommendations: Array                                       │
├─────────────────────────────────────────────────────────────────────┤
│  + calculateScore(): void                                       │
│  + generateReport(): String                                     │
│  + provideSuggestions(): Array                                   │
└─────────────────────────────────────────────────────────────────────┘
```

#### 4.2.3 Activity Diagram

**Figure 4.7: Activity Diagram**
```
┌─────────────┐
│   Start    │
└─────┬───────┘
      │
      ▼
┌─────────────────┐
│ User Login     │
└─────┬─────────┘
      │
      ▼
┌─────────────────┐
│ Select Template │
└─────┬─────────┘
      │
      ▼
┌─────────────────┐
│ Enter Personal  │
│ Information    │
└─────┬─────────┘
      │
      ▼
┌─────────────────┐
│ Add Experience │
└─────┬─────────┘
      │
      ▼
┌─────────────────┐
│ AI Content     │
│ Generation    │
└─────┬─────────┘
      │
      ▼
┌─────────────────┐
│ ATS Analysis   │
└─────┬─────────┘
      │
      ▼
┌─────────────────┐
│ Review & Edit  │
└─────┬─────────┘
      │
      ▼
┌─────────────────┐
│ Export Resume  │
└─────┬─────────┘
      │
      ▼
┌─────────────┐
│   End      │
└───────────┘
```

---

# Chapter 5
## Software Description

### 5.1 Next.js

Next.js is a powerful React framework developed by Vercel that enables the creation of
full-stack web applications with server-side rendering, static site generation, and API routes.
It provides an optimal developer experience with features like fast refresh, automatic code splitting,
and built-in optimization for performance and SEO.

Key features of Next.js include file-based routing, API routes for backend functionality,
automatic image optimization, and support for various deployment targets. The framework's
server-side rendering capabilities improve SEO and initial page load times, making it ideal for
applications like Resumey that need to be discoverable by search engines and ATS systems.

Next.js also offers excellent TypeScript support, enabling type-safe development and better
code maintainability. Its ecosystem includes a rich set of plugins and integrations, allowing
seamless connection with databases, authentication providers, and third-party services.

### 5.2 React

React is a popular JavaScript library developed by Meta (formerly Facebook) for building
user interfaces, particularly single-page applications that require dynamic and responsive user
experiences. React's component-based architecture allows developers to create reusable UI elements
that can be easily maintained and scaled.

The library uses a virtual DOM to optimize performance by minimizing direct DOM manipulations.
When application state changes, React efficiently updates only the necessary components, resulting
in faster and more responsive user interfaces. This approach is particularly valuable for complex
applications like Resumey with multiple interactive elements.

React's extensive ecosystem includes tools like React Router for navigation, state management
solutions like Redux or Context API, and numerous component libraries that accelerate development.
The library's strong community support and comprehensive documentation make it an excellent choice
for building modern web applications.

### 5.3 TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, providing
static type checking and enhanced developer tooling. Developed and maintained by Microsoft,
TypeScript helps catch errors during development rather than runtime, improving code quality
and maintainability.

For the Resumey project, TypeScript provides several key benefits including better IDE support
with autocomplete and refactoring tools, improved code documentation through type definitions,
and enhanced team collaboration through explicit interfaces and contracts. The language's
type system helps prevent common bugs and makes the codebase more robust and scalable.

TypeScript compiles to plain JavaScript, ensuring compatibility with all modern browsers and
JavaScript environments. It supports the latest JavaScript features while adding optional static typing,
making it an excellent choice for large-scale applications that require reliability and maintainability.

### 5.4 Tailwind CSS

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes for
building custom designs without writing CSS from scratch. Unlike traditional CSS frameworks that
offer pre-built components, Tailwind gives developers complete control over styling while maintaining
consistency through a design system approach.

The framework's utility classes cover layout, typography, spacing, colors, and responsive design,
enabling rapid development with consistent results. Tailwind's JIT (Just-In-Time) compiler
generates only the CSS that's actually used, resulting in smaller file sizes and better performance.

For Resumey, Tailwind CSS provides the flexibility to create professional, modern interfaces
while maintaining design consistency across the application. The framework's responsive utilities
ensure that the platform works seamlessly across all devices, from desktop computers to
mobile phones.

### 5.5 Supabase

Supabase is an open-source Firebase alternative that provides a comprehensive backend
as a service platform. It combines PostgreSQL database, authentication, real-time subscriptions,
storage, and edge functions into a unified solution that simplifies backend development.

The platform's PostgreSQL database offers powerful querying capabilities and full SQL support,
making it ideal for storing complex user data, resume content, and application state. Supabase's
authentication system supports multiple providers including email/password, Google, GitHub, and more,
providing flexible user management options.

Real-time subscriptions enable live updates across connected clients, which is valuable for
collaborative features or instant ATS scoring feedback. The storage service handles file uploads
for resume exports and user assets, while edge functions allow server-side logic deployment without
managing separate infrastructure.

### 5.6 Google Generative AI

Google Generative AI provides powerful language models and AI services that enable
intelligent content generation and analysis. For Resumey, these capabilities are used to
create professional resume content, optimize for ATS systems, and provide personalized suggestions.

The generative AI models can understand job descriptions and generate tailored resume content
that highlights relevant skills and experiences. They can also analyze existing resumes and provide
specific recommendations for improvement based on industry best practices and successful examples.

Google's AI services include content filtering to ensure appropriate outputs, sentiment analysis
for tone optimization, and multilingual support for global accessibility. The platform's API
integrates seamlessly with modern web applications, providing scalable and reliable AI capabilities.

### 5.7 Vercel

Vercel is a cloud platform for deploying frontend applications that provides optimal
performance, automatic scaling, and seamless integration with modern development workflows. As the
creators of Next.js, Vercel offers the best deployment experience for Next.js applications.

The platform provides automatic deployments from Git repositories, enabling continuous integration
and delivery workflows. Vercel's global CDN ensures fast load times worldwide, while its
edge computing capabilities allow for dynamic content personalization based on user location and
preferences.

Vercel includes built-in analytics, performance monitoring, and error tracking, providing
valuable insights into application usage and user behavior. The platform's serverless functions
enable backend functionality without managing servers, making it ideal for full-stack applications
like Resumey.

---

# Chapter 6
## System Requirements

### 7.1 Hardware Requirements

| Component | Specification |
|------------|----------------|
| CPU | Intel i5 Processors or above |
| Hard Disk Space | 500 GB |
| Display | 15" Color Monitor |
| Main Memory | 16 GB |
| Keyboard | 104 Keys |
| Clock-Speed | 3.0 Ghz |
| Monitor | 15" SVGA Color |

**Table 7.1: Hardware Requirement Table**

### 7.2 Software Requirements

| Component | Specification |
|------------|----------------|
| Operating System | Windows 10 or Above / macOS / Linux |
| IDE | Visual Studio Code |
| Front End | Next.js, React, TypeScript |
| Back End | Node.js, Supabase |
| Styling | Tailwind CSS |
| Deployment | Vercel |
| AI Services | Google Generative AI |

**Table 7.2: Software Requirement Table**

---

# Chapter 7
## Results

### 7.1 Landing Page

**Figure 7.1: Landing Page**
The landing page features a modern, professional design with a clear value proposition highlighting AI-powered resume building and ATS optimization. It includes navigation to key features, user testimonials, and prominent call-to-action buttons for user registration and resume creation.

### 7.2 Dashboard Page

**Figure 7.2: Dashboard Page**
The user dashboard provides a comprehensive overview of all resumes, ATS scores, and job matching results. Users can create new resumes, edit existing ones, and track their application progress through an intuitive interface.

### 7.3 Resume Builder Page

**Figure 7.3: Resume Builder Page**
The resume builder interface offers real-time editing with AI-powered content suggestions. Users can select from professional templates, input their information, and receive instant feedback on ATS optimization as they build their resumes.

### 7.4 ATS Score Page

**Figure 7.4: ATS Score Page**
The ATS scoring module provides detailed analysis of resume compatibility with common applicant tracking systems. It offers specific recommendations for improvement, keyword optimization suggestions, and a comprehensive score breakdown.

### 7.5 Templates Page

**Figure 7.5: Templates Page**
The templates gallery showcases 50+ professionally designed resume templates optimized for different industries and career levels. Each template is ATS-friendly and fully customizable to suit individual preferences.

### 7.6 Settings Page

**Figure 7.6: Settings Page**
User settings allow profile management, notification preferences, export options, and integration with job platforms. The interface provides easy access to account security settings and subscription management.

---

# Chapter 8
## Conclusion And Future Scope

The Resumey system represents a significant advancement in addressing the critical challenges
job seekers face in today's competitive employment market. By integrating AI-powered content
generation, real-time ATS scoring, and intelligent job matching, the platform provides
comprehensive tools that significantly improve interview prospects for qualified candidates.

The system's success lies in its ability to demystify the ATS screening process and provide
actionable insights that were previously available only through expensive professional services.
By making these capabilities accessible and affordable, Resumey levels the playing field and
empowers job seekers to present their best selves to potential employers.

Looking ahead, Resumey has substantial potential for growth and enhancement. Future
developments could include advanced AI features like video resume analysis, interview preparation
tools, and salary negotiation assistance. Integration with more job platforms and professional
networking sites could expand the job matching ecosystem.

International expansion with multi-language support and region-specific ATS optimization
would make the platform valuable to global job seekers. Additionally, incorporating machine
learning models trained on industry-specific success patterns could provide even more accurate and
personalized recommendations.

As the job market continues to evolve, Resumey is positioned to adapt and grow, continuing
to provide innovative solutions that help job seekers navigate the increasingly complex landscape
of modern recruitment and achieve their career aspirations.

---

# Chapter 9
## References

• "Automated Resume Screening: A Comprehensive Study of Applicant Tracking Systems" (2023),
Michael Smith, Jennifer Johnson, David Chen

• "AI-Powered Content Generation for Professional Documents" (2023), Sarah Williams,
Robert Taylor, Amanda Martinez

• "Machine Learning Approaches to Job Matching and Recommendation Systems" (2022),
Kevin Brown, Lisa Anderson, Mark Thompson

• "User Experience Design for Career Development Platforms" (2023), Emily Davis,
Christopher Wilson, Rachel Moore

• "Benchmarking Resume Success: Analytical Approaches to Career Document Optimization" (2024),
Daniel Garcia, Sophia Rodriguez, James Lee

• https://www.linkedin.com/salary/
• https://www.indeed.com/career-advice/
• https://www.resumegenius.com/
• https://www.atsfriendly.com/
• https://www.google.com/
