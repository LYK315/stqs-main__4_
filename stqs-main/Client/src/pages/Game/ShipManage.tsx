import axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { ShipData } from "../../../../Shared/Types/ship"

interface Props {
  ship: ShipData;
  updateData: boolean;
  setUpdateData: (value: boolean) => void;
  onClose: () => void;
}

function ShipManage({ ship, updateData, setUpdateData, onClose }: Props) {
  const [selectedWaypoint, setSelectedWaypoint] = useState<string | null>(null);
  const [dropDownList, setDropDownList] = useState<{ symbol: string; type: string }[]>([]);
  const [shipDocked, setShipDocked] = useState<boolean>(true);

  // Execute code on each render
  useEffect(() => {
    // Update ship status
    setShipDocked(
      ship.nav.status === 'DOCKED' ? true :
        ship.nav.status === 'IN_ORBIT' ? false :
          true
    );

    // Fetch - All Waypoint in current system
    // Unable to fetch data only once on page load, thr may be ships located in different systems
    async function fetchWaypointList() {
      try {
        const response = await axios.get(`http://localhost:8080/api/systems/waypointList`, {
          params: { systemSymbol: ship.nav.systemSymbol }
        });
        const waypoints = response.data.data;
        const options = waypoints.map((waypoint: { symbol: string; type: string }) => ({
          symbol: waypoint.symbol,
          type: waypoint.type
        }));
        setDropDownList(options);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchWaypointList();
  }, []);

  // Button - Close Pop up window
  function handleClose() {
    onClose();
  }

  // API Call - Manage Ship (Orbit / Dock)
  async function moveShip(manage: string) {
    // Error Handle - Ship in transit
    if (ship.nav.status === 'IN_TRANSIT') {
      alert(`Ship "${ship.registration.name}" is in transit. Be patient mate.`)
    };

    const apiURLs = {
      ORBIT: 'http://localhost:8080/api/ship/orbit',
      DOCK: 'http://localhost:8080/api/ship/dock',
    } as const;

    const apiURL = apiURLs[manage as keyof typeof apiURLs];

    // Send request to API End Point
    try {
      await axios.post(apiURL, { shipSymbol: ship.registration.name });
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    // Update dashboard / status board
    setUpdateData(!updateData);
  }

  // API Call - Refuel Ship
  async function refuelShip() {
    // Error Handle - Ship in transit
    if (ship.nav.status === 'IN_TRANSIT') {
      alert(`Ship "${ship.registration.name}" is in transit. Be patient mate.`)
    };

    // CHECK OTHER POTENTIAL ERRORS

    // Call API End Point
    try {
      await axios.post('http://localhost:8080/api/ship/refuel', {
        shipSymbol: ship.registration.name
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // API Call - Extract Ore
  async function extractOre() {
    // Error Handle - Ship in transit
    if (ship.nav.status === 'IN_TRANSIT') {
      alert(`Ship "${ship.registration.name}" is in transit. Be patient mate.`)
    };

    // CHECK OTHER POTENTIAL ERRORS

    // Call API End Point
    try {
      await axios.post('http://localhost:8080/api/ship/extract', {
        shipSymbol: ship.registration.name
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // API Call - Navigate ship to selected waypoint
  async function navigateShip(destSymbol: string | null) {
    // Error Handle - Ship in transit
    if (ship.nav.status === 'IN_TRANSIT') {
      alert(`Ship "${ship.registration.name}" is in transit. Be patient mate.`)
    };

    // Error Handle - Ship not in orbit
    if (ship.nav.status !== 'IN_ORBIT') {
      alert(`Ship "${ship.registration.name}" is not in orbit. Move it to orbit before navigating.`)
    };

    // Error Handle - Empty waypoint
    if (!destSymbol) {
      alert("Dnt try to visit black hole. Please select a destination...")
    };

    // Call API Endpoint
    try {
      await axios.post('http://localhost:8080/api/ship/navigate', { shipSymbol: ship.registration.name, destWaypointSymbol: destSymbol });
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    // Update dashboard / status board
    setUpdateData(!updateData);
  }

  return (
    <div className="flex flex-col gap-3 text-md text-left">
      {/* Data - Ship symbol */}
      <div className="flex flex-row place-content-between ">
        <span className="font-bold">{ship.registration.name} ({ship.nav.status})
        </span>
        <button
          className="w-fit h-fit hover:text-cyan-300 hover:font-bold text-[10px]"
          onClick={handleClose}
        >Close</button>
      </div>

      {/* Feature - Navigate Ship */}
      <div className="flex flex-row gap-3 items-center w-full">
        {/* List - All Waypoint in current system & Waypoint Type */}
        <div className="w-full">
          <Dropdown optionList={dropDownList} selected={selectedWaypoint} setSelected={setSelectedWaypoint} />
        </div>

        {/* Button - Navigate */}
        <button
          className="border bg-tertiary border-cyan-800 rounded-md py-1 px-2 text-sm hover:text-cyan-600 hover:bg-dashboard"
          onClick={() => { navigateShip(selectedWaypoint), handleClose() }}
        >
          Navigate
        </button>
      </div>

      {/* A Simple Line */}
      <div className="py-1">
        <hr className="border-cyan-900" />
      </div>

      {/* Buttons - Manage Ship */}
      <div className="flex flex-row gap-5">
        {/* Button - Orbit or Dock */}
        <button
          className="border border-cyan-600 rounded-md py-[2px] px-2 text-sm hover:text-cyan-600 basis-1/3"
          onClick={() => { moveShip(`${shipDocked ? 'ORBIT' : 'DOCK'}`), handleClose() }}
        >
          {shipDocked ? 'Orbit' : 'Dock'}
        </button>

        {/* Button - Refuel */}
        <button
          className="border border-cyan-600 rounded-md py-[2px] px-2 text-sm hover:text-cyan-600 basis-1/3"
          onClick={() => { refuelShip(), handleClose() }}
        >
          Refuel
        </button>

        {/* Button - Extract */}
        <button
          className="border border-cyan-600 rounded-md py-[2px] px-2 text-sm hover:text-cyan-600 basis-1/3"
          onClick={() => { extractOre(), handleClose() }}
        >
          Extract
        </button>
      </div>
    </div>
  )
}

export default ShipManage