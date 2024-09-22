import { useEffect, useState } from "react"
import axios from "axios";
import { ShipList, ShipData } from "../../../../Shared/Types/ship";
import ShipManage from "./ShipManage";

interface Props {
  updateData: boolean;
  setUpdateData: (value: boolean) => void;
}

function ShipsData({ updateData, setUpdateData }: Props) {
  const [shipList, setShipList] = useState<ShipList>({ data: [] });
  const [selectedShip, setSelectedShip] = useState<ShipData | null>(null);

  // Execute everytime when 'updateData' is updated
  useEffect(() => {
    //API Call - Get all ships data
    async function fetchShipList() {
      try {
        const response = await axios.get('http://localhost:8080/api/ship/shipList');
        setShipList({ data: response.data.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchShipList();
  }, [updateData]);

  // Button - open manage ship
  function handleManageOpen(ship: ShipData) {
    setSelectedShip(ship);
  };

  // Button - close manage ship
  function handleManageClose() {
    setSelectedShip(null);
  };

  return (
    <div className="flex flex-col gap-3 max-h-[13rem] overflow-y-auto">
      {/* Loop display all ships */}
      {shipList.data.length > 0 ? shipList.data.map((ship, index) => (
        <div
          key={ship.registration.name}
          className="flex flex-col"
        >
          <div className="flex flex-row gap-5 w-[25rem] px-2 text-[12px] text-left">
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
              onClick={() => handleManageOpen(ship)}
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

      {/* Feature - Manage Ship */}
      {selectedShip && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-dashboard p-4 px-5 rounded-md w-[29rem] h-fit shadow-md shadow-cyan-900 border border-cyan-800">
            <ShipManage ship={selectedShip} updateData={updateData} setUpdateData={setUpdateData} onClose={handleManageClose} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ShipsData