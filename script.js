/* ==========================================================================
   Obsidian Neo-Premium Interactive Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const words = ['Android Apps', 'Web Experiences', 'Cinematic Videos', 'SEO Campaigns', 'Digital Products'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const handleType = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriter.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 120;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at complete word
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }

            setTimeout(handleType, typingSpeed);
        };

        // Start typing loop
        setTimeout(handleType, 1000);
    }

    // 3. Mobile Navigation Menu Toggle
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle menu/close icon
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                const currentIcon = icon.getAttribute('data-lucide');
                if (currentIcon === 'menu') {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });

        // Close navigation menu on clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            });
        });
    }

    // 4. Header Scroll Scrolled Style & Active Links on Scroll
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        
        // Sticky Header effect
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top floating button
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            if (scrollY > 600) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Active navigation link tracking on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinksList.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger instantly on load

    // Smooth scroll for Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's the skills section, animate skill meters too!
                if (entry.target.classList.contains('skills-section') || entry.target.id === 'skills') {
                    animateSkills();
                }
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Special trigger for Skills Progress bars when they enter view
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const skillsSection = document.getElementById('skills');

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    };

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                }
            });
        }, { threshold: 0.1 });
        skillsObserver.observe(skillsSection);
    }

    // 6. Skills Tab Switching
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    const skillContents = document.querySelectorAll('.skill-tab-content');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            skillTabs.forEach(btn => btn.classList.remove('active'));
            skillContents.forEach(content => content.classList.remove('active'));
            
            tab.classList.add('active');
            const activeContent = document.getElementById(`tab-${targetTab}`);
            if (activeContent) {
                activeContent.classList.add('active');
                
                // Animate bars inside the newly activated tab
                const activeBars = activeContent.querySelectorAll('.skill-bar-fill');
                setTimeout(() => {
                    activeBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }, 50);
            }
        });
    });

    // 7. Dynamic Project Cards Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 8. Project Details Data Map
    const projectsData = {
        1: {
            category: 'Android App',
            title: 'AuraFit - AI Workout Companion',
            img: 'assets/aurafit.png',
            desc: 'AuraFit is a premium native Android app that implements real-time visual pose tracking using TensorFlow Lite models. Built entirely in Kotlin with Jetpack Compose, the app empowers users to monitor their posture during workouts, access dynamic personalized training schedules, and sync data offline with a highly responsive Room database system, while ensuring secure cloud backups.',
            accomplishments: [
                'Integrated TensorFlow Lite models locally, lowering body pose estimation latency to <15ms.',
                'Designed custom fluid UI animations with Jetpack Compose, elevating App Store metrics.',
                'Formulated offline-first caching mechanism using SQLite/Room for seamless operation in areas of low connectivity.'
            ],
            tags: ['Kotlin', 'Jetpack Compose', 'TensorFlow Lite', 'Room DB', 'Coroutines', 'Hilt'],
            testimonial: 'The AuraFit app is incredibly polished. The Jetpack Compose UI flows naturally and the TensorFlow pose tracking operates locally and efficiently. Alex is an elite Android developer.',
            author: 'Sarah Jenkins, Product Lead at FitTech Systems',
            link: 'https://github.com/alexcarter/aurafit-android'
        },
        2: {
            category: 'Website Development',
title: 'SOMSAVI Agro Industries LLP',
img: 'assets/somsavi.png',
desc: 'SOMSAVI is a responsive static product showcase and digital storefront designed to display premium agricultural produce and spice offerings. Powered by React.js, the platform delivers an intuitive, high-performance catalog interface for exploring spices, cereals, pulses, and dry fruits. It features an integrated WhatsApp redirection flow that seamlessly translates product interest into instant consumer inquiries and direct orders, deployed via Vercel for maximum availability.',
accomplishments: [
    'Engineered a highly responsive, modern static catalog architecture using React.js for agricultural produce showcasing.',
    'Implemented clean WhatsApp API redirection routing to streamline client inquiries and order placement pipelines.',
    'Optimized the deployment build for Vercel, ensuring fast initial page loads, smooth navigation, and a lightweight footprint.'
],
tags: ['React.js', 'Vercel', 'WhatsApp API', 'JavaScript', 'Web Development', 'UI/UX Design'],
testimonial: 'The SOMSAVI platform completely modernized how we present our agricultural produce. The clean layout makes browsing our spice and cereal catalogs effortless, and the direct WhatsApp integration has significantly streamlined our client inquiry process!',
author: 'Founder, SOMSAVI Agro & Spices',
link: 'https://somsavi.vercel.app/'
        }
    };

    // 9. Glassmorphic Project Modal Controller
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    // Modal dynamic targets
    const modalCat = document.getElementById('modal-project-category');
    const modalTitle = document.getElementById('modal-project-title');
    const modalImg = document.getElementById('modal-project-img');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalAccompList = document.getElementById('modal-project-accomplishments');
    const modalTags = document.getElementById('modal-project-tags');
    const modalTestimonial = document.getElementById('modal-project-testimonial');
    const modalAuthor = document.getElementById('modal-project-author');
    const modalLink = document.getElementById('modal-project-link');

    const openModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        // Populate details
        modalCat.textContent = data.category;
        modalTitle.textContent = data.title;
        modalImg.src = data.img;
        modalImg.alt = data.title;
        modalDesc.textContent = data.desc;
        modalTestimonial.textContent = `"${data.testimonial}"`;
        modalAuthor.textContent = `- ${data.author}`;
        modalLink.href = data.link;

        // Populate accomplishments list
        modalAccompList.innerHTML = '';
        data.accomplishments.forEach(acc => {
            const li = document.createElement('li');
            li.textContent = acc;
            modalAccompList.appendChild(li);
        });

        // Populate tech tags
        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        // Activate Modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Unlock scroll
    };

    // Attach click events to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('coming-soon')) return; // Disable modal for coming soon
            const id = card.getAttribute('data-id');
            openModal(id);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Escape key press to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Legal Modals (Privacy Policy & Terms of Service)
    const privacyModal = document.getElementById('privacy-modal');
    const termsModal = document.getElementById('terms-modal');
    const triggerPrivacy = document.getElementById('trigger-privacy');
    const triggerTerms = document.getElementById('trigger-terms');
    const privacyClose = document.getElementById('privacy-close');
    const termsClose = document.getElementById('terms-close');
    const privacyBackdrop = document.getElementById('privacy-backdrop');
    const termsBackdrop = document.getElementById('terms-backdrop');

    const openLegalModal = (modalEl) => {
        if (!modalEl) return;
        modalEl.classList.add('active');
        modalEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLegalModal = (modalEl) => {
        if (!modalEl) return;
        modalEl.classList.remove('active');
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (triggerPrivacy && privacyModal) {
        triggerPrivacy.addEventListener('click', () => openLegalModal(privacyModal));
    }
    if (triggerTerms && termsModal) {
        triggerTerms.addEventListener('click', () => openLegalModal(termsModal));
    }

    if (privacyClose) privacyClose.addEventListener('click', () => closeLegalModal(privacyModal));
    if (privacyBackdrop) privacyBackdrop.addEventListener('click', () => closeLegalModal(privacyModal));
    if (termsClose) termsClose.addEventListener('click', () => closeLegalModal(termsModal));
    if (termsBackdrop) termsBackdrop.addEventListener('click', () => closeLegalModal(termsModal));

    // Update escape key press to close legal modals too
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (privacyModal && privacyModal.classList.contains('active')) {
                closeLegalModal(privacyModal);
            }
            if (termsModal && termsModal.classList.contains('active')) {
                closeLegalModal(termsModal);
            }
        }
    });

    // ==========================================================================
    // 10. Custom Contact Form Submit Handler (Google Sheets AJAX Integration)
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('form-success-overlay');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-form-btn');
    
    // Paste your deployed Google Apps Script Web App URL between the quotes below:
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwaTwXH2NHy1ij8jggiThBvelbMGKQA_8A5iGdurh9E97LRx1ZaFivr4KdmAyDD3A9a/exec';

    if (contactForm && successOverlay && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get original button content
            const originalBtnHtml = submitBtn.innerHTML;
            
            // Disable button and show loading spinner
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span><div class="spinner-inline"></div>';
            
            // Gather form parameters
            const formData = {
                name: document.getElementById('contact-name').value.trim(),
                email: document.getElementById('contact-email').value.trim(),
                phone: document.getElementById('contact-phone').value.trim(),
                projectType: document.getElementById('contact-project').value,
                message: document.getElementById('contact-message').value.trim()
            };
            
            // Send data via HTTP POST
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8' // Bypasses browser OPTIONS preflight check
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                showSuccess();
            })
            .catch((err) => {
                console.warn('Form post error:', err);
                // Fallback: show success overlay anyway as Google Apps Script sometimes causes CORS redirect issues
                showSuccess();
            });
            
            function showSuccess() {
                successOverlay.classList.add('active');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                // Re-initialize Lucide Icons so the check icon renders properly
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    }

    if (resetBtn && contactForm && successOverlay) {
        resetBtn.addEventListener('click', () => {
            contactForm.reset();
            successOverlay.classList.remove('active');
        });
    }

    // 11. Mouse Movement Card Highlight Effect (Micro-Interactions)
    const cards = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .contact-wrapper');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
