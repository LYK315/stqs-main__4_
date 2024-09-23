import axios from "axios";
import { WaypointList } from "@shared/Types/system";

// Get all waypoints with market in current system
export async function getMarketList(
  systemSymbol: string | null,
  setMarketList: React.Dispatch<React.SetStateAction<WaypointList>>
) {
  try {
    const response = await axios.get(`http://localhost:8080/api/systems/marketList`, {
      params: { systemSymbol: systemSymbol }
    });
    setMarketList(response.data);
  } catch (error) {
    console.error('Error fetching market waypoint list data:', error);
  }
}

// Get all waypoints with shipyards in current system
export async function getShipyardList(
  systemSymbol: string | null,
  setShipyardList: React.Dispatch<React.SetStateAction<WaypointList>>
) {
  try {
    const response = await axios.get(`http://localhost:8080/api/systems/shipyardList`, {
      params: { systemSymbol: systemSymbol }
    });
    setShipyardList(response.data);
  } catch (error) {
    console.error('Error fetching shipyard waypoint list data:', error);
  }
}

// Get all waypoints in current system
export async function getWaypointList(
  systemSymbol: string | null,
  setDropdownList: React.Dispatch<React.SetStateAction<{ symbol: string; type: string }[]>>
) {
  try {
    const response = await axios.get(`http://localhost:8080/api/systems/waypointList`, {
      params: { systemSymbol: systemSymbol }
    });
    const waypoints = response.data.data;
    const options = waypoints.map((waypoint: { symbol: string; type: string }) => ({
      symbol: waypoint.symbol,
      type: waypoint.type
    }));
    setDropdownList(options);
  } catch (error) {
    console.error('Error fetching waypoint list data:', error);
  }
};