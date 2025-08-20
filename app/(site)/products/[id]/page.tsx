import ProductDetails from "@/components/products/ProductDetails";
import { Product } from "@/models/products";

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return [];
}

const ProductDetailsPage = async (props: ProductDetailsProps) => {
  const { id } = await props.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  const product = await (res.json() as Promise<Product>);

  return <ProductDetails {...product} />;
};

export default ProductDetailsPage;
