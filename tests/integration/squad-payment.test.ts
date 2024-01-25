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
      expect(response.success).toBeTruthy();
    });
  });
});
