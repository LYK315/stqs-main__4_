import { useEffect, useState } from 'react';
import axios from 'axios';
import AgentStats from './AgentStats';
import ShipsData from './ShipsData';

function Game() {
  const [message, setMessage] = useState('');

  // Fetch agent data when page rendered
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/agent/get');
        setMessage(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Agent Status Board */}
      <AgentStats />

      {/* Ships Data */}
      <div className='mt-28'>
        Your Ships
        <ShipsData />
      </div>

      {/* <div>{message ? JSON.stringify(message) : 'Loading...'}</div> */}
    </div>
  );
};

export default Game;
