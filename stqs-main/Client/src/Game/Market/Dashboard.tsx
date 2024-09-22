import { useEffect, useState } from "react";
import axios from "axios";
import { WaypointList } from "@shared/Types/system";

interface Props {
  closeCommandDashboard: () => void;
  systemSymbol: string | null;
}

function MarketDashboard({ closeCommandDashboard, systemSymbol }: Props) {
  const [marketList, setMarketList] = useState<WaypointList>({ data: [] });

  // Execute once on render
  useEffect(() => {
    // API Call - Get all waypoints with market in current system
    async function fetchMarketList() {
      try {
        const response = await axios.get(`http://localhost:8080/api/systems/marketList`, {
          params: { systemSymbol: systemSymbol }
        });
        setMarketList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching waypoint list data:', error);
      }
    }
    fetchMarketList();
  }, [])

  return (
    <div className="flex flex-col text-md text-left">
      {/* Title and Close Button */}
      <div className="flex flex-row mb-2 place-content-between ">
        <span className="font-bold">All Markets in #{systemSymbol}</span>
        <button
          className="w-fit h-fit hover:text-cyan-300 hover:font-bold text-[10px]"
          onClick={() => { closeCommandDashboard() }}
        >
          Close
        </button>
      </div>

      {/* A Simple Line */}
      <div className="py-2">
        <hr className="border-cyan-300" />
      </div>

      {/* Table - All market brief info */}
      <div className="flex flex-col w-[33rem] max-h-[20rem] overflow-auto">
        {/* Table - Header */}
        <div className="flex flex-row px-3">
          <span className="font-bold basis-4/12">Waypoint</span>
          <span className="font-bold basis-4/12">Location</span>
          <span className="font-bold basis-4/12">Type</span>
        </div>

        {/* A Simple Line */}
        <div className="py-2">
          <hr className="border-cyan-300" />
        </div>

        {/* Table - Body row */}
        {marketList.data && marketList.data.length > 0 ? (marketList.data.map((waypoint, index) => (
          <div className="flex flex-col">
            <div className="flex flex-row text-sm py-1 px-3" key={waypoint.symbol}>
              <span className="font-thin basis-4/12">{waypoint.symbol}</span>
              <span className="font-thin basis-4/12">({waypoint.x}, {waypoint.y})</span>
              <span className="font-thin basis-4/12">{waypoint.type}</span>
            </div>
            {/* Add line between each row */}
            {index < marketList.data.length - 1 && (
              <div className="w-full border-b border-gray-700 my-2"></div>
            )}
          </div>
        ))) : "Loading..."}
      </div>

      {/* A Simple Line */}
      <div className="py-1">
        <hr className="border-cyan-300" />
      </div>
    </div>
  )
}

export default MarketDashboard