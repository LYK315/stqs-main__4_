import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define the Agent interface
interface Agent {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: bigint;
}

// Function to fetch agent data
async function getAgent(): Promise<Agent> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`
    },
  };

  try {
    const response = await fetch('https://api.spacetraders.io/v2/my/agent', options);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json() as Agent;
    return data;
  } catch (err) {
    console.error("Error encountered:", err);
    throw err;
  }
}

// API endpoint to get the agent
app.get('/api/agent', async (req: Request, res: Response) => {
  try {
    const agent = await getAgent();
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the backend server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
