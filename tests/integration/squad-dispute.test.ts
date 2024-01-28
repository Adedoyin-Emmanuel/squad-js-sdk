import { CreateSquadClient } from "../../core";
import { describe, test, it, expect } from "bun:test";

describe("Squad Dispute Module Test 🧪", () => {
  /**
   * Create a new Squad client
   */
  const squad = new CreateSquadClient(
    process.env.SQUAD_PUBLIC_KEY as string,
    process.env.SQUAD_PRIVATE_KEY as string,
    process.env.NODE_ENV as "development" | "production"
  );

  describe("Get All Dispute Method", () => {
    it("Should return all available disputes", async () => {
      const response = await squad.getAllDisputes();

      expect(response.status).toBe(200);
      expect(response.success).toBeTrue();
      expect(response.data).toBeObject();
      expect(response.data.count).toBeNumber();
      expect(response.data.rows).toBeArray();
      expect(response.data.query.total).toBeNumber();
    });
  });

  describe("Resolve Dispute Method", () => {
    it("Should return a 404 on an invalid ticket Id", async () => {
      const response = await squad.resolveDisputes(
        "Ticket123",
        "accepted",
        "filename1234"
      );

      expect(response.status).toBe(404);
      expect(response.success).toBeFalse();
    });
  });

  describe("Get Dispute File Upload URL", () => {
    it("Should return a 404 on n invalid ticketId", async () => {
      const response = await squad.getDisputeFileUploadUrl(
        "ticket123",
        "filename1234"
      );

      expect(response.status).toBe(404);
      expect(response.success).toBeFalse();
    });
  });
});
