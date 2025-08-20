import Link from "next/link";
import { ReactNode } from "react";

interface AdminDashboardProducts {
  children: ReactNode;
}

const AdminDashboardProducts = ({ children }: AdminDashboardProducts) => {
  return (
    <div>
      <header>
        <Link href="/admin/dashboard/summary">Summary</Link>
      </header>
      {children}
    </div>
  );
};

export default AdminDashboardProducts;
