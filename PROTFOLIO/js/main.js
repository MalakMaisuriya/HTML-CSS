const nav = document.querySelector(".navbar");

function updateHeaderState() {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("header-scrolled");
    } else {
        nav.classList.remove("header-scrolled");
    }
}

window.addEventListener("scroll", updateHeaderState);
updateHeaderState();

const navLinks = document.querySelectorAll(".nav-link");
const navCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (navCollapse && navCollapse.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        }
    });
});

const revealTargets = document.querySelectorAll(
    "section .container > .row, .skill-chip, .why-card, .service-card, .process-card, .project-card, .testimonial-card, .certificate-card, .cta-panel"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
});

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    const frame = card.querySelector(".project-image");
    const image = frame?.querySelector("img");

    if (!image) {
        return;
    }

    card.addEventListener("mouseenter", () => {
        const scrollDistance = frame.clientHeight - image.offsetHeight;
        image.style.transform = `translateY(${Math.min(0, scrollDistance)}px)`;
    });

    card.addEventListener("mouseleave", () => {
        image.style.transform = "translateY(0)";
    });
});

const projectModalFrames = document.querySelectorAll(".modal-image-scroll");

projectModalFrames.forEach((frame) => {
    const image = frame.querySelector("img");

    if (!image) {
        return;
    }

    frame.addEventListener("mouseenter", () => {
        const scrollDistance = frame.clientHeight - image.offsetHeight;
        image.style.transform = `translateY(${Math.min(0, scrollDistance)}px)`;
    });

    frame.addEventListener("mouseleave", () => {
        image.style.transform = "translateY(0)";
    });
});

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name")?.trim();
        const phone = formData.get("phone")?.trim() || "Not shared";
        const email = formData.get("email")?.trim();
        const message = formData.get("message")?.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill name, email and message.";
            return;
        }

        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
        );

        formStatus.textContent = "Opening your email app with the message ready.";
        window.location.href = `mailto:malakmaisuriya857@gmail.com?subject=${subject}&body=${body}`;
        contactForm.reset();
    });
}
