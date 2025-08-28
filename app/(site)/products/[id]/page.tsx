import ProductDetails from "@/components/products/ProductDetails";
import { Product } from "@/models/products";
import { cache } from "react";

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const getProduct = cache(async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  const product = await (res.json() as Promise<Product>);

  return product;
});

export async function generateMetadata({ params }: ProductDetailsProps) {
  const product = await getProduct((await params).id);

  return {
    title: product.name,
  };
}

export async function generateStaticParams() {
  return [];
}

const ProductDetailsPage = async (props: ProductDetailsProps) => {
  const { id } = await props.params;
  const product = await getProduct(id);

  return <ProductDetails {...product} />;
};

export default ProductDetailsPage;
