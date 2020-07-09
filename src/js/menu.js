(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const mobileMenuRef = document.querySelector('[data-menu]');
  const mobileMenuRefBullshit = document.querySelector('[data-menu-bullshit]');
  const mobileMenuRefHeroBullshit = document.querySelector(
    '[data-menu-hero-bullshit]',
  );

  menuBtnRef.addEventListener('click', () => {
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;

    menuBtnRef.classList.toggle('is-open');
    mobileMenuRefBullshit.classList.toggle('header--some-bullshit');
    mobileMenuRefHeroBullshit.classList.toggle('hero--some-bullshit');

    menuBtnRef.setAttribute('aria-expanded', !expanded);

    mobileMenuRef.classList.toggle('is-open');
  });
})();
