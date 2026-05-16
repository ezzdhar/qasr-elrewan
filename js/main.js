gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from(".hero-content h1", {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.5
});

gsap.from(".hero-content p", {
    duration: 1.2,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 0.8
});

gsap.from(".cta-btn", {
    duration: 1,
    y: 20,
    opacity: 0,
    ease: "power3.out",
    delay: 1.1,
    onComplete: () => {
        gsap.set(".cta-btn", { clearProps: "opacity, visibility" });
    }
});

// Section Animations
const animateUp = document.querySelectorAll('.animate-up');
animateUp.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

const animateLeft = document.querySelectorAll('.animate-left');
animateLeft.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });
});

const animateRight = document.querySelectorAll('.animate-right');
animateRight.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });
});

// Quality Section Animations
const qualityItems = document.querySelectorAll('.quality-item');
gsap.fromTo(".quality-header > *",
    { y: 30, opacity: 0 },
    {
        scrollTrigger: {
            trigger: ".quality-header",
            start: "top 90%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    }
);

gsap.fromTo(qualityItems,
    { y: 60, opacity: 0 },
    {
        scrollTrigger: {
            trigger: ".quality-grid",
            start: "top 90%",
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out"
    }
);

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// Initialize Swiper
const swiper = new Swiper('.productsSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 50,
        }
    }
});

// Expertise Section Animations
gsap.from(".animate-slide-left", {
    scrollTrigger: {
        trigger: ".expertise",
        start: "top 80%",
    },
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
});

gsap.from(".animate-slide-right", {
    scrollTrigger: {
        trigger: ".expertise",
        start: "top 80%",
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
});

const aboutSlider = document.querySelector('.expertise-slider');
const aboutDots = document.querySelectorAll('.expertise-dot');
let aboutCurrent = 0;
let aboutAutoSlide;

function updateAboutSlider() {
    if (!aboutSlider) return;
    const moveDistance = aboutCurrent * 100;
    // In RTL, 100% moves slider visually to the right
    aboutSlider.style.transform = `translateX(${moveDistance}%)`;

    aboutDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === aboutCurrent);
    });
}

function nextAboutSlide() {
    const slides = document.querySelectorAll('.expertise-slide');
    if (slides.length === 0) return;
    aboutCurrent = (aboutCurrent + 1) % slides.length;
    updateAboutSlider();
}

if (aboutSlider && aboutDots.length > 0) {
    aboutDots.forEach(dot => {
        dot.addEventListener('click', () => {
            aboutCurrent = parseInt(dot.getAttribute('data-index'));
            updateAboutSlider();
            resetAboutAutoSlide();
        });
    });
}

function startAboutAutoSlide() {
    if (!aboutSlider) return;
    aboutAutoSlide = setInterval(nextAboutSlide, 2500);
}

function resetAboutAutoSlide() {
    clearInterval(aboutAutoSlide);
    startAboutAutoSlide();
}

window.addEventListener('load', () => {
    if (aboutSlider) {
        startAboutAutoSlide();
    }
});

// Projects Slider Logic
const projectsCarousel = document.getElementById('projectsCarousel');
const projectDots = document.querySelectorAll('.projects-slider-section .p-dot');
let projectsCurrentIndex = 0;
let projectsAutoSlide;

function updateProjectsSlider() {
    if (!projectsCarousel) return;
    const slides = document.querySelectorAll('.project-slide');
    if (slides.length === 0) return;

    const gap = 30;
    const slideWidth = slides[0].offsetWidth;
    const containerWidth = projectsCarousel.parentElement.offsetWidth;

    // Centering logic for wider slide
    const centerOffset = (containerWidth / 2) - (slideWidth / 2);
    const slideOffset = projectsCurrentIndex * (slideWidth + gap);

    // Using a more robust offset calculation
    const finalTranslate = slideOffset - centerOffset;

    projectsCarousel.style.transform = `translateX(${finalTranslate}px)`;

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === projectsCurrentIndex);
    });

    projectDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === projectsCurrentIndex);
    });
}

function nextProjectSlide() {
    const slides = document.querySelectorAll('.project-slide');
    if (slides.length === 0) return;
    projectsCurrentIndex = (projectsCurrentIndex + 1) % slides.length;
    updateProjectsSlider();
}

