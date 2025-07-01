import { Product } from "./product";

export interface Sale {
  id: string;
  user_id: number;
  sale_date: Date;
  total_amount: number;
  details: SaleDetails[];
}

interface SaleDetails {
  id: number;
  sale_id: number;
  product_id: number;
  product: Product;
  quantity: number;
  subtotal: number;
}
