export interface Product {
  id?: number | string;
  creator_id?: number;
  editor_id?: number;
  image: File | string;
  name: string;
  price: number;
  stock: number;
}
