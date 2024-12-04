import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const sports = [
    {
      name: 'Football',
      description: 'Le sport le plus populaire au monde',
      history: 'Le football moderne est né en Angleterre au XIXe siècle',
      imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
      rules: {
        create: [
          { content: '11 joueurs par équipe sur le terrain' },
          { content: 'Le match dure 90 minutes' },
          { content: 'Interdiction de toucher le ballon avec les mains (sauf le gardien)' }
        ]
      },
      teams: {
        create: [{
          name: 'Real Madrid',
          country: 'Espagne',
          achievements: JSON.stringify(['14 Ligues des Champions', '35 Championnats d\'Espagne']),
          imageUrl: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c7/Logo_Real_Madrid.svg/1200px-Logo_Real_Madrid.svg.png'
        }]
      },
      players: {
        create: [{
          name: 'Zinédine Zidane',
          nationality: 'France',
          achievements: JSON.stringify(['Coupe du Monde 1998', 'Ballon d\'Or 1998']),
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg',
          active: false
        }]
      }
    },
    {
      name: 'Basketball',
      description: 'Sport collectif opposant deux équipes de cinq joueurs',
      history: 'Inventé par James Naismith en 1891 aux États-Unis',
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop',
      rules: {
        create: [
          { content: '5 joueurs par équipe sur le terrain' },
          { content: 'Le match est divisé en 4 quarts-temps' },
          { content: 'Un panier vaut 2 ou 3 points selon la distance' }
        ]
      },
      teams: {
        create: [{
          name: 'Chicago Bulls',
          country: 'États-Unis',
          achievements: JSON.stringify(['6 titres NBA', '6 titres de conférence']),
          imageUrl: 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d1/Bulls_de_Chicago_logo.svg/1200px-Bulls_de_Chicago_logo.svg.png'
        }]
      },
      players: {
        create: [{
          name: 'Michael Jordan',
          nationality: 'États-Unis',
          achievements: JSON.stringify(['6 titres NBA', '5 fois MVP']),
          imageUrl: 'https://cdn.nba.com/manage/2021/08/michael-jordan-looks.jpg',
          active: false
        }]
      }
    },
    {
      name: 'Tennis',
      description: 'Sport de raquette qui oppose soit deux joueurs soit quatre joueurs',
      history: 'Le tennis moderne est né en Angleterre à la fin du XIXe siècle',
      imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000&auto=format&fit=crop',
      rules: {
        create: [
          { content: 'Un match se joue en sets' },
          { content: 'Il faut 6 jeux pour gagner un set' },
          { content: 'En cas d\'égalité à 6-6, on joue un tie-break' }
        ]
      },
      teams: {
        create: [{
          name: 'Équipe de France de Coupe Davis',
          country: 'France',
          achievements: JSON.stringify(['10 Coupes Davis']),
          imageUrl: 'https://upload.wikimedia.org/wikipedia/fr/thumb/5/50/Logo_FF_Tennis_2017.svg/1200px-Logo_FF_Tennis_2017.svg.png'
        }]
      },
      players: {
        create: [{
          name: 'Roger Federer',
          nationality: 'Suisse',
          achievements: JSON.stringify(['20 titres du Grand Chelem', '310 semaines numéro 1 mondial']),
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Roger_Federer_%282014%29_%28cropped%29.jpg',
          active: false
        }]
      }
    }
  ];

  for (const sport of sports) {
    await prisma.sport.create({
      data: sport
    });
  }

  console.log('Base de données réinitialisée avec les données de test');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
