import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied: No token provided' });
    }
  
    try {
      const verified = jwt.verify(token, JWT_SECRET);
      req.user = verified; // Ajouter les informations de l'utilisateur à l'objet `req`
      next();
    } catch (error) {
      console.error('Invalid token:', error);
      res.status(403).json({ error: 'Invalid token' });
    }
  };
  