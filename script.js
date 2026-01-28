const toggle = document.querySelector('.mobile-toggle');
const mobileNav = document.querySelector('.mobile-nav');

toggle.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});


