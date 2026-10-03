document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       THEME TOGGLE (DARK/LIGHT MODE)
       ========================================== */
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeBtn.querySelector('i');

    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    /* ==========================================
       MOBILE MENU TOGGLE
       ========================================== */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.querySelector('i').classList.add('fa-bars');
            mobileBtn.querySelector('i').classList.remove('fa-times');
        });
    });

    /* ==========================================
       STICKY NAVBAR & ACTIVE LINK UPDATE
       ========================================== */
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Navbar & Back to Top
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('active');
        }

        // Active Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================================
       SCROLL REVEAL ANIMATIONS
       ========================================== */
    const reveals = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.progress-line span');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate skill bars specifically when they appear
                if (entry.target.classList.contains('skill-category')) {
                    const bars = entry.target.querySelectorAll('.progress-line span');
                    bars.forEach(bar => {
                        const width = bar.parentElement.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
                
                // Animate counters
                if (entry.target.querySelector('.counter')) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        let count = 0;
                        const increment = target / 50; // Speed adjustment
                        
                        const updateCount = () => {
                            count += increment;
                            if (count < target) {
                                counter.innerText = Math.ceil(count);
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                }
                
                observer.unobserve(entry.target); // Run once
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    /* ==========================================
       PROJECT FILTERING
       ========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================
       CONTACT FORM & TOAST NOTIFICATION
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic Frontend Validation is handled by HTML5 'required' attribute
            // Show Success Notification
            toast.classList.add('show');
            contactForm.reset();
            
            // Hide after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        });
    }
});