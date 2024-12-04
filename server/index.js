import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sportsRoutes from './routes/sports.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/sports', sportsRoutes);
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});