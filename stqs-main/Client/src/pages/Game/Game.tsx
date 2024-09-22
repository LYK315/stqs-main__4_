import { useState } from 'react';
import AgentStats from './AgentStats';
import ShipsData from './ShipData';
import Commands from './Commands';
import BtnNavigate from '../../components/BtnNavigate';

function Game() {
  const [updateData, setUpdateData] = useState<boolean>(false)

  return (
    <div>
      <div className='flex flex-row w-screen h-screen p-5 gap-36 justify-center mt-20'>
        {/* Dashboard / Status Boards */}
        <div className='flex flex-col gap-5 items-center'>
          {/* Dashboard - Agent Status */}
          <div className='text-center'>
            Agent
            <div className='bg-dashboard w-fit p-3 border rounded-md'>
              <AgentStats updateData={updateData} />
            </div>
          </div>

          {/* Feature - Ships Data */}
          <div className='text-center'>
            Ships
            <div className='bg-dashboard w-fit p-3 border rounded-md'>
              <ShipsData updateData={updateData} setUpdateData={setUpdateData} />
            </div>
          </div>
        </div>

        {/* Feature - System Commmands */}
        <div className="flex mt-12">
          <Commands />
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
