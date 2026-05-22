const scriptURL = 'https://script.google.com/macros/s/AKfycbzzwRy7mYN7C9hf4HdxpyLc7Wi2gLySU1mNW-nV7eDk09oYI0LRD3FBbGX3LXu1rELl4w/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "<span style='color: #4CAF50;'><i class='fas fa-check-circle'></i> Message sent successfully!</span>";
            setTimeout(function(){ 
                msg.innerHTML = "";
            }, 5000);
            form.reset();
            
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            msg.innerHTML = "<span style='color: #f44336;'><i class='fas fa-exclamation-circle'></i> Error sending message. Please try again!</span>";
            console.error('Error!', error.message);
            
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
});

window.addEventListener('scroll', function() {
    const scrollBar = document.getElementById('scrollBar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollBar.style.width = progress + '%';
    
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const typedTextElement = document.querySelector('.typed-text');
    const textToType = typedTextElement.innerText;
    typedTextElement.innerText = '';
    
    let i = 0;
    function typeWriter() {
        if (i < textToType.length) {
            typedTextElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 800);
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

window.addEventListener('load', function() {
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    const elementsToReveal = [
        '.section-title', 
        '.about-content', 
        '.skills-container',
        '.timeline-item',
        '.project-card',
        '.contact-info',
        '.contact-form'
    ];
    
    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal();
});

// Card Flip Functionality
function flipCard(card) {
    // Prevent flip when clicking on links
    if (event.target.tagName === 'A' || event.target.closest('a')) {
        return;
    }
    
    card.classList.toggle('flipped');
}

// Projects Slider - Infinite Circular
let currentSlide = 0;
let cardsToShow = 3;
let totalSlides = 0;
let actualTotalSlides = 0;
let isTransitioning = false;
let slider = null;
let clonedCards = 0;

function getCardsToShow() {
    if (window.innerWidth <= 576) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 2;
    } else {
        return 3;
    }
}

function createInfiniteSlider() {
    slider = document.querySelector('.projects-slider');
    const cards = Array.from(document.querySelectorAll('.project-card'));
    actualTotalSlides = cards.length;
    
    // Clone first few cards and append to end for seamless loop
    const cardsToClone = Math.min(cardsToShow, actualTotalSlides);
    clonedCards = cardsToClone;
    
    for (let i = 0; i < cardsToClone; i++) {
        const clone = cards[i].cloneNode(true);
        clone.classList.add('cloned');
        slider.appendChild(clone);
    }
    
    totalSlides = actualTotalSlides + clonedCards;
}

function initSlider() {
    cardsToShow = getCardsToShow();
    
    const dotsContainer = document.querySelector('.slider-dots');
    dotsContainer.innerHTML = '';
    
    // Create dots only for actual slides
    for (let i = 0; i < actualTotalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function moveSlide(direction) {
    if (isTransitioning) return;
    
    currentSlide += direction;
    updateSlider(true);
}

function goToSlide(index) {
    if (isTransitioning) return;
    currentSlide = index;
    updateSlider(true);
}

function updateSlider(withTransition = true) {
    if (!slider) return;
    
    isTransitioning = withTransition;
    
    if (withTransition) {
        slider.style.transition = 'transform 0.5s ease-in-out';
    } else {
        slider.style.transition = 'none';
    }
    
    const cardWidth = slider.querySelector('.project-card').offsetWidth;
    const gap = 30;
    const offset = -(currentSlide * (cardWidth + gap));
    slider.style.transform = `translateX(${offset}px)`;
    
    // Update dots (only for actual slides)
    const dots = document.querySelectorAll('.dot');
    const activeDotIndex = currentSlide % actualTotalSlides;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
    });
    
    // Handle infinite loop
    if (withTransition) {
        setTimeout(() => {
            // If we're at or past the cloned cards
            if (currentSlide >= actualTotalSlides) {
                currentSlide = 0;
                updateSlider(false); // Jump to start without animation
            }
            // If we're before the first card
            else if (currentSlide < 0) {
                currentSlide = actualTotalSlides - 1;
                updateSlider(false); // Jump to end without animation
            }
            
            isTransitioning = false;
        }, 500);
    }
}

// Auto-play slider
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        createInfiniteSlider();
        initSlider();
        updateSlider(false);
        
        // Start autoplay if there are enough cards
        if (actualTotalSlides > cardsToShow) {
            startAutoPlay();
        }
        
        // Pause autoplay on hover
        const sliderContainer = document.querySelector('.projects-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoPlay);
            sliderContainer.addEventListener('mouseleave', () => {
                if (actualTotalSlides > cardsToShow) {
                    startAutoPlay();
                }
            });
        }
        
        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        });
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            if (actualTotalSlides > cardsToShow) {
                startAutoPlay();
            }
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                moveSlide(1);
            }
            if (touchEndX > touchStartX + 50) {
                moveSlide(-1);
            }
        }
        
        // Update on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                stopAutoPlay();
                
                // Remove old clones
                document.querySelectorAll('.project-card.cloned').forEach(clone => clone.remove());
                
                // Recreate infinite slider
                createInfiniteSlider();
                cardsToShow = getCardsToShow();
                currentSlide = 0;
                initSlider();
                updateSlider(false);
                
                if (actualTotalSlides > cardsToShow) {
                    startAutoPlay();
                }
            }, 250);
        });
    }
});