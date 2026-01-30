import { api } from "@/utils/axios";

// --- 1. Define Data Shapes ---

export interface Transaction {
  id: number;
  timestamp: string; // ISO string from backend
  formatted_date: string; // e.g., "Oct 24, 2024"
  formatted_time: string; // e.g., "14:32:01 GMT"
  payment_reference: string;
  amount: string; // Decimal string from backend (safe for formatting)
  location: string;
  installment_number: number | null;
  project_name: string;
  investment_type: "agriculture" | "real-estate" | "tech"; // Adjust based on your model choices
  project_image: string | null;
}

export interface TransactionStats {
  total_invested: number;
  currency: string;
}

export interface TransactionResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Transaction[];
}

// --- 2. API Client Class ---

class PaymentHistoryClient {
  private static instance: PaymentHistoryClient;

  private constructor() {}

  static getInstance(): PaymentHistoryClient {
    if (!PaymentHistoryClient.instance) {
      PaymentHistoryClient.instance = new PaymentHistoryClient();
    }
    return PaymentHistoryClient.instance;
  }

  private handleResponse<T>(response: any): T {
    return response.data;
  }

  /**
   * Fetch paginated list of transactions
   * @param params - Optional filters (search, sector, etc.)
   */
  async getTransactions(
    params: {
      page?: number;
      search?: string;
      investment__selected_option__project__investment_type?: string; // Sector filter
    } = {},
  ): Promise<TransactionResponse> {
    const response = await api.get("/transactions/", { params });
    return this.handleResponse<TransactionResponse>(response);
  }

  /**
   * Fetch summary stats (Total Invested)
   */
  async getStats(): Promise<TransactionStats> {
    const response = await api.get("/transactions/stats/");
    return this.handleResponse<TransactionStats>(response);
  }
}

export const paymentHistoryClient = PaymentHistoryClient.getInstance();
