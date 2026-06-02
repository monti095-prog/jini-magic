// ============================================================
// JINI MAGIC — GuessCard Component
// Reveals the genie's guess with dramatic animation
// Handles correct / wrong / confetti states
// ============================================================

import { useEffect, useState, useRef } from 'react';

// ─── Tiny confetti engine ─────────────────────────────────
function useConfetti(active) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const COLORS = [
      '#a855f7', '#f59e0b', '#22c55e',
      '#3b82f6', '#ec4899', '#ffd700',
    ];

    const pieces = Array.from({ length: 90 }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * -canvas.height * 0.5,
      w:    6 + Math.random() * 8,
      h:    3 + Math.random() * 5,
      r:    Math.random() * Math.PI * 2,
      dr:   (Math.random() - 0.5) * 0.18,
      vy:   2.5 + Math.random() * 3,
      vx:   (Math.random() - 0.5) * 2.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 1,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      pieces.forEach(p => {
        p.y  += p.vy;
        p.x  += p.vx;
        p.r  += p.dr;
        p.vy += 0.05; // gravity
        if (frame > 120) p.alpha -= 0.012;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.r);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (pieces.some(p => p.alpha > 0)) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return canvasRef;
}

// ─── Component ────────────────────────────────────────────
export default function GuessCard({
  guess,
  confidence,
  isCorrect,
  onCorrect,
  onWrong,
  questionCount,
}) {
  const [revealed,    setRevealed]    = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const confettiRef = useConfetti(isCorrect === true);

  // Staggered entrance
  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true),    200);
    const t2 = setTimeout(() => setShowButtons(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!guess) return null;

  const confColor =
    confidence >= 85 ? '#22c55e' :
    confidence >= 60 ? '#f59e0b' : '#a78bfa';

  const confText =
    confidence >= 85 ? 'Very confident!' :
    confidence >= 60 ? 'Pretty sure...'  : 'Taking a guess...';

  return (
    <div className={`gcard ${revealed ? 'gcard--revealed' : ''} ${isCorrect === true ? 'gcard--correct' : ''} ${isCorrect === false ? 'gcard--wrong' : ''}`}>

      {/* Confetti canvas */}
      <canvas
        ref={confettiRef}
        className="gcard__confetti"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="gcard__header">
        <div className="gcard__crystal">🔮</div>
        <div className="gcard__header-text">
          <h2 className="gcard__title">I think it is...</h2>
          <p className="gcard__subtitle" style={{ color: confColor }}>
            <span className="gcard__subtitle-dot" style={{ background: confColor }} />
            {confText} &nbsp;·&nbsp; {confidence}% confidence
          </p>
        </div>
      </div>

      {/* Main guess reveal */}
      <div className="gcard__reveal">
        {/* Avatar / emoji */}
        <div className={`gcard__avatar ${revealed ? 'gcard__avatar--in' : ''}`}>
          <div className="gcard__avatar-glow" />
          <span className="gcard__avatar-emoji" aria-hidden="true">
            {guess.image ?? '🎭'}
          </span>
          {isCorrect === true  && <div className="gcard__avatar-badge gcard__avatar-badge--win">✓</div>}
          {isCorrect === false && <div className="gcard__avatar-badge gcard__avatar-badge--lose">✗</div>}
        </div>

        {/* Name */}
        <div className={`gcard__name-wrap ${revealed ? 'gcard__name-wrap--in' : ''}`}>
          <h1 className="gcard__name">{guess.name}</h1>
          <span className="gcard__category">
            {categoryLabel(guess.category)}
          </span>
        </div>

        {/* Stats strip */}
        <div className={`gcard__stats ${revealed ? 'gcard__stats--in' : ''}`}>
          <div className="gcard__stat">
            <span className="gcard__stat-icon">❓</span>
            <span className="gcard__stat-val">{questionCount}</span>
            <span className="gcard__stat-lbl">questions</span>
          </div>
          <div className="gcard__stat-divider" />
          <div className="gcard__stat">
            <span className="gcard__stat-icon">🎯</span>
            <span className="gcard__stat-val" style={{ color: confColor }}>
              {confidence}%
            </span>
            <span className="gcard__stat-lbl">confidence</span>
          </div>
          <div className="gcard__stat-divider" />
          <div className="gcard__stat">
            <span className="gcard__stat-icon">🧞</span>
            <span className="gcard__stat-val">Jini</span>
            <span className="gcard__stat-lbl">guessed</span>
          </div>
        </div>
      </div>

      {/* Result message */}
      {isCorrect === true && (
        <div className="gcard__result gcard__result--correct">
          <span className="gcard__result-emoji">🎉</span>
          <span className="gcard__result-text">Amazing! The magic worked!</span>
        </div>
      )}
      {isCorrect === false && (
        <div className="gcard__result gcard__result--wrong">
          <span className="gcard__result-emoji">😅</span>
          <span className="gcard__result-text">Hmm, the genie is still learning...</span>
        </div>
      )}

      {/* Action buttons */}
      {showButtons && isCorrect === null && (
        <div className="gcard__actions">
          <p className="gcard__actions-label">Was I right?</p>
          <div className="gcard__btn-row">
            <button
              className="gcard__btn gcard__btn--yes"
              onClick={onCorrect}
            >
              <span>🎉</span> Yes, correct!
            </button>
            <button
              className="gcard__btn gcard__btn--no"
              onClick={onWrong}
            >
              <span>❌</span> No, wrong!
            </button>
          </div>
        </div>
      )}

      <style>{`
        .gcard {
          position: relative;
          width: 100%;
          max-width: 480px;
          border-radius: 24px;
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          box-shadow:
            0 16px 48px rgba(0,0,0,0.3),
            0 0 0 1px rgba(160,100,255,0.08),
            inset 0 1px 0 rgba(255,255,255,0.06);
          overflow: hidden;
          backdrop-filter: blur(20px);
          opacity: 0;
          transform: translateY(20px) scale(0.97);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }

        .gcard--revealed {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .gcard--correct {
          border-color: rgba(34,197,94,0.4);
          box-shadow:
            0 16px 48px rgba(0,0,0,0.3),
            0 0 40px rgba(34,197,94,0.2);
        }

        .gcard--wrong {
          border-color: rgba(239,68,68,0.3);
          box-shadow:
            0 16px 48px rgba(0,0,0,0.3),
            0 0 30px rgba(239,68,68,0.15);
        }

        /* ── Confetti canvas ── */
        .gcard__confetti {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }

        /* ── Header ── */
        .gcard__header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 24px 0;
        }

        .gcard__crystal {
          font-size: 28px;
          animation: crystal-spin 4s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(160,80,255,0.6));
        }

        .gcard__header-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .gcard__title {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
        }

        .gcard__subtitle {
          margin: 0;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: color 0.3s ease;
        }

        .gcard__subtitle-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          box-shadow: 0 0 5px currentColor;
        }

        /* ── Reveal section ── */
        .gcard__reveal {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 24px 20px;
          gap: 16px;
        }

        /* ── Avatar ── */
        .gcard__avatar {
          position: relative;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%,
            rgba(180,120,255,0.2),
            rgba(80,40,160,0.15));
          border: 2px solid rgba(160,100,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.5) rotate(-10deg);
          transition: opacity 0.5s ease 0.3s,
                      transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.3s;
        }

        .gcard__avatar--in {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        .gcard__avatar-glow {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(160,80,255,0.25) 0%,
            transparent 70%);
          animation: avatar-glow-pulse 2.5s ease-in-out infinite;
        }

        .gcard__avatar-emoji {
          font-size: 58px;
          line-height: 1;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
          position: relative;
          z-index: 1;
        }

        .gcard__avatar-badge {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          border: 2px solid var(--color-bg);
          animation: badge-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .gcard__avatar-badge--win  { background: #22c55e; color: white; }
        .gcard__avatar-badge--lose { background: #ef4444; color: white; }

        /* ── Name ── */
        .gcard__name-wrap {
          text-align: center;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease 0.5s,
                      transform 0.4s ease 0.5s;
        }

        .gcard__name-wrap--in {
          opacity: 1;
          transform: translateY(0);
        }

        .gcard__name {
          margin: 0 0 4px;
          font-size: clamp(22px, 5vw, 30px);
          font-weight: 800;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .gcard__category {
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: rgba(160,100,255,0.12);
          border: 1px solid rgba(160,100,255,0.2);
          padding: 2px 10px;
          border-radius: 20px;
        }

        /* ── Stats ── */
        .gcard__stats {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 20px;
          border-radius: 12px;
          background: rgba(0,0,0,0.15);
          border: 1px solid rgba(255,255,255,0.05);
          width: 100%;
          justify-content: center;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s ease 0.7s,
                      transform 0.4s ease 0.7s;
        }

        .gcard__stats--in {
          opacity: 1;
          transform: translateY(0);
        }

        .gcard__stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
        }

        .gcard__stat-icon { font-size: 14px; }

        .gcard__stat-val {
          font-size: 18px;
          font-weight: 800;
          color: var(--color-text-primary);
          line-height: 1.1;
        }

        .gcard__stat-lbl {
          font-size: 10px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .gcard__stat-divider {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.08);
        }

        /* ── Result message ── */
        .gcard__result {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          margin: 0 24px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          animation: result-slide 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .gcard__result--correct {
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.3);
          color: #4ade80;
        }

        .gcard__result--wrong {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
        }

        .gcard__result-emoji { font-size: 18px; }

        /* ── Action buttons ── */
        .gcard__actions {
          padding: 0 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: actions-in 0.4s ease both;
        }

        .gcard__actions-label {
          margin: 0;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .gcard__btn-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .gcard__btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 13px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }

        .gcard__btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .gcard__btn:active {
          transform: scale(0.96);
        }

        .gcard__btn--yes {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          box-shadow: 0 4px 14px rgba(34,197,94,0.35);
        }

        .gcard__btn--no {
          background: linear-gradient(135deg, #b91c1c, #ef4444);
          color: white;
          box-shadow: 0 4px 14px rgba(239,68,68,0.3);
        }

        /* ── Animations ── */
        @keyframes crystal-spin {
          0%,100% { transform: rotate(-5deg) scale(1); }
          50%      { transform: rotate(5deg) scale(1.08); }
        }

        @keyframes avatar-glow-pulse {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.1); }
        }

        @keyframes badge-pop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        @keyframes result-slide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes actions-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 400px) {
          .gcard__btn-row { grid-template-columns: 1fr; }
          .gcard__avatar  { width: 90px; height: 90px; }
          .gcard__avatar-emoji { font-size: 46px; }
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