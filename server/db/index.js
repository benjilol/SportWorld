import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Fonction pour ajouter un administrateur par défaut
const seedAdminUser = async () => {
  try {
    const adminEmail = 'admin@example.com';

    // Vérifier si l'utilisateur existe déjà
    const adminUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!adminUser) {
      console.log('Création de l\'utilisateur administrateur par défaut...');
      const hashedPassword = await bcrypt.hash('admin123', 10);

      // Créer l'utilisateur administrateur
      await prisma.user.create({
        data: {
          username: 'admin',
          email: adminEmail,
          password: hashedPassword,
        },
      });

      console.log('Utilisateur administrateur créé avec succès.');
    } else {
      console.log('Utilisateur administrateur déjà présent.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur administrateur :', error);
  }
};

// Fonction pour initialiser les sports avec des données initiales
const seedSports = async () => {
  try {
    const sportsCount = await prisma.sport.count();

    if (sportsCount === 0) {
      console.log('Base de données vide. Ajout des données initiales pour les sports...');
      const { sportsData } = await import('../data/sports.js');

      for (const sport of sportsData) {
        await prisma.sport.create({
          data: {
            name: sport.name,
            description: sport.description,
            history: sport.history,
            imageUrl: sport.imageUrl,
            rules: {
              create: sport.rules.map((rule) => ({ content: rule })),
            },
            teams: {
              create: sport.topTeams.map((team) => ({
                name: team.name,
                country: team.country,
                achievements: JSON.stringify(team.achievements),
                imageUrl: team.imageUrl,
              })),
            },
            players: {
              create: sport.topPlayers.map((player) => ({
                name: player.name,
                nationality: player.nationality,
                achievements: JSON.stringify(player.achievements),
                imageUrl: player.imageUrl,
                active: player.active,
              })),
            },
            ...(sport.comments && sport.comments.length > 0
              ? { comments: { create: sport.comments } }
              : {}),
          },
        });
      }

      console.log('Données des sports ajoutées avec succès.');
    } else {
      console.log('Les données des sports sont déjà présentes.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des données pour les sports :', error);
  }
};

// Fonction principale pour initialiser la base de données
const initDb = async () => {
  try {
    console.log('Initialisation de la base de données...');
    await seedAdminUser(); // Initialisation de l'administrateur
    await seedSports(); // Initialisation des sports
    console.log('Base de données initialisée avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base :', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Initialiser la base de données
await initDb();

// Exporter Prisma pour les autres parties du projet
export default prisma;
