import { UserList } from "@/models/users";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminUsers = (page = 1) => {
  return useQuery({
    queryKey: ["admin", "users", { page }],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/users?page=${page}`;
      const res = await fetch(url);
      const list = (await res.json()) as UserList;

      return list;
    },
  });
};
