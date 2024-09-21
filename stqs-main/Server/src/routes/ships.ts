import { Router, Request, Response } from 'express';

const router = Router();
const API_URL = 'https://api.spacetraders.io/v2';

/*===================== Promises =====================*/
interface ShipList {
  data: ShipData[];
}

interface ShipData {
  registration: Registration;
  nav: Navigation;
  crew: Crew;
  frame: Frame;
  cooldown: Cooldown;
  cargo: Cargo;
  fuel: Fuel;
}

interface Registration {
  name: string;
  factionSymbol: string;
  role: string;
}

interface Navigation {
  systemSymbol: string;
  waypointSymbol: string;
  route: Route;
  status: string;
  flightMode: string;
}

interface Route {
  destination: Location;
  origin: Location;
  departureTime: string;
  arrival: string;
}

interface Location {
  symbol: string;
  type: string; // e.g., "PLANET"
  systemSymbol: string;
  x: number;
  y: number;
}

interface Crew {
  current: number;
  required: number;
  capacity: number;
  rotation: string;
  morale: number;
  wages: number;
}

interface Frame {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  requirements: FrameRequirements;
}

interface FrameRequirements {
  power: number;
  crew: number;
  slots: number;
}

interface Cooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
  expiration: string;
}

interface Cargo {
  capacity: number;
  units: number;
  inventory: InventoryItem[];
}

interface InventoryItem {
  symbol: string;
  name: string;
  description: string;
  units: number;
}

interface Fuel {
  current: number;
  capacity: number;
  consumed: FuelConsumption;
}

interface FuelConsumption {
  amount: number;
  timestamp: string;
}



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
    const response = await fetch(`${API_URL}/my/ships`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    return await response.json() as ShipList[];
  } catch (error) {
    console.error('Error fetching ship list:', error);
    throw error;
  }
}


/*===================== Services =====================*/
router.get('/shipList', async (req: Request, res: Response) => {
  try {
    const shipList = await getShipList();
    console.log(shipList);
    
    res.json(shipList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
