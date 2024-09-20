import { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h2>Agent Info</h2>
      <div>{message ? JSON.stringify(message) : 'Loading...'}</div>
    </div>
  );
};

export default Game;
