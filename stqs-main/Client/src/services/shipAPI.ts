import axios from "axios";
import { ShipList } from "@shared/Types/ship";

// Get all ships
export async function getShipList(
  setShipList: React.Dispatch<React.SetStateAction<ShipList>>
) {
  try {
    const response = await axios.get('http://localhost:8080/api/ship/shipList');
    setShipList(response.data);
  } catch (error) {
    console.error('Error fetching ships data:', error);
  }
};

// Move Ship (orbit / dock)
export async function moveShip(
  shipStat: string,
  shipName: string,
  manage: string,
  setUpdateData: (value: number) => void
) {
  // Error Handle - Ship in transit
  if (shipStat === 'IN_TRANSIT') {
    alert(`Ship "${shipName}" is in transit. Be patient mate.`)
  };

  const apiURLs = {
    ORBIT: 'http://localhost:8080/api/ship/orbit',
    DOCK: 'http://localhost:8080/api/ship/dock',
  } as const;

  const apiURL = apiURLs[manage as keyof typeof apiURLs];

  // Send request to API End Point
  try {
    await axios.post(apiURL, { shipSymbol: shipName });

    // Update dashboard / status board
    setUpdateData(Date.now());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Refuel Ship
export async function refuelShip(
  shipStat: string,
  shipName: string,
  setUpdateData: (value: number) => void
) {
  // Error Handle - Ship in transit
  if (shipStat === 'IN_TRANSIT') {
    alert(`Ship "${shipName}" is in transit. Be patient mate.`)
  };

  // Call API End Point
  try {
    await axios.post('http://localhost:8080/api/ship/refuel', {
      shipSymbol: shipName
    });

    // Update dashboard / status board
    setUpdateData(Date.now());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Extract Ore
export async function extractOre(
  shipStat: string,
  shipName: string,
  setUpdateData: (value: number) => void
) {
  // Error Handle - Ship in transit
  if (shipStat === 'IN_TRANSIT') {
    alert(`Ship "${shipName}" is in transit. Be patient mate.`)
  };

  // Error Handle - Ship not in orbit
  if (shipStat !== 'IN_ORBIT') {
    alert(`Move ship to orbit before extracting.`)
  };

  // Call API End Point
  try {
    await axios.post('http://localhost:8080/api/ship/extract', {
      shipSymbol: shipName
    });

    // Update dashboard / status board
    setUpdateData(Date.now());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


// Navigate Ship to waypoint
export async function navigateShip(
  shipStat: string,
  shipName: string,
  destSymbol: string | null,
  setUpdateData: (value: number) => void
) {
  // Error Handle - Ship in transit
  if (shipStat === 'IN_TRANSIT') {
    alert(`Ship "${shipName}" is in transit. Be patient mate.`)
  };

  // Error Handle - Ship not in orbit
  if (shipStat !== 'IN_ORBIT') {
    alert(`Ship "${shipName}" is not in orbit. Move it to orbit before navigating.`)
  };

  // Error Handle - Empty waypoint
  if (!destSymbol) {
    alert("Dnt try to visit black hole. Please select a destination...")
  };

  // Call API Endpoint
  try {
    await axios.post('http://localhost:8080/api/ship/navigate', { shipSymbol: shipName, destWaypointSymbol: destSymbol });

    // Update dashboard / status board
    setUpdateData(Date.now());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}