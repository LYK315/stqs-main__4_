import { ContractData } from "@shared/interfaces/contract";
import { ContractList } from "@shared/interfaces/contract";

export interface contractDashboardProps {
  closeCommandDashboard: () => void;
};

export interface contractManageProps {
  contract: ContractData;
  closeManageContract: () => void;
}

export interface getContractListProps {
  setContractList: (value: ContractList) => void;
}