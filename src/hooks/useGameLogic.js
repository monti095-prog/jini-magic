// ============================================================
// JINI MAGIC — useGameLogic Hook
// Central game state management. Handles the full game flow:
// questioning → guessing → result → learning → restart
// ============================================================

import { useState, useCallback, useEffect, useRef } from 'react';
import { JiniAIEngine } from '../utils/aiEngine.js';

// ─── Game phases ──────────────────────────────────────────
export const PHASE = {
  HOME:       'home',
  THINKING:   'thinking',
  QUESTION:   'question',
  GUESSING:   'guessing',
  RESULT:     'result',
  LEARNING:   'learning',
  STATS:      'stats',
};

// ─── Initial stats shape ──────────────────────────────────
const DEFAULT_STATS = {
  gamesPlayed:  0,
  gamesWon:     0,
  totalQuestions: 0,
  fastestWin:   null,   // fewest questions
  longestGame:  null,
  streak:       0,
  bestStreak:   0,
};

function loadStats() {
  try {
    return JSON.parse(localStorage.getItem('jini_stats') ?? 'null') ?? DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

function saveStats(stats) {
  localStorage.setItem('jini_stats', JSON.stringify(stats));
}

// ─── Hook ─────────────────────────────────────────────────
export function useGameLogic() {
  const engineRef = useRef(new JiniAIEngine());

  const [phase,         setPhase]         = useState(PHASE.HOME);
  const [currentQ,      setCurrentQ]      = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [answers,       setAnswers]        = useState([]);
  const [guess,         setGuess]          = useState(null);
  const [confidence,    setConfidence]    = useState(0);
  const [isCorrect,     setIsCorrect]     = useState(null);
  const [stats,         setStats]         = useState(loadStats);
  const [learnName,     setLearnName]     = useState('');
  const [learnAttr,     setLearnAttr]     = useState('');
  const [soundEnabled,  setSoundEnabled]  = useState(
    () => localStorage.getItem('jini_sound') !== 'false'
  );
  const [darkMode,      setDarkMode]      = useState(
    () => localStorage.getItem('jini_dark') !== 'false'
  );

  // Load learned entries on mount
  useEffect(() => {
    engineRef.current.loadLearnedEntries();
  }, []);

  // Persist dark mode preference
  useEffect(() => {
    localStorage.setItem('jini_dark', darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Persist sound preference
  useEffect(() => {
    localStorage.setItem('jini_sound', soundEnabled);
  }, [soundEnabled]);

  // ── Start a new game ─────────────────────────────────────
const startGame = useCallback((theme = 'all') => {
  engineRef.current = new JiniAIEngine();
  engineRef.current.loadLearnedEntries();

  // Filter candidates by selected theme
  if (theme !== 'all') {
    engineRef.current.candidates = engineRef.current.candidates.filter(c => {
      if (theme === 'person')    return c.category === 'real_person';
      if (theme === 'fictional') return c.category === 'fictional';
      if (theme === 'animal')    return c.category === 'animal';
      if (theme === 'object')    return c.category === 'object';
      return true;
    });
  }

  // ── Handle an answer ─────────────────────────────────────
  const handleAnswer = useCallback((answerKey) => {
    if (!currentQ) return;

    const engine = engineRef.current;
    engine.recordAnswer(currentQ.attribute, answerKey);

    const newCount = questionCount + 1;
    setQuestionCount(newCount);
    setAnswers(prev => [...prev, {
      question: currentQ.text,
      answer:   answerKey,
      attribute: currentQ.attribute,
    }]);

    // Check if we should guess now
    if (engine.shouldGuess()) {
      _triggerGuess(engine, newCount);
    } else {
      // Show thinking animation between questions
      setPhase(PHASE.THINKING);
      setTimeout(() => {
        const nextQ = engine.getNextQuestion();
        setCurrentQ(nextQ);
        setPhase(PHASE.QUESTION);
      }, 800 + Math.random() * 600);
    }
  }, [currentQ, questionCount]);

  // ── Trigger the guess sequence ────────────────────────────
  const _triggerGuess = useCallback((engine, qCount) => {
    setPhase(PHASE.GUESSING);

    setTimeout(() => {
      const bestGuess  = engine.getBestGuess();
      const conf       = engine.getConfidence();
      setGuess(bestGuess);
      setConfidence(conf);
      setPhase(PHASE.RESULT);
    }, 2200);
  }, []);

  // ── Player says guess was correct ─────────────────────────
  const handleCorrect = useCallback(() => {
    setIsCorrect(true);
    const qCount = questionCount;

    setStats(prev => {
      const next = {
        ...prev,
        gamesPlayed:    prev.gamesPlayed + 1,
        gamesWon:       prev.gamesWon + 1,
        totalQuestions: prev.totalQuestions + qCount,
        streak:         prev.streak + 1,
        bestStreak:     Math.max(prev.bestStreak, prev.streak + 1),
        fastestWin:     prev.fastestWin === null
          ? qCount
          : Math.min(prev.fastestWin, qCount),
        longestGame:    prev.longestGame === null
          ? qCount
          : Math.max(prev.longestGame, qCount),
      };
      saveStats(next);
      return next;
    });
  }, [questionCount]);

  // ── Player says guess was wrong ───────────────────────────
  const handleWrong = useCallback(() => {
    setIsCorrect(false);

    // Check if there are more candidates to try
    const engine = engineRef.current;
    const remaining = engine.getTopCandidates(3);

    if (remaining.length > 1) {
      // Try next best candidate
      engine.candidates = engine.candidates.filter(c => c.id !== guess?.id);
      setPhase(PHASE.GUESSING);

      setTimeout(() => {
        const nextGuess = engine.getBestGuess();
        const conf      = engine.getConfidence();
        setGuess(nextGuess);
        setConfidence(conf);
        setPhase(PHASE.RESULT);
        setIsCorrect(null);
      }, 1800);
    } else {
      // Give up — enter learning mode
      setStats(prev => {
        const next = {
          ...prev,
          gamesPlayed:    prev.gamesPlayed + 1,
          totalQuestions: prev.totalQuestions + questionCount,
          streak:         0,
        };
        saveStats(next);
        return next;
      });
      setPhase(PHASE.LEARNING);
    }
  }, [guess, questionCount]);

  // ── Continue asking more questions ────────────────────────
  const handleContinue = useCallback(() => {
    const engine = engineRef.current;
    engine.candidates = engine.candidates.filter(c => c.id !== guess?.id);

    setPhase(PHASE.THINKING);
    setIsCorrect(null);

    setTimeout(() => {
      if (engine.shouldGuess()) {
        _triggerGuess(engine, questionCount);
      } else {
        const nextQ = engine.getNextQuestion();
        setCurrentQ(nextQ);
        setPhase(PHASE.QUESTION);
      }
    }, 900);
  }, [guess, questionCount, _triggerGuess]);

  // ── Submit a learned answer ────────────────────────────────
  const handleLearnSubmit = useCallback(() => {
    if (!learnName.trim()) return;

    const engine = engineRef.current;

    // Build attribute map from answers
    const learnedAttrs = {};
    answers.forEach(a => {
      learnedAttrs[a.attribute] =
        a.answer === 'yes' || a.answer === 'probably';
    });

    engine.learnNewEntry(learnName.trim(), learnedAttrs);
    setPhase(PHASE.HOME);
  }, [learnName, answers]);

  // ── Reset entirely ────────────────────────────────────────
  const resetGame = useCallback(() => {
    setPhase(PHASE.HOME);
    setAnswers([]);
    setQuestionCount(0);
    setGuess(null);
    setConfidence(0);
    setIsCorrect(null);
    setLearnName('');
    setLearnAttr('');
  }, []);

  // ── Toggle dark mode ──────────────────────────────────────
  const toggleDarkMode = useCallback(() => {
    setDarkMode(d => !d);
  }, []);

  // ── Toggle sound ──────────────────────────────────────────
  const toggleSound = useCallback(() => {
    setSoundEnabled(s => !s);
  }, []);

  // ── Win rate helper ───────────────────────────────────────
  const winRate = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  const avgQuestions = stats.gamesPlayed > 0
    ? Math.round(stats.totalQuestions / stats.gamesPlayed)
    : 0;

  return {
    // State
    phase,
    currentQ,
    questionCount,
    answers,
    guess,
    confidence,
    isCorrect,
    stats,
    winRate,
    avgQuestions,
    learnName,
    learnAttr,
    soundEnabled,
    darkMode,

    // Actions
    startGame,
    handleAnswer,
    handleCorrect,
    handleWrong,
    handleContinue,
    handleLearnSubmit,
    resetGame,
    toggleDarkMode,
    toggleSound,
    setLearnName,
    setLearnAttr,
  };
}

export default useGameLogic;