import * as types from "@/models/users";
import DataList from "../../shared/admin/DataList";

const UserList = ({ items, paging }: types.UserList) => {
  return (
    <>
      <DataList columns={["name", "role"]} data={items} paging={paging} />
    </>
  );
};

export default UserList;
