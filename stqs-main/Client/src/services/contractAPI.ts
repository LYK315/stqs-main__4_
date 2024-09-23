import axios from "axios";
import { getContractListProps } from "@/interfaces/contract";

// Get all contracts
export async function getContractList({ setContractList }: getContractListProps) {
  try {
    const response = await axios.get(`http://localhost:8080/api/contract/getAll`);
    setContractList(response.data);
  } catch (error) {
    console.error('Error fetching contract list data:', error);
  }
};