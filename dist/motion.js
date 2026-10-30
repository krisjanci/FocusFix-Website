(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.motion-toggle');
  let paused = preference.matches;

  function updateMotion() {
    document.documentElement.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
  }

  toggle.hidden = false;
  updateMotion();
  toggle.addEventListener('click', () => {
    paused = !paused;
    updateMotion();
  });
  preference.addEventListener('change', (event) => {
    paused = event.matches;
    updateMotion();
  });

  if ('IntersectionObserver' in window && !preference.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((section) => {
      section.classList.add('is-pending');
      observer.observe(section);
    });
  }
})();
