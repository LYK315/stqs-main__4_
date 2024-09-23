import axios from "axios";
import { getShipListProps, moveShipProps, refuelShipProps, extractOreProps, navigateShipProps, buyShipProps } from "@/interfaces/ship";

// Get all ship data
export async function getShipList({ setShipList }: getShipListProps) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/ship/shipList`);
    setShipList(response.data);
  } catch (error) {
    console.error('Error fetching ships data:', error);
  }
};

// Move Ship Orbit / Dock)
export async function moveShip({ shipStat, shipName, manage, setUpdateData }: moveShipProps) {
  // Error Handle - Ship in transit
  if (shipStat === 'IN_TRANSIT') {
    alert(`Ship "${shipName}" is in transit. Be patient mate.`);
    return;
  };

  const apiURLs = {
    ORBIT: `${import.meta.env.VITE_HOST_URL}/api/ship/orbit`,
    DOCK: `${import.meta.env.VITE_HOST_URL}/api/ship/dock`,
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
export async function refuelShip({ shipStat, shipName, setUpdateData }: refuelShipProps) {
  // Error Handle - Ship in transit
  if (shipStat === 'IN_TRANSIT') {
    alert(`Ship "${shipName}" is in transit. Be patient mate.`);
    return;
  };

  // Error Handle - Ship not docked
  if (shipStat !== 'DOCKED') {
    alert(`Dock your ship before refueling.`);
    return;
  };

  // Call API End Point
  try {
    await axios.post(`${import.meta.env.VITE_HOST_URL}/api/ship/refuel`, {
      shipSymbol: shipName
    });

    // Update dashboard / status board
    setUpdateData(Date.now());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Extract Ore
export async function extractOre({ shipStat, shipName, setUpdateData }: extractOreProps) {
  // Error Handle - Ship in transit
  if (shipStat === 'IN_TRANSIT') {
    alert(`Ship "${shipName}" is in transit. Be patient mate.`);
    return;
  };

  // Error Handle - Ship not in orbit
  if (shipStat !== 'IN_ORBIT') {
    alert(`Move ship to orbit before extracting.`);
    return;
  };

  // Call API End Point
  try {
    await axios.post(`${import.meta.env.VITE_HOST_URL}/api/ship/extract`, {
      shipSymbol: shipName
    });

    // Update dashboard / status board
    setUpdateData(Date.now());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Navigate Ship to waypoint
export async function navigateShip({ shipStat, shipName, destSymbol, setUpdateData }: navigateShipProps) {
  // Error Handle - Ship in transit
  if (shipStat === 'IN_TRANSIT') {
    alert(`Ship "${shipName}" is in transit. Be patient mate.`);
    return;
  };

  // Error Handle - Ship not in orbit
  if (shipStat !== 'IN_ORBIT') {
    alert(`Ship "${shipName}" is not in orbit. Move it to orbit before navigating.`);
    return;
  };

  // Error Handle - Empty waypoint
  if (!destSymbol) {
    alert("Dnt try to visit black hole. Please select a destination...");
    return;
  };

  // Call API Endpoint
  try {
    await axios.post(`${import.meta.env.VITE_HOST_URL}/api/ship/navigate`, { shipSymbol: shipName, destWaypointSymbol: destSymbol });

    // Update dashboard / status board
    setUpdateData(Date.now());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Buy new ship
export async function buyShip({ shipType, waypointSymbol, setUpdateData }: buyShipProps) {
  // Send request to API End Point
  try {
    await axios.post(`${import.meta.env.VITE_HOST_URL}/api/ship/buy`, { shipType: shipType, waypointSymbol: waypointSymbol });

    // Update dashboard / status board
    setUpdateData(Date.now());
    alert('Check Ships Dashboard for your new ship.')
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}