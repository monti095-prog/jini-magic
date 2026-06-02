// ============================================================
// JINI MAGIC — AI Engine
// Core intelligence that powers the guessing algorithm.
// Uses a hybrid approach: decision tree traversal + attribute
// scoring to pick the best candidate and next question.
// ============================================================

import { knowledgeBase } from '../data/knowledgeBase.js';
import { decisionTree } from '../data/decisionTree.js';

// ─── Answer weight multipliers ────────────────────────────
const ANSWER_WEIGHTS = {
  yes:          1.0,
  no:          -1.0,
  probably:     0.6,
  probably_not: -0.6,
  dont_know:    0.0,
};

// ─── Questions pool used when tree is exhausted ───────────
export const FALLBACK_QUESTIONS = [
  { id: 'isReal',        text: 'Is it real (not fictional)?' },
  { id: 'isHuman',       text: 'Is it a human being?' },
  { id: 'isAlive',       text: 'Is this person/thing still alive or in use today?' },
  { id: 'isFamous',      text: 'Is it world-famous?' },
  { id: 'isMale',        text: 'Is it male?' },
  { id: 'isFemale',      text: 'Is it female?' },
  { id: 'isYoung',       text: 'Is it young (under 30)?' },
  { id: 'isOld',         text: 'Is it very old (over 100 years)?' },
  { id: 'isAmerican',    text: 'Is it American?' },
  { id: 'isEuropean',    text: 'Is it European?' },
  { id: 'isAsian',       text: 'Does it originate from Asia?' },
  { id: 'isAfrican',     text: 'Does it originate from Africa?' },
  { id: 'isActor',       text: 'Is it an actor or actress?' },
  { id: 'isSinger',      text: 'Is it a singer or musician?' },
  { id: 'isAthlete',     text: 'Is it an athlete or sports person?' },
  { id: 'isPolitician',  text: 'Is it a politician or world leader?' },
  { id: 'isScientist',   text: 'Is it a scientist or inventor?' },
  { id: 'isBusinessperson', text: 'Is it a businessperson or entrepreneur?' },
  { id: 'isRich',        text: 'Is it known for being very wealthy?' },
  { id: 'hasWon',        text: 'Has it won major awards or championships?' },
  { id: 'isControversial', text: 'Is it considered controversial?' },
  { id: 'isFictional',   text: 'Is it a fictional character?' },
  { id: 'isCartoon',     text: 'Is it from a cartoon or animated show?' },
  { id: 'isFromMovie',   text: 'Is it from a movie?' },
  { id: 'isFromTV',      text: 'Is it from a TV show?' },
  { id: 'isFromBook',    text: 'Is it from a book?' },
  { id: 'isFromVideoGame', text: 'Is it from a video game?' },
  { id: 'isFromComics',  text: 'Is it from comics or graphic novels?' },
  { id: 'isHero',        text: 'Is it a hero or protagonist?' },
  { id: 'isVillain',     text: 'Is it a villain or antagonist?' },
  { id: 'hasPowers',     text: 'Does it have special powers or abilities?' },
  { id: 'isRoyal',       text: 'Is it royalty (king, queen, prince, princess)?' },
  { id: 'isWizard',      text: 'Is it a wizard or magic user?' },
  { id: 'isWarrior',     text: 'Is it a warrior or fighter?' },
  { id: 'isAnimal',      text: 'Is it an animal?' },
  { id: 'isMammal',      text: 'Is it a mammal?' },
  { id: 'isBird',        text: 'Is it a bird?' },
  { id: 'isInsect',      text: 'Is it an insect or bug?' },
  { id: 'livesInWater',  text: 'Does it live in water?' },
  { id: 'canFly',        text: 'Can it fly?' },
  { id: 'isLarge',       text: 'Is it large (bigger than a person)?' },
  { id: 'isSmall',       text: 'Is it small (smaller than a cat)?' },
  { id: 'isObject',      text: 'Is it an inanimate object or place?' },
  { id: 'isBuilding',    text: 'Is it a building or structure?' },
  { id: 'isVehicle',     text: 'Is it a vehicle or mode of transport?' },
  { id: 'isFood',        text: 'Is it a food or drink?' },
  { id: 'isTechnology',  text: 'Is it a piece of technology?' },
  { id: 'isWeapon',      text: 'Is it a weapon?' },
  { id: 'isDisney',      text: 'Is it associated with Disney?' },
  { id: 'isAnime',       text: 'Is it from anime (Japanese animation)?' },
  { id: 'isSciFi',       text: 'Is it from a science fiction story?' },
  { id: 'isInSpace',     text: 'Is it associated with outer space?' },
  { id: 'wearsMask',     text: 'Does it wear a mask?' },
  { id: 'isRobot',       text: 'Is it a robot or mechanical being?' },
  { id: 'isMonster',     text: 'Is it a monster or mythical creature?' },
  { id: 'isScary',       text: 'Is it scary or frightening?' },
  { id: 'isFunny',       text: 'Is it known for being funny or comedic?' },
  { id: 'isBeautiful',   text: 'Is it known for being beautiful?' },
  { id: 'isColorful',    text: 'Is it very colorful?' },
  { id: 'isBlue',        text: 'Is it predominantly blue in color?' },
  { id: 'isGreen',       text: 'Is it predominantly green in color?' },
  { id: 'isYellow',      text: 'Is it predominantly yellow in color?' },
  { id: 'isBritish',     text: 'Is it British or from the UK?' },
  { id: 'livesInCold',   text: 'Does it live in a cold or icy environment?' },
  { id: 'isExtinct',     text: 'Is it extinct?' },
  { id: 'isHistorical',  text: 'Is it from a historical period (pre-1900)?' },
  { id: 'isLeader',      text: 'Is it known as a great leader?' },
  { id: 'isSmart',       text: 'Is it known for being exceptionally intelligent?' },
  { id: 'isTechRelated', text: 'Is it related to computers or technology?' },
  { id: 'isSpaceRelated','text': 'Is it related to space exploration?' },
  { id: 'isPrehistoric', text: 'Did it exist before recorded history?' },
  { id: 'isEndangered',  text: 'Is it an endangered species?' },
  { id: 'liveInAfrica',  text: 'Does it come from or live in Africa?' },
  { id: 'livesInAsia',   text: 'Does it come from or live in Asia?' },
  { id: 'isItalian',     text: 'Is it Italian?' },
  { id: 'isNorse',       text: 'Is it from Norse mythology?' },
  { id: 'isVampire',     text: 'Is it a vampire?' },
  { id: 'hasDragon',     text: 'Is it associated with dragons?' },
  { id: 'isNinja',       text: 'Is it a ninja or associated with Japanese martial arts?' },
  { id: 'isToy',         text: 'Is it a toy?' },
  { id: 'isAlien',       text: 'Is it an alien or extraterrestrial?' },
  { id: 'isMusician',    text: 'Is it a musician?' },
  { id: 'isRapper',      text: 'Is it a rapper or hip-hop artist?' },
  { id: 'isDancer',      text: 'Is it known for dancing?' },
  { id: 'isSpy',         text: 'Is it a spy or secret agent?' },
  { id: 'isDetective',   text: 'Is it a detective or investigator?' },
  { id: 'isActivist',    text: 'Is it a social activist or humanitarian?' },
  { id: 'isAstronaut',   text: 'Is it an astronaut?' },
];

