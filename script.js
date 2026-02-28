document.addEventListener('DOMContentLoaded', () => {
    // ── Intersection Observer for fade-in ──
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -80px 0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.7s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.stat-card, .expertise-card, .exp-card, .edu-card, .achievement-card, .arsenal-card, .timeline-item, .contact-detail-item, .social-link'
    ).forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // ── Skill bar fill animation ──
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.bar-fill').forEach(bar => {
        barObserver.observe(bar);
    });

    // ── Hamburger menu ──
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    // ── Smooth scroll nav ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Active nav link highlight ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.pageYOffset + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ── Navbar hide/show on scroll ──
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
        updateActiveNav();
    });

    // ── Custom cursor ──
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline && window.matchMedia('(hover: hover)').matches) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .stat-card, .expertise-card, .skill-badge').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '52px';
                cursorOutline.style.height = '52px';
                cursorOutline.style.borderColor = 'var(--accent)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '36px';
                cursorOutline.style.height = '36px';
                cursorOutline.style.borderColor = 'var(--accent-dim)';
            });
        });
    }

    // ── Cursor light follower ──
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // ── Card mouse glow effect ──
    document.querySelectorAll('.expertise-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    // ── Particle network ──
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const particles = [];
    const particleCount = 40;
    const connectionDistance = 120;

    class Particle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.element = document.createElement('div');
            this.element.className = 'particle';
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            canvas.appendChild(this.element);
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
            if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        document.querySelectorAll('.connection-line').forEach(line => line.remove());
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectionDistance) {
                    const line = document.createElement('div');
                    line.className = 'connection-line';
                    const angle = Math.atan2(dy, dx);
                    line.style.width = distance + 'px';
                    line.style.left = particles[j].x + 'px';
                    line.style.top = particles[j].y + 'px';
                    line.style.transform = `rotate(${angle}rad)`;
                    line.style.opacity = (1 - distance / connectionDistance) * 0.2;
                    canvas.appendChild(line);
                }
            }
        }
    }

    function animate() {
        particles.forEach(p => p.update());
        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();

    // ── Project Modal System ──
    const projectData = {
        'algo360': {
            title: 'Algo360',
            subtitle: 'Next-Gen Alternative Credit Scoring Intelligence',
            icon: 'analytics',
            overview: 'A revolutionary alternative credit scoring system designed as a smarter supplement to traditional credit scores like CIBIL. Unlike conventional scores that only reflect repayment history, Algo360 captures a user\'s complete financial journey using transactional SMS data and generates 1000+ micro-scores across 10 financial domains.',
            sections: [
                {
                    title: 'Problem Statement',
                    icon: 'report',
                    intro: 'Traditional credit scoring systems have significant limitations that prevent lenders from making truly informed decisions:',
                    items: [
                        { title: 'Missing Negative Micro-Events', desc: 'Traditional scores do not capture critical negative events like cheque bounces, negative account balances, or patterns of missed EMI payments that indicate financial distress.' },
                        { title: 'Lack of Domain-Level Insights', desc: 'Existing systems fail to provide granular spending insights across different financial domains, making it impossible to understand user behavior patterns in specific categories.' },
                        { title: 'No Personalization Capability', desc: 'Lenders cannot create risk-adjusted, tailored financial products because traditional scores provide only a single number without contextual financial behavior data.' }
                    ]
                },
                {
                    title: 'Our Solution',
                    icon: 'lightbulb',
                    intro: 'Algo360 processes financial SMS data through a sophisticated ML pipeline to provide comprehensive financial intelligence:',
                    items: [
                        { title: 'Transaction-Level Insights', desc: 'Our system extracts and structures every financial transaction from SMS data, creating a detailed timeline of user financial behavior with complete context.' },
                        { title: '10+ Financial Domains', desc: 'User activity is intelligently categorized into domains including CASA (Savings/Current Account), Credit Card, Loan, BNPL, Travelling, Shopping, Utilities, and General expenses for comprehensive analysis.' },
                        { title: 'Multi-Dimensional Scoring', desc: 'Generates both domain-specific scores and an overall Algo360 Score (0–360), giving lenders unprecedented visibility into user financial health across all categories.' },
                        { title: 'Personalized Products', desc: 'Enables lenders to offer highly personalized and risk-adjusted financial products based on detailed behavioral patterns rather than just repayment history.' }
                    ]
                },
                {
                    title: 'Processing Flow',
                    icon: 'account_tree',
                    intro: 'Our secure and efficient data processing pipeline ensures accuracy, privacy, and reliability:',
                    items: [
                        { title: 'Step 1: Selective Data Capture', desc: 'System captures only financial SMS data from user devices, filtering out personal messages to ensure privacy and reduce processing overhead.' },
                        { title: 'Step 2: Secure Ingestion', desc: 'All captured data is encrypted using KMS envelope encryption before transmission, ensuring data security at rest and in transit with industry-standard protocols.' },
                        { title: 'Step 3: ML-Based Classification', desc: 'Advanced machine learning models clean, normalize, and classify transactions into appropriate financial domains with high accuracy, handling various SMS formats from different banks.' },
                        { title: 'Step 4: Domain Scoring Engines', desc: 'Specialized scoring algorithms process categorized data for each domain, analyzing spending patterns, transaction frequency, and financial behavior indicators.' },
                        { title: 'Step 5: Score Generation', desc: 'System generates DQS (Data Quality Score) indicating reliability of captured data, and the comprehensive Algo360 Score (0–360) representing overall financial behavior.' }
                    ]
                },
                {
                    title: 'B2B Integration Model',
                    icon: 'integration_instructions',
                    intro: 'Flexible integration options designed for seamless adoption by financial institutions:',
                    items: [
                        { title: 'API Integration', desc: 'Clients capture SMS data on their end and share structured payloads via our secure REST APIs. This model gives clients full control over data capture while leveraging our scoring intelligence.' },
                        { title: 'SDK Integration', desc: 'Our lightweight SDK can be embedded directly into client applications, automatically capturing financial SMS and securely transmitting to our servers with minimal integration effort.' }
                    ]
                },
                {
                    title: 'Backend Architecture',
                    icon: 'architecture',
                    intro: 'Enterprise-grade backend architecture built for scale, security, and performance:',
                    items: [
                        { title: 'Security Layer', desc: 'KMS Envelope Encryption protects data at rest, while network-level TLS encryption secures all data in transit. Multi-layer security ensures compliance with financial data regulations.' },
                        { title: 'Performance Optimization', desc: 'Redis caching layer reduces database load and API response times by 70%. Intelligent API rate limiting prevents system overload while ensuring fair resource allocation.' },
                        { title: 'Database Design', desc: 'DynamoDB Single Table Design pattern optimizes query performance and reduces costs. Schema design supports millions of users with sub-100ms query response times.' },
                        { title: 'Async Processing', desc: 'Celery-based distributed task queue handles heavy ML computations asynchronously, allowing the API to remain responsive while processing complex scoring algorithms.' },
                        { title: 'ML Pipeline', desc: 'Distributed ML scoring pipelines using PySpark process large batches of transactions in parallel, enabling real-time score updates as new data arrives.' },
                        { title: 'Monitoring & Observability', desc: 'Sentry tracks errors and performance issues in real-time, while Kibana provides comprehensive log analysis and system health dashboards for proactive monitoring.' }
                    ]
                }
            ],
            tech: ['Python', 'FastAPI', 'AWS', 'DynamoDB', 'Redis', 'Celery', 'PySpark', 'ML Models', 'Sentry', 'Kibana']
        },
        'skills-studio': {
            title: 'Skills Studio',
            subtitle: 'Enterprise Taxonomy & Skills Intelligence Platform',
            icon: 'hub',
            overview: 'A premium taxonomy management system that enables organizations to build, harmonize, and maintain a centralized skill library from multiple internal and external data sources. Designed for large enterprises to solve complex skill fragmentation problems across LMS platforms, HR systems, and external skill providers.',
            sections: [
                {
                    title: 'Problem Statement',
                    icon: 'report',
                    intro: 'Organizations struggle with fragmented skill data across their ecosystem, creating inefficiencies:',
                    items: [
                        { title: 'Skill Duplication Crisis', desc: 'Multiple platforms maintain separate skill databases, leading to duplicate entries with slight variations (e.g., "JavaScript", "Javascript", "JS") that fragment the skill inventory.' },
                        { title: 'Inconsistent Standards', desc: 'Different departments and systems use varying taxonomy standards, making it impossible to get a unified view of organizational skills or compare data across platforms.' },
                        { title: 'Integration Challenges', desc: 'Difficulty integrating external skill graphs from providers like LinkedIn, Coursera, or industry-standard taxonomies, limiting the richness of skill data.' },
                        { title: 'Poor Discoverability', desc: 'Employees cannot easily find relevant skills or learning paths due to fragmented data, impacting career development and internal mobility.' }
                    ]
                },
                {
                    title: 'Our Solution',
                    icon: 'lightbulb',
                    intro: 'Skills Studio provides a comprehensive platform for enterprise skill management and intelligence:',
                    items: [
                        { title: 'Centralized Ingestion', desc: 'Unified ingestion layer that pulls skill data from external taxonomies (LinkedIn, ESCO, O*NET) and internal systems (LMS, HRIS, project management tools) into a single source of truth.' },
                        { title: 'Intelligent Harmonization', desc: 'Advanced harmonization engine uses ML and fuzzy matching to identify duplicates, normalize naming conventions, and merge related skills while preserving important distinctions.' },
                        { title: 'Graph-Based Modeling', desc: 'Skills are modeled as a knowledge graph showing relationships like prerequisites, related skills, and skill hierarchies, enabling intelligent recommendations and pathfinding.' },
                        { title: 'Enterprise Scalability', desc: 'Architecture designed to handle millions of skills and billions of relationships, supporting the largest global enterprises with distributed processing capabilities.' }
                    ]
                },
                {
                    title: 'Core Capabilities',
                    icon: 'stars',
                    intro: 'Powerful features designed specifically for enterprise needs and scale:',
                    items: [
                        { title: 'Skills Graph Integration', desc: 'Import and intelligently merge external skill taxonomies from industry providers, automatically mapping to internal skill frameworks while maintaining source attribution.' },
                        { title: 'Custom Taxonomy Creation', desc: 'Build organization-specific skill frameworks with custom categories, proficiency levels, and validation rules that reflect your unique business needs.' },
                        { title: 'Cross-Platform Harmonization', desc: 'Unify skills across LMS platforms, HRIS systems, and external sources with configurable matching rules and manual override capabilities for edge cases.' },
                        { title: 'Real-Time Search', desc: 'Elasticsearch-powered search delivers sub-second results across millions of skills with support for fuzzy matching, synonyms, and multi-language queries.' },
                        { title: 'Distributed Processing', desc: 'Ray scheduler orchestrates heavy graph operations like relationship inference and taxonomy merges across multiple nodes for parallel processing at scale.' }
                    ]
                },
                {
                    title: 'Backend Engineering',
                    icon: 'code',
                    intro: 'My contributions to building a robust, scalable platform that handles enterprise complexity:',
                    items: [
                        { title: 'Microservices Architecture', desc: 'Designed and implemented polyglot microservices using Python for ML/data processing and Golang for high-performance API services, with clear service boundaries and contracts.' },
                        { title: 'Graph Database Implementation', desc: 'Implemented complex graph modeling using ArangoDB to represent skill relationships, enabling efficient traversal queries for skill pathfinding and recommendation algorithms.' },
                        { title: 'Search Pipeline Optimization', desc: 'Optimized Elasticsearch indexing pipelines to handle real-time updates while maintaining search performance, reducing index time by 60% through bulk operations and smart batching.' },
                        { title: 'Event-Driven Architecture', desc: 'Built async processing infrastructure using Kafka for event streaming, Pulsar for message queuing, and RabbitMQ for task distribution, ensuring reliable message delivery.' },
                        { title: 'Distributed Task Scheduling', desc: 'Implemented Ray-based distributed computing for parallelizing heavy graph operations like taxonomy merges and relationship inference across multiple worker nodes.' },
                        { title: 'Performance Tuning', desc: 'Conducted extensive performance tuning for high-scale taxonomy queries, implementing caching strategies, query optimization, and database indexing to handle millions of concurrent users.' }
                    ]
                }
            ],
            tech: ['Python', 'Golang', 'ArangoDB', 'Redis', 'Elasticsearch', 'AWS', 'Ray Scheduler', 'RabbitMQ', 'Pulsar', 'Kafka', 'Kibana']
        },
        'flowxpert': {
            title: 'FlowXpert',
            subtitle: 'Drag & Drop Frontend Code Generator',
            icon: 'draw',
            overview: 'A low-code frontend builder that allows users to drag and drop UI components and automatically generate production-ready HTML/CSS code. Designed to simplify frontend engineering for clients and dramatically reduce development turnaround time.',
            sections: [
                {
                    title: 'Problem Statement',
                    icon: 'report',
                    intro: 'Frontend development bottlenecks were creating significant delays in project delivery:',
                    items: [
                        { title: 'Repetitive Development Work', desc: 'Frontend teams were spending 60-70% of their time building similar UI layouts repeatedly, leading to developer burnout and slow project timelines.' },
                        { title: 'Non-Technical Bottleneck', desc: 'Business analysts and designers couldn\'t prototype independently, creating dependencies on developers for even simple mockups and increasing iteration cycles.' },
                        { title: 'Complex Workflow Integration', desc: 'Connecting multiple pages with backend workflows required extensive manual coding, making it difficult to create end-to-end user journeys quickly.' }
                    ]
                },
                {
                    title: 'Our Solution',
                    icon: 'lightbulb',
                    intro: 'FlowXpert empowers users to build production-ready frontends visually without writing code:',
                    items: [
                        { title: 'Visual Component Builder', desc: 'Intuitive drag-and-drop interface with a rich palette of pre-built, customizable UI components including forms, tables, charts, and navigation elements.' },
                        { title: 'Intelligent Code Generation', desc: 'Backend engine analyzes component metadata, relationships, and styling to generate clean, semantic HTML/CSS code that follows best practices and is production-ready.' },
                        { title: 'Multi-Page Applications', desc: 'Build complete applications with multiple interconnected pages, shared components, and consistent styling across the entire application.' },
                        { title: 'Workflow Automation', desc: 'Seamless integration with N8N allows pages to trigger backend workflows, enabling complex business logic without custom coding.' },
                        { title: 'API Gateway Management', desc: 'Built-in TYK integration provides secure API routing, authentication, and rate limiting for all frontend-backend communications.' }
                    ]
                },
                {
                    title: 'Workflow Automation',
                    icon: 'automation',
                    intro: 'Powerful workflow capabilities that transform static pages into intelligent applications:',
                    items: [
                        { title: 'Page Connectivity', desc: 'Connect multiple pages to create complete user flows with conditional navigation, parameter passing, and state management across page transitions.' },
                        { title: 'N8N Workflow Integration', desc: 'Link page actions (button clicks, form submissions) to N8N workflows that handle backend processing, data transformation, and external API calls.' },
                        { title: 'Automated User Journeys', desc: 'Create end-to-end automated experiences where user actions trigger workflows that process data, send notifications, and update multiple systems without manual intervention.' },
                        { title: 'Visual Workflow Designer', desc: 'Non-technical users can design complex workflows using N8N\'s visual interface, connecting pages to business logic without writing code.' }
                    ]
                },
                {
                    title: 'Backend Architecture',
                    icon: 'architecture',
                    intro: 'Robust backend architecture powering the code generation and workflow orchestration:',
                    items: [
                        { title: 'Transformation Engine', desc: 'Sophisticated engine written in Golang converts component metadata into optimized, semantic HTML/CSS code with proper accessibility attributes and responsive design patterns.' },
                        { title: 'TYK API Gateway', desc: 'Centralized API gateway handles routing, authentication, rate limiting, and request transformation, providing a secure bridge between frontend and backend services.' },
                        { title: 'Workflow Trigger System', desc: 'Event-driven architecture captures user interactions and triggers corresponding N8N workflows with proper error handling and retry mechanisms.' },
                        { title: 'Database Optimization', desc: 'PostgreSQL schema optimized for fast component retrieval with proper indexing, caching strategies, and query optimization for sub-50ms response times.' },
                        { title: 'Monitoring & Logging', desc: 'Kibana-based comprehensive logging tracks code generation performance, workflow execution, and user interactions for debugging and optimization.' }
                    ]
                }
            ],
            tech: ['Golang', 'PostgreSQL', 'N8N', 'TYK', 'Kibana']
        },
        'stolt': {
            title: 'Stolt Emission Forecasting',
            subtitle: 'Maritime Analytics & Performance Intelligence',
            icon: 'sailing',
            overview: 'A service-based enterprise project developed for maritime analytics, where ships\' operational data is processed daily to forecast emissions and performance metrics. Ships are ranked on an A–E scale based on operational health and emission efficiency.',
            sections: [
                {
                    title: 'Problem Statement',
                    icon: 'report',
                    intro: 'Maritime operations lacked automated intelligence for emission management and performance tracking:',
                    items: [
                        { title: 'Manual Calculation Burden', desc: 'Analysts spent hours daily manually calculating emission levels for each vessel using spreadsheets, leading to errors, delays, and inability to process data for large fleets.' },
                        { title: 'No Standardized Ranking', desc: 'Without a consistent ranking mechanism, fleet managers couldn\'t quickly identify underperforming vessels or prioritize maintenance and optimization efforts.' },
                        { title: 'Lack of Predictive Analytics', desc: 'No system existed to forecast future emissions or predict ship health issues, making it impossible to proactively address problems before they escalated.' }
                    ]
                },
                {
                    title: 'Our Solution',
                    icon: 'lightbulb',
                    intro: 'Built an automated ML pipeline that transforms raw ship data into actionable intelligence:',
                    items: [
                        { title: 'Automated Data Ingestion', desc: 'Daily automated collection of ship operational data including fuel consumption, speed, cargo weight, weather conditions, and engine performance from onboard sensors and systems.' },
                        { title: 'Multi-Metric Calculation', desc: 'Comprehensive calculation of emission levels (CO2, NOx, SOx), fuel capacity efficiency ratios, heat tolerance metrics for engine health, and weight capacity utilization parameters.' },
                        { title: 'Historical Comparison Engine', desc: 'Advanced algorithms compare current metrics with historical performance data to identify trends, anomalies, and degradation patterns over time.' },
                        { title: 'Intelligent Ranking System', desc: 'ML-based ranking algorithm generates A–E scale grades for each vessel, considering multiple factors weighted by their impact on operational efficiency and environmental compliance.' },
                        { title: 'Predictive Forecasting', desc: 'Machine learning models forecast future emission trends and maintenance needs based on historical patterns, enabling proactive fleet management.' }
                    ]
                },
                {
                    title: 'Ranking System',
                    icon: 'leaderboard',
                    intro: 'Intelligent ranking algorithm based on multiple operational factors and industry benchmarks:',
                    items: [
                        { title: 'A Grade - Optimal Performance', desc: 'Best operational condition with optimal fuel efficiency (>85% of theoretical maximum), low emissions (below IMO 2020 standards by 20%+), and excellent maintenance indicators.' },
                        { title: 'B-C Grade - Good to Average', desc: 'Good to average performance with minor optimization opportunities. Fuel efficiency 70-85%, emissions within regulatory limits, some maintenance attention needed.' },
                        { title: 'D-E Grade - Requires Attention', desc: 'Poor condition indicating high emission risk (<70% fuel efficiency), emissions approaching or exceeding limits, requires immediate maintenance intervention and operational review.' },
                        { title: 'Ranking Factors', desc: 'Algorithm considers historical emission trends (30% weight), fuel efficiency patterns (25%), current operational parameters (20%), maintenance history (15%), and weather-adjusted performance (10%).' },
                        { title: 'Real-Time Updates', desc: 'Rankings update automatically as new operational data becomes available, providing fleet managers with current vessel status for informed decision-making.' }
                    ]
                },
                {
                    title: 'Automation Journey',
                    icon: 'upgrade',
                    intro: 'Evolution from manual processes to fully automated ML pipeline demonstrating measurable impact:',
                    items: [
                        { title: 'Phase 1 - Manual Process', desc: 'Initial state involved analysts manually downloading data, performing calculations in Excel, and updating SQL database. Process took 4-6 hours daily with frequent errors.' },
                        { title: 'Phase 2 - Pipeline Design', desc: 'Designed comprehensive Azure ML pipeline architecture with data ingestion, preprocessing, feature engineering, model training, and prediction components.' },
                        { title: 'Phase 3 - Automated Execution', desc: 'Implemented automated daily batch runs processing hundreds of ships in parallel, reducing processing time from 4-6 hours to 15 minutes with 100% consistency.' },
                        { title: 'Phase 4 - Database Integration', desc: 'Automated storage of computed metrics back into SQL database with proper error handling, data validation, and audit logging for compliance.' },
                        { title: 'Results & Impact', desc: 'Achieved 95% reduction in processing time, eliminated manual errors, enabled real-time fleet monitoring, and provided predictive insights that reduced fuel costs by 12% across the fleet.' }
                    ]
                }
            ],
            tech: ['Python', 'Azure ML Pipelines', 'SQL', 'Data Processing Frameworks']
        }
    };

    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const relatedGrid = document.getElementById('relatedGrid');

    function openProject(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        const sectionsHTML = project.sections.map(section => `
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-icon">
                        <span class="material-symbols-outlined">${section.icon}</span>
                    </div>
                    <h3>${section.title}</h3>
                </div>
                ${section.intro ? `<p class="modal-section-intro">${section.intro}</p>` : ''}
                ${section.items ? `
                    <ul class="modal-list">
                        ${section.items.map(item => `
                            <li class="modal-list-item">
                                <span class="modal-list-item-title">${item.title}</span>
                                <p class="modal-list-item-desc">${item.desc}</p>
                            </li>
                        `).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('');

        modalBody.innerHTML = `
            <div class="modal-hero">
                <div class="modal-hero-icon">
                    <span class="material-symbols-outlined">${project.icon}</span>
                </div>
                <h2>${project.title}</h2>
                <p>${project.overview}</p>
            </div>
            ${sectionsHTML}
            <div class="modal-tech">
                <h3><span class="material-symbols-outlined">build</span>Tech Stack</h3>
                <div class="modal-tech-stack">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;

        // Populate related projects
        relatedGrid.innerHTML = '';
        Object.keys(projectData).forEach(key => {
            if (key !== projectId) {
                const related = projectData[key];
                const card = document.createElement('div');
                card.className = 'related-card';
                card.dataset.project = key;
                card.innerHTML = `
                    <h4>${related.title}</h4>
                    <p>${related.subtitle}</p>
                `;
                card.addEventListener('click', () => {
                    openProject(key);
                    modalBody.parentElement.scrollTop = 0;
                });
                relatedGrid.appendChild(card);
            }
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Project card click handlers
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            openProject(card.dataset.project);
        });
    });

    // Close modal handlers
    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
