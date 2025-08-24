import { Product } from "@/models/products";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const ProductDetails = ({ image, name, price }: Product) => {
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
          <Button variant="secondary" size="icon" className="size-8">
            <Plus />
          </Button>
          <span>10</span>
          <Button variant="secondary" size="icon" className="size-8">
            <Minus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
