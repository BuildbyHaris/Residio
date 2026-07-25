import { RefreshCw } from "lucide-react";

function SwitchAccountCTA({ onSwitchToSeller }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onSwitchToSeller}
        className="flex items-center gap-2.5 border-2 border-[#F5732C] text-[#F5732C] bg-white rounded-xl px-5 py-3 font-semibold text-sm hover:bg-[#FDEDE3] transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Switch to Seller Account
      </button>
      <p className="text-gray-500 text-sm">
        List your property and start earning
      </p>
    </div>
  );
}

export default SwitchAccountCTA;