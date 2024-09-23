import { Agent } from "@shared/interfaces/agent";

export interface agentDashboardProps {
  updateData: number;
  setSystemSymbol: (value: string | null) => void;
};

export interface getAgentDataProps {
  setAgentData: (value: Agent | null) => void;
  setSystemSymbol: (value: string | null) => void;
}

export interface registerAgentProps {
  form: { symbol: string, faction: string };
  setApiKey: (value: string) => void;
}