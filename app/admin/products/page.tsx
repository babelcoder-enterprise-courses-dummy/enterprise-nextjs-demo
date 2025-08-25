"use client";

import ProductList from "@/components/products/admin/ProductList";
import Placeholder from "@/components/shared/Placeholder";
import { useGetAdminProducts } from "@/hooks/queries/admin/products";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ProductListWithFetch = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data: list } = useGetAdminProducts(Number(page));

  if (!list) return <Placeholder />;
  return <ProductList {...list} />;
};

const ProductListPage = () => {
  return (
    <Suspense>
      <ProductListWithFetch></ProductListWithFetch>
    </Suspense>
  );
};

export default ProductListPage;
