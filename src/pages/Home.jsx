// ============================================================
// JINI MAGIC — Home Page (with Theme Selector)
// ============================================================

import { useEffect, useRef, useState } from 'react';
import GenieAvatar from '../components/GenieAvatar.jsx';

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
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.35,
      vy:    -0.2 - Math.random() * 0.45,
      size:  8 + Math.random() * 14,
      char:  CHARS[Math.floor(Math.random() * CHARS.length)],
      hue:   260 + Math.random() * 70,
      alpha: 0.08 + Math.random() * 0.28,
      pulse: Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x    += p.vx;
        p.y    += p.vy;
        p.pulse += 0.018;
        const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        if (p.y < -20)               p.y = canvas.height + 20;
        if (p.x < -20)               p.x = canvas.width  + 20;
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
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

// ─── Theme options ─────────────────────────────────────────
const THEMES = [
  {
    id:          'person',
    emoji:       '👤',
    label:       'Person',
    description: 'Real people, celebrities, historical figures',
    color:       '#a855f7',
    glow:        'rgba(168,85,247,0.35)',
    bg:          'rgba(168,85,247,0.1)',
    border:      'rgba(168,85,247,0.3)',
    examples:    ['Einstein', 'Beyoncé', 'Napoleon'],
  },
  {
    id:          'fictional',
    emoji:       '🎭',
    label:       'Character',
    description: 'Movies, TV shows, books, anime, games',
    color:       '#f59e0b',
    glow:        'rgba(245,158,11,0.35)',
    bg:          'rgba(245,158,11,0.1)',
    border:      'rgba(245,158,11,0.3)',
    examples:    ['Harry Potter', 'Batman', 'Goku'],
  },
  {
    id:          'animal',
    emoji:       '🐾',
    label:       'Animal',
    description: 'Wild animals, pets, creatures, extinct animals',
    color:       '#22c55e',
    glow:        'rgba(34,197,94,0.35)',
    bg:          'rgba(34,197,94,0.1)',
    border:      'rgba(34,197,94,0.3)',
    examples:    ['Lion', 'Dolphin', 'Penguin'],
  },
  {
    id:          'object',
    emoji:       '🏺',
    label:       'Object',
    description: 'Places, things, food, technology, landmarks',
    color:       '#3b82f6',
    glow:        'rgba(59,130,246,0.35)',
    bg:          'rgba(59,130,246,0.1)',
    border:      'rgba(59,130,246,0.3)',
    examples:    ['Eiffel Tower', 'iPhone', 'Pizza'],
  },
  {
    id:          'all',
    emoji:       '🌍',
    label:       'Everything',
    description: 'Mix of all categories — hardest mode!',
    color:       '#ec4899',
    glow:        'rgba(236,72,153,0.35)',
    bg:          'rgba(236,72,153,0.1)',
    border:      'rgba(236,72,153,0.3)',
    examples:    ['Anything goes!'],
    isSpecial:   true,
  },
];

