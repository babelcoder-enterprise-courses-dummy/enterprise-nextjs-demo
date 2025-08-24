import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface AdminDashboardProducts {
  children: ReactNode;
}

const AdminDashboardProducts = ({ children }: AdminDashboardProducts) => {
  return (
    <div>
      <header>
        <Button variant="ghost" asChild>
          <Link href="/admin/dashboard/summary">Summary</Link>
        </Button>
      </header>
      {children}
    </div>
  );
};

export default AdminDashboardProducts;
