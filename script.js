
        // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            const current = body.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }

        // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');

        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            mobileMenuToggle.textContent = isActive ? '✕' : '☰';
        });

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            });
        });

        // Get header reference for smooth scrolling
        const header = document.getElementById('header');

        // Scroll Progress Indicator
        const scrollIndicator = document.getElementById('scrollIndicator');

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            scrollIndicator.style.width = scrollPercentage + '%';
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Skip if href is just "#" or empty
                if (href === '#' || !href) return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });



        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            el.dataset.delay = index * 100;
            observer.observe(el);
        });

        // Active Navigation Link Highlighting
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Contact Form Handling
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name') || document.getElementById('name').value,
                email: formData.get('email') || document.getElementById('email').value,
                subject: formData.get('subject') || document.getElementById('subject').value,
                message: formData.get('message') || document.getElementById('message').value
            };

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });

        // Add CSS class for active nav link
        const style = document.createElement('style');
        style.textContent = `
            .nav-link.active {
                color: var(--primary-color);
            }
            .nav-link.active::after {
                width: 100%;
            }
        `;
        document.head.appendChild(style);

        // Parallax Effect for Hero Section (subtle)
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        // Project Card Hover Effects Enhancement
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Skill Items Random Animation Delay
        document.querySelectorAll('.skill-item').forEach((skill, index) => {
            skill.style.animationDelay = `${index * 0.1}s`;
        });

        // Loading Animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });

        // Add loading class styles
        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            body:not(.loaded) {
                overflow: hidden;
            }
            
            body:not(.loaded) .fade-in {
                opacity: 0;
                transform: translateY(30px);
            }
            
            body.loaded .fade-in {
                animation: fadeInUp 0.6s ease forwards;
            }
        `;
        document.head.appendChild(loadingStyle);