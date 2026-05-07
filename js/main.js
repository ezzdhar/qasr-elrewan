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

    const gap = 40;
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
    projectDots.forEach(dot => {
        dot.addEventListener('click', () => {
            projectsCurrentIndex = parseInt(dot.getAttribute('data-index'));
            updateProjectsSlider();
            clearInterval(projectsAutoSlide);
            startProjectsAutoSlide();
        });
    });

    let startX = 0;
    projectsCarousel.parentElement.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        clearInterval(projectsAutoSlide);
    });

    projectsCarousel.parentElement.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].pageX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) projectsCurrentIndex = Math.min(projectsCurrentIndex + 1, projectDots.length - 1);
            else projectsCurrentIndex = Math.max(projectsCurrentIndex - 1, 0);
        }
        updateProjectsSlider();
        startProjectsAutoSlide();
    });

    window.addEventListener('resize', updateProjectsSlider);
    startProjectsAutoSlide();
}