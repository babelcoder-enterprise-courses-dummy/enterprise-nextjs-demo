import { Product } from "./products";

export interface Order {
  id: number;
  userId: number;
  items: (Product & { quantity: number })[];
  totalPrice: number;
}
