import { useEffect, useRef, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiLoader,
  FiMail,
  FiLock,
  FiArrowLeft,
  FiShield,
  FiAward,
  FiHeart,
} from "react-icons/fi";
import { AuthContext } from "../../../context/AuthContext";
import { verifyOtp, resendOtp } from "../services/auth.service";

// Storage key for persisting otpExpires across refreshes
const OTP_EXPIRES_KEY = "otp_expires_at";

const VerifyOtpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);

  const EMAIL_KEY = "otp_email";

  const email =
    location.state?.email ||
    sessionStorage.getItem(EMAIL_KEY); 

    const isForgotPassword = location.state?.isForgotPassword;

  // ─── Resolve otpExpires ───────────────────────────────────────────────────
  // Priority: location.state (fresh navigation) → sessionStorage (after refresh)
  const resolveOtpExpires = () => {
    if (location.state?.otpExpires) {
      // Persist it so refresh can use it
      sessionStorage.setItem(OTP_EXPIRES_KEY, location.state.otpExpires);
      return location.state.otpExpires;
    }
    return sessionStorage.getItem(OTP_EXPIRES_KEY) || null;
  };

  // Keep otpExpires in a ref so timer interval can always read the latest value
  const otpExpiresRef = useRef(resolveOtpExpires());

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const inputs = useRef([]);
  const intervalRef = useRef(null); // single interval ref for cleanup

  // ─── Helper: calculate remaining seconds ─────────────────────────────────
  const getRemainingSeconds = () => {
    const expires = otpExpiresRef.current;
    if (!expires) return 59; // fallback default
    const diff = Math.floor(
      (new Date(expires).getTime() - Date.now()) / 1000
    );
    return Math.max(0, diff);
  };

  // ─── Start (or restart) the countdown ────────────────────────────────────
  const startCountdown = () => {
    // Clear any existing interval first
    if (intervalRef.current) clearInterval(intervalRef.current);

    const remaining = getRemainingSeconds();
    setTimer(remaining);

    if (remaining <= 0) {
      setCanResend(true);
      return;
    }

    setCanResend(false);

    intervalRef.current = setInterval(() => {
      const secs = getRemainingSeconds();
      setTimer(secs);

      if (secs <= 0) {
        clearInterval(intervalRef.current);
        setCanResend(true);
      }
    }, 1000);
  };

  // ─── Mount / otpExpires change ────────────────────────────────────────────
  useEffect(() => {
    startCountdown();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount; resend will call startCountdown() manually

  // ─── OTP input handlers ───────────────────────────────────────────────────
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputs.current[index - 1]?.focus();
    if (e.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5)
      inputs.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const digits = pastedData.split("");
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit;
    });
    setOtp(newOtp);
    inputs.current[Math.min(digits.length - 1, 5)]?.focus();
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    setLoading(true);
    try {
      const response = await verifyOtp({ email, otp: code });
      toast.success(response.message || "Verification successful!");

      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
      }

      // Clean up persisted expiry
      sessionStorage.removeItem(OTP_EXPIRES_KEY);

      setTimeout(() => {
        if (isForgotPassword) {
          navigate("/reset-password", { state: { email } });
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ─── Resend ───────────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (!canResend) return;
    setResendLoading(true);
    try {
      const response = await resendOtp({ email });
      toast.success(response.message || "OTP resent successfully");

      // Calculate new expiry: prefer server value, fallback to 60 s from now
      const newExpires =
        response.otpExpires ||
        new Date(Date.now() + 60 * 1000).toISOString();

      // Persist new expiry
      sessionStorage.setItem(OTP_EXPIRES_KEY, newExpires);
      otpExpiresRef.current = newExpires;

      // Reset OTP boxes
      setOtp(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();

      // Restart countdown with new expiry
      startCountdown();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  // ─── Format mm:ss ─────────────────────────────────────────────────────────
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Email Icon with Lock Badge */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-[#fdece7] flex items-center justify-center">
            <FiMail className="text-[#ec6a52]" size={32} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#ec6a52] flex items-center justify-center border-2 border-white shadow">
            <FiLock className="text-white" size={12} />
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-[15px] mb-1">
          We've sent a 6-digit OTP to
        </p>
        <p className="text-[#ec6a52] font-semibold text-[15px] mb-5">
          {email}
        </p>
        <p className="text-gray-600 text-[15px]">
          Enter the OTP below to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-2 md:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className={`w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-semibold rounded-xl border-2 bg-white transition-all focus:outline-none ${digit
                ? "border-[#ec6a52] text-gray-900"
                : "border-gray-200 focus:border-[#ec6a52] hover:border-gray-300"
                }`}
            />
          ))}
        </div>

        {/* Expiry Timer */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <FiShield
            className={timer <= 10 ? "text-red-500" : "text-[#ec6a52]"}
            size={16}
          />
          {timer > 0 ? (
            <span className="text-gray-700">
              OTP expires in{" "}
              <span
                className={`font-bold ${timer <= 10 ? "text-red-500" : "text-[#ec6a52]"
                  }`}
              >
                {formatTime(timer)}
              </span>
            </span>
          ) : (
            <span className="text-red-500 font-semibold">OTP has expired</span>
          )}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-[#ec6a52] text-white font-semibold text-base shadow-[0_10px_30px_-8px_rgba(236,106,82,0.6)] hover:bg-[#e35a41] hover:shadow-[0_12px_35px_-8px_rgba(236,106,82,0.8)] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={20} />
              Verifying...
            </>
          ) : (
            "Verify & Continue"
          )}
        </button>

        {/* Resend Section */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Didn't receive the code? </span>
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-[#ec6a52] font-bold hover:text-[#e35a41] transition-colors disabled:opacity-60"
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
          ) : (
            <span className="text-gray-400 font-bold cursor-not-allowed">
              Resend OTP
            </span>
          )}
        </div>

        {/* Divider + Back to Login */}
        <div className="border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 text-gray-800 hover:text-gray-900 font-medium transition-colors"
          >
            <FiArrowLeft size={18} />
            Back to Login
          </button>
        </div>
      </form>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 mt-10 pt-8">
        <TrustBadge
          icon={<FiShield className="text-[#ec6a52]" size={22} />}
          title="Safe & Secure"
          subtitle="Your data is protected"
        />
        <TrustBadge
          icon={<FiAward className="text-[#ec6a52]" size={22} />}
          title="Trusted by Thousands"
          subtitle="Across multiple cities"
        />
        <TrustBadge
          icon={<FiHeart className="text-[#ec6a52]" size={22} />}
          title="Loved by Students"
          subtitle="For comfort & service"
        />
      </div>
    </div>
  );
};

const TrustBadge = ({ icon, title, subtitle }) => (
  <div className="text-center">
    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#fdece7] flex items-center justify-center">
      {icon}
    </div>
    <h4 className="text-sm font-bold text-gray-900 mb-0.5">{title}</h4>
    <p className="text-xs text-gray-500">{subtitle}</p>
  </div>
);

export default VerifyOtpForm;