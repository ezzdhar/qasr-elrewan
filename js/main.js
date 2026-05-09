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

if (viewBtns.length > 0 && lightbox) {
    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll(".gallery-item img")).map(img => img.src);

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = images[currentImageIndex];
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex];
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex];
    }

    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener("click", closeLightbox);
    
    // Arabic layout: prev button is on the right, next is on the left
    // But intuitively, "next" is moving forward in array. 
    // Let us make nextBtn go forward and prevBtn go backward.
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
        if (e.key === "ArrowRight") prevImage(); // In RTL, right arrow might mean previous
        if (e.key === "ArrowLeft") nextImage();  // In RTL, left arrow might mean next
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

