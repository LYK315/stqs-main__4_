export interface WaypointList {
  data: WaypointData[];
}

interface WaypointData {
  symbol: string; // e.g. X1-QD7-A3
  type: string; // e.g., "PLANET"
  systemSymbol: string; // e.g., "X1-QD7"
  x: number;
  y: number;
  orbitals: Orbital[];
  orbits: string;
  faction: Faction;
  traits: Trait[];
}

interface Orbital {
  symbol: string;
}

interface Faction {
  symbol: string; // e.g., "COSMIC"
}

interface Trait {
  symbol: string; // e.g., "UNCHARTED"
  name: string;
  description: string;
}
