import ProductList from "@/components/products/ProductList";
import * as types from "@/models/products";

interface ProductListPageProps {
  searchParams: Promise<{
    page?: number;
  }>;
}

const ProductListPage = async (params: ProductListPageProps) => {
  const searchParams = await params.searchParams;
  const page = searchParams.page || 1;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}`;

  const res = await fetch(url);
  const data = await (res.json() as Promise<types.ProductList>);

  return <ProductList {...data}></ProductList>;
};

export default ProductListPage;
