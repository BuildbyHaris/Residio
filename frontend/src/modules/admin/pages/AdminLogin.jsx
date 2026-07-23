import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdminLoginForm from '../components/AdminLoginForm';
import { loginAdmin } from '../services/admin.service';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { AuthContext } from '../../../context/AuthContext';
import { useAdminAuth } from "../../../context/AdminAuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleLogin = async (email, password) => {
    setLoading(true);
    setServerError('');

    const result = await loginAdmin(email, password);

    if (result.success) {
      toast.success('Welcome back, Admin! 🎉');

      setUser(result.data.admin);

      navigate('/admin/dashboard', { replace: true });
    } else {
      setServerError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* ─── Left Panel: Hero Image + Brand Info ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100/40 to-white">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#ec6a52]/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-orange-200/30 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-[#ec6a52] rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-[#1e293b] text-xl leading-none">Residio</h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Admin Portal</p>
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <h2 className="text-4xl xl:text-5xl font-bold text-[#1e293b] leading-tight">
              Manage.{' '}
              <span className="text-[#ec6a52]">Monitor.</span>{' '}
              <br />
              Grow.
            </h2>
            <p className="mt-4 text-gray-500 text-base leading-relaxed">
              Your powerful admin dashboard to manage hostels, verify owners,
              and keep the Residio platform running smoothly.
            </p>

            {/* Feature List */}
            <div className="mt-8 space-y-4">
              {[
                { icon: '🛡️', title: 'Owner Verification', desc: 'Review and manage owner applications' },
                { icon: '📊', title: 'Platform Analytics', desc: 'Track growth and monitor key metrics' },
                { icon: '🏠', title: 'Property Management', desc: 'Oversee all listed properties' },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{feature.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#1e293b]">{feature.title}</p>
                    <p className="text-xs text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Container */}
          <div className="relative mt-6 rounded-2xl overflow-hidden shadow-2xl shadow-orange-200/40 border border-white/60">
            {/* 
              ─── REPLACE THIS PLACEHOLDER WITH YOUR HERO IMAGE ───
              
              1. Save the third reference image as: src/assets/admin-hero.jpg
              2. Import it at the top: import adminHeroImage from '../../../assets/admin-hero.jpg';
              3. Replace the placeholder below with:
                 <img src={adminHeroImage} alt="Residio" className="w-full h-52 xl:h-64 object-cover" />
            */}
            <div className="w-full h-52 xl:h-64 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ec6a52]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-[#ec6a52]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-500">Residio Hero Image</p>
                <p className="text-xs text-gray-400 mt-1">Import from assets/admin-hero.jpg</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right Panel: Login Form ─── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md">
          {/* Mobile Brand */}
          <div className="lg:hidden flex items-center gap-2.5 justify-center mb-8">
            <div className="w-10 h-10 bg-[#ec6a52] rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-[#1e293b] text-xl leading-none">Residio</h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Admin Portal</p>
            </div>
          </div>

          {/* Admin Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2">
              <HiOutlineShieldCheck className="w-4 h-4 text-[#ec6a52]" />
              <span className="text-xs font-semibold text-[#ec6a52] tracking-wide">ADMIN PANEL</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b]">
              Welcome back, Admin!
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Sign in to your Residio Admin Panel and keep the platform running smoothly.
            </p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <AdminLoginForm
              onSubmit={handleLogin}
              loading={loading}
              serverError={serverError}
            />
          </div>

          {/* Bottom Trust Indicators */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: '🛡️', label: 'Secure Access', desc: 'Encrypted connection' },
              { icon: '👁️', label: 'Monitored', desc: 'Activity logging' },
              { icon: '🔐', label: 'Protected', desc: 'Role-based access' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                  <span className="text-base">{item.icon}</span>
                </div>
                <p className="text-xs font-semibold text-[#1e293b]">{item.label}</p>
                <p className="text-[10px] text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;