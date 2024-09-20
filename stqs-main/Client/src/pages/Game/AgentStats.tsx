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
    const fetchData = async () => {
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
    <div className='bg-[#262144] w-fit p-3 mt-5 ml-3 border rounded-md'>
      <table className="table-fixed">
        <thead>
          <tr className='text-[12px]'>
            <th className='w-[5em] font-light text-left'>AGENT</th>
            <th className='w-[6em] font-light text-left'>FACTION</th>
            <th className='w-[8em] font-light text-left'>HEADQUARTERS</th>
            <th className='w-[5em] font-light text-right'>SHIPS</th>
            <th className='w-[7.5em] font-light text-right'>CREDITS</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-xs font-bold'>
            <td className='w-[5em] text-left'>{agentData ? agentData.symbol : "ldng.."}</td>
            <td className='w-[6em] text-left'>{agentData ? agentData.startingFaction : "ldng.."}</td>
            <td className='w-[8em] text-left'>{agentData ? agentData.headquarters : "ldng.."}</td>
            <td className='w-[5em] text-right'>{agentData ? formatNumber(agentData.shipCount) : "ldng.."}</td>
            <td className='w-[7.5em] text-right'>$ {agentData ? formatNumber(agentData.credits) : "ldng.."}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AgentStats