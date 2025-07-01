import { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Transaction {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  timestamp: Date;
  cashierName: string;
}

export type PaymentMethod = "cash" | "card" | "digital";

export interface DashboardStats {
  todaySales: number;
  todayTransactions: number;
  averageTransaction: number;
  topProduct: string;
}
