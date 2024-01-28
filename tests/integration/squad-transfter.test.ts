import { CreateSquadClient } from "../../core";
import { test, describe, it, expect } from "bun:test";

describe("Squad Transfer Test Module 🧪", () => {
  /**
   * Create a new Squad client
   */
  const squad = new CreateSquadClient(
    process.env.SQUAD_PUBLIC_KEY as string,
    process.env.SQUAD_PRIVATE_KEY as string,
    process.env.NODE_ENV as "development" | "production"
  );

  describe("Account Lookup Method", () => {
    it("Should return a 400 if merchant is not eligible to use endpont", async () => {
      const response = await squad.accountLookup("000013", "0889701301");

      expect(response.status).toBe(400);
      expect(response.success).toBeFalse();
    });
  });

  describe("Transfer Funds Method", () => {
    it("Should return a 400 if merchant is not eligible to use endpoint", async () => {
      const response = await squad.transferFunds({
        amount: "20000",
        accountName: "Adedoyin Emmanuel Adeniyi",
        accountNumber: "0889701301",
        bankCode: "000013",
        currencyId: "NGN",
        remark: "Funds came in",
        transactionReference: "TRANSACTION_1234",
      });

      expect(response.status).toBe(400);
      expect(response.success).toBe(false);
    });
  });

  describe("ReQuery Funds Transfer", () => {
    it("Should return a 404 status code if merchant is not profiled for the service", async () => {
      const response = await squad.reQueryFundsTransfer(
        "TRANSACTION_REF_123345"
      );

      expect(response.status).toBe(400);
      expect(response.success).toBeFalse();
    });
  });

  describe("Get All Transfers", () => {
    it("Should return all transfers", async () => {
      const response = await squad.getAllTransfers();


      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data).toBeArray();
    });
  });
});
