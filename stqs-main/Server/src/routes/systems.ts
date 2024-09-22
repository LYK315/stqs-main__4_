import { Router, Request, Response } from 'express';
import { WaypointList } from '@shared/Types/system';

const router = Router();
const API_URL = 'https://api.spacetraders.io/v2';


/*===================== Controllers =====================*/
async function getWaypointList(systemSymbol: string): Promise<WaypointList[]> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  try {
    const response = await fetch(`${API_URL}/systems/${systemSymbol}/waypoints`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch waypoint list data. Status: ${response.status}`);
    }
    return await response.json() as WaypointList[];
  } catch (error) {
    console.error('Error fetching waypoint list:', error);
    throw error;
  }
}


/*===================== Services =====================*/
router.get('/waypointList', async (req: Request, res: Response) => {
  const systemSymbol = req.query.systemSymbol as string;
  
  if (!systemSymbol) {
    return res.status(400).json({ error: 'System Symbol is required' });
  }

  try {
    const waypointList = await getWaypointList(systemSymbol);
    res.json(waypointList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
