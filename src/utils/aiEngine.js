// ============================================================
// JINI MAGIC — AI Engine (Improved)
// Better scoring, stricter filtering, smarter guessing
// ============================================================

import { knowledgeBase } from '../data/knowledgeBase.js';
import { decisionTree } from '../data/decisionTree.js';

const ANSWER_WEIGHTS = {
  yes:          2.0,
  no:          -2.0,
  probably:     1.2,
  probably_not: -1.2,
  dont_know:    0.0,
};

export const FALLBACK_QUESTIONS = [
  { id: 'isReal',        text: 'Is it a real person or thing (not fictional)?' },
  { id: 'isHuman',       text: 'Is it a human being?' },
  { id: 'isAlive',       text: 'Is this person still alive today?' },
  { id: 'isFamous',      text: 'Is it world-famous?' },
  { id: 'isMale',        text: 'Is it male?' },
  { id: 'isFemale',      text: 'Is it female?' },
  { id: 'isActor',       text: 'Is it an actor or actress?' },
  { id: 'isSinger',      text: 'Is it a singer or musician?' },
  { id: 'isAthlete',     text: 'Is it an athlete or sports person?' },
  { id: 'isPolitician',  text: 'Is it a politician or world leader?' },
  { id: 'isScientist',   text: 'Is it a scientist or inventor?' },
  { id: 'isBusinessperson', text: 'Is it a businessperson or entrepreneur?' },
  { id: 'isSoccerPlayer', text: 'Is it a soccer/football player?' },
  { id: 'isBasketballPlayer', text: 'Is it a basketball player?' },
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
  { id: 'isDisney',      text: 'Is it a Disney character?' },
  { id: 'isAnime',       text: 'Is it from anime?' },
  { id: 'isHero',        text: 'Is it a hero or protagonist?' },
  { id: 'isVillain',     text: 'Is it a villain?' },
  { id: 'hasPowers',     text: 'Does it have special powers?' },
  { id: 'isRoyal',       text: 'Is it royalty?' },
  { id: 'isWizard',      text: 'Is it a wizard or magic user?' },
  { id: 'isWarrior',     text: 'Is it a warrior or fighter?' },
  { id: 'isAnimal',      text: 'Is it an animal?' },
  { id: 'isMammal',      text: 'Is it a mammal?' },
  { id: 'isBird',        text: 'Is it a bird?' },
  { id: 'livesInWater',  text: 'Does it live in water?' },
  { id: 'canFly',        text: 'Can it fly?' },
  { id: 'isLarge',       text: 'Is it large (bigger than a human)?' },
  { id: 'isSmall',       text: 'Is it small (smaller than a cat)?' },
  { id: 'isObject',      text: 'Is it an inanimate object or place?' },
  { id: 'isBuilding',    text: 'Is it a building or landmark?' },
  { id: 'isVehicle',     text: 'Is it a vehicle?' },
  { id: 'isFood',        text: 'Is it a food or drink?' },
  { id: 'isTechnology',  text: 'Is it a piece of technology?' },
  { id: 'isSciFi',       text: 'Is it from a science fiction story?' },
  { id: 'isInSpace',     text: 'Is it associated with outer space?' },
  { id: 'wearsMask',     text: 'Does it wear a mask?' },
  { id: 'isRobot',       text: 'Is it a robot?' },
  { id: 'isMonster',     text: 'Is it a monster or mythical creature?' },
  { id: 'isFunny',       text: 'Is it known for being funny?' },
  { id: 'isBritish',     text: 'Is it British or from the UK?' },
  { id: 'isAmerican',    text: 'Is it American?' },
  { id: 'isEuropean',    text: 'Is it European?' },
  { id: 'livesInCold',   text: 'Does it live in a cold environment?' },
  { id: 'isExtinct',     text: 'Is it extinct?' },
  { id: 'isHistorical',  text: 'Is it from a historical period (pre-1900)?' },
  { id: 'isLeader',      text: 'Is it known as a great leader?' },
  { id: 'isSmart',       text: 'Is it known for being very intelligent?' },
  { id: 'isTechRelated', text: 'Is it related to computers or technology?' },
  { id: 'bornBefore1980', text: 'Was it born or created before 1980?' },
  { id: 'bornBefore1960', text: 'Was it born or created before 1960?' },
  { id: 'isYoung',       text: 'Is it young (under 30 years old)?' },
  { id: 'isOld',         text: 'Is it very old?' },
  { id: 'liveInAfrica',  text: 'Does it come from Africa?' },
  { id: 'livesInAsia',   text: 'Does it come from Asia?' },
  { id: 'isVampire',     text: 'Is it a vampire?' },
  { id: 'isNinja',       text: 'Is it a ninja?' },
  { id: 'isToy',         text: 'Is it a toy?' },
  { id: 'isAlien',       text: 'Is it an alien?' },
  { id: 'isRapper',      text: 'Is it a rapper?' },
  { id: 'isDancer',      text: 'Is it known for dancing?' },
  { id: 'isSpy',         text: 'Is it a spy or secret agent?' },
  { id: 'isDetective',   text: 'Is it a detective?' },
  { id: 'isAstronaut',   text: 'Is it an astronaut?' },
  { id: 'isActivist',    text: 'Is it a social activist?' },
  { id: 'isMusician',    text: 'Is it a musician?' },
  { id: 'hasDragon',     text: 'Is it associated with dragons?' },
  { id: 'isPrehistoric', text: 'Did it exist before recorded history?' },
  { id: 'isEndangered',  text: 'Is it an endangered species?' },
];

