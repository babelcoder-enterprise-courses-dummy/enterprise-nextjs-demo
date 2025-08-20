import Pagination from "@/components/shared/Pagination";
import * as types from "@/models/users";
import Link from "next/link";

const UserList = ({ items, paging }: types.UserList) => {
  return (
    <>
      <ul>
        {items.map((user) => (
          <li key={user.id}>
            <Link href={`/admin/users/${user.id}`}>
              {user.name} - {user.email}
            </Link>
          </li>
        ))}
      </ul>
      <Pagination {...paging}></Pagination>
    </>
  );
};

export default UserList;
