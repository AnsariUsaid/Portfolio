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