import { ShipData } from "@shared/interfaces/ship";
import { ShipList } from "@shared/interfaces/ship";

export interface shipDashboardProps {
  updateData: number;
  setUpdateData: (value: number) => void;
}

export interface shipManageProps {
  ship: ShipData;
  setUpdateData: (value: number) => void;
  onClose: () => void;
}

export interface getShipListProps {
  setShipList: (value: ShipList) => void;
}

export interface moveShipProps {
  shipStat: string,
  shipName: string,
  manage: string,
  setUpdateData: (value: number) => void
}

export interface refuelShipProps {
  shipStat: string,
  shipName: string,
  setUpdateData: (value: number) => void
}

export interface extractOreProps {
  shipStat: string,
  shipName: string,
  setUpdateData: (value: number) => void
}

export interface navigateShipProps {
  shipStat: string,
  shipName: string,
  destSymbol: string | null,
  setUpdateData: (value: number) => void
}