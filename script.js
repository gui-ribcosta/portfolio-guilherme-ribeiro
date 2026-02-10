document.addEventListener("DOMContentLoaded", () => {

  // ===========================
  // MOBILE MENU TOGGLE
  // ===========================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const headerDesktop = document.querySelector('.header.hide-on-mobile');
  const overlay = document.querySelector('.overlay'); // overlay opcional

  mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active'); // ativa o overlay

    // opcional: esconder o header desktop
    headerDesktop.style.display = mobileNav.classList.contains('active') ? 'none' : 'flex';
  });

  // Botão fechar "X" no menu mobile
  const closeMobileBtn = document.querySelector('.close-mobile-nav');
  if (closeMobileBtn) {
    closeMobileBtn.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
      headerDesktop.style.display = 'flex';
    });
  }

  // ===========================
  // TEMA CLARO / ESCURO
  // ===========================
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

  // ===========================
  // REVEAL ON SCROLL
  // ===========================
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
  revealOnScroll(); // chama no load também

  // ===========================
  // SCROLL SUAVE PARA LINKS MOBILE
  // ===========================
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  mobileLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // previne jump brusco

      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      const headerOffset = 70; // altura do header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Fecha o menu mobile
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
      headerDesktop.style.display = 'flex';

      // Scroll suave para a seção
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // ===========================
  // CARROSSEL
  // ===========================
  class Carrossel {
    constructor(sectionSelector) {
      this.section = document.querySelector(sectionSelector);
      if (!this.section) return;

      // TRACK E CARDS
      this.track = this.section.querySelector(".carrossel-track");
      this.cards = Array.from(this.track.children);

      // INDEX
      this.index = 0;

      // GAP entre cards
      const trackStyle = getComputedStyle(this.track);
      this.gap = parseFloat(trackStyle.gap) || 0;

      // BOTÕES
      this.prevButtons = this.section.querySelectorAll(".carrossel-btn-prev");
      this.nextButtons = this.section.querySelectorAll(".carrossel-btn-next");

      // INDICADORES
      this.indicatorsDesktop = this.section.querySelectorAll(".carrossel-ui-desktop .indicator");
      this.indicatorsMobile = this.section.querySelectorAll(".carrossel-ui-mobile .indicator");

      // EVENTOS BOTÕES
      this.prevButtons.forEach(btn => btn.addEventListener("click", () => this.prev()));
      this.nextButtons.forEach(btn => btn.addEventListener("click", () => this.next()));

      // EVENTOS INDICADORES
      this.indicatorsDesktop.forEach((dot, i) => dot.addEventListener("click", () => {
        this.index = i;
        this.update();
      }));
      this.indicatorsMobile.forEach((dot, i) => dot.addEventListener("click", () => {
        this.index = i;
        this.update();
      }));

      // INIT
      this.update();

      // REAJUSTA no resize
      window.addEventListener("resize", () => this.update());
    }

    getCardWidth() {
      const card = this.cards[0];
      const cardStyle = getComputedStyle(card);
      const marginRight = parseFloat(cardStyle.marginRight) || 0;
      return card.getBoundingClientRect().width + this.gap + marginRight;
    }

    update() {
      const cardWidth = this.getCardWidth();
      this.track.style.transform = `translateX(-${this.index * cardWidth}px)`;

      const indicators = window.innerWidth >= 1024 ? this.indicatorsDesktop : this.indicatorsMobile;
      indicators.forEach(dot => dot.classList.remove("active"));
      if (indicators[this.index]) indicators[this.index].classList.add("active");
    }

    prev() {
      this.index = (this.index - 1 + this.cards.length) % this.cards.length;
      this.update();
    }

    next() {
      this.index = (this.index + 1) % this.cards.length;
      this.update();
    }
  }

  // Inicializa os carrosséis
  new Carrossel("#projetos");
  new Carrossel("#certificados");

  // ===========================
  // CERT TECH SLIDER (loop infinito)
  // ===========================
  const track = document.querySelector('.cert-tech-track');
  if (track) {
    const icons = [...track.children];
    icons.forEach(icon => track.appendChild(icon.cloneNode(true)));

    window.addEventListener('load', () => {
      track.classList.add('animate');
    });
  }

});
