import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import HostelForm from "../components/hostel/HostelForm";
import HostelCard from "../components/hostel/HostelCard";
import {
  createHostelApi,
  getMyHostelsApi,
  updateHostelApi,
  deleteHostelApi,
} from "../api/hostel.api";

const OwnerDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHostel, setEditingHostel] = useState(null); // null = Add mode
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchMyHostels = async () => {
    try {
      setLoading(true);
      const res = await getMyHostelsApi();
      setHostels(res.data.data);
    } catch (error) {
      toast.error("Failed to load your hostels");
      console.error("Fetch My Hostels Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyHostels();
  }, []);

  // ---------- Create or Update submit (same form handles both) ----------
  const handleHostelSubmit = async (formDataPayload) => {
    try {
      setSubmitting(true);

      if (editingHostel) {
        // Edit mode
        const res = await updateHostelApi(editingHostel._id, formDataPayload);
        toast.success("Hostel updated successfully!");
        setHostels((prev) =>
          prev.map((h) => (h._id === editingHostel._id ? res.data.data : h))
        );
      } else {
        // Create mode
        const res = await createHostelApi(formDataPayload);
        toast.success("Hostel created successfully!");
        setHostels((prev) => [res.data.data, ...prev]);
      }

      closeForm();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        `Failed to ${editingHostel ? "update" : "create"} hostel`;
      toast.error(message);
      console.error("Hostel Submit Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingHostel(null);
  };

  const handleEdit = (hostel) => {
    setEditingHostel(hostel);
    setIsFormOpen(true);
  };

  const handleDelete = async (hostelId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hostel? This cannot be undone."
    );
    if (!confirmed) return;

    try {
      await deleteHostelApi(hostelId);
      toast.success("Hostel deleted successfully");
      setHostels((prev) => prev.filter((h) => h._id !== hostelId));
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete hostel";
      toast.error(message);
      console.error("Delete Hostel Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Owner Dashboard
        </h1>

        <button
          onClick={() => {
            setEditingHostel(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          + Add Hostel
        </button>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          My Hostels
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading your hostels...</p>
        ) : hostels.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-400">
            No hostels added yet. Click "Add Hostel" to create your first
            listing.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hostels.map((hostel) => (
              <HostelCard
                key={hostel._id}
                hostel={hostel}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <HostelForm
          onClose={closeForm}
          onSubmit={handleHostelSubmit}
          submitting={submitting}
          initialData={editingHostel}
        />
      )}
    </div>
  );
};

export default OwnerDashboard;