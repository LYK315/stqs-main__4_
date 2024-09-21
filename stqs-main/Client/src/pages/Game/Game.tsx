import AgentStats from './AgentStats';
import ShipsData from './ShipsData';
import Commands from './Commands';
import BtnNavigate from '../../components/BtnNavigate';

function Game() {
  // Fetch agent data when page rendered

  return (
    <div>
      <div className='flex flex-row w-screen h-screen'>
        <div className='flex flex-col gap-5 basis-5/12'>
          {/* Dashboard - Agent Status */}
          <AgentStats />

          {/* Feature - Ships Data */}
          <div>
            Your Ships
            {/* <ShipsData /> */}
          </div>
        </div>

        {/* Feature - System Commmands */}
        <div className="flex items-center justify-center basis-7/12">
          <Commands />
        </div>

        {/* Button - Create New Agent */}
        <div className='absolute bottom-2 left-2 max-w-fit max-h-fit'>
          <BtnNavigate route='new-agent' label='Create New Agent' />
        </div>
      </div>
    </div>
  );
};

export default Game;
