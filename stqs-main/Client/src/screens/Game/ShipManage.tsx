import { useEffect, useState } from "react";
import { getWaypointList } from "@/services/systemsAPI";
import { extractOre, moveShip, refuelShip, navigateShip } from "@/services/shipAPI";
import { shipManageProps } from "@/interfaces/ship";
import Dropdown from "../../components/Dropdown";

function ShipManage({ ship, setUpdateData, onClose }: shipManageProps) {
  const [selectedWaypoint, setSelectedWaypoint] = useState<string | null>(null);
  const [dropDownList, setDropDownList] = useState<{ symbol: string; type: string }[]>([]);
  const [shipDocked, setShipDocked] = useState<boolean>(true);

  // Execute once on render
  useEffect(() => {
    // Update ship status to reflect on button
    setShipDocked(
      ship.nav.status === 'DOCKED' ? true :
        ship.nav.status === 'IN_ORBIT' ? false :
          true
    );

    // API Call - Get all Waypoint in current system
    // Unable to fetch data only once on page load, thr may be ships located in different systems
    const systemSymbol = ship.nav.systemSymbol
    getWaypointList({ systemSymbol, setDropDownList });
  }, []);

  // API Call - Manage Ship (Orbit / Dock)
  function handleMoveShip(manage: string) {
    const shipStat = ship.nav.status;
    const shipName = ship.registration.name;
    moveShip({ shipStat, shipName, manage, setUpdateData });
  }

  // API Call - Refuel Ship
  function handleRefuelShip() {
    const shipStat = ship.nav.status;
    const shipName = ship.registration.name;
    refuelShip({ shipStat, shipName, setUpdateData });
  }

  // API Call - Extract Ore
  function handleExtractOre() {
    const shipStat = ship.nav.status;
    const shipName = ship.registration.name;
    extractOre({ shipStat, shipName, setUpdateData });
  }

  // API Call - Navigate ship to selected waypoint
  function handleNavigateShip(destSymbol: string | null) {
    const shipStat = ship.nav.status;
    const shipName = ship.registration.name;
    navigateShip({ shipStat, shipName, destSymbol, setUpdateData });
  }

  return (
    <div className="flex flex-col gap-3 text-md text-left">
      {/* Data - Ship Symbol */}
      <div className="flex flex-row place-content-between ">
        <span className="font-bold">
          {ship.registration.name} ({ship.nav.status})
        </span>
        <button
          className="w-fit h-fit hover:text-cyan-300 hover:font-bold text-[10px]"
          onClick={onClose}
        >Close</button>
      </div>

      {/* Feature - Navigate Ship */}
      <div className="flex flex-row gap-3 items-center w-full">
        {/* List - All Waypoint in current system & Waypoint Type */}
        <div className="w-full">
          <Dropdown optionList={dropDownList} selected={selectedWaypoint} setSelected={setSelectedWaypoint} />
        </div>

        {/* Button - Navigate */}
        <button
          className="border bg-tertiary border-cyan-800 rounded-md py-1 px-2 text-sm hover:text-cyan-600 hover:bg-dashboard"
          onClick={() => { handleNavigateShip(selectedWaypoint), onClose() }}
        >
          Navigate
        </button>
      </div>

      {/* A Simple Line */}
      <div className="py-1">
        <hr className="border-cyan-900" />
      </div>

      {/* Buttons - Manage Ship */}
      <div className="flex flex-row gap-5">
        {/* Button - Orbit or Dock */}
        <button
          className="border border-cyan-600 rounded-md py-[2px] px-2 text-sm hover:text-cyan-600 basis-1/3"
          onClick={() => { handleMoveShip(`${shipDocked ? 'ORBIT' : 'DOCK'}`), onClose() }}
        >
          {shipDocked ? 'Orbit' : 'Dock'}
        </button>

        {/* Button - Refuel */}
        <button
          className="border border-cyan-600 rounded-md py-[2px] px-2 text-sm hover:text-cyan-600 basis-1/3"
          onClick={() => { handleRefuelShip(), onClose() }}
        >
          Refuel
        </button>

        {/* Button - Extract */}
        <button
          className="border border-cyan-600 rounded-md py-[2px] px-2 text-sm hover:text-cyan-600 basis-1/3"
          onClick={() => { handleExtractOre(), onClose() }}
        >
          Extract
        </button>
      </div>
    </div>
  )
}

export default ShipManage