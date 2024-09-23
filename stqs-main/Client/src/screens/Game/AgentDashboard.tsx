import { useState, useEffect } from "react"
import { Agent } from "@shared/Types/agent";
import formatThousands from "@/utils/formatThousands";
import { getAgentData } from "../../services/agentAPI";

interface Props {
  updateData: number;
  setSystemSymbol: (value: string | null) => void;
}

function AgentDashboard({ updateData, setSystemSymbol }: Props) {
  const [agentData, setAgentData] = useState<Agent | null>(null);

  // Execute on each "updateData" change
  useEffect(() => {
    // API Call - get agent data
    getAgentData(setAgentData, setSystemSymbol);
  }, [updateData]);

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
          <div className='table-cell w-[5em] text-right'>{agentData ? formatThousands(agentData.shipCount) : "ldng.."}</div>
          <div className='table-cell w-[7.5em] text-right'>$ {agentData ? formatThousands(agentData.credits) : "ldng.."}</div>
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard