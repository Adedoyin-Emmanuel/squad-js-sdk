import type { BaseResponseProps } from "./interfaces/base-response";
import SquadWalletBalance from "./wallet-balance";
import type { DisputeResponseProps } from "./interfaces/dispute.interface";

export default abstract class SquadDisputeResolver extends SquadWalletBalance {
  /**
   * @desc This is the sub class for the Squad Dispute Resolver Module
   * @arg {string} publicKey - Squad public key
   * @arg {string} privateKey - Squad private key
   * @arg {string} environment - The environment to use for the client. If not specified, defaults to "development".
   */

  private baseDisputeUrl: string;

  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
    this.baseDisputeUrl = "/dispute";
  }

  /**
   * @desc This method is used to get all disputes on your transactions raised by your customers.
   */
  public async getAllDisputes(): Promise<DisputeResponseProps> {
    try {
      const squadResponse = await this.Axios.get(this.baseDisputeUrl);

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error?.response?.data;
    }
  }

  /**
   * @desc This method is used to get a unique URL to upload an evidence(file) which is a proof or reason to reject a dispute. This is only necessary when we want to reject a dispute.
   *
   * @arg {string} ticketId - The unique ID that identifies the dispute you want to reject or accept
   * @arg {string} fileName - The name of the file
   */
  public async getDisputeFileUploadUrl(
    ticketId: string,
    fileName: string
  ): Promise<BaseResponseProps> {
    if (typeof ticketId !== "string" || typeof fileName !== "string")
      throw new Error("Validation Error! Invalid arguments supplied!");
    try {
      const squadResponse = await this.Axios.get(
        `${this.baseDisputeUrl}/upload-url/${ticketId}/${fileName}`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error?.response?.data;
    }
  }

  /**
   * This method is called to resolve a dispute.
   *
   * @param {string} ticketId - The unique ID that identifies the dispute you want to reject or accept
   * @param {string} action - The action taken for the dispute. Either "accepted" or "rejected"
   * @param {string} fileName - The name of the file uploaded.
   */
  public async resolveDisputes(
    ticketId: string,
    action: "accepted" | "rejected",
    fileName: string
  ): Promise<BaseResponseProps> {
    if (
      typeof ticketId !== "string" ||
      typeof action !== "string" ||
      typeof fileName !== "string"
    )
      throw new Error("Validation Error! Invalid arguments supplied!");

    const dataToSend = {
      action,
      file_name: fileName,
    };

    try {
      const squadResponse = await this.Axios.get(
        `${this.baseDisputeUrl}/${ticketId}/resolve`,
        dataToSend as any
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error?.response?.data;
    }
  }
}
