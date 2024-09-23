import { useEffect, useState } from "react";
import { WaypointList } from "@shared/interfaces/system";
import { getShipyardList } from "@/services/systemsAPI";
import { shipyardDashboardProps } from "@/interfaces/systems";

function ShipyardDashboard({ closeCommandDashboard, systemSymbol }: shipyardDashboardProps) {
  const [shipyardList, setShipyardList] = useState<WaypointList>({ data: [] });

  // Execute once on render
  useEffect(() => {
    // API Call - Get all waypoints with shipyards in current system
    getShipyardList({ systemSymbol, setShipyardList });
  }, [])

  return (
    <div className="flex flex-col text-md text-left">
      {/* Title & Close Button */}
      <div className="flex flex-row mb-2 px-1 place-content-between">
        <span className="font-bold">All Shipyards in #{systemSymbol}</span>
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
        <div className="flex flex-row px-3 text-md">
          <span className="font-bold basis-4/12">Waypoint</span>
          <span className="font-bold basis-4/12">Location</span>
          <span className="font-bold basis-4/12">Type</span>
        </div>

        {/* A Simple Line */}
        <div className="py-2">
          <hr className="border-cyan-300" />
        </div>

        {/* Table - Body row */}
        {shipyardList.data && shipyardList.data.length > 0 ? (shipyardList.data.map((waypoint, index) => (
          <div className="flex flex-col" key={waypoint.symbol}>
            <div className="flex flex-row text-sm py-1 px-3">
              <span className="font-thin basis-4/12">{waypoint.symbol}</span>
              <span className="font-thin basis-4/12">({waypoint.x}, {waypoint.y})</span>
              <span className="font-thin basis-4/12">{waypoint.type}</span>
            </div>
            {/* Add line between each row */}
            {index < shipyardList.data.length - 1 && (
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

export default ShipyardDashboard