"use client";

import { Product } from "@/models/products";
import useCart from "@/stores/cart";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useShallow } from "zustand/react/shallow";
import { Button } from "../ui/button";

const ProductDetails = (product: Product) => {
  const { id, name, image, price } = product;
  const [currentQuantity, updateQuantity, addItem, removeItem] = useCart(
    useShallow((state) => [
      state.getItemQuantity(id),
      state.updateQuantity,
      state.addItem,
      state.removeItem,
    ]),
  );

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="w-[150px] h-[150px] object-cover rounded-lg relative">
        <Image src={image} alt={name} fill />
      </div>
      <div className="flex flex-col flex-1">
        <h1 className="text-2xl font-bold">{name}</h1>
        <span className="text-lg text-gray-700">{price} THB</span>
        <div className="mt-auto flex items-center gap-2">
          <span className="mr-4">Quantity: </span>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={() =>
              currentQuantity === 0
                ? addItem(product)
                : updateQuantity(id, currentQuantity + 1)
            }
          >
            <Plus />
          </Button>
          <span>{currentQuantity}</span>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            disabled={currentQuantity < 1}
            onClick={() => {
              updateQuantity(id, currentQuantity - 1);
              if (currentQuantity === 1) removeItem(product.id);
            }}
          >
            <Minus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
