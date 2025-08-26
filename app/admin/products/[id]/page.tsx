"use client";

import ProductDetails from "@/components/products/ProductDetails";
import { useGetProduct } from "@/hooks/queries/products";
import { useParams } from "next/navigation";

interface Params {
  id: string;
  [x: string]: string;
}

const ProductDetailsPage = () => {
  const { id } = useParams<Params>();
  const { data: product } = useGetProduct(Number(id));

  if (!product) return <div>Loading...</div>;
  return <ProductDetails {...product} />;
};

export default ProductDetailsPage;
