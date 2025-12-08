document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    // Navbar scroll transparency effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    });

    // Toggle menu mobile with animation
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // Scroll fluido per link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetID);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    document.querySelectorAll(".carousel").forEach(carousel => {
        const track = carousel.querySelector(".carousel-track");
        const slides = Array.from(track.children);
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");
        let index = 0;

        // Imposta larghezza slide al resize
        function setSlideWidths() {
            const slideWidth = carousel.clientWidth;
            slides.forEach(slide => slide.style.width = `${slideWidth}px`);
            updateCarousel();
        }

        window.addEventListener("resize", setSlideWidths);
        setSlideWidths();

        // Aggiorna carosello
        function updateCarousel() {
            const slideWidth = slides[0].clientWidth;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        // Pulsanti
        nextBtn.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            updateCarousel();
        });

        prevBtn.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        // Swipe touch per mobile
        let startX = 0;
        let endX = 0;

        track.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
        });

        track.addEventListener("touchend", e => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (diff > 50) { // swipe sinistra
                index = (index + 1) % slides.length;
                updateCarousel();
            } else if (diff < -50) { // swipe destra
                index = (index - 1 + slides.length) % slides.length;
                updateCarousel();
            }
        });
    });

    // Funzione per nascondere banner
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    function hideBanner() {
        banner.classList.remove('show');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 600);
    }

    function showBanner() {
        banner.style.display = 'flex';
        setTimeout(() => {
            banner.classList.add('show');
        }, 50);
    }

    if (localStorage.getItem('cookieAccepted') !== 'true') {
        showBanner();
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        hideBanner();
    });
});