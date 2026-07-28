import "./style.css";

// DOM Elements
const navbar = document.getElementById("navbar");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuCloseBtn = document.getElementById("mobile-menu-close-btn");

// Mobile Menu Toggle
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  });
}

if (mobileMenuCloseBtn && mobileMenu) {
  mobileMenuCloseBtn.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  });
}

if (mobileMenu) {
  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    });
  });
}

// Scroll Effects (Navbar style change on scroll)
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("border-border-custom/80", "bg-[#0b0c0e]/95", "shadow-lg");
    navbar.classList.remove("border-border-custom/30", "bg-[#0b0c0e]/80");
  } else {
    navbar.classList.remove("border-border-custom/80", "bg-[#0b0c0e]/95", "shadow-lg");
    navbar.classList.add("border-border-custom/30", "bg-[#0b0c0e]/80");
  }
});

// Scrollspy (Active section highlight)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#desktop-nav a, #mobile-nav a");

window.addEventListener("scroll", () => {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80; // Offset for navbar height
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${currentSectionId}`) {
      link.classList.remove("text-secondary");
      link.classList.add("text-accent");
    } else {
      link.classList.remove("text-accent");
      link.classList.add("text-secondary");
    }
  });
});
