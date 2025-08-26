"use client";

import OrderDetails from "@/components/orders/OrderDetails";
import Placeholder from "@/components/shared/Placeholder";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useGetProfile } from "@/hooks/queries/auth";
import { useGetOrder } from "@/hooks/queries/orders";
import { NotFoundError } from "@/lib/errors/not-found-error";
import { notFound, redirect, useParams } from "next/navigation";

const InnerOrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isError, error } = useGetOrder(Number(id));
  const { data: profile } = useGetProfile();

  if (isError && error instanceof NotFoundError) return notFound();
  if (order && profile && order.userId !== profile.id) redirect("/");
  if (order && profile) return <OrderDetails {...order} />;
  return <Placeholder />;
};

const OrderDetailsPage = () => {
  return (
    <ProtectedRoute>
      <InnerOrderDetailsPage></InnerOrderDetailsPage>
    </ProtectedRoute>
  );
};

export default OrderDetailsPage;
