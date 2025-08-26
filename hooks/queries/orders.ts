import fetcher from "@/lib/fetcher";
import { Order } from "@/models/orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOrder = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`;
      const res = await fetcher(url);

      const order = (await res.json()) as Order;
      return order;
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: Pick<Order, "items">) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/orders`;
      const res = await fetcher(url, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const createdOrder = (await res.json()) as Order;
      return createdOrder;
    },
    onSuccess(order) {
      queryClient.setQueryData(["order", order.id], () => order);
    },
    onSettled: (order) => {
      queryClient.invalidateQueries({ queryKey: ["order", order?.id] });
    },
  });
};
