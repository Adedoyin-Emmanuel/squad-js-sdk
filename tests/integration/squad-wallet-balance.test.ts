import { CreateSquadClient } from "../../core";
import { describe, test, it, expect } from "bun:test";

describe("Squad Wallet Balance Module Test 🧪", () => {
  /**
   * Create a new Squad client
   */
  const squad = new CreateSquadClient(
    process.env.SQUAD_PUBLIC_KEY as string,
    process.env.SQUAD_PRIVATE_KEY as string,
    process.env.NODE_ENV as "development" | "production"
  );

  describe("Get Wallet Balance Method", () => {
    it("Should return the Merchant Wallet Balance", async () => {
      const response = await squad.getWalletBalance("NGN");

      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data).toBeObject();
      expect(response.data.balance).toBeNumber();
    });
  });
});
