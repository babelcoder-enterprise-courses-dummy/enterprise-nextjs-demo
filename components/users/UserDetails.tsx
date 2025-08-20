import { User } from "@/models/users";

const UserDetails = ({ name, email }: User) => {
  return (
    <div>
      {name} - {email}
    </div>
  );
};

export default UserDetails;
