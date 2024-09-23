import { ContractData } from "@shared/Types/contract"
import formatThousands from "@/utils/formatThousands";
import formatDateString from "@/utils/formatDate";

interface Props {
  contract: ContractData;
  closeManageContract: () => void;
}

function ContractManage({ contract, closeManageContract }: Props) {

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
      <div className="flex flex-col gap-5 px-4">
        {/* Data - Contract Type */}
        <div className="flex flex-col gap-1">
          <span className="font-bold">Type</span>
          <span className="font-thin">{contract.type}</span>
        </div>

        {/* Data - Contract Progress */}
        <div className="flex flex-col gap-1">
          <span className="font-bold">Progress</span>
          <span className="font-thin">Fulfilled: {contract.fulfilled.toString()}</span>
        </div>

        {/* Data - Contract Deadline */}
        <div className="flex flex-col gap-1">
          <span className="font-bold">Deadline</span>
          <span className="font-thin">{formatDateString(contract.terms.deadline)}</span>
        </div>

        {/* Data - Contract Payment */}
        <div className="flex flex-col gap-1">
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
        onClick={() => { closeManageContract() }}
      >
        {contract.accepted ? "Accepted" : "Accept"}
      </button>
    </div>
  )
}

export default ContractManage