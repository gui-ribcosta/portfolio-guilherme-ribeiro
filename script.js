// ================= MOBILE NAV TOGGLE =================
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});

// Fecha o menu ao clicar em qualquer link
document.querySelectorAll('.mobile-nav a, .mobile-nav button').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });
});

// ================= TEMA ESCURO/CLARO =================
const themeButtons = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')];

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    // alterna ícones e tooltips
    btn.querySelector('i').classList.toggle('bx-sun');
    btn.querySelector('i').classList.toggle('bx-moon');
  });
});

// ================= TROCA DE IDIOMA =================
const langButtons = [document.getElementById('langToggle'), document.getElementById('langToggleMobile')];

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Função de tradução ainda não implementada');
  });
});

// ================= CARROSSEL =================
document.querySelectorAll('.carrossel').forEach(carrossel => {
  const track = carrossel.querySelector('.carrossel-track');
  const prevBtn = carrossel.querySelector('.carrossel-btn-prev');
  const nextBtn = carrossel.querySelector('.carousel-btn.next');
  const indicators = carrossel.querySelectorAll('.indicator');
  let index = 0;

  const update = () => {
    const width = track.children[0].offsetWidth + 40; // 40 = gap
    track.style.transform = `translateX(-${index * width}px)`;

    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === index);
    });
  };

  prevBtn.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : track.children.length - 1;
    update();
  });

  nextBtn.addEventListener('click', () => {
    index = (index < track.children.length - 1) ? index + 1 : 0;
    update();
  });

  indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => {
      index = i;
      update();
    });
  });
});
