"use client";

import { Order } from "@/models/orders";
import ProductDetails from "../products/ProductDetails";

const OrderDetails = ({ items, totalPrice }: Order) => {
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
      <span className="font-bold text-2xl">{totalPrice} THB</span>
    </>
  );
};

export default OrderDetails;
