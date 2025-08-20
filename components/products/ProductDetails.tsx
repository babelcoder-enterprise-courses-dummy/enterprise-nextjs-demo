import { Product } from "@/models/products";
import Image from "next/image";

const ProductDetails = ({ image, name, price }: Product) => {
  return (
    <dl>
      <dd className="w-[300px] h-[300px] object-cover rounded-lg relative">
        <Image src={image} alt={name} fill />
      </dd>
      <dt>Name</dt>
      <dd>{name}</dd>
      <dt>Price</dt>
      <dd>{price}</dd>
      <dt>Image</dt>
    </dl>
  );
};

export default ProductDetails;
