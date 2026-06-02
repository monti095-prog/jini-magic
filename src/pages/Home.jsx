// ============================================================
// JINI MAGIC — Home Page
// Landing page with animated genie, particles, and stats
// ============================================================

import { useEffect, useRef, useState } from 'react';
import GenieAvatar from '../components/GenieAvatar.jsx';

// ─── Particle canvas background ───────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const CHARS = ['✦', '✧', '⋆', '·', '✺', '◆', '○', '✸'];
    const particles = Array.from({ length: 55 }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      vx:   (Math.random() - 0.5) * 0.35,
      vy:   -0.2 - Math.random() * 0.45,
      size: 8 + Math.random() * 14,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      hue:  260 + Math.random() * 70,
      alpha: 0.08 + Math.random() * 0.28,
      pulse: Math.random() * Math.PI * 2,
    }));

    let raf;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach(p => {
        p.x    += p.vx;
        p.y    += p.vy;
        p.pulse += 0.018;

        const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

        if (p.y < -20)            p.y = canvas.height + 20;
        if (p.x < -20)            p.x = canvas.width  + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.save();
        ctx.font        = `${p.size}px serif`;
        ctx.fillStyle   = `hsla(${p.hue}, 75%, 72%, ${alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 80%, 70%, ${alpha * 0.8})`;
        ctx.shadowBlur  = 8;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

// ─── Stat card ─────────────────────────────────────────────
function StatCard({ icon, value, label, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="home-stat"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)`,
      }}
    >
      <span className="home-stat__icon">{icon}</span>
      <span className="home-stat__value">{value}</span>
      <span className="home-stat__label">{label}</span>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────
export default function Home({ onStart, stats, darkMode, toggleDarkMode, toggleSound, soundEnabled }) {
  const [heroIn,    setHeroIn]    = useState(false);
  const [subtitleIn, setSubtitleIn] = useState(false);
  const [btnIn,     setBtnIn]     = useState(false);
  const [hovering,  setHovering]  = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroIn(true),     100);
    const t2 = setTimeout(() => setSubtitleIn(true), 500);
    const t3 = setTimeout(() => setBtnIn(true),      800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const winRate = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  return (
    <div className="home">
      {/* Background particles */}
      <ParticleCanvas />

      {/* Background gradient orbs */}
      <div className="home__orb home__orb--1" aria-hidden="true" />
      <div className="home__orb home__orb--2" aria-hidden="true" />
      <div className="home__orb home__orb--3" aria-hidden="true" />

      {/* Top bar */}
      <header className="home__header">
        <div className="home__logo">
          <span className="home__logo-icon">🧞</span>
          <span className="home__logo-text">Jini Magic</span>
        </div>
        <div className="home__header-actions">
          <button
            className="home__icon-btn"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            title={soundEnabled ? 'Mute' : 'Sound on'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button
            className="home__icon-btn"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Light mode' : 'Dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Hero section */}
      <main className="home__main">

        {/* Genie avatar */}
        <div
          className="home__genie-wrap"
          style={{
            opacity:   heroIn ? 1 : 0,
            transform: heroIn ? 'translateY(0) scale(1)' : 'translateY(-30px) scale(0.8)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <GenieAvatar
            mood={hovering ? 'excited' : 'idle'}
            size="xl"
            pulse
          />

          {/* Floating label */}
          <div className="home__genie-label">
            <span className="home__genie-label-dot" />
            Ready to guess!
          </div>
        </div>

        {/* Title */}
        <div
          className="home__title-wrap"
          style={{
            opacity:   heroIn ? 1 : 0,
            transform: heroIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          <h1 className="home__title">
            <span className="home__title-jini">Jini</span>
            <span className="home__title-magic"> Magic</span>
          </h1>
          <div className="home__title-underline" />
        </div>

        {/* Subtitle */}
        <p
          className="home__subtitle"
          style={{
            opacity:   subtitleIn ? 1 : 0,
            transform: subtitleIn ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          Think of <em>anything</em> — a person, character,
          animal, or object — and let the magic begin.
        </p>

        {/* Feature pills */}
        <div
          className="home__pills"
          style={{
            opacity:   subtitleIn ? 1 : 0,
            transition: 'opacity 0.5s ease 0.2s',
          }}
        >
          {[
            { icon: '🧠', text: '200+ characters' },
            { icon: '🎯', text: 'Smart AI guessing' },
            { icon: '📚', text: 'Learns from you' },
            { icon: '🌍', text: 'Everything & everyone' },
          ].map((p, i) => (
            <div key={i} className="home__pill">
              <span>{p.icon}</span>
              <span>{p.text}</span>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div
          style={{
            opacity:   btnIn ? 1 : 0,
            transform: btnIn ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
            transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <button
            className="home__cta"
            onClick={onStart}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            aria-label="Start the guessing game"
          >
            <span className="home__cta-lamp">🪔</span>
            <span className="home__cta-text">Start the Magic</span>
            <span className="home__cta-arrow">→</span>
            <div className="home__cta-shimmer" />
          </button>

          <p className="home__cta-hint">
            Press <kbd>Enter</kbd> to start
          </p>
        </div>

        {/* Stats row */}
        {stats.gamesPlayed > 0 && (
          <div className="home__stats">
            <p className="home__stats-title">Your Stats</p>
            <div className="home__stats-grid">
              <StatCard icon="🎮" value={stats.gamesPlayed}  label="Games"    delay={900} />
              <StatCard icon="🏆" value={`${winRate}%`}      label="Win rate" delay={1000} />
              <StatCard icon="🔥" value={stats.streak}       label="Streak"   delay={1100} />
              <StatCard icon="⚡" value={stats.fastestWin ?? '—'} label="Best" delay={1200} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="home__footer">
        <span>✨ Powered by Jini AI</span>
        <span className="home__footer-dot">·</span>
        <span>Think of anything</span>
      </footer>

      <style>{`
        .home {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--color-bg);
        }

        /* ── Orbs ── */
        .home__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .home__orb--1 {
          width: 500px; height: 500px;
          top: -180px; left: -120px;
          background: radial-gradient(circle,
            rgba(120, 60, 220, 0.18) 0%,
            transparent 70%);
          animation: orb-drift 12s ease-in-out infinite;
        }
        .home__orb--2 {
          width: 400px; height: 400px;
          bottom: -100px; right: -80px;
          background: radial-gradient(circle,
            rgba(180, 80, 255, 0.14) 0%,
            transparent 70%);
          animation: orb-drift 16s ease-in-out infinite reverse;
        }
        .home__orb--3 {
          width: 300px; height: 300px;
          top: 40%; left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle,
            rgba(100, 40, 200, 0.10) 0%,
            transparent 70%);
          animation: orb-drift 10s ease-in-out infinite 3s;
        }

        /* ── Header ── */
        .home__header {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
        }

        .home__logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .home__logo-icon { font-size: 22px; }

        .home__logo-text {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #c084fc, #a855f7, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .home__header-actions {
          display: flex;
          gap: 8px;
        }

        .home__icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          backdrop-filter: blur(8px);
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s ease, background 0.2s ease;
        }

        .home__icon-btn:hover {
          transform: scale(1.08);
          background: rgba(160, 100, 255, 0.15);
        }

        /* ── Main ── */
        .home__main {
          position: relative;
          z-index: 5;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 22px;
          padding: 20px 24px 40px;
          text-align: center;
        }

        /* ── Genie wrap ── */
        .home__genie-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .home__genie-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-muted);
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          padding: 4px 12px;
          border-radius: 20px;
          backdrop-filter: blur(8px);
        }

        .home__genie-label-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: label-dot-pulse 2s ease-in-out infinite;
        }

        /* ── Title ── */
        .home__title-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .home__title {
          margin: 0;
          font-size: clamp(42px, 10vw, 72px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .home__title-jini {
          background: linear-gradient(135deg, #e879f9, #a855f7, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .home__title-magic {
          background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .home__title-underline {
          width: 80px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #a855f7, #f59e0b);
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }

        /* ── Subtitle ── */
        .home__subtitle {
          margin: 0;
          max-width: 400px;
          font-size: clamp(15px, 2.5vw, 18px);
          color: var(--color-text-secondary);
          line-height: 1.6;
          font-weight: 400;
        }

        .home__subtitle em {
          font-style: normal;
          color: var(--color-accent-light);
          font-weight: 600;
        }

        /* ── Pills ── */
        .home__pills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .home__pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-secondary);
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          backdrop-filter: blur(8px);
          letter-spacing: 0.01em;
        }

        /* ── CTA ── */
        .home__cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 40px;
          border-radius: 16px;
          border: none;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #9333ea 100%);
          color: white;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.01em;
          overflow: hidden;
          box-shadow:
            0 6px 24px rgba(124, 58, 237, 0.45),
            0 2px 6px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .home__cta:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow:
            0 12px 36px rgba(124, 58, 237, 0.55),
            0 4px 10px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .home__cta:active {
          transform: translateY(0) scale(0.98);
        }

        .home__cta-lamp   { font-size: 22px; }
        .home__cta-text   { font-size: 17px; }
        .home__cta-arrow  {
          font-size: 18px;
          transition: transform 0.2s ease;
        }
        .home__cta:hover .home__cta-arrow {
          transform: translateX(4px);
        }

        .home__cta-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.15) 50%,
            transparent 70%
          );
          background-size: 200% 100%;
          animation: cta-shimmer 2.5s linear infinite;
        }

        .home__cta-hint {
          margin: 8px 0 0;
          font-size: 12px;
          color: var(--color-text-muted);
          text-align: center;
        }

        .home__cta-hint kbd {
          display: inline-block;
          padding: 1px 6px;
          border-radius: 4px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          font-size: 11px;
          font-family: monospace;
          color: var(--color-text-secondary);
        }

        /* ── Stats ── */
        .home__stats {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .home__stats-title {
          margin: 0;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-text-muted);
        }

        .home__stats-grid {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .home-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 12px 18px;
          border-radius: 12px;
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          backdrop-filter: blur(8px);
          min-width: 70px;
        }

        .home-stat__icon  { font-size: 16px; }
        .home-stat__value {
          font-size: 20px;
          font-weight: 800;
          color: var(--color-text-primary);
          line-height: 1.1;
        }
        .home-stat__label {
          font-size: 10px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── Footer ── */
        .home__footer {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          font-size: 12px;
          color: var(--color-text-muted);
        }

        .home__footer-dot { opacity: 0.4; }

        /* ── Animations ── */
        @keyframes orb-drift {
          0%,100% { transform: translate(0, 0); }
          33%     { transform: translate(30px, -20px); }
          66%     { transform: translate(-20px, 15px); }
        }

        @keyframes label-dot-pulse {
          0%,100% { box-shadow: 0 0 6px #22c55e; }
          50%     { box-shadow: 0 0 12px #22c55e, 0 0 20px #22c55e55; }
        }

        @keyframes cta-shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .home__main     { gap: 16px; padding: 16px 16px 32px; }
          .home__cta      { padding: 15px 28px; font-size: 16px; }
          .home__pills    { gap: 6px; }
          .home__pill     { font-size: 11px; padding: 4px 10px; }
        }
      `}</style>
    </div>
  );
}