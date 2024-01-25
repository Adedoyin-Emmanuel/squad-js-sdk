import SquadDisputeResolver from "./dispute";
import type { BaseResponseProps } from "./interfaces/base-response";
import type { PosInterfaceResponseProps } from "./interfaces/pos.interface";

export default abstract class SquadPOS extends SquadDisputeResolver {
  /**
   * @desc This is the sub class for the Squad POS Module
   * @arg {string} publicKey - Squad public key
   * @arg {string} privateKey - Squad private key
   * @arg {string} environment - The environment to use for the client. If not specified, defaults to "development".
   */

  private basePosUrl: string;

  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
    this.basePosUrl = "/softpos";
  }

  /**
   *
   * @param {number} page - The page number
   * @param {number} perPage - The number of transactions per page
   * @param {string} dateFrom - Format YYYY-MM-DD startDate
   * @param {string} dateTo - Format YYYY-MM-DD endDate
   * @param {string} sortBy - This is the sorting parameter. This can have a value of 'createdAt'
   * @param {string} sort_by_dir - This arranges transactions in Ascending or Descending order. Possible values are ASC or DESC
   */
  public async getAllPosTransactions(
    page: number,
    perPage: number,
    dateFrom?: string,
    dateTo?: string,
    sortBy?: string,
    sort_by_dir?: "ASC" | "DESC"
  ): Promise<PosInterfaceResponseProps> {
    if (typeof page !== "number" || typeof perPage !== "number")
      throw new Error("Validation Error! Page or PerPage must be an integer");

    try {
      const squadResponse = await this.Axios.get(
        `${this.basePosUrl}/transactions?perPage=${perPage}&page=${page}&date_from=${dateFrom}&date_to=${dateTo}&sortBy=${sortBy}&sort_by_dir=${sort_by_dir}`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }
}
