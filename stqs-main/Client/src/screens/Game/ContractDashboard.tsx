import { useEffect, useState } from "react";
import { ContractList, ContractData } from '@shared/Types/contract';
import ContractManage from "./ContractManage";
import { getContractList } from "../../services/contractAPI";

function ContractDashboard({ closeCommandDashboard }: { closeCommandDashboard: () => void }) {
  const [contractList, setContractList] = useState<ContractList>({ data: [] });
  const [selectContract, setSelectContract] = useState<ContractData | null>(null);

  // Handle - Set selected contract data
  function handleSelectConract(contract: ContractData) {
    setSelectContract(contract);
  }

  // Handle - Close manage command box
  function handleCloseManage() {
    setSelectContract(null);
  }

  // Execute once on render
  useEffect(() => {
    // API Call  - All Waypoint in current system
    getContractList(setContractList);
  }, []);

  return (
    <div className="flex flex-col gap-2 text-md text-left">
      {/* Title - Command Area & Close Button */}
      <div className="flex flex-row place-content-between">
        <span className="font-bold">Manage Contracts</span>
        <button
          className="w-fit h-fit hover:text-cyan-300 hover:font-bold text-[10px]"
          onClick={closeCommandDashboard}
        >
          Close
        </button>
      </div>

      {/* A simple line */}
      <div className="w-full border-t border-cyan-800 my-2"></div>

      {/* Loop display all contracts */}
      <div className="flex flex-col gap-3 max-h-[13rem] overflow-y-auto p-1">
        {contractList.data.length > 0 ? contractList.data.map((contract, index) => (
          <button
            className="flex flex-row gap-10 text-sm pr-14 pl-4 text-left p-2 rounded-lg border-t border-cyan-900 shadow-sm shadow-cyan-600 hover:shadow-cyan-500 hover:bg-tertiary hover:opacity-70"
            key={contract.id}
            onClick={() => { handleSelectConract(contract) }}
          >
            {/* Data - contract id */}
            <div className="flex flex-col">
              <span className="font-bold">ID</span>
              <span className="font-mono text-[13px] text-cyan-200">{contract.id}</span>
            </div>

            {/* Data - contract type */}
            <div className="flex flex-col">
              <span className="font-bold">Type</span>
              <span className="font-mono text-[13px] text-cyan-200">{contract.type}</span>
            </div>

            {/* Data - accepted */}
            <div className="flex flex-col">
              <span className="font-bold">Accepted</span>
              <span className="font-mono text-[13px] text-cyan-200">{contract.accepted.toString()}</span>
            </div>

            {/* Data - fulfilled */}
            <div className="flex flex-col">
              <span className="font-bold">Fulfilled</span>
              <span className="font-mono text-[13px] text-cyan-200">{contract.fulfilled.toString()}</span>
            </div>

            {/* Add line between each row */}
            {index < contractList.data.length - 1 && (
              <div className="w-full border-b border-gray-700 my-2"></div>
            )}
          </button>
        )) : "Loading"}
      </div>

      {/* Feature - Manage Ship */}
      {selectContract && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-dashboard p-4 px-5 rounded-md w-[29rem] h-fit shadow-md shadow-cyan-900 border border-cyan-800">
            <ContractManage contract={selectContract} closeManageContract={handleCloseManage} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ContractDashboard