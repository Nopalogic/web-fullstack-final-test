export interface Product {
  id?: number;
  creator_id?: number;
  editor_id?: number;
  image: File | string;
  name: string;
  price: number;
  stock: number;
}
