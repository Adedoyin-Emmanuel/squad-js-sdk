import { CreateSquadClient } from "../../core";
import { expect, test, describe, it, beforeAll } from "bun:test";

describe("Squad Virtual Account Module Test 🧪", () => {
  /**
   * Create a new Squad client
   */
  const squad = new CreateSquadClient(
    process.env.SQUAD_PUBLIC_KEY as string,
    process.env.SQUAD_PRIVATE_KEY as string,
    process.env.NODE_ENV as "development" | "production"
  );

  describe("Create Virtual Account Method", () => {
    /**
     * I should've tested for a 200 status code here but I didn't because
     * I don't want to add my BVN to the test suite. Alternatively I can add it to my ENV but
     * Nah... I'm not doing that.
     */
    it("Should return a 400 status code on invalid BVN", async () => {
      const response = await squad.createVirtualAccount({
        firstName: "Adedoyin",
        lastName: "Emmanuel",
        middleName: "Adeniyi",
        mobileNumber: "09083927493",
        dob: "08/28/2002",
        email: "adedoyine535@gmail.com",
        bvn: "101020304858",
        gender: "1",
        address: "42, kuburat agbedeyi street, Alagbado lagos",
        customerIdentifier: "Emmysoft123",
      });

      expect(response.status).toBe(400);
      expect(response.success).toBeFalse();
    });
  });

  describe("Create Business Virtual Account Method", () => {
    it("Should return a 400 status code on invalid BVN", async () => {
      const response = await squad.createBusinessVirtualAccount({
        bvn: "102034959686",
        businessName: "Emmysoft Tech",
        mobileNumber: "09029595867",
        customerIdentifier: "EmmysoftTech12344",
        beneficiaryAccount: "0000000000",
      });

      expect(response.status).toBe(400);
      expect(response.success).toBeFalse();
    });
  });

  describe("Get Webhook Error Log Method", () => {
    it("It should return a 200 status and return all webhook errors", async () => {
      const response = await squad.getWebhookErrorLog(1, 0);

      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data.rows).toBeArray();
    });
  });

  describe("Delete Webhook Error Log Method", async () => {
    it("Should return 404 on an invalid transaction ref", async () => {
      const response = await squad.deleteWebhookErrorLog(
        "SQEMMY6384147273871800005"
      );

      expect(response.status).toBe(404);
      expect(response.success).toBeFalse();
    });
  });

  describe("Find Customer By Transaction Id Method", () => {
    it("Should return a 500 status code if a customer is not found", async () => {
      const response = await squad.findCustomerTransactionById(
        "SQEMMY6384147273871800005"
      );

      expect(response.status).toBe(500);
      expect(response.success).toBeFalse();
    });
  });

  describe("Find All Merchant Transactions Method", () => {
    it("Should return all merchant transactions", async () => {
      const response = await squad.findAllMerchantTransactions();

      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data).toBeObject();
    });
  });

  describe("Find All Merchant Transactions By Filter Method", () => {
    it("Should return all merchant transactions by filter", async () => {
      const response = await squad.findAllMerchantTransactionsByFilter({
        page: 1,
        perPage: 50,
        startDate: "01/01/2024",
        endDate: "01/20/2024",
      });

      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data).toBeObject();
    });
  });

  describe("Get Customer Virtual Account Details Method", () => {
    it("Should return a 404 status code on a wrong customer identifier", async () => {
      const response = await squad.getCustomerVirtualAccountDetails(
        "Emmysoft123"
      );

      expect(response.status).toBe(404);
      expect(response.success).toBeFalse();
    });
  });

  describe("Update Customer BVN Method", () => {
    it("Should return a 404 on an invalid customer details", async () => {
      const response = await squad.updateCustomerBvn(
        "1234567890",
        "Emmysoft123",
        "09037583927"
      );

      expect(response.status).toBe(404);
      expect(response.success).toBeFalse();
    });
  });

  describe("Find All Merchant Virtual Accounts Method", () => {
    it("Should return all merchant virtual accounts", async () => {
      const response = await squad.findAllMerchantVirtualAccounts(1, 1);

      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data).toBeObject();
    });
  });

  describe("Update Beneficiary Account Number Method", () => {
    it("Should return a 404 error if a virtual account isn't found", async () => {
      const response = await squad.updateBeneficiaryAccount(
        "0000000000",
        "0001010203"
      );

      expect(response.status).toBe(404);
      expect(response.success).toBeFalse();
    });
  });

  describe("Simulate Virtual Account Payment Method", () => {
    it("Should return a 404 error if virtual account is not found", async () => {
      const response = await squad.simulateVirtualAccountPayment(
        "0000000000",
        "20000"
      );

      expect(response.status).toBe(404);
      expect(response.success).toBeFalse();
    });
  });

  describe("Create Dynamic Virtual Account Method", () => {
    it("Should return a 400 status if user hasn't created an account allocation", async () => {
      const response = await squad.createDynamicVirtualAccount();

      expect(response.status).toEqual(400);
      expect(response.success).toBeFalse();
    });
  });

  describe("Get Pool Count Method", () => {
    it("Should return the total number of virtual account in your pool with a 200 status code", async () => {
      const response = await squad.getPoolCount();

      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data).toBeObject();
      expect(response.data.count_dynamic_virtual_account).toBeNumber();
    });
  });

  describe("Initiate Dynamic Virtual Account Transaction Method", () => {
    it("Should return a 400 status code if user isn't profiled for the feature", async () => {
      const response = await squad.initiateDynamicVirtualAccountTransaction(
        "50000",
        60,
        "adedoyine535@gmail.com",
        `TRANS_${Math.random() * 200 + 1}`
      );

      expect(response.status).toBe(400);
      expect(response.success).toBeFalse();
    });
  });

  describe("ReQuery Dynamic Virtual Account Transaction Method", () => {
    it("Should return a 404 status code if transaction is not found", async () => {
      const response = await squad.reQueryDynamicVirtualAccountTransaction(
        "TRANS_001"
      );

      expect(response.status).toBe(404);
      expect(response.success).toBeFalse();
    });
  });

  describe("Update Dynamic Virtual Account Transaction Amount Method", () => {
    it("Should return a 400 status code if merchant is not profiled", async () => {
      const response = await squad.updateDynamicVirtualAccountTransactionAmount(
        "50000",
        "TRANSACTION_1234"
      );

      expect(response.status).toBe(400);
      expect(response.success).toBeFalse();
    });
  });
});
