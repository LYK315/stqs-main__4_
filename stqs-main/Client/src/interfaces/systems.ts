import { WaypointList } from "@shared/interfaces/system";

/*===================== Main =====================*/
export interface commandsProps {
  systemSymbol: string | null;
}

export interface getWaypointListProps {
  systemSymbol: string | null;
  setDropDownList: (value: { symbol: string; type: string }[]) => void;
}


/*===================== Market =====================*/
export interface marketDashboardProps {
  closeCommandDashboard: () => void;
  systemSymbol: string | null;
}
export interface getMarketListProps {
  systemSymbol: string | null;
  setMarketList: (value: WaypointList) => void;
}


/*===================== Shipyard =====================*/
export interface shipyardDashboardProps {
  closeCommandDashboard: () => void;
  systemSymbol: string | null;
}

export interface getShipyardListProps {
  systemSymbol: string | null;
  setShipyardList: (value: WaypointList) => void;
}