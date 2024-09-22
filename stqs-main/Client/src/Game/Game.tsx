import { useState } from 'react';
import AgentDashboard from './Agent/Dashboard';
import ShipDashboard from './Ship/Dashboard';
import Commands from './Commands';
import BtnNavigate from '../components/BtnNavigate';

function Game() {
  // Use to control refresh only certain data
  const [updateData, setUpdateData] = useState<number>(Date.now())
  const [systemSymbol, setSystemSymbol] = useState<string | null>(null)

  return (
    <div>
      <div className='flex flex-row w-screen h-screen p-5 gap-36 justify-center mt-20'>
        {/* Dashboard / Status Boards */}
        <div className='flex flex-col gap-5 items-center'>
          {/* Dashboard - Agent Status */}
          <div className='text-center'>
            Agent
            <div className='bg-dashboard w-fit p-3 border rounded-md'>
              <AgentDashboard updateData={updateData} setSystemSymbol={setSystemSymbol} />
            </div>
          </div>

          {/* Feature - Ships Data */}
          <div className='text-center'>
            Ships
            <div className='bg-dashboard w-fit p-3 border rounded-md'>
              <ShipDashboard updateData={updateData} setUpdateData={setUpdateData} />
            </div>
          </div>
        </div>

        {/* Feature - System Commmands */}
        <div className="flex mt-12">
          <Commands systemSymbol={systemSymbol} />
        </div>

        {/* Button - Create New Agent */}
        <div className='absolute bottom-3 right-3 max-w-fit max-h-fit'>
          <BtnNavigate route='new-agent' label='Create New Agent' />
        </div>
      </div>
    </div>
  );
};

export default Game;