// ─── Engine Class ─────────────────────────────────────────
export class JiniAIEngine {
  constructor() {
    this.reset();
  }

  // Reset to initial state
  reset() {
    this.candidates = [...knowledgeBase];
    this.askedAttributes = new Set();
    this.answers = {};
    this.treeNode = decisionTree;
    this.useTree = true;
    this.questionCount = 0;
    this.confidenceHistory = [];
  }

  // ── Main: get next question ─────────────────────────────
  getNextQuestion() {
    this.questionCount++;

    // Phase 1: Follow decision tree while possible
    if (this.useTree && this.treeNode && this.treeNode.question) {
      return {
        source: 'tree',
        attribute: this.treeNode.attribute,
        text: this.treeNode.question,
        questionNumber: this.questionCount,
      };
    }

    // Phase 2: Fallback — pick most informative question
    this.useTree = false;
    return this._getMostInformativeQuestion();
  }

  // ── Record answer and advance state ────────────────────
  recordAnswer(attribute, answerKey) {
    const weight = ANSWER_WEIGHTS[answerKey] ?? 0;
    this.answers[attribute] = { answerKey, weight };
    this.askedAttributes.add(attribute);

    // Update candidate scores
    this._updateCandidates(attribute, weight);

    // Advance the decision tree
    if (this.useTree && this.treeNode) {
      this._advanceTree(answerKey);
    }
  }

  // ── Score candidates after an answer ───────────────────
  _updateCandidates(attribute, weight) {
    this.candidates = this.candidates.map(c => {
      const val = c.attributes[attribute];
      let delta = 0;

      if (val === true)  delta = weight * 10;
      if (val === false) delta = weight * -8;
      if (val === undefined) delta = weight * -2; // slight penalty for unknown

      return { ...c, _score: (c._score ?? 50) + delta };
    });

    // Remove candidates with very low scores after enough questions
    if (this.questionCount > 4) {
      const scores = this.candidates.map(c => c._score ?? 50);
      const maxScore = Math.max(...scores);
      const threshold = maxScore - 60;
      this.candidates = this.candidates.filter(c => (c._score ?? 50) >= threshold);
    }
  }

