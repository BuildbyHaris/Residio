import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaShieldAlt, FaHeadset } from "react-icons/fa";
// import heroImage from "../assets/hero-students.jpg"; // 👈 Add your image here

const Register = () => {
  return (
    <div className="min-h-screen w-full bg-[#fdf6ee] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative">

        {/* ================= LEFT PANEL ================= */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#fdf6ee] via-[#fdeee4] to-[#fce4d6] min-h-[700px]">

          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              // src={heroImage}
              alt="Happy students at Residio"
              className="w-full h-full object-cover object-center opacity-90"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fdf6ee] via-[#fdf6ee]/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdf6ee] via-transparent to-transparent" />
          </div>

          {/* Decorative blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#ec6a52]/30 blur-3xl pointer-events-none z-10" />
          <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-blue-200/40 blur-2xl pointer-events-none z-10" />
          <div className="absolute -bottom-20 -left-16 w-60 h-60 rounded-full bg-[#ec6a52]/20 blur-3xl pointer-events-none z-10" />

          {/* Dashed decorative curve */}
          <svg
            className="absolute top-16 right-16 w-32 h-40 opacity-50 pointer-events-none z-10"
            viewBox="0 0 100 120"
            fill="none"
          >
            <path
              d="M10 10 Q 80 30, 40 60 T 70 110"
              stroke="#ec6a52"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />
          </svg>

          {/* Content Layer */}
          <div className="relative z-20 p-8 md:p-12 flex flex-col justify-between h-full">

            {/* Logo */}
            <Link
              to="/"
              className="mb-6 flex items-center gap-2"
              aria-label="Go to Residio home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ec6a52] shadow-md">
                <FaHome className="text-white" size={20} />
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                Residio
              </h1>
            </Link>

            {/* Headline */}
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Find. Book. Live. <br />
                Your <span className="text-[#ec6a52]">Perfect Stay.</span>
              </h2>
              <p className="text-gray-700 text-sm md:text-base max-w-md mb-8">
                Residio connects students and travelers with verified hostels & PGs across the city.
              </p>

              {/* Features list */}
              <div className="space-y-4 max-w-md">
                <FeatureItem
                  icon={<FaHome size={18} />}
                  title="Verified Hostels"
                  desc="All properties are verified for your safety and comfort."
                />
                <FeatureItem
                  icon={<FaSearch size={18} />}
                  title="Easy Search & Filter"
                  desc="Find the perfect place with smart filters and map search."
                />
                <FeatureItem
                  icon={<FaShieldAlt size={18} />}
                  title="Secure Bookings"
                  desc="Hassle-free booking with secure payments."
                />
                <FeatureItem
                  icon={<FaHeadset size={18} />}
                  title="24/7 Support"
                  desc="We're here to help you, anytime you need."
                />
              </div>
            </div>

            {/* Testimonial card */}
            <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-5 max-w-sm">
              <div className="flex items-start gap-3">
                <span className="text-4xl text-[#ec6a52] leading-none font-serif -mt-1">
                  "
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    Residio made finding my perfect hostel so easy and stress-free!
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <div className="flex text-[#ec6a52] text-sm mb-1">
                        ★★★★★
                      </div>
                      <p className="text-xs text-gray-500">– Ayesha, Student</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ec6a52] to-[#f8a58c] flex items-center justify-center text-white font-bold text-sm shadow-md">
                      A
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (FORM) ================= */}
        <div className="p-6 md:p-10 flex items-center justify-center overflow-y-auto bg-white">
          <div className="w-full max-w-lg">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

/* Feature list item */
const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-xl bg-[#ec6a52]/20 backdrop-blur-sm text-[#ec6a52] flex items-center justify-center flex-shrink-0 shadow-sm">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-gray-900">{title}</h4>
      <p className="text-xs text-gray-700 leading-snug">{desc}</p>
    </div>
  </div>
);

export default Register;