export class JiniAIEngine {
  constructor() {
    this.reset();
  }

  reset() {
    // Give every candidate a fresh score of 100
    this.candidates = knowledgeBase.map(c => ({ ...c, _score: 100 }));
    this.askedAttributes = new Set();
    this.answers = {};
    this.treeNode = decisionTree;
    this.useTree = true;
    this.questionCount = 0;
    this.hardEliminated = new Set(); // IDs that got hard NO answers
  }

  getNextQuestion() {
    this.questionCount++;

    if (this.useTree && this.treeNode && this.treeNode.question) {
      return {
        source: 'tree',
        attribute: this.treeNode.attribute,
        text: this.treeNode.question,
        questionNumber: this.questionCount,
      };
    }

    this.useTree = false;
    return this._getMostInformativeQuestion();
  }

  recordAnswer(attribute, answerKey) {
    const weight = ANSWER_WEIGHTS[answerKey] ?? 0;
    this.answers[attribute] = { answerKey, weight };
    this.askedAttributes.add(attribute);

    this._updateCandidates(attribute, answerKey, weight);

    if (this.useTree && this.treeNode) {
      this._advanceTree(answerKey);
    }
  }

  _updateCandidates(attribute, answerKey, weight) {
    const isYesLike = answerKey === 'yes' || answerKey === 'probably';
    const isNoLike  = answerKey === 'no'  || answerKey === 'probably_not';

    this.candidates = this.candidates.map(c => {
      const val = c.attributes[attribute];
      let delta = 0;

      if (isYesLike) {
        if (val === true)      delta = +25;  // strong match
        else if (val === false) delta = -40; // strong mismatch — hard eliminate
        else                   delta = -5;   // unknown — slight penalty
      } else if (isNoLike) {
        if (val === false)     delta = +20;  // confirmed absence matches
        else if (val === true)  delta = -40; // strong mismatch
        else                   delta = -5;
      }
      // dont_know: no change

      return { ...c, _score: (c._score ?? 100) + delta };
    });

    // Hard eliminate candidates with very low scores
    this._pruneWeakCandidates();
  }

  _pruneWeakCandidates() {
    // Only prune after at least 3 questions
    if (this.questionCount < 3) return;

    const scores  = this.candidates.map(c => c._score ?? 100);
    const maxScore = Math.max(...scores);

    // Remove anything scoring less than 40% of the top score
    const threshold = maxScore * 0.4;
    const pruned = this.candidates.filter(c => (c._score ?? 100) >= threshold);

    // Always keep at least 1 candidate
    if (pruned.length >= 1) {
      this.candidates = pruned;
    }
  }

