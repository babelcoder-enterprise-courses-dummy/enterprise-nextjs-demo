"use client";

import Placeholder from "@/components/shared/Placeholder";
import UserList from "@/components/users/admin/UserList";
import { useGetAdminUsers } from "@/hooks/queries/admin/users";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const UserListWithFetch = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { data: list } = useGetAdminUsers(Number(page));

  if (!list) return <Placeholder />;
  return <UserList {...list} />;
};

const UserListPage = () => {
  return (
    <Suspense>
      <UserListWithFetch></UserListWithFetch>
    </Suspense>
  );
};

export default UserListPage;
