import { Paging } from "./pagination";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface ProductList {
  items: Product[];
  paging: Paging;
}
