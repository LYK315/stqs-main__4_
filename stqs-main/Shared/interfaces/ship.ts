export interface ShipList {
  data: ShipData[];
}

export interface ShipData {
  registration: Registration;
  nav: Navigation;
  cooldown: Cooldown;
  cargo: Cargo;
  fuel: Fuel;
}

export interface MoveShipData {
  nav: Navigation;
}

export interface ExtractOreData{
  cooldown: Cooldown;
}

export interface RefuelData{
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
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
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