import fetcher from "@/lib/fetcher";
import { User, UserList } from "@/models/users";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminUsers = (page = 1) => {
  console.log("Call useGetAdminUsers");
  return useQuery({
    queryKey: ["admin", "users", { page }],
    queryFn: async () => {
      console.log("Call useGetAdminUsers useQuery");
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/users?page=${page}`;
      const res = await fetcher(url);

      const list = (await res.json()) as UserList;
      return list;
    },
  });
};

export const useGetAdminUser = (id: number) => {
  return useQuery({
    queryKey: ["admin", "users", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`;
      const res = await fetcher(url);

      const user = (await res.json()) as User;
      return user;
    },
  });
};
