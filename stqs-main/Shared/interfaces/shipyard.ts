export interface ShipyardData {
  data: {
    symbol: string;
    shipTypes: ShipType[];
    ships: Ship[];
  }
}

interface ShipType {
  type: string; // "SHIP_PROBE"
}

interface Ship {
  type: string; // "SHIP_PROBE" or other types
  name: string;
  description: string;
  supply: string; // "SCARCE" or other values
  activity: string; // "WEAK" or other values
  purchasePrice: number;
  frame: Frame;
  reactor: Reactor;
  engine: Engine;
  modules: Module[];
  mounts: Mount[];
  crew: Crew;
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
  requirements: Requirements;
}

interface Reactor {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  powerOutput: number;
  requirements: Requirements;
}

interface Engine {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  speed: number;
  requirements: Requirements;
}

interface Module {
  symbol: string;
  capacity: number;
  range: number;
  name: string;
  description: string;
  requirements: Requirements;
}

interface Mount {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  deposits: string[]; // "QUARTZ_SAND" or other values
  requirements: Requirements;
}

interface Crew {
  required: number;
  capacity: number;
}

interface Requirements {
  power: number;
  crew: number;
  slots: number;
}
