// ============================================================
// JINI MAGIC — Game Page
// Main game interface: questions, thinking, guessing states
// ============================================================

import { useEffect, useState } from 'react';
import GenieAvatar    from '../components/GenieAvatar.jsx';
import QuestionCard   from '../components/QuestionCard.jsx';
import AnswerButtons  from '../components/AnswerButtons.jsx';
import ProgressBar    from '../components/ProgressBar.jsx';
import LoadingMagic   from '../components/LoadingMagic.jsx';
import GuessCard      from '../components/GuessCard.jsx';
import { PHASE }      from '../hooks/useGameLogic.js';

// ─── Answer history pill ───────────────────────────────────
function AnswerPill({ question, answer }) {
  const colors = {
    yes:          { bg: 'rgba(34,197,94,0.15)',   border: 'rgba(34,197,94,0.3)',   text: '#4ade80', emoji: '✅' },
    probably:     { bg: 'rgba(132,204,22,0.15)',  border: 'rgba(132,204,22,0.3)',  text: '#a3e635', emoji: '🤔' },
    dont_know:    { bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.3)', text: '#c4b5fd', emoji: '🤷' },
    probably_not: { bg: 'rgba(249,115,22,0.15)',  border: 'rgba(249,115,22,0.3)',  text: '#fb923c', emoji: '😬' },
    no:           { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.3)',   text: '#f87171', emoji: '❌' },
  };
  const c = colors[answer] ?? colors.dont_know;

  return (
    <div
      className="apill"
      style={{
        background:   c.bg,
        borderColor:  c.border,
      }}
      title={question}
    >
      <span className="apill__emoji">{c.emoji}</span>
      <span className="apill__text" style={{ color: c.text }}>
        {question.length > 28 ? question.slice(0, 28) + '…' : question}
      </span>
      <style>{`
        .apill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid;
          font-size: 11px;
          white-space: nowrap;
          flex-shrink: 0;
          animation: pill-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .apill__emoji { font-size: 11px; }
        .apill__text  { font-weight: 600; letter-spacing: 0.01em; }
        @keyframes pill-in {
          from { opacity: 0; transform: scale(0.7) translateY(4px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Game component ───────────────────────────────────
export default function Game({
  phase,
  currentQ,
  questionCount,
  answers,
  guess,
  confidence,
  isCorrect,
  onAnswer,
  onCorrect,
  onWrong,
  onReset,
  darkMode,
  toggleDarkMode,
  soundEnabled,
  toggleSound,
}) {
  const [contentVisible, setContentVisible] = useState(false);
  const [showHistory,    setShowHistory]    = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setContentVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Determine genie mood from phase
  const genieMood = {
    [PHASE.THINKING]: 'thinking',
    [PHASE.QUESTION]: 'asking',
    [PHASE.GUESSING]: 'guessing',
    [PHASE.RESULT]:   isCorrect === true  ? 'correct'
                    : isCorrect === false ? 'wrong'
                    : 'guessing',
    [PHASE.LEARNING]: 'learning',
  }[phase] ?? 'idle';

  const isQuestionPhase = phase === PHASE.QUESTION;
  const isThinkingPhase = phase === PHASE.THINKING;
  const isGuessingPhase = phase === PHASE.GUESSING;
  const isResultPhase   = phase === PHASE.RESULT;

  return (
    <div className={`game ${contentVisible ? 'game--in' : ''}`}>

      {/* Ambient background orbs */}
      <div className="game__orb game__orb--1" aria-hidden="true" />
      <div className="game__orb game__orb--2" aria-hidden="true" />

      {/* ── Top bar ── */}
      <header className="game__header">
        <button
          className="game__back-btn"
          onClick={onReset}
          aria-label="Return to home"
        >
          ← Home
        </button>

        <div className="game__header-title">
          <span className="game__header-lamp">🪔</span>
          <span className="game__header-name">Jini Magic</span>
        </div>

        <div className="game__header-actions">
          <button
            className="game__icon-btn"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute' : 'Sound on'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button
            className="game__icon-btn"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* ── Progress bar (only during questions) ── */}
      {(isQuestionPhase || isThinkingPhase) && (
        <div className="game__progress-wrap">
          <ProgressBar
            questionNumber={questionCount}
            confidence={confidence}
          />
        </div>
      )}

      {/* ── Main content area ── */}
      <main className="game__main">

        {/* ── Genie avatar ── */}
        <div className="game__genie-section">
          <GenieAvatar
            mood={genieMood}
            size="lg"
            pulse={isThinkingPhase || isGuessingPhase}
          />

          {/* Phase label under genie */}
          <div className="game__phase-label">
            {isThinkingPhase && <span>🧠 Thinking...</span>}
            {isQuestionPhase && <span>❓ Question {questionCount}</span>}
            {isGuessingPhase && <span>🔮 Making a guess...</span>}
            {isResultPhase   && isCorrect === null  && <span>🎯 Here's my guess!</span>}
            {isResultPhase   && isCorrect === true  && <span>🎉 I got it right!</span>}
            {isResultPhase   && isCorrect === false && <span>😅 Let me think again...</span>}
          </div>
        </div>

        {/* ── Thinking / loading state ── */}
        {(isThinkingPhase || isGuessingPhase) && (
          <div className="game__loading-wrap">
            <LoadingMagic
              mode={isGuessingPhase ? 'guessing' : 'thinking'}
              visible
            />
          </div>
        )}

        {/* ── Question + answer buttons ── */}
        {isQuestionPhase && (
          <div className="game__question-section">
            <QuestionCard
              question={currentQ?.text}
              questionNumber={questionCount}
              isVisible={isQuestionPhase}
            />
            <div className="game__answers-wrap">
              <AnswerButtons
                onAnswer={onAnswer}
                disabled={!isQuestionPhase}
              />
            </div>
          </div>
        )}

        {/* ── Guess result card ── */}
        {isResultPhase && (
          <div className="game__result-wrap">
            <GuessCard
              guess={guess}
              confidence={confidence}
              isCorrect={isCorrect}
              onCorrect={onCorrect}
              onWrong={onWrong}
              questionCount={questionCount}
            />
          </div>
        )}

        {/* ── Answer history ── */}
        {answers.length > 0 && (isQuestionPhase || isThinkingPhase) && (
          <div className="game__history">
            <button
              className="game__history-toggle"
              onClick={() => setShowHistory(h => !h)}
              aria-expanded={showHistory}
            >
              <span>📜 History ({answers.length})</span>
              <span className="game__history-chevron"
                style={{ transform: showHistory ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                ▾
              </span>
            </button>

            {showHistory && (
              <div className="game__history-pills">
                {answers.map((a, i) => (
                  <AnswerPill
                    key={i}
                    question={a.question}
                    answer={a.answer}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Bottom hint strip ── */}
      {isQuestionPhase && (
        <div className="game__hint-strip">
          <span>🎯 Answer honestly for best results</span>
          <span className="game__hint-dot">·</span>
          <span>Use keyboard 1–5 to answer fast</span>
        </div>
      )}

      <style>{`
        .game {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--color-bg);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .game--in { opacity: 1; }

        /* ── Orbs ── */
        .game__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .game__orb--1 {
          width: 420px; height: 420px;
          top: -160px; right: -100px;
          background: radial-gradient(circle,
            rgba(120,60,220,0.14) 0%, transparent 70%);
          animation: gorb-drift 14s ease-in-out infinite;
        }
        .game__orb--2 {
          width: 320px; height: 320px;
          bottom: -80px; left: -60px;
          background: radial-gradient(circle,
            rgba(180,80,255,0.10) 0%, transparent 70%);
          animation: gorb-drift 18s ease-in-out infinite reverse;
        }

        /* ── Header ── */
        .game__header {
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

        .game__back-btn {
          display: flex;
          align-items: center;
          gap: 5px;
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

        .game__back-btn:hover {
          transform: translateX(-2px);
          background: rgba(160,100,255,0.12);
          color: var(--color-text-primary);
        }

        .game__header-title {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .game__header-lamp { font-size: 18px; }

        .game__header-name {
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #c084fc, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .game__header-actions {
          display: flex;
          gap: 6px;
        }

        .game__icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s ease;
        }

        .game__icon-btn:hover { transform: scale(1.1); }

        /* ── Progress ── */
        .game__progress-wrap {
          position: relative;
          z-index: 5;
          padding: 14px 20px 10px;
          display: flex;
          justify-content: center;
        }

        /* ── Main ── */
        .game__main {
          position: relative;
          z-index: 5;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 20px 32px;
          gap: 20px;
          max-width: 620px;
          width: 100%;
          margin: 0 auto;
        }

        /* ── Genie section ── */
        .game__genie-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .game__phase-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-muted);
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          padding: 4px 14px;
          border-radius: 20px;
          backdrop-filter: blur(8px);
          letter-spacing: 0.01em;
        }

        /* ── Loading ── */
        .game__loading-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* ── Question section ── */
        .game__question-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .game__answers-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* ── Result ── */
        .game__result-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* ── History ── */
        .game__history {
          width: 100%;
          max-width: 560px;
        }

        .game__history-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          color: var(--color-text-muted);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: background 0.2s ease;
        }

        .game__history-toggle:hover {
          background: rgba(160,100,255,0.1);
          color: var(--color-text-primary);
        }

        .game__history-chevron {
          font-size: 14px;
          transition: transform 0.25s ease;
        }

        .game__history-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 10px 4px 4px;
          max-height: 120px;
          overflow-y: auto;
          scrollbar-width: thin;
        }

        /* ── Hint strip ── */
        .game__hint-strip {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 20px;
          font-size: 11.5px;
          color: var(--color-text-muted);
          border-top: 1px solid var(--color-card-border);
          background: var(--color-header-bg);
          backdrop-filter: blur(8px);
        }

        .game__hint-dot { opacity: 0.3; }

        /* ── Animations ── */
        @keyframes gorb-drift {
          0%,100% { transform: translate(0,0); }
          40%     { transform: translate(25px,-18px); }
          70%     { transform: translate(-15px,12px); }
        }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .game__main     { padding: 16px 14px 24px; gap: 16px; }
          .game__progress-wrap { padding: 12px 14px 8px; }
          .game__header   { padding: 12px 14px; }
          .game__back-btn { padding: 6px 10px; font-size: 12px; }
        }
      `}</style>
    </div>
  );
}