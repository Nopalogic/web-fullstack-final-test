export interface User {
  id?: number;
  name: string;
  username: string;
  password?: string;
  role: Role;
}

type Role = "cashier" | "admin";
