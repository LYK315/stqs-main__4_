function Commands() {
  return (
    <div className="w-[15em] h-[15em] border-2 border-cyan-600 rounded-full flex items-center justify-center">
      <div className="absolute font-bold text-xs">
        FEATURES
      </div>

      {/* Feature / Btn - Manage Contracts */}
      <div
        role="button"
        className="text-lg min-w-fit bg-tertiary border rounded-xl p-1 px-4 cursor-pointer hover:text-cyan-300 hover:border-cyan-300 hover:bg-blue-950 
        transition-all duration-800 hover:scale-110
        translate-x-[6.5em] translate-y-[-6em]">
        1. Contract
      </div>

      {/* Feature / Btn - Shipyards */}
      <div
        role="button"
        className="text-lg min-w-fit bg-tertiary border rounded-xl p-1 px-4 cursor-pointer hover:text-cyan-300 hover:border-cyan-300 hover:bg-blue-950 
        transition-all duration-800 hover:scale-110
        translate-x-[-5em] translate-y-[4em]">
        3. Market
      </div>

      {/* Feature / Btn - Nearby Market */}
      <div
        role="button"
        className="text-lg min-w-fit bg-tertiary border rounded-xl p-1 px-4 cursor-pointer hover:text-cyan-300 hover:border-cyan-300 hover:bg-blue-950 
        transition-all duration-800 hover:scale-110
        translate-x-[0em] translate-y-[4em]">
        2. Shipyard
      </div>
    </div>
  )
}

export default Commands