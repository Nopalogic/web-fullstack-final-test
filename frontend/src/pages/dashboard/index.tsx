import { formatCurrency } from "@/utils";

import { useDashboardStats } from "@/hooks/use-dashboard";

import { Main } from "@/components/dashboard/main";
import { StatCard } from "@/components/dashboard/stat-card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function Dashboard() {
  const { stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Main>
        <p className='text-red-500'>Error: {error}</p>
      </Main>
    );
  }

  // This check is necessary as stats are null in the initial state
  if (!stats) {
    return null;
  }

  // Create an array to define the metrics, making it easy to add or remove cards
  const dashboardMetrics = [
    {
      title: "Total Revenue",
      value: formatCurrency("id-ID", "IDR", stats.totalRevenue),
    },
    { title: "Staff", value: stats.userCount },
    { title: "Sales", value: stats.salesCount },
    { title: "Products", value: stats.productCount },
  ];

  return (
    <Main>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Manage your staff, products, and sales information
        </p>
      </div>

      <div className='space-y-4 pt-8'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {dashboardMetrics.map((metric) => (
            <StatCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </div>
      </div>
    </Main>
  );
}
