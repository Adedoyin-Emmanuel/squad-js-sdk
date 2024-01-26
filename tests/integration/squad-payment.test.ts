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

      /**
       * Most importantly, the initiatePayment method returns a response
       * with the url to redirect the user to the payment page. We should equally test
       * that
       */
      expect(response.data?.checkout_url).toBeString();
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

  describe("Verify Transaction Method", () => {
    it("Should return a 200 status code for a valid transaction verification", async () => {
      const response = await squad.verifyTransaction(
        "SQEMMY6384147273871800005"
      );

      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data.transaction_status).toContain("success");
    });

    it("Should return a 500 status code for an invalid transaction verification", async () => {
      const response = await squad.verifyTransaction("fakeverification");

      expect(response.status).toBe(500);
      expect(response.success).toBeFalse();
    });
  });

  describe("Create Payment Link Method", () => {
    it("Should return a 200 status code for a successful payment link creation", async () => {
      const response = await squad.createPaymentLink({
        name: "Adedoyin Emmanuel Adeniyi",
        hash: `emmysoft${Math.floor(Math.random() * 100000)}`,
        linkStatus: 1,
        expireBy: new Date("2024-09-14").toISOString(),
        amount: 200000,
        currencyId: "NGN",
        description: "Funds for my gee",
      });

      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data).toBeObject();
    });

    it("Should return a 400 status code for a payment link has been taken already", async () => {
      const response = await squad.createPaymentLink({
        name: "Adedoyin Emmanuel",
        hash: "emmysoft",
        linkStatus: 1,
        expireBy: new Date("2024-09-14").toISOString(),
        amount: 200000,
        currencyId: "NGN",
        description: "Funds for my gee",
      });

      expect(response.status).toBe(400);
      expect(response.success).toBeFalse();
      expect(response.data).toEqual({} as any);
    });
  });
});
