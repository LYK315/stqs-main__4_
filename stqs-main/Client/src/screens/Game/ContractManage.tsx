import formatThousands from "@/utils/formatThousands";
import formatDateString from "@/utils/formatDate";
import { contractManageProps } from "@/interfaces/contract";
import { acceptContract } from "@/services/contractAPI";

function ContractManage({ contract, closeManageContract, closeCommandDashboard }: contractManageProps) {

  // Handle - accept contract
  function handleAcceptContract() {
    // API Call - Send post request to accept contract
    const contractID = contract.id;
    acceptContract({ contractID, closeCommandDashboard });
  }

  return (
    <div className="flex flex-col gap-3 text-md text-left py-1">
      {/* Data - Contract ID */}
      <div className="flex flex-row place-content-between">
        <span className="font-bold items-center">
          Contract <span className="text-sm font-normal">#{contract.id}</span>
        </span>
        <button
          className="w-fit h-fit hover:text-cyan-300 hover:font-bold text-[10px]"
          onClick={closeManageContract}
        >
          Close
        </button>
      </div>

      {/* A Simple Line */}
      <div className="py-1">
        <hr className="border-cyan-900" />
      </div>

      {/* Data - Contract Details */}
      <div className="flex flex-col gap-5 px-4 max-h-[297px] overflow-y-auto">
        {/* Data - Contract Type */}
        <div className="flex flex-col">
          <span className="font-bold">Type</span>
          <span className="font-thin">{contract.type}</span>
        </div>

        {/* Data - Contract Progress */}
        <div className="flex flex-col">
          <span className="font-bold">Progress</span>
          <span className="font-thin">Fulfilled: {contract.fulfilled.toString()}</span>
        </div>

        {/* Data - Contract Deadline */}
        <div className="flex flex-col">
          <span className="font-bold">Deadline</span>
          <span className="font-thin">{formatDateString(contract.terms.deadline)}</span>
        </div>

        {/* Data - Delivery */}
        <div className="flex flex-col">
          <span className="font-bold">Delivery Task</span>
          {contract.terms.deliver.map((delivery) => (
            <div className="flex flex-col">
              <span className="font-thin">Trade Symbol: {delivery.tradeSymbol}</span>
              <span className="font-thin">Units Requireed: {delivery.unitsRequired}</span>
              <span className="font-thin">Units Fulfilled: {delivery.unitsFulfilled}</span>
            </div>
          ))}
        </div>

        {/* Data - Contract Payment */}
        <div className="flex flex-col">
          <span className="font-bold">Payment</span>
          <span className="font-thin">On Accept: $ {formatThousands(contract.terms.payment.onAccepted)}</span>
          <span className="font-thin">On Fulfill: $ {formatThousands(contract.terms.payment.onFulfilled)}</span>
        </div>
      </div>

      {/* A Simple Line */}
      <div className="py-1">
        <hr className="border-cyan-900" />
      </div>

      {/* Button - Accept Contract */}
      <button
        className={`mt-2 mx-auto border border-cyan-600 rounded-md text-md py-1 px-5 hover:text-cyan-600 w-fit ${contract.accepted ? 'text-gray-400 border-gray-400 cursor-not-allowed' : 'hover:text-cyan-600'}`}
        disabled={contract.accepted}
        onClick={() => { handleAcceptContract(), closeManageContract() }}
      >
        {contract.accepted ? "Accepted" : "Accept"}
      </button>
    </div>
  )
}

export default ContractManage