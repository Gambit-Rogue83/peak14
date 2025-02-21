document.addEventListener("DOMContentLoaded", function () {
    // Testimonial Carousel
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    const slides = document.querySelector(".slides");
    const cards = document.querySelectorAll(".testimonial-card");
    const totalSlides = cards.length;
    const dotTrack = document.querySelector(".dot-track");
    let index = 0;

    for (let i = 0; i < totalSlides; i++) {
        let dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dotTrack.appendChild(dot);
    }
    const dots = document.querySelectorAll(".dot");

    slides.addEventListener("mousedown", startDrag);
    slides.addEventListener("mouseup", endDrag);
    slides.addEventListener("mouseleave", endDrag);
    slides.addEventListener("mousemove", drag);
    slides.addEventListener("touchstart", startDrag);
    slides.addEventListener("touchend", endDrag);
    slides.addEventListener("touchmove", drag);

    function startDrag(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        slides.style.transition = "none";
        slides.style.cursor = "grabbing";
    }

    function endDrag() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        slides.style.cursor = "grab";
        const movedBy = currentTranslate - prevTranslate;
        prevTranslate = currentTranslate;
        setPositionByIndex();
        slides.style.transition = "transform 0.3s ease-out";
    }

    function drag(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + (currentPosition - startPos) * 1.5;
        slides.style.transform = `translateX(${currentTranslate}px)`;
    }

    function getPositionX(event) {
        return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
    }

    function setPositionByIndex() {
        slides.style.transition = "transform 0.3s ease-out";
        prevTranslate = currentTranslate;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index % dots.length].classList.add("active");
    }

    // Dropdown Functionality
    window.toggleDropdown(header) {
        const content = header.nextElementSibling;
        const toggleIcon = header.querySelector('.dropdown-toggle');
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
        toggleIcon.classList.toggle('active'); // Toggle plus/minus icon rotation
    }

    // Privacy Policy Overlay
    const privacyLink = document.getElementById('privacy-link');
    const privacyOverlay = document.getElementById('privacy-overlay');
    const closePrivacyButton = document.getElementById('close-privacy');

    if (privacyLink) {
        privacyLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            privacyOverlay.style.display = 'block';
        });

        closePrivacyButton.addEventListener('click', function () {
            privacyOverlay.style.display = 'none';
        });
    }

    // Scroll Functions
    window.scrollToSection(sectionId) {
        document.querySelector(`.${sectionId}-section`).scrollIntoView({ behavior: "smooth" });
    }

    window.scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.getElementById("scrollToTop").style.display = "none";
    }

    window.addEventListener("scroll", function () {
        const featuresSection = document.getElementById("features");
        const arrow = document.getElementById("scrollToTop");
        if (featuresSection.getBoundingClientRect().top <= 0) {
            arrow.style.display = "flex";
        } else {
            arrow.style.display = "none";
        }
    });

    // Team Member Carousel
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

    window.prevMember() {
        currentIndex = (currentIndex === 0) ? members.length - 1 : currentIndex - 1;
        updateCarousel();
    }

    window.nextMember() {
        currentIndex = (currentIndex === members.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }

    if (members.length > 0) updateCarousel();

    // Set Current Year
    document.getElementById("year").textContent = new Date().getFullYear();
});