  _advanceTree(answerKey) {
    if (!this.treeNode) return;

    const isYes = answerKey === 'yes' || answerKey === 'probably';
    const isNo  = answerKey === 'no'  || answerKey === 'probably_not';

    let nextNode;
    if (isYes)       nextNode = this.treeNode.yes;
    else if (isNo)   nextNode = this.treeNode.no;
    else             nextNode = this.treeNode.yes ?? this.treeNode.no;

    if (nextNode?.candidates) {
      // Leaf node — boost matching candidates strongly
      const leafIds = new Set(nextNode.candidates);
      if (leafIds.size > 0) {
        this.candidates = this.candidates.map(c => ({
          ...c,
          _score: leafIds.has(c.id)
            ? (c._score ?? 100) + 50   // big boost for tree matches
            : (c._score ?? 100) - 20,  // penalty for non-matches
        }));
      }
      this.treeNode = null;
      this.useTree  = false;
    } else {
      this.treeNode = nextNode ?? null;
      if (!this.treeNode?.question) this.useTree = false;
    }
  }

  _getMostInformativeQuestion() {
    const remaining = this.candidates;
    if (remaining.length === 0) return FALLBACK_QUESTIONS[0];

    let bestQuestion = null;
    let bestScore    = -1;

    for (const q of FALLBACK_QUESTIONS) {
      if (this.askedAttributes.has(q.id)) continue;

      const trueCount  = remaining.filter(c => c.attributes[q.id] === true).length;
      const falseCount = remaining.filter(c => c.attributes[q.id] === false).length;
      const total      = trueCount + falseCount;
      if (total === 0) continue;

      // Ideal split: 50/50
      const ratio      = trueCount / total;
      const splitScore = 1 - Math.abs(ratio - 0.5) * 2;
      const coverage   = total / remaining.length;
      const score      = splitScore * 0.65 + coverage * 0.35;

      if (score > bestScore) {
        bestScore    = score;
        bestQuestion = q;
      }
    }

    return bestQuestion
      ? {
          source:         'fallback',
          attribute:      bestQuestion.id,
          text:           bestQuestion.text,
          questionNumber: this.questionCount,
        }
      : {
          source:         'fallback',
          attribute:      FALLBACK_QUESTIONS[0].id,
          text:           FALLBACK_QUESTIONS[0].text,
          questionNumber: this.questionCount,
        };
  }

  getTopCandidates(n = 5) {
    return [...this.candidates]
      .sort((a, b) => (b._score ?? 100) - (a._score ?? 100))
      .slice(0, n);
  }

  getBestGuess() {
    return this.getTopCandidates(1)[0] ?? null;
  }

  getConfidence() {
    if (this.candidates.length === 0) return 0;
    if (this.candidates.length === 1) return 97;

    const sorted = [...this.candidates].sort(
      (a, b) => (b._score ?? 100) - (a._score ?? 100)
    );

    const top    = sorted[0]?._score ?? 100;
    const second = sorted[1]?._score ?? 100;
    const gap    = Math.max(0, top - second);

    const base  = Math.min(35 + this.questionCount * 5, 70);
    const bonus = Math.min(gap * 0.8, 28);
    return Math.min(Math.round(base + bonus), 99);
  }

  shouldGuess() {
    if (this.candidates.length <= 1)  return true;
    if (this.questionCount >= 20)     return true;
    if (this.getConfidence() >= 92)   return true;

    // If top candidate is far ahead of second, guess early
    const top = this.getTopCandidates(2);
    if (top.length === 2) {
      const gap = (top[0]._score ?? 100) - (top[1]._score ?? 100);
      if (gap > 80 && this.questionCount >= 6) return true;
    }

    return false;
  }

  learnNewEntry(name, attributes) {
    const newEntry = {
      id:       Date.now(),
      name,
      category: 'learned',
      image:    '✨',
      attributes,
      _learned: true,
      _score:   100,
    };
    this.candidates.push(newEntry);

    const stored = JSON.parse(localStorage.getItem('jini_learned') ?? '[]');
    stored.push(newEntry);
    localStorage.setItem('jini_learned', JSON.stringify(stored));

    return newEntry;
  }

  loadLearnedEntries() {
    try {
      const stored = JSON.parse(localStorage.getItem('jini_learned') ?? '[]');
      stored.forEach(entry => {
        if (!this.candidates.find(c => c.id === entry.id)) {
          this.candidates.push({ ...entry, _score: 100 });
        }
      });
    } catch {
      // ignore
    }
  }
}

export const jiniAI = new JiniAIEngine();
export default jiniAI;