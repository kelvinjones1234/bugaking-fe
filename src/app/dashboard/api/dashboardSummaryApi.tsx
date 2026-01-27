import { api } from "@/utils/axios"; // Adjust path to your axios instance

// Types matches the Serializer output
export interface DashboardData {
  total_invested: number;
  portfolio_value: number;
  projected_roi_percentage: number;
  avg_roi: number;
  next_payment: {
    title: string;
    amount: number;
    due_date: string;
    days_left: number;
  } | null;
  recent_transactions: {
    id: number;
    title: string;
    amount: number;
    date_paid: string;
    status: string;
    project_name: string;
    type_display: string;
  }[];
  portfolio_items: {
    id: number;
    project_name: string;
    location: string;
    project_img: string | null;
    expected_roi: number;
    percentage_completion: number;
    status: string;
  }[];
}

class DashboardAPI {
  async getSummary(): Promise<DashboardData> {
    const response = await api.get("/dashboard/summary/"); // Ensure this matches your urls.py
    return response.data;
  }
}

export const dashboardClient = new DashboardAPI();