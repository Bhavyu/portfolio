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
            cards: [
                {
                    title: 'Problem Statement',
                    icon: 'problem_solving',
                    content: 'Traditional credit scoring systems have significant limitations that prevent lenders from making truly informed decisions:',
                    items: [
                        'Do not show negative micro-events like cheque bounces, negative balances, or missed EMI patterns',
                        'Lack domain-level spending insights that could help personalize financial offers',
                        'Cannot help lenders create risk-adjusted, tailored financial products',
                        'Miss the complete financial behavior picture of borrowers'
                    ]
                },
                {
                    title: 'Our Solution',
                    icon: 'lightbulb',
                    content: 'Algo360 processes financial SMS data through a sophisticated ML pipeline to provide comprehensive financial intelligence:',
                    items: [
                        'Extracts structured transaction-level insights from SMS data',
                        'Categorizes user activity into 10+ domains: CASA, Credit Card, Loan, BNPL, Travelling, Shopping, Utilities',
                        'Generates domain-level and overall financial behavior scores',
                        'Enables lenders to offer personalized and risk-adjusted products',
                        'Provides DQS (Data Quality Score) for reliability assessment'
                    ]
                },
                {
                    title: 'Processing Flow',
                    icon: 'account_tree',
                    content: 'Our secure and efficient data processing pipeline ensures accuracy and privacy:',
                    items: [
                        '<strong>Step 1:</strong> Capture only financial SMS data from user devices',
                        '<strong>Step 2:</strong> Secure ingestion with KMS envelope encryption',
                        '<strong>Step 3:</strong> Data cleaning and ML-based classification',
                        '<strong>Step 4:</strong> Domain-level scoring engines process categorized data',
                        '<strong>Step 5:</strong> Generate Algo360 Score (0–360) and Data Quality Score'
                    ]
                },
                {
                    title: 'B2B Integration',
                    icon: 'integration_instructions',
                    content: 'Flexible integration options for seamless adoption:',
                    items: [
                        '<strong>API Integration:</strong> Clients capture SMS and share structured payloads via secure APIs',
                        '<strong>SDK Integration:</strong> Our SDK embedded in client apps captures SMS and sends securely to our servers',
                        'Both methods ensure end-to-end encryption and data privacy'
                    ]
                },
                {
                    title: 'Architecture Highlights',
                    icon: 'architecture',
                    content: 'Enterprise-grade backend architecture built for scale and security:',
                    items: [
                        '<strong>Security:</strong> KMS Envelope Encryption for data at rest, network-level encryption in transit',
                        '<strong>Performance:</strong> Redis caching to reduce API calls, API rate limiting for stability',
                        '<strong>Database:</strong> DynamoDB Single Table Design for optimal query performance',
                        '<strong>Processing:</strong> Celery for async task processing, distributed ML scoring pipelines',
                        '<strong>Monitoring:</strong> Sentry for error tracking, Kibana for log analysis'
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
            cards: [
                {
                    title: 'Problem Statement',
                    icon: 'problem_solving',
                    content: 'Organizations struggle with fragmented skill data across their ecosystem:',
                    items: [
                        'Skill duplication across multiple platforms leading to inconsistency',
                        'Inconsistent taxonomy standards making cross-platform analysis difficult',
                        'Difficulty integrating external skill graphs from providers like LinkedIn, Coursera',
                        'Poor skill discoverability for employees seeking learning paths',
                        'No unified view of organizational skill inventory'
                    ]
                },
                {
                    title: 'Our Solution',
                    icon: 'lightbulb',
                    content: 'Skills Studio provides a comprehensive platform for enterprise skill management:',
                    items: [
                        'Centralized skill ingestion from external taxonomies and internal systems',
                        'Intelligent harmonization engine for deduplication and normalization',
                        'Graph-based relationship modeling to understand skill connections',
                        'Scalable architecture for enterprise-grade taxonomy management',
                        'Real-time search capabilities using Elasticsearch for instant discovery'
                    ]
                },
                {
                    title: 'Core Capabilities',
                    icon: 'stars',
                    content: 'Powerful features designed for enterprise needs:',
                    items: [
                        '<strong>Skills Graph Integration:</strong> Import and merge external skill taxonomies',
                        '<strong>Custom Taxonomy Creation:</strong> Build organization-specific skill frameworks',
                        '<strong>Cross-Platform Harmonization:</strong> Unify skills across LMS, HRIS, and external sources',
                        '<strong>Real-Time Search:</strong> Elasticsearch-powered instant skill discovery',
                        '<strong>Distributed Processing:</strong> Ray scheduler for heavy graph operations at scale'
                    ]
                },
                {
                    title: 'Backend Engineering',
                    icon: 'code',
                    content: 'My contributions to building a robust, scalable platform:',
                    items: [
                        'Designed and implemented microservices architecture using Python and Golang',
                        'Implemented graph modeling using ArangoDB for complex skill relationships',
                        'Optimized search indexing pipelines for sub-second query response',
                        'Built async processing infrastructure with Kafka, Pulsar, and RabbitMQ',
                        'Implemented distributed task scheduling via Ray for parallel processing',
                        'Performance tuning for high-scale taxonomy queries handling millions of skills'
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
            cards: [
                {
                    title: 'Problem Statement',
                    icon: 'problem_solving',
                    content: 'Frontend development bottlenecks were slowing down project delivery:',
                    items: [
                        'Frontend teams spending excessive time building repetitive UI layouts',
                        'Non-technical teams unable to prototype independently, creating dependencies',
                        'Complex workflow integration across multiple pages requiring manual coding',
                        'Long development cycles for simple UI changes'
                    ]
                },
                {
                    title: 'Our Solution',
                    icon: 'lightbulb',
                    content: 'FlowXpert empowers users to build production-ready frontends visually:',
                    items: [
                        '<strong>Visual Builder:</strong> Intuitive drag-and-drop component palette',
                        '<strong>Code Generation:</strong> Backend engine converts component metadata into clean, production-ready HTML/CSS',
                        '<strong>Multi-Page Support:</strong> Build complete applications with multiple interconnected pages',
                        '<strong>Workflow Automation:</strong> Integrate with N8N for automated user journeys',
                        '<strong>API Management:</strong> Seamless API gateway management via TYK'
                    ]
                },
                {
                    title: 'Workflow Automation',
                    icon: 'automation',
                    content: 'Powerful workflow capabilities that go beyond simple page building:',
                    items: [
                        'Connect multiple pages to create complete user flows',
                        'Link pages to N8N workflows for backend automation',
                        'Create end-to-end automated user journeys without coding',
                        'Trigger workflows based on user interactions and page transitions',
                        'Visual workflow designer for non-technical users'
                    ]
                },
                {
                    title: 'Backend Highlights',
                    icon: 'architecture',
                    content: 'Robust backend architecture powering the code generation engine:',
                    items: [
                        '<strong>Transformation Engine:</strong> Converts component metadata into optimized HTML/CSS code',
                        '<strong>API Gateway:</strong> TYK-based routing for secure API management',
                        '<strong>Workflow Pipelines:</strong> Automated trigger systems for N8N integration',
                        '<strong>Database:</strong> PostgreSQL schema optimization for fast component retrieval',
                        '<strong>Monitoring:</strong> Kibana-based logging and performance monitoring'
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
            cards: [
                {
                    title: 'Problem Statement',
                    icon: 'problem_solving',
                    content: 'Maritime operations lacked automated intelligence for emission management:',
                    items: [
                        'Manual emission calculation was time-consuming and error-prone',
                        'No standardized ranking mechanism to compare ship performance',
                        'No predictive analytics for ship health and maintenance needs',
                        'Difficulty identifying high-emission vessels requiring intervention'
                    ]
                },
                {
                    title: 'Our Solution',
                    icon: 'lightbulb',
                    content: 'Built an automated ML pipeline that transforms raw ship data into actionable insights:',
                    items: [
                        '<strong>Daily Data Ingestion:</strong> Automated collection of ship operational data',
                        '<strong>Multi-Metric Calculation:</strong> Emission levels, fuel capacity efficiency, heat tolerance, weight capacity',
                        '<strong>Historical Comparison:</strong> Compare current metrics with historical performance data',
                        '<strong>Performance Ranking:</strong> Generate A–E scale ranking for each vessel',
                        '<strong>Predictive Analytics:</strong> Forecast future emission trends and maintenance needs'
                    ]
                },
                {
                    title: 'Ranking System',
                    icon: 'leaderboard',
                    content: 'Intelligent ranking algorithm based on multiple operational factors:',
                    items: [
                        '<strong>A Grade:</strong> Best operational condition, optimal fuel efficiency, low emissions',
                        '<strong>B-C Grade:</strong> Good to average performance with minor optimization opportunities',
                        '<strong>D-E Grade:</strong> Poor condition, high emission risk, requires immediate attention',
                        '<strong>Ranking Factors:</strong> Historical emission trends, fuel efficiency patterns, current operational parameters',
                        'Real-time updates as new operational data becomes available'
                    ]
                },
                {
                    title: 'Automation Journey',
                    icon: 'upgrade',
                    content: 'Evolution from manual processes to fully automated ML pipeline:',
                    items: [
                        '<strong>Phase 1 (Manual):</strong> Manual calculation and database updates by analysts',
                        '<strong>Phase 2 (Automation):</strong> Designed Azure ML pipeline for automated processing',
                        '<strong>Phase 3 (Scale):</strong> Automated daily batch runs processing hundreds of ships',
                        '<strong>Phase 4 (Integration):</strong> Stored computed metrics back into SQL DB for reporting',
                        '<strong>Result:</strong> 95% reduction in processing time, 100% consistency in calculations'
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

        const cardsHTML = project.cards.map(card => `
            <div class="modal-card ${card.fullWidth ? 'modal-full-card' : ''}">
                <div class="modal-card-header">
                    <div class="modal-card-icon">
                        <span class="material-symbols-outlined">${card.icon}</span>
                    </div>
                    <h3>${card.title}</h3>
                </div>
                ${card.content ? `<p>${card.content}</p>` : ''}
                ${card.items ? `<ul>${card.items.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
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
            <div class="modal-grid">
                ${cardsHTML}
            </div>
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