function startProjectsAutoSlide() {
    projectsAutoSlide = setInterval(nextProjectSlide, 3500);
}

if (projectsCarousel) {
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let dragStartTime = 0;

    const outer = projectsCarousel.parentElement;

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    }

    function dragStart(e) {
        isDragging = true;
        startX = getPositionX(e);
        dragStartTime = Date.now();
        clearInterval(projectsAutoSlide);
        projectsCarousel.style.transition = 'none';

        const slides = document.querySelectorAll('.project-slide');
        const gap = 30; // Matches CSS gap
        const slideWidth = slides[0].offsetWidth;
        const containerWidth = outer.offsetWidth;
        const centerOffset = (containerWidth / 2) - (slideWidth / 2);
        prevTranslate = projectsCurrentIndex * (slideWidth + gap) - centerOffset;

        if (e.type === 'mousedown') e.preventDefault();
    }

    function dragAction(e) {
        if (!isDragging) return;
        const currentX = getPositionX(e);
        const diff = startX - currentX;
        currentTranslate = prevTranslate + diff;
        projectsCarousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;

        const slides = document.querySelectorAll('.project-slide');
        const gap = 30;
        const slideWidth = slides[0].offsetWidth;
        const dragDiff = currentTranslate - prevTranslate;
        const dragTime = Date.now() - dragStartTime;

        // Snap to slide based on drag distance or velocity
        if (Math.abs(dragDiff) > slideWidth / 4 || (dragTime < 300 && Math.abs(dragDiff) > 20)) {
            if (dragDiff > 0) {
                projectsCurrentIndex = Math.min(projectsCurrentIndex + 1, slides.length - 1);
            } else {
                projectsCurrentIndex = Math.max(projectsCurrentIndex - 1, 0);
            }
        }

        projectsCarousel.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
        updateProjectsSlider();
        startProjectsAutoSlide();
    }

    outer.addEventListener('mousedown', dragStart);
    outer.addEventListener('touchstart', dragStart, { passive: true });

    window.addEventListener('mousemove', dragAction);
    window.addEventListener('touchmove', dragAction, { passive: false });

    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchend', dragEnd);

    projectDots.forEach(dot => {
        dot.addEventListener('click', () => {
            projectsCurrentIndex = parseInt(dot.getAttribute('data-index'));
            updateProjectsSlider();
            clearInterval(projectsAutoSlide);
            startProjectsAutoSlide();
        });
    });

    window.addEventListener('resize', updateProjectsSlider);
    startProjectsAutoSlide();
}

// About Page Specific Animations
if (document.querySelector('.about-hero-new')) {
    gsap.from(".about-reveal-title", {
        duration: 1.5,
        y: 60,
        opacity: 0,
        ease: "power4.out",
        delay: 0.3
    });

    gsap.from(".about-reveal-desc", {
        duration: 1.5,
        y: 40,
        opacity: 0,
        ease: "power4.out",
        delay: 0.6
    });
}

