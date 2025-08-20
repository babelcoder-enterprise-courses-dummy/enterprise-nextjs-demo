import { Paging } from "./pagination";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
}

export interface UserList {
  items: User[];
  paging: Paging;
}
