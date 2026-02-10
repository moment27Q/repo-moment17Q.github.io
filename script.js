// Sample projects data - Replace with your actual projects
const projects = [
    {
        id: 1,
        title: "Drop Game",
        subtitle: "Juego a medida del usuario",
        description: "Damos vida a tus ideas. Plataforma completa para estudios de producción audiovisual con gestión de proyectos y clientes.",
        category: "web",
        logo: "🎬",
        image: "imagenes proyectos/image.png"
    },
    {
        id: 2,
        title: "Labexam",
        subtitle: "Plataforma para automatizar examenes",
        description: "Tienda online con sistema de gestión de inventario, pagos integrados y panel administrativo completo.",
        category: "web",
        logo: "🛒",
        image: "imagenes proyectos/image2.png"
    },
    {
        id: 3,
        title: "Galeria estudiantil",
        subtitle: "Plataforma para la conmemoración de la promoción",
        description: "Sistema integral de gestión empresarial con módulos de recursos humanos, contabilidad y reportes avanzados.",
        category: "software",
        logo: "💼",
        image: "imagenes proyectos/image3.png"
    },
    {
        id: 4,
        title: "Tradiciones Perú",
        subtitle: "Paginas encargada de la administracion de asistencias de un club",
        description: "Plataforma de networking con funcionalidades de mensajería, videollamadas y colaboración en tiempo real.",
        category: "software",
        logo: "🌐",
        image: "imagenes proyectos/image4.png"
    }
];

// Portfolio items data
// Portfolio items data
const portfolioItems = [
    {
        id: 1,
        title: "E-commerce Pro",
        description: "Tienda online completa con pasarela de pagos y gestión de inventario.",
        category: "web",
        image: "paginasservicios/ecoomerce.png"
    },
    {
        id: 2,
        title: "Sistema ERP",
        description: "Software de planificación de recursos empresariales para optimizar procesos.",
        category: "software",
        image: "paginasservicios/erp.png"
    },
    {
        id: 3,
        title: "Galería Interactiva",
        description: "Plataforma web para exposición de arte y fotografía con visualización inmersiva.",
        category: "web",
        image: "paginasservicios/galeria.png"
    },
    {
        id: 4,
        title: "Gestión Corporativa",
        description: "Dashboard administrativo para control de personal y finanzas.",
        category: "software",
        image: "paginasservicios/gestion.png"
    },
    {
        id: 5,
        title: "App Delivery",
        description: "Aplicación móvil para reparto con seguimiento en tiempo real.",
        category: "mobile",
        image: "paginasservicios/image.png"
    },
    {
        id: 6,
        title: "Web Tradiciones",
        description: "Portal cultural con diseño temático y experiencia de usuario fluida.",
        category: "web",
        image: "paginasservicios/tradiiones.png"
    },
    {
        id: 7,
        title: "JJ Construcción",
        description: "Materiales de calidad, herramientas profesionales y los mejores precios para hacer realidad tus proyectos.",
        category: "web",
        image: "paginasservicios/jjconstruccion.png"
    },
    {
        id: 8,
        title: "Chiru",
        description: "Aplicaciones móviles Android y iOS",
        category: "mobile",
        image: "paginasservicios/chiru.jpeg"
    },
    {
        id: 9,
        title: "Style",
        description: "Diseño y estilo para tu web.",
        category: "web",
        image: "paginasservicios/style.png"
    }
];

// Carousel functionality
let currentCarouselIndex = 0;

