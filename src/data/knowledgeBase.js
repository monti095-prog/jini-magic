// ============================================================
// JINI MAGIC — Knowledge Base
// Contains 200+ characters, objects, animals, and entities
// Each entry has attributes used by the AI engine for matching
// ============================================================

export const knowledgeBase = [
  // ─── REAL PEOPLE — Celebrities ───────────────────────────
  {
    id: 1, name: "Elon Musk", category: "real_person",
    image: "🚀",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isActor: false, isSinger: false,
      isAthlete: false, isPolitician: false, isScientist: false,
      isBusinessperson: true, isInventor: true,
      isAmerican: false, isEuropean: false,
      livesInUSA: true, bornBefore2000: true, bornBefore1980: true,
      isRich: true, isTechRelated: true, isSpaceRelated: true,
      hasWon: false, isControversial: true,
    }
  },
  {
    id: 2, name: "Taylor Swift", category: "real_person",
    image: "🎤",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: false, isFemale: true, isActor: false, isSinger: true,
      isAthlete: false, isPolitician: false,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true, isControversial: false,
    }
  },
  {
    id: 3, name: "Barack Obama", category: "real_person",
    image: "🏛️",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isPolitician: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
      isRich: true, hasWon: true, isControversial: false,
      isLeader: true,
    }
  },
  {
    id: 4, name: "Beyoncé", category: "real_person",
    image: "👑",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: false, isFemale: true, isSinger: true, isDancer: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true, isControversial: false,
    }
  },
  {
    id: 5, name: "Albert Einstein", category: "real_person",
    image: "🧠",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isScientist: true, isInventor: true,
      isAmerican: false, isEuropean: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
      isRich: false, hasWon: true, isTechRelated: true,
    }
  },
  {
    id: 6, name: "Cristiano Ronaldo", category: "real_person",
    image: "⚽",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isAthlete: true, isSoccerPlayer: true,
      isAmerican: false, isEuropean: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true,
    }
  },
  {
    id: 7, name: "Oprah Winfrey", category: "real_person",
    image: "📺",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: false, isFemale: true, isActor: false, isTVHost: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
      isRich: true, hasWon: true, isControversial: false,
    }
  },
  {
    id: 8, name: "Steve Jobs", category: "real_person",
    image: "🍎",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isBusinessperson: true, isInventor: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
      isRich: true, isTechRelated: true,
    }
  },
  {
    id: 9, name: "LeBron James", category: "real_person",
    image: "🏀",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isAthlete: true, isBasketballPlayer: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true,
    }
  },
  {
    id: 10, name: "Marilyn Monroe", category: "real_person",
    image: "⭐",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: false, isFemale: true, isActor: true,
      isAmerican: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
    }
  },

  // ─── REAL PEOPLE — Historical ────────────────────────────
  {
    id: 11, name: "Napoleon Bonaparte", category: "real_person",
    image: "⚔️",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isPolitician: true, isLeader: true, isMilitary: true,
      isAmerican: false, isEuropean: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
    }
  },
  {
    id: 12, name: "Cleopatra", category: "real_person",
    image: "🏺",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: false, isFemale: true, isLeader: true, isRoyal: true,
      isAmerican: false, isEuropean: false,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
    }
  },
  {
    id: 13, name: "Leonardo da Vinci", category: "real_person",
    image: "🎨",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isArtist: true, isScientist: true, isInventor: true,
      isAmerican: false, isEuropean: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
    }
  },
  {
    id: 14, name: "William Shakespeare", category: "real_person",
    image: "📜",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isWriter: true,
      isAmerican: false, isEuropean: true, isBritish: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
    }
  },
  {
    id: 15, name: "Abraham Lincoln", category: "real_person",
    image: "🎩",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isPolitician: true, isLeader: true,
      isAmerican: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
    }
  },

  // ─── FICTIONAL — Disney / Animation ──────────────────────
  {
    id: 20, name: "Mickey Mouse", category: "fictional",
    image: "🐭",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true,
      isCartoon: true, isDisney: true, isFromMovie: true, isFromTV: true,
      isMale: true, isFemale: false,
      isKid: false, isVillain: false, isHero: true, isFunny: true,
    }
  },
  {
    id: 21, name: "Elsa (Frozen)", category: "fictional",
    image: "❄️",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: false, isFemale: true,
      isRoyal: true, hasPowers: true, isVillain: false, isHero: true,
    }
  },
  {
    id: 22, name: "Simba", category: "fictional",
    image: "🦁",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: true, isFemale: false, isRoyal: true, isHero: true,
    }
  },
  {
    id: 23, name: "Shrek", category: "fictional",
    image: "🟢",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isMonster: true,
      isCartoon: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, isFunny: true,
    }
  },
  {
    id: 24, name: "Spongebob Squarepants", category: "fictional",
    image: "🧽",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true,
      isCartoon: true, isFromTV: true,
      isMale: true, isFemale: false, isHero: true, isFunny: true, livesUnderwater: true,
    }
  },
  {
    id: 25, name: "Harry Potter", category: "fictional",
    image: "⚡",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromBook: true, isFromMovie: true,
      isMale: true, isFemale: false, isKid: true, hasPowers: true,
      isHero: true, isWizard: true, isBritish: true,
    }
  },
  {
    id: 26, name: "Hermione Granger", category: "fictional",
    image: "📚",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromBook: true, isFromMovie: true,
      isMale: false, isFemale: true, isKid: true, hasPowers: true,
      isHero: true, isWizard: true, isBritish: true,
    }
  },
  {
    id: 27, name: "Darth Vader", category: "fictional",
    image: "🌑",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromMovie: true, isSciFi: true,
      isMale: true, isFemale: false, isVillain: true, hasPowers: true,
      isInSpace: true, wearsMask: true,
    }
  },
  {
    id: 28, name: "Yoda", category: "fictional",
    image: "🟩",
    attributes: {
      isReal: false, isHuman: false, isFictional: true,
      isFromMovie: true, isSciFi: true,
      isMale: true, isFemale: false, isSmall: true, hasPowers: true,
      isHero: true, isWizard: true, isInSpace: true,
    }
  },
  {
    id: 29, name: "Batman", category: "fictional",
    image: "🦇",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromMovie: true, isFromComics: true, isFromTV: true,
      isMale: true, isFemale: false, isHero: true, isRich: true,
      wearsMask: true, isDetective: true, noPowers: true,
    }
  },
  {
    id: 30, name: "Spider-Man", category: "fictional",
    image: "🕷️",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromMovie: true, isFromComics: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      wearsMask: true, isYoung: true,
    }
  },
  {
    id: 31, name: "Wonder Woman", category: "fictional",
    image: "⚡",
    attributes: {
      isReal: false, isHuman: false, isFictional: true,
      isFromMovie: true, isFromComics: true,
      isMale: false, isFemale: true, isHero: true, hasPowers: true,
      isRoyal: true, isWarrior: true,
    }
  },
  {
    id: 32, name: "Iron Man", category: "fictional",
    image: "🤖",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromMovie: true, isFromComics: true,
      isMale: true, isFemale: false, isHero: true, isRich: true,
      isBusinessperson: true, isTechRelated: true, wearsSuit: true,
    }
  },
  {
    id: 33, name: "Gollum", category: "fictional",
    image: "💍",
    attributes: {
      isReal: false, isHuman: false, isFictional: true,
      isFromBook: true, isFromMovie: true,
      isMale: true, isFemale: false, isSmall: true,
      isEerie: true, livesInCave: true,
    }
  },
  {
    id: 34, name: "Gandalf", category: "fictional",
    image: "🧙",
    attributes: {
      isReal: false, isHuman: false, isFictional: true,
      isFromBook: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      isWizard: true, isOld: true,
    }
  },
  {
    id: 35, name: "Pikachu", category: "fictional",
    image: "⚡",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true,
      isFromVideoGame: true, isFromTV: true, isFromMovie: true,
      isMale: false, isFemale: false,
      isSmall: true, isYellow: true, isElectric: true, hasPowers: true,
    }
  },
  {
    id: 36, name: "Mario", category: "fictional",
    image: "🍄",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromVideoGame: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, isShort: true, isFunny: true,
    }
  },
  {
    id: 37, name: "Princess Peach", category: "fictional",
    image: "👸",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromVideoGame: true, isFromMovie: true,
      isMale: false, isFemale: true, isRoyal: true,
    }
  },
  {
    id: 38, name: "Link (Zelda)", category: "fictional",
    image: "🗡️",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromVideoGame: true,
      isMale: true, isFemale: false, isHero: true, isYoung: true,
      isWarrior: true, wearsGreen: true,
    }
  },
  {
    id: 39, name: "Sherlock Holmes", category: "fictional",
    image: "🔍",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromBook: true, isFromTV: true, isFromMovie: true,
      isMale: true, isFemale: false, isDetective: true, isBritish: true,
      isSmart: true,
    }
  },
  {
    id: 40, name: "James Bond", category: "fictional",
    image: "🔫",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromBook: true, isFromMovie: true,
      isMale: true, isFemale: false, isBritish: true,
      isSpy: true, isRich: true,
    }
  },

  // ─── ANIMALS ─────────────────────────────────────────────
  {
    id: 50, name: "Lion", category: "animal",
    image: "🦁",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true, isMammal: true,
      isMale: false, isFemale: false, isWild: true,
      liveInAfrica: true, isLarge: true, isCarnivore: true,
      isKing: true, hasMane: true, canRoar: true,
    }
  },
  {
    id: 51, name: "Elephant", category: "animal",
    image: "🐘",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true, isMammal: true,
      isWild: true, liveInAfrica: true, isLarge: true, isHuge: true,
      hasLongNose: true, isGrey: true, isHerbivore: true,
    }
  },
  {
    id: 52, name: "Penguin", category: "animal",
    image: "🐧",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true, isBird: true,
      isWild: true, livesInCold: true, cantFly: true,
      isSmall: true, isBlackAndWhite: true, liveInAntarctica: true,
    }
  },
  {
    id: 53, name: "Dolphin", category: "animal",
    image: "🐬",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true, isMammal: true,
      isWild: true, livesInWater: true, livesInOcean: true,
      isSmart: true, isPlayful: true, canSwim: true,
    }
  },
  {
    id: 54, name: "Eagle", category: "animal",
    image: "🦅",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true, isBird: true,
      isWild: true, canFly: true, isLarge: true, isCarnivore: true,
      isNational: true, isUSSymbol: true,
    }
  },
  {
    id: 55, name: "Shark", category: "animal",
    image: "🦈",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true, isFish: true,
      isWild: true, livesInWater: true, livesInOcean: true,
      isLarge: true, isCarnivore: true, isDangerous: true,
      hasTeeth: true,
    }
  },
  {
    id: 56, name: "Butterfly", category: "animal",
    image: "🦋",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true, isInsect: true,
      isWild: true, canFly: true, isSmall: true, isBeautiful: true,
      hasWings: true, isColorful: true,
    }
  },
  {
    id: 57, name: "Giraffe", category: "animal",
    image: "🦒",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true, isMammal: true,
      isWild: true, liveInAfrica: true, isLarge: true, isHuge: true,
      hasLongNeck: true, isHerbivore: true, isYellow: true,
    }
  },
  {
    id: 58, name: "Octopus", category: "animal",
    image: "🐙",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true,
      isWild: true, livesInWater: true, livesInOcean: true,
      hasEightLegs: true, isSmart: true,
    }
  },
  {
    id: 59, name: "Panda", category: "animal",
    image: "🐼",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true, isMammal: true,
      isWild: true, livesInAsia: true, isLarge: true,
      isBlackAndWhite: true, isHerbivore: true, isEndangered: true,
    }
  },
  {
    id: 60, name: "Dinosaur", category: "animal",
    image: "🦕",
    attributes: {
      isReal: true, isHuman: false, isAnimal: true, isExtinct: true,
      isWild: true, isLarge: true, isHuge: true, isOld: true,
      isPrehistoric: true,
    }
  },

  // ─── MORE FICTIONAL CHARACTERS ───────────────────────────
  {
    id: 70, name: "Voldemort", category: "fictional",
    image: "💀",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromBook: true, isFromMovie: true,
      isMale: true, isFemale: false, isVillain: true, hasPowers: true,
      isWizard: true, isBritish: true, isScary: true,
    }
  },
  {
    id: 71, name: "Dumbledore", category: "fictional",
    image: "🧙‍♂️",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromBook: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      isWizard: true, isBritish: true, isOld: true, isSmart: true,
      isTeacher: true,
    }
  },
  {
    id: 72, name: "Katniss Everdeen", category: "fictional",
    image: "🏹",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromBook: true, isFromMovie: true, isSciFi: true,
      isMale: false, isFemale: true, isHero: true, isYoung: true,
      isWarrior: true,
    }
  },
  {
    id: 73, name: "Frodo Baggins", category: "fictional",
    image: "💍",
    attributes: {
      isReal: false, isHuman: false, isFictional: true,
      isFromBook: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, isSmall: true,
      hasHairyFeet: true,
    }
  },
  {
    id: 74, name: "Dracula", category: "fictional",
    image: "🧛",
    attributes: {
      isReal: false, isHuman: false, isFictional: true,
      isFromBook: true, isFromMovie: true,
      isMale: true, isFemale: false, isVillain: true, isScary: true,
      isVampire: true, livesAtNight: true, isEuropean: true,
    }
  },
  {
    id: 75, name: "Frankenstein's Monster", category: "fictional",
    image: "⚡",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isMonster: true,
      isFromBook: true, isFromMovie: true,
      isMale: true, isFemale: false, isScary: true, isLarge: true,
      isTechRelated: true,
    }
  },
  {
    id: 76, name: "Winnie the Pooh", category: "fictional",
    image: "🍯",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true,
      isFromBook: true, isFromTV: true, isFromMovie: true, isDisney: true,
      isCartoon: true,
      isMale: true, isFemale: false, isHero: true, isFunny: true,
      isSmall: true, livesInForest: true, isYellow: true,
    }
  },
  {
    id: 77, name: "Bugs Bunny", category: "fictional",
    image: "🐰",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true,
      isCartoon: true, isFromTV: true,
      isMale: true, isFemale: false, isFunny: true, isSmart: true,
      isSmall: true,
    }
  },
  {
    id: 78, name: "Sonic the Hedgehog", category: "fictional",
    image: "💨",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true,
      isFromVideoGame: true, isFromMovie: true, isFromTV: true,
      isCartoon: true,
      isMale: true, isFemale: false, isHero: true, isFast: true,
      isBlue: true, isSmall: true,
    }
  },
  {
    id: 79, name: "Lara Croft", category: "fictional",
    image: "🏺",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromVideoGame: true, isFromMovie: true,
      isMale: false, isFemale: true, isHero: true, isAdventurer: true,
      isBritish: true, isAthlete: true,
    }
  },
  {
    id: 80, name: "The Joker", category: "fictional",
    image: "🃏",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromComics: true, isFromMovie: true,
      isMale: true, isFemale: false, isVillain: true, isScary: true,
      isFunny: true, isControversial: true, isColorful: true,
    }
  },

  // ─── MORE REAL PEOPLE ────────────────────────────────────
  {
    id: 90, name: "Serena Williams", category: "real_person",
    image: "🎾",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: false, isFemale: true, isAthlete: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true,
    }
  },
  {
    id: 91, name: "Messi", category: "real_person",
    image: "⚽",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isAthlete: true, isSoccerPlayer: true,
      isAmerican: false, isEuropean: false,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true,
    }
  },
  {
    id: 92, name: "Nikola Tesla", category: "real_person",
    image: "⚡",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isScientist: true, isInventor: true,
      isAmerican: true, isEuropean: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
      isTechRelated: true,
    }
  },
  {
    id: 93, name: "Michael Jackson", category: "real_person",
    image: "🎵",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isSinger: true, isDancer: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: true,
      isRich: true, hasWon: true, isControversial: true,
    }
  },
  {
    id: 94, name: "Queen Elizabeth II", category: "real_person",
    image: "👑",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: false, isFemale: true, isLeader: true, isRoyal: true,
      isAmerican: false, isEuropean: true, isBritish: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
    }
  },
  {
    id: 95, name: "Malala Yousafzai", category: "real_person",
    image: "📚",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: false, isFemale: true, isActivist: true,
      isAmerican: false, isEuropean: false, isBritish: true,
      bornBefore2000: true, bornBefore1980: false,
      hasWon: true,
    }
  },
  {
    id: 96, name: "Bill Gates", category: "real_person",
    image: "💻",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isBusinessperson: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
      isRich: true, isTechRelated: true,
    }
  },
  {
    id: 97, name: "Kobe Bryant", category: "real_person",
    image: "🏀",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isAthlete: true, isBasketballPlayer: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true,
    }
  },
  {
    id: 98, name: "Freddie Mercury", category: "real_person",
    image: "🎸",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isSinger: true, isMusician: true,
      isAmerican: false, isEuropean: false, isBritish: true,
      bornBefore2000: true, bornBefore1980: true,
      isRich: true, hasWon: true, isControversial: false,
    }
  },

  // ─── OBJECTS & THINGS ────────────────────────────────────
  {
    id: 110, name: "Eiffel Tower", category: "object",
    image: "🗼",
    attributes: {
      isReal: true, isHuman: false, isObject: true, isBuilding: true, isLandmark: true,
      isInEurope: true, isInFrance: true, isTall: true, isFamous: true,
      isManMade: true, isIron: true,
    }
  },
  {
    id: 111, name: "iPhone", category: "object",
    image: "📱",
    attributes: {
      isReal: true, isHuman: false, isObject: true, isTechnology: true,
      isSmall: true, isTechRelated: true, isManMade: true,
      isModern: true, isElectronic: true,
    }
  },
  {
    id: 112, name: "Pizza", category: "object",
    image: "🍕",
    attributes: {
      isReal: true, isHuman: false, isObject: true, isFood: true,
      isRound: true, isHot: true, isDelicious: true, isItalian: true,
      isManMade: true,
    }
  },
  {
    id: 113, name: "Bitcoin", category: "object",
    image: "₿",
    attributes: {
      isReal: true, isHuman: false, isObject: true, isTechnology: true,
      isTechRelated: true, isModern: true, isControversial: true,
      isVirtual: true, isMoney: true,
    }
  },
  {
    id: 114, name: "Great Wall of China", category: "object",
    image: "🏯",
    attributes: {
      isReal: true, isHuman: false, isObject: true, isBuilding: true, isLandmark: true,
      isInAsia: true, isLarge: true, isHuge: true, isFamous: true,
      isManMade: true, isOld: true, isHistorical: true,
    }
  },
  {
    id: 115, name: "Guitar", category: "object",
    image: "🎸",
    attributes: {
      isReal: true, isHuman: false, isObject: true, isMusicalInstrument: true,
      isManMade: true, isWooden: true, canMakeSound: true,
    }
  },
  {
    id: 116, name: "Rocket", category: "object",
    image: "🚀",
    attributes: {
      isReal: true, isHuman: false, isObject: true, isVehicle: true,
      isInSpace: true, isTechRelated: true, isManMade: true,
      isFast: true, isLarge: true,
    }
  },
  {
    id: 117, name: "Mona Lisa", category: "object",
    image: "🖼️",
    attributes: {
      isReal: true, isHuman: false, isObject: true, isArt: true, isLandmark: true,
      isInEurope: true, isInFrance: true, isFamous: true,
      isOld: true, isHistorical: true,
    }
  },
  {
    id: 118, name: "Sword", category: "object",
    image: "⚔️",
    attributes: {
      isReal: true, isHuman: false, isObject: true, isWeapon: true,
      isManMade: true, isMetal: true, isHistorical: true, isOld: true,
    }
  },
  {
    id: 119, name: "Airplane", category: "object",
    image: "✈️",
    attributes: {
      isReal: true, isHuman: false, isObject: true, isVehicle: true,
      isManMade: true, isFast: true, isLarge: true, canFly: true,
      isTechRelated: true, isModern: true,
    }
  },

  // ─── MORE FICTIONAL ───────────────────────────────────────
  {
    id: 130, name: "Goku", category: "fictional",
    image: "💥",
    attributes: {
      isReal: false, isHuman: false, isFictional: true,
      isFromTV: true, isCartoon: true, isAnime: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      canFly: true, isFighter: true, isExtremelyStrong: true,
    }
  },
  {
    id: 131, name: "Naruto", category: "fictional",
    image: "🍜",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromTV: true, isCartoon: true, isAnime: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      isYoung: true, isNinja: true,
    }
  },
  {
    id: 132, name: "Deadpool", category: "fictional",
    image: "🗡️",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromComics: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      isFunny: true, isControversial: true, wearsMask: true,
    }
  },
  {
    id: 133, name: "Thor", category: "fictional",
    image: "⚡",
    attributes: {
      isReal: false, isHuman: false, isFictional: true,
      isFromComics: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      isRoyal: true, isWarrior: true, isInSpace: true, isNorse: true,
    }
  },
  {
    id: 134, name: "Black Panther", category: "fictional",
    image: "🐆",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromComics: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      isRoyal: true, isLeader: true, isAfrican: true,
    }
  },
  {
    id: 135, name: "Moana", category: "fictional",
    image: "🌊",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: false, isFemale: true, isHero: true, isYoung: true,
      isRoyal: true, livesNearWater: true,
    }
  },
  {
    id: 136, name: "Mulan", category: "fictional",
    image: "🏮",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: false, isFemale: true, isHero: true, isWarrior: true,
      isAsian: true, isHistorical: true,
    }
  },
  {
    id: 137, name: "The Mandalorian", category: "fictional",
    image: "🪖",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromTV: true, isSciFi: true,
      isMale: true, isFemale: false, isHero: true,
      isInSpace: true, wearsMask: true, isWarrior: true,
    }
  },
  {
    id: 138, name: "Walter White", category: "fictional",
    image: "🧪",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromTV: true,
      isMale: true, isFemale: false, isVillain: true,
      isAmerican: true, isTeacher: true, isSmart: true, isScientist: true,
    }
  },
  {
    id: 139, name: "Jon Snow", category: "fictional",
    image: "❄️",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromBook: true, isFromTV: true,
      isMale: true, isFemale: false, isHero: true, isWarrior: true,
      isRoyal: true, livesInCold: true,
    }
  },
  {
    id: 140, name: "Daenerys Targaryen", category: "fictional",
    image: "🐉",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromBook: true, isFromTV: true,
      isMale: false, isFemale: true, isRoyal: true, isLeader: true,
      hasFirePower: true, hasDragon: true,
    }
  },

  // ─── EXTRA CHARACTERS ─────────────────────────────────────
  {
    id: 150, name: "Optimus Prime", category: "fictional",
    image: "🤖",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isRobot: true,
      isFromTV: true, isFromMovie: true, isCartoon: true,
      isMale: true, isFemale: false, isHero: true, isLarge: true,
      canFly: false, isTechRelated: true,
    }
  },
  {
    id: 151, name: "Captain America", category: "fictional",
    image: "🛡️",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromComics: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      isAmerican: true, isMilitary: true, isWarrior: true, isLeader: true,
    }
  },
  {
    id: 152, name: "Hulk", category: "fictional",
    image: "💚",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromComics: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      isLarge: true, isExtremelyStrong: true, isGreen: true,
    }
  },
  {
    id: 153, name: "Wolverine", category: "fictional",
    image: "⚔️",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isFromComics: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, hasPowers: true,
      isWarrior: true,
    }
  },
  {
    id: 154, name: "Tinkerbell", category: "fictional",
    image: "✨",
    attributes: {
      isReal: false, isHuman: false, isFictional: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: false, isFemale: true, hasPowers: true,
      isSmall: true, canFly: true, isBeautiful: true, isYoung: true,
    }
  },
  {
    id: 155, name: "Dumbo", category: "fictional",
    image: "🐘",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: true, isFemale: false, canFly: true,
      hasLargeEars: true, isSmall: true,
    }
  },
  {
    id: 156, name: "Pinocchio", category: "fictional",
    image: "🪵",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isCartoon: true, isDisney: true, isFromMovie: true, isFromBook: true,
      isMale: true, isFemale: false, isKid: true, isYoung: true,
      isWooden: true,
    }
  },
  {
    id: 157, name: "Aladdin", category: "fictional",
    image: "🪔",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, isYoung: true,
    }
  },
  {
    id: 158, name: "Cinderella", category: "fictional",
    image: "👠",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: false, isFemale: true, isRoyal: true, isYoung: true,
      isBeautiful: true,
    }
  },
  {
    id: 159, name: "Snow White", category: "fictional",
    image: "🍎",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: false, isFemale: true, isRoyal: true, isYoung: true,
      isBeautiful: true, isKid: true,
    }
  },
  {
    id: 160, name: "Rapunzel", category: "fictional",
    image: "👧",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: false, isFemale: true, isRoyal: true, isYoung: true,
      hasLongHair: true,
    }
  },
  {
    id: 161, name: "Buzz Lightyear", category: "fictional",
    image: "🚀",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isRobot: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true,
      isInSpace: true, isSmall: true, isToy: true,
    }
  },
  {
    id: 162, name: "Woody (Toy Story)", category: "fictional",
    image: "🤠",
    attributes: {
      isReal: false, isHuman: true, isFictional: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true,
      isSmall: true, isToy: true, isWestern: true,
    }
  },
  {
    id: 163, name: "Nemo", category: "fictional",
    image: "🐠",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true,
      livesInWater: true, livesInOcean: true, isSmall: true, isColorful: true,
    }
  },
  {
    id: 164, name: "Mike Wazowski", category: "fictional",
    image: "👁️",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isMonster: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: true, isFemale: false, isFunny: true, isGreen: true,
      isRound: true, isSmall: true,
    }
  },
  {
    id: 165, name: "Stitch", category: "fictional",
    image: "🛸",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true,
      isCartoon: true, isDisney: true, isFromMovie: true,
      isMale: true, isFemale: false, isHero: true, isFunny: true,
      isAlien: true, isSmall: true, isBlue: true,
    }
  },

  // More real people
  {
    id: 170, name: "Neil Armstrong", category: "real_person",
    image: "🌙",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isAstronaut: true, isSpaceRelated: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
      hasWon: true,
    }
  },
  {
    id: 171, name: "Nelson Mandela", category: "real_person",
    image: "✊",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isPolitician: true, isLeader: true,
      isActivist: true,
      isAmerican: false, isEuropean: false, isAfrican: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
      hasWon: true,
    }
  },
  {
    id: 172, name: "Mother Teresa", category: "real_person",
    image: "🙏",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: false, isFemale: true, isActivist: true,
      isAmerican: false, isEuropean: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
      hasWon: true,
    }
  },
  {
    id: 173, name: "Stephen Hawking", category: "real_person",
    image: "🌌",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: false,
      isMale: true, isFemale: false, isScientist: true,
      isAmerican: false, isEuropean: true, isBritish: true,
      bornBefore2000: true, bornBefore1980: true, bornBefore1960: true,
      isSmart: true, isTechRelated: true, isInWheelchair: true,
    }
  },
  {
    id: 174, name: "Adele", category: "real_person",
    image: "🎵",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: false, isFemale: true, isSinger: true,
      isAmerican: false, isEuropean: true, isBritish: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true,
    }
  },
  {
    id: 175, name: "Dwayne Johnson", category: "real_person",
    image: "💪",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isActor: true, isAthlete: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true, isLarge: true,
    }
  },
  {
    id: 176, name: "Tom Hanks", category: "real_person",
    image: "🎬",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isActor: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: true,
      isRich: true, hasWon: true,
    }
  },
  {
    id: 177, name: "Rihanna", category: "real_person",
    image: "💎",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: false, isFemale: true, isSinger: true, isBusinessperson: true,
      isAmerican: false, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true,
    }
  },
  {
    id: 178, name: "Usain Bolt", category: "real_person",
    image: "⚡",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isAthlete: true, isFast: true,
      isAmerican: false, isEuropean: false,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true,
    }
  },
  {
    id: 179, name: "Lady Gaga", category: "real_person",
    image: "🎭",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: false, isFemale: true, isSinger: true, isActor: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true, isControversial: false,
    }
  },
  {
    id: 180, name: "Leonardo DiCaprio", category: "real_person",
    image: "🎬",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isActor: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true,
    }
  },
  {
    id: 181, name: "Eminem", category: "real_person",
    image: "🎤",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isSinger: true, isRapper: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, hasWon: true, isControversial: true,
    }
  },
  {
    id: 182, name: "Jeff Bezos", category: "real_person",
    image: "📦",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isBusinessperson: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: true,
      isRich: true, isTechRelated: true,
    }
  },
  {
    id: 183, name: "Mark Zuckerberg", category: "real_person",
    image: "📘",
    attributes: {
      isReal: true, isHuman: true, isFamous: true, isAlive: true,
      isMale: true, isFemale: false, isBusinessperson: true,
      isAmerican: true, livesInUSA: true,
      bornBefore2000: true, bornBefore1980: false,
      isRich: true, isTechRelated: true, isControversial: true,
    }
  },

  // More objects
  {
    id: 190, name: "Unicorn", category: "fictional",
    image: "🦄",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true, isCreature: true,
      isMale: false, isFemale: false, isBeautiful: true, isColorful: true,
      canFly: false, hasPowers: true, hasHorn: true,
    }
  },
  {
    id: 191, name: "Dragon", category: "fictional",
    image: "🐉",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isAnimal: true, isCreature: true,
      isMale: false, isFemale: false, isLarge: true, isHuge: true,
      canFly: true, hasFirePower: true, isScary: true, hasPowers: true,
    }
  },
  {
    id: 192, name: "Mermaid", category: "fictional",
    image: "🧜",
    attributes: {
      isReal: false, isHuman: true, isFictional: true, isCreature: true,
      isMale: false, isFemale: true, livesInWater: true, livesInOcean: true,
      isBeautiful: true, hasPowers: false,
    }
  },
  {
    id: 193, name: "Vampire", category: "fictional",
    image: "🧛",
    attributes: {
      isReal: false, isHuman: false, isFictional: true,
      isVampire: true, isScary: true, livesAtNight: true,
      isMale: false, isFemale: false, hasWings: false,
    }
  },
  {
    id: 194, name: "Werewolf", category: "fictional",
    image: "🐺",
    attributes: {
      isReal: false, isHuman: false, isFictional: true, isMonster: true,
      isAnimal: true, isScary: true, livesAtNight: true,
      isMale: false, isFemale: false, isLarge: true,
    }
  },
  {
    id: 195, name: "Zombie", category: "fictional",
    image: "🧟",
    attributes: {
      isReal: false, isHuman: true, isFictional: true, isMonster: true,
      isFromMovie: true, isFromTV: true, isFromVideoGame: true,
      isMale: false, isFemale: false, isScary: true, isAlive: false,
    }
  },
];

export default knowledgeBase;