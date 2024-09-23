import { WaypointList } from "@shared/interfaces/system";
import { ShipyardData } from "@shared/interfaces/shipyard";

/*===================== Main =====================*/
export interface commandsProps {
  systemSymbol?: string;
  setUpdateData: (value: number) => void
}

export interface getWaypointListProps {
  systemSymbol: string | null;
  setDropDownList: (value: { symbol: string; type: string }[]) => void;
}


/*===================== Market =====================*/
export interface marketDashboardProps {
  closeCommandDashboard: () => void;
  systemSymbol?: string;
}

export interface getMarketListProps {
  systemSymbol?: string;
  setMarketList: (value: WaypointList) => void;
}


/*===================== Shipyard =====================*/
export interface shipyardDashboardProps {
  closeCommandDashboard: () => void;
  systemSymbol?: string;
  setUpdateData: (value: number) => void
}

export interface getShipyardListProps {
  systemSymbol?: string
  setShipyardList: (value: WaypointList) => void;
}

export interface getShipyardProps {
  systemSymbol?: string,
  waypointSymbol: string | null,
  setShipyardData: (value: ShipyardData) => void,
}

export interface shipyardManageProps {
  shipyard: ShipyardData;
  closeManageShipyard: () => void;
  setUpdateData: (value: number) => void
}