if (document.querySelector('.about-features-new')) {
    gsap.from(".about-feature-item", {
        scrollTrigger: {
            trigger: ".about-features-new",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
}

if (document.querySelector('.brand-banner-section')) {
    gsap.from(".brand-banner-full", {
        scrollTrigger: {
            trigger: ".brand-banner-section",
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power2.out"
    });
}

// Services Showcase Animations
if (document.querySelectorAll('.service-row').length > 0) {
    document.querySelectorAll('.service-row').forEach((row, index) => {
        const isReverse = row.classList.contains('reverse');
        const card = row.querySelector('.service-card-wrapper');
        const textBg = row.querySelector('.service-text-bg');

        gsap.from(card, {
            scrollTrigger: {
                trigger: row,
                start: "top 80%",
            },
            x: isReverse ? -100 : 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        gsap.from(textBg, {
            scrollTrigger: {
                trigger: row,
                start: "top 80%",
            },
            x: isReverse ? 100 : -100,
            opacity: 0,
            duration: 1.5,
            delay: 0.2,
            ease: "power3.out"
        });
    });
}
// Bedroom Gallery Lightbox
const viewBtns = document.querySelectorAll(".view-btn");
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");
const nextBtn = document.getElementById("lightbox-next");
const prevBtn = document.getElementById("lightbox-prev");

function normalizePageTitle(text) {
    return text ? text.replace(/\u0640/g, '').trim() : '';
}

function pageTitleIncludes(term) {
    const titleEl = document.querySelector('h1');
    return titleEl ? normalizePageTitle(titleEl.textContent).includes(term) : false;
}

if (viewBtns.length > 0 && lightbox && pageTitleIncludes('غرف')) {
    let currentSetIndex = 0;
    let currentImageIndex = 0;
    const gallerySets = [
        [
            "images/bed11.png",
            "images/bed12.png",
            "images/bed13.png",
            "images/bed14.png",
            "images/bed15.png",
            "images/bed16.png"
        ],
        [
            "images/bed21.png",
            "images/bed22.png",
            "images/bed23.png",
            "images/bed24.png",
            "images/bed25.png",
            "images/bed26.png"
        ],
        [
            "images/bed32.png",
            "images/bed33.png",
            "images/bed34.png",
            "images/bed35.png",
            "images/bed36.png",
            "images/bed37.png",
            "images/bed38.png"
        ],
        [
            "images/bed31.png",
            "images/bed42.png",
            "images/bed43.png",
            "images/bed45.png"
        ],
        [
            "images/bed51.png",
            "images/bed52.png",
            "images/bed53.png",
            "images/bed54.png",
            "images/bed55.png",
            "images/bed56.png"
        ],
        [
            "images/bed61.png",
            "images/bed62.png",
            "images/bed63.png",
            "images/bed64.png",
            "images/bed65.png",
            "images/bed66.png"
        ],

    ];

    function showCurrentImage() {
        lightboxImg.src = gallerySets[currentSetIndex][currentImageIndex];
    }

    function openLightbox(index) {
        currentSetIndex = index;
        currentImageIndex = 0;
        showCurrentImage();
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function nextImage() {
        const setLength = gallerySets[currentSetIndex].length;
        currentImageIndex = (currentImageIndex + 1) % setLength;
        showCurrentImage();
    }

    function prevImage() {
        const setLength = gallerySets[currentSetIndex].length;
        currentImageIndex = (currentImageIndex - 1 + setLength) % setLength;
        showCurrentImage();
    }

    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);

    // Close on clicking outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.classList.contains("lightbox-content")) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") prevImage();
        if (e.key === "ArrowLeft") nextImage();
    });
}


// Antari Gallery Lightbox
if (document.querySelector('.bedroom-gallery') && pageTitleIncludes('الأنتري')) {
    const antariViewBtns = document.querySelectorAll(".view-btn");
    const antariLightbox = document.getElementById("gallery-lightbox");
    const antariLightboxImg = document.getElementById("lightbox-img");
    const antariCloseBtn = document.getElementById("lightbox-close");
    const antariNextBtn = document.getElementById("lightbox-next");
    const antariPrevBtn = document.getElementById("lightbox-prev");

    let antariCurrentSetIndex = 0;
    let antariCurrentImageIndex = 0;
    const antariGallerySets = [
        [
            "images/ant1.png",
            "images/ant2.png",
            "images/ant3.png",
            "images/ant4.png",
            "images/ant5.png",
            "images/ant6.png"
        
        ],
        [
            "images/ant21.png",
            "images/ant22.png",
            "images/ant23.png",
            "images/ant24.png",
            "images/ant25.png",
            "images/ant26.png"
           
        ],
        [
            "images/ant31.png",
            "images/ant32.png",
            "images/ant33.png",
            "images/ant34.png",
            "images/ant35.png",
            "images/ant36.png"
        ],
      
    
    ];

    function antariShowCurrentImage() {
        antariLightboxImg.src = antariGallerySets[antariCurrentSetIndex][antariCurrentImageIndex];
    }

    function antariOpenLightbox(index) {
        antariCurrentSetIndex = index;
        antariCurrentImageIndex = 0;
        antariShowCurrentImage();
        antariLightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function antariCloseLightbox() {
        antariLightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function antariNextImage() {
        const setLength = antariGallerySets[antariCurrentSetIndex].length;
        antariCurrentImageIndex = (antariCurrentImageIndex + 1) % setLength;
        antariShowCurrentImage();
    }

    function antariPrevImage() {
        const setLength = antariGallerySets[antariCurrentSetIndex].length;
        antariCurrentImageIndex = (antariCurrentImageIndex - 1 + setLength) % setLength;
        antariShowCurrentImage();
    }

    const antariGalleryItems = document.querySelectorAll(".gallery-item");
    antariGalleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            antariOpenLightbox(index);
        });
    });

    antariCloseBtn.addEventListener("click", antariCloseLightbox);
    antariNextBtn.addEventListener("click", antariNextImage);
    antariPrevBtn.addEventListener("click", antariPrevImage);

    antariLightbox.addEventListener("click", (e) => {
        if (e.target === antariLightbox || e.target.classList.contains("lightbox-content")) {
            antariCloseLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!antariLightbox.classList.contains("active")) return;
        if (e.key === "Escape") antariCloseLightbox();
        if (e.key === "ArrowRight") antariPrevImage();
        if (e.key === "ArrowLeft") antariNextImage();
    });
}


// Sofra Gallery Lightbox
if (document.querySelector('.bedroom-gallery') && pageTitleIncludes('السفرة')) {
    const sofraViewBtns = document.querySelectorAll(".view-btn");
    const sofraLightbox = document.getElementById("gallery-lightbox");
    const sofraLightboxImg = document.getElementById("lightbox-img");
    const sofraCloseBtn = document.getElementById("lightbox-close");
    const sofraNextBtn = document.getElementById("lightbox-next");
    const sofraPrevBtn = document.getElementById("lightbox-prev");

    let sofraCurrentSetIndex = 0;
    let sofraCurrentImageIndex = 0;
    const sofraGallerySets = [
        [
            "images/sof1.png",
            "images/sof2.png",
            "images/sof3.png",
            "images/sof4.png",
            "images/sof5.png",
            "images/sof6.png",
            "images/sof7.png"
        ],
        [
            "images/sof21.png",
            "images/sof22.png",
            "images/sof23.png",
            "images/sof24.png",
            "images/sof25.png"
        ],
        [
            "images/sof31.png",
            "images/sof32.png",
            "images/sof33.png",
            "images/sof34.png",
            "images/sof35.png"
        ],
        [
            "images/sof41.png",
            "images/sof42.png",
            "images/sof43.png",
            "images/sof44.png",
            "images/sof45.png",
            "images/sof46.png"
        ],
        [
            "images/sof51.png",
            "images/sof52.png",
            "images/sof53.png",
            "images/sof54.png",
            "images/sof55.png",
            "images/sof56.png"
        ],
        [
            "images/sof61.png",
            "images/sof62.png",
            "images/sof63.png",
            "images/sof64.png",
            "images/sof65.png",
            "images/sof66.png"
        ],
       
    ];

    function sofraShowCurrentImage() {
        sofraLightboxImg.src = sofraGallerySets[sofraCurrentSetIndex][sofraCurrentImageIndex];
    }

    function sofraOpenLightbox(index) {
        sofraCurrentSetIndex = index;
        sofraCurrentImageIndex = 0;
        sofraShowCurrentImage();
        sofraLightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function sofraCloseLightbox() {
        sofraLightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function sofraNextImage() {
        const setLength = sofraGallerySets[sofraCurrentSetIndex].length;
        sofraCurrentImageIndex = (sofraCurrentImageIndex + 1) % setLength;
        sofraShowCurrentImage();
    }

    function sofraPrevImage() {
        const setLength = sofraGallerySets[sofraCurrentSetIndex].length;
        sofraCurrentImageIndex = (sofraCurrentImageIndex - 1 + setLength) % setLength;
        sofraShowCurrentImage();
    }

    const sofraGalleryItems = document.querySelectorAll(".gallery-item");
    sofraGalleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            sofraOpenLightbox(index);
        });
    });

    sofraCloseBtn.addEventListener("click", sofraCloseLightbox);
    sofraNextBtn.addEventListener("click", sofraNextImage);
    sofraPrevBtn.addEventListener("click", sofraPrevImage);

    sofraLightbox.addEventListener("click", (e) => {
        if (e.target === sofraLightbox || e.target.classList.contains("lightbox-content")) {
            sofraCloseLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!sofraLightbox.classList.contains("active")) return;
        if (e.key === "Escape") sofraCloseLightbox();
        if (e.key === "ArrowRight") sofraPrevImage();
        if (e.key === "ArrowLeft") sofraNextImage();
    });
}


