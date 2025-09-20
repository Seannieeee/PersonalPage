function showGreetingPopup() {
    const hour = new Date().getHours();
    let msg = "Good Day To You!";
    if (hour >= 5 && hour < 12) msg = "Good Morning!";
    else if (hour < 17) msg = "Good Afternoon!";
    else if (hour < 21) msg = "Good Evening!";
    alert(msg);
}

function initializeTheme() {
    const toggle = document.getElementById("themeToggle");
    const body = document.body;
    const icon = toggle.querySelector("i");

    let theme = localStorage.getItem("theme") || "dark";
    body.setAttribute("data-theme", theme);
    updateThemeIcon(theme, icon);

    toggle.addEventListener("click", () => {
        theme = theme === "dark" ? "light" : "dark";
        body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        updateThemeIcon(theme, icon);
    });
}

function updateThemeIcon(theme, icon) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

function initializeMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    const nav = document.getElementById("navLinks");

    menu.addEventListener("click", () => nav.classList.toggle("show"));
    document.querySelectorAll(".nav-links a").forEach(link =>
        link.addEventListener("click", () => nav.classList.remove("show"))
    );
}

function initializeContactForm() {
    const form = document.getElementById("contactForm");
    const success = document.getElementById("successMessage");

    form.addEventListener("submit", e => {
        e.preventDefault();
        let valid = true;

        const fields = [
            { el: "name", msg: "Please enter your name." },
            { el: "email", msg: "Please enter your email address.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            { el: "message", msg: "Please enter your message.", min: 10 }
        ];

        form.querySelectorAll(".form-group").forEach(g => g.classList.remove("error"));

        fields.forEach(f => {
            const input = document.getElementById(f.el);
            const val = input.value.trim();
            if (!val || (f.pattern && !f.pattern.test(val)) || (f.min && val.length < f.min)) {
                showError(input, f.pattern ? "Please enter a valid email." : f.msg);
                valid = false;
            }
        });

        if (valid) {
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i>Sending...';
            btn.disabled = true;

            setTimeout(() => {
                success.style.display = "block";
                form.reset();
                btn.innerHTML = original;
                btn.disabled = false;
                setTimeout(() => (success.style.display = "none"), 5000);
            }, 1500);
        }
    });
}

function showError(input, msg) {
    const group = input.closest(".form-group");
    group.classList.add("error");
    group.querySelector(".error-message").textContent = msg;
}

function openProject(type) {
    alert("Template");
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) target.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function animateOnScroll() {
    document.querySelectorAll(".animate-on-scroll").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) el.classList.add("animated");
    });
}

function initializeActiveNavigation() {
    window.addEventListener("scroll", () => {
        let current = "";
        document.querySelectorAll("section[id]").forEach(sec => {
            const top = sec.getBoundingClientRect().top;
            if (top <= 100 && top + sec.clientHeight > 100) current = sec.id;
        });
        document.querySelectorAll(".nav-links a").forEach(link =>
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`)
        );
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showGreetingPopup();
    initializeTheme();
    initializeMobileMenu();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeActiveNavigation();
    animateOnScroll();
});

window.addEventListener("scroll", animateOnScroll);

const style = document.createElement("style");
style.textContent = `
    .nav-links a.active { color: var(--accent-primary) !important; }
    .nav-links a.active::after { width: 100%; }
    @media (max-width: 768px) {
        .nav-links { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    }
`;
document.head.appendChild(style);
