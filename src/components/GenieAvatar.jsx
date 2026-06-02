// ============================================================
// JINI MAGIC — GenieAvatar Component
// Animated genie character that reacts to game state
// ============================================================

import { useEffect, useState } from 'react';

const MOODS = {
  idle:      { emoji: '🧞', label: 'idle' },
  thinking:  { emoji: '🤔', label: 'thinking' },
  asking:    { emoji: '🧞', label: 'asking' },
  guessing:  { emoji: '🔮', label: 'guessing' },
  correct:   { emoji: '🎉', label: 'correct' },
  wrong:     { emoji: '😅', label: 'wrong' },
  learning:  { emoji: '📚', label: 'learning' },
  excited:   { emoji: '✨', label: 'excited' },
};

export default function GenieAvatar({ mood = 'idle', size = 'md', pulse = false }) {
  const [currentMood, setCurrentMood] = useState(mood);
  const [animating,   setAnimating]   = useState(false);

  useEffect(() => {
    if (mood !== currentMood) {
      setAnimating(true);
      const t = setTimeout(() => {
        setCurrentMood(mood);
        setAnimating(false);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [mood, currentMood]);

  const sizes = {
    sm:   { container: 60,  font: 32 },
    md:   { container: 100, font: 56 },
    lg:   { container: 140, font: 80 },
    xl:   { container: 180, font: 110 },
  };

  const s = sizes[size] ?? sizes.md;
  const { emoji } = MOODS[currentMood] ?? MOODS.idle;

  return (
    <div
      className={`genie-avatar genie-avatar--${currentMood} ${pulse ? 'genie-avatar--pulse' : ''} ${animating ? 'genie-avatar--swap' : ''}`}
      style={{ width: s.container, height: s.container }}
      aria-label={`Genie is ${currentMood}`}
    >
      {/* Glow ring */}
      <div className="genie-avatar__ring" />

      {/* Orbiting sparkles */}
      <div className="genie-avatar__orbit">
        <span className="genie-avatar__spark genie-avatar__spark--1">✦</span>
        <span className="genie-avatar__spark genie-avatar__spark--2">✧</span>
        <span className="genie-avatar__spark genie-avatar__spark--3">✦</span>
      </div>

      {/* Main face */}
      <div className="genie-avatar__face" style={{ fontSize: s.font }}>
        {emoji}
      </div>

      {/* Thinking dots */}
      {currentMood === 'thinking' && (
        <div className="genie-avatar__thinking-dots">
          <span /><span /><span />
        </div>
      )}

      <style>{`
        .genie-avatar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%,
            rgba(180, 120, 255, 0.25),
            rgba(100, 60, 180, 0.15));
          box-shadow:
            0 0 30px rgba(160, 80, 255, 0.4),
            0 0 60px rgba(120, 60, 200, 0.2),
            inset 0 0 20px rgba(200, 150, 255, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
          user-select: none;
        }

        .genie-avatar--correct {
          box-shadow:
            0 0 40px rgba(80, 220, 120, 0.6),
            0 0 80px rgba(60, 180, 100, 0.3),
            inset 0 0 20px rgba(150, 255, 180, 0.15);
        }

        .genie-avatar--wrong {
          box-shadow:
            0 0 40px rgba(255, 140, 60, 0.5),
            0 0 70px rgba(220, 100, 40, 0.2),
            inset 0 0 20px rgba(255, 180, 100, 0.1);
        }

        .genie-avatar--guessing {
          box-shadow:
            0 0 50px rgba(255, 200, 60, 0.6),
            0 0 90px rgba(220, 160, 40, 0.3),
            inset 0 0 25px rgba(255, 220, 100, 0.15);
          animation: genie-float 2s ease-in-out infinite;
        }

        .genie-avatar--pulse {
          animation: genie-pulse 2s ease-in-out infinite;
        }

        .genie-avatar--swap {
          transform: scale(0.85);
          opacity: 0.6;
        }

        .genie-avatar__face {
          position: relative;
          z-index: 2;
          line-height: 1;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
          transition: opacity 0.2s ease, transform 0.2s ease;
          animation: genie-bob 3s ease-in-out infinite;
        }

        .genie-avatar__ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid transparent;
          background:
            linear-gradient(135deg, rgba(200,140,255,0.8), transparent 50%,
              rgba(120,80,220,0.8)) border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          animation: genie-ring-spin 4s linear infinite;
        }

        .genie-avatar__orbit {
          position: absolute;
          inset: -16px;
          border-radius: 50%;
          animation: genie-orbit-spin 6s linear infinite;
        }

        .genie-avatar__spark {
          position: absolute;
          font-size: 10px;
          color: rgba(220, 170, 255, 0.9);
          line-height: 1;
          filter: drop-shadow(0 0 4px rgba(180, 100, 255, 0.8));
        }

        .genie-avatar__spark--1 {
          top: 0; left: 50%;
          transform: translateX(-50%);
          animation: spark-twinkle 1.5s ease-in-out infinite;
        }
        .genie-avatar__spark--2 {
          top: 50%; right: 0;
          transform: translateY(-50%);
          animation: spark-twinkle 1.5s ease-in-out infinite 0.5s;
        }
        .genie-avatar__spark--3 {
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          animation: spark-twinkle 1.5s ease-in-out infinite 1s;
        }

        .genie-avatar__thinking-dots {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
        }

        .genie-avatar__thinking-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(200, 150, 255, 0.9);
          animation: thinking-dot 1.2s ease-in-out infinite;
        }

        .genie-avatar__thinking-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .genie-avatar__thinking-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes genie-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }

        @keyframes genie-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-8px) scale(1.03); }
        }

        @keyframes genie-pulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(160,80,255,0.4),
                        0 0 60px rgba(120,60,200,0.2);
          }
          50% {
            box-shadow: 0 0 50px rgba(180,100,255,0.7),
                        0 0 90px rgba(140,80,220,0.4);
          }
        }

        @keyframes genie-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes genie-orbit-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }

        @keyframes spark-twinkle {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(0.8); }
          50%       { opacity: 1;   transform: translateX(-50%) scale(1.2); }
        }

        @keyframes thinking-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}