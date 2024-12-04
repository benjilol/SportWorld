import { Sport } from '../types';

export const sportsData: Sport[] = [
  {
    id: 'football',
    name: 'Football',
    description: 'The most popular sport in the world, combining passion and technique.',
    history: 'Modern football was born in England in the 19th century. Codified in 1863 with the creation of the Football Association, it quickly spread worldwide to become the number one sport in many countries.',
    rules: [
      '11 players per team on the field',
      'Two halves of 45 minutes each',
      'No handball allowed except for the goalkeeper',
      'Win = 3 points, Draw = 1 point, Loss = 0 points',
    ],
    topTeams: [
      {
        id: 'real-madrid',
        name: 'Real Madrid',
        country: 'Spain',
        achievements: ['14 Champions Leagues', '35 Spanish Championships'],
        imageUrl: 'https://static.brusheezy.com/system/resources/previews/000/014/339/non_2x/real-madrid-logo-photoshop-psds.jpg',
      },
      {
        id: 'bayern',
        name: 'Bayern Munich',
        country: 'Germany',
        achievements: ['6 Champions Leagues', '33 Bundesliga titles'],
        imageUrl: 'https://images.unsplash.com/photo-1599832110430-da30b996c917?auto=format&fit=crop&q=80&w=1000',
      },
    ],
    topPlayers: [
      {
        id: 'messi',
        name: 'Lionel Messi',
        nationality: 'Argentina',
        achievements: ['8 Ballon d\'Or awards', '2022 World Cup'],
        imageUrl: 'https://cdn.vox-cdn.com/thumbor/QRepCGYJ_7jaxWZZu5MrHVnKC10=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/25481462/2155658434.jpg',
        active: true,
      },
      {
        id: 'zidane',
        name: 'Zinedine Zidane',
        nationality: 'France',
        achievements: ['1998 Ballon d\'Or', '1998 World Cup'],
        imageUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/210527112612-01-zinedine-zidane-file-restricted.jpg?q=w_3000,h_2035,x_0,y_0,c_fill',
        active: false,
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'handball',
    name: 'Handball',
    description: 'A team sport combining speed, strength, and precision.',
    history: 'Modern handball was created in the early 20th century in Germany and Denmark. It became an Olympic sport at the 1972 Munich Games.',
    rules: [
      '7 players per team on the field',
      'Two halves of 30 minutes each',
      'No more than 3 steps with the ball without dribbling',
      'Regulated physical contact',
    ],
    topTeams: [
      {
        id: 'barcelona',
        name: 'FC Barcelona',
        country: 'Spain',
        achievements: ['11 Champions Leagues', '28 Spanish Championships'],
        imageUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80&w=1000',
      },
    ],
    topPlayers: [
      {
        id: 'karabatic',
        name: 'Nikola Karabatic',
        nationality: 'France',
        achievements: ['3 Olympic gold medals', '4 World Championships'],
        imageUrl: 'https://www.handball-base.com/img-player/359/Nikola%20Karabati%C4%87%20novo.jpg',
        active: true,
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513028738826-f000cded30a4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZGJhbGx8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 'rugby',
    name: 'Rugby',
    description: 'A team sport combining strategy and physical engagement.',
    history: 'Born in 1823 in Rugby, England, when William Webb Ellis decided to run with the ball during a football game. The first international match was played between Scotland and England in 1871.',
    rules: [
      '15 players per team in Rugby Union',
      'Two halves of 40 minutes each',
      'The ball must be passed backward',
      'Try = 5 points, Conversion = 2 points, Penalty = 3 points',
    ],
    topTeams: [
      {
        id: 'all-blacks',
        name: 'All Blacks',
        country: 'New Zealand',
        achievements: ['3 World Cups', '17 Rugby Championships'],
        imageUrl: 'https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?auto=format&fit=crop&q=80&w=1000',
      },
    ],
    topPlayers: [
      {
        id: 'dupont',
        name: 'Antoine Dupont',
        nationality: 'France',
        achievements: ['World Player of the Year 2021', 'Grand Slam 2022'],
        imageUrl: 'https://static.independent.co.uk/2024/07/27/19/newFile-1.jpg',
        active: true,
      },
    ],
    imageUrl: 'https://wallpapers.com/images/high/rugby-game-photography-dmihnhn8vvwalv3y.webp',
  },
  {
    id: 'basketball',
    name: 'Basketball',
    description: 'A team sport of precision and agility.',
    history: 'Invented by James Naismith in 1891 in the United States, basketball has become one of the most popular sports in the world, especially thanks to the NBA.',
    rules: [
      '5 players per team on the field',
      'Four quarters of 12 minutes each',
      '3-point, 2-point, or 1-point shots (free throws)',
      'Dribbling required to move with the ball',
    ],
    topTeams: [
      {
        id: 'lakers',
        name: 'Los Angeles Lakers',
        country: 'United States',
        achievements: ['17 NBA titles', '32 conference titles'],
        imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1000',
      },
    ],
    topPlayers: [
      {
        id: 'jordan',
        name: 'Michael Jordan',
        nationality: 'American',
        achievements: ['6 NBA titles', '5 MVP awards'],
        imageUrl: 'https://cdn.nba.com/manage/2021/08/michael-jordan-looks.jpg',
        active: false,
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'judo',
    name: 'Judo',
    description: 'A Japanese martial art based on flexibility and using the opponent\'s force.',
    history: 'Created in 1882 by Jigoro Kano in Japan, judo became an Olympic sport in 1964 at the Tokyo Games.',
    rules: [
      '4-minute matches',
      'Victory by Ippon, Waza-ari, or penalties',
      'Different weight categories',
      'Respect for the judo moral code',
    ],
    topTeams: [
      {
        id: 'japan',
        name: 'Japan Team',
        country: 'Japan',
        achievements: ['84 Olympic medals', 'Historical dominance'],
        imageUrl: 'https://images.unsplash.com/photo-1578930391642-81b49a8ee5e8?auto=format&fit=crop&q=80&w=1000',
      },
    ],
    topPlayers: [
      {
        id: 'riner',
        name: 'Teddy Riner',
        nationality: 'France',
        achievements: ['10 World titles', '3 Olympic medals'],
        imageUrl: 'https://media.gettyimages.com/id/2164985016/photo/paris-france-gold-medalist-teddy-riner-of-team-france-celebrates-on-the-podium-at-judo-mens.jpg?s=612x612&w=0&k=20&c=IpR1NVIAheAkfjxZXIF6u-Sod_09gQkmWCY5oC7lWcc=',
        active: true,
      },
    ],
    imageUrl: 'https://e0.pxfuel.com/wallpapers/100/34/desktop-wallpaper-judo-background.jpg',
  },
  {
    id: 'tennis',
    name: 'Tennis',
    description: 'A racket sport combining technique, endurance, and mental strength.',
    history: 'Modern tennis originated in England in the late 19th century. Wimbledon, the oldest tournament, was established in 1877.',
    rules: [
      'Matches in 2 or 3 winning sets',
      'Games scored 15, 30, 40, and game',
      '6 games to win a set',
      'Tie-break at 6-6',
    ],
    topTeams: [
      {
        id: 'spain',
        name: 'Spain Team',
        country: 'Spain',
        achievements: ['6 Davis Cups', 'Numerous champions'],
        imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=1000',
      },
    ],
    topPlayers: [
      {
        id: 'nadal',
        name: 'Rafael Nadal',
        nationality: 'Spain',
        achievements: ['22 Grand Slam titles', '14 French Open titles'],
        imageUrl: 'https://img.olympics.com/images/image/private/t_s_w960/t_s_16_9_g_auto/f_auto/primary/v2njhyrlut4nvyu81f05',
        active: true,
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=1000',
  },
];
