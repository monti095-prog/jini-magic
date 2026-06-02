// ============================================================
// JINI MAGIC — useGameLogic Hook
// ============================================================

import { useState, useCallback, useEffect, useRef } from 'react';
import { JiniAIEngine } from '../utils/aiEngine.js';

export const PHASE = {
  HOME:     'home',
  THINKING: 'thinking',
  QUESTION: 'question',
  GUESSING: 'guessing',
  RESULT:   'result',
  LEARNING: 'learning',
  STATS:    'stats',
};

const DEFAULT_STATS = {
  gamesPlayed:    0,
  gamesWon:       0,
  totalQuestions: 0,
  fastestWin:     null,
  longestGame:    null,
  streak:         0,
  bestStreak:     0,
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

export function useGameLogic() {
  const engineRef = useRef(new JiniAIEngine());

  const [phase,         setPhase]         = useState(PHASE.HOME);
  const [currentQ,      setCurrentQ]      = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [answers,       setAnswers]       = useState([]);
  const [guess,         setGuess]         = useState(null);
  const [confidence,    setConfidence]    = useState(0);
  const [isCorrect,     setIsCorrect]     = useState(null);
  const [stats,         setStats]         = useState(loadStats);
  const [learnName,     setLearnName]     = useState('');
  const [learnAttr,     setLearnAttr]     = useState('');
  const [soundEnabled,  setSoundEnabled]  = useState(
    () => localStorage.getItem('jini_sound') !== 'false'
  );
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('jini_dark') !== 'false'
  );

  useEffect(() => {
    engineRef.current.loadLearnedEntries();
  }, []);

  useEffect(() => {
    localStorage.setItem('jini_dark', darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('jini_sound', soundEnabled);
  }, [soundEnabled]);

  // ── Start game ────────────────────────────────────────────
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

    setPhase(PHASE.THINKING);
    setAnswers([]);
    setQuestionCount(0);
    setGuess(null);
    setConfidence(0);
    setIsCorrect(null);
    setLearnName('');
    setLearnAttr('');

    setTimeout(() => {
      const q = engineRef.current.getNextQuestion();
      setCurrentQ(q);
      setPhase(PHASE.QUESTION);
    }, 1200);
  }, []);

  // ── Trigger guess ─────────────────────────────────────────
  const _triggerGuess = useCallback((engine, qCount) => {
    setPhase(PHASE.GUESSING);
    setTimeout(() => {
      const bestGuess = engine.getBestGuess();
      const conf      = engine.getConfidence();
      setGuess(bestGuess);
      setConfidence(conf);
      setPhase(PHASE.RESULT);
    }, 2200);
  }, []);

  // ── Handle answer ─────────────────────────────────────────
  const handleAnswer = useCallback((answerKey) => {
    if (!currentQ) return;

    const engine = engineRef.current;
    engine.recordAnswer(currentQ.attribute, answerKey);

    const newCount = questionCount + 1;
    setQuestionCount(newCount);
    setAnswers(prev => [...prev, {
      question:  currentQ.text,
      answer:    answerKey,
      attribute: currentQ.attribute,
    }]);

    if (engine.shouldGuess()) {
      _triggerGuess(engine, newCount);
    } else {
      setPhase(PHASE.THINKING);
      setTimeout(() => {
        const nextQ = engine.getNextQuestion();
        setCurrentQ(nextQ);
        setPhase(PHASE.QUESTION);
      }, 800 + Math.random() * 600);
    }
  }, [currentQ, questionCount, _triggerGuess]);

  // ── Correct guess ─────────────────────────────────────────
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
          ? qCount : Math.min(prev.fastestWin, qCount),
        longestGame:    prev.longestGame === null
          ? qCount : Math.max(prev.longestGame, qCount),
      };
      saveStats(next);
      return next;
    });
  }, [questionCount]);

  // ── Wrong guess ───────────────────────────────────────────
  const handleWrong = useCallback(() => {
    setIsCorrect(false);

    const engine    = engineRef.current;
    const remaining = engine.getTopCandidates(3);

    if (remaining.length > 1) {
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

  // ── Continue ──────────────────────────────────────────────
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

  // ── Learn submit ──────────────────────────────────────────
  const handleLearnSubmit = useCallback(() => {
    if (!learnName.trim()) return;

    const engine       = engineRef.current;
    const learnedAttrs = {};

    answers.forEach(a => {
      learnedAttrs[a.attribute] =
        a.answer === 'yes' || a.answer === 'probably';
    });

    engine.learnNewEntry(learnName.trim(), learnedAttrs);
    setPhase(PHASE.HOME);
  }, [learnName, answers]);

  // ── Reset ─────────────────────────────────────────────────
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

  // ── Toggles ───────────────────────────────────────────────
  const toggleDarkMode = useCallback(() => setDarkMode(d => !d), []);
  const toggleSound    = useCallback(() => setSoundEnabled(s => !s), []);

  const winRate = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

  const avgQuestions = stats.gamesPlayed > 0
    ? Math.round(stats.totalQuestions / stats.gamesPlayed) : 0;

  return {
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