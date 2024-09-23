import axios from "axios";
import { Agent } from "@shared/Types/agent";
import { SetStateAction } from "react";

// Get Agent Data
export async function getAgentData(
  setAgentData: { (value: SetStateAction<Agent | null>): void },
  setSystemSymbol: { (value: string | null): void }
) {
  try {
    const response = await axios.get('http://localhost:8080/api/agent/get');

    const agentData = response.data.data;
    const systemSymbol = agentData.headquarters.match(/^[^-]+-[^-]+/)?.[0]; // Extract symtem symbol

    setAgentData(agentData);
    setSystemSymbol(systemSymbol)
  } catch (error) {
    console.error('Error fetching agent data:', error);
  }
};