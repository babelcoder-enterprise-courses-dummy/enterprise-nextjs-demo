import LatestProductList from "@/components/products/admin/LatestProductList";
import { ProductList } from "@/models/products";

const ProductListPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=10`,
  );
  const { items } = await (res.json() as Promise<ProductList>);

  return <LatestProductList items={items} />;
};

export default ProductListPage;
