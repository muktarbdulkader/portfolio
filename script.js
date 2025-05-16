// Debug outlines toggle (Ctrl+D)
document.addEventListener('keydown', (e) => {
  if (e.key === 'd' && e.ctrlKey) {
    document.body.classList.toggle('debug');
    console.log('Debug outlines toggled:', document.body.classList.contains('debug') ? 'Enabled' : 'Disabled');
  }
});

// Toggle borders for debugging
function toggleBorders() {
  document.body.classList.toggle('show-borders');
  console.log('Borders toggled:', document.body.classList.contains('show-borders') ? 'Enabled' : 'Disabled');
}

// Scroll to contact section
function scrollToContact() {
  const contactSection = document.getElementById('contacts');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    console.log('Scrolled to contact section');
  } else {
    console.error('Contact section not found');
  }
}

// Handle form submission with validation
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();

  if (!name || !email || !message) {
    alert('Please fill out all fields.');
    console.warn('Form submission failed: Missing fields');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    console.warn('Form submission failed: Invalid email');
    return;
  }

  console.log('Form submitted:', { name, email, message });
  alert('Message sent! Thank you for your comment and contact.');
  form.reset();
}

// Attach form handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
} else {
  console.error('Contact form not found');
  const contactSection = document.querySelector('#contacts');
  if (contactSection) {
    contactSection.innerHTML = '<p>Error: Contact form unavailable. Please try again later.</p>';
  }
}

// Scroll animations for sections
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        console.log(`Section animated: ${entry.target.id || entry.target.className}`);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));

// Contact Me button handler
const contactMeBtn = document.getElementById('contact-me-btn');
if (contactMeBtn) {
  contactMeBtn.addEventListener('click', () => {
    console.log('Contact Me button clicked');
    toggleBorders();
    scrollToContact();
  });
} else {
  console.error('Contact Me button not found');
}

// Toggle dark/light mode
const colorToggle = document.querySelector('.color-toggle');
if (colorToggle) {
  colorToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    console.log('Theme toggled:', document.body.classList.contains('dark-mode') ? 'Dark mode' : 'Light mode');
  });
} else {
  console.error('Color toggle button not found');
}

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('nav a');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('nav');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      navMenu.classList.remove('active');
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
      navMenu.removeAttribute('style');
      console.log(`Navigated to: ${e.target.getAttribute('href')}`);
    } else {
      console.error(`Navigation target ${e.target.getAttribute('href')} not found`);
    }
  });
});


const socialLinks = [
  { href: 'https://x.com/Muktarabdu5138', class: 'fab fa-twitter', title: 'Twitter' },
  { href: '#', class: 'fab fa-instagram', title: 'Instagram' },
  { href: 'https://www.linkedin.com/in/muktar-abdulkader-3334b1340/', class: 'fab fa-linkedin', title: 'LinkedIn' },
];

// Add social links (only for mobile)
function addSocialLinks() {
  let socialContainer = navMenu.querySelector('.social-link2');
  if (!socialContainer) {
    socialContainer = document.createElement('div');
    socialContainer.classList.add('social-link2');
    socialContainer.style.marginTop = '1.5rem';
    socialContainer.style.display = 'flex';
    socialContainer.style.justifyContent = 'center';
    socialContainer.style.gap = '1.2rem';

    socialLinks.forEach((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = link.class;
      a.target = '_blank';
      a.title = link.title;
      a.setAttribute('aria-label', `Visit my ${link.title}`);
      a.style.color = 'white';
      a.style.fontSize = '1.8rem';
      a.style.transition = 'color 0.3s';
      a.addEventListener('mouseenter', () => (a.style.color = '#00ffcc'));
      a.addEventListener('mouseleave', () => (a.style.color = 'white'));
      socialContainer.appendChild(a);
    });

    navMenu.appendChild(socialContainer);
    console.log('Social links added');
  }
}

// Handle responsive menu and social links visibility
function handleToggle() {
  const socialContainer = navMenu.querySelector('.social-link2');
  if (window.innerWidth > 768) {
    menuToggle.style.display = 'none';
    navMenu.style.display = 'flex';
    if (socialContainer) socialContainer.style.display = 'none'; 
    console.log('Desktop menu activated, social links hidden');
  } else {
    menuToggle.style.display = 'block';
    if (!socialContainer) addSocialLinks(); 
    if (socialContainer) socialContainer.style.display = 'flex'; 
    console.log('Mobile menu activated, social links visible');
  }
}

