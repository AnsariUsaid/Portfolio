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

// Projects Slider
let currentSlide = 0;
let cardsToShow = 3;
const totalSlides = document.querySelectorAll('.project-card').length;
let maxSlide = totalSlides - cardsToShow;

function getCardsToShow() {
    if (window.innerWidth <= 576) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 2;
    } else {
        return 3;
    }
}

function updateCardsToShow() {
    cardsToShow = getCardsToShow();
    maxSlide = Math.max(0, totalSlides - cardsToShow);
    
    // Reset to valid position if needed
    if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
    }
}

function initSlider() {
    updateCardsToShow();
    const dotsContainer = document.querySelector('.slider-dots');
    dotsContainer.innerHTML = ''; // Clear existing dots
    
    // Create dots based on number of slides needed
    for (let i = 0; i <= maxSlide; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function moveSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = 0;
    } else if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
    }
    
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const slider = document.querySelector('.projects-slider');
    const cardWidth = slider.querySelector('.project-card').offsetWidth;
    const gap = 30; // gap between cards
    const offset = -(currentSlide * (cardWidth + gap));
    slider.style.transform = `translateX(${offset}px)`;
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Disable buttons at boundaries
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn && nextBtn) {
        prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
        prevBtn.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = currentSlide === maxSlide ? '0.3' : '1';
        nextBtn.style.cursor = currentSlide === maxSlide ? 'not-allowed' : 'pointer';
    }
}

// Auto-play slider
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        if (currentSlide < maxSlide) {
            moveSlide(1);
        } else {
            currentSlide = -1;
            moveSlide(1);
        }
    }, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Initialize slider and start autoplay
document.addEventListener('DOMContentLoaded', function() {
    if (totalSlides > 0) {
        initSlider();
        updateSlider(); // Initial button state
        
        // Only start autoplay if there are enough cards
        if (totalSlides > cardsToShow) {
            startAutoPlay();
        }
        
        // Pause autoplay on hover
        const sliderContainer = document.querySelector('.projects-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoPlay);
            sliderContainer.addEventListener('mouseleave', () => {
                if (totalSlides > cardsToShow) {
                    startAutoPlay();
                }
            });
        }
        
        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        const slider = document.querySelector('.projects-slider');
        
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        });
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            if (totalSlides > cardsToShow) {
                startAutoPlay();
            }
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                moveSlide(1); // Swipe left
            }
            if (touchEndX > touchStartX + 50) {
                moveSlide(-1); // Swipe right
            }
        }
        
        // Update on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                stopAutoPlay();
                updateCardsToShow();
                initSlider();
                updateSlider();
                if (totalSlides > cardsToShow) {
                    startAutoPlay();
                }
            }, 250);
        });
    }
});