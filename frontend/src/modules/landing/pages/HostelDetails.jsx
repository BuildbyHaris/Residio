import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getHostelByIdApi } from "../api/hostel.api";
import { hostelDetailsDummy } from "../data/hostelDetailsDummy";
import { useAuth } from "../../../hooks/useAuth";

import OwnerCard from "../components/OwnerCard";
import HostelGallery from "../components/HostelGallery";
import HostelInfo from "../components/HostelInfo";
import AmenitiesSection from "../components/AmenitiesSection";
import RoomTypesTable from "../components/RoomTypesTable";
import AboutHostel from "../components/AboutHostel";
import HouseRulesAndLocation from "../components/HouseRulesAndLocation";
import ReviewsSection from "../components/ReviewsSection";
import StickySidebar from "../components/StickySidebar";

export default function HostelDetails() {
  const { hostelId } = useParams();
  const { user: currentUser } = useAuth();

  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setSelectedRoomType("");

    const fetchHostel = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getHostelByIdApi(hostelId);

        if (isMounted) {
          setHostel(res.data.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message || "Failed to load hostel details"
          );

          // Temporary fallback
          setHostel(hostelDetailsDummy);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (hostelId) {
      fetchHostel();
    }

    return () => {
      isMounted = false;
    };
  }, [hostelId]);

  console.log("Hostel ID:", hostelId);
  console.log("Hostel:", hostel);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 pt-28 pb-8">
          <div className="h-64 rounded-xl bg-brand-peachLight animate-pulse" />
        </main>
      </>
    );
  }

  if (!hostel) {
    return (
      <>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 pt-28 pb-16 text-center text-ink-500">
          {error || "Hostel not found."}
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-6 pb-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-ink-500 mb-4">
          Home &gt; Hostels in {hostel.city} &gt; {hostel.name}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <HostelGallery
              images={hostel.images?.map((img) => img.url)}
              hostelName={hostel.name}
              verified={hostel.verified}
              totalPhotosCount={hostel.totalPhotosCount}
            />

            <HostelInfo hostel={hostel} />

            <AmenitiesSection amenities={hostel.amenities} />

            <RoomTypesTable
              roomTypes={hostel.roomTypes}
              selectedRoomType={selectedRoomType}
              onSelect={(room) => setSelectedRoomType(room.type)}
            />

            <AboutHostel description={hostel.description} />

            <HouseRulesAndLocation
              houseRules={hostel.houseRules}
              nearby={hostel.nearby}
            />

            <ReviewsSection reviews={hostel.reviews} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <StickySidebar
              hostel={hostel}
              currentUser={currentUser}
              selectedRoomType={selectedRoomType}
              setSelectedRoomType={setSelectedRoomType}
            />
            <OwnerCard owner={hostel.owner} />
          </div>
          
        </div>
      </main>
    </>
  );
}