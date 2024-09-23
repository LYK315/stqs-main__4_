import { useEffect, useState } from "react";
import { WaypointList } from "@shared/interfaces/system";
import { ShipyardData } from "@shared/interfaces/shipyard";
import { getShipyardList, getShipyard } from "@/services/systemsAPI";
import { shipyardDashboardProps } from "@/interfaces/systems";
import ShipyardManage from "./ShipyardManage";

function ShipyardDashboard({ closeCommandDashboard, systemSymbol, setUpdateData }: shipyardDashboardProps) {
  const [shipyardList, setShipyardList] = useState<WaypointList>({ data: [] });
  const [shipyardData, setShipyardData] = useState<ShipyardData | null>(null);

  // Execute once on render
  useEffect(() => {
    // API Call - Get all waypoints with shipyards in current system
    getShipyardList({ systemSymbol, setShipyardList });
  }, [])

  // Handle - open manage shipyard
  function handleOpenManageShipyard(waypointSymbol: string) {
    // API Call - Get Shipyard data
    getShipyard({ systemSymbol, waypointSymbol, setShipyardData });
  }

  // Handle - close manage shipyard
  function handleCloseManageShipyard() {
    setShipyardData(null);
  }

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
          <span className="font-bold basis-4/12">Orbit</span>
          <span className="font-bold basis-4/12">Type</span>
        </div>

        {/* A Simple Line */}
        <div className="py-2">
          <hr className="border-cyan-300" />
        </div>

        {/* Table - Body row */}
        {shipyardList.data && shipyardList.data.length > 0 ? (shipyardList.data.map((waypoint, index) => (
          <div className="flex flex-col" key={waypoint.symbol}>
            <button
              className="flex flex-row text-sm  text-left py-1 px-3 hover:opacity-50 hover:bg-tertiary rounded-lg"
              onClick={() => { handleOpenManageShipyard(waypoint.symbol) }}
            >
              <span className="font-thin basis-4/12">{waypoint.symbol}</span>
              <span className="font-thin basis-4/12">{waypoint.orbits}</span>
              <span className="font-thin basis-4/12">{waypoint.type}</span>
            </button>
            {/* Add line between each row */}
            {index < shipyardList.data.length - 1 && (
              <div className="w-full border-b border-gray-700 my-2"></div>
            )}
          </div>
        ))) : "Loading..."}
      </div>

      {/* A Simple Line */}
      <div className="pt-2 py-1">
        <hr className="border-cyan-300" />
      </div>

      {/* Feature - Manage Ship Board */}
      {shipyardData && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-dashboard p-4 px-5 rounded-md min-w-[29rem] w-fit h-fit shadow-md shadow-cyan-900 border border-cyan-800">
            <ShipyardManage shipyard={shipyardData} closeManageShipyard={handleCloseManageShipyard} setUpdateData={setUpdateData} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ShipyardDashboard