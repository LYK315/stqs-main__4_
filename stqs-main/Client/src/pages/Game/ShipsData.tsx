import { useEffect, useState } from "react"
import axios from "axios";

interface ShipList {
  data: ShipData[];
}

interface ShipData {
  registration: Registration;
  nav: Navigation;
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

function ShipsData() {
  const [shipList, setShipList] = useState<ShipList>({ data: [] });

  useEffect(() => {
    async function fetchShipList() {
      try {
        const response = await axios.get('http://localhost:8080/api/ship/shipList');
        console.log(response.data.data);
        setShipList({ data: response.data.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchShipList();
  }, []);

  const handleManageClick = (ship: ShipData) => {
    console.log('Clicked ship data:', ship);
    // Perform any other action with the clicked ship data
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Loop display all ships */}
      {shipList.data.length > 0 ? shipList.data.map((ship, index) => (
        <div className="flex flex-col">
          <div
            key={ship.registration.name}
            className="flex flex-row gap-5 w-[23rem] px-2 text-[10px] text-left"
          >
            {/* Data - Name(symbol) & Role */}
            <div className="flex flex-col basis-3/12">
              <div className="font-bold">{ship.registration.name}</div>
              <div className="font-thin">{ship.registration.role}</div>
            </div>

            {/* Data - Capacity & Fuel */}
            <div className="flex flex-col font-bold basis-3/12">
              <div>C: <span className="font-thin"> {ship.cargo.units} / {ship.cargo.capacity}</span></div>
              <div>F: <span className="font-thin"> {ship.fuel.current} / {ship.fuel.capacity}</span></div>
            </div>

            {/* Data - Waypoint & Status */}
            <div className="flex flex-col basis-4/12">
              <div className="font-bold">{ship.nav.waypointSymbol}</div>
              <div className="font-thin">{ship.nav.status}</div>
            </div>

            {/* Button - Manage Ship */}
            <div
              role="button"
              className="basis-2/12 flex items-center bg-tertiary rounded-xl px-3 hover:text-cyan-300"
              onClick={() => handleManageClick(ship)}
            >
              Manage
            </div>
          </div>

          {/* Add line between each row */}
          {index < shipList.data.length - 1 && (
            <div className="w-full border-b border-gray-700 my-2"></div>
          )}
        </div>
      )) : "Loading..."}
    </div>
  )
}

export default ShipsData