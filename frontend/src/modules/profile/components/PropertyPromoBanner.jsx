import { ArrowRight } from "lucide-react";

function PropertyPromoBanner({ onSwitchToSeller }) {
  return (
    <div className="relative bg-gradient-to-r from-[#F5732C] to-[#FF8A4C] rounded-2xl p-10 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left: Illustration */}
        <div className="flex-shrink-0 w-40 h-32 md:w-48 md:h-36 relative">
          <svg
            viewBox="0 0 200 160"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* House body */}
            <rect x="50" y="60" width="80" height="70" rx="4" fill="white" fillOpacity="0.95" />
            {/* Roof */}
            <path d="M40 65L90 25L140 65" stroke="white" strokeWidth="4" fill="#FFD4B8" />
            {/* Door */}
            <rect x="80" y="90" width="20" height="40" rx="2" fill="#F5732C" />
            {/* Door knob */}
            <circle cx="96" cy="112" r="2" fill="white" />
            {/* Window left */}
            <rect x="58" y="75" width="16" height="16" rx="2" fill="#FDEDE3" stroke="#F5732C" strokeWidth="1.5" />
            <line x1="66" y1="75" x2="66" y2="91" stroke="#F5732C" strokeWidth="1" />
            <line x1="58" y1="83" x2="74" y2="83" stroke="#F5732C" strokeWidth="1" />
            {/* Window right */}
            <rect x="106" y="75" width="16" height="16" rx="2" fill="#FDEDE3" stroke="#F5732C" strokeWidth="1.5" />
            <line x1="114" y1="75" x2="114" y2="91" stroke="#F5732C" strokeWidth="1" />
            <line x1="106" y1="83" x2="122" y2="83" stroke="#F5732C" strokeWidth="1" />
            {/* Key */}
            <g transform="translate(130, 95) rotate(-30)">
              <rect x="0" y="0" width="40" height="6" rx="3" fill="#FFD700" />
              <circle cx="-4" cy="3" r="10" stroke="#FFD700" strokeWidth="4" fill="none" />
              <rect x="30" y="-2" width="3" height="10" rx="1" fill="#FFD700" />
              <rect x="36" y="-2" width="3" height="8" rx="1" fill="#FFD700" />
            </g>
            {/* Chimney */}
            <rect x="108" y="30" width="14" height="25" rx="2" fill="white" fillOpacity="0.9" />
          </svg>
        </div>

        {/* Right: Text + Button */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-white text-2xl font-bold mb-2">
            Have a property? Start earning with Residio
          </h2>
          <p className="text-white/90 text-sm mb-6">
            List your hostel or PG in minutes and reach thousands of students.
          </p>
          <button
            onClick={onSwitchToSeller}
            className="inline-flex items-center gap-2 bg-white text-[#F5732C] rounded-lg px-5 py-3 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Switch to Seller Account
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyPromoBanner;