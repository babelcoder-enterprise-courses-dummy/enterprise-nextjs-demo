import fetcher from "@/lib/fetcher";
import { ProductList } from "@/models/products";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminProducts = (page = 1) => {
  return useQuery({
    queryKey: ["admin", "products", { page }],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/products?page=${page}`;
      const res = await fetcher(url);

      const list = (await res.json()) as ProductList;
      return list;
    },
  });
};
