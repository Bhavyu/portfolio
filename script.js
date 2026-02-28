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
});
