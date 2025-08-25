"use client";

import { useGetProfile } from "@/hooks/queries/auth";
import { User } from "@/models/users";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "sonner";
import Placeholder from "./Placeholder";

interface ProtectedRouteProps extends PropsWithChildren {
  role?: User["role"];
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isLoading, isError, data: profile } = useGetProfile();

  useEffect(() => {
    if (isError) return router.replace("/auth/login");
    if (profile && role && profile.role !== role) {
      toast.error("You are not authorized to access this page!", {
        position: "top-center",
      });
      return router.replace("/");
    }
    if (profile) setIsAuthenticated(true);
  }, [isError, profile, role, router]);

  if (isLoading) return <Placeholder />;
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
