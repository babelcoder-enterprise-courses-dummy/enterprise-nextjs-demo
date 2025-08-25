"use client";

import { useCreateOrder } from "@/hooks/queries/orders";
import useCart from "@/stores/cart";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import ProductDetails from "../products/ProductDetails";
import { Button } from "../ui/button";

const Cart = () => {
  const [itemsState, totalPrice, clearCart] = useCart(
    useShallow((state) => [
      state.items,
      state.getTotalPrice(),
      state.clearCart,
    ]),
  );
  const items = Object.values(itemsState);
  const { mutateAsync: createOrder } = useCreateOrder();

  const checkout = async () => {
    const order = await createOrder({ items });
    clearCart();
    toast.success("Event has been created.", { position: "top-center" });
    redirect(`/orders/${order.id}`);
  };

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
        <Button onClick={() => checkout()}>Checkout</Button>
      </div>
    </>
  );
};

export default Cart;
