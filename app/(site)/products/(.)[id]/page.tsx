import ProductDetailsModal from "@/components/products/ProductDetailsModal";
import { Product } from "@/models/products";
import { cache } from "react";
import { generateMetadata } from "../[id]/page";

const getProduct = cache(async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  const product = await (res.json() as Promise<Product>);

  return product;
});

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export { generateMetadata };

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;
  const product = await getProduct(id);

  return <ProductDetailsModal {...product} />;
};

export default ProductDetailsPage;
