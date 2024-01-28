import type { BaseResponseProps } from "./base-response";

export interface DisputeResponseProps extends BaseResponseProps {
  data: {
    count: number;
    rows: [];
    query: {
      total: number;
    };
  };
}