// Salon Gallery Lightbox
if (document.body.dataset.gallery === 'salon' || pageTitleIncludes('الصالون')) {
    const salonViewBtns = document.querySelectorAll(".view-btn");
    const salonLightbox = document.getElementById("gallery-lightbox");
    const salonLightboxImg = document.getElementById("lightbox-img");
    const salonCloseBtn = document.getElementById("lightbox-close");
    const salonNextBtn = document.getElementById("lightbox-next");
    const salonPrevBtn = document.getElementById("lightbox-prev");

    let salonCurrentSetIndex = 0;
    let salonCurrentImageIndex = 0;
    const salonGallerySets = [
        [
            "images/sal1.png",
            "images/sal2.png",
            "images/sal3.png",
            "images/sal4.png",
            "images/sal5.png",
            "images/sal6.png",
            "images/sal7.png"
        ],
        [
            "images/sal25.png",
            "images/sal23.png",
            "images/sal24.png",
            "images/sal21.png",
            "images/sal22.png",
            "images/sal26.png"
        ],
        [
            "images/sal31.png",
            "images/sal32.png",
            "images/sal33.png",
            "images/sal34.png",
            "images/sal35.png",
            "images/sal36.png"
        ],
       
    ];

    function salonShowCurrentImage() {
        salonLightboxImg.src = salonGallerySets[salonCurrentSetIndex][salonCurrentImageIndex];
    }

    function salonOpenLightbox(index) {
        salonCurrentSetIndex = index;
        salonCurrentImageIndex = 0;
        salonShowCurrentImage();
        salonLightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function salonCloseLightbox() {
        salonLightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function salonNextImage() {
        const setLength = salonGallerySets[salonCurrentSetIndex].length;
        salonCurrentImageIndex = (salonCurrentImageIndex + 1) % setLength;
        salonShowCurrentImage();
    }

    function salonPrevImage() {
        const setLength = salonGallerySets[salonCurrentSetIndex].length;
        salonCurrentImageIndex = (salonCurrentImageIndex - 1 + setLength) % setLength;
        salonShowCurrentImage();
    }

    const salonGalleryItems = document.querySelectorAll(".gallery-item");
    salonGalleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            salonOpenLightbox(index);
        });
    });

    salonCloseBtn.addEventListener("click", salonCloseLightbox);
    salonNextBtn.addEventListener("click", salonNextImage);
    salonPrevBtn.addEventListener("click", salonPrevImage);

    salonLightbox.addEventListener("click", (e) => {
        if (e.target === salonLightbox || e.target.classList.contains("lightbox-content")) {
            salonCloseLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!salonLightbox.classList.contains("active")) return;
        if (e.key === "Escape") salonCloseLightbox();
        if (e.key === "ArrowRight") salonPrevImage();
        if (e.key === "ArrowLeft") salonNextImage();
    });
}


