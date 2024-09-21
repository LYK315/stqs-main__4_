import express, {  Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentRoutes from './routes/agent';
import shipRoutes from './routes/ships';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


/*===================== Standard Trader =====================*/
app.use('/api/agent', agentRoutes);
app.use('/api/ship', shipRoutes);


/*===================== Server =====================*/
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the backend server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
