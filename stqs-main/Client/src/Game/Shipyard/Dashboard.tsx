
interface Props {
  closeCommandDashboard: () => void;
}

function ShipyardDashboard({ closeCommandDashboard }: Props) {
  return (
    <div className="flex flex-col gap-3 text-md text-left">
      {/* Data */}
      <div className="flex flex-row place-content-between ">
        <span className="font-bold">SHIPYARD</span>
        <button
          className="w-fit h-fit hover:text-cyan-300 hover:font-bold text-[10px]"
          onClick={closeCommandDashboard}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ShipyardDashboard