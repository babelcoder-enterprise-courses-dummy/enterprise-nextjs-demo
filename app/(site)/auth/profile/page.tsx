import ProfileForm from "@/components/auth/ProfileForm";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <ProfileForm />
    </ProtectedRoute>
  );
};

export default ProfilePage;
