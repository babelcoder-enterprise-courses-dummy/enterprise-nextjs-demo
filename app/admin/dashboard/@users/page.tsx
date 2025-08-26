"use client";

import Placeholder from "@/components/shared/Placeholder";
import LatestUserList from "@/components/users/admin/LatestUserList";
import { useGetAdminUsers } from "@/hooks/queries/admin/users";

const UserListPage = () => {
  const { data: list } = useGetAdminUsers();

  if (!list) return <Placeholder />;
  return <LatestUserList items={list.items} />;
};

export default UserListPage;
