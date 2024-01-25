import { expect, test, describe, it, beforeEach } from "bun:test";
import { CreateSquadClient } from "../../core";

describe("Squad Payment Module Test 🧪", () => {
  /**
   * Create a new Squad client
   */
  const squad = new CreateSquadClient(
    process.env.SQUAD_PUBLIC_KEY as string,
    process.env.SQUAD_PRIVATE_KEY as string,
    process.env.NODE_ENV as "development" | "production"
  );

  describe("Initiate Payment Method", () => {
    it("Should return a 200 successful status code and contain valid response body data", async () => {
      const response = await squad.initiatePayment({
        amount: 20000,
        email: "adedoyine535@gmail.com",
        initiateType: "inline",
        currency: "NGN",
      });

      expect(response.status).toEqual(200);
      expect(response.success).toBeTrue();
      expect(response.data).toBeObject();
    });
  });

  describe("Charge Card Method", () => {
    it("Should return a 400 status code and valid response error message", async () => {
      const response = await squad.chargeCard({
        amount: 20000,
        tokenId: "token123456",
      });

      // I expect the response to be a 400 status code, because the token is invalid
      expect(response.status).toBe(400);
      expect(response.success).toBeFalse();
    });
  });
});
