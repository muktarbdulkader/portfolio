// Debug outlines toggle (Ctrl+D)
document.addEventListener('keydown', (e) => {
  if (e.key === 'd' && e.ctrlKey) {
    document.body.classList.toggle('debug');
    // console.log('Debug outlines toggled:', document.body.classList.contains('debug') ? 'Enabled' : 'Disabled');
  }
});

// Toggle borders for debugging
// function toggleBorders() {
//   document.body.classList.toggle('show-borders');
//   // console.log('Borders toggled:', document.body.classList.contains('show-borders') ? 'Enabled' : 'Disabled');
// }

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const cont = document.getElementById('cont');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    form.style.display = 'none';

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

    // After 5 seconds, hide the message and show the form again
    setTimeout(() => {
      cont.innerHTML = '';  // Clear message
      form.style.display = 'block';  // Show form again
    }, 5000); // 5000 milliseconds = 5 seconds
  });
});



// Scroll animations for sections
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        // console.log(`Section animated: ${entry.target.id || entry.target.className}`);
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
    // console.log('Contact Me button clicked');
    // toggleBorders();
    scrollToContact();
  });
} else {
  // console.error('Contact Me button not found');
}

// Toggle dark/light mode
const colorToggle = document.querySelector('.color-toggle');
if (colorToggle) {
  colorToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // console.log('Theme toggled:', document.body.classList.contains('dark-mode') ? 'Dark mode' : 'Light mode');
  });
} else {
  // console.error('Color toggle button not found');
}

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
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        navMenu.style.display = 'none';
        navMenu.removeAttribute('style');
      }
    }
  });
});

const socialLinks = [
  { href: 'https://x.com/Muktarabdu5138', class: 'fab fa-twitter', title: 'Twitter' },
  { href: 'https://t.me/Mukti57', class: 'fab fa-telegram', title: 'Telegram' },
  { href: 'https://www.linkedin.com/in/muktar-abdulkader-3334b1340/', class: 'fab fa-linkedin', title: 'LinkedIn' },
];

function addSocialLinks() {
  let socialContainer = navMenu.querySelector('.social-link2');
  if (!socialContainer) {
    socialContainer = document.createElement('div');
    socialContainer.classList.add('social-link2');
    socialContainer.style.marginTop = '1.5rem';
    socialContainer.style.display = 'none';
    socialContainer.style.justifyContent = 'center';
    socialContainer.style.gap = '1.2rem';

    socialLinks.forEach((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = link.class;
      a.target = '_blank';
      a.title = link.title;
      a.setAttribute('aria-label', `Visit my ${link.title}`);
      a.style.color = '#CCC';
      a.style.fontSize = '1.8rem';
      a.style.transition = 'color 0.3s';
      a.addEventListener('mouseenter', () => (a.style.color = '#00ffcc'));
      a.addEventListener('mouseleave', () => (a.style.color = 'white'));
      socialContainer.appendChild(a);
    });

    navMenu.appendChild(socialContainer);
  }
}

function handleToggle() {
  const socialContainer = navMenu.querySelector('.social-link2');
  if (window.innerWidth > 768) {
    menuToggle.style.display = 'none';
    navMenu.style.display = 'flex';
    navMenu.classList.remove('active');
    navMenu.removeAttribute('style');
    if (socialContainer) socialContainer.style.display = 'none';
    menuToggle.textContent = '☰';
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  } else {
    menuToggle.style.display = 'block';
    if (!socialContainer) addSocialLinks();
    if (socialContainer) socialContainer.style.display = 'none';
    navMenu.style.display = navMenu.classList.contains('active') ? 'flex' : 'none';
  }
}

handleToggle();

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleToggle, 100);
});

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    menuToggle.textContent = isActive ? '✖' : '☰';
    menuToggle.setAttribute('aria-expanded', isActive);
    menuToggle.setAttribute('aria-label', isActive ? 'Close menu' : 'Open menu');

    if (isActive) {
      navMenu.style.display = 'flex';
      navMenu.style.position = 'fixed';
      navMenu.style.top = '60px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.height = 'calc(100vh - 60px)';
      navMenu.style.backgroundColor = 'rgba(26, 27, 38, 0.9)';
      navMenu.style.flexDirection = 'column';
      navMenu.style.justifyContent = 'center';
      navMenu.style.alignItems = 'center';
      navMenu.style.gap = '1.5rem';
      navMenu.style.zIndex = '9999';
      navMenu.style.overflowY = 'auto';

      const socialContainer = navMenu.querySelector('.social-link2');
      if (socialContainer) socialContainer.style.display = 'flex';
    } else {
      navMenu.style.display = 'none';
      navMenu.removeAttribute('style');
    }
  });
}

window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    menuToggle.textContent = '☰';
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    navMenu.style.display = 'none';
    navMenu.removeAttribute('style');
  }
});

// Update footer year
document.getElementById('year').textContent = new Date().getFullYear();

 // Typing animation
  const typingElement = document.querySelector('.typing span');
  const texts = [
    "Hello, I'm Muktar!",
    "I'm a Web Developer",
    "I love coding"
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {

      typingElement.textContent = currentText.substring(0, charIndex - 1);
      
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
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
  
  if (typingElement) {
    setTimeout(type, 1000);
  }


// Animate numbers in #success section
function animateNumbers() {
  const numbers = document.querySelectorAll('.number');
  if (!numbers.length) {
    // console.error('No elements with class .number found');
    return;
  }

  numbers.forEach((number) => {
    const target = parseInt(number.getAttribute('data-target'), 10);
    if (isNaN(target) || target <= 0) {
      // console.error(`Invalid or missing data-target for element:`, number);
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
      // console.log(`Animating number: ${count}/${target}`);
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
        // console.log('Success section animated');
      }
    });
  },
  { threshold: 0.3 }
);

const successSection = document.getElementById('success');
if (successSection) {
  successObserver.observe(successSection);
} else {
  // console.error('Success section not found');
}

// Learn More and Close buttons
const learnMoreBtn = document.getElementById('learn-more-btn');
const closeBtn = document.getElementById('close-btn');
const moreInfoSection = document.getElementById('more-info');

if (learnMoreBtn && moreInfoSection) {
  learnMoreBtn.addEventListener('click', () => {
    moreInfoSection.style.display = 'block';
    // console.log('More info section shown');
  });
} else {
  // console.error('Learn More button or More Info section not found');
}

if (closeBtn && moreInfoSection) {
  closeBtn.addEventListener('click', () => {
    moreInfoSection.style.display = 'none';
    // console.log('More info section hidden');
  });
} else {
  // console.error('Close button or More Info section not found');
}

// Scroll to top
const scrollToTop = document.querySelector('#scrollToTop');
if (scrollToTop) {
  scrollToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // console.log('Scrolled to top');
  });

  window.addEventListener('scroll', () => {
    scrollToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
} else {
  // console.error('Scroll to top button not found');
}
const  scrlto= document.querySelector('#contact-me-btn')
const footer=document.querySelector('footer')
scrlto.addEventListener('click' ,function(){
  footer.scrollIntoView({behavior:'smooth'})

})


// Sticky navigation
const nav = document.querySelector('.header');
const menuItem2 = document.querySelector('#hero') || document.querySelector('.section');

if (nav && menuItem2) {
  const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
      // console.log('Navigation set to sticky');
    } else {
      nav.classList.remove('sticky');
      // console.log('Navigation set to static');
    }
  };

  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: '-50px',
  });

  headerObserver.observe(menuItem2);
} else {
  // console.error('Header or hero/section not found for sticky navigation');
}