// ─── Theme card ────────────────────────────────────────────
function ThemeCard({ theme, selected, onSelect, index }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + index * 80);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <button
      className={`tcard ${selected ? 'tcard--selected' : ''} ${theme.isSpecial ? 'tcard--special' : ''}`}
      onClick={() => onSelect(theme.id)}
      style={{
        '--t-color':  theme.color,
        '--t-glow':   theme.glow,
        '--t-bg':     theme.bg,
        '--t-border': theme.border,
        opacity:      visible ? 1 : 0,
        transform:    visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        transition:   `opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)`,
      }}
      aria-pressed={selected}
      aria-label={`Select ${theme.label} theme`}
    >
      {/* Selected checkmark */}
      {selected && (
        <div className="tcard__check">✓</div>
      )}

      {/* Emoji */}
      <div className="tcard__emoji">{theme.emoji}</div>

      {/* Label */}
      <h3 className="tcard__label">{theme.label}</h3>

      {/* Description */}
      <p className="tcard__desc">{theme.description}</p>

      {/* Examples */}
      <div className="tcard__examples">
        {theme.examples.map((ex, i) => (
          <span key={i} className="tcard__example">{ex}</span>
        ))}
      </div>

      {/* Glow overlay on select */}
      {selected && <div className="tcard__glow-overlay" />}

      <style>{`
        .tcard {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px 14px 16px;
          border-radius: 16px;
          border: 1px solid var(--t-border);
          background: var(--t-bg);
          cursor: pointer;
          text-align: center;
          overflow: hidden;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }

        .tcard:hover {
          transform: translateY(-4px) scale(1.02) !important;
          box-shadow: 0 8px 24px var(--t-glow);
          border-color: var(--t-color);
        }

        .tcard--selected {
          border-color: var(--t-color) !important;
          background: color-mix(in srgb, var(--t-bg) 100%, var(--t-color) 20%) !important;
          box-shadow:
            0 0 0 2px var(--t-color),
            0 8px 28px var(--t-glow) !important;
          transform: translateY(-3px) scale(1.02) !important;
        }

        .tcard--special {
          grid-column: 1 / -1;
          flex-direction: row;
          justify-content: center;
          gap: 14px;
          padding: 16px 24px;
        }

        .tcard--special .tcard__desc {
          margin: 0;
        }

        .tcard--special .tcard__examples {
          display: none;
        }

        .tcard__check {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--t-color);
          color: white;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: check-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .tcard__emoji {
          font-size: 36px;
          line-height: 1;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
          transition: transform 0.2s ease;
        }

        .tcard:hover .tcard__emoji {
          transform: scale(1.15) rotate(5deg);
        }

        .tcard__label {
          margin: 0;
          font-size: 15px;
          font-weight: 800;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
        }

        .tcard__desc {
          margin: 0;
          font-size: 11px;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        .tcard__examples {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 4px;
          margin-top: 2px;
        }

        .tcard__example {
          font-size: 10px;
          font-weight: 600;
          color: var(--t-color);
          background: color-mix(in srgb, var(--t-bg) 80%, var(--t-color) 20%);
          border: 1px solid var(--t-border);
          padding: 2px 7px;
          border-radius: 8px;
        }

        .tcard__glow-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 0%,
            color-mix(in srgb, var(--t-color) 15%, transparent),
            transparent 70%
          );
          pointer-events: none;
        }

        @keyframes check-pop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </button>
  );
}

// ─── Main Home component ───────────────────────────────────
export default function Home({
  onStart,
  stats,
  darkMode,
  toggleDarkMode,
  toggleSound,
  soundEnabled,
}) {
  const [step,       setStep]       = useState('landing'); // 'landing' | 'theme'
  const [selected,   setSelected]   = useState(null);
  const [heroIn,     setHeroIn]     = useState(false);
  const [contentIn,  setContentIn]  = useState(false);
  const [hovering,   setHovering]   = useState(false);
  const [themeIn,    setThemeIn]    = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroIn(true),    100);
    const t2 = setTimeout(() => setContentIn(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // When step changes to theme, animate in
  useEffect(() => {
    if (step === 'theme') {
      setThemeIn(false);
      const t = setTimeout(() => setThemeIn(true), 50);
      return () => clearTimeout(t);
    }
  }, [step]);

  const winRate = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  const handleThemeSelect = (themeId) => {
    setSelected(themeId);
  };

  const handleStartGame = () => {
    if (!selected) return;
    onStart(selected);
  };

  return (
    <div className="home">
      <ParticleCanvas />
      <div className="home__orb home__orb--1" aria-hidden="true" />
      <div className="home__orb home__orb--2" aria-hidden="true" />
      <div className="home__orb home__orb--3" aria-hidden="true" />

      {/* Header */}
      <header className="home__header">
        <div className="home__logo">
          <span className="home__logo-icon">🧞</span>
          <span className="home__logo-text">Jini Magic</span>
        </div>
        <div className="home__header-actions">
          <button className="home__icon-btn" onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute' : 'Sound on'}>
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button className="home__icon-btn" onClick={toggleDarkMode}
            aria-label="Toggle theme">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="home__main">

        {/* ── LANDING STEP ── */}
        {step === 'landing' && (
          <>
            {/* Genie */}
            <div className="home__genie-wrap" style={{
              opacity:    heroIn ? 1 : 0,
              transform:  heroIn ? 'translateY(0) scale(1)' : 'translateY(-30px) scale(0.8)',
              transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
            }}>
              <GenieAvatar mood={hovering ? 'excited' : 'idle'} size="xl" pulse />
              <div className="home__genie-label">
                <span className="home__genie-label-dot" />
                Ready to guess!
              </div>
            </div>

            {/* Title */}
            <div className="home__title-wrap" style={{
              opacity:    heroIn ? 1 : 0,
              transform:  heroIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}>
              <h1 className="home__title">
                <span className="home__title-jini">Jini</span>
                <span className="home__title-magic"> Magic</span>
              </h1>
              <div className="home__title-underline" />
            </div>

            {/* Subtitle */}
            <p className="home__subtitle" style={{
              opacity:    contentIn ? 1 : 0,
              transform:  contentIn ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              Think of <em>anything</em> — a person, character,
              animal, or object — and let the magic begin.
            </p>

            {/* Feature pills */}
            <div className="home__pills" style={{
              opacity:    contentIn ? 1 : 0,
              transition: 'opacity 0.5s ease 0.15s',
            }}>
              {[
                { icon: '🧠', text: '200+ characters' },
                { icon: '🎯', text: 'Smart AI guessing' },
                { icon: '📚', text: 'Learns from you' },
                { icon: '🌍', text: 'Everything & everyone' },
              ].map((p, i) => (
                <div key={i} className="home__pill">
                  <span>{p.icon}</span><span>{p.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              opacity:    contentIn ? 1 : 0,
              transform:  contentIn ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
            }}>
              <button
                className="home__cta"
                onClick={() => setStep('theme')}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <span className="home__cta-lamp">🪔</span>
                <span className="home__cta-text">Start the Magic</span>
                <span className="home__cta-arrow">→</span>
                <div className="home__cta-shimmer" />
              </button>
              <p className="home__cta-hint">
                Press <kbd>Enter</kbd> to continue
              </p>
            </div>

            {/* Stats */}
            {stats.gamesPlayed > 0 && (
              <div className="home__stats" style={{
                opacity:    contentIn ? 1 : 0,
                transition: 'opacity 0.5s ease 0.5s',
              }}>
                <p className="home__stats-title">Your Stats</p>
                <div className="home__stats-grid">
                  {[
                    { icon: '🎮', val: stats.gamesPlayed,       lbl: 'Games' },
                    { icon: '🏆', val: `${winRate}%`,            lbl: 'Win rate' },
                    { icon: '🔥', val: stats.streak,             lbl: 'Streak' },
                    { icon: '⚡', val: stats.fastestWin ?? '—',  lbl: 'Best' },
                  ].map((s, i) => (
                    <div key={i} className="home-stat">
                      <span className="home-stat__icon">{s.icon}</span>
                      <span className="home-stat__value">{s.val}</span>
                      <span className="home-stat__label">{s.lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── THEME SELECTOR STEP ── */}
        {step === 'theme' && (
          <div className="theme-selector" style={{
            opacity:    themeIn ? 1 : 0,
            transform:  themeIn ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.45s ease, transform 0.45s ease',
          }}>

            {/* Back button */}
            <button className="theme-back" onClick={() => setStep('landing')}>
              ← Back
            </button>

            {/* Genie small */}
            <div className="theme-genie">
              <GenieAvatar mood="asking" size="md" pulse />
            </div>

            {/* Header */}
            <div className="theme-header">
              <h2 className="theme-title">Choose Your Theme</h2>
              <p className="theme-subtitle">
                What category are you thinking of?
              </p>
            </div>

            {/* Theme grid */}
            <div className="theme-grid">
              {THEMES.map((theme, i) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  selected={selected === theme.id}
                  onSelect={handleThemeSelect}
                  index={i}
                />
              ))}
            </div>

            {/* Start button */}
            <div className="theme-actions">
              <button
                className={`theme-start-btn ${selected ? 'theme-start-btn--active' : ''}`}
                onClick={handleStartGame}
                disabled={!selected}
              >
                {selected ? (
                  <>
                    <span>
                      {THEMES.find(t => t.id === selected)?.emoji}
                    </span>
                    <span>
                      Start with {THEMES.find(t => t.id === selected)?.label}
                    </span>
                    <span>→</span>
                  </>
                ) : (
                  <>
                    <span>👆</span>
                    <span>Select a category above</span>
                  </>
                )}
                <div className="theme-start-shimmer" />
              </button>
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
            rgba(120,60,220,0.18) 0%, transparent 70%);
          animation: orb-drift 12s ease-in-out infinite;
        }
        .home__orb--2 {
          width: 400px; height: 400px;
          bottom: -100px; right: -80px;
          background: radial-gradient(circle,
            rgba(180,80,255,0.14) 0%, transparent 70%);
          animation: orb-drift 16s ease-in-out infinite reverse;
        }
        .home__orb--3 {
          width: 300px; height: 300px;
          top: 40%; left: 50%;
          transform: translate(-50%,-50%);
          background: radial-gradient(circle,
            rgba(100,40,200,0.10) 0%, transparent 70%);
          animation: orb-drift 10s ease-in-out infinite 3s;
        }

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

        .home__header-actions { display: flex; gap: 8px; }

        .home__icon-btn {
          width: 38px; height: 38px;
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
          background: rgba(160,100,255,0.15);
        }

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
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: label-dot-pulse 2s ease-in-out infinite;
        }

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
          width: 80px; height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #a855f7, #f59e0b);
          box-shadow: 0 0 10px rgba(168,85,247,0.5);
        }

        .home__subtitle {
          margin: 0;
          max-width: 400px;
          font-size: clamp(15px, 2.5vw, 18px);
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .home__subtitle em {
          font-style: normal;
          color: var(--color-accent-light);
          font-weight: 600;
        }

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
        }

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
          overflow: hidden;
          box-shadow:
            0 6px 24px rgba(124,58,237,0.45),
            inset 0 1px 0 rgba(255,255,255,0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .home__cta:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 36px rgba(124,58,237,0.55);
        }

        .home__cta:active { transform: scale(0.98); }
        .home__cta-lamp  { font-size: 22px; }
        .home__cta-arrow {
          font-size: 18px;
          transition: transform 0.2s ease;
        }
        .home__cta:hover .home__cta-arrow { transform: translateX(4px); }

        .home__cta-shimmer {
          position: absolute; inset: 0;
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

        .home__stats { display: flex; flex-direction: column; align-items: center; gap: 10px; }
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

        /* ── Theme selector ── */
        .theme-selector {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .theme-back {
          align-self: flex-start;
          padding: 7px 14px;
          border-radius: 10px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          color: var(--color-text-muted);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, color 0.2s ease;
        }
        .theme-back:hover {
          transform: translateX(-2px);
          color: var(--color-text-primary);
        }

        .theme-genie {
          animation: genie-drop 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .theme-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .theme-title {
          margin: 0;
          font-size: clamp(22px, 5vw, 30px);
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #e879f9, #a855f7, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .theme-subtitle {
          margin: 0;
          font-size: 14px;
          color: var(--color-text-muted);
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          width: 100%;
        }

        .theme-actions { width: 100%; }

        .theme-start-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px 24px;
          border-radius: 14px;
          border: none;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease,
                      background 0.3s ease, opacity 0.3s ease;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--color-text-muted);
        }

        .theme-start-btn--active {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          box-shadow: 0 6px 24px rgba(124,58,237,0.45);
          border-color: transparent;
        }

        .theme-start-btn--active:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(124,58,237,0.5);
        }

        .theme-start-btn:disabled {
          cursor: not-allowed;
        }

        .theme-start-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.12) 50%,
            transparent 70%
          );
          background-size: 200% 100%;
          animation: cta-shimmer 2.5s linear infinite;
        }

        /* ── Animations ── */
        @keyframes orb-drift {
          0%,100% { transform: translate(0,0); }
          33%     { transform: translate(30px,-20px); }
          66%     { transform: translate(-20px,15px); }
        }

        @keyframes label-dot-pulse {
          0%,100% { box-shadow: 0 0 6px #22c55e; }
          50%     { box-shadow: 0 0 12px #22c55e, 0 0 20px #22c55e55; }
        }

        @keyframes cta-shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        @keyframes genie-drop {
          from { opacity: 0; transform: translateY(-20px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 480px) {
          .home__main  { gap: 16px; padding: 16px 16px 32px; }
          .home__cta   { padding: 15px 28px; font-size: 16px; }
          .theme-grid  { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}