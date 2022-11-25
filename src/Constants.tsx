export const constants = {
    drafterPageIndex: 1,
    aboutPageIndex: 2,
    homePageIndex: 0,
  
    aboutTitle: 'Welcome to DOTA Drafter',
    aboutSubTitle: "A web app that simulates DOTA 2's Captains Mode",
  
    aboutAccordion1Title: 'What is DOTA 2 Captains Mode?',
    aboutAccordion2Title: 'Rules of drafting',
    aboutAccordion3Title: 'About the developer',
  
    aboutAccordion1Image:
      'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254076/dotaDrafter/aboutAccordion1.png',
    aboutAccordion2Image:
      'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254067/dotaDrafter/aboutAccordion2.jpg',
    aboutAccordion3Image:
      'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254067/dotaDrafter/aboutAccordion3.png',
  
    githubUrl: 'https://github.com/jSunpayco',
  
    pickTime: 30, //30
    radiantExtraTime: 130, //130
    direExtraTime: 130, //130
  
    attributeAgility: 'agi',
    attributeIntelligence: 'int',
    attributeStrength: 'str',
  
    urlCurrPick:
      'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254067/dotaDrafter/urlCurrPick.png',
    urlSkippedPick:
      'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
  
    urlAgility:
      'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669257569/dotaDrafter/Agility_attribute_symbol_lvrty8.webp',
    urlIntelligence:
      'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669257638/dotaDrafter/Intelligence_attribute_symbol_uqfpej.webp',
    urlStrength:
      'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669257638/dotaDrafter/Strength_attribute_symbol_issbkx.webp',
  
    urlMelee:
      'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254067/dotaDrafter/urlMelee.png',
    urlRanged:
      'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254067/dotaDrafter/urlRanged.png',
  
    urlHeroStats: 'https://api.opendota.com/api/heroStats',
    urlMainApi: 'https://api.opendota.com',
  
    pickRadiantFirst: [
      {
        pickType: 'Ban',
        pickOrder1: 1,
        pickOrder2: 2,
        hero1: 'Ban 1',
        hero2: 'Ban 2',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Ban',
        pickOrder1: 3,
        pickOrder2: 4,
        hero1: 'Ban 3',
        hero2: 'Ban 4',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
  
      {
        pickType: 'Pick',
        pickOrder1: 5,
        pickOrder2: 6,
        hero1: 'Pick 5',
        hero2: 'Pick 6',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Pick',
        pickOrder1: 8,
        pickOrder2: 7,
        hero1: 'Pick 8',
        hero2: 'Pick 7',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
  
      {
        pickType: 'Ban',
        pickOrder1: 9,
        pickOrder2: 10,
        hero1: 'Ban 9',
        hero2: 'Ban 10',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Ban',
        pickOrder1: 11,
        pickOrder2: 12,
        hero1: 'Ban 11',
        hero2: 'Ban 12',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Ban',
        pickOrder1: 13,
        pickOrder2: 14,
        hero1: 'Ban 13',
        hero2: 'Ban 14',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
  
      {
        pickType: 'Pick',
        pickOrder1: 16,
        pickOrder2: 15,
        hero1: 'Pick 16',
        hero2: 'Pick 15',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Pick',
        pickOrder1: 17,
        pickOrder2: 18,
        hero1: 'Pick 17',
        hero2: 'Pick 18',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
  
      {
        pickType: 'Ban',
        pickOrder1: 19,
        pickType2: 'Ban',
        pickOrder2: 20,
        hero1: 'Ban 19',
        hero2: 'Ban 20',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Ban',
        pickOrder1: 21,
        pickOrder2: 22,
        hero1: 'Ban 21',
        hero2: 'Ban 22',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
  
      {
        pickType: 'Pick',
        pickOrder1: 23,
        pickOrder2: 24,
        hero1: 'Pick 23',
        hero2: 'Pick 24',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
    ],
  
    pickDireFirst: [
      {
        pickType: 'Ban',
        pickOrder1: 2,
        pickOrder2: 1,
        hero1: 'Ban 2',
        hero2: 'Ban 1',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Ban',
        pickOrder1: 4,
        pickOrder2: 3,
        hero1: 'Ban 4',
        hero2: 'Ban 3',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
  
      {
        pickType: 'Pick',
        pickOrder1: 6,
        pickOrder2: 5,
        hero1: 'Pick 6',
        hero2: 'Pick 5',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Pick',
        pickOrder1: 7,
        pickOrder2: 8,
        hero1: 'Pick 7',
        hero2: 'Pick 8',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
  
      {
        pickType: 'Ban',
        pickOrder1: 10,
        pickOrder2: 9,
        hero1: 'Ban 10',
        hero2: 'Ban 9',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Ban',
        pickOrder1: 12,
        pickOrder2: 11,
        hero1: 'Ban 12',
        hero2: 'Ban 11',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Ban',
        pickOrder1: 14,
        pickOrder2: 13,
        hero1: 'Ban 14',
        hero2: 'Ban 13',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
  
      {
        pickType: 'Pick',
        pickOrder1: 15,
        pickOrder2: 16,
        hero1: 'Pick 15',
        hero2: 'Pick 16',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Pick',
        pickOrder1: 18,
        pickOrder2: 17,
        hero1: 'Pick 18',
        hero2: 'Pick 17',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
  
      {
        pickType: 'Ban',
        pickOrder1: 20,
        pickOrder2: 19,
        hero1: 'Ban 20',
        hero2: 'Ban 19',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
      {
        pickType: 'Ban',
        pickOrder1: 22,
        pickOrder2: 21,
        hero1: 'Ban 22',
        hero2: 'Ban 21',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
  
      {
        pickType: 'Pick',
        pickOrder1: 24,
        pickOrder2: 23,
        hero1: 'Pick 24',
        hero2: 'Pick 23',
        pickImage1:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
        pickImage2:
          'https://res.cloudinary.com/ddx0aorm7/image/upload/v1669254068/dotaDrafter/urlNoPick.png',
      },
    ],
  
    captainsModeDesc:
      'Captains mode is the standard format for tournament games. The captains ban certain heroes, up to seven per team, preventing either team from picking the hero. The captains also choose five heroes for their team.',
  
    howToPlay:
      'One must first pick which team gets to have the first/second pick for the game (Radiant or Dire). 30 seconds are then allotted for bans, and 30 seconds for picks. Each captain has 130 seconds total bonus time that can be used throughout any selection. If time runs out during a ban selection, no hero will be banned; if time runs out during a pick selection, a random hero will be chosen.',
  
    aboutMe:
      "Currently a Computer Science student working on attaining my bacherlor's degree on 2023. This project was made with the intent on studying ReactJS, whilst trying to implement a styling framework, Mantine UI in this case. Another part of my motivation is being a fan of the video game DOTA 2 in order for me to gain learning experience in front-end development while using something I like as inspiration. You may visit the repository ",
  };
  