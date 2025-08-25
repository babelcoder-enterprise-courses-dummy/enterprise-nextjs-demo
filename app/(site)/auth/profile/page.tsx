import ProfileForm from "@/components/auth/ProfileForm";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <ProfileForm />
    </ProtectedRoute>
  );
};

export default ProfilePage;
