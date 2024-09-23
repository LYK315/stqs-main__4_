import { shipyardManageProps } from "@/interfaces/systems"
import formatThousands from "@/utils/formatThousands"
import { buyShip } from "@/services/shipAPI"

function ShipyardManage({ shipyard, closeManageShipyard, setUpdateData }: shipyardManageProps) {

  // Handle - Buy ship
  function handleBuyShip(shipType: string, waypointSymbol: string) {
    // API Call - buy ship
    buyShip({ shipType, waypointSymbol, setUpdateData });
  }

  return (
    <div className="flex flex-col text-md text-left">
      {/* Title & Close Button */}
      <div className="flex flex-row mb-2 px-1 place-content-between">
        <span className="font-bold">Available Ships at #{shipyard.data.symbol}</span>
        <button
          className="w-fit h-fit hover:text-cyan-300 hover:font-bold text-[10px]"
          onClick={() => { closeManageShipyard() }}
        >
          Close
        </button>
      </div>

      {/* A Simple Line */}
      <div className="py-2">
        <hr className="border-cyan-300" />
      </div>

      {/* Table - All available ships */}
      <div className="flex flex-col w-[33rem] max-h-[20rem] overflow-auto">
        {/* Table - Header */}
        <div className="flex flex-row px-3 text-md">
          <span className="font-bold basis-3/12">Name</span>
          <span className="font-bold basis-5/12">Type</span>
          <span className="font-bold basis-3/12">Price</span>
          <span className="basis-1/12"></span>
        </div>

        {/* A Simple Line */}
        <div className="py-2">
          <hr className="border-cyan-300" />
        </div>

        {/* Show all available ships */}
        {shipyard.data.ships ? shipyard.data.ships.map((ship, index) => (
          <div className="flex flex-col" key={index}>
            <div className="flex flex-row text-sm text-left py-1 px-3 items-center">
              <span className="font-thin basis-3/12">{ship.name}</span>
              <span className="font-thin basis-5/12">{ship.type}</span>
              <span className="font-thin basis-3/12">$ {formatThousands(ship.purchasePrice)}</span>
              <button
                className="mr-3 basis-1/12 bg-tertiary hover:text-cyan-300 hover:opacity-70 rounded-lg px-3 py-1"
                onClick={() => { handleBuyShip(ship.type, shipyard.data.symbol), closeManageShipyard() }}
              >
                Buy
              </button>
            </div>
            {/* Add line between each row */}
            {index < shipyard.data.ships.length - 1 && (
              <div className="w-full border-b border-gray-700 my-2"></div>
            )}
          </div>
        )) : "No Ships Available for Purchase.."}
      </div>

      {/* A Simple Line */}
      <div className="py-2">
        <hr className="border-cyan-300" />
      </div>

    </div>
  )
}
export default ShipyardManage