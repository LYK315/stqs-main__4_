import axios from "axios";
import { getContractListProps, acceptContractProps } from "@/interfaces/contract";

// Get all contracts
export async function getContractList({ setContractList }: getContractListProps) {
  try {
    const response = await axios.get(`http://localhost:8080/api/contract/getAll`);
    setContractList(response.data);
  } catch (error) {
    console.error('Error fetching contract list data:', error);
  }
};

// Accept Contract
export async function acceptContract({ contractID, closeCommandDashboard }: acceptContractProps) {
  try {
    await axios.post(`http://localhost:8080/api/contract/accept`, { contractID: contractID });
    closeCommandDashboard();
  } catch (error) {
    console.error('Error fetching accept contract data:', error);
  }
};