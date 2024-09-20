import AgentStats from './AgentStats';
import ShipsData from './ShipsData';
import BtnNavigate from '../../components/BtnNavigate';

function Game() {
  // Fetch agent data when page rendered

  return (
    <div>
      {/* Dashboard - Agent Status */}
      <AgentStats />

      {/* Dashboard - Ships Data */}
      <div className='mt-28'>
        Your Ships
        <ShipsData />
      </div>

      {/* Button - Create New Agent */}
      <div className='absolute bottom-2 left-2 max-w-fit max-h-fit'>
        <BtnNavigate route='new-agent' label='Create New Agent'/>
      </div>
    </div>
  );
};

export default Game;