// Rokna Gallery Lightbox
if (document.body.dataset.gallery === 'rokna' || pageTitleIncludes('الركنة')) {
    const roknaViewBtns = document.querySelectorAll(".view-btn");
    const roknaLightbox = document.getElementById("gallery-lightbox");
    const roknaLightboxImg = document.getElementById("lightbox-img");
    const roknaCloseBtn = document.getElementById("lightbox-close");
    const roknaNextBtn = document.getElementById("lightbox-next");
    const roknaPrevBtn = document.getElementById("lightbox-prev");

    let roknaCurrentSetIndex = 0;
    let roknaCurrentImageIndex = 0;
    const roknaGallerySets = [
        [
            "images/rok1.png",
            "images/rok2.png",
            "images/rok3.png",
            "images/rok4.png",
            "images/rok5.png",
            "images/rok6.png"
        ],
        [
            "images/rok21.png",
            "images/rok22.png",
            "images/rok23.png",
            "images/rok25.png",
            "images/rok26.png",
            "images/rok24.png"
        ],
        [
            "images/rok31.png",
            "images/rok32.png",
            "images/rok33.png",
            "images/rok35.png",
            "images/rok34.png"
        ],
       
    ];

    function roknaShowCurrentImage() {
        roknaLightboxImg.src = roknaGallerySets[roknaCurrentSetIndex][roknaCurrentImageIndex];
    }

    function roknaOpenLightbox(index) {
        roknaCurrentSetIndex = index;
        roknaCurrentImageIndex = 0;
        roknaShowCurrentImage();
        roknaLightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function roknaCloseLightbox() {
        roknaLightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function roknaNextImage() {
        const setLength = roknaGallerySets[roknaCurrentSetIndex].length;
        roknaCurrentImageIndex = (roknaCurrentImageIndex + 1) % setLength;
        roknaShowCurrentImage();
    }

    function roknaPrevImage() {
        const setLength = roknaGallerySets[roknaCurrentSetIndex].length;
        roknaCurrentImageIndex = (roknaCurrentImageIndex - 1 + setLength) % setLength;
        roknaShowCurrentImage();
    }

    const roknaGalleryItems = document.querySelectorAll(".gallery-item");
    roknaGalleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            roknaOpenLightbox(index);
        });
    });

    roknaCloseBtn.addEventListener("click", roknaCloseLightbox);
    roknaNextBtn.addEventListener("click", roknaNextImage);
    roknaPrevBtn.addEventListener("click", roknaPrevImage);

    roknaLightbox.addEventListener("click", (e) => {
        if (e.target === roknaLightbox || e.target.classList.contains("lightbox-content")) {
            roknaCloseLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!roknaLightbox.classList.contains("active")) return;
        if (e.key === "Escape") roknaCloseLightbox();
        if (e.key === "ArrowRight") roknaPrevImage();
        if (e.key === "ArrowLeft") roknaNextImage();
    });
}


