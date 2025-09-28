"use client";

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Inline the essentials from scripts/main.js adapted for React lifecycle
    const doc = document;

    const revealHeadline = () => {
      const h1 = doc.querySelector('.inevitable-headline');
      if (!h1) return;
      const text = h1.textContent || '';
      const parts = text.trim().split(/\s+/);
      h1.innerHTML = parts.map((w, i) => `<span class="reveal" style="--d:${i}">${w}</span>`).join(' ');
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

    const scrollReveals = () => {
      const revealTargets = document.querySelectorAll('.reveal-on-scroll');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
      }, { threshold: 0.2 });
      revealTargets.forEach(el => io.observe(el));
    };

    const thesisCountups = () => {
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
    };

    const ecosystemConnections = () => {
      const svg = document.querySelector('.ecosystem-connections');
      const cards = document.querySelectorAll('.subsidiary-card');
      const hub = document.querySelector('.central-hub .hub-core');
      if (!(svg && cards.length && hub)) return;
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
    };

    const validationCountups = () => {
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
    };

    revealHeadline();
    startCountUps();
    initHeroGrid();
    scrollReveals();
    thesisCountups();
    ecosystemConnections();
    validationCountups();
  }, []);

  return (
    <main id="content" tabIndex={-1}>
      <section id="hero" className="hero-inevitability">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="inevitable-headline" aria-live="polite">
              ARCHITECTS OF <span className="emphasis">ECONOMIC</span> INEVITABILITY
            </h1>
            <p className="hero-thesis">Infrastructure transformation will occur. Strategic advantage belongs to those who architect it first.</p>
            <div className="hero-cta">
              <button className="cta-primary" data-action="open-assessment">Assess Infrastructure Advantage</button>
              <span className="qualification-note">Fortune 500+ enterprises only</span>
            </div>
            <div className="hero-metrics" aria-label="Key metrics">
              <div className="metric" data-countup="180" data-suffix="B+">$0</div>
              <div className="metric" data-countup="47" data-suffix="%">0%</div>
              <div className="metric" data-countup="18" data-suffix="-Month">0</div>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <canvas id="heroGrid"></canvas>
          </div>
        </div>
      </section>

      <section id="research" className="infrastructure-reality section-pad">
        <div className="thesis-container">
          <h2>The Infrastructure Inevitability</h2>
          <div className="reality-grid reveal-on-scroll">
            <div className="reality-point">
              <div className="impact-number" data-countup="47" data-suffix="B">$0</div>
              <p>Annual losses from legacy infrastructure failures</p>
            </div>
            <div className="reality-point">
              <div className="impact-number" data-countup="18" data-suffix="–36">0</div>
              <p>Months average enterprise modernization timeline</p>
            </div>
            <div className="reality-point">
              <div className="impact-number" data-countup="400" data-suffix="%">0%</div>
              <p>Performance improvement with strategic architecture</p>
            </div>
          </div>
          <div className="thesis-statement">
            <blockquote>
              "Every Fortune 500 enterprise will undergo infrastructure transformation within the next decade. Strategic advantage belongs to those who architect this inevitability rather than react to it."
            </blockquote>
          </div>
        </div>
      </section>

      <section id="ecosystem" className="archonium-ecosystem section-pad">
        <div className="ecosystem-header">
          <h2>The ARCHONIUM Forge</h2>
          <p>Specialized entities engineered for surgical precision in infrastructure transformation</p>
        </div>
        <div className="ecosystem-visualization">
          <div className="central-hub">
            <div className="hub-core">ARCHONIUM</div>
            <div className="hub-subtitle">Strategic Orchestration</div>
          </div>
          <div className="subsidiary-card active aegis" data-node="aegis">
            <div className="subsidiary-header">
              <h3>AEGIS</h3>
              <span className="status active">ACTIVE</span>
            </div>
            <p className="subsidiary-function">Financial Infrastructure Forensics</p>
            <div className="subsidiary-metrics">
              <div className="metric">127 Systems Analyzed</div>
              <div className="metric">$2.4B Risk Identified</div>
              <div className="metric">23 Critical Reports</div>
            </div>
          </div>
          <div className="subsidiary-card active noumenon" data-node="noumenon">
            <div className="subsidiary-header">
              <h3>NOUMENON</h3>
              <span className="status active">ACTIVE</span>
            </div>
            <p className="subsidiary-function">Universal Logic Layer Engineering</p>
            <div className="subsidiary-metrics">
              <div className="metric">12 ULL Deployments</div>
              <div className="metric">400% Efficiency Gains</div>
              <div className="metric">100% Client Retention</div>
            </div>
          </div>
          <div className="subsidiary-card planned energy" data-node="energy">
            <div className="subsidiary-header">
              <h3>[ENERGY ENTITY]</h3>
              <span className="status planned">IN DEVELOPMENT</span>
            </div>
            <p className="subsidiary-function">Power Grid Infrastructure</p>
            <div className="subsidiary-timeline">Launch: Q3 2028</div>
          </div>
          <svg className="ecosystem-connections" aria-hidden="true"></svg>
          <div className="expansion-indicator">
            <div className="expansion-dots" aria-hidden="true">...</div>
            <span>Infinite Scalability</span>
          </div>
        </div>
      </section>

      <section id="methodology" className="archonium-methodology section-pad">
        <h2>Infrastructure Transformation Methodology</h2>
        <div className="methodology-flow">
          <div className="phase-step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Strategic Analysis</h3>
              <p>ARCHONIUM identifies systemic vulnerabilities and competitive infrastructure opportunities</p>
              <div className="step-deliverable">Market Architecture Assessment</div>
            </div>
          </div>
          <div className="process-arrow" aria-hidden="true"></div>
          <div className="phase-step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Forensic Investigation</h3>
              <p>AEGIS conducts deep technical analysis, quantifying risks and creating urgency for transformation</p>
              <div className="step-deliverable">Infrastructure Risk Quantification (IRQ)</div>
            </div>
          </div>
          <div className="process-arrow" aria-hidden="true"></div>
          <div className="phase-step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Solution Architecture</h3>
              <p>NOUMENON engineers precise implementation of Universal Logic Layer, creating sustainable advantage</p>
              <div className="step-deliverable">ULL Implementation & Integration</div>
            </div>
          </div>
          <div className="process-arrow" aria-hidden="true"></div>
          <div className="phase-step">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>Continuous Optimization</h3>
              <p>Ongoing refinement and expansion of infrastructure advantage through ecosystem evolution</p>
              <div className="step-deliverable">Perpetual Competitive Advantage</div>
            </div>
          </div>
        </div>
      </section>

      <section id="validation" className="proof-validation section-pad">
        <h2>Strategic Impact Validation</h2>
        <div className="case-studies">
          <div className="case-study financial">
            <div className="case-header">
              <h3>Global Banking Infrastructure</h3>
              <span className="case-type">Conceptual Analysis</span>
            </div>
            <div className="case-metrics">
              <div className="metric-large" data-countup="2.4" data-suffix="B">$0</div>
              <p>Legacy vulnerability exposure identified</p>
            </div>
            <div className="case-outcome">
              <p>AEGIS analysis revealed critical COBOL dependencies affecting 40% of daily transaction volume. Projected ULL implementation would reduce risk exposure by 89% while increasing processing efficiency by 340%.</p>
            </div>
          </div>
          <div className="case-study infrastructure">
            <div className="case-header">
              <h3>Fortune 100 Payment Processing</h3>
              <span className="case-type">Implementation Projection</span>
            </div>
            <div className="case-metrics">
              <div className="metric-large" data-countup="400" data-suffix="%">0%</div>
              <p>Projected efficiency improvement</p>
            </div>
            <div className="case-outcome">
              <p>NOUMENON ULL deployment would create standardized API layer over legacy mainframe, enabling real-time processing capabilities and reducing operational costs by $847M annually.</p>
            </div>
          </div>
        </div>
        <div className="global-dashboard">
          <h3>Global Infrastructure Intelligence</h3>
          <div className="dashboard-metrics">
            <div className="live-metric">
              <span className="metric-label">Systems Under Analysis</span>
              <span className="metric-value" data-target="2847">0</span>
            </div>
            <div className="live-metric">
              <span className="metric-label">Critical Vulnerabilities Identified</span>
              <span className="metric-value" data-target="15692">0</span>
            </div>
            <div className="live-metric">
              <span className="metric-label">Infrastructure Value Protected</span>
              <span className="metric-value" data-target="4.2" data-suffix="T">0</span>
            </div>
          </div>
          <div className="world-infrastructure-map" aria-hidden="true"></div>
        </div>
      </section>

      <section id="partnership" className="partnership-gateway section-pad">
        <div className="partnership-content">
          <h2>Strategic Infrastructure Partnership</h2>
          <p className="partnership-philosophy">Partnership with ARCHONIUM is by strategic alignment, not application. We architect inevitable transformation for enterprises ready to lead their industries.</p>
          <div className="partnership-qualification">
            <h3>Partnership Criteria</h3>
            <div className="criteria-grid">
              <div className="criterion">
                <div className="criterion-icon">$</div>
                <p>$1B+ annual revenue</p>
              </div>
              <div className="criterion">
                <div className="criterion-icon">⚡</div>
                <p>Legacy infrastructure dependency</p>
              </div>
              <div className="criterion">
                <div className="criterion-icon">🎯</div>
                <p>Strategic transformation authority</p>
              </div>
              <div className="criterion">
                <div className="criterion-icon">🚀</div>
                <p>Competitive advantage focus</p>
              </div>
            </div>
          </div>
          <div className="assessment-gateway">
            <button className="cta-assessment">Begin Infrastructure Assessment</button>
            <p className="assessment-note">Comprehensive analysis requires 15-20 minutes. Results reviewed by ARCHONIUM strategic team.</p>
          </div>
          <div className="contact-alternative">
            <h4>Direct Strategic Inquiry</h4>
            <p>For infrastructure transformation discussions:</p>
            <a href="mailto:partnership@archonium.com" className="contact-email">partnership@archonium.com</a>
          </div>
        </div>
      </section>
    </main>
  );
}

