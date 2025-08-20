import { UserList } from "@/models/users";

const LatestUserList = ({ items: users }: Pick<UserList, "items">) => {
  return (
    <>
      <h2>Latest Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </>
  );
};

export default LatestUserList;
