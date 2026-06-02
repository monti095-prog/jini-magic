// ============================================================
// JINI MAGIC — Decision Tree
// Hierarchical question tree that narrows down candidates
// Each node has a question + yes/no paths leading to more
// questions or leaf nodes with candidate IDs
// ============================================================

export const decisionTree = {
  id: "root",
  question: "Is it a real person or thing (not fictional)?",
  attribute: "isReal",
  yes: {
    id: "real_human",
    question: "Is it a human being?",
    attribute: "isHuman",
    yes: {
      id: "real_human_alive",
      question: "Is this person still alive today?",
      attribute: "isAlive",
      yes: {
        id: "real_alive_famous",
        question: "Are they world-famous (known globally)?",
        attribute: "isFamous",
        yes: {
          id: "real_alive_famous_gender",
          question: "Is this person male?",
          attribute: "isMale",
          yes: {
            id: "real_alive_male_field",
            question: "Are they primarily known for sports?",
            attribute: "isAthlete",
            yes: {
              id: "real_alive_male_sport_type",
              question: "Do they play soccer/football?",
              attribute: "isSoccerPlayer",
              yes: { candidates: [6, 91] },
              no: {
                question: "Do they play basketball?",
                attribute: "isBasketballPlayer",
                yes: { candidates: [9] },
                no: { candidates: [178] }
              }
            },
            no: {
              id: "real_alive_male_notsport",
              question: "Are they known for business or technology?",
              attribute: "isBusinessperson",
              yes: {
                question: "Did they found a major tech company?",
                attribute: "isTechRelated",
                yes: { candidates: [96, 182, 183, 1] },
                no: { candidates: [1] }
              },
              no: {
                question: "Are they a musician or singer?",
                attribute: "isSinger",
                yes: { candidates: [93, 181] },
                no: {
                  question: "Are they an actor?",
                  attribute: "isActor",
                  yes: { candidates: [175, 180, 176] },
                  no: { candidates: [3] }
                }
              }
            }
          },
          no: {
            id: "real_alive_female_field",
            question: "Is she a singer or musician?",
            attribute: "isSinger",
            yes: { candidates: [2, 4, 174, 177, 179] },
            no: {
              question: "Is she an athlete?",
              attribute: "isAthlete",
              yes: { candidates: [90] },
              no: { candidates: [7, 95] }
            }
          }
        },
        no: { candidates: [] }
      },
      no: {
        id: "real_dead_human",
        question: "Were they a scientist or inventor?",
        attribute: "isScientist",
        yes: { candidates: [5, 92, 173, 13] },
        no: {
          question: "Were they a political leader or ruler?",
          attribute: "isLeader",
          yes: { candidates: [11, 12, 15, 94] },
          no: {
            question: "Were they an artist or writer?",
            attribute: "isArtist",
            yes: { candidates: [13, 14] },
            no: {
              question: "Were they a musician or entertainer?",
              attribute: "isSinger",
              yes: { candidates: [93, 98, 10] },
              no: { candidates: [171, 172, 170, 97] }
            }
          }
        }
      }
    },
    no: {
      id: "real_nonhuman",
      question: "Is it an animal?",
      attribute: "isAnimal",
      yes: {
        id: "real_animal_type",
        question: "Is it a large animal (bigger than a dog)?",
        attribute: "isLarge",
        yes: {
          question: "Does it live in Africa?",
          attribute: "liveInAfrica",
          yes: { candidates: [50, 51, 57] },
          no: {
            question: "Does it live in water?",
            attribute: "livesInWater",
            yes: { candidates: [53, 55] },
            no: { candidates: [59, 60] }
          }
        },
        no: {
          question: "Can it fly?",
          attribute: "canFly",
          yes: { candidates: [54, 56] },
          no: {
            question: "Does it live in water?",
            attribute: "livesInWater",
            yes: { candidates: [58] },
            no: { candidates: [52] }
          }
        }
      },
      no: {
        id: "real_object",
        question: "Is it a building or landmark?",
        attribute: "isBuilding",
        yes: { candidates: [110, 114, 117] },
        no: {
          question: "Is it a piece of technology or electronic device?",
          attribute: "isTechnology",
          yes: { candidates: [111, 113] },
          no: {
            question: "Is it a vehicle?",
            attribute: "isVehicle",
            yes: { candidates: [116, 119] },
            no: {
              question: "Is it a food item?",
              attribute: "isFood",
              yes: { candidates: [112] },
              no: { candidates: [115, 118] }
            }
          }
        }
      }
    }
  },
  no: {
    id: "fictional",
    question: "Is it a character from a movie, TV show, or book?",
    attribute: "isFictional",
    yes: {
      id: "fictional_human",
      question: "Does the character look human?",
      attribute: "isHuman",
      yes: {
        id: "fictional_human_gender",
        question: "Is the character male?",
        attribute: "isMale",
        yes: {
          id: "fictional_male_hero",
          question: "Is the character a hero or protagonist?",
          attribute: "isHero",
          yes: {
            question: "Do they have superpowers?",
            attribute: "hasPowers",
            yes: {
              question: "Are they from Marvel or DC comics?",
              attribute: "isFromComics",
              yes: { candidates: [29, 30, 32, 33, 151, 152, 153, 133] },
              no: {
                question: "Are they from a fantasy world (magic/wizards)?",
                attribute: "isWizard",
                yes: { candidates: [25, 34, 71, 28] },
                no: { candidates: [27, 130, 131, 137, 139] }
              }
            },
            no: {
              question: "Are they from a Disney or animated movie?",
              attribute: "isDisney",
              yes: { candidates: [22, 36, 157, 162] },
              no: { candidates: [39, 40, 73, 138] }
            }
          },
          no: {
            question: "Are they a famous villain?",
            attribute: "isVillain",
            yes: { candidates: [27, 70, 74, 80, 138] },
            no: { candidates: [33, 156] }
          }
        },
        no: {
          id: "fictional_female",
          question: "Is she a princess or royalty?",
          attribute: "isRoyal",
          yes: { candidates: [21, 37, 135, 136, 158, 159, 160] },
          no: {
            question: "Does she have special powers or abilities?",
            attribute: "hasPowers",
            yes: { candidates: [31, 72, 140] },
            no: { candidates: [26, 79] }
          }
        }
      },
      no: {
        id: "fictional_nonhuman",
        question: "Is it an animal or creature?",
        attribute: "isAnimal",
        yes: {
          question: "Is it from a video game?",
          attribute: "isFromVideoGame",
          yes: { candidates: [35, 78] },
          no: {
            question: "Is it from Disney/Pixar?",
            attribute: "isDisney",
            yes: { candidates: [20, 55, 65, 163, 165, 76, 77] },
            no: { candidates: [191, 190, 192] }
          }
        },
        no: {
          question: "Is it a robot or mechanical being?",
          attribute: "isRobot",
          yes: { candidates: [150, 161, 32] },
          no: {
            question: "Is it a monster or supernatural creature?",
            attribute: "isMonster",
            yes: { candidates: [23, 74, 75, 164, 193, 194, 195] },
            no: { candidates: [190, 191, 192] }
          }
        }
      }
    },
    no: {
      candidates: [190, 191, 192, 193, 194, 195]
    }
  }
};

export default decisionTree;