// Enhanced GSAP Animation for Gallery
if (document.querySelector(".bedroom-gallery")) {
    gsap.from(".gallery-item", {
        scrollTrigger: {
            trigger: ".bedroom-gallery",
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
    });
}

// =============================================
// PSS Swiper — Projects Slider Section
// =============================================
if (document.querySelector('.pssSwiper')) {
    const pssSwiper = new Swiper('.pssSwiper', {
        slidesPerView: 1.3,
        centeredSlides: true,
        spaceBetween: 20,
        loop: true,
        speed: 600,
        grabCursor: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.pss-pagination',
            clickable: true,
        },
        breakpoints: {
            600: {
                slidesPerView: 1.5,
                spaceBetween: 24,
            },
            900: {
                slidesPerView: 1.8,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 2.2,
                spaceBetween: 36,
            }
        }
    });

    gsap.from(".pss-header > *", {
        scrollTrigger: { trigger: ".projects-slider-section", start: "top 85%" },
        y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
    });
}




// Image Loading Indicator Logic
function initImageLoading() {
    // 1. Image Containers Loading State (Gallery, Products, Services)
    const containers = document.querySelectorAll('.gallery-item, .product-img, .service-card-img');
    containers.forEach(container => {
        const img = container.querySelector('img');
        if (img) {
            if (img.complete) {
                container.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    container.classList.add('loaded');
                });
                img.addEventListener('error', () => {
                    // Optional: handle error state if needed
                });
            }
        }
    });

    // 2. Lightbox Loading State
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxContent = document.querySelector('.lightbox-content');

    if (lightbox && lightboxImg && lightboxContent) {
        // Inject loader if not exists
        if (!document.querySelector('.lightbox-loader')) {
            const loader = document.createElement('div');
            loader.className = 'lightbox-loader';
            lightboxContent.appendChild(loader);
        }

        // Observer for lightbox activity
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (lightbox.classList.contains('active')) {
                        handleLightboxLoad();
                    }
                }
            });
        });

        observer.observe(lightbox, { attributes: true });

        // Function to handle image source change
        function handleLightboxLoad() {
            if (!lightboxImg.src || lightboxImg.src === window.location.href) return;
            
            lightbox.classList.add('loading');
            
            // If image is already cached
            if (lightboxImg.complete) {
                lightbox.classList.remove('loading');
            } else {
                lightboxImg.onload = () => {
                    lightbox.classList.remove('loading');
                };
            }
        }

        // Intercept src changes (since the gallery logic changes src directly)
        const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
        Object.defineProperty(lightboxImg, 'src', {
            set: function(val) {
                lightbox.classList.add('loading');
                originalSrcDescriptor.set.call(this, val);
            },
            get: function() {
                return originalSrcDescriptor.get.call(this);
            }
        });
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initImageLoading);
