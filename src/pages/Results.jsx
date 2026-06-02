// ============================================================
// JINI MAGIC — Results / Learning Page
// Shown after game ends: win celebration or learning mode
// ============================================================

import { useEffect, useState, useRef } from 'react';
import GenieAvatar from '../components/GenieAvatar.jsx';

// ─── Win celebration fireworks ─────────────────────────────
function Fireworks({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = [
      '#a855f7','#f59e0b','#22c55e',
      '#3b82f6','#ec4899','#ffd700',
      '#c084fc','#fb923c',
    ];

    class Particle {
      constructor(x, y, color) {
        this.x     = x;
        this.y     = y;
        this.vx    = (Math.random() - 0.5) * 8;
        this.vy    = (Math.random() - 0.5) * 8 - 3;
        this.alpha = 1;
        this.color = color;
        this.size  = 2 + Math.random() * 3;
        this.decay = 0.012 + Math.random() * 0.008;
      }
      update() {
        this.x     += this.vx;
        this.y     += this.vy;
        this.vy    += 0.15;
        this.alpha -= this.decay;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle   = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = 6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    let particles = [];
    let raf;

    const burst = (x, y) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    // Initial bursts
    setTimeout(() => burst(canvas.width * 0.3, canvas.height * 0.4), 0);
    setTimeout(() => burst(canvas.width * 0.7, canvas.height * 0.35), 200);
    setTimeout(() => burst(canvas.width * 0.5, canvas.height * 0.3),  450);
    setTimeout(() => burst(canvas.width * 0.2, canvas.height * 0.5),  700);
    setTimeout(() => burst(canvas.width * 0.8, canvas.height * 0.45), 900);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => { p.update(); p.draw(); });
      if (particles.length > 0) {
        raf = requestAnimationFrame(draw);
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
      }}
      aria-hidden="true"
    />
  );
}

