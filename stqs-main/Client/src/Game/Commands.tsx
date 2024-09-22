import { useState } from "react"
import ContractDashboard from "./Contract/Dashboard";
import MarketDashboard from "./Market/Dashboard";
import ShipyardDashboard from "./Shipyard/Dashboard";


function Commands() {
  const [manageCommand, setManageCommand] = useState<string | null>(null)

  // Button - open selected command dashboard
  function handleManageCommand(command: string) {
    setManageCommand(command);
  }

  // Button - close command dashboard
  function handleCloseCommand() {
    setManageCommand(null);
  }

  return (
    <div className="w-[15em] h-[15em] border-2 border-cyan-600 rounded-full flex items-center justify-center">
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

      {/* Feature / Btn - Shipyards */}
      <div
        role="button"
        className="text-lg min-w-fit bg-tertiary border rounded-xl p-1 px-4 cursor-pointer hover:text-cyan-300 hover:border-cyan-300 hover:bg-blue-950 
        transition-all duration-800 hover:scale-110
        translate-x-[-5em] translate-y-[4em]"
        onClick={() => { handleManageCommand('SHIPYARD') }}
      >
        3. Market
      </div>

      {/* Feature / Btn - Nearby Market */}
      <div
        role="button"
        className="text-lg min-w-fit bg-tertiary border rounded-xl p-1 px-4 cursor-pointer hover:text-cyan-300 hover:border-cyan-300 hover:bg-blue-950 
        transition-all duration-800 hover:scale-110
        translate-x-[0em] translate-y-[4em]"
        onClick={() => { handleManageCommand('MARKET') }}
      >
        2. Shipyard
      </div>

      {/* Feature - Command Dashboards (Contract, Market, Shipyard) */}
      {manageCommand && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-dashboard p-4 px-5 rounded-md min-w-[29rem] w-fit h-fit shadow-md shadow-cyan-900 border border-cyan-800">
            {(() => { // Open different command dashboard
              const commandComponents = {
                CONTRACT: <ContractDashboard onClose={handleCloseCommand} />,
                MARKET: <MarketDashboard onClose={handleCloseCommand} />,
                SHIPYARD: <ShipyardDashboard onClose={handleCloseCommand} />,
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