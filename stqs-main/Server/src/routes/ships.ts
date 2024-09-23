import { Router, Request, Response } from 'express';
import { ShipList, MoveShipData, ExtractOreData, RefuelData, ShipData } from '@shared/interfaces/ship';

const router = Router();
const API_URL = 'https://api.spacetraders.io/v2/my/ships';


/*===================== Controllers =====================*/
async function getShipList(): Promise<ShipList[]> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`
    }
  };

  try {
    const response = await fetch(`${API_URL}`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch ship list data. Status: ${response.status}`);
    }
    return await response.json() as ShipList[];
  } catch (error) {
    console.error('Error fetching ship list:', error);
    throw error;
  }
}

// Orbit or Dock ship
async function moveShip(shipSymbol: string, move: string): Promise<MoveShipData> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`
    },
  };

  try {
    const response = await fetch(`${API_URL}/${shipSymbol}/${move}`, options);
    if (!response.ok) {
      throw new Error(`Failed to orbit / dock ship. Status: ${response.status}`)
    }
    return await response.json() as MoveShipData;
  } catch (error) {
    console.error('Error orbit / dock ship:', error);
    throw error;
  }
};

async function refuelShip(shipSymbol: string): Promise<RefuelData> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`
    },
  };

  try {
    const response = await fetch(`${API_URL}/${shipSymbol}/refuel`, options);
    if (!response.ok) {
      throw new Error(`Failed to refuel ship. Status: ${response.status}`)
    }
    return await response.json() as RefuelData;
  } catch (error) {
    console.error('Error refuel ship:', error);
    throw error;
  }
};

async function extractOre(shipSymbol: string): Promise<ExtractOreData> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`
    },
  };

  try {
    const response = await fetch(`${API_URL}/${shipSymbol}/extract`, options);
    if (!response.ok) {
      throw new Error(`Failed to extract ore. Status: ${response.status}`)
    }
    return await response.json() as ExtractOreData;
  } catch (error) {
    console.error('Error extract ore:', error);
    throw error;
  }
};

async function navigateShip(shipSymbol: string, destSymbol: string): Promise<MoveShipData> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`
    },
    body: JSON.stringify({
      waypointSymbol: destSymbol,
    }),
  };

  try {
    const response = await fetch(`${API_URL}/${shipSymbol}/navigate`, options);
    if (!response.ok) {
      throw new Error(`Failed to navigate ship. Status: ${response.status}`)
    }
    return await response.json() as MoveShipData;
  } catch (error) {
    console.error('Error extract ore:', error);
    throw error;
  }
};

async function buyShip(shipType: string, waypointSymbol: string): Promise<ShipData> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_ST_API_KEY}`,
    },
    body: JSON.stringify({
      shipType: shipType,
      waypointSymbol: waypointSymbol,
    }),
  };

  try {
    const response = await fetch(`${API_URL}`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch buy ship data. Status: ${response.status}`);
    }
    return await response.json() as ShipData;
  } catch (error) {
    console.error('Error fetching buy ship data:', error);
    throw error;
  }
}



/*===================== Services =====================*/
router.get('/shipList', async (req: Request, res: Response) => {
  try {
    const shipList = await getShipList();
    res.json(shipList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/orbit', async (req: Request, res: Response) => {
  try {
    const { shipSymbol } = req.body;

    if (!shipSymbol) {
      return res.status(400).json({ error: 'Ship Symbol (orbit) is required' });
    }

    const orbitData = await moveShip(shipSymbol, 'orbit');
    res.json({ orbitData });

  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/dock', async (req: Request, res: Response) => {
  try {
    const { shipSymbol } = req.body;

    if (!shipSymbol) {
      return res.status(400).json({ error: 'Ship Symbol (dock) is required' });
    }

    const orbitData = await moveShip(shipSymbol, 'dock');
    res.json({ orbitData });

  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/refuel', async (req: Request, res: Response) => {
  try {
    const { shipSymbol } = req.body;

    if (!shipSymbol) {
      return res.status(400).json({ error: 'Ship Symbol (refuel) is required' });
    }

    const orbitData = await refuelShip(shipSymbol);
    res.json({ orbitData });

  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/extract', async (req: Request, res: Response) => {
  try {
    const { shipSymbol } = req.body;

    if (!shipSymbol) {
      return res.status(400).json({ error: 'Ship Symbol (extract) is required' });
    }

    const orbitData = await extractOre(shipSymbol);
    res.json({ orbitData });

  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/navigate', async (req: Request, res: Response) => {
  try {
    const { shipSymbol, destWaypointSymbol } = req.body;

    if (!shipSymbol || !destWaypointSymbol) {
      return res.status(400).json({ error: 'Ship Symbol & Destination Waypoint Symbol is required' });
    }

    const navigateData = await navigateShip(shipSymbol, destWaypointSymbol);
    res.json({ navigateData });

  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/buy', async (req: Request, res: Response) => {
  const { shipType, waypointSymbol } = req.body

  if (!shipType || !waypointSymbol) {
    return res.status(400).json({ error: 'Ship type & Waypoint Symbol (buy ship) is required' });
  }

  try {
    const shipData = await buyShip(shipType, waypointSymbol);
    res.json(shipData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
