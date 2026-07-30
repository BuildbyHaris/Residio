import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OwnerLayout from "../components/layout/OwnerLayout";
import HostelTable from "../components/hostel/HostelTable";
import {
  getMyHostelsApi,
  updateHostelApi,
  deleteHostelApi,
} from "../api/hostel.api";

import HostelForm from "../components/hostel/HostelForm";
import HostelDetailsModal from "../components/hostel/HostelDetailsModal";

const MyProperties = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [viewingHostel, setViewingHostel] = useState(null);
  const [editingHostel, setEditingHostel] = useState(null);

  const fetchHostels = async () => {
    try {
      setLoading(true);

      const res = await getMyHostelsApi();
      setHostels(res.data.data);
    } catch (error) {
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);
  const handleView = (hostel) => {
    setViewingHostel(hostel);
  };

  const handleEdit = (hostel) => {
    setEditingHostel(hostel);
  };

  const handleDelete = async (id) => {
    try {
      await deleteHostelApi(id);

      setHostels((prev) =>
        prev.filter((item) => item._id !== id)
      );

      toast.success("Property deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggleStatus = async (hostel) => {
    const form = new FormData();

    form.append(
      "status",
      hostel.status === "Active" ? "Inactive" : "Active"
    );

    try {
      const res = await updateHostelApi(hostel._id, form);

      setHostels((prev) =>
        prev.map((item) =>
          item._id === hostel._id ? res.data.data : item
        )
      );
    } catch {
      toast.error("Status update failed");
    }
  };

return (
  <>
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            My Properties
          </h2>

          <p className="mt-1 text-gray-500">
            Manage, edit and monitor all your hostel listings.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

                <p className="mt-4 text-gray-500">
                  Loading properties...
                </p>
              </div>
            </div>
          ) : hostels.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-3xl">🏠</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800">
                No Properties Found
              </h3>

              <p className="mt-2 text-gray-500">
                You haven't added any hostel listings yet.
              </p>
            </div>
          ) : (
            <HostelTable
              hostels={hostels}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          )}
        </div>
      </div>
    </OwnerLayout>

    {editingHostel && (
      <HostelForm
        initialData={editingHostel}
        submitting={submitting}
        onClose={() => setEditingHostel(null)}
        onSubmit={async (formData) => {
          try {
            setSubmitting(true);

            const res = await updateHostelApi(
              editingHostel._id,
              formData
            );

            setHostels((prev) =>
              prev.map((item) =>
                item._id === editingHostel._id
                  ? res.data.data
                  : item
              )
            );

            toast.success("Property updated");
            setEditingHostel(null);
          } catch {
            toast.error("Update failed");
          } finally {
            setSubmitting(false);
          }
        }}
      />
    )}

    {viewingHostel && (
      <HostelDetailsModal
        hostel={viewingHostel}
        onClose={() => setViewingHostel(null)}
      />
    )}
  </>
);
};
export default MyProperties;