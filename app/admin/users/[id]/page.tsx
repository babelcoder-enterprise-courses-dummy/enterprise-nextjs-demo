"use client";

import UserDetails from "@/components/users/UserDetails";
import { User } from "@/models/users";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Params {
  id: string;
  [x: string]: string;
}

const UserDetailsPage = () => {
  const { id } = useParams<Params>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`;
      const res = await fetch(url);
      const user = (await res.json()) as User;
      setUser(user);
    };

    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;
  return <UserDetails {...user} />;
};

export default UserDetailsPage;
