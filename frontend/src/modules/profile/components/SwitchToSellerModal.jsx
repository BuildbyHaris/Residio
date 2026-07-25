import { X, Briefcase, ShieldCheck } from "lucide-react";

function SwitchToSellerModal({ open, onClose, onConfirmSwitch }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative bg-white rounded-2xl p-6 w-[380px] shadow-xl z-10 mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 text-center mt-2">
          Switch to Seller Account
        </h3>

        {/* Subtext */}
        <p className="text-gray-500 text-sm text-center mt-2 mb-6">
          You'll be able to list properties, manage bookings, and track earnings
        </p>

        {/* Two-step indicator */}
        <div className="flex items-start justify-center gap-4 mb-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center w-36">
            <div className="relative mb-3">
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F5732C] text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10">
                1
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#FDEDE3] flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#F5732C]" />
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-900">Business Details</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Tell us about you and your business
            </p>
          </div>

          {/* Dashed connector */}
          <div className="flex items-center pt-6">
            <div className="w-12 border-t-2 border-dashed border-gray-300" />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center w-36">
            <div className="relative mb-3">
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F5732C] text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10">
                2
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#FDEDE3] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#F5732C]" />
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-900">Property Verification</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Verify your property and documents
            </p>
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={onConfirmSwitch}
          className="w-full bg-[#F5732C] text-white rounded-xl py-3 font-semibold text-sm hover:bg-[#e5622a] transition-colors"
        >
          Continue as Seller
        </button>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full text-center text-gray-500 text-sm mt-3 hover:text-gray-700 transition-colors py-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SwitchToSellerModal;