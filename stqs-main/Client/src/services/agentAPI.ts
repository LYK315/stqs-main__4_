import axios from "axios";
import { getAgentDataProps, registerAgentProps } from "@/interfaces/agent";

// Get Agent Data
export async function getAgentData({ setAgentData, setSystemSymbol }: getAgentDataProps) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/agent/get`);

    const agentData = response.data.data;
    const systemSymbol = agentData.headquarters.match(/^[^-]+-[^-]+/)?.[0]; // Extract symtem symbol

    setAgentData(agentData);
    setSystemSymbol(systemSymbol)
  } catch (error) {
    console.error('Error fetching agent data:', error);
  }
};

// Register New Agent
export async function registerAgent({ form, setApiKey }: registerAgentProps) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/agent/register`, { symbol: form.symbol, faction: form.faction });

    setApiKey(response.data.token);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}