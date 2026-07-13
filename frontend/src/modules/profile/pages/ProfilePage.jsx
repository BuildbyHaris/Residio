import { useState } from "react";

import { useProfile } from "../hooks/useProfile";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProfileHeroCard from "../components/ProfileHeroCard";
import StatsGrid from "../components/StatsGrid";
import PropertyPromoBanner from "../components/PropertyPromoBanner";
import SwitchToSellerModal from "../components/SwitchToSellerModal";
import EditProfileModal from "../components/EditProfileModal";
import ProfileSkeleton from "../components/ProfileSkeleton";
import {
  BUYER_STATS,
  OWNER_STATS,
} from "../constants/stats";


function ProfilePage() {
  // Local UI State
  const [activeItem, setActiveItem] = useState("profile");

  // Profile Feature Hook
  const {
    user,
    loading,
    error,
    saveProfile,

    isEditModalOpen,
    isSwitchModalOpen,

    openEditModal,
    closeEditModal,

    openSwitchModal,
    closeSwitchModal,
  } = useProfile();

  // Loading State
  if (loading) {
    return <ProfileSkeleton />;
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FEF7F2]">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">
            Failed to load profile
          </h2>

          <p className="mt-2 text-gray-600">
            {error}
          </p>
        </div>
      </div>
    );
  }

  // Stats according to account type
  const stats =
  user.ownerStatus === "owner"
    ? OWNER_STATS
    : BUYER_STATS;

  return (
    <div className="min-h-screen bg-[#FEF7F2]">
      <Navbar user={user} />

      <div className="mx-auto flex max-w-[1400px] gap-8 px-8 py-8">
        {/* Sidebar */}
        <Sidebar
          activeItem={activeItem}
          onSelect={setActiveItem}
          accountType={user.ownerStatus}
          onSwitchToSeller={openSwitchModal}
        />

        {/* Main Content */}
        <main className="flex min-w-0 flex-1 flex-col gap-8">
          <ProfileHeroCard
            user={user}
            onEditProfile={openEditModal}
            onSwitchToSeller={openSwitchModal}
          />

          <StatsGrid stats={stats} />

          {user.ownerStatus === "buyer" && (
            <PropertyPromoBanner
              onSwitchToSeller={openSwitchModal}
            />
          )}
        </main>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        user={user}
        onSave={saveProfile}
      />

      {/* Switch Account Modal */}
      <SwitchToSellerModal
        open={isSwitchModalOpen}
        onClose={closeSwitchModal}
        onConfirmSwitch={() => {
          console.log(
            "Switch Account feature coming soon..."
          );
          closeSwitchModal();
        }}
      />
    </div>
  );
}

export default ProfilePage;