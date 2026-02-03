import { getDashboardData } from "@/lib/dashboard-data";
import DashboardClient from "./dashboard-client";
import type { DashboardData } from "@/lib/types";

export const revalidate = 15; // Revalidate every 15 seconds

export default async function DashboardPage() {
  let dashboardData: DashboardData;
  let error: string | null = null;

  try {
    dashboardData = await getDashboardData();
  } catch (err) {
    console.error("Failed to fetch dashboard data:", err);
    error = err instanceof Error ? err.message : "Failed to fetch dashboard data";
    // Provide empty data structure for error state
    dashboardData = {
      markets: [],
      signalEvents: [],
    };
  }

  return <DashboardClient initialData={dashboardData} error={error} />;
}

