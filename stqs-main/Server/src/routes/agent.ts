import { Router, Request, Response } from 'express';
import { Agent, NewAgent } from '@shared/interfaces/agent';

const router = Router();
const API_URL = 'https://api.spacetraders.io/v2';


/*===================== Controllers =====================*/
async function getAgentData(): Promise<Agent> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`
    }
  };

  try {
    const response = await fetch(`${API_URL}/my/agent`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    return await response.json() as Agent;
  } catch (error) {
    console.error('Error fetching agent data:', error);
    throw error;
  }
};

async function registerAgent(symbol: string, faction: string): Promise<NewAgent> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      symbol: symbol,
      faction: faction,
    }),
  };

  try {
    const response = await fetch(`${API_URL}/register`, options);
    if (!response.ok) {
      throw new Error(`Failed to register agent. Status: ${response.status}`)
    }
    return await response.json() as NewAgent;
  } catch (error) {
    console.error('Error registering new agent:', error);
    throw error;
  }
};


/*===================== Services =====================*/
router.get('/get', async (req: Request, res: Response) => {
  try {
    const agentData = await getAgentData();
    res.json(agentData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { symbol, faction } = req.body;

    if (!symbol || !faction) {
      return res.status(400).json({ error: 'Symbol and Faction are required' });
    }

    const newAgentData = await registerAgent(symbol, faction);
    const token = newAgentData.data.token;

    // Return only token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
