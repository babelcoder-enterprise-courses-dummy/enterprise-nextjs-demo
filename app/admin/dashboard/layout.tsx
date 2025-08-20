import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  products: ReactNode;
  users: ReactNode;
}

const DashboardLayout = ({
  children,
  products,
  users,
}: DashboardLayoutProps) => {
  return (
    <div>
      {products}
      {users}
      {children}
    </div>
  );
};

export default DashboardLayout;
