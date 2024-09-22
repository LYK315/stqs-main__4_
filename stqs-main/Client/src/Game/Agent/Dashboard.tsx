import { useState, useEffect } from "react"
import axios from "axios";
import { Agent } from "@shared/Types/agent";

interface Props {
  updateData: number;
  setSystemSymbol: (value: string | null) => void;
}

function AgentDashboard({ updateData, setSystemSymbol }: Props) {
  const [agentData, setAgentData] = useState<Agent | null>(null);

  // Execute on each "updateData" change
  useEffect(() => {
    // API Call  - agent data
    async function fetchAgentData() {
      try {
        const response = await axios.get('http://localhost:8080/api/agent/get');

        const agentData = response.data.data;
        const systemSymbol = agentData.headquarters.match(/^[^-]+-[^-]+/)?.[0];

        setAgentData(agentData);
        setSystemSymbol(systemSymbol)
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };
    fetchAgentData();
  }, [updateData]);

  // Tool - format number
  const formatNumber = (value: number) => {
    const number = new Intl.NumberFormat('en-US').format(Number(value))
    return number.toString();
  };

  return (
    <div className="table w-[25rem] px-2 text-[12px]">
      {/* Table - Header */}
      <div className="table-header-group">
        <div className='table-row font-light'>
          <div className='table-cell w-[5em] text-left'>AGENT</div>
          <div className='table-cell w-[6em] text-left'>FACTION</div>
          <div className='table-cell w-[8em] text-left'>HEADQUARTERS</div>
          <div className='table-cell w-[5em] text-right'>SHIPS</div>
          <div className='table-cell w-[7.5em] text-right'>CREDITS</div>
        </div>
      </div>
      {/* Table - Data Row */}
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

export default AgentDashboard