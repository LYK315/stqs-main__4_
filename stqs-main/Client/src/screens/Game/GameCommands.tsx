import { useState } from "react"
import { commandsProps } from "@/interfaces/systems";
import ContractDashboard from "./ContractDashboard";
import MarketDashboard from "./MarketDashboard";
import ShipyardDashboard from "./ShipyardDashboard";

function Commands({ systemSymbol, setUpdateData }: commandsProps) {
  const [manageCommand, setManageCommand] = useState<string | null>(null)

  // Handle - Open selected command's dashboard
  function handleManageCommand(command: string) {
    setManageCommand(command);
  }

  // Handle - Close command's dashboard
  function handleCloseCommand() {
    setManageCommand(null);
  }

  return (
    <div className="w-[15em] h-[15em] border-2 border-cyan-600 rounded-full flex items-center justify-center">
      {/* Title */}
      <div className="absolute font-bold text-xs">
        FEATURES
      </div>

      {/* Feature / Btn - Manage Contracts */}
      <div
        role="button"
        className="text-lg min-w-fit bg-tertiary border rounded-xl p-1 px-4 cursor-pointer hover:text-cyan-300 hover:border-cyan-300 hover:bg-blue-950 
        transition-all duration-800 hover:scale-110
        translate-x-[6.5em] translate-y-[-6em]"
        onClick={() => { handleManageCommand('CONTRACT') }}
      >
        1. Contract
      </div>

      {/* Feature / Btn - Markets in current waypoint */}
      <div
        role="button"
        className="text-lg min-w-fit bg-tertiary border rounded-xl p-1 px-4 cursor-pointer hover:text-cyan-300 hover:border-cyan-300 hover:bg-blue-950 
        transition-all duration-800 hover:scale-110
        translate-x-[-5em] translate-y-[4em]"
        onClick={() => { handleManageCommand('MARKET') }}
      >
        3. Market
      </div>

      {/* Feature / Btn - Shipyards in current waypoint */}
      <div
        role="button"
        className="text-lg min-w-fit bg-tertiary border rounded-xl p-1 px-4 cursor-pointer hover:text-cyan-300 hover:border-cyan-300 hover:bg-blue-950 
        transition-all duration-800 hover:scale-110
        translate-x-[0em] translate-y-[4em]"
        onClick={() => { handleManageCommand('SHIPYARD') }}
      >
        2. Shipyard
      </div>

      {/* Feature - Command's Dashboards (Contract, Market, Shipyard) */}
      {manageCommand && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-dashboard p-4 px-5 rounded-md min-w-[29rem] w-fit h-fit shadow-md shadow-cyan-900 border border-cyan-800">
            {(() => { // Open different command dashboard
              const commandComponents = {
                CONTRACT: <ContractDashboard closeCommandDashboard={handleCloseCommand} />,
                MARKET: <MarketDashboard closeCommandDashboard={handleCloseCommand} systemSymbol={systemSymbol} />,
                SHIPYARD: <ShipyardDashboard closeCommandDashboard={handleCloseCommand} systemSymbol={systemSymbol} setUpdateData={setUpdateData} />,
              };
              return commandComponents[manageCommand as keyof typeof commandComponents] || null;
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default Commands