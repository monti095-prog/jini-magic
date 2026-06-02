// ============================================================
// JINI MAGIC — AnswerButtons Component
// Five answer options with hover effects and keyboard support
// ============================================================

import { useEffect, useState } from 'react';

const ANSWERS = [
  {
    key:     'yes',
    label:   'Yes',
    emoji:   '✅',
    color:   '#22c55e',
    glow:    'rgba(34, 197, 94, 0.4)',
    bg:      'rgba(34, 197, 94, 0.12)',
    border:  'rgba(34, 197, 94, 0.35)',
    hotkey:  '1',
  },
  {
    key:     'probably',
    label:   'Probably',
    emoji:   '🤔',
    color:   '#84cc16',
    glow:    'rgba(132, 204, 22, 0.4)',
    bg:      'rgba(132, 204, 22, 0.12)',
    border:  'rgba(132, 204, 22, 0.35)',
    hotkey:  '2',
  },
  {
    key:     'dont_know',
    label:   "Don't Know",
    emoji:   '🤷',
    color:   '#a78bfa',
    glow:    'rgba(167, 139, 250, 0.4)',
    bg:      'rgba(167, 139, 250, 0.12)',
    border:  'rgba(167, 139, 250, 0.35)',
    hotkey:  '3',
  },
  {
    key:     'probably_not',
    label:   'Probably Not',
    emoji:   '😬',
    color:   '#f97316',
    glow:    'rgba(249, 115, 22, 0.4)',
    bg:      'rgba(249, 115, 22, 0.12)',
    border:  'rgba(249, 115, 22, 0.35)',
    hotkey:  '4',
  },
  {
    key:     'no',
    label:   'No',
    emoji:   '❌',
    color:   '#ef4444',
    glow:    'rgba(239, 68, 68, 0.4)',
    bg:      'rgba(239, 68, 68, 0.12)',
    border:  'rgba(239, 68, 68, 0.35)',
    hotkey:  '5',
  },
];

export default function AnswerButtons({ onAnswer, disabled = false }) {
  const [pressed,   setPressed]   = useState(null);
  const [revealed,  setRevealed]  = useState(false);

  // Staggered reveal animation on mount
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Reset reveal when new question comes in
  useEffect(() => {
    setRevealed(false);
    setPressed(null);
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, [onAnswer]);

  // Keyboard shortcuts
  useEffect(() => {
    if (disabled) return;

    const handleKey = (e) => {
      const answer = ANSWERS.find(a => a.hotkey === e.key);
      if (answer) handleClick(answer.key);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [disabled, onAnswer]);

  const handleClick = (key) => {
    if (disabled || pressed) return;
    setPressed(key);
    setTimeout(() => onAnswer(key), 320);
  };

  return (
    <div className="abtn-wrap" role="group" aria-label="Answer options">

      {/* Keyboard hint */}
      <p className="abtn-hint">
        <span className="abtn-hint__icon">⌨️</span>
        Press <strong>1–5</strong> or click to answer
      </p>

      {/* Button grid */}
      <div className="abtn-grid">
        {ANSWERS.map((a, i) => {
          const isPressed  = pressed === a.key;
          const isDisabled = disabled || (pressed && !isPressed);

          return (
            <button
              key={a.key}
              className={`abtn ${isPressed ? 'abtn--pressed' : ''} ${isDisabled ? 'abtn--disabled' : ''}`}
              onClick={() => handleClick(a.key)}
              disabled={isDisabled}
              aria-label={a.label}
              style={{
                '--btn-color':  a.color,
                '--btn-glow':   a.glow,
                '--btn-bg':     a.bg,
                '--btn-border': a.border,
                '--delay':      `${i * 60}ms`,
                opacity:        revealed ? 1 : 0,
                transform:      revealed ? 'translateY(0)' : 'translateY(16px)',
                transition:     `opacity 0.35s ease var(--delay),
                                 transform 0.35s cubic-bezier(0.34,1.56,0.64,1) var(--delay),
                                 background 0.2s ease,
                                 box-shadow 0.2s ease,
                                 border-color 0.2s ease`,
              }}
            >
              {/* Hotkey badge */}
              <span className="abtn__hotkey">{a.hotkey}</span>

              {/* Emoji */}
              <span className="abtn__emoji">{a.emoji}</span>

              {/* Label */}
              <span className="abtn__label">{a.label}</span>

              {/* Ripple on press */}
              {isPressed && <span className="abtn__ripple" />}
            </button>
          );
        })}
      </div>

      <style>{`
        .abtn-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          width: 100%;
          max-width: 560px;
        }

        .abtn-hint {
          margin: 0;
          font-size: 11.5px;
          color: var(--color-text-muted);
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .abtn-hint__icon { font-size: 13px; }

        .abtn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }

        /* "Don't Know" spans full width — middle button */
        .abtn-grid .abtn:nth-child(3) {
          grid-column: 1 / -1;
        }

        .abtn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 20px;
          border-radius: 14px;
          border: 1px solid var(--btn-border);
          background: var(--btn-bg);
          color: var(--color-text-primary);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          overflow: hidden;
          outline: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition:
            background 0.2s ease,
            box-shadow 0.2s ease,
            transform 0.15s ease,
            border-color 0.2s ease;
        }

        .abtn:hover:not(.abtn--disabled) {
          background: color-mix(in srgb, var(--btn-bg) 100%, var(--btn-color) 15%);
          border-color: var(--btn-color);
          box-shadow:
            0 4px 16px rgba(0,0,0,0.2),
            0 0 20px var(--btn-glow);
          transform: translateY(-2px);
        }

        .abtn:active:not(.abtn--disabled) {
          transform: translateY(0px) scale(0.97);
        }

        .abtn--pressed {
          background: color-mix(in srgb, var(--btn-bg) 60%, var(--btn-color) 40%) !important;
          border-color: var(--btn-color) !important;
          box-shadow:
            0 0 30px var(--btn-glow),
            inset 0 0 12px rgba(255,255,255,0.05) !important;
          transform: scale(0.97) !important;
        }

        .abtn--disabled {
          opacity: 0.38;
          cursor: not-allowed;
          pointer-events: none;
        }

        .abtn__hotkey {
          position: absolute;
          top: 6px;
          left: 9px;
          font-size: 9px;
          font-weight: 700;
          color: var(--btn-color);
          opacity: 0.7;
          letter-spacing: 0.05em;
          background: color-mix(in srgb, var(--btn-bg) 80%, var(--btn-color) 20%);
          border: 1px solid var(--btn-border);
          border-radius: 4px;
          padding: 1px 4px;
          line-height: 1.4;
        }

        .abtn__emoji {
          font-size: 20px;
          line-height: 1;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.3));
        }

        .abtn__label {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--color-text-primary);
        }

        .abtn__ripple {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            circle at center,
            color-mix(in srgb, var(--btn-color) 30%, transparent) 0%,
            transparent 70%
          );
          animation: abtn-ripple 0.5s ease-out forwards;
          pointer-events: none;
        }

        @keyframes abtn-ripple {
          from { opacity: 1; transform: scale(0.5); }
          to   { opacity: 0; transform: scale(2); }
        }

        @media (max-width: 400px) {
          .abtn-grid {
            grid-template-columns: 1fr;
          }
          .abtn-grid .abtn:nth-child(3) {
            grid-column: auto;
          }
          .abtn {
            padding: 13px 16px;
          }
        }
      `}</style>
    </div>
  );
}