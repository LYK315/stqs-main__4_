import AgentStats from './AgentStats';
import ShipsData from './ShipsData';
import Commands from './Commands';
import BtnNavigate from '../../components/BtnNavigate';

function Game() {
  // Fetch agent data when page rendered

  return (
    <div>
      <div className='flex flex-row w-screen h-screen'>
        <div className='flex flex-col gap-5 mt-3 ml-3'>
          {/* Dashboard - Agent Status */}
          <div className='text-center'>
            Agent
            <div className='bg-dashboard w-fit p-3 border rounded-md'>
              <AgentStats />
            </div>
          </div>

          {/* Feature - Ships Data */}
          <div className='text-center'>
            Ships
            <div className='bg-dashboard w-fit p-3 border rounded-md'>
              <ShipsData />
            </div>
          </div>
        </div>

        {/* Feature - System Commmands */}
        <div className="flex items-center justify-center basis-7/12">
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