// Initialize menu
handleToggle();

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleToggle, 100);
});

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    menuToggle.textContent = isActive ? '✖' : '☰';
    menuToggle.setAttribute('aria-expanded', isActive);
    menuToggle.setAttribute('aria-label', isActive ? 'Close menu' : 'Open menu');

    if (isActive) {
      navMenu.style.position = 'fixed';
      navMenu.style.top = '60px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.height = 'calc(100vh - 60px)';
      navMenu.style.backgroundColor = '#1a1b26';
      navMenu.style.flexDirection = 'column';
      navMenu.style.justifyContent = 'center';
      navMenu.style.alignItems = 'center';
      navMenu.style.gap = '1.5rem';
      navMenu.style.zIndex = '9999';
      navMenu.style.overflowY = 'auto';
      const socialContainer = navMenu.querySelector('.social-link2');
      if (socialContainer) socialContainer.style.display = 'flex';
    } else {
      navMenu.removeAttribute('style');
    }
    console.log(`Mobile menu ${isActive ? 'opened' : 'closed'}`);
  });
} else {
  console.error('Menu toggle not found');
}

// Close mobile menu on scroll
window.addEventListener('scroll', () => {
  if (navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    menuToggle.textContent = '☰';
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    navMenu.removeAttribute('style');
    console.log('Mobile menu closed due to scroll');
  }
});

// Update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Typing animation
const textElement = document.querySelector('.typing span');
const fullText = 'Hello, I am Muktar! , web developer';
const splitIndex = fullText.indexOf('web developer');
let i = 0;

function type() {
  if (i <= fullText.length) {
    const before = fullText.substring(0, i);
    const colored = `
      <span style="color: #7aa2f7;">${before.substring(0, splitIndex)}</span>
      <span style="color: #f7768e;">${before.substring(splitIndex)}</span>
    `;
    textElement.innerHTML = colored + '<span class="cursor">|</span>';
    i++;
    setTimeout(type, 100);
  } else {
    setTimeout(() => {
      i = 0;
      textElement.innerHTML = '<span class="cursor">|</span>';
      type();
    }, 3000);
  }
}

if (textElement) {
  type();
} else {
  console.error('Typing animation element not found');
}

// Animate numbers in #success section
function animateNumbers() {
  const numbers = document.querySelectorAll('.number');
  if (!numbers.length) {
    console.error('No elements with class .number found');
    return;
  }

  numbers.forEach((number) => {
    const target = parseInt(number.getAttribute('data-target'), 10);
    if (isNaN(target) || target <= 0) {
      console.error(`Invalid or missing data-target for element:`, number);
      return;
    }

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
      console.log(`Animating number: ${count}/${target}`);
    }, speed);
  });
}

// Intersection Observer for #success
const successObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.disconnect();
        console.log('Success section animated');
      }
    });
  },
  { threshold: 0.3 }
);

const successSection = document.getElementById('success');
if (successSection) {
  successObserver.observe(successSection);
} else {
  console.error('Success section not found');
}

// Learn More and Close buttons
const learnMoreBtn = document.getElementById('learn-more-btn');
const closeBtn = document.getElementById('close-btn');
const moreInfoSection = document.getElementById('more-info');

if (learnMoreBtn && moreInfoSection) {
  learnMoreBtn.addEventListener('click', () => {
    moreInfoSection.style.display = 'block';
    console.log('More info section shown');
  });
} else {
  console.error('Learn More button or More Info section not found');
}

if (closeBtn && moreInfoSection) {
  closeBtn.addEventListener('click', () => {
    moreInfoSection.style.display = 'none';
    console.log('More info section hidden');
  });
} else {
  console.error('Close button or More Info section not found');
}

// Scroll to top
const scrollToTop = document.querySelector('#scrollToTop');
if (scrollToTop) {
  scrollToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    console.log('Scrolled to top');
  });

  window.addEventListener('scroll', () => {
    scrollToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
} else {
  console.error('Scroll to top button not found');
}

// Sticky navigation
const nav = document.querySelector('.header');
const menuItem2 = document.querySelector('#hero') || document.querySelector('.section');

if (nav && menuItem2) {
  const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
      console.log('Navigation set to sticky');
    } else {
      nav.classList.remove('sticky');
      console.log('Navigation set to static');
    }
  };

  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: '-50px',
  });

  headerObserver.observe(menuItem2);
} else {
  console.error('Header or hero/section not found for sticky navigation');
}