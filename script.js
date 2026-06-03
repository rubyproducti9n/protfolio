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

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');

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

    // 8. Project Details Data Map & Dynamic Loading
    let projectsData = {};

    const loadProjects = async () => {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px; font-size: 1.1rem; letter-spacing: 0.5px;">Loading dynamic portfolio...</div>';

        try {
            let response;
            try {
                // Try local dev server endpoint first
                response = await fetch('/api/projects');
                if (!response.ok) throw new Error('API server status check failed');
            } catch (err) {
                console.log('[Portfolio] Dev server API not available, loading from local projects.json file instead.');
                response = await fetch('projects.json');
            }

            if (!response.ok) {
                throw new Error('Failed to fetch projects.');
            }

            const projects = await response.json();
            
            // Populate projectsData object map for popup modals
            projectsData = {};
            projects.forEach(project => {
                projectsData[project.id] = project;
            });

            // Clear loader
            grid.innerHTML = '';

            if (projects.length === 0) {
                grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No projects found. Add some from the Admin Console!</div>';
                return;
            }

            // Render project cards
            projects.forEach(project => {
                const card = document.createElement('div');
                
                // Map the human category name to our data-filter class values: android, web, video
                let dataCategory = 'web';
                const lowerCat = project.category.toLowerCase();
                if (lowerCat.includes('android')) {
                    dataCategory = 'android';
                } else if (lowerCat.includes('video') || lowerCat.includes('edit') || lowerCat.includes('motion')) {
                    dataCategory = 'video';
                } else if (lowerCat.includes('web') || lowerCat.includes('site') || lowerCat.includes('saps') || lowerCat.includes('front')) {
                    dataCategory = 'web';
                }

                card.className = `project-card scroll-reveal${project.comingSoon ? ' coming-soon' : ''}`;
                card.setAttribute('data-category', dataCategory);
                card.setAttribute('data-id', project.id);

                let mediaHtml = '';
                if (project.comingSoon) {
                    mediaHtml = `
                        <div class="project-media-wrapper">
                            <img src="${project.img}" alt="${project.title}" class="project-img" onerror="this.src='assets/video-editing.png'">
                            <div class="coming-soon-overlay">
                                <span class="coming-soon-badge-center">Coming Soon</span>
                            </div>
                        </div>
                    `;
                } else {
                    mediaHtml = `
                        <div class="project-media-wrapper">
                            <img src="${project.img}" alt="${project.title}" class="project-img" onerror="this.src='assets/somsavi.png'">
                            <div class="project-overlay">
                                <span class="btn-project-view">View Case Study <i data-lucide="eye"></i></span>
                            </div>
                        </div>
                    `;
                }

                const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

                card.innerHTML = `
                    ${mediaHtml}
                    <div class="project-info">
                        <span class="project-category-tag">${project.category}</span>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-summary">${project.summary}</p>
                        <div class="project-tags">
                            ${tagsHtml}
                        </div>
                    </div>
                `;

                grid.appendChild(card);
            });

            // Initialize Lucide Icons for dynamic content
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Register newly added cards with scroll reveal intersection observer
            if (typeof revealObserver !== 'undefined') {
                const revealElements = grid.querySelectorAll('.scroll-reveal');
                revealElements.forEach(el => revealObserver.observe(el));
            }

            // Trigger mousemove card highlight effects on newly generated cards
            const newCards = grid.querySelectorAll('.project-card');
            newCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                });
            });

        } catch (error) {
            console.error('[Portfolio] Error rendering projects portfolio:', error);
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--accent); padding: 40px;">Failed to load project database. Please try refreshing.</div>';
        }
    };

    // Load projects asynchronously
    loadProjects();

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

        // Intercept Video Editing category projects to open the Cinematic Showcase
        if (data.category && (data.category.toLowerCase().includes('video') || data.showcaseVideos)) {
            openVideoShowcase(data);
            return;
        }

        // Populate details
        modalCat.textContent = data.category;
        modalTitle.textContent = data.title;
        modalImg.src = data.img;
        modalImg.alt = data.title;
        modalImg.onerror = function() { this.src = 'assets/somsavi.png'; };
        modalDesc.textContent = data.desc;
        modalTestimonial.textContent = data.testimonial ? `"${data.testimonial}"` : '';
        modalAuthor.textContent = data.author ? `- ${data.author}` : '';
        
        // Hide testimonial sub-section if not filled
        const testimonialParent = modalTestimonial.parentElement;
        if (testimonialParent && testimonialParent.classList.contains('modal-testimonial')) {
            if (!data.testimonial) {
                testimonialParent.style.display = 'none';
            } else {
                testimonialParent.style.display = 'block';
            }
        }

        modalLink.href = data.link || '#';
        if (!data.link || data.link === '#') {
            modalLink.style.display = 'none';
        } else {
            modalLink.style.display = 'block';
        }

        // Populate accomplishments list
        modalAccompList.innerHTML = '';
        if (Array.isArray(data.accomplishments) && data.accomplishments.length > 0) {
            data.accomplishments.forEach(acc => {
                if (acc && acc.trim() !== '') {
                    const li = document.createElement('li');
                    li.textContent = acc;
                    modalAccompList.appendChild(li);
                }
            });
        }

        // Populate tech tags
        modalTags.innerHTML = '';
        if (Array.isArray(data.tags)) {
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tag;
                modalTags.appendChild(span);
            });
        }

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

    // Video Showcase Modal Controls
    const videoModal = document.getElementById('video-showcase-modal');
    const videoModalClose = document.getElementById('video-modal-close');
    const videoModalBackdrop = document.getElementById('video-modal-backdrop');
    const videoPlayerWrapper = document.getElementById('video-player-wrapper');
    const videoPlayer = document.getElementById('showcase-video-player');
    const videoIframe = document.getElementById('showcase-iframe-player');
    const videoTitle = document.getElementById('video-showcase-title');
    const videoDesc = document.getElementById('video-showcase-desc');
    const videoTags = document.getElementById('video-showcase-tags');
    const videoPlaylist = document.getElementById('video-playlist');
    const videoAmbient = document.getElementById('video-ambient-glow');

    let activeVideos = [];
    let activeVideoIndex = 0;

    const openVideoShowcase = (projectData) => {
        // Collect videos or fallback
        activeVideos = Array.isArray(projectData.showcaseVideos) && projectData.showcaseVideos.length > 0
            ? projectData.showcaseVideos
            : [
                {
                    title: "Cinematic Travel Film - Widescreen (16:9)",
                    aspect: "16/9",
                    type: "youtube",
                    src: "https://www.youtube.com/embed/ScMzIvxBSi4",
                    desc: "A cinematic travel video edited with speed ramps, smooth camera transitions, and multi-layered nature ambient sound design.",
                    tags: ["DaVinci Resolve", "Color Grading", "Sound FX"],
                    glowColor: "rgba(173, 198, 255, 0.2)"
                },
                {
                    title: "Commercial Social Ad - Vertical Reel (9:16)",
                    aspect: "9/16",
                    type: "youtube",
                    src: "https://www.youtube.com/embed/ScMzIvxBSi4",
                    desc: "High-energy vertical ad optimized for social feeds, featuring rapid-fire visual edits, kinetic text overlays, and punchy transitions.",
                    tags: ["After Effects", "Premiere Pro", "Kinetic Typography"],
                    glowColor: "rgba(229, 186, 216, 0.2)"
                },
                {
                    title: "Documentary Narrative - Cinematic (21:9)",
                    aspect: "21/9",
                    type: "youtube",
                    src: "https://www.youtube.com/embed/3JZ_D3K155I",
                    desc: "Anamorphic widescreen edit focusing on interview audio leveling, low-key lighting grading, and smooth documentary pacing.",
                    tags: ["Premiere Pro", "Audio Pacing", "Color Correction"],
                    glowColor: "rgba(162, 198, 220, 0.2)"
                },
                {
                    title: "Motion Graphics Promo - Square (1:1)",
                    aspect: "1/1",
                    type: "direct",
                    src: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4",
                    desc: "A social post promo piece utilizing a 1:1 ratio, animated vector shapes, and tracking elements styled for corporate brand campaigns.",
                    tags: ["After Effects", "Illustrator", "Motion Tracking"],
                    glowColor: "rgba(194, 198, 220, 0.2)"
                }
            ];

        activeVideoIndex = 0;
        
        // Render Playlist
        renderVideoPlaylist();
        
        // Load initial video
        loadShowcaseVideo(0);

        // Open Modal
        if (videoModal) {
            videoModal.classList.add('active');
            videoModal.setAttribute('aria-hidden', 'false');
        }
        document.body.style.overflow = 'hidden'; // Lock scrolling
    };

    const renderVideoPlaylist = () => {
        if (!videoPlaylist) return;
        videoPlaylist.innerHTML = '';
        activeVideos.forEach((video, idx) => {
            const item = document.createElement('div');
            item.className = `video-list-item${idx === activeVideoIndex ? ' active' : ''}`;
            item.setAttribute('data-index', idx);
            
            // Map aspect labels for readable badge text
            let readableAspect = 'Widescreen';
            if (video.aspect === '9/16') readableAspect = 'Reel/Short';
            if (video.aspect === '1/1') readableAspect = 'Square';
            if (video.aspect === '21/9') readableAspect = 'Cinematic';

            item.innerHTML = `
                <div class="playlist-thumb">
                    <i data-lucide="play"></i>
                </div>
                <div class="playlist-info">
                    <h4 class="playlist-video-title">${video.title}</h4>
                    <div class="playlist-video-meta">
                        <span class="playlist-video-aspect">${readableAspect}</span>
                    </div>
                </div>
            `;
            
            item.addEventListener('click', () => {
                loadShowcaseVideo(idx);
            });
            
            videoPlaylist.appendChild(item);
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons({
                attrs: {
                    style: 'width: 16px; height: 16px;'
                }
            });
        }
    };

    const loadShowcaseVideo = (idx) => {
        activeVideoIndex = idx;
        
        // Update active class in playlist list
        if (videoPlaylist) {
            const items = videoPlaylist.querySelectorAll('.video-list-item');
            items.forEach((item, itemIdx) => {
                if (itemIdx === idx) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        const video = activeVideos[idx];
        if (!video) return;

        // Reset players to prevent playing background audio
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.src = '';
            videoPlayer.classList.remove('active');
        }
        
        if (videoIframe) {
            videoIframe.src = '';
            videoIframe.classList.remove('active');
        }

        // Update Metadata
        if (videoTitle) videoTitle.textContent = video.title;
        if (videoDesc) videoDesc.textContent = video.desc || '';
        
        // Update tags
        if (videoTags) {
            videoTags.innerHTML = '';
            if (Array.isArray(video.tags)) {
                video.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'tag';
                    span.textContent = tag;
                    videoTags.appendChild(span);
                });
            }
        }

        // Setup Aspect Ratio and Sizing Variables on player wrapper
        if (videoPlayerWrapper) {
            const currentAspect = video.aspect || '16/9';
            videoPlayerWrapper.style.setProperty('--current-aspect', currentAspect);
            videoPlayerWrapper.style.setProperty('--player-max-width', `min(100%, calc(55vh * ${currentAspect}))`);
        }

        // Update ambient glow color dynamically
        if (videoAmbient) {
            const currentAspect = video.aspect || '16/9';
            let glowColor = video.glowColor;
            if (!glowColor) {
                // Predict beautiful fallback colors
                if (currentAspect === '9/16') glowColor = 'rgba(229, 186, 216, 0.22)'; // Soft magenta glow
                else if (currentAspect === '21/9') glowColor = 'rgba(162, 198, 220, 0.22)'; // Slate blue/teal glow
                else if (currentAspect === '1/1') glowColor = 'rgba(194, 198, 220, 0.22)'; // Lavender purple glow
                else glowColor = 'rgba(173, 198, 255, 0.22)'; // Soft blue glow
            }
            videoAmbient.style.setProperty('--ambient-glow', glowColor);
        }

        // Load Source
        if (video.type === 'youtube') {
            if (videoIframe) {
                videoIframe.classList.add('active');
                // Check if URL has query params
                const separator = video.src.includes('?') ? '&' : '?';
                videoIframe.src = `${video.src}${separator}autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
            }
        } else {
            if (videoPlayer) {
                videoPlayer.classList.add('active');
                videoPlayer.src = video.src;
                videoPlayer.load();
                videoPlayer.play().catch(err => {
                    console.log('[Portfolio] Autoplay blocked by browser. User interaction needed.');
                });
            }
        }
    };

    const closeVideoShowcase = () => {
        // Halt media playing
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.src = '';
        }
        if (videoIframe) {
            videoIframe.src = '';
        }

        if (videoModal) {
            videoModal.classList.remove('active');
            videoModal.setAttribute('aria-hidden', 'true');
        }
        document.body.style.overflow = ''; // Restore page scrolling
    };

    // Wire up Close hooks for video modal
    if (videoModalClose) videoModalClose.addEventListener('click', closeVideoShowcase);
    if (videoModalBackdrop) videoModalBackdrop.addEventListener('click', closeVideoShowcase);

    // Keyboard Shortcuts inside Video Showcase
    document.addEventListener('keydown', (e) => {
        if (!videoModal || !videoModal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeVideoShowcase();
        } else if (e.key === 'ArrowRight') {
            // Next video
            const nextIdx = (activeVideoIndex + 1) % activeVideos.length;
            loadShowcaseVideo(nextIdx);
            // Scroll playlist item into view
            if (videoPlaylist) {
                const activeItem = videoPlaylist.querySelector(`.video-list-item[data-index="${nextIdx}"]`);
                if (activeItem) activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } else if (e.key === 'ArrowLeft') {
            // Previous video
            const prevIdx = (activeVideoIndex - 1 + activeVideos.length) % activeVideos.length;
            loadShowcaseVideo(prevIdx);
            // Scroll playlist item into view
            if (videoPlaylist) {
                const activeItem = videoPlaylist.querySelector(`.video-list-item[data-index="${prevIdx}"]`);
                if (activeItem) activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } else if (e.key === ' ' && activeVideos[activeVideoIndex]?.type === 'direct') {
            // Toggle play/pause direct video element
            e.preventDefault(); // Stop page scrolling from space
            if (videoPlayer) {
                if (videoPlayer.paused) {
                    videoPlayer.play().catch(() => {});
                } else {
                    videoPlayer.pause();
                }
            }
        }
    });

    // Attach click events to project cards using event delegation on projects-grid container
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projectsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (!card) return;
            if (card.classList.contains('coming-soon')) return; // Disable modal for coming soon
            const id = card.getAttribute('data-id');
            openModal(id);
        });
    }

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
