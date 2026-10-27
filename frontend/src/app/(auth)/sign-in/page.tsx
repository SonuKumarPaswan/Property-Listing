"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import api from "@/lib/api";

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS (Matches Mishti Spaces About Us Page)
───────────────────────────────────────────────────────────────────────────── */
const subtleFadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const SignInPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ identifier?: boolean; password?: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();

  const isEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isMobile = (val: string) => /^[6-9]\d{9}$/.test(val);

  const validateIdentifier = (val: string) => {
    if (!val.trim()) return "Email or mobile number is required.";
    if (!isEmail(val) && !isMobile(val))
      return "Enter a valid email address or 10-digit mobile number.";
    return "";
  };

  const validatePassword = (val: string) => {
    if (!val) return "Password is required.";
    if (val.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleBlur = (field: "identifier" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "identifier")
      setErrors((prev) => ({ ...prev, identifier: validateIdentifier(identifier) }));
    if (field === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  };

  const handleChange = (field: "identifier" | "password", val: string) => {
    if (field === "identifier") {
      setIdentifier(val);
      if (touched.identifier)
        setErrors((prev) => ({ ...prev, identifier: validateIdentifier(val) }));
    } else {
      setPassword(val);
      if (touched.password)
        setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ identifier: true, password: true });

    const idErr = validateIdentifier(identifier);
    const pwErr = validatePassword(password);

    setErrors({ identifier: idErr, password: pwErr });
    if (idErr || pwErr) return;

    try {
      setLoading(true);

      console.log("Attempting login with:", { identifier, password: "******" });
      const res = await api.post("/users/login", {
        email: identifier,
        password: password,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        console.log("Login successful");
        setSuccessMsg("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Login error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Login failed";

      setSuccessMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setSuccessMsg("Redirecting to Google Sign-In…");
  };

  const handleOtpLogin = async () => {
    setTouched((prev) => ({ ...prev, identifier: true }));
    const idErr = validateIdentifier(identifier);
    setErrors((prev) => ({ ...prev, identifier: idErr }));
    if (idErr) return;

    setOtpLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setOtpLoading(false);
    setSuccessMsg(`OTP sent to ${identifier}. Please check!`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <div className="min-h-screen flex bg-white font-sans antialiased selection:bg-[#2043B0] selection:text-white">
        {/* ═════════════════════════════════════════════════════════════════════
            LEFT PANEL: Desktop Branding (Mishti Spaces Navy & Blue Identity)
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0B132B] via-[#10244F] to-[#172554] p-10 xl:p-14">
          {/* Subtle Ambient Decorative Glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-[380px] w-[380px] rounded-full bg-[#2043B0]/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[#2043B0]/20 blur-3xl" />

          {/* City silhouette SVG background decoration */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-10">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <rect x="50" y="300" width="60" height="300" fill="white" />
              <rect x="60" y="260" width="40" height="50" fill="white" />
              <rect x="130" y="250" width="80" height="350" fill="white" />
              <rect x="145" y="200" width="50" height="60" fill="white" />
              <rect x="220" y="320" width="50" height="280" fill="white" />
              <rect x="280" y="200" width="100" height="400" fill="white" />
              <rect x="295" y="150" width="70" height="60" fill="white" />
              <rect x="390" y="270" width="70" height="330" fill="white" />
              <rect x="470" y="180" width="90" height="420" fill="white" />
              <rect x="480" y="130" width="70" height="60" fill="white" />
              <rect x="570" y="310" width="60" height="290" fill="white" />
              <rect x="640" y="240" width="80" height="360" fill="white" />
              <rect x="655" y="190" width="50" height="60" fill="white" />
              <rect x="730" y="290" width="70" height="310" fill="white" />
            </svg>
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />


          {/* Headline + Value Proposition + Statistics */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={subtleFadeUp}
            className="relative z-10 my-auto py-10"
          >
            {/* Real Estate Platform Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-900/40 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-200 mb-6 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
              <span>Real Estate Platform</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl xl:text-5xl font-[Cinzel] font-bold text-white leading-[1.18] tracking-tight mb-5">
              Find Your<br />
              <span className="text-[#60A5FA]">Dream Property</span><br />
              Today
            </h2>

            {/* Description */}
            <p className="text-sm xl:text-base leading-relaxed text-blue-100/75 mb-10 max-w-md font-sans">
              Buy, sell or rent properties easily with Mishti Spaces. Thousands of verified listings across India.
            </p>

            {/* Statistics Row */}
            <div className="grid grid-cols-3 gap-3.5 pt-6 border-t border-white/10 max-w-lg">
              {[
                { value: "12K+", label: "Properties" },
                { value: "8K+", label: "Happy Clients" },
                { value: "50+", label: "Cities" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xs p-3.5 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/10"
                >
                  <div className="text-xl xl:text-2xl font-[Cinzel] font-bold text-white tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs text-blue-200/70 mt-1 uppercase tracking-wider font-semibold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Left Panel Footer Note */}
          <div className="relative z-10 text-xs text-blue-200/50">
            © {new Date().getFullYear()} Mishti Spaces. Verified Real Estate Platform.
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            RIGHT PANEL: Sign-In Form (Clean White & Blue Mishti Spaces Theme)
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-12 py-12 relative bg-[#F5F7FF]/50 overflow-y-auto">
          {/* Subtle Ambient Decorative Shape */}
          <div className="pointer-events-none absolute right-10 top-10 h-72 w-72 rounded-full bg-[#2043B0]/5 blur-3xl" />
          <div className="pointer-events-none absolute left-10 bottom-10 h-72 w-72 rounded-full bg-blue-100/50 blur-2xl" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={subtleFadeUp}
            className="relative w-full max-w-md bg-white rounded-2xl border border-[#E5E7EB] shadow-xs hover:border-blue-200 transition-all duration-300 p-7 sm:p-9 z-10"
          >

            {/* Form Header */}
            <div className="mb-8 text-left">
              <h1 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
                Welcome back
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                Sign in to your account to continue
              </p>
            </div>

            {/* Success / Error Notification Message */}
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium border ${
                  successMsg.toLowerCase().includes("failed") ||
                  successMsg.toLowerCase().includes("error")
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-[#F5F7FF] border-blue-200 text-[#2043B0]"
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {successMsg.toLowerCase().includes("failed") ||
                  successMsg.toLowerCase().includes("error") ? (
                    <svg
                      className="w-4 h-4 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-[#2043B0]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                <span className="leading-snug">{successMsg}</span>
              </motion.div>
            )}

            {/* Sign-In Form */}
            <form onSubmit={handleLogin} noValidate className="space-y-5">
              {/* Identifier Field */}
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2"
                >
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#4B5563]/60">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                  <input
                    id="identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => handleChange("identifier", e.target.value)}
                    onBlur={() => handleBlur("identifier")}
                    placeholder="you@example.com or 9876543210"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-[#172554] placeholder-[#4B5563]/50 bg-white transition-all duration-200 outline-none shadow-2xs ${
                      touched.identifier && errors.identifier
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
                        : "border-[#E5E7EB] hover:border-blue-300 focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15"
                    }`}
                  />
                </div>
                {touched.identifier && errors.identifier && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium">
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{errors.identifier}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-[#172554] uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#2043B0] hover:underline cursor-pointer focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#4B5563]/60">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                    placeholder="Min. 6 characters"
                    className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm text-[#172554] placeholder-[#4B5563]/50 bg-white transition-all duration-200 outline-none shadow-2xs ${
                      touched.password && errors.password
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
                        : "border-[#E5E7EB] hover:border-blue-300 focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-3 flex items-center text-[#4B5563]/60 hover:text-[#172554] transition-colors p-1 cursor-pointer focus:outline-none"
                  >
                    {showPassword ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium">
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Sign In Primary Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl text-white font-semibold text-sm sm:text-base tracking-wide bg-[#2043B0] hover:bg-[#1a3896] active:bg-[#152e7b] shadow-md shadow-blue-900/10 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2043B0]/30"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    <span>Signing in…</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-[#E5E7EB]" />
              <span className="mx-3 text-xs font-semibold uppercase tracking-widest text-[#4B5563]/60">
                or
              </span>
              <div className="flex-1 h-px bg-[#E5E7EB]" />
            </div>

            {/* Google & OTP Authentication Actions */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-[#172554] bg-white border border-[#E5E7EB] hover:border-blue-300 hover:bg-[#F5F7FF] shadow-2xs active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2043B0]/15"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleOtpLogin}
                disabled={otpLoading}
                className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-[#2043B0] bg-[#F5F7FF] border border-blue-200 hover:bg-blue-100/60 shadow-2xs active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2043B0]/15"
              >
                {otpLoading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin text-[#2043B0]"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    <span>Sending OTP…</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 text-[#2043B0]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Login with OTP</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Create Account Link */}
            <p className="mt-8 text-center text-sm text-[#4B5563]">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/sign-up")}
                className="font-bold text-[#2043B0] hover:underline cursor-pointer focus:outline-none ml-1"
              >
                Create account
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;