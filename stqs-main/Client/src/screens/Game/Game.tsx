import { useState } from 'react';
import AgentDashboard from './AgentDashboard';
import ShipDashboard from './ShipDashboard';
import GameCommands from './GameCommands';
import BtnNavigate from '../../components/BtnNavigate';

function Game() {
  // Control which data should be refreshed
  const [updateData, setUpdateData] = useState<number>(Date.now())

  // Store system symbol that will be used in multiple features
  const [systemSymbol, setSystemSymbol] = useState<string | null>(null)

  return (
    <div>
      <div className='flex flex-row w-screen h-screen p-5 gap-36 justify-center mt-20'>
        {/* Dashboards */}
        <div className='flex flex-col gap-5 items-center'>
          {/* Dashboard - Agent Dashboard */}
          <div className='text-center'>
            Agent
            <div className='bg-dashboard w-fit p-3 border rounded-md'>
              <AgentDashboard updateData={updateData} setSystemSymbol={setSystemSymbol} />
            </div>
          </div>

          {/* Feature - Ships Dashboard */}
          <div className='text-center'>
            Ships
            <div className='bg-dashboard w-fit p-3 border rounded-md'>
              <ShipDashboard updateData={updateData} setUpdateData={setUpdateData} />
            </div>
          </div>
        </div>

        {/* Feature - Game Commmands */}
        <div className="flex mt-12">
          <GameCommands systemSymbol={systemSymbol} />
        </div>

        {/* Button - Nvigate to Create New Agent */}
        <div className='absolute bottom-3 right-3 max-w-fit max-h-fit'>
          <BtnNavigate route='new-agent' label='Create New Agent' />
        </div>
      </div>
    </div>
  );
};

export default Game;
