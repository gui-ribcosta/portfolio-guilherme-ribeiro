// ===========================
// CARROSSEL
// ===========================

class Carrossel {
  constructor(sectionSelector) {
    this.section = document.querySelector(sectionSelector);
    if (!this.section) return;

    this.track = this.section.querySelector(".carrossel-track");
    this.cards = Array.from(this.track.children);

    this.index = 0;

    const trackStyle = getComputedStyle(this.track);
    this.gap = parseFloat(trackStyle.gap) || 0;

    this.prevButtons = this.section.querySelectorAll(".carrossel-btn-prev");
    this.nextButtons = this.section.querySelectorAll(".carrossel-btn-next");

    this.indicatorsDesktop = this.section.querySelectorAll(".carrossel-ui-desktop .indicator");
    this.indicatorsMobile = this.section.querySelectorAll(".carrossel-ui-mobile .indicator");

    this.prevButtons.forEach(btn => btn.addEventListener("click", () => this.prev()));
    this.nextButtons.forEach(btn => btn.addEventListener("click", () => this.next()));

    this.indicatorsDesktop.forEach((dot, i) => 
      dot.addEventListener("click", () => {
        this.index = i;
        this.update();
      })
    );

    this.indicatorsMobile.forEach((dot, i) => 
      dot.addEventListener("click", () => {
        this.index = i;
        this.update();
      })
    );

    this.update();
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

    const indicators = window.innerWidth >= 1024 
      ? this.indicatorsDesktop 
      : this.indicatorsMobile;

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


// ===========================
// CERT TECH SLIDER
// ===========================

function initCertTechSlider() {
  const track = document.querySelector('.cert-tech-track');
  if (!track) return;

  const icons = [...track.children];
  icons.forEach(icon => track.appendChild(icon.cloneNode(true)));

  window.addEventListener('load', () => {
    track.classList.add('animate');
  });
}
