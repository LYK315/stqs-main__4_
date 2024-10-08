import axios from "axios";
import { getMarketListProps, getShipyardListProps, getWaypointListProps, getShipyardProps } from "@/interfaces/systems";

/*===================== Main =====================*/
// Get all waypoints in current system
export async function getWaypointList({ systemSymbol, setDropDownList }: getWaypointListProps) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/systems/waypointList`, {
      params: { systemSymbol: systemSymbol }
    });
    const waypoints = response.data.data;
    const options = waypoints.map((waypoint: { symbol: string; type: string }) => ({
      symbol: waypoint.symbol,
      type: waypoint.type
    }));
    setDropDownList(options);
  } catch (error) {
    console.error('Error fetching waypoint list data:', error);
  }
};


/*===================== Market =====================*/
// Get all waypoints with market in current system
export async function getMarketList({ systemSymbol, setMarketList }: getMarketListProps) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/systems/marketList`, {
      params: { systemSymbol: systemSymbol }
    });
    setMarketList(response.data);
  } catch (error) {
    console.error('Error fetching market waypoint list data:', error);
  }
}


/*===================== Shipyard =====================*/
// Get all waypoints with shipyards in current system
export async function getShipyardList({ systemSymbol, setShipyardList }: getShipyardListProps) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/systems/shipyardList`, {
      params: { systemSymbol: systemSymbol }
    });
    setShipyardList(response.data);
  } catch (error) {
    console.error('Error fetching shipyard waypoint list data:', error);
  }
}

export async function getShipyard({ systemSymbol, waypointSymbol, setShipyardData }: getShipyardProps) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/systems/shipyard`, {
      params: { systemSymbol: systemSymbol, waypointSymbol: waypointSymbol }
    });
    setShipyardData(response.data);
  } catch (error) {
    console.error('Error fetching shipyard waypoint list data:', error);
  }
}
