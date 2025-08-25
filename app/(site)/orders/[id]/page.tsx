"use client";

import OrderDetails from "@/components/orders/OrderDetails";
import Placeholder from "@/components/shared/Placeholder";
import { useGetOrder } from "@/hooks/queries/orders";
import { NotFoundError } from "@/lib/not-found-error";
import { notFound, useParams } from "next/navigation";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isError, error } = useGetOrder(Number(id));

  if (isError && error instanceof NotFoundError) return notFound();
  if (order) return <OrderDetails {...order} />;
  return <Placeholder />;
};

export default OrderDetailsPage;
