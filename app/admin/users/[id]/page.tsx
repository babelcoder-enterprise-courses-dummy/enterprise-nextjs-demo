"use client";

import UserDetails from "@/components/users/UserDetails";
import { useGetAdminUser } from "@/hooks/queries/admin/users";
import { useParams } from "next/navigation";

interface Params {
  id: string;
  [x: string]: string;
}

const UserDetailsPage = () => {
  const { id } = useParams<Params>();
  const { data: user } = useGetAdminUser(Number(id));

  if (!user) return <div>Loading...</div>;
  return <UserDetails {...user} />;
};

export default UserDetailsPage;
