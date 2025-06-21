// --- Education Slider Logic ---
const sliderWrapper = document.querySelector('.slider-wrapper');
if (sliderWrapper) {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    let currentIndex = 0;

    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update button states
        if (prevButton) prevButton.disabled = currentIndex === 0;
        if (nextButton) nextButton.disabled = currentIndex === slides.length - 1;
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }
    
    // Initial slider setup
    updateSlider();
}


// --- Active Link Highlighting on Scroll Logic ---
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


// --- Image Modal Logic ---
const modal = document.getElementById("imageModal");
if(modal) {
    const modalImg = document.getElementById("modalImage");
    const galleryImages = document.querySelectorAll(".gallery-item img");
    const closeModal = document.querySelector(".close-modal");

    galleryImages.forEach(img => {
        img.addEventListener('click', function(){
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    if(closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}