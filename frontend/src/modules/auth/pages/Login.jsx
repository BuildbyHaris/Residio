import LoginForm from "../components/LoginForm";
import { FaHome, FaSearch, FaShieldAlt, FaHeadset, FaStar, FaQuoteLeft } from "react-icons/fa";

const features = [
  {
    icon: <FaHome size={18} />,
    title: "Verified Hostels",
    desc: "All properties are verified for your safety and comfort.",
  },
  {
    icon: <FaSearch size={18} />,
    title: "Easy Search & Filter",
    desc: "Find the perfect place with smart filters and map search.",
  },
  {
    icon: <FaShieldAlt size={18} />,
    title: "Secure Bookings",
    desc: "Hassle-free booking with secure payments.",
  },
  {
    icon: <FaHeadset size={18} />,
    title: "24/7 Support",
    desc: "We're here to help you, anytime you need.",
  },
];

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-[#fdf6ee] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden grid lg:grid-cols-2 min-h-[700px]">
        
        {/* LEFT PANEL */}
        <div className="relative bg-gradient-to-br from-[#fdf6ee] via-[#fce8de] to-[#fdf6ee] p-8 md:p-12 flex flex-col overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#c9d5e8]/40 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#ec6a52]/15 blur-2xl pointer-events-none" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-[#ec6a52] flex items-center justify-center">
              <FaHome className="text-white" size={16} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Residio
            </h1>
          </div>

          {/* Headline */}
          <div className="relative z-10 mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Find. Book. Live.
              <br />
              Your <span className="text-[#ec6a52]">Perfect Stay.</span>
            </h2>
            <p className="mt-4 text-gray-600 text-[15px] leading-relaxed max-w-md">
              Residio connects students and travelers with verified hostels & PGs
              across the city.
            </p>
          </div>

          {/* Features */}
          <div className="relative z-10 space-y-4 mt-4">
            {features.map((f, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#ec6a52] flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-[15px]">
                    {f.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="relative z-10 mt-auto pt-8">
            <div className="bg-white rounded-2xl shadow-md p-5 max-w-sm">
              <FaQuoteLeft className="text-gray-300 mb-2" size={16} />
              <p className="text-sm font-medium text-gray-800 mb-3 leading-relaxed">
                Residio made finding my perfect hostel so easy and stress-free!
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-[#ec6a52]" size={12} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">– Ayesha, Student</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ec6a52] to-[#e35a41] flex items-center justify-center text-white text-sm font-semibold">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - FORM */}
        <div className="p-8 md:p-12 flex items-center justify-center bg-white">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;