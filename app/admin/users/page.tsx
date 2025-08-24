"use client";

import UserList from "@/components/users/admin/UserList";
import { Paging } from "@/models/pagination";
import * as types from "@/models/users";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const UserListWithFetch = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [list, setList] = useState<types.UserList>({
    items: [],
    paging: {} as Paging,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/users?page=${page}}`;
      const res = await fetch(url);
      const list = (await res.json()) as types.UserList;
      setList(list);
    };

    fetchUsers();
  }, [page]);

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
