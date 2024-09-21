import { useState, useEffect } from "react"
import axios from "axios";

interface Agent {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: bigint;
}

function AgentStats() {
  const [agentData, setAgentData] = useState<Agent | null>(null);

  // Get Agent Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/api/agent/get');
        setAgentData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Format numbers
  const formatNumber = (value: number | bigint) => {
    const number = new Intl.NumberFormat('en-US').format(Number(value))
    return number.toString();
  };

  return (
      <div className="table w-[23rem] px-2 text-[10px]">
        <div className="table-header-group">
          <div className='table-row font-light'>
            <div className='table-cell w-[5em] text-left'>AGENT</div>
            <div className='table-cell w-[6em] text-left'>FACTION</div>
            <div className='table-cell w-[8em] text-left'>HEADQUARTERS</div>
            <div className='table-cell w-[5em] text-right'>SHIPS</div>
            <div className='table-cell w-[7.5em] text-right'>CREDITS</div>
          </div>
        </div>
        <div className="table-row-group">
          <div className='table-row font-bold'>
            <div className='table-cell w-[5em] text-left'>{agentData ? agentData.symbol : "ldng.."}</div>
            <div className='table-cell w-[6em] text-left'>{agentData ? agentData.startingFaction : "ldng.."}</div>
            <div className='table-cell w-[8em] text-left'>{agentData ? agentData.headquarters : "ldng.."}</div>
            <div className='table-cell w-[5em] text-right'>{agentData ? formatNumber(agentData.shipCount) : "ldng.."}</div>
            <div className='table-cell w-[7.5em] text-right'>$ {agentData ? formatNumber(agentData.credits) : "ldng.."}</div>
          </div>
        </div>
      </div>
  )
}

export default AgentStats