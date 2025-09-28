// Entry point
(() => {
  const doc = document;

  // Sequential headline reveal
  const revealHeadline = () => {
    const h1 = doc.querySelector('.inevitable-headline');
    if (!h1) return;
    const text = h1.textContent || '';
    const parts = text.trim().split(/\s+/);
    h1.innerHTML = parts
      .map((w, i) => `<span class="reveal" style="--d:${i}">${w}</span>`) 
      .join(' ');
    h1.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.display = 'inline-block';
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      setTimeout(() => {
        el.style.transition = 'opacity 500ms ease, transform 500ms ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80 * i);
    });
  };

  // Metric count-up
  const startCountUps = () => {
    const metrics = Array.from(doc.querySelectorAll('.hero-metrics .metric'));
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const durationMs = prefersReduced ? 400 : 1400;
    const ease = t => 1 - Math.pow(1 - t, 3);
    const format = (value, suffix) => {
      if (suffix === '%') return `${Math.round(value)}%`;
      if (suffix === 'B+') return `$${value.toFixed(0)}B+`;
      if (suffix === '-Month') return `${value.toFixed(0)}-Month`;
      return `${value.toFixed(0)}${suffix ?? ''}`;
    };
    const go = (node) => {
      const target = parseFloat(node.getAttribute('data-countup') || '0');
      const suffix = node.getAttribute('data-suffix') || '';
      const start = performance.now();
      const step = now => {
        const t = Math.min(1, (now - start) / durationMs);
        const v = ease(t) * target;
        node.textContent = format(v, suffix);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // Observe when metrics enter viewport
    const container = doc.querySelector('.hero-metrics');
    if (!container) return;
    const once = { hasRun: false };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !once.hasRun) {
          once.hasRun = true;
          metrics.forEach(go);
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(container);
  };

  // Subtle grid animation in canvas
  const initHeroGrid = () => {
    const canvas = /** @type {HTMLCanvasElement|null} */(doc.getElementById('heroGrid'));
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (t) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalAlpha = 0.8;
      const spacing = 28;
      const phase = (t / 16000) % 1;
      const offset = Math.sin(phase * Math.PI * 2) * 6;
      ctx.strokeStyle = getComputedStyle(doc.documentElement).getPropertyValue('--grid');
      ctx.lineWidth = 1;
      for (let x = -100; x < width + 100; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, height);
        ctx.stroke();
      }
      for (let y = -100; y < height + 100; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(width, y + offset);
        ctx.stroke();
      }
      // subtle particles
      const particles = 24;
      for (let i = 0; i < particles; i++) {
        const px = ((i * 131 + t * 0.05) % (width + 200)) - 100;
        const py = ((i * 197 + t * 0.03) % (height + 200)) - 100;
        ctx.fillStyle = 'rgba(125, 211, 252, 0.35)';
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };
    let raf = requestAnimationFrame(draw);
    const onVis = () => { if (doc.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(draw); };
    const onRm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncRM = () => {
      if (onRm.matches) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('resize', resize);
    doc.addEventListener('visibilitychange', onVis);
    onRm.addEventListener('change', syncRM);
  };

  // Init
  window.addEventListener('DOMContentLoaded', () => {
    revealHeadline();
    startCountUps();
    initHeroGrid();

    // Scroll reveal for thesis grid
    const revealTargets = document.querySelectorAll('.reveal-on-scroll');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.2 });
    revealTargets.forEach(el => io.observe(el));

    // Countups inside thesis
    const thesisNumbers = document.querySelectorAll('.impact-number');
    const formatImpact = (value, suffix) => {
      if (suffix === '%') return `${value.toFixed(0)}%`;
      if (suffix === 'B') return `$${value.toFixed(0)}B`;
      if (suffix === '–36') return `${value.toFixed(0)}–36`;
      return `${value.toFixed(0)}${suffix ?? ''}`;
    };
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-countup') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const durationMs = prefersReduced ? 300 : 1200;
        const ease = t => 1 - Math.pow(1 - t, 3);
        const start = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - start) / durationMs);
          el.textContent = formatImpact(ease(t) * target, suffix);
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io2.unobserve(el);
      });
    }, { threshold: 0.4 });
    thesisNumbers.forEach(el => io2.observe(el));

    // Ecosystem SVG connections and particle flow
    const svg = document.querySelector('.ecosystem-connections');
    const cards = document.querySelectorAll('.subsidiary-card');
    const hub = document.querySelector('.central-hub .hub-core');
    if (svg && cards.length && hub) {
      const svgns = 'http://www.w3.org/2000/svg';
      const update = () => {
        const rect = svg.parentElement.getBoundingClientRect();
        svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
        svg.setAttribute('width', `${rect.width}`);
        svg.setAttribute('height', `${rect.height}`);
        svg.innerHTML = '';
        const hubRect = hub.getBoundingClientRect();
        const hx = hubRect.left + hubRect.width / 2 - rect.left;
        const hy = hubRect.top + hubRect.height / 2 - rect.top;
        cards.forEach((card, i) => {
          const cr = card.getBoundingClientRect();
          const cx = cr.left + cr.width / 2 - rect.left;
          const cy = cr.top + cr.height / 2 - rect.top;
          const path = document.createElementNS(svgns, 'path');
          const d = `M ${hx} ${hy} C ${hx} ${(hy+cy)/2} ${cx} ${(hy+cy)/2} ${cx} ${cy}`;
          path.setAttribute('d', d);
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', 'rgba(125, 211, 252, 0.45)');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('stroke-linecap', 'round');
          path.style.strokeDasharray = '6 8';
          svg.appendChild(path);

          // animated particle along path
          const circle = document.createElementNS(svgns, 'circle');
          circle.setAttribute('r', '2');
          circle.setAttribute('fill', 'rgba(199, 242, 132, 0.9)');
          svg.appendChild(circle);
          let start = performance.now();
          const duration = 2800 + (i * 400);
          const tick = (t) => {
            const prog = ((t - start) % duration) / duration;
            const len = path.getTotalLength();
            const pt = path.getPointAtLength(len * prog);
            circle.setAttribute('cx', `${pt.x}`);
            circle.setAttribute('cy', `${pt.y}`);
            req = requestAnimationFrame(tick);
          };
          let req = requestAnimationFrame(tick);
        });
      };
      const io3 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            update();
            window.addEventListener('resize', update);
          }
        });
      }, { threshold: 0.2 });
      io3.observe(svg);
    }

    // Validation: metric count-ups in case studies and dashboard
    const caseNumbers = document.querySelectorAll('.case-metrics .metric-large');
    const dashValues = document.querySelectorAll('.dashboard-metrics .metric-value');
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const animateNum = (el, target, suffix = '') => {
      const start = performance.now();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = prefersReduced ? 400 : 1200;
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const v = easeOut(t) * target;
        const sfx = suffix;
        if (sfx === 'B') el.textContent = `$${v.toFixed(1)}B`;
        else if (sfx === '%') el.textContent = `${v.toFixed(0)}%`;
        else if (sfx === 'T') el.textContent = `${v.toFixed(1)}T`;
        else el.textContent = `${v.toFixed(0)}`;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io4 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || el.getAttribute('data-countup') || '0');
        const suffix = el.getAttribute('data-suffix') || el.getAttribute('data-suffix');
        animateNum(el, target, suffix || '');
        io4.unobserve(el);
      });
    }, { threshold: 0.3 });
    caseNumbers.forEach(el => io4.observe(el));
    dashValues.forEach(el => io4.observe(el));
  });
})();
