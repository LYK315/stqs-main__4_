import express, {  Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentRoutes from './routes/agent';
import shipRoutes from './routes/ships';
import systemsRoutes from './routes/systems';
import marketRoutes from './routes/market';
import shipyardRoutes from './routes/shipyard';
import contractRoutes from './routes/contracts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


/*===================== Standard Trader API Routes =====================*/
app.use('/api/agent', agentRoutes);
app.use('/api/ship', shipRoutes);
app.use('/api/systems', systemsRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/contract', contractRoutes);
app.use('/api/shipyard', shipyardRoutes)


/*===================== Root API Routes =====================*/
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the backend server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
