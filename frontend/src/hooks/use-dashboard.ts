import { useEffect, useState } from "react";

import { getProducts } from "@/services/product";
import { getTransactions } from "@/services/sales";
import { getUsers } from "@/services/user";

import { Product } from "@/types/product";
import { Sale } from "@/types/sales";
import { User } from "@/types/user";

// Define a clear shape for our final statistics
interface DashboardStats {
  totalRevenue: number;
  userCount: number;
  salesCount: number;
  productCount: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch all data in parallel for better performance
        const [productsRes, usersRes, salesRes] = await Promise.all([
          getProducts(),
          getUsers(),
          getTransactions(),
        ]);

        // Centralized success check
        if (!productsRes.success || !usersRes.success || !salesRes.success) {
          throw new Error("Failed to fetch all required dashboard data.");
        }

        // Extract data from potentially nested response structures
        const products: Product[] = productsRes.data.data;
        const users: User[] = usersRes.data;
        const sales: Sale[] = salesRes.data.data;

        // Calculate stats from the fetched data
        const totalRevenue = sales.reduce(
          (sum, item) => sum + item.total_amount,
          0
        );

        setStats({
          totalRevenue,
          userCount: users.length,
          salesCount: sales.length,
          productCount: products.length,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []); // The empty dependency array ensures this effect runs only once

  return { stats, isLoading, error };
};
