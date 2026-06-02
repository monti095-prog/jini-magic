// ============================================================
// JINI MAGIC — QuestionCard Component
// Animated speech bubble that displays the current question
// ============================================================

import { useEffect, useState } from 'react';

export default function QuestionCard({ question, questionNumber, isVisible = true }) {
  const [displayed,  setDisplayed]  = useState('');
  const [isTyping,   setIsTyping]   = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter effect whenever question changes
  useEffect(() => {
    if (!question) return;
    setDisplayed('');
    setIsTyping(true);

    let i = 0;
    const text = question;
    const speed = Math.max(18, Math.min(38, 800 / text.length));

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [question]);

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  if (!question) return null;

  return (
    <div className={`qcard ${isVisible ? 'qcard--visible' : 'qcard--hidden'}`}>

      {/* Question number badge */}
      <div className="qcard__badge">
        <span className="qcard__badge-icon">❓</span>
        <span className="qcard__badge-text">Question {questionNumber}</span>
      </div>

      {/* Speech bubble */}
      <div className="qcard__bubble">
        {/* Decorative corner gems */}
        <span className="qcard__gem qcard__gem--tl">◆</span>
        <span className="qcard__gem qcard__gem--tr">◆</span>

        {/* Question text with typewriter */}
        <p className="qcard__text">
          {displayed}
          {(isTyping || showCursor) && (
            <span
              className="qcard__cursor"
              style={{ opacity: showCursor ? 1 : 0 }}
            >
              |
            </span>
          )}
        </p>

        {/* Bubble tail */}
        <div className="qcard__tail" />
      </div>

      <style>{`
        .qcard {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 560px;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .qcard--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .qcard--hidden {
          opacity: 0;
          transform: translateY(12px);
          pointer-events: none;
        }

        .qcard__badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 20px;
          background: rgba(160, 90, 255, 0.18);
          border: 1px solid rgba(180, 110, 255, 0.3);
          backdrop-filter: blur(8px);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-accent-light);
        }

        .qcard__badge-icon {
          font-size: 13px;
        }

        .qcard__bubble {
          position: relative;
          width: 100%;
          padding: 28px 32px;
          border-radius: 20px;
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(160, 100, 255, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(16px);
          animation: qcard-enter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .qcard__gem {
          position: absolute;
          font-size: 9px;
          color: rgba(180, 120, 255, 0.5);
          line-height: 1;
        }

        .qcard__gem--tl { top: 10px; left: 14px; }
        .qcard__gem--tr { top: 10px; right: 14px; }

        .qcard__text {
          margin: 0;
          font-size: clamp(17px, 2.5vw, 22px);
          font-weight: 500;
          line-height: 1.55;
          color: var(--color-text-primary);
          text-align: center;
          min-height: 2.4em;
          letter-spacing: -0.01em;
        }

        .qcard__cursor {
          display: inline-block;
          width: 2px;
          color: var(--color-accent);
          font-weight: 300;
          margin-left: 1px;
          transition: opacity 0.1s;
        }

        .qcard__tail {
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 14px solid transparent;
          border-right: 14px solid transparent;
          border-top: 13px solid var(--color-card-border);
        }

        .qcard__tail::after {
          content: '';
          position: absolute;
          top: -14px;
          left: -12px;
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 12px solid var(--color-card-bg);
        }

        @keyframes qcard-enter {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 480px) {
          .qcard__bubble {
            padding: 22px 20px;
            border-radius: 16px;
          }
        }
      `}</style>
    </div>
  );
}