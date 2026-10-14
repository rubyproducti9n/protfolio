/**
 * Om Lokhande - High-Performance Interactive Controller
 * Matte Black Professional Edition - Zero Lag, Pure Execution
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', isExpanded ? 'menu' : 'x');
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });

        // Close mobile menu on clicking any navigation link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }
            });
        });
    }

    // 3. Header Scrolled State (Matte black with subtle border)
    const header = document.getElementById('main-header');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (header) {
                    if (window.scrollY > 30) {
                        header.classList.add('bg-[#09090b]/95', 'border-b', 'border-zinc-800', 'shadow-md');
                        header.classList.remove('bg-transparent', 'border-transparent');
                    } else {
                        header.classList.remove('bg-[#09090b]/95', 'border-b', 'border-zinc-800', 'shadow-md');
                        header.classList.add('bg-transparent', 'border-transparent');
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // 4. One-Click Copy Email Functionality
    const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
    copyEmailBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = 'om.lokhande34@gmail.com';
            try {
                await navigator.clipboard.writeText(email);
                const originalHtml = btn.innerHTML;
                btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-zinc-200"></i><span class="text-zinc-200">Copied!</span>`;
                if (typeof lucide !== 'undefined') lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }, 2000);
            } catch (err) {
                window.location.href = `mailto:${email}`;
            }
        });
    });

    // 5. Case Studies Deep Dive Modal Data
    const caseStudiesData = {
        "2": {
            title: "EHR Healthcare Workflow Management System",
            subtitle: "Centralized Clinical Operations Platform",
            category: "Enterprise Healthcare Architecture",
            metric: "Eliminated manual latencies for clinical documentation with structured data handling and robust EHR workflows.",
            description: "Designed and engineered an enterprise-grade clinical management system built for high-throughput healthcare settings. Unified fragmented patient records, physician scheduling, and compliance data into an instant, validated workflow platform.",
            details: [
                "Interfaced directly with standard clinical platforms including PaceHR and Gehrimed for synchronized patient documentation.",
                "Streamlined clinical intake and doctor note compilation, eliminating administrative overhead and reducing clerical burnout.",
                "Constructed high-security schema validation layers enforcing patient data integrity and audit-ready data persistence.",
                "Architected central backend APIs and real-time state synchronization powering web portals and companion client applications."
            ],
            stack: ["Next.js / React", "TypeScript", "PaceHR", "Gehrimed", "FastAPI / Node.js", "Healthcare Workflows", "Data Security", "Real-Time Sync"],
            impactMetric: "Zero Latency",
            deliveryMetric: "100% HIPAA Ready"
        },
        "3": {
            title: "Unofficial Mech",
            subtitle: "Google Play Store Production Application",
            category: "Native Android & AI",
            metric: "Independently owned the entire product lifecycle from design to deployment, scaling an on-demand student resource app.",
            description: "A production native Android app published on Google Play. Designed and maintained single-handedly, delivering critical academic resources, real-time updates, and an intelligent AI assistant powered by Google's latest AI models.",
            details: [
                "Built from the ground up using Kotlin, Java, and modern Jetpack Compose adhering to strict MVVM Clean Architecture principles.",
                "Integrated the Google AI Studio SDK (AI) for contextual Q&A, syllabus breakdown, and academic resource summarization.",
                "Implemented Google Play Billing APIs for tiered recurring subscriptions and in-app content unlocks.",
                "Maintained 99.9% crash-free sessions monitored continuously via Android Vitals, Firebase Crashlytics, and ProGuard/R8 optimizations."
            ],
            stack: ["Kotlin", "Java", "Jetpack Compose", "MVVM Architecture", "AI SDK", "Google Play Billing", "Firebase Crashlytics", "Android Vitals"],
            impactMetric: "Google Play Live",
            deliveryMetric: "99.9% Crash-Free",
            link: "https://play.google.com/store/apps/details?id=com.rubyproducti9n.unofficialmech"
        }
    };


    // 5. Case Study Modal Controller & Dynamic Launch Button Controller
    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalFooterCloseBtn = document.getElementById('modal-footer-close-btn');

    // Dynamically adjust project card buttons:
    // If a valid external URL is provided, show the Play button and set modal button to flex-1.
    // If not, hide the Play button and make the modal button full width (w-full).
    const updateProjectActionButtons = () => {
        document.querySelectorAll('[data-project-actions]').forEach(container => {
            const id = container.getAttribute('data-project-actions');
            const data = caseStudiesData[id];
            const modalBtn = container.querySelector('[data-open-modal]');
            let playBtn = container.querySelector('[data-launch-btn]');

            const hasValidLink = !!(data && data.link && data.link !== '#' && (data.link.startsWith('http://') || data.link.startsWith('https://')));

            if (hasValidLink) {
                container.classList.add('flex', 'gap-2');
                if (modalBtn) {
                    modalBtn.className = "flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold transition-colors";
                }
                if (!playBtn) {
                    playBtn = document.createElement('a');
                    playBtn.setAttribute('data-launch-btn', 'true');
                    playBtn.target = "_blank";
                    playBtn.rel = "noopener noreferrer";
                    playBtn.className = "p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center justify-center transition-colors flex-shrink-0";
                    playBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i>';
                    container.appendChild(playBtn);
                }
                playBtn.href = data.link;
                playBtn.title = "Launch Project";
            } else {
                container.classList.remove('flex', 'gap-2');
                if (modalBtn) {
                    modalBtn.className = "w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold transition-colors";
                }
                if (playBtn) {
                    playBtn.remove();
                }
            }
        });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // Run dynamic action button updater on load
    updateProjectActionButtons();

    // Dynamically sync with projects.json or local admin storage
    const syncProjectsWithBackend = async () => {
        const applyData = (list) => {
            if (!Array.isArray(list)) return;
            list.forEach(p => {
                if (p.id) {
                    caseStudiesData[p.id] = {
                        title: p.title || (caseStudiesData[p.id]?.title || 'Project'),
                        subtitle: p.category || (caseStudiesData[p.id]?.subtitle || ''),
                        category: p.category || (caseStudiesData[p.id]?.category || ''),
                        metric: p.summary || (caseStudiesData[p.id]?.metric || ''),
                        description: p.desc || (caseStudiesData[p.id]?.description || ''),
                        details: (p.accomplishments && p.accomplishments.length) ? p.accomplishments : (caseStudiesData[p.id]?.details || []),
                        stack: (p.tags && p.tags.length) ? p.tags : (caseStudiesData[p.id]?.stack || []),
                        impactMetric: p.comingSoon ? "In-Development" : "Live in Production",
                        deliveryMetric: p.comingSoon ? "In-Development" : "Production",
                        link: (p.link && p.link !== '#') ? p.link : (caseStudiesData[p.id]?.link || null)
                    };
                }
            });
            updateProjectActionButtons();
        };

        // 1. Check if there are admin console edits saved in browser storage
        try {
            const localSaved = localStorage.getItem('portfolio_admin_projects');
            if (localSaved) {
                const parsed = JSON.parse(localSaved);
                applyData(parsed);
            }
        } catch (e) {}

        // 2. Fetch fresh projects.json from disk/server
        try {
            const res = await fetch('projects.json?t=' + Date.now());
            if (res.ok) {
                const liveProjects = await res.json();
                applyData(liveProjects);
            }
        } catch (err) {
            // Gracefully use the built-in caseStudiesData if running purely offline
        }
    };
    syncProjectsWithBackend();

    const openProjectModal = (projectId) => {
        const data = caseStudiesData[projectId];
        if (!data || !projectModal) return;

        const catEl = document.getElementById('modal-category');
        const titleEl = document.getElementById('modal-title');
        const subEl = document.getElementById('modal-subtitle');
        const metricEl = document.getElementById('modal-metric');
        const descEl = document.getElementById('modal-desc');

        if (catEl) catEl.textContent = data.category || 'Architecture Overview';
        if (titleEl) titleEl.textContent = data.title || 'Project Details';
        if (subEl) subEl.textContent = data.subtitle || '';
        if (metricEl) metricEl.textContent = data.metric || '';
        if (descEl) descEl.textContent = data.description || '';

        // Populate details bullet points
        const detailsContainer = document.getElementById('modal-details');
        if (detailsContainer) {
            detailsContainer.innerHTML = (data.details || []).map(item => `
                <li class="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                    <span class="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                    <span>${item}</span>
                </li>
            `).join('');
        }

        // Populate tech tags
        const tagsContainer = document.getElementById('modal-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = (data.stack || []).map(tag => `
                <span class="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-zinc-800 text-zinc-200 border border-zinc-700">
                    ${tag}
                </span>
            `).join('');
        }

        // External Link / Play Launch Button if applicable
        const linkBtn = document.getElementById('modal-link-btn');
        if (linkBtn) {
            const hasValidLink = !!(data.link && data.link !== '#' && (data.link.startsWith('http://') || data.link.startsWith('https://')));
            if (hasValidLink) {
                linkBtn.href = data.link;
                linkBtn.classList.remove('hidden');
                linkBtn.style.display = 'inline-flex';
            } else {
                linkBtn.classList.add('hidden');
                linkBtn.style.display = 'none';
            }
        }

        projectModal.classList.remove('hidden');
        projectModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    const closeProjectModal = () => {
        if (!projectModal) return;
        projectModal.classList.add('hidden');
        projectModal.style.display = 'none';
        document.body.style.overflow = '';
    };

    // Attach click events using delegation so dynamic or child elements (icons/spans) work flawlessly
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-modal]');
        if (trigger) {
            e.preventDefault();
            const id = trigger.getAttribute('data-open-modal');
            openProjectModal(id);
        }
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
    if (modalFooterCloseBtn) modalFooterCloseBtn.addEventListener('click', closeProjectModal);

    // 6. Generic Dialog Closes (Terms, Privacy)
    const termsModal = document.getElementById('terms-modal');
    const privacyModal = document.getElementById('privacy-modal');

    const openDialog = (dialog) => {
        if (dialog) {
            dialog.classList.remove('hidden');
            dialog.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    };

    const closeDialog = (dialog) => {
        if (dialog) {
            dialog.classList.add('hidden');
            dialog.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    document.querySelectorAll('[data-trigger-terms]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            openDialog(termsModal);
        });
    });

    document.querySelectorAll('[data-trigger-privacy]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            openDialog(privacyModal);
        });
    });

    document.querySelectorAll('[data-close-terms]').forEach(el => {
        el.addEventListener('click', () => closeDialog(termsModal));
    });

    document.querySelectorAll('[data-close-privacy]').forEach(el => {
        el.addEventListener('click', () => closeDialog(privacyModal));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeDialog(termsModal);
            closeDialog(privacyModal);
        }
    });

    // 7. Contact Form Handler (Google Apps Script Integration)
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    const formFeedback = document.getElementById('form-feedback');
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwaTwXH2NHy1ij8jggiThBvelbMGKQA_8A5iGdurh9E97LRx1ZaFivr4KdmAyDD3A9a/exec';

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
            `;

            const payload = {
                name: (document.getElementById('name')?.value || '').trim(),
                email: (document.getElementById('email')?.value || '').trim(),
                projectType: (document.getElementById('subject')?.value || '').trim(),
                message: (document.getElementById('message')?.value || '').trim(),
                submittedAt: new Date().toISOString()
            };

            try {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload)
                });
            } catch (err) {
                console.log('Submission dispatched.');
            }

            // Show Success Notification
            if (formFeedback) {
                formFeedback.classList.remove('hidden');
            }
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    // Reset feedback
    const resetFeedbackBtn = document.getElementById('reset-feedback-btn');
    if (resetFeedbackBtn && formFeedback) {
        resetFeedbackBtn.addEventListener('click', () => {
            formFeedback.classList.add('hidden');
        });
    }
});
