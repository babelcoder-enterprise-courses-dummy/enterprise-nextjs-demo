import ProductList from "@/components/products/ProductList";
import { getProductsOptions } from "@/hooks/queries/products";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
};

interface ProductListPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const ProductListPage = async (params: ProductListPageProps) => {
  const queryClient = getQueryClient();
  const searchParams = await params.searchParams;
  const page = Number(searchParams.page || "1");
  void queryClient.prefetchQuery(getProductsOptions(page));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList page={page}></ProductList>
    </HydrationBoundary>
  );
};

export default ProductListPage;
