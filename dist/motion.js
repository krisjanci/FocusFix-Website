(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.motion-toggle');
  const demo = document.querySelector('.session-demo');
  const controls = document.querySelector('.demo-controls');
  if (!demo || !toggle || !controls) return;

  const steps = [...controls.querySelectorAll('[data-step]')];
  const label = demo.querySelector('[data-phase-label]');
  const timer = demo.querySelector('[data-timer]');
  const detail = demo.querySelector('[data-detail]');
  const work = demo.querySelector('[data-work-time]');
  const breaks = demo.querySelector('[data-break-count]');
  const caption = document.querySelector('[data-caption]');
  const notice = demo.querySelector('.break-notice');
  const phases = [
    { name: 'focus', duration: 6000, label: 'Working', detail: 'Session time', caption: 'Track time while you work.', start: 1496, end: 1500, progress: [74, 100], position: [8, 46] },
    { name: 'break', duration: 6000, label: 'On a break', detail: 'Break remaining', caption: 'Take a timed break. Work tracking pauses.', start: 120, end: 0, progress: [100, 0], position: [49, 68] },
    { name: 'return', duration: 5000, label: 'Working', detail: 'Session time', caption: 'Resume your session. Keep your progress.', start: 1500, end: 1504, progress: [0, 14], position: [71, 96] },
  ];
  let phaseIndex = 0;
  let elapsed = 0;
  let lastTime = null;
  let frame = null;
  let visible = true;
  let paused = preference.matches;

  function formatTime(seconds) {
    return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  }

  function render() {
    const phase = phases[phaseIndex];
    const fraction = Math.min(elapsed / phase.duration, 1);
    demo.dataset.phase = phase.name;
    notice.setAttribute('aria-hidden', String(phase.name !== 'break'));
    demo.style.setProperty('--progress', phase.progress[0] + (phase.progress[1] - phase.progress[0]) * fraction);
    demo.style.setProperty('--position', `${phase.position[0] + (phase.position[1] - phase.position[0]) * fraction}%`);
    label.textContent = phase.label;
    timer.textContent = formatTime(Math.round(phase.start + (phase.end - phase.start) * fraction));
    detail.textContent = phase.detail;
    work.textContent = phase.name === 'break' ? '25:00' : timer.textContent;
    breaks.textContent = phase.name === 'return' ? '1' : '0';
    caption.textContent = phase.caption;
    steps.forEach((step) => step.setAttribute('aria-pressed', String(step.dataset.step === phase.name)));
  }

  function tick(now) {
    frame = null;
    if (lastTime !== null) elapsed += Math.min(now - lastTime, 100);
    lastTime = now;
    if (elapsed >= phases[phaseIndex].duration) {
      phaseIndex = (phaseIndex + 1) % phases.length;
      elapsed = 0;
    }
    render();
    frame = requestAnimationFrame(tick);
  }

  function updatePlayback() {
    const playing = !paused && visible && !document.hidden;
    document.documentElement.classList.toggle('motion-paused', paused);
    demo.dataset.playing = String(playing);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Play animation' : 'Pause animation';
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = null;
    if (playing) frame = requestAnimationFrame(tick);
  }

  toggle.hidden = false;
  controls.hidden = false;
  render();
  updatePlayback();
  toggle.addEventListener('click', () => {
    paused = !paused;
    updatePlayback();
  });
  preference.addEventListener('change', (event) => {
    paused = event.matches;
    updatePlayback();
  });
  steps.forEach((step, index) => step.addEventListener('click', () => {
    phaseIndex = index;
    elapsed = 0;
    // Selecting a step holds it for inspection. Play resumes from that step.
    paused = true;
    render();
    updatePlayback();
  }));
  document.addEventListener('visibilitychange', updatePlayback);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.1 }).observe(demo);
  }
})();
