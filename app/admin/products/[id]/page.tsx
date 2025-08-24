"use client";

import ProductDetails from "@/components/products/ProductDetails";
import { Product } from "@/models/products";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Params {
  id: string;
  [x: string]: string;
}

const ProductDetailsPage = () => {
  const { id } = useParams<Params>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${id}`;
      const res = await fetch(url);
      const product = (await res.json()) as Product;
      setProduct(product);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;
  return <ProductDetails {...product} />;
};

export default ProductDetailsPage;
