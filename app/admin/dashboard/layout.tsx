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
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1">{products}</div>
      <div className="flex-1">{users}</div>
      {children}
    </div>
  );
};

export default DashboardLayout;
