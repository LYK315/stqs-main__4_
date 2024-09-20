import { Router, Request, Response } from 'express';

const router = Router();
const API_URL = 'https://api.spacetraders.io/v2';

/*===================== Promise =====================*/
interface Agent {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
}


/*===================== Controller =====================*/
async function fetchAgentData(endpoint: string): Promise<Agent> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`
    },
  };

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    return await response.json() as Agent;
  } catch (error){
    console.error('Error fetching agent data:', error);
    throw error;
  }
}


/*===================== Services =====================*/
// Get agent data
router.get('/get', async (req: Request, res: Response) => {
  try {
    const agentData = await fetchAgentData(`${API_URL}/my/agent`);
    res.json(agentData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create new agent
router.get('/new', async (req: Request, res: Response) => {
  try {
    // Presumably, this is a POST request, but keeping as GET for now
    const newAgentData = await fetchAgentData(`${API_URL}/agents`);
    res.json(newAgentData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
