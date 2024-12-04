import express from 'express';
import prisma from '../db/index.js'; // Importer Prisma Client
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Fonction pour convertir le nom en minuscule
const lowercaseName = (name) => name.toLowerCase();

// Get all sports - Pas besoin d'authentification
router.get('/', async (req, res) => {
  try {
    const sports = await prisma.sport.findMany({
      include: {
        rules: true,
        teams: true,
        players: true,
        comments: true,
      },
    });

    const sportsWithDetails = sports.map((sport) => ({
      ...sport,
      rules: sport.rules.map((rule) => rule.content),
      topTeams: sport.teams.map((team) => ({
        ...team,
        achievements: JSON.parse(team.achievements),
      })),
      topPlayers: sport.players.map((player) => ({
        ...player,
        achievements: JSON.parse(player.achievements),
      })),
    }));

    res.json(sportsWithDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error retrieving sports' });
  }
});

// Get sport by name (en minuscule) - Pas besoin d'authentification
router.get('/:name', async (req, res) => {
  try {
    const sportName = lowercaseName(req.params.name);
    let formatSportName = sportName[0].toUpperCase() + sportName.slice(1);

    const sport = await prisma.sport.findUnique({
      where: { name: formatSportName },
      include: {
        rules: true,
        teams: true,
        players: true,
        comments: true,
      },
    });

    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' });
    }

    const sportWithDetails = {
      ...sport,
      rules: sport.rules.map((rule) => rule.content),
      topTeams: sport.teams.map((team) => ({
        ...team,
        achievements: JSON.parse(team.achievements),
      })),
      topPlayers: sport.players.map((player) => ({
        ...player,
        achievements: JSON.parse(player.achievements),
      })),
    };

    res.json(sportWithDetails);
  } catch (error) {
    console.error('Error fetching sport:', error);
    res.status(500).json({ error: 'Error retrieving sport: ' + error.message });
  }
});

