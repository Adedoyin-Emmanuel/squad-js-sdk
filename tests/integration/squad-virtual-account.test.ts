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

  describe("Create Virtual Account", () => {
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

  describe("Create Business Virtual Account", () => {
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

    
    // describe("Get Webhook Error Log", async () => {
    //    it("Sho") 
    // });
});
