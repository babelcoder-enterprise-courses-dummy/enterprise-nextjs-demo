import Cart from "@/components/cart/Cart";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

const CartPage = () => {
  return (
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  );
};

export default CartPage;
