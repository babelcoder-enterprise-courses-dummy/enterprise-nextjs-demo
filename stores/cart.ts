import { Product } from "@/models/products";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CartItem extends Product {
  quantity: number;
}

interface State {
  items: Record<number, CartItem>;
}

interface Actions {
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemQuantity: (id: number) => number;
  clearCart: () => void;
  checkout: () => void;
}

const useCart = create<State & Actions>()(
  immer((set, get) => ({
    items: {},
    addItem: (item) => {
      set((state) => {
        state.items[item.id] = {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: 1,
        };
      });
    },
    removeItem: (id) => {
      set((state) => {
        delete state.items[id];
      });
    },
    updateQuantity: (id, quantity) => {
      set((state) => {
        state.items[id].quantity = quantity;
      });
    },
    getTotalPrice: () => {
      const items = get().items;
      let total = 0;
      for (const item of Object.values(items)) {
        total += item.price * item.quantity;
      }
      return total;
    },
    getTotalItems: () => {
      return Object.keys(get().items).length;
    },
    getItemQuantity: (id) => {
      return get().items[id]?.quantity || 0;
    },
    clearCart: () => set({ items: {} }),
    checkout: () => set({ items: {} }),
  })),
);

export default useCart;
