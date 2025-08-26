import fetcher from "@/lib/fetcher";
import { Product, ProductList } from "@/models/products";
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
      const res = await fetcher(url);
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

export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
      const res = await fetcher(url);
      const product = (await res.json()) as Product;

      return product;
    },
  });
};
