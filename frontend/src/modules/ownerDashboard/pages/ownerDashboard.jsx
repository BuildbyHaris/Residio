import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ROUTES } from "../../../routes/paths.js";
import Navbar from "../../landing/components/Navbar";
import OwnerSidebar from "../components/layout/OwnerSidebar";
import OwnerProfileHeader from "../components/layout/OwnerProfileHeader";
import OwnerStatsCards from "../components/layout/OwnerStatsCards";
import HostelTable from "../components/hostel/HostelTable";
import HostelDetailsModal from "../components/hostel/HostelDetailsModal";
import HostelForm from "../components/hostel/HostelForm";
import {
  createHostelApi,
  getMyHostelsApi,
  updateHostelApi,
  deleteHostelApi,
} from "../api/hostel.api";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // Improvement: Delete loading state

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHostel, setEditingHostel] = useState(null);
  const [viewingHostel, setViewingHostel] = useState(null);
  const [hostelToDelete, setHostelToDelete] = useState(null); // Custom popup state
  

  // ---------- Fetch owner's hostels ----------
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

  // ---------- Create or Update submit ----------
  const handleHostelSubmit = async (formDataPayload) => {
    try {
      setSubmitting(true);

      if (editingHostel) {
        const res = await updateHostelApi(editingHostel._id, formDataPayload);
        toast.success("Hostel updated successfully!");
        setHostels((prev) =>
          prev.map((h) => (h._id === editingHostel._id ? res.data.data : h))
        );
      } else {
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
 const handleAddProperty = () => {
  navigate(ROUTES.ADD_PROPERTY);
};
  const handleEdit = (hostel) => {
    setEditingHostel(hostel);
    setIsFormOpen(true);
  };
  
  // Modern Popup Trigger
  const handleDeleteClick = (hostelId) => {
    setHostelToDelete(hostelId);
  };

  // Actual Async Delete Action
  const handleConfirmDelete = async () => {
    if (!hostelToDelete) return;

    try {
      setIsDeleting(true);
      await deleteHostelApi(hostelToDelete);
      toast.success("Hostel deleted successfully");
      setHostels((prev) => prev.filter((h) => h._id !== hostelToDelete));
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete hostel";
      toast.error(message);
      console.error("Delete Hostel Error:", error);
    } finally {
      setIsDeleting(false);
      setHostelToDelete(null);
    }
  };

  // ---------- Toggle Active/Inactive from table switch ----------
  const handleToggleStatus = async (hostel) => {
    const newStatus = hostel.status === "Active" ? "Inactive" : "Active";
    try {
      const form = new FormData();
      form.append("status", newStatus);

      const res = await updateHostelApi(hostel._id, form);
      setHostels((prev) =>
        prev.map((h) => (h._id === hostel._id ? res.data.data : h))
      );
      toast.success(`Hostel marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Toggle Status Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <OwnerSidebar onAddProperty={handleAddProperty} />

        <main className="flex-1 p-6 space-y-6 bg-orange-50/30">
          <OwnerProfileHeader onAddProperty={handleAddProperty} />

          <OwnerStatsCards hostels={hostels} />

          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Dashboard Overview
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your hostels, bookings and earnings from here.
            </p>
          </div>
        </main>
      </div>

      {/* Modern Custom Delete Modal */}
      {hostelToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full mx-4 border border-gray-100 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete Property?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete this hostel? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setHostelToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {isFormOpen && (
        <HostelForm
          onClose={closeForm}
          onSubmit={handleHostelSubmit}
          submitting={submitting}
          initialData={editingHostel}
        />
      )}

      {viewingHostel && (
        <HostelDetailsModal
          hostel={viewingHostel}
          onClose={() => setViewingHostel(null)}
        />
      )}
    </div>
  );
};

export default OwnerDashboard;