  // ── Advance decision tree node ──────────────────────────
  _advanceTree(answerKey) {
    if (!this.treeNode) return;

    let nextNode;
    if (answerKey === 'yes' || answerKey === 'probably') {
      nextNode = this.treeNode.yes;
    } else if (answerKey === 'no' || answerKey === 'probably_not') {
      nextNode = this.treeNode.no;
    } else {
      // dont_know: stay in tree but mark as used
      nextNode = this.treeNode.yes ?? this.treeNode.no;
    }

    if (nextNode?.candidates) {
      // Reached a leaf — filter candidates
      const leafIds = new Set(nextNode.candidates);
      if (leafIds.size > 0) {
        const leafCandidates = this.candidates.filter(c => leafIds.has(c.id));
        if (leafCandidates.length > 0) {
          this.candidates = leafCandidates.map(c => ({
            ...c,
            _score: (c._score ?? 50) + 30,
          }));
        }
      }
      this.treeNode = null;
      this.useTree = false;
    } else {
      this.treeNode = nextNode ?? null;
      if (!this.treeNode?.question) this.useTree = false;
    }
  }

  // ── Pick the question that splits candidates best ───────
  _getMostInformativeQuestion() {
    const remaining = this.candidates;
    let bestQuestion = null;
    let bestScore = -1;

    for (const q of FALLBACK_QUESTIONS) {
      if (this.askedAttributes.has(q.id)) continue;

      const trueCount  = remaining.filter(c => c.attributes[q.id] === true).length;
      const falseCount = remaining.filter(c => c.attributes[q.id] === false).length;
      const total = trueCount + falseCount;
      if (total === 0) continue;

      // Score = how evenly the question splits the pool (closer to 50/50 = better)
      const ratio = trueCount / total;
      const splitScore = 1 - Math.abs(ratio - 0.5) * 2;
      const coverageScore = total / remaining.length;
      const score = splitScore * 0.7 + coverageScore * 0.3;

      if (score > bestScore) {
        bestScore = score;
        bestQuestion = q;
      }
    }

    // Fallback: just grab first unused
    if (!bestQuestion) {
      bestQuestion = FALLBACK_QUESTIONS.find(q => !this.askedAttributes.has(q.id))
        ?? FALLBACK_QUESTIONS[0];
    }

    return {
      source: 'fallback',
      attribute: bestQuestion.id,
      text: bestQuestion.text,
      questionNumber: this.questionCount,
    };
  }

  // ── Get top candidates sorted by score ─────────────────
  getTopCandidates(n = 5) {
    return [...this.candidates]
      .sort((a, b) => (b._score ?? 50) - (a._score ?? 50))
      .slice(0, n);
  }

  // ── Get best guess ──────────────────────────────────────
  getBestGuess() {
    const sorted = this.getTopCandidates(1);
    return sorted[0] ?? null;
  }

  // ── Confidence score 0–100 ──────────────────────────────
  getConfidence() {
    if (this.candidates.length === 0) return 0;
    if (this.candidates.length === 1) return 97;

    const sorted = [...this.candidates].sort(
      (a, b) => (b._score ?? 50) - (a._score ?? 50)
    );

    const top    = sorted[0]?._score ?? 50;
    const second = sorted[1]?._score ?? 50;
    const gap    = top - second;

    // Confidence scales with gap and question count
    const base = Math.min(40 + this.questionCount * 4, 75);
    const bonus = Math.min(gap / 2, 25);
    return Math.min(Math.round(base + bonus), 99);
  }

  // ── Should we guess now? ────────────────────────────────
  shouldGuess() {
    if (this.candidates.length <= 1) return true;
    if (this.questionCount >= 20)    return true;
    if (this.getConfidence() >= 90)  return true;
    return false;
  }

  // ── Learn: add a new entry to local DB ─────────────────
  learnNewEntry(name, attributes) {
    const newEntry = {
      id: Date.now(),
      name,
      category: 'learned',
      image: '✨',
      attributes,
      _learned: true,
    };
    this.candidates.push(newEntry);

    // Persist to localStorage
    const stored = JSON.parse(localStorage.getItem('jini_learned') ?? '[]');
    stored.push(newEntry);
    localStorage.setItem('jini_learned', JSON.stringify(stored));

    return newEntry;
  }

  // ── Load learned entries from localStorage ──────────────
  loadLearnedEntries() {
    try {
      const stored = JSON.parse(localStorage.getItem('jini_learned') ?? '[]');
      stored.forEach(entry => {
        if (!this.candidates.find(c => c.id === entry.id)) {
          this.candidates.push(entry);
        }
      });
    } catch {
      // ignore parse errors
    }
  }
}

// Singleton instance
export const jiniAI = new JiniAIEngine();
export default jiniAI;