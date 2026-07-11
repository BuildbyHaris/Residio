import { useAuth } from "../../../hooks/useAuth";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <span className="font-medium">
        {user?.name}
      </span>

      <button
        onClick={logout}
        className="text-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;