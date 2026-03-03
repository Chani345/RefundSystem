const API_BASE = "/api";

export type Refund = {
  id: number;
  name: string;
  amount: number;
  reason: string;
  status: "ממתין" | "מאושר" | "נדחה";
  createdAt: string;
};

export type CreateRefundDto = {
  name: string;
  amount: string;
  reason: string;
};

// TODO: Replace with real API calls when backend is ready
// Mock data for development
let mockData: Refund[] = [
  { id: 1, name: "ישראל ישראלי", amount: 500, reason: "החזר נסיעות", status: "ממתין", createdAt: new Date().toISOString() },
  { id: 2, name: "שרה כהן", amount: 1200, reason: "ציוד משרדי", status: "מאושר", createdAt: new Date().toISOString() },
  { id: 3, name: "דוד לוי", amount: 800, reason: "הדרכה מקצועית", status: "ממתין", createdAt: new Date().toISOString() },
];

export const refundService = {
  async getAll(): Promise<Refund[]> {
    return new Promise(resolve => setTimeout(() => resolve([...mockData]), 500));
  },

  async create(data: CreateRefundDto): Promise<Refund> {
    const newRefund: Refund = {
      id: mockData.length + 1,
      name: data.name,
      amount: Number(data.amount),
      reason: data.reason,
      status: "ממתין",
      createdAt: new Date().toISOString(),
    };
    mockData.push(newRefund);
    return new Promise(resolve => setTimeout(() => resolve(newRefund), 500));
  },

  async updateStatus(id: number, status: "מאושר" | "נדחה"): Promise<Refund> {
    const refund = mockData.find(r => r.id === id);
    if (!refund) throw new Error("Refund not found");
    refund.status = status;
    return new Promise(resolve => setTimeout(() => resolve(refund), 500));
  },
};
