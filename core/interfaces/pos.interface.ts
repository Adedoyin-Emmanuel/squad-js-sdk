import type { BaseResponseProps } from "./base-response";

export interface PosInterface {
  id: string;
  amount: number;
  status: number;
  card: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  merchant_id: string;
  terminal_id: string;
  location_id: string;
}

export interface PosInterfaceResponseProps {
  data: {
    count: number;
    rows: PosInterface[];
  };
}
