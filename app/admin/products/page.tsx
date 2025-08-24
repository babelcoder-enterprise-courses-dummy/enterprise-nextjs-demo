"use client";

import ProductList from "@/components/products/admin/ProductList";
import { Paging } from "@/models/pagination";
import * as types from "@/models/products";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ProductListWithFetch = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [list, setList] = useState<types.ProductList>({
    items: [],
    paging: {} as Paging,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/products?page=${page}`;
      const res = await fetch(url);
      const list = (await res.json()) as types.ProductList;
      setList(list);
    };

    fetchProducts();
  }, [page]);

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
