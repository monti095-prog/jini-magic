// ============================================================
// JINI MAGIC — App.jsx
// Root component: wires all pages together, manages routing
// via game phase state (no external router needed)
// ============================================================

import { useEffect } from 'react';
import { useGameLogic, PHASE } from './hooks/useGameLogic.js';
import Home    from './pages/Home.jsx';
import Game    from './pages/Game.jsx';
import Results from './pages/Results.jsx';

export default function App() {
  const game = useGameLogic();

  // ── Enter key starts game from home ───────────────────────
  useEffect(() => {
    if (game.phase !== PHASE.HOME) return;
    const handler = (e) => {
      if (e.key === 'Enter') game.startGame();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [game.phase]);

  // ── Apply theme class to root ──────────────────────────────
  useEffect(() => {
    document.documentElement.className = game.darkMode ? 'dark' : 'light';
  }, [game.darkMode]);

  // ── Determine which screen to show ────────────────────────
  const isHome    = game.phase === PHASE.HOME;
  const isResult  = game.phase === PHASE.RESULT;
  const isLearn   = game.phase === PHASE.LEARNING;
  const isGame    = !isHome && !isResult && !isLearn;

  return (
    <div className="app-root">
      {/* ── Landing page ── */}
      {isHome && (
        <Home
          onStart={game.startGame}
          stats={game.stats}
          darkMode={game.darkMode}
          toggleDarkMode={game.toggleDarkMode}
          soundEnabled={game.soundEnabled}
          toggleSound={game.toggleSound}
        />
      )}

      {/* ── Active game (question / thinking / guessing) ── */}
      {isGame && (
        <Game
          phase={game.phase}
          currentQ={game.currentQ}
          questionCount={game.questionCount}
          answers={game.answers}
          guess={game.guess}
          confidence={game.confidence}
          isCorrect={game.isCorrect}
          onAnswer={game.handleAnswer}
          onCorrect={game.handleCorrect}
          onWrong={game.handleWrong}
          onReset={game.resetGame}
          darkMode={game.darkMode}
          toggleDarkMode={game.toggleDarkMode}
          soundEnabled={game.soundEnabled}
          toggleSound={game.toggleSound}
        />
      )}

      {/* ── Result / guess reveal ── */}
      {isResult && (
        <Game
          phase={game.phase}
          currentQ={game.currentQ}
          questionCount={game.questionCount}
          answers={game.answers}
          guess={game.guess}
          confidence={game.confidence}
          isCorrect={game.isCorrect}
          onAnswer={game.handleAnswer}
          onCorrect={game.handleCorrect}
          onWrong={game.handleWrong}
          onReset={game.resetGame}
          darkMode={game.darkMode}
          toggleDarkMode={game.toggleDarkMode}
          soundEnabled={game.soundEnabled}
          toggleSound={game.toggleSound}
        />
      )}

      {/* ── Learning mode (genie failed) ── */}
      {isLearn && (
        <Results
          phase={game.phase}
          isCorrect={game.isCorrect}
          guess={game.guess}
          questionCount={game.questionCount}
          stats={game.stats}
          winRate={game.winRate}
          avgQuestions={game.avgQuestions}
          learnName={game.learnName}
          setLearnName={game.setLearnName}
          onLearnSubmit={game.handleLearnSubmit}
          onReset={game.resetGame}
          answers={game.answers}
        />
      )}

      <style>{`
        .app-root {
          min-height: 100vh;
          width: 100%;
        }
      `}</style>
    </div>
  );
}