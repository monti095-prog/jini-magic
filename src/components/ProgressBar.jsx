// ============================================================
// JINI MAGIC — ProgressBar Component
// Shows question progress and genie confidence level
// ============================================================

import { useEffect, useState } from 'react';

const MAX_QUESTIONS = 20;

export default function ProgressBar({ questionNumber = 0, confidence = 0 }) {
  const [animatedConf,  setAnimatedConf]  = useState(0);
  const [animatedQ,     setAnimatedQ]     = useState(0);
  const [confFlash,     setConfFlash]     = useState(false);

  // Animate confidence bar smoothly
  useEffect(() => {
    const prev = animatedConf;
    if (confidence === prev) return;

    // Flash effect when confidence jumps significantly
    if (confidence - prev > 10) {
      setConfFlash(true);
      setTimeout(() => setConfFlash(false), 600);
    }

    const step  = (confidence - prev) / 20;
    let current = prev;
    const t = setInterval(() => {
      current += step;
      if (
        (step > 0 && current >= confidence) ||
        (step < 0 && current <= confidence)
      ) {
        setAnimatedConf(confidence);
        clearInterval(t);
      } else {
        setAnimatedConf(Math.round(current));
      }
    }, 16);
    return () => clearInterval(t);
  }, [confidence]);

  // Animate question counter
  useEffect(() => {
    setAnimatedQ(questionNumber);
  }, [questionNumber]);

  const qProgress   = Math.min((questionNumber / MAX_QUESTIONS) * 100, 100);
  const confColor   = confidence < 40
    ? '#a78bfa'
    : confidence < 70
    ? '#f59e0b'
    : '#22c55e';

  const confLabel   = confidence < 30  ? 'Scanning...'
    : confidence < 50  ? 'Getting warmer...'
    : confidence < 70  ? 'Narrowing down...'
    : confidence < 85  ? 'Almost sure...'
    : 'Very confident!';

  return (
    <div className="pbar-wrap" role="region" aria-label="Game progress">

      {/* ── Top row: question count + confidence label ── */}
      <div className="pbar-row">
        <div className="pbar-stat">
          <span className="pbar-stat__icon">📝</span>
          <span className="pbar-stat__value">{animatedQ}</span>
          <span className="pbar-stat__label">/ {MAX_QUESTIONS} questions</span>
        </div>

        <div className={`pbar-conf-label ${confFlash ? 'pbar-conf-label--flash' : ''}`}
          style={{ color: confColor }}>
          <span className="pbar-conf-label__dot"
            style={{ background: confColor }} />
          {confLabel}
        </div>
      </div>

      {/* ── Question progress bar ── */}
      <div className="pbar-track" aria-label={`Question ${questionNumber} of ${MAX_QUESTIONS}`}>
        <div
          className="pbar-fill pbar-fill--questions"
          style={{ width: `${qProgress}%` }}
        >
          {/* Animated shimmer */}
          <div className="pbar-shimmer" />
        </div>

        {/* Milestone ticks */}
        {[5, 10, 15].map(tick => (
          <div
            key={tick}
            className={`pbar-tick ${questionNumber >= tick ? 'pbar-tick--passed' : ''}`}
            style={{ left: `${(tick / MAX_QUESTIONS) * 100}%` }}
          />
        ))}
      </div>

      {/* ── Confidence bar ── */}
      <div className="pbar-conf-row">
        <span className="pbar-conf-row__icon">🔮</span>
        <div className="pbar-track pbar-track--conf"
          aria-label={`Confidence ${animatedConf}%`}>
          <div
            className={`pbar-fill pbar-fill--conf ${confFlash ? 'pbar-fill--flash' : ''}`}
            style={{
              width:      `${animatedConf}%`,
              background: `linear-gradient(90deg, #7c3aed, ${confColor})`,
              boxShadow:  `0 0 12px ${confColor}55`,
            }}
          >
            <div className="pbar-shimmer" />
          </div>
        </div>
        <span className="pbar-conf-row__pct" style={{ color: confColor }}>
          {animatedConf}%
        </span>
      </div>

      <style>{`
        .pbar-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          max-width: 560px;
        }

        /* ── Top row ── */
        .pbar-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pbar-stat {
          display: flex;
          align-items: baseline;
          gap: 4px;
          font-size: 13px;
          color: var(--color-text-muted);
        }

        .pbar-stat__icon  { font-size: 13px; }
        .pbar-stat__value {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .pbar-stat__label { font-size: 12px; }

        .pbar-conf-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.03em;
          transition: color 0.4s ease;
        }

        .pbar-conf-label--flash {
          animation: conf-flash 0.6s ease;
        }

        .pbar-conf-label__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          transition: background 0.4s ease;
          box-shadow: 0 0 6px currentColor;
        }

        /* ── Track base ── */
        .pbar-track {
          position: relative;
          width: 100%;
          height: 8px;
          border-radius: 99px;
          background: var(--color-track-bg);
          overflow: visible;
        }

        .pbar-track--conf {
          height: 6px;
          flex: 1;
        }

        /* ── Fill ── */
        .pbar-fill {
          position: relative;
          height: 100%;
          border-radius: 99px;
          overflow: hidden;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pbar-fill--questions {
          background: linear-gradient(90deg,
            rgba(124, 58, 237, 0.9),
            rgba(167, 139, 250, 0.9));
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        .pbar-fill--conf {
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      background 0.4s ease,
                      box-shadow 0.4s ease;
        }

        .pbar-fill--flash {
          animation: fill-flash 0.6s ease;
        }

        /* ── Shimmer ── */
        .pbar-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.25) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer-slide 2s linear infinite;
        }

        /* ── Milestone ticks ── */
        .pbar-tick {
          position: absolute;
          top: -3px;
          width: 2px;
          height: 14px;
          border-radius: 1px;
          background: var(--color-track-tick);
          transform: translateX(-50%);
          transition: background 0.3s ease;
          z-index: 1;
        }

        .pbar-tick--passed {
          background: rgba(167, 139, 250, 0.7);
        }

        /* ── Confidence row ── */
        .pbar-conf-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pbar-conf-row__icon { font-size: 14px; flex-shrink: 0; }

        .pbar-conf-row__pct {
          font-size: 12px;
          font-weight: 700;
          min-width: 34px;
          text-align: right;
          transition: color 0.4s ease;
        }

        /* ── Animations ── */
        @keyframes shimmer-slide {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        @keyframes conf-flash {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }

        @keyframes fill-flash {
          0%   { filter: brightness(1); }
          40%  { filter: brightness(1.5); }
          100% { filter: brightness(1); }
        }
      `}</style>
    </div>
  );
}