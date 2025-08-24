"use client";

import useCart from "@/stores/cart";
import { useShallow } from "zustand/react/shallow";
import ProductDetails from "../products/ProductDetails";
import { Button } from "../ui/button";

const Cart = () => {
  const [itemsState, totalPrice] = useCart(
    useShallow((state) => [state.items, state.getTotalPrice()]),
  );
  const items = Object.values(itemsState);

  return (
    <>
      <h1 className="text-center font-bold text-xl mb-4 pb-4 border-b">
        Your Cart Items
      </h1>
      {items.length === 0 && <span className="font-bold">Cart is empty</span>}
      <div className="space-y-4 mb-4 pb-4 border-b">
        {items.map((item) => (
          <ProductDetails key={item.id} {...item} />
        ))}
      </div>
      <div className="flex justify-between">
        <span className="font-bold text-2xl">{totalPrice} THB</span>
        <Button>Checkout</Button>
      </div>
    </>
  );
};

export default Cart;
