import { ProductList } from "@/models/products";
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const getProductsOptions = (page = 1) =>
  queryOptions({
    queryKey: ["products", { page }],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}`;
      const res = await fetch(url);
      const list = (await res.json()) as ProductList;

      return list;
    },
  });

export const useGetProducts = (page = 1) => {
  return useQuery(getProductsOptions(page));
};

export const useGetSuspenseProducts = (page = 1) => {
  return useSuspenseQuery(getProductsOptions(page));
};
