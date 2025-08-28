import Cart from "@/components/cart/Cart";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Cart",
};

const CartPage = () => {
  return (
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  );
};

export default CartPage;
