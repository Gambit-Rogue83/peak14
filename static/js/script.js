
   const testimonialSection = document.querySelector('.testimonial-section');
const testimonialContainer = document.querySelector('.testimonial-container');
const flickityViewport = document.querySelector('.flickity-viewport');
const flickitySlider = document.querySelector('.flickity-slider');
const carouselDots = document.querySelector('.carousel-dots');

// **YOUR TESTIMONIAL DATA (Replace with your data):**
const testimonials = [
    { name: "Glimmer", quote: "The staff are always super sweet... (rest of Glimmer's quote)", rating: 5 },
    { name: "Katrina", quote: "Arcadia Counseling has showed up... (rest of Katrina's quote)", rating: 4 },
    { name: "Micah", quote: "This is one of the premier... (rest of Micah's quote)", rating: 5 },
    // ... (Add ALL your testimonial objects here) ...
];

let currentSlide = 0;
let isDragging = false;
let startX = 0;
let scrollLeftStart = 0;
let touchStartX = 0;
let touchStartY = 0;

const numVisibleSlides = Math.floor(testimonialContainer.offsetWidth / 400); // Adjust 400 to match slide width
const numBufferSlides = 2;

function renderTestimonials() {
    flickitySlider.innerHTML = '';

    const startIndex = currentSlide - numBufferSlides;
    const endIndex = currentSlide + numVisibleSlides + numBufferSlides;

    for (let i = startIndex; i < endIndex; i++) {
        const index = (i + testimonials.length) % testimonials.length;
        const testimonial = testimonials[index];

        const testimonialHTML = `
            <blockquote style="position: absolute; left: 0px; transform: translateX(<span class="math-inline">\{i \* 100\}%\);"\>
<div class\="testimonial\-inner"\>
<div data\-shadow\="" class\="image\-icon "\>“</div\>
<span class\="wrap"\>
<span class\="testimonial\-name"\></span>{testimonial.name}</span>
                        <span class="title"></span>
                    </span>
                    <p class="testimonial-quote">
                        <span class="open-quote">“</span>${testimonial.quote}<span class="close-quote">”</span>
                    </p>
                    <div class="star-rating-wrap">
                        <div class="star-rating">
                            <span class="filled" style="width: 0%;"></span>
                        </div>
                    </div>
                </div>
            </blockquote>
        `;
        flickitySlider.innerHTML += testimonialHTML;
    }

    setTimeout(() => {
        setStarRatings();
    }, 0);
}

function setStarRatings() {
    const testimonialInners = document.querySelectorAll('.testimonial-inner');

    testimonialInners.forEach((inner, index) => {
        const testimonial = testimonials[(currentSlide + index - numBufferSlides + testimonials.length) % testimonials.length];
        const filledStars = inner.querySelector('.filled');
        filledStars.style.width = `${testimonial.rating * 20}%`;
    });
}

function updateDots() {
    carouselDots.innerHTML = '';
    for (let i = 0; i < testimonials.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    currentSlide = index;
    renderTestimonials();
    updateDots();
}

flickityViewport.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    scrollLeftStart = flickityViewport.scrollLeft;
});

flickityViewport.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.clientX - startX;
    flickityViewport.scrollLeft = scrollLeftStart - deltaX;
});

flickityViewport.addEventListener('mouseup', () => {
    isDragging = false;
});

flickityViewport.addEventListener('mouseleave', () => {
    isDragging = false;
});

// Touch Events
flickityViewport.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].


    function toggleDropdown(header) {
        const content = header.nextElementSibling;
        const toggleIcon = header.querySelector('.dropdown-toggle');
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
        toggleIcon.classList.toggle('active'); // Toggle plus/minus icon rotation
    }


    const privacyLink = document.getElementById('privacy-link');
    const privacyOverlay = document.getElementById('privacy-overlay');
    const closePrivacyButton = document.getElementById('close-privacy');

    privacyLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        privacyOverlay.style.display = 'block';
    });

    closePrivacyButton.addEventListener('click', function () {
        privacyOverlay.style.display = 'none';
    });


    function scrollToSection(sectionId) {
    document.querySelector(`.${sectionId}-section`).scrollIntoView({ behavior: "smooth" });
}

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.getElementById("scrollToTop").style.display = "none";
    }

    window.addEventListener("scroll", function() {
      const featuresSection = document.getElementById("features");
      const arrow = document.getElementById("scrollToTop");
      if (featuresSection.getBoundingClientRect().top <= 0) {
        arrow.style.display = "flex";
      } else {
        arrow.style.display = "none";
      }
    });


    let currentIndex = 0;
    const members = document.querySelectorAll(".team-member");
    const bioText = document.getElementById("bio-text");
    const socialLinks = document.getElementById("social-links");

    function updateCarousel() {
        members.forEach((member, index) => {
            member.classList.toggle("active", index === currentIndex);
        });

        const activeMember = members[currentIndex];
        bioText.textContent = activeMember.dataset.bio;

        // Update social media links
        socialLinks.innerHTML = ""; // Clear existing links
        const platforms = ["x", "facebook", "linkedin"];
        platforms.forEach(platform => {
            const link = activeMember.dataset[platform];
            if (link) {
                const a = document.createElement("a");
                a.href = link;
                a.target = "_blank";
                const img = document.createElement("img");
                img.src = `static/${platform}.png`; // Assuming you have icons named x.png, facebook.png, etc.
                img.alt = platform;
                a.appendChild(img);
                socialLinks.appendChild(a);
            }
        });
    }

    function prevMember() {
        currentIndex = (currentIndex === 0) ? members.length - 1 : currentIndex - 1;
        updateCarousel();
    }

    function nextMember() {
        currentIndex = (currentIndex === members.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }

    updateCarousel();

    document.getElementById("year").textContent = new Date().getFullYear();
