// Debug outlines toggle (Ctrl+D)
document.addEventListener("keydown", (e) => {
  if (e.key === "d" && e.ctrlKey) {
    document.body.classList.toggle("debug");
  }
});

// Form submit handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const cont = document.getElementById("cont");

  if (form && cont) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      form.style.display = "none";

      cont.innerHTML = `<p style="
        background-color: #d4edda;
        color: #155724;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #c3e6cb;
        font-weight: bold;
        text-align: center;
      ">Thank you for contacting me, <strong>${name}</strong>! I will get back to you soon.</p>`;

      form.reset();

      setTimeout(() => {
        cont.innerHTML = "";
        form.style.display = "block";
      }, 5000);
    });
  }
});

// Scroll animations
const sections = document.querySelectorAll(".section");
if (sections.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  sections.forEach((section) => observer.observe(section));
}

// Navigation menu
const navMenu = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

const socialLinks = [
  { href: "https://github.com/", class: "fab fa-github", title: "GitHub" },
  {
    href: "https://linkedin.com/",
    class: "fab fa-linkedin",
    title: "LinkedIn",
  },
  { href: "https://twitter.com/", class: "fab fa-twitter", title: "Twitter" },
];

function addSocialLinks() {
  if (!navMenu) return;
  let socialContainer = navMenu.querySelector(".social-link2");
  if (!socialContainer) {
    socialContainer = document.createElement("div");
    socialContainer.classList.add("social-link2");
    socialLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.className = link.class;
      a.target = "_blank";
      a.title = link.title;
      a.setAttribute("aria-label", `Visit my ${link.title}`);
      socialContainer.appendChild(a);
    });
    navMenu.appendChild(socialContainer);
  }
}

function handleToggle() {
  if (!navMenu || !menuToggle) return;
  const socialContainer = navMenu.querySelector(".social-link2");
  if (window.innerWidth > 768) {
    navMenu.classList.remove("nav-mobile");
    navMenu.classList.add("nav-desktop");
    navMenu.style.display = "flex";
    menuToggle.style.display = "none";
    if (socialContainer) socialContainer.style.display = "none";
  } else {
    navMenu.classList.remove("nav-desktop");
    navMenu.style.display = "none";
    menuToggle.style.display = "block";
    if (!socialContainer) addSocialLinks();
    if (socialContainer) socialContainer.style.display = "none";
  }
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isActive = navMenu.classList.toggle("nav-mobile");
    if (isActive) {
      navMenu.style.display = "flex";
      const socialContainer = navMenu.querySelector(".social-link2");
      if (socialContainer) socialContainer.style.display = "flex";
      menuToggle.textContent = "✖";
      menuToggle.setAttribute("aria-expanded", "true");
    } else {
      navMenu.style.display = "none";
      navMenu.classList.remove("nav-mobile");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

window.addEventListener("resize", () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(handleToggle, 100);
});

window.addEventListener("scroll", () => {
  if (
    window.innerWidth <= 768 &&
    navMenu &&
    navMenu.classList.contains("nav-mobile")
  ) {
    navMenu.classList.remove("nav-mobile");
    navMenu.style.display = "none";
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }
});

handleToggle();

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Typing animation
const typingElement = document.querySelector(".typing span");
if (typingElement) {
  const texts = ["Hello, I'm Muktar!", "I'm a Web Developer", "I love coding"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];
    typingElement.textContent = isDeleting
      ? currentText.substring(0, charIndex - 1)
      : currentText.substring(0, charIndex + 1);
    charIndex += isDeleting ? -1 : 1;

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }
  setTimeout(type, 1000);
}

// Animate numbers
function animateNumbers() {
  const numbers = document.querySelectorAll(".number");
  if (!numbers.length) return;
  numbers.forEach((number) => {
    const target = parseInt(number.getAttribute("data-target"), 10);
    if (isNaN(target) || target <= 0) return;
    let count = 0;
    const increment = Math.ceil(target / 100);
    const speed = 20;
    const interval = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(interval);
      }
      number.textContent = count;
    }, speed);
  });
}

const successSection = document.getElementById("success");
if (successSection) {
  const successObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  successObserver.observe(successSection);
}

// Learn More and Close buttons
const learnMoreBtn = document.getElementById("learn-more-btn");
const closeBtn = document.getElementById("close-btn");
const moreInfoSection = document.getElementById("more-info");

if (learnMoreBtn && moreInfoSection) {
  learnMoreBtn.addEventListener("click", () => {
    moreInfoSection.style.display = "block";
  });
}
if (closeBtn && moreInfoSection) {
  closeBtn.addEventListener("click", () => {
    moreInfoSection.style.display = "none";
  });
}

// Scroll to top
const scrollToTop = document.querySelector("#scrollToTop");
if (scrollToTop) {
  scrollToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", () => {
    scrollToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
}

// Scroll to footer (Contact me button)
const scrlto = document.querySelector("#contact-me-btn");
const footer = document.querySelector("footer");
if (scrlto && footer) {
  scrlto.addEventListener("click", () => {
    footer.scrollIntoView({ behavior: "smooth" });
  });
}

// Sticky navigation
// const nav = document.querySelector(".header");
// const menuItem2 = document.querySelector(".section");

// if (nav && menuItem2) {
//   const stickyNav = function (entries) {
//     const [entry] = entries;
//     if (!entry.isIntersecting) {
//       nav.classList.add("sticky");
//     } else {
//       nav.classList.remove("sticky");
//     }
//   };

//   const headerObserver = new IntersectionObserver(stickyNav, {
//     root: null,
//     threshold: 0,
//     rootMargin: "-80px",
//   });

//   headerObserver.observe(menuItem2);
// }

window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".header");
  const hero =
    document.querySelector("#hero") || document.querySelector(".section");

  if (!nav || !hero) return;

  const stickyNav = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  };

  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.offsetHeight}px`, // always match header height
  });

  headerObserver.observe(hero);
});
