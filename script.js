document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .about-content').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

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
    });

    // Cursor lighting effect
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // Click ripple effect on cards
    document.querySelectorAll('.stat-card, .expertise-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('clicked');
            this.classList.toggle('active');
            setTimeout(() => this.classList.remove('clicked'), 600);
        });
    });

    // Particle network animation
    const canvas = document.getElementById('particleCanvas');
    const particles = [];
    const particleCount = 50;
    const connectionDistance = 150;

    class Particle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
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
                    line.style.opacity = (1 - distance / connectionDistance) * 0.3;
                    canvas.appendChild(line);
                }
            }
        }
    }

    function animate() {
        particles.forEach(particle => particle.update());
        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();
});
