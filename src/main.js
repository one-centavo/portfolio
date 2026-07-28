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

// Terminal Typing Animation for About Me Section
function typeText(element, text, speed = 80) {
  return new Promise((resolve) => {
    let i = 0;
    element.classList.add("border-r-2"); // Make typing caret visible
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed + Math.random() * 40); // Tiny random delay variance for realism
      } else {
        element.classList.remove("border-r-2"); // Hide typing caret when done
        resolve();
      }
    }
    type();
  });
}

async function startTerminalAnimation() {
  const cmd1 = document.getElementById("term-cmd-1");
  const out1 = document.getElementById("term-out-1");
  
  const cmd2Line = document.getElementById("term-line-cmd-2");
  const cmd2 = document.getElementById("term-cmd-2");
  const out2 = document.getElementById("term-out-2");
  
  const cmd3Line = document.getElementById("term-line-cmd-3");
  const cmd3 = document.getElementById("term-cmd-3");
  const out3 = document.getElementById("term-out-3");

  const cmd4Line = document.getElementById("term-line-cmd-4");
  const cmd4 = document.getElementById("term-cmd-4");
  const out4 = document.getElementById("term-out-4");
  
  const activePrompt = document.getElementById("term-prompt-active");

  if (!cmd1) return;

  // Clear any existing content for restart support
  cmd1.textContent = "";
  cmd2.textContent = "";
  cmd3.textContent = "";
  cmd4.textContent = "";
  out1.classList.add("hidden");
  cmd2Line.classList.add("hidden");
  out2.classList.add("hidden");
  cmd3Line.classList.add("hidden");
  out3.classList.add("hidden");
  cmd4Line.classList.add("hidden");
  out4.classList.add("hidden");
  activePrompt.classList.add("hidden");

  // Step 1: Type whoami
  await new Promise((resolve) => setTimeout(resolve, 500));
  await typeText(cmd1, "whoami");

  // Step 2: Show whoami output
  await new Promise((resolve) => setTimeout(resolve, 250));
  out1.classList.remove("hidden");

  // Step 3: Show line and type curl ipinfo.io/city
  await new Promise((resolve) => setTimeout(resolve, 600));
  cmd2Line.classList.remove("hidden");
  await typeText(cmd2, "curl ipinfo.io/city");

  // Step 4: Show location output
  await new Promise((resolve) => setTimeout(resolve, 250));
  out2.classList.remove("hidden");

  // Step 5: Show line and type stack --backend
  await new Promise((resolve) => setTimeout(resolve, 600));
  cmd3Line.classList.remove("hidden");
  await typeText(cmd3, "stack --backend");

  // Step 6: Show backend stack output
  await new Promise((resolve) => setTimeout(resolve, 250));
  out3.classList.remove("hidden");

  // Step 7: Show line and type stack --frontend
  await new Promise((resolve) => setTimeout(resolve, 600));
  cmd4Line.classList.remove("hidden");
  await typeText(cmd4, "stack --frontend");

  // Step 8: Show frontend stack output
  await new Promise((resolve) => setTimeout(resolve, 250));
  out4.classList.remove("hidden");

  // Step 9: Show trailing active cursor
  await new Promise((resolve) => setTimeout(resolve, 400));
  activePrompt.classList.remove("hidden");
}

// Trigger animation when About Me section is in view
document.addEventListener("DOMContentLoaded", () => {
  const aboutMeSection = document.getElementById("about-me");
  if (aboutMeSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTerminalAnimation();
            observer.unobserve(entry.target); // Animate once
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(aboutMeSection);
  }

  // Email Obfuscation & Interaction
  const encodedEmail = "Z3VzdGF2b2Fkb2xmb2NhYnJlcmExNUBnbWFpbC5jb20="; // gustavoadolfocabrera15@gmail.com in base64
  const btnCopyEmail = document.getElementById("btn-copy-email");
  const btnSendEmail = document.getElementById("btn-send-email");

  if (btnCopyEmail) {
    btnCopyEmail.addEventListener("click", () => {
      const email = atob(encodedEmail);
      navigator.clipboard.writeText(email).then(() => {
        const label = btnCopyEmail.querySelector("span");
        if (label) {
          const originalText = label.textContent;
          label.textContent = "¡Copiado!";
          btnCopyEmail.classList.add("bg-accent/80");
          setTimeout(() => {
            label.textContent = originalText;
            btnCopyEmail.classList.remove("bg-accent/80");
          }, 2000);
        }
      }).catch(err => {
        console.error("No se pudo copiar el correo: ", err);
      });
    });
  }

  if (btnSendEmail) {
    btnSendEmail.addEventListener("click", () => {
      const email = atob(encodedEmail);
      window.location.href = `mailto:${email}`;
    });
  }
});