function initCarousel() {
    const carousel3d = document.getElementById('carousel3d');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('carouselIndicators');

    // Check if carousel elements exist
    if (!carousel3d) {
        console.error('Carousel container not found');
        return;
    }

    console.log('Initializing carousel with', projects.length, 'projects');

    // Clear existing items to avoid duplicates
    carousel3d.innerHTML = '';
    if (indicators) {
        indicators.innerHTML = '';
    }

    // Create carousel items
    projects.forEach((project, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item-3d';
        item.dataset.index = index;

        // Set initial classes - will be updated by updateCarousel
        if (index === 0) {
            item.classList.add('active');
        }

        item.innerHTML = `
            <div class="project-screen">
                ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-screen-img">` : ''}
                <div class="project-overlay">
                    <div class="project-name">${project.title}</div>
                    <div class="project-description">${project.subtitle}</div>
                </div>
            </div>
        `;

        carousel3d.appendChild(item);

        // Create indicator
        if (indicators) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                currentCarouselIndex = index;
                updateCarousel();
                resetAutoPlay();
            });
            indicators.appendChild(indicator);
        }
    });

    // Initialize carousel positions immediately
    updateCarousel();

    // Also update after a short delay to ensure everything is rendered
    setTimeout(() => {
        updateCarousel();
    }, 300);

    // Remove existing listeners and add new ones
    if (prevBtn) {
        const newPrevBtn = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
        newPrevBtn.addEventListener('click', () => {
            currentCarouselIndex = (currentCarouselIndex - 1 + projects.length) % projects.length;
            updateCarousel();
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        const newNextBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        newNextBtn.addEventListener('click', () => {
            currentCarouselIndex = (currentCarouselIndex + 1) % projects.length;
            updateCarousel();
            resetAutoPlay();
        });
    }

    // Auto-play carousel every 10 seconds
    startAutoPlay();
}

let autoPlayInterval = null;

function startAutoPlay() {
    // Clear any existing interval
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }

    // Start new interval
    autoPlayInterval = setInterval(() => {
        currentCarouselIndex = (currentCarouselIndex + 1) % projects.length;
        updateCarousel();
    }, 10000); // 10 seconds
}

function resetAutoPlay() {
    startAutoPlay();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item-3d');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const totalItems = projects.length;

    if (items.length === 0) return;

    items.forEach((item, index) => {
        // Calculate wrapping distance
        let diff = (index - currentCarouselIndex) % totalItems;
        if (diff < -totalItems / 2) diff += totalItems;
        if (diff > totalItems / 2) diff -= totalItems;

        const absDiff = Math.abs(diff);

        // Reset styles
        item.classList.remove('active');
        item.style.visibility = 'visible';
        item.style.display = 'block';

        // Coverflow parameters
        const xOffset = 550; // Horizontal spacing
        const zOffset = -400; // Depth spacing
        const rotateAngle = 60; // Rotation angle
        const scale = 1;

        if (diff === 0) {
            // Active Item
            item.classList.add('active');
            item.style.transform = `translateX(0) translateZ(0) rotateY(0deg) scale(1)`;
            item.style.zIndex = 100;
            item.style.opacity = 1;
            item.style.filter = 'brightness(1)';
        } else {
            // Side Items
            const direction = diff > 0 ? 1 : -1;

            // Limit visible items to avoid clutter
            if (absDiff <= 2) {
                // Calculate position
                // We clamp absDiff to avoid extreme values if something goes wrong, though with 4 items it's fine
                const x = direction * (xOffset * 0.7 + (absDiff - 1) * (xOffset * 0.4));
                const z = zOffset * absDiff;
                const r = -direction * rotateAngle; // Left rotates + (face right), Right rotates - (face left)

                item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${r}deg) scale(${scale})`;
                item.style.zIndex = 100 - absDiff; // Lower z-index for further items
                item.style.opacity = absDiff === 1 ? 0.7 : 0.4;
                item.style.filter = `brightness(${1 - absDiff * 0.3})`;
            } else {
                // Hidden Items (behind)
                item.style.transform = `translateX(0) translateZ(-2000px) rotateY(0deg) scale(0)`;
                item.style.opacity = 0;
                item.style.zIndex = 0;
            }
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentCarouselIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Portfolio functionality
function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');

    // Clear existing items to avoid duplicates
    portfolioGrid.innerHTML = '';

    const filterButtons = document.querySelectorAll('.filter-btn');

    // Create portfolio items
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-card-image'; // New class for image cards
        portfolioItem.dataset.category = item.category;
        portfolioItem.style.animationDelay = `${index * 0.1}s`;

        portfolioItem.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.title}">
                <div class="card-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="card-tag">${getCategoryName(item.category)}</span>
                </div>
            </div>
        `;

        portfolioGrid.appendChild(portfolioItem);
    });

    // Scroll Animation Observer - wait for elements to be in DOM
    setTimeout(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const cards = document.querySelectorAll('.portfolio-card-image');
        cards.forEach(card => {
            observer.observe(card);
        });
    }, 100);
}

function getCategoryName(category) {
    const names = {
        'web': 'Página Web',
        'software': 'Software a Medida',
        'mobile': 'Aplicación Móvil'
    };
    return names[category] || category;
}

// Stats counter animation

// Stats counter animation
function initStats() {
    // Reset all stats to 0 first
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        stat.textContent = '0';
    });

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Page-specific initialization
// Page-specific initialization
function initPageFeatures() {
    // Check for elements to determine which features to initialize

    // Home Page Carousel
    if (document.getElementById('carousel3d')) {
        setTimeout(() => {
            initCarousel();
        }, 200);
    }

    // Portfolio Page
    if (document.getElementById('portfolioGrid')) {
        initPortfolio();
    }

    // Quote Form
    if (document.getElementById('quoteForm')) {
        initQuoteForm();
    }

    // Stats (Conocenos)
    if (document.querySelector('.stat-number')) {
        initStats();
    }
}

// Contact form handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            form.reset();
        });
    }
}

// Quote form handler
function initQuoteForm() {
    const form = document.getElementById('quoteForm');
    const budgetSlider = document.getElementById('budgetSlider');
    const budgetValue = document.getElementById('budgetValue');
    const styleButtons = document.querySelectorAll('.style-btn');

    // Budget slider handler
    if (budgetSlider && budgetValue) {
        // Set initial value
        const initialValue = parseInt(budgetSlider.value);
        budgetValue.textContent = initialValue.toLocaleString('es-PE');

        // Update on change
        budgetSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            budgetValue.textContent = value.toLocaleString('es-PE');

            // Update slider track gradient
            const percentage = ((value - budgetSlider.min) / (budgetSlider.max - budgetSlider.min)) * 100;
            budgetSlider.style.setProperty('--slider-progress', percentage + '%');
        });
    }

    // Style buttons handler
    styleButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            styleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Form submit handler
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const selectedStyle = document.querySelector('.style-btn.active')?.dataset.style || '';
            const budget = budgetSlider?.value || '';

            // Get all form values
            const nombre = form.querySelector('input[type="text"]').value;
            const telefono = form.querySelector('input[type="tel"]').value;
            const tiempoEntrega = form.querySelectorAll('select')[0].selectedOptions[0]?.text || '';
            const tipoServicio = form.querySelectorAll('select')[1].selectedOptions[0]?.text || '';
            const nivelProyecto = form.querySelectorAll('select')[2].selectedOptions[0]?.text || '';
            const descripcion = form.querySelector('textarea').value;

            // Save to localStorage
            const cotizacion = {
                id: Date.now(), // Unique ID based on timestamp
                nombre: nombre,
                telefono: telefono,
                tiempoEntrega: tiempoEntrega,
                tipoServicio: tipoServicio,
                estilo: selectedStyle || 'No especificado',
                nivelProyecto: nivelProyecto,
                presupuesto: budget,
                descripcion: descripcion,
                date: new Date().toISOString()
            };

            // Get existing messages
            const existingMessages = JSON.parse(localStorage.getItem('cotizaciones') || '[]');
            existingMessages.push(cotizacion);
            localStorage.setItem('cotizaciones', JSON.stringify(existingMessages));

            alert('¡Gracias por tu cotización! Hemos recibido tu información y nos pondremos en contacto contigo pronto.');
            form.reset();

            // Reset style buttons
            styleButtons.forEach(b => b.classList.remove('active'));
            if (styleButtons[0]) styleButtons[0].classList.add('active');

            // Reset slider
            if (budgetSlider) {
                budgetSlider.value = 2000;
                if (budgetValue) budgetValue.textContent = '2,000';
            }
        });
    }
}

// Chat widget handler
function initChatWidget() {
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget) {
        chatWidget.addEventListener('click', () => {
            window.location.href = 'cotizacion.html';
        });
    }
}

// Cursor glow effect
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');

    if (!cursorGlow) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });

    // Smooth animation loop
    function animate() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPageFeatures();
    initContactForm();
    initChatWidget();
    initCursorGlow();
});

// Add scroll effect to navbar and parallax to background
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const gridBackground = document.querySelector('.grid-background');
    const animatedParticles = document.querySelector('.animated-particles');

    // Navbar effect
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }

    // Parallax effect for grid background
    if (gridBackground) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 1.8;
        gridBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }

    // Parallax effect for particles
    if (animatedParticles) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 1.2;
        animatedParticles.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Icon Rain Effect
function initIconRain() {
    const container = document.getElementById('iconRainContainer');
    if (!container) return;

    const icons = [
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg', // iOS
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    ];

    function createIcon() {
        const icon = document.createElement('div');
        icon.classList.add('falling-icon');

        const img = document.createElement('img');
        img.src = icons[Math.floor(Math.random() * icons.length)];
        icon.appendChild(img);

        // Randomize properties
        const size = Math.random() * 30 + 20; // 20px to 50px
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const opacity = Math.random() * 0.3 + 0.1;

        icon.style.width = `${size}px`;
        icon.style.height = `${size}px`;
        icon.style.left = `${left}%`;
        icon.style.animationDuration = `${duration}s`;
        icon.style.opacity = opacity;

        container.appendChild(icon);

        // Cleanup after animation
        setTimeout(() => {
            icon.remove();
        }, duration * 1000);
    }

    // Spawn icons periodically
    setInterval(createIcon, 300); // New icon every 300ms
}

document.addEventListener('DOMContentLoaded', initIconRain);

// Pricing Page Interaction
document.addEventListener('DOMContentLoaded', () => {
    const pricingCards = document.querySelectorAll('.price-card-glass');
    const pricingContainer = document.querySelector('.prices-grid-premium');

    // Only run if we are on the pricing page
    if (!pricingContainer || pricingCards.length === 0) return;

    // The middle card (index 1) is usually the default featured one
    let defaultFeatured = document.querySelector('.featured-glass');
    let selectedCard = defaultFeatured;

    // Fallback if no class found
    if (!defaultFeatured && pricingCards.length > 1) {
        defaultFeatured = pricingCards[1];
        selectedCard = defaultFeatured;
    }

    // Click to select a plan
    pricingCards.forEach(card => {
        card.style.cursor = 'pointer';

        // Click handler - select the plan (only on card, not on button)
        card.addEventListener('click', function (e) {
            // Don't trigger if clicking the button - let button handle its own click
            if (e.target.closest('.cta-btn-premium')) {
                return; // Let the button's onclick handle it
            }

            // Remove featured class from ALL cards
            pricingCards.forEach(c => {
                c.classList.remove('featured-glass');
            });

            // Add to clicked card
            this.classList.add('featured-glass');
            selectedCard = this;
        });

        // Ensure buttons are clickable
        const buttons = card.querySelectorAll('.cta-btn-premium');
        buttons.forEach(button => {
            button.style.pointerEvents = 'auto';
            button.style.position = 'relative';
            button.style.zIndex = '100';
        });
    });
});
