import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";
import Avatar from "../../../components/common/Avatar";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full px-2 py-2 transition hover:bg-orange-50"
      >
        <Avatar user={user} />

        <span className="font-medium">
          {user?.name}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl z-50">

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-3 transition hover:bg-gray-50"
          >
            <User size={18} />
            My Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-5 py-3 text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;