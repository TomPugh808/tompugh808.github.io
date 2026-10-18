
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const year = document.getElementById("year");
const enlargedImage = document.getElementById("enlargedImage");
const images = document.querySelectorAll(".project-image");
const imageModal = document.getElementById("imageModal");
const closeModal = document.getElementById("closeModal");

// Update the copyright year.
year.textContent = new Date().getFullYear();

// Open and close the mobile navigation.
menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});

// Close the mobile navigation after selecting a section.
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});

// Close the menu when Escape is pressed.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }
});

// Highlight the navigation link for the section being viewed.
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                const isActive =
                    link.getAttribute("href") === `#${entry.target.id}`;

                link.classList.toggle("active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    },
    {
        rootMargin: "-20% 0px -65% 0px"
    }
);

sections.forEach((section) => {
    observer.observe(section);
});



images.forEach((image) => {
    image.addEventListener("click", () => {
        enlargedImage.src = image.src;
        enlargedImage.alt = image.alt;
        imageModal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => {
    imageModal.style.display = "none";
});

imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
        imageModal.style.display = "none";
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        imageModal.style.display = "none";
    }
});
