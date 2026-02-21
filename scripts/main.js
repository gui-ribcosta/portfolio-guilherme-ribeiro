document.addEventListener("DOMContentLoaded", () => {

  // UI
  initMobileMenu();
  initThemeToggle();
  initRevealOnScroll();
  initSmoothScroll();
  initTypingEffect();

  // COMPONENTS
  new Carrossel("#projetos");
  new Carrossel("#certificados");
  initCertTechSlider();

});
