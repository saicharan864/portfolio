/* ========================================
   Sai Charan Portfolio — Interactive JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // CUSTOM CURSOR
    // ========================================
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let cursorActive = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 4 + 'px';
        cursor.style.top = mouseY - 4 + 'px';

        if (!cursorActive) {
            cursorActive = true;
            animateFollower();
        }
    });

    function animateFollower() {
        followerX += (mouseX - followerX - 18) * 0.12;
        followerY += (mouseY - followerY - 18) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        if (Math.abs(mouseX - followerX - 18) > 0.1 || Math.abs(mouseY - followerY - 18) > 0.1) {
            requestAnimationFrame(animateFollower);
        } else {
            cursorActive = false;
        }
    }

    // Hover effects for links/buttons
    const hoverables = document.querySelectorAll('a, button, .project-card, .skill-pill, .video-placeholder');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            follower.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            follower.classList.remove('hovering');
        });
    });

    // ========================================
    // NAVBAR SCROLL
    // ========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ========================================
    // MOBILE MENU
    // ========================================
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // ========================================
    // TYPED TEXT EFFECT
    // ========================================
    const typedElement = document.getElementById('typed-text');
    const phrases = [
        'Ross XPression Designer & Live Graphics Operator',
        'Broadcast Graphics Designer at Tesseract Esports',
        'Ross Dashboard | Logic & Scripting',
        'Live Tournament Graphics Specialist',
        'BTech CS | Esports Broadcast Professional'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function typeText() {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // pause before deleting
            } else {
                typingSpeed = 60 + Math.random() * 40;
            }
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400; // pause before next phrase
            } else {
                typingSpeed = 30;
            }
        }

        setTimeout(typeText, typingSpeed);
    }
    setTimeout(typeText, 1500);

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // COUNTER ANIMATION (Stats)
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        let current = 0;
        const duration = 1500;
        const step = target / (duration / 16);

        function update() {
            current += step;
            if (current >= target) {
                element.textContent = target;
                return;
            }
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
        update();
    }

    // ========================================
    // PROJECT CARD TILT EFFECT
    // ========================================
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========================================
    // YOUTUBE VIDEO EMBED (Interactive)
    // ========================================
    document.querySelectorAll('.video-placeholder').forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const videoId = placeholder.dataset.videoId;
            if (!videoId || videoId.startsWith('YOUR_')) {
                // Demo mode - show a visual feedback
                const btn = placeholder.querySelector('.video-play-btn');
                btn.style.background = 'var(--accent-4)';
                btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';

                setTimeout(() => {
                    btn.style.background = '';
                    btn.innerHTML = '<svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                }, 1500);
                return;
            }

            const wrapper = placeholder.parentElement;
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;border:0;border-radius:20px;';

            wrapper.style.position = 'relative';
            wrapper.style.paddingBottom = '56.25%';
            wrapper.style.height = '0';
            wrapper.innerHTML = '';
            wrapper.appendChild(iframe);
        });
    });

    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-72px 0px -40% 0px'
    });

    sections.forEach(section => navObserver.observe(section));

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // ========================================
    // CONTACT FORM
    // ========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.btn-submit');
            const originalHTML = btn.innerHTML;

            // Set loading state
            btn.innerHTML = '<span>Sending...</span>';
            btn.style.opacity = '0.8';

            try {
                // Fetch the Formspree API (or similar)
                const actionUrl = contactForm.getAttribute('action');

                if (actionUrl && !actionUrl.includes('YOUR_FORM_ID')) {
                    const formData = new FormData(contactForm);
                    const response = await fetch(actionUrl, {
                        method: 'POST',
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });

                    if (!response.ok) throw new Error('Submission failed');
                } else {
                    // Simulate network delay if no form server provided
                    await new Promise(resolve => setTimeout(resolve, 800));
                }

                // Success state
                btn.innerHTML = '<span>Message Sent! ✨</span>';
                btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                btn.style.opacity = '1';
                contactForm.reset();
            } catch (error) {
                // Error state
                btn.innerHTML = '<span>Error Sending</span>';
                btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                btn.style.opacity = '1';
            }

            // Reset button after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.opacity = '1';
            }, 3000);
        });
    }

    // ========================================
    // MAGNETIC BUTTONS
    // ========================================
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ========================================
    // PARALLAX ORBS
    // ========================================
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        document.querySelectorAll('.hero-gradient-orb').forEach((orb, i) => {
            const speed = (i + 1) * 0.08;
            orb.style.transform = `translateY(${scroll * speed}px)`;
        });
    });

    // ========================================
    // SKILL PILLS STAGGER ANIMATION
    // ========================================
    document.querySelectorAll('.skill-category').forEach(category => {
        const pills = category.querySelectorAll('.skill-pill');
        const pillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pills.forEach((pill, i) => {
                        pill.style.opacity = '0';
                        pill.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            pill.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                            pill.style.opacity = '1';
                            pill.style.transform = 'translateY(0)';
                        }, 100 + i * 60);
                    });
                    pillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        pillObserver.observe(category);
    });

});
