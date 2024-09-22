export interface ContractList {
  data: ContractData[];
}

export interface ContractData {
  id: string;
  factionSymbol: string;
  type: string; // PROCUREMENT, TRANSPORT, SHUTTLE
  terms: Terms;
  accepted: boolean;
  fulfilled: boolean;
  expiration: string; // ISO 8601 date string
  deadlineToAccept: string; // ISO 8601 date string
}

interface Terms {
  deadline: string; // ISO 8601 date string
  payment: Payment;
  deliver: Deliver[];
}

export interface Payment {
  onAccepted: number;
  onFulfilled: number;
}

interface Deliver {
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}
