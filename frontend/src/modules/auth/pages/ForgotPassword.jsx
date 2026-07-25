import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaShieldAlt, FaHeadset } from "react-icons/fa";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen w-full bg-[#fdf6ee] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        {/* LEFT SIDE - Marketing / Branding */}
        <div className="relative bg-[#fdf6ee] p-8 md:p-12 flex flex-col overflow-hidden">
          {/* Decorative blob */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#c8d5f0] opacity-40 blur-3xl pointer-events-none -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#ec6a52] opacity-20 blur-3xl pointer-events-none translate-y-16 -translate-x-16" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-lg bg-[#ec6a52] flex items-center justify-center">
              <FaHome className="text-white" size={20} />
            </div>
            <h1 className="text-3xl font-bold text-[#1e293b] tracking-tight">
              Residio
            </h1>
          </div>

          {/* Heading */}
          <div className="relative z-10 mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight tracking-tight">
              Find. Book. Live.
              <br />
              Your <span className="text-[#ec6a52]">Perfect Stay.</span>
            </h2>
            <p className="text-gray-600 mt-4 text-[15px] leading-relaxed max-w-md">
              Residio connects students and travelers with verified hostels &
              PGs across the city.
            </p>
          </div>

          {/* Features */}
          <div className="relative z-10 space-y-5 mb-8">
            <Feature
              icon={<FaHome className="text-[#ec6a52]" size={18} />}
              title="Verified Hostels"
              desc="All properties are verified for your safety and comfort."
            />
            <Feature
              icon={<FaSearch className="text-[#ec6a52]" size={18} />}
              title="Easy Search & Filter"
              desc="Find the perfect place with smart filters and map search."
            />
            <Feature
              icon={<FaShieldAlt className="text-[#ec6a52]" size={18} />}
              title="Secure Bookings"
              desc="Hassle-free booking with secure payments."
            />
            <Feature
              icon={<FaHeadset className="text-[#ec6a52]" size={18} />}
              title="24/7 Support"
              desc="We're here to help you, anytime you need."
            />
          </div>

          {/* Testimonial */}
          <div className="relative z-10 mt-auto bg-white rounded-2xl p-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] max-w-sm">
            <p className="text-gray-700 text-[14px] italic leading-relaxed">
              <span className="text-[#ec6a52] text-2xl leading-none">"</span>
              Residio made finding my perfect hostel so easy and stress-free!
            </p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-[13px] font-medium text-gray-600">
                – Ayesha, Student
              </p>
              <div className="flex gap-0.5 text-[#ec6a52]">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Form */}
        <div className="flex items-center justify-center p-8 md:p-12 bg-white">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-[#1e293b] text-[15px] mb-0.5">{title}</h3>
      <p className="text-gray-500 text-[13px] leading-snug">{desc}</p>
    </div>
  </div>
);

export default ForgotPassword;