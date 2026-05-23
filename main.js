// ============================================
// MITA/NOMI PORTFOLIO - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== CUSTOM CURSOR ====================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });
        
        const interactiveElements = document.querySelectorAll('a, button, .work-card, .skill-tag, .social-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'scale(1.5)';
                cursorOutline.style.borderColor = '#FF69B4';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'scale(1)';
                cursorOutline.style.borderColor = '#FFB6C1';
            });
        });
    }
    
    // ==================== NAVBAR SCROLL ====================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ==================== MOBILE MENU ====================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // ==================== TYPING EFFECT ====================
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'Rekam Medis Staff 🏥',
        'Frontend Developer 💻',
        'UI/UX Designer 🎨',
        'RPL Alumni ✨'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
    
    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.section-header, .about-content, .works-grid, .skills-content, .contact-content');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // ==================== ACTIVE NAV LINK ====================
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ==================== STATS COUNTER ====================
    const statItems = document.querySelectorAll('.stat-item');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const numberEl = entry.target.querySelector('.stat-number');
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const counter = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        numberEl.textContent = target + (target === 18 ? '' : '+');
                        clearInterval(counter);
                    } else {
                        numberEl.textContent = Math.floor(count);
                    }
                }, 16);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => statsObserver.observe(item));
    
    // ==================== SKILL BARS ANIMATION ====================
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const skillsBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillsBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillFills.forEach(fill => skillsBarObserver.observe(fill));
    
    // ==================== 3D TILT EFFECT ====================
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    if (window.innerWidth > 768) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
    
    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>Mengirim...</span>';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<span>✓ Terkirim!</span>';
            btn.style.background = '#4CAF50';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
    
    // ==================== PARALLAX EFFECT ====================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.shape');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ==================== MUSIC PLAYER ====================
    window.toggleMusic = function() {
        const music = document.getElementById('bgMusic');
        const toggle = document.querySelector('.music-toggle');
        
        if (music.paused) {
            music.play().catch(e => console.log('Audio play failed:', e));
            toggle.classList.add('playing');
        } else {
            music.pause();
            toggle.classList.remove('playing');
        }
    };
    
    // ==================== MAGNETIC BUTTONS ====================
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline');
    
    if (window.innerWidth > 768) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // ==================== FLOATING PARTICLES ====================
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: rgba(255, 182, 193, 0.4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: -10px;
            animation: particle-fall ${5 + Math.random() * 5}s linear forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 10000);
    }
    
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particle-fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    setInterval(createParticle, 2000);
    
    // ==================== WORK CARD HOVER ====================
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });
    
    console.log('🏥 Mita/Nomi Portfolio loaded! Welcome~ 💕');
});
