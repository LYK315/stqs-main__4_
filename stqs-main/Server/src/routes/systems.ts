import { Router, Request, Response } from 'express';
import { WaypointList } from '@shared/interfaces/system';
import { ShipyardData } from '@shared/interfaces/shipyard';

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

async function getMarketList(systemSymbol: string): Promise<WaypointList[]> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`,
    }
  };

  try {
    const response = await fetch(`${API_URL}/systems/${systemSymbol}/waypoints?traits=MARKETPLACE`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch waypoint market list data. Status: ${response.status}`);
    }
    return await response.json() as WaypointList[];
  } catch (error) {
    console.error('Error fetching waypoint market list:', error);
    throw error;
  }
}

async function getShipyardList(systemSymbol: string): Promise<WaypointList[]> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`,
    }
  };

  try {
    const response = await fetch(`${API_URL}/systems/${systemSymbol}/waypoints?traits=SHIPYARD`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch waypoint shipyard list data. Status: ${response.status}`);
    }
    return await response.json() as WaypointList[];
  } catch (error) {
    console.error('Error fetching waypoint shipyard list:', error);
    throw error;
  }
}

async function getShipyard(systemSymbol: string, waypointSymbol: string): Promise<ShipyardData> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`,
    }
  };

  try {
    const response = await fetch(`${API_URL}/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch shipyard data. Status: ${response.status}`);
    }
    return await response.json() as ShipyardData;
  } catch (error) {
    console.error('Error fetching shipyard data:', error);
    throw error;
  }
}


/*===================== Services =====================*/
router.get('/waypointList', async (req: Request, res: Response) => {
  const systemSymbol = req.query.systemSymbol as string;

  if (!systemSymbol) {
    return res.status(400).json({ error: 'System Symbol (waypoint list) is required' });
  }

  try {
    const waypointList = await getWaypointList(systemSymbol);
    res.json(waypointList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/marketList', async (req: Request, res: Response) => {
  const systemSymbol = req.query.systemSymbol as string;

  if (!systemSymbol) {
    return res.status(400).json({ error: 'System Symbol (market list) is required' });
  }

  try {
    const marketList = await getMarketList(systemSymbol);
    res.json(marketList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/shipyardList', async (req: Request, res: Response) => {
  const systemSymbol = req.query.systemSymbol as string;

  if (!systemSymbol) {
    return res.status(400).json({ error: 'System Symbol (shipyard list) is required' });
  }

  try {
    const shipyardList = await getShipyardList(systemSymbol);
    res.json(shipyardList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/shipyard', async (req: Request, res: Response) => {
  const systemSymbol = req.query.systemSymbol as string;
  const waypointSymbol = req.query.waypointSymbol as string;

  if (!systemSymbol || !waypointSymbol) {
    return res.status(400).json({ error: 'System & Waypoint Symbol (shipyard) is required' });
  }

  try {
    const shipyardData = await getShipyard(systemSymbol, waypointSymbol);
    res.json(shipyardData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



export default router;
