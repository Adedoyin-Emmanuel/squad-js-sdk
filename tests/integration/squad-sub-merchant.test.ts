import { CreateSquadClient } from "../../core";
import { expect, test, describe, it, beforeAll } from "bun:test";

describe("Squad Sub Merchant Module Test 🧪", () => {
  /**
   * Create a new Squad client
   */
  const squad = new CreateSquadClient(
    process.env.SQUAD_PUBLIC_KEY as string,
    process.env.SQUAD_PRIVATE_KEY as string,
    process.env.NODE_ENV as "development" | "production"
  );

  describe("Create Sub Merchant", () => {
    it("Should return a 200 status code on successful sub-merchant creation", async () => {
      const response = await squad.createSubMerchant({
        displayName: "EmmysoftDCpu",
        accountName: "EmmysoftDCpuAccount",
        accountNumber: "000000000",
        bankCode: "054",
        bankName: "GtBank",
      });

      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data).toBeObject();
    });
  });

});