// Create new sport - Authentification requise
router.post('/', authenticateToken, async (req, res) => {
  const { name, description, history, rules, topTeams, topPlayers, imageUrl } = req.body;

  try {
    const existingSport = await prisma.sport.findFirst({
      where: { name: lowercaseName(name) },
    });

    if (existingSport) {
      return res.status(400).json({ error: 'A sport with this name already exists' });
    }

    const sport = await prisma.sport.create({
      data: {
        name: lowercaseName(name),
        description,
        history,
        imageUrl,
        rules: {
          create: rules.map((rule) => ({ content: rule })),
        },
        teams: {
          create: (topTeams || []).map((team) => ({
            name: team.name,
            country: team.country,
            achievements: JSON.stringify(team.achievements || []),
            imageUrl: team.imageUrl,
          })),
        },
        players: {
          create: (topPlayers || []).map((player) => ({
            name: player.name,
            nationality: player.nationality,
            achievements: JSON.stringify(player.achievements || []),
            imageUrl: player.imageUrl,
            active: player.active,
          })),
        },
      },
      include: {
        rules: true,
        teams: true,
        players: true,
      },
    });

    const sportWithDetails = {
      ...sport,
      rules: sport.rules.map((rule) => rule.content),
      topTeams: sport.teams.map((team) => ({
        ...team,
        achievements: JSON.parse(team.achievements),
      })),
      topPlayers: sport.players.map((player) => ({
        ...player,
        achievements: JSON.parse(player.achievements),
      })),
    };

    res.status(201).json(sportWithDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error creating sport' });
  }
});

// Update sport - Authentification requise
// Update sport - Authentification requise
router.put('/:name', authenticateToken, async (req, res) => {
  const { description, history, rules, topTeams, topPlayers, imageUrl, bestTeam, bestPlayer } = req.body;
  const sportName = lowercaseName(req.params.name);
  let formatSportName = sportName[0].toUpperCase() + sportName.slice(1);

  try {
    // Vérifie si le sport existe
    const sport = await prisma.sport.findUnique({
      where: { name: formatSportName },
    });

    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' });
    }

    // Supprime les anciennes entités associées
    await prisma.rule.deleteMany({ where: { sportId: sport.id } });
    await prisma.team.deleteMany({ where: { sportId: sport.id } });
    await prisma.player.deleteMany({ where: { sportId: sport.id } });

    // Mets à jour les champs simples et les relations bestTeam / bestPlayer
    const updatedSport = await prisma.sport.update({
      where: { name: formatSportName },
      data: {
        description,
        history,
        imageUrl,
        bestTeam: bestTeam
          ? {
              create: {
                name: bestTeam.name,
                country: bestTeam.country,
                achievements: JSON.stringify(bestTeam.achievements || []),
                imageUrl: bestTeam.imageUrl,
              },
            }
          : undefined,
        bestPlayer: bestPlayer
          ? {
              create: {
                name: bestPlayer.name,
                nationality: bestPlayer.nationality,
                achievements: JSON.stringify(bestPlayer.achievements || []),
                imageUrl: bestPlayer.imageUrl,
                active: bestPlayer.active,
              },
            }
          : undefined,
      },
    });

    // Crée les nouvelles entités associées (rules, teams, players)
    if (rules?.length > 0) {
      await prisma.rule.createMany({
        data: rules.map((rule) => ({
          content: rule,
          sportId: sport.id,
        })),
      });
    }

    if (topTeams?.length > 0) {
      await prisma.team.createMany({
        data: topTeams.map((team) => ({
          name: team.name,
          country: team.country,
          achievements: JSON.stringify(team.achievements || []),
          imageUrl: team.imageUrl,
          sportId: sport.id,
        })),
      });
    }

    if (topPlayers?.length > 0) {
      await prisma.player.createMany({
        data: topPlayers.map((player) => ({
          name: player.name,
          nationality: player.nationality,
          achievements: JSON.stringify(player.achievements || []),
          imageUrl: player.imageUrl,
          active: player.active,
          sportId: sport.id,
        })),
      });
    }

    // Retourne le sport mis à jour
    const finalSport = await prisma.sport.findUnique({
      where: { name: formatSportName },
      include: {
        rules: true,
        teams: true,
        players: true,
        bestTeam: true,
        bestPlayer: true,
      },
    });

    res.json(finalSport);
  } catch (error) {
    console.error('Error updating sport:', error);
    res.status(500).json({ error: 'Error updating sport' });
  }
});




// Delete sport - Authentification requise
router.delete('/:name', authenticateToken, async (req, res) => {
  const sportName = lowercaseName(req.params.name);

  try {
    await prisma.sport.delete({
      where: { name: sportName },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error deleting sport' });
  }
});

// Ajouter un commentaire à un sport (par sportName)
router.post('/:sportName/comments', async (req, res) => {

  console.log(req.params);
  const { sportName } = req.params;
  const { content, author } = req.body;

  let formatSportName = sportName[0].toUpperCase() + sportName.slice(1);
  console.log("Ceci est le format sport Name : " + formatSportName);

  try {
    // Vérifiez si le sport existe
    const sport = await prisma.sport.findUnique({
      where: { name: formatSportName },
    });

    console.log(sport)
    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' });
    }

    // Créer un commentaire
    const newComment = await prisma.comment.create({
      data: {
        content,
        sportId: sport.id, // Lier le commentaire au sport trouvé
        author: author
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Error adding comment' });
  }
});


router.get('/:sportName', async (req, res) => {
  try {
    const sport = await prisma.sport.findUnique({
      where: { name: req.params.sportName },
      include: { comments: true },
    });

    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' });
    }

    res.json(sport);
  } catch (error) {
    console.error('Error fetching sport:', error);
    res.status(500).json({ error: 'Error retrieving sport' });
  }
});


export default router;
