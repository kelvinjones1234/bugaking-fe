import { api } from "@/utils/axios";

// --- 1. Define Data Shapes ---

// New Interface for the nested object from backend
export interface NextPaymentData {
  title: string;      // e.g., "Installment 2"
  amount: number;     // e.g., 300000.0
  due_date: string;   // e.g., "2026-02-25"
  days_left: number;  // e.g., 30
}

export interface PaymentScheduleItem {
  id: number;
  title: string;
  formatted_date: string;
  amount: string;
  status: "upcoming" | "pending" | "paid" | "overdue";
}

export interface Investment {
  id: number;
  status: "pending" | "paying" | "completed" | "earning";
  
  // Project Info
  project_name: string;
  location: string;
  project_image: string | null;
  investment_type: "agriculture" | "real-estate";
  category_tag: string;
  
  // Financials
  roi: string | null;
  agreed_amount: string;
  amount_paid: string;
  balance: number;
  percentage_completion: number;
  installment_amount: string;
  
  // Dates & Next Payment (Updated to match Backend JSON)
  start_date: string;
  next_payment_data: NextPaymentData | null; // <--- The Fix
  
  // Detail View Only
  schedules?: PaymentScheduleItem[]; 
}

// --- 2. API Client Class ---

class APIClient {
  private static instance: APIClient;

  private constructor() {}

  static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  private handleResponse<T>(response: any): T {
    return response.data;
  }

  async getInvestments(category?: string): Promise<Investment[]> {
    const config = category ? { params: { category } } : {};
    const response = await api.get("/client-investments/", config);
    return this.handleResponse<Investment[]>(response);
  }

  async getInvestmentDetail(id: number): Promise<Investment> {
    const response = await api.get(`/client-investments/${id}/`);
    return this.handleResponse<Investment>(response);
  }
}

export const investmentClient = APIClient.getInstance();