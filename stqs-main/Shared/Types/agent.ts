export interface Agent {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: bigint;
};

export interface NewAgent {
  data: {
    token: string;
  }
};
