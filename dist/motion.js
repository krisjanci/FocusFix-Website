(() => {
  const canvas = document.querySelector('.thread-canvas');
  const toggle = document.querySelector('.motion-toggle');
  if (!canvas || !toggle) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const label = document.querySelector('[data-art-label]');
  const number = document.querySelector('[data-art-number]');
  const toggleLabel = toggle.querySelector('[data-toggle-label]');
  const toggleSymbol = toggle.querySelector('.toggle-symbol');
  const strands = 64;
  const points = 112;
  const cycleLength = 22000;
  let elapsed = preference.matches ? 10800 : 0;
  let paused = preference.matches;
  let visible = true;
  let frame = null;
  let lastTime = null;
  let lastDraw = -Infinity;
  let size = 0;

  // All three sculptures share the same topology, so each thread morphs continuously.
  function point(shape, strand, t) {
    const u = strand / (strands - 1);
    const angle = t * Math.PI * 2;
    if (shape === 0) {
      const r = 122 + 64 * u;
      const twist = angle + u * 1.35;
      return [r * Math.cos(twist) + 44 * Math.sin(3 * angle + u * 3), 142 * Math.sin(angle) + 45 * Math.cos(2 * angle + u * 3) + (u - .5) * 72];
    }
    if (shape === 1) {
      const side = strand < strands / 2 ? -1 : 1;
      const v = (strand % (strands / 2)) / (strands / 2 - 1);
      return [side * 56 + (13 + v * 19) * Math.cos(angle) + 12 * Math.sin(angle * 2), (138 + v * 24) * Math.sin(angle)];
    }
    const r = 132 + u * 48;
    return [r * Math.cos(angle) + 15 * Math.sin(2 * angle), r * .82 * Math.sin(angle) + 10 * Math.cos(2 * angle)];
  }
  // Hold each form long enough to read; use a soft transition between them.
  function scene(time) {
    const t = time % cycleLength;
    if (t < 4000) return [0, 0, 0];
    if (t < 8500) return [0, 1, (t - 4000) / 4500];
    if (t < 12500) return [1, 1, 0];
    if (t < 17000) return [1, 2, (t - 12500) / 4500];
    if (t < 19500) return [2, 2, 0];
    return [2, 0, (t - 19500) / 2500];
  }
  function draw() {
    if (!size) return;
    const [from, to, fraction] = scene(elapsed);
    const blend = fraction * fraction * (3 - 2 * fraction);
    const active = blend < .5 ? from : to;
    label.textContent = ['Focus', 'Pause', 'Continue'][active];
    number.textContent = `0${active + 1}`;
    const openness = (from === 1 ? 1 - blend : 0) + (to === 1 ? blend : 0);
    document.documentElement.style.setProperty('--space', openness.toFixed(3));
    context.clearRect(0, 0, size, size);
    context.save();
    context.translate(size / 2, size / 2);
    context.scale(size / 490, size / 490);
    context.rotate(-.15 * (1 - openness));
    context.lineWidth = .65;
    for (let strand = 0; strand < strands; strand++) {
      const u = strand / (strands - 1);
      // Muted ink shades give the line field depth without glow or shadows.
      context.strokeStyle = `rgba(${Math.round(48 + u * 52)}, ${Math.round(84 + u * 25)}, ${Math.round(65 + u * 17)}, ${.32 + .22 * Math.sin(u * Math.PI)})`;
      context.beginPath();
      for (let i = 0; i <= points; i++) {
        const a = point(from, strand, i / points);
        const b = point(to, strand, i / points);
        const x = a[0] + (b[0] - a[0]) * blend;
        const y = a[1] + (b[1] - a[1]) * blend;
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.stroke();
    }
    context.restore();
  }
  function resize() {
    size = canvas.getBoundingClientRect().width;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * ratio);
    canvas.height = Math.round(size * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }
  function tick(now) {
    frame = null;
    if (lastTime !== null) elapsed += Math.min(now - lastTime, 100);
    lastTime = now;
    // 30fps is ample for this slow sculpture and avoids unnecessary canvas work.
    if (now - lastDraw >= 32) {
      draw();
      lastDraw = now;
    }
    frame = requestAnimationFrame(tick);
  }
  function updatePlayback() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = null;
    toggle.setAttribute('aria-pressed', String(paused));
    toggleLabel.textContent = paused ? 'Play motion' : 'Pause motion';
    toggleSymbol.textContent = paused ? '▷' : 'Ⅱ';
    if (!paused && visible && !document.hidden) frame = requestAnimationFrame(tick);
  }
  resize();
  document.documentElement.classList.add('art-ready');
  toggle.hidden = false;
  updatePlayback();
  toggle.addEventListener('click', () => {
    paused = !paused;
    updatePlayback();
  });
  preference.addEventListener('change', (event) => {
    paused = event.matches;
    if (paused) {
      elapsed = 10800;
      draw();
    }
    updatePlayback();
  });
  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', updatePlayback);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: .05 }).observe(canvas);
  }
})();
