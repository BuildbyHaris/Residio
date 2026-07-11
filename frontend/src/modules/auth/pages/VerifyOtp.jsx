import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiShield,
  FiHeadphones,
  FiStar,
} from "react-icons/fi";

import VerifyOtpForm from "../components/VerifyOtpForm";

// Image on the side of content (people/hostel image)
const SIDE_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80";

const features = [
  {
    icon: <FiHome size={20} />,
    title: "Verified Hostels",
    desc: "All properties are verified for your safety and comfort.",
  },
  {
    icon: <FiSearch size={20} />,
    title: "Easy Search & Filter",
    desc: "Find the perfect place with smart filters and map search.",
  },
  {
    icon: <FiShield size={20} />,
    title: "Secure Bookings",
    desc: "Hassle-free booking with secure payments.",
  },
  {
    icon: <FiHeadphones size={20} />,
    title: "24/7 Support",
    desc: "We're here to help you, anytime you need.",
  },
];

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!location.state?.email) {
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  if (!location.state?.email) return null;

  return (
    <div className="min-h-screen w-full bg-[#fdf6ee] p-3 md:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-[1450px] bg-white rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* ============ LEFT PANEL - CONTENT + SIDE IMAGE ============ */}
        <div className="relative min-h-[700px] lg:min-h-[900px] bg-[#fdf6ee] overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-1/3 w-[400px] h-[400px] rounded-full bg-[#a8c5e8] opacity-40 blur-3xl -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-[#ec6a52] opacity-15 blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

          {/* Side Image — positioned on the RIGHT side of the left panel */}
          <div className="absolute top-0 right-0 h-full w-[55%] pointer-events-none">
            <img
              src={SIDE_IMAGE}
              alt="Residio hostel and happy students"
              className="h-full w-full object-cover object-center"
            />
            {/* Soft fade from cream on the left edge → transparent, so text blends nicely */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fdf6ee] via-[#fdf6ee]/40 to-transparent" />
          </div>

          {/* Content Wrapper — sits ABOVE the image on the left side */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
            {/* TOP: Logo + Heading + Features */}
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3 mb-10">
                <div className="w-11 h-11 bg-[#ec6a52] rounded-xl flex items-center justify-center shadow-lg rotate-[-8deg]">
                  <FiHome className="text-white" size={22} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Residio
                </h1>
              </div>

              {/* Hero Heading */}
              <div className="mb-8 max-w-md">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] mb-4">
                  Find. Book. Live.
                  <br />
                  Your <span className="text-[#ec6a52]">Perfect Stay.</span>
                </h2>
                <p className="text-gray-700 text-base leading-relaxed">
                  Residio connects students and travelers
                  <br />
                  with verified hostels & PGs across the city.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 max-w-sm">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white shadow-md flex items-center justify-center text-[#ec6a52] flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-0.5 text-[15px]">
                        {feature.title}
                      </h3>
                      <p className="text-[13px] text-gray-700 leading-snug">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM: Testimonial Card */}
            <div className="mt-10 bg-white rounded-2xl shadow-2xl p-5 max-w-sm">
              <div className="flex gap-2">
                <span className="text-4xl text-[#ec6a52] leading-none font-serif -mt-2">
                  "
                </span>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-semibold mb-2 leading-snug">
                    Residio made finding my perfect hostel so easy and
                    stress-free!"
                  </p>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="text-[#ec6a52] fill-[#ec6a52]"
                        size={14}
                      />
                    ))}
                    <FiStar className="text-[#ec6a52]" size={14} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      – Ayesha, Student
                    </span>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ec6a52] to-[#f9a48b] flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md">
                      A
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ RIGHT PANEL - OTP VERIFICATION FORM ============ */}
        <div className="relative bg-white p-8 md:p-12 lg:p-16 flex items-center justify-center">
          <VerifyOtpForm />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;