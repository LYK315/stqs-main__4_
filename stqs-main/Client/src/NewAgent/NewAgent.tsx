import { useState } from "react";
import axios from "axios";
import BtnNavigate from "../components/BtnNavigate"

function NewAgent() {
  const [form, setForm] = useState({ symbol: "", faction: "COSMIC" });
  const [apiKey, setApiKey] = useState()

  // Register New Agent & Get API Key
  async function handleCreateAgent() {
    try {
      const response = await axios.post('http://localhost:8080/api/agent/register', { symbol: form.symbol, faction: form.faction });
      
      setApiKey(response.data.token);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center">
      <div className="w-[70%] min-h-[70%] h-fit flex justify-center items-center bg-dashboard py-6 rounded-xl border-transparent">
        <div className="flex flex-col gap-4 items-center">
          {/* Title */}
          <h1 className="text-xl font-bold">Create New Agent</h1>

          {/* Agent Name | Symbol */}
          <input
            name="symbol"
            placeholder="Enter Agent Name"
            className="p-2 rounded-md border border-gray-400 bg-gray-700 text-white"
            value={form.symbol}
            onChange={(e) => setForm({ ...form, symbol: e.currentTarget.value })}
          />

          {/* Faction */}
          <input
            name="faction"
            placeholder="Enter Fraction eg.COSMIC"
            className="p-2 rounded-md border border-gray-400 bg-gray-700 text-white"
            value={form.faction}
            onChange={(e) => setForm({ ...form, faction: e.currentTarget.value })}
          />

          {/* Button - Submit */}
          <input
            type="submit"
            className="text-sm w-fit p-1 px-2 border rounded-md bg-dashboard hover:text-blue-200 hover:bg-tertiary cursor-pointer transition-colors duration-300"
            onClick={handleCreateAgent}
          />

          {/* New API Key */}
          <div className={`${apiKey ? "visible" : "hidden"} max-w-[63em] text-xs break-words text-pretty`}>
            New API Key : {apiKey}
          </div>
        </div>
      </div>

      {/* Button - Back to Game */}
      <div>
        <BtnNavigate route='/' label='Back to Game Page' />
      </div>
    </div>
  )
}
export default NewAgent