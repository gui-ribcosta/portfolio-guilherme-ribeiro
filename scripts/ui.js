// ===========================
// MOBILE MENU
// ===========================
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const headerDesktop = document.querySelector('.header.hide-on-mobile');
  const overlay = document.querySelector('.overlay');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
      headerDesktop.style.display = mobileNav.classList.contains('active') ? 'none' : 'flex';
    });
  }

  const closeMobileBtn = document.querySelector('.close-mobile-nav');
  if (closeMobileBtn) {
    closeMobileBtn.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
      headerDesktop.style.display = 'flex';
    });
  }
}

// ===========================
// TEMA CLARO / ESCURO
// ===========================
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeToggleMobile = document.getElementById("themeToggleMobile");
  const root = document.documentElement;

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  [themeToggle, themeToggleMobile].forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  });
}

// ===========================
// REVEAL ON SCROLL
// ===========================
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}

// ===========================
// SCROLL SUAVE PARA LINKS MOBILE
// ===========================
function initSmoothScroll() {
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.overlay');
  const headerDesktop = document.querySelector('.header.hide-on-mobile');

  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  mobileLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
      headerDesktop.style.display = 'flex';

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

