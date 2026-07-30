import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import OwnerLayout from "../components/layout/OwnerLayout";
import HostelForm from "../components/hostel/HostelForm";
import { createHostelApi } from "../api/hostel.api";

const AddProperty = () => {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const handleHostelSubmit = async (formDataPayload) => {
    try {
      setSubmitting(true);

      await createHostelApi(formDataPayload);

      toast.success("Hostel created successfully!");

      navigate("/owner-dashboard/properties");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create hostel"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Property
          </h2>

          <p className="text-gray-500 mt-1">
            Fill in the details below to create a new hostel listing.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <HostelForm
            onSubmit={handleHostelSubmit}
            submitting={submitting}
            initialData={null}
            onClose={() => navigate("/owner-dashboard/properties")}
          />
        </div>
      </div>
    </OwnerLayout>
  );
};

export default AddProperty;