// ─── Learning form ─────────────────────────────────────────
function LearningForm({ learnName, setLearnName, onSubmit, onSkip, answers }) {
  const [step,       setStep]       = useState(1);
  const [submitted,  setSubmitted]  = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (step === 1 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleSubmit = () => {
    if (!learnName.trim()) return;
    setSubmitted(true);
    setTimeout(() => onSubmit(), 800);
  };

  return (
    <div className="lform">
      <div className="lform__header">
        <div className="lform__icon">📚</div>
        <h2 className="lform__title">Help me learn!</h2>
        <p className="lform__subtitle">
          I couldn't guess it this time, but I want to get better.
          What were you thinking of?
        </p>
      </div>

      {!submitted ? (
        <>
          {/* Step 1: Name */}
          <div className="lform__field">
            <label className="lform__label" htmlFor="learn-name">
              <span>✏️</span> What was it?
            </label>
            <input
              id="learn-name"
              ref={inputRef}
              className="lform__input"
              type="text"
              value={learnName}
              onChange={e => setLearnName(e.target.value)}
              placeholder="e.g. Albert Einstein, a submarine..."
              maxLength={60}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              aria-label="What were you thinking of?"
            />
            <span className="lform__char-count">
              {learnName.length}/60
            </span>
          </div>

          {/* Summary of session answers */}
          {answers.length > 0 && (
            <div className="lform__summary">
              <p className="lform__summary-title">
                🧠 I'll remember these clues about it:
              </p>
              <div className="lform__clues">
                {answers.slice(0, 6).map((a, i) => (
                  <div key={i} className="lform__clue">
                    <span className="lform__clue-q">{a.question}</span>
                    <span className={`lform__clue-a lform__clue-a--${a.answer}`}>
                      {a.answer.replace('_', ' ')}
                    </span>
                  </div>
                ))}
                {answers.length > 6 && (
                  <p className="lform__clue-more">
                    +{answers.length - 6} more clues stored
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="lform__actions">
            <button
              className="lform__btn lform__btn--primary"
              onClick={handleSubmit}
              disabled={!learnName.trim()}
            >
              <span>🧞</span> Teach Jini
            </button>
            <button
              className="lform__btn lform__btn--secondary"
              onClick={onSkip}
            >
              Skip for now
            </button>
          </div>
        </>
      ) : (
        <div className="lform__success">
          <div className="lform__success-icon">✨</div>
          <p className="lform__success-text">
            Got it! I'll remember <strong>{learnName}</strong> next time!
          </p>
        </div>
      )}

      <style>{`
        .lform {
          width: 100%;
          max-width: 460px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .lform__header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .lform__icon {
          font-size: 40px;
          animation: learn-icon-bounce 1s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .lform__title {
          margin: 0;
          font-size: 22px;
          font-weight: 800;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
        }

        .lform__subtitle {
          margin: 0;
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1.5;
          max-width: 320px;
        }

        .lform__field {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .lform__label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .lform__input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid var(--color-card-border);
          background: var(--color-input-bg);
          color: var(--color-text-primary);
          font-size: 16px;
          font-weight: 500;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }

        .lform__input:focus {
          border-color: rgba(168,85,247,0.6);
          box-shadow: 0 0 0 3px rgba(168,85,247,0.15);
        }

        .lform__input::placeholder {
          color: var(--color-text-muted);
          font-weight: 400;
        }

        .lform__char-count {
          position: absolute;
          bottom: 12px;
          right: 14px;
          font-size: 11px;
          color: var(--color-text-muted);
        }

        .lform__summary {
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(0,0,0,0.12);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .lform__summary-title {
          margin: 0 0 10px;
          font-size: 12px;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .lform__clues {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lform__clue {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-size: 12px;
        }

        .lform__clue-q {
          color: var(--color-text-secondary);
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lform__clue-a {
          font-weight: 700;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 8px;
          text-transform: capitalize;
          flex-shrink: 0;
        }

        .lform__clue-a--yes          { background: rgba(34,197,94,0.15);   color: #4ade80; }
        .lform__clue-a--probably     { background: rgba(132,204,22,0.15);  color: #a3e635; }
        .lform__clue-a--dont_know    { background: rgba(167,139,250,0.15); color: #c4b5fd; }
        .lform__clue-a--probably_not { background: rgba(249,115,22,0.15);  color: #fb923c; }
        .lform__clue-a--no           { background: rgba(239,68,68,0.15);   color: #f87171; }

        .lform__clue-more {
          margin: 4px 0 0;
          font-size: 11px;
          color: var(--color-text-muted);
          font-style: italic;
        }

        .lform__actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .lform__btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: transform 0.15s ease, filter 0.2s ease, opacity 0.2s ease;
        }

        .lform__btn:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .lform__btn:active { transform: scale(0.97); }

        .lform__btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .lform__btn--primary {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          box-shadow: 0 4px 16px rgba(124,58,237,0.4);
        }

        .lform__btn--secondary {
          background: var(--color-card-bg);
          color: var(--color-text-muted);
          border: 1px solid var(--color-card-border);
        }

        .lform__success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          text-align: center;
        }

        .lform__success-icon {
          font-size: 48px;
          animation: success-spin 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .lform__success-text {
          margin: 0;
          font-size: 16px;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .lform__success-text strong {
          color: var(--color-accent-light);
        }

        @keyframes learn-icon-bounce {
          from { transform: scale(0) rotate(-20deg); opacity: 0; }
          to   { transform: scale(1) rotate(0deg);   opacity: 1; }
        }

        @keyframes success-spin {
          from { transform: scale(0) rotate(-180deg); }
          to   { transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Results component ────────────────────────────────
export default function Results({
  phase,
  isCorrect,
  guess,
  questionCount,
  stats,
  winRate,
  avgQuestions,
  learnName,
  setLearnName,
  onLearnSubmit,
  onReset,
  answers,
}) {
  const [visible,    setVisible]    = useState(false);
  const [showStats,  setShowStats]  = useState(false);
  const isLearning = phase === 'learning';
  const isWin      = isCorrect === true;

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true),   80);
    const t2 = setTimeout(() => setShowStats(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleShare = () => {
    const text = isWin
      ? `🧞 Jini Magic guessed "${guess?.name}" in just ${questionCount} questions! Can you stump it? Try now!`
      : `🧞 I stumped Jini Magic with "${learnName || 'something tricky'}"! Try it yourself!`;

    if (navigator.share) {
      navigator.share({ title: 'Jini Magic', text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      alert('Result copied to clipboard!');
    }
  };

  return (
    <div className={`results ${visible ? 'results--in' : ''}`}>
      {/* Fireworks on win */}
      <Fireworks active={isWin} />

      {/* Background orbs */}
      <div className={`results__orb results__orb--1 ${isWin ? 'results__orb--win' : ''}`} />
      <div className="results__orb results__orb--2" />

      {/* Header */}
      <header className="results__header">
        <button className="results__home-btn" onClick={onReset}>
          ← Home
        </button>
        <div className="results__header-title">
          <span>🧞</span>
          <span>Jini Magic</span>
        </div>
        <div style={{ width: 80 }} />
      </header>

      <main className="results__main">

        {/* ── Win state ── */}
        {isWin && !isLearning && (
          <div className="results__win">

            {/* Genie */}
            <div className="results__genie-wrap">
              <GenieAvatar mood="correct" size="lg" pulse />
              <div className="results__win-badge">🏆 Jini wins!</div>
            </div>

            {/* Win card */}
            <div className="results__card results__card--win">
              <div className="results__card-header">
                <span className="results__card-emoji">🎉</span>
                <h1 className="results__card-title">I got it right!</h1>
                <p className="results__card-subtitle">
                  It was <strong>{guess?.name}</strong>
                </p>
              </div>

              {/* Guess display */}
              <div className="results__guess-display">
                <div className="results__guess-emoji">{guess?.image ?? '🎭'}</div>
                <div className="results__guess-info">
                  <h2 className="results__guess-name">{guess?.name}</h2>
                  <span className="results__guess-cat">
                    {categoryLabel(guess?.category)}
                  </span>
                </div>
              </div>

              {/* Mini stats */}
              <div className="results__mini-stats">
                <div className="results__mini-stat">
                  <span className="results__mini-stat-val">{questionCount}</span>
                  <span className="results__mini-stat-lbl">Questions asked</span>
                </div>
                <div className="results__mini-stat-div" />
                <div className="results__mini-stat">
                  <span className="results__mini-stat-val">{stats.streak}🔥</span>
                  <span className="results__mini-stat-lbl">Win streak</span>
                </div>
                <div className="results__mini-stat-div" />
                <div className="results__mini-stat">
                  <span className="results__mini-stat-val">{winRate}%</span>
                  <span className="results__mini-stat-lbl">Win rate</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="results__actions">
              <button className="results__btn results__btn--primary" onClick={onReset}>
                <span>🪔</span> Play Again
              </button>
              <button className="results__btn results__btn--share" onClick={handleShare}>
                <span>📤</span> Share Result
              </button>
            </div>
          </div>
        )}

        {/* ── Learning state ── */}
        {isLearning && (
          <div className="results__learning">
            <div className="results__genie-wrap">
              <GenieAvatar mood="learning" size="md" />
            </div>
            <LearningForm
              learnName={learnName}
              setLearnName={setLearnName}
              onSubmit={onLearnSubmit}
              onSkip={onReset}
              answers={answers}
            />
            <button
              className="results__btn results__btn--ghost"
              onClick={onReset}
              style={{ marginTop: 8 }}
            >
              ← Back to Home
            </button>
          </div>
        )}

        {/* ── Overall stats panel ── */}
        {showStats && stats.gamesPlayed > 1 && (
          <div className="results__stats-panel">
            <h3 className="results__stats-title">📊 Your Overall Stats</h3>
            <div className="results__stats-grid">
              {[
                { icon: '🎮', val: stats.gamesPlayed,  lbl: 'Total games' },
                { icon: '🏆', val: stats.gamesWon,     lbl: 'Games won' },
                { icon: '🎯', val: `${winRate}%`,       lbl: 'Win rate' },
                { icon: '⚡', val: avgQuestions,        lbl: 'Avg questions' },
                { icon: '🔥', val: stats.bestStreak,    lbl: 'Best streak' },
                { icon: '🥇', val: stats.fastestWin ?? '—', lbl: 'Fastest win' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="results__stat-card"
                  style={{
                    opacity:   showStats ? 1 : 0,
                    transform: showStats ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.4s ease ${i * 80}ms,
                                 transform 0.4s ease ${i * 80}ms`,
                  }}
                >
                  <span className="results__stat-icon">{s.icon}</span>
                  <span className="results__stat-val">{s.val}</span>
                  <span className="results__stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
        .results {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--color-bg);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .results--in { opacity: 1; }

        /* ── Orbs ── */
        .results__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }

        .results__orb--1 {
          width: 500px; height: 500px;
          top: -150px; left: -100px;
          background: radial-gradient(circle,
            rgba(120,60,220,0.15) 0%, transparent 70%);
          transition: background 1s ease;
        }

        .results__orb--1.results__orb--win {
          background: radial-gradient(circle,
            rgba(34,197,94,0.15) 0%, transparent 70%);
        }

        .results__orb--2 {
          width: 380px; height: 380px;
          bottom: -80px; right: -60px;
          background: radial-gradient(circle,
            rgba(180,80,255,0.10) 0%, transparent 70%);
        }

        /* ── Header ── */
        .results__header {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--color-card-border);
          background: var(--color-header-bg);
          backdrop-filter: blur(12px);
        }

        .results__home-btn {
          padding: 7px 13px;
          border-radius: 10px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          color: var(--color-text-secondary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.2s ease;
        }

        .results__home-btn:hover {
          transform: translateX(-2px);
          background: rgba(160,100,255,0.12);
          color: var(--color-text-primary);
        }

        .results__header-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 16px;
          font-weight: 800;
          background: linear-gradient(135deg, #c084fc, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Main ── */
        .results__main {
          position: relative;
          z-index: 5;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 20px 48px;
          gap: 28px;
          max-width: 560px;
          width: 100%;
          margin: 0 auto;
        }

        /* ── Win section ── */
        .results__win {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
        }

        .results__genie-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .results__win-badge {
          font-size: 13px;
          font-weight: 700;
          color: #fbbf24;
          background: rgba(251,191,36,0.12);
          border: 1px solid rgba(251,191,36,0.3);
          padding: 4px 14px;
          border-radius: 20px;
          letter-spacing: 0.03em;
          animation: badge-glow 2s ease-in-out infinite;
        }

        /* ── Win card ── */
        .results__card {
          width: 100%;
          border-radius: 20px;
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          box-shadow:
            0 12px 40px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.06);
          backdrop-filter: blur(16px);
          overflow: hidden;
          animation: card-enter 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .results__card--win {
          border-color: rgba(34,197,94,0.25);
          box-shadow:
            0 12px 40px rgba(0,0,0,0.25),
            0 0 40px rgba(34,197,94,0.12);
        }

        .results__card-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 22px 24px 16px;
          border-bottom: 1px solid var(--color-card-border);
        }

        .results__card-emoji { font-size: 32px; }

        .results__card-title {
          margin: 0;
          font-size: 20px;
          font-weight: 800;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
        }

        .results__card-subtitle {
          margin: 0;
          font-size: 14px;
          color: var(--color-text-secondary);
        }

        .results__card-subtitle strong {
          color: var(--color-accent-light);
        }

        /* ── Guess display ── */
        .results__guess-display {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-card-border);
        }

        .results__guess-emoji {
          font-size: 52px;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
          flex-shrink: 0;
        }

        .results__guess-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .results__guess-name {
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
        }

        .results__guess-cat {
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-muted);
          background: rgba(160,100,255,0.12);
          border: 1px solid rgba(160,100,255,0.2);
          padding: 2px 10px;
          border-radius: 20px;
          display: inline-block;
        }

        /* ── Mini stats ── */
        .results__mini-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 16px 24px;
        }

        .results__mini-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .results__mini-stat-val {
          font-size: 20px;
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .results__mini-stat-lbl {
          font-size: 10px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          text-align: center;
        }

        .results__mini-stat-div {
          width: 1px;
          height: 32px;
          background: var(--color-card-border);
        }

        /* ── Action buttons ── */
        .results__actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }

        .results__learning {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .results__btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 20px;
          border-radius: 13px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: transform 0.15s ease, filter 0.2s ease, box-shadow 0.2s ease;
        }

        .results__btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .results__btn:active { transform: scale(0.97); }

        .results__btn--primary {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          box-shadow: 0 4px 16px rgba(124,58,237,0.4);
        }

        .results__btn--share {
          background: linear-gradient(135deg, #0ea5e9, #38bdf8);
          color: white;
          box-shadow: 0 4px 16px rgba(14,165,233,0.35);
        }

        .results__btn--ghost {
          background: var(--color-card-bg);
          color: var(--color-text-muted);
          border: 1px solid var(--color-card-border);
          width: 100%;
          max-width: 460px;
        }

        /* ── Stats panel ── */
        .results__stats-panel {
          width: 100%;
          padding: 20px;
          border-radius: 16px;
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          backdrop-filter: blur(12px);
        }

        .results__stats-title {
          margin: 0 0 14px;
          font-size: 13px;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
        }

        .results__stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .results__stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 12px 8px;
          border-radius: 10px;
          background: rgba(0,0,0,0.12);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .results__stat-icon { font-size: 16px; }

        .results__stat-val {
          font-size: 18px;
          font-weight: 800;
          color: var(--color-text-primary);
          line-height: 1.1;
        }

        .results__stat-lbl {
          font-size: 10px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          text-align: center;
        }

        /* ── Animations ── */
        @keyframes card-enter {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }

        @keyframes badge-glow {
          0%,100% { box-shadow: none; }
          50%     { box-shadow: 0 0 14px rgba(251,191,36,0.4); }
        }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .results__main { padding: 20px 14px 36px; gap: 20px; }
          .results__actions { grid-template-columns: 1fr; }
          .results__stats-grid { grid-template-columns: repeat(2, 1fr); }
          .results__guess-emoji { font-size: 40px; }
          .results__guess-name  { font-size: 20px; }
        }
      `}</style>
    </div>
  );
}

function categoryLabel(cat) {
  const map = {
    real_person: '👤 Real Person',
    fictional:   '✨ Fictional Character',
    animal:      '🐾 Animal',
    object:      '🏺 Object / Place',
    learned:     '🧠 Learned by Jini',
  };
  return map[cat] ?? '🎭 Character';
}