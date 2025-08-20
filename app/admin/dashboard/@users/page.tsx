import LatestUserList from "@/components/users/admin/LatestUserList";
import { UserList } from "@/models/users";

const UserListPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users?limit=10`,
  );
  const { items: users } = await (res.json() as Promise<UserList>);

  return <LatestUserList items={users} />;
};

export default UserListPage;
