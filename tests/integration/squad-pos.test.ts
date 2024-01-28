import { CreateSquadClient } from "../../core";
import { it, describe, expect } from "bun:test";

describe("Squad POS Module Test 🧪", () => {
  /**
   * Create a new Squad client
   */
  const squad = new CreateSquadClient(
    process.env.SQUAD_PUBLIC_KEY as string,
    process.env.SQUAD_PRIVATE_KEY as string,
    process.env.NODE_ENV as "development" | "production"
  );

  describe("Get All POS Transactions Method", () => {
    it("Should return all POS Transactions Method", async () => {
      const response = await squad.getAllPosTransactions(1, 20);

      expect(response.status).toBe(200);
      expect(response.data).toBeObject();
      expect(response.data.count).toBeNumber();
      expect(response.data.rows).toBeArray();
      expect(response.data.query).toBeObject();
      expect(response.data.query.page).toBeNumber();
      expect(response.data.query.perPage).toBeNumber();
    });
  });
});
