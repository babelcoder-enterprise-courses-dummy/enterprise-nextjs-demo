import AppMenuBar from "@/components/shared/AppMenubar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex">
      <div className="flex-1">
        <header className="w-full border-b">
          <div className="container mx-auto flex h-16">
            <AppMenuBar />
          </div>
        </header>
        <div className="container mx-auto my-4">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
