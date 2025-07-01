import { CartItem, PaymentMethod, Transaction } from "@/types/pos";
import { useCallback, useState } from "react";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = useCallback(
    (items: CartItem[], paymentMethod: PaymentMethod, discount: number = 0) => {
      const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const tax = subtotal * 0.08; // 8% tax rate
      const total = subtotal + tax - discount;

      const transaction: Transaction = {
        id: Date.now().toString(),
        items,
        subtotal,
        tax,
        discount,
        total,
        paymentMethod,
        timestamp: new Date(),
        cashierName: "Cashier 1", // In a real app, this would come from authentication
      };

      setTransactions((prev) => [transaction, ...prev]);
      return transaction;
    },
    []
  );

  const getTodayStats = useCallback(() => {
    const today = new Date().toDateString();
    const todayTransactions = transactions.filter(
      (t) => t.timestamp.toDateString() === today
    );

    const todaySales = todayTransactions.reduce((sum, t) => sum + t.total, 0);
    const averageTransaction =
      todayTransactions.length > 0 ? todaySales / todayTransactions.length : 0;

    // Get top product
    const productCounts: Record<string, number> = {};
    todayTransactions.forEach((transaction) => {
      transaction.items.forEach((item) => {
        productCounts[item.product.name] =
          (productCounts[item.product.name] || 0) + item.quantity;
      });
    });

    const topProduct =
      Object.entries(productCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "None";

    return {
      todaySales,
      todayTransactions: todayTransactions.length,
      averageTransaction,
      topProduct,
    };
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    getTodayStats,
  };
};
