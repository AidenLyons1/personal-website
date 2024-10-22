// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const words = document.querySelectorAll('.hero-content h1 span');
    words.forEach((word, index) => {
        word.style.setProperty('--i', index);
    });
});

