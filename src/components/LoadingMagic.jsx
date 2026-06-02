// ============================================================
// JINI MAGIC — LoadingMagic Component
// Animated thinking / loading state shown between questions
// and during the dramatic guessing sequence
// ============================================================

import { useEffect, useState } from 'react';

const THINKING_PHRASES = [
  "Reading your mind...",
  "Consulting the crystal ball...",
  "The magic is flowing...",
  "Searching the cosmos...",
  "Summoning ancient wisdom...",
  "Peering into the mystic...",
  "The stars are aligning...",
  "Decoding your thoughts...",
  "Invoking the oracle...",
  "The genie is thinking...",
];

const GUESSING_PHRASES = [
  "I sense something...",
  "The vision is clearing...",
  "Almost there...",
  "The magic reveals...",
  "I know what it is...",
];

export default function LoadingMagic({ mode = 'thinking', visible = true }) {
  const [phrase,      setPhrase]      = useState(THINKING_PHRASES[0]);
  const [dotCount,    setDotCount]    = useState(1);
  const [particles,   setParticles]   = useState([]);
  const [orbAngle,    setOrbAngle]    = useState(0);

  const phrases = mode === 'guessing' ? GUESSING_PHRASES : THINKING_PHRASES;

  // Cycle through phrases
  useEffect(() => {
    if (!visible) return;
    let i = Math.floor(Math.random() * phrases.length);
    setPhrase(phrases[i]);

    const t = setInterval(() => {
      i = (i + 1) % phrases.length;
      setPhrase(phrases[i]);
    }, mode === 'guessing' ? 900 : 1800);

    return () => clearInterval(t);
  }, [visible, mode]);

  // Animate dots
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => {
      setDotCount(d => (d % 3) + 1);
    }, 420);
    return () => clearInterval(t);
  }, [visible]);

  // Orb rotation
  useEffect(() => {
    if (!visible) return;
    let angle = 0;
    const t = setInterval(() => {
      angle = (angle + 2) % 360;
      setOrbAngle(angle);
    }, 16);
    return () => clearInterval(t);
  }, [visible]);

  // Spawn floating particles
  useEffect(() => {
    if (!visible) return;
    const spawn = () => {
      const id = Date.now() + Math.random();
      setParticles(prev => [
        ...prev.slice(-12),
        {
          id,
          x:    30 + Math.random() * 40,
          size: 4 + Math.random() * 8,
          dur:  1.6 + Math.random() * 1.4,
          hue:  260 + Math.random() * 60,
          char: ['✦', '✧', '⋆', '·', '✺'][Math.floor(Math.random() * 5)],
        },
      ]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, 3200);
    };

    spawn();
    const t = setInterval(spawn, 320);
    return () => clearInterval(t);
  }, [visible]);

  if (!visible) return null;

  const dots = '.'.repeat(dotCount);

  return (
    <div
      className={`lmagic lmagic--${mode} ${visible ? 'lmagic--in' : 'lmagic--out'}`}
      role="status"
      aria-live="polite"
      aria-label={phrase}
    >
      {/* Floating particles */}
      <div className="lmagic__particles" aria-hidden="true">
        {particles.map(p => (
          <span
            key={p.id}
            className="lmagic__particle"
            style={{
              left:             `${p.x}%`,
              fontSize:         `${p.size}px`,
              color:            `hsl(${p.hue}, 80%, 70%)`,
              animationDuration:`${p.dur}s`,
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* Central orb */}
      <div className="lmagic__orb-wrap" aria-hidden="true">

        {/* Outer ring */}
        <div
          className="lmagic__ring lmagic__ring--outer"
          style={{ transform: `rotate(${orbAngle}deg)` }}
        >
          {[0, 60, 120, 180, 240, 300].map(deg => (
            <div
              key={deg}
              className="lmagic__ring-dot"
              style={{
                transform: `rotate(${deg}deg) translateX(44px)`,
                opacity: 0.4 + 0.6 * Math.abs(Math.sin((deg + orbAngle) * Math.PI / 180)),
              }}
            />
          ))}
        </div>

        {/* Inner ring */}
        <div
          className="lmagic__ring lmagic__ring--inner"
          style={{ transform: `rotate(${-orbAngle * 1.4}deg)` }}
        >
          {[0, 90, 180, 270].map(deg => (
            <div
              key={deg}
              className="lmagic__ring-dot lmagic__ring-dot--inner"
              style={{
                transform: `rotate(${deg}deg) translateX(28px)`,
              }}
            />
          ))}
        </div>

        {/* Core glow */}
        <div className="lmagic__core">
          <div className="lmagic__core-inner">
            {mode === 'guessing' ? '🔮' : '🧞'}
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="lmagic__text-wrap">
        <p className="lmagic__phrase" key={phrase}>
          {phrase}
          <span className="lmagic__dots" aria-hidden="true">{dots}</span>
        </p>

        {mode === 'guessing' && (
          <div className="lmagic__bars" aria-hidden="true">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div
                key={i}
                className="lmagic__bar"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .lmagic {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          padding: 40px 20px;
          min-height: 220px;
          overflow: hidden;
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .lmagic--in {
          opacity: 1;
          transform: scale(1);
        }

        .lmagic--out {
          opacity: 0;
          transform: scale(0.95);
          pointer-events: none;
        }

        /* ── Particles ── */
        .lmagic__particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .lmagic__particle {
          position: absolute;
          bottom: 10%;
          line-height: 1;
          animation: particle-rise linear forwards;
          filter: drop-shadow(0 0 4px currentColor);
        }

        /* ── Orb ── */
        .lmagic__orb-wrap {
          position: relative;
          width: 110px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lmagic__ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }

        .lmagic__ring-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(180, 110, 255, 0.85);
          box-shadow: 0 0 8px rgba(160, 80, 255, 0.8);
          margin-top: -3.5px;
          margin-left: -3.5px;
          transition: opacity 0.1s;
        }

        .lmagic__ring-dot--inner {
          width: 5px;
          height: 5px;
          background: rgba(220, 170, 255, 0.9);
          margin-top: -2.5px;
          margin-left: -2.5px;
        }

        .lmagic__core {
          position: relative;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%,
            rgba(200, 140, 255, 0.3),
            rgba(100, 50, 200, 0.2));
          border: 1px solid rgba(180, 120, 255, 0.4);
          box-shadow:
            0 0 24px rgba(160, 80, 255, 0.5),
            0 0 48px rgba(120, 60, 200, 0.25),
            inset 0 0 16px rgba(200, 150, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: core-breathe 2s ease-in-out infinite;
        }

        .lmagic__core-inner {
          font-size: 32px;
          filter: drop-shadow(0 0 8px rgba(180, 100, 255, 0.8));
          animation: core-bob 2s ease-in-out infinite;
        }

        /* ── Text ── */
        .lmagic__text-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .lmagic__phrase {
          margin: 0;
          font-size: clamp(15px, 2.5vw, 18px);
          font-weight: 600;
          color: var(--color-text-primary);
          text-align: center;
          letter-spacing: 0.01em;
          animation: phrase-fade 0.4s ease both;
        }

        .lmagic__dots {
          display: inline-block;
          min-width: 20px;
          color: var(--color-accent);
          font-weight: 700;
        }

        /* ── Guessing bars ── */
        .lmagic__bars {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 28px;
        }

        .lmagic__bar {
          width: 5px;
          border-radius: 3px;
          background: linear-gradient(180deg,
            rgba(200, 140, 255, 0.9),
            rgba(120, 60, 200, 0.6));
          box-shadow: 0 0 6px rgba(160, 80, 255, 0.5);
          animation: bar-dance 0.8s ease-in-out infinite alternate;
        }

        /* ── Mode variants ── */
        .lmagic--guessing .lmagic__core {
          background: radial-gradient(circle at 35% 35%,
            rgba(255, 200, 100, 0.3),
            rgba(200, 120, 40, 0.2));
          border-color: rgba(255, 190, 80, 0.4);
          box-shadow:
            0 0 32px rgba(255, 190, 60, 0.5),
            0 0 60px rgba(200, 140, 40, 0.25),
            inset 0 0 16px rgba(255, 210, 100, 0.1);
        }

        .lmagic--guessing .lmagic__ring-dot {
          background: rgba(255, 200, 100, 0.85);
          box-shadow: 0 0 8px rgba(255, 180, 60, 0.8);
        }

        .lmagic--guessing .lmagic__ring-dot--inner {
          background: rgba(255, 220, 140, 0.9);
        }

        /* ── Keyframes ── */
        @keyframes particle-rise {
          0%   { transform: translateY(0)   scale(1);    opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.7; }
          100% { transform: translateY(-140px) scale(0.4); opacity: 0; }
        }

        @keyframes core-breathe {
          0%, 100% {
            box-shadow:
              0 0 24px rgba(160,80,255,0.5),
              0 0 48px rgba(120,60,200,0.25);
          }
          50% {
            box-shadow:
              0 0 36px rgba(180,100,255,0.7),
              0 0 70px rgba(140,80,220,0.4);
          }
        }

        @keyframes core-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }

        @keyframes phrase-fade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes bar-dance {
          from { height: 6px;  opacity: 0.5; }
          to   { height: 26px; opacity: 1; }
        }
      `}</style>
    </div>
  );
}