import ProductDetailsModal from "@/components/products/ProductDetailsModal";
import { Product } from "@/models/products";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  const product = await (res.json() as Promise<Product>);

  return <ProductDetailsModal {...product} />;
};

export default ProductDetailsPage;
