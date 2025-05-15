// Debug outlines toggle
document.addEventListener('keydown', (e) => {
  if (e.key === 'd' && e.ctrlKey) {
    document.body.classList.toggle('debug');
    console.log('Debug outlines toggled');
  }
});

// Toggle borders
function toggleBorders() {
  document.body.classList.toggle('no-borders');
  console.log('Borders toggled:', document.body.classList.contains('no-borders') ? 'Off' : 'On');
}

// Scroll to contact section
function scrollToContact() {
  const contactSection = document.getElementById('contacts');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error('Contact section not found');
  }
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    alert('Please fill out all fields.');
    return;
  }

  console.log('Form submitted:', { name, email, message });
  alert('Message sent! (Demo mode, no email sent.)');
  form.reset();
}

// Attach form handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
} else {
  console.error('Contact form not found');
}

// Scroll animations
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
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
  });
} else {
  console.error('Color toggle button not found');
}

// Add smooth scroll to navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Collapse mobile menu
      
      menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      console.error(`Navigation target ${e.target.getAttribute('href')} not found`);
    }
  });
});

// Add mobile menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
  const navMenu = document.querySelector('#nav');
  navMenu.classList.toggle('active');
 
});


// Set dynamic year in footer
document.getElementById('year').textContent = new Date().getFullYear();
const textElement = document.querySelector('.typing span');
const fullText = "Hello, I am Muktar! , web developer";
const splitIndex = fullText.indexOf("web developer");

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
      type();
    }, 1500);
  }
}

type();

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
    }, speed);
  });
}

// Set up Intersection Observer for #success
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
const successSection = document.getElementById('success');
if (successSection) {
  successObserver.observe(successSection);
} else {
  console.error('Success section not found');
}



document.getElementById("learn-more-btn").addEventListener("click", function() {
  const moreInfoSection = document.getElementById("more-info");
  moreInfoSection.style.display = "block"; // Show the hidden section
});

// Close the "More About Me" section when "Close" button is clicked
document.getElementById("close-btn").addEventListener("click", function() {
  const moreInfoSection = document.getElementById("more-info");
  moreInfoSection.style.display = "none"; 
});
const scroll = document.querySelector('#scrollToTop');
// Smooth scroll to top
scroll.addEventListener('click', function() {
  window.scrollTo({
    top: 0, 
    behavior: 'smooth' 
  });
  console.log('Scroll to top clicked');
});
// Show the button when scrolling down
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) { 
    scroll.style.display = 'block';
  } else {
    scroll.style.display = 'none';
  }
});
 
window.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.header');
  const menuItem2 = document.querySelector('.section');

  const stikNav = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  };

  const header = new IntersectionObserver(stikNav, {
    root: null,
    threshold: 0,
    rootMargin: "-50px",
  });

  header.observe(menuItem2);
});


