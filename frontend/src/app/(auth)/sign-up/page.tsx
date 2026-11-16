"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Building2,
  Home,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  X,
  ShieldCheck,
} from "lucide-react";
import api from "@/lib/api";

// ─── Animation Variants ───────────────────────────────────────────────────────
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

// ─── Types ────────────────────────────────────────────────────────────────────
type AccountType = "user" | "owner";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

// ─── City Skyline SVG (Subtle Blue & Slate Palette) ───────────────────────────
const CitySkylineSVG = () => (
  <svg
    viewBox="0 0 760 380"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-h-[340px] pointer-events-none select-none"
    preserveAspectRatio="xMidYBottom meet"
  >
    {[
      { x: 10, w: 52, h: 220, fill: "#E2E8F0" },
      { x: 68, w: 38, h: 160, fill: "#DBEAFE" },
      { x: 112, w: 62, h: 270, fill: "#EFF6FF" },
      { x: 180, w: 48, h: 210, fill: "#E2E8F0" },
      { x: 234, w: 78, h: 340, fill: "#DBEAFE" },
      { x: 318, w: 52, h: 240, fill: "#EFF6FF" },
      { x: 376, w: 68, h: 300, fill: "#E2E8F0" },
      { x: 450, w: 44, h: 185, fill: "#DBEAFE" },
      { x: 500, w: 88, h: 320, fill: "#EFF6FF" },
      { x: 594, w: 52, h: 230, fill: "#E2E8F0" },
      { x: 652, w: 38, h: 165, fill: "#DBEAFE" },
      { x: 696, w: 54, h: 260, fill: "#EFF6FF" },
    ].map((b, i) => (
      <rect
        key={i}
        x={b.x}
        y={380 - b.h}
        width={b.w}
        height={b.h}
        fill={b.fill}
        stroke="#CBD5E1"
        strokeWidth="1"
        rx="2"
      />
    ))}

    {[
      [25, 230],
      [36, 260],
      [125, 160],
      [125, 200],
      [125, 240],
      [145, 180],
      [145, 220],
      [248, 100],
      [248, 140],
      [248, 180],
      [248, 220],
      [268, 120],
      [268, 160],
      [268, 200],
      [268, 240],
      [388, 130],
      [388, 170],
      [388, 210],
      [408, 150],
      [408, 190],
      [515, 120],
      [515, 160],
      [515, 200],
      [540, 140],
      [540, 180],
      [608, 200],
      [608, 240],
      [710, 170],
      [710, 210],
      [710, 250],
    ].map(([x, y], i) => (
      <rect
        key={i}
        x={x}
        y={y}
        width={7}
        height={10}
        rx="1"
        fill={i % 2 === 0 ? "#93C5FD" : "#60A5FA"}
        opacity={0.65}
      />
    ))}

    <line x1="0" y1="379" x2="760" y2="379" stroke="#E5E7EB" strokeWidth="2" />
  </svg>
);

// ─── Password Strength Helper ────────────────────────────────────────────────
function getStrength(pw: string) {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^a-zA-Z0-9]/.test(pw)) s++;
  const map = [
    { label: "", color: "#E5E7EB" },
    { label: "Very Weak", color: "#EF4444" },
    { label: "Weak", color: "#F97316" },
    { label: "Fair", color: "#F59E0B" },
    { label: "Good", color: "#10B981" },
    { label: "Strong", color: "#2043B0" },
  ];
  return { score: Math.min(s, 5), ...map[Math.min(s, 5)] };
}

// ─── Main Registration Component ─────────────────────────────────────────────
export default function SignupPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("user");
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const emptyForm: FormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  };
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const pwStrength = getStrength(form.password);

  // Auto-dismiss toast after 6 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.username.trim()) {
      e.username = "Username is required";
    } else if (form.username.trim().length < 3) {
      e.username = "Username must be at least 3 characters";
    }

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    if (!form.password) {
      e.password = "Password is required";
    } else if (form.password.length < 6) {
      e.password = "Minimum 6 characters required";
    }

    if (!form.confirmPassword) {
      e.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = "Passwords do not match";
    }

    if (!form.agreeTerms) {
      e.agreeTerms = "You must agree to the Terms of Service";
    }

    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (touched[name]) {
      const upd = validate();
      setErrors((prev) => ({ ...prev, [name]: upd[name as keyof Errors] }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const e = validate();
    setErrors((prev) => ({ ...prev, [name]: e[name as keyof Errors] }));
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const all: Record<string, boolean> = {
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true,
    };
    setTouched(all);

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setLoading(true);
      setToast(null);

      // Backend expects role "user" for Buyer/Tenant, and "owner" for Property Owner
      const payload = {
        username: form.username.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
        role: accountType,
      };

      const res = await api.post("/users/register", payload);

      if (res.status === 201) {
        // Store JWT token and user info matching existing auth conventions
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

        setToast({
          message: "Registration successful! Redirecting to your dashboard...",
          type: "success",
        });

        // Redirect immediately to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      } else {
        setToast({
          message: res.data.message || "Registration failed. Please try again.",
          type: "error",
        });
      }
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed. Please check your details and try again.";

      setToast({ message: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (name: keyof Errors, isPasswordWithButton = false) => {
    const isErr = touched[name] && errors[name];
    const rightPadding = isPasswordWithButton ? "pr-11" : "pr-4";
    return `w-full pl-10 ${rightPadding} py-3 rounded-xl border text-sm sm:text-base text-[#172554] placeholder-[#4B5563]/50 bg-white transition-all duration-200 outline-none shadow-2xs ${
      isErr
        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
        : "border-[#E5E7EB] hover:border-blue-300 focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15"
    }`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <div className="min-h-screen flex bg-[#F5F7FF] font-sans antialiased text-[#172554] selection:bg-[#2043B0] selection:text-white overflow-x-hidden">
        {/* ═════════════════════════════════════════════════════════════════════
            LEFT PANEL: Desktop & Laptop Branding (Clean White & Blue Identity)
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFC] to-white p-8 xl:p-12 2xl:p-16 border-r border-[#E5E7EB]">
          {/* Subtle Ambient Decorative Shapes */}
          <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[380px] w-[380px] rounded-full bg-[#2043B0]/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-1/3 h-[300px] w-[300px] rounded-full bg-blue-100/50 blur-2xl" />

          {/* City skyline illustration */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-40 flex items-end justify-center">
            <CitySkylineSVG />
          </div>

          {/* Top Brand Logo */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="h-11 w-11 rounded-xl bg-[#2043B0] flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold font-[Cinzel] text-[#172554] tracking-tight block">
                  Mishti Spaces
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2043B0] block">
                  Real Estate Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Headline + Value Proposition + Statistics */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={subtleFadeUp}
            className="relative z-10 my-auto py-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-6 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
              <span>Create Your Account</span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-[Cinzel] font-bold text-[#172554] leading-[1.18] tracking-tight mb-5">
              Start Your Real<br />
              <span className="text-[#2043B0]">Estate Journey</span><br />
              With Confidence
            </h2>

            <p className="text-sm xl:text-base leading-relaxed text-[#4B5563] mb-8 max-w-md font-sans">
              Whether you are looking to find your next dream home or list and manage premium properties, Mishti Spaces gives you verified, professional tools.
            </p>

            {/* Statistics Row */}
            <div className="grid grid-cols-3 gap-3.5 pt-6 border-t border-[#E5E7EB] max-w-lg">
              {[
                { value: "12K+", label: "Verified Listings" },
                { value: "8K+", label: "Happy Clients" },
                { value: "50+", label: "Cities in India" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-[#E5E7EB] bg-white/90 backdrop-blur-xs p-3.5 shadow-xs transition-all duration-300 hover:border-blue-300 hover:bg-white"
                >
                  <div className="text-xl xl:text-2xl font-[Cinzel] font-bold text-[#2043B0] tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs text-[#172554] mt-1 uppercase tracking-wider font-semibold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Left Panel Footer */}
          <div className="relative z-10 text-xs text-[#4B5563]">
            © {new Date().getFullYear()} Mishti Spaces. Verified Real Estate Platform.
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            RIGHT PANEL: Registration Form (Clean White & Blue Mishti Spaces)
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-12 relative bg-[#F5F7FF] overflow-y-auto">
          <div className="pointer-events-none absolute right-10 top-10 h-72 w-72 rounded-full bg-[#2043B0]/5 blur-3xl" />
          <div className="pointer-events-none absolute left-10 bottom-10 h-72 w-72 rounded-full bg-blue-100/50 blur-2xl" />

          {/* Toast Notification */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className={`fixed top-5 right-5 left-5 sm:left-auto sm:max-w-md z-50 p-4 rounded-xl shadow-lg border flex items-start gap-3 backdrop-blur-sm ${
                  toast.type === "success"
                    ? "bg-white text-emerald-900 border-emerald-300 shadow-emerald-950/10"
                    : "bg-white text-red-900 border-red-300 shadow-red-950/10"
                }`}
              >
                {toast.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="text-sm font-medium flex-1">{toast.message}</div>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className="text-slate-400 hover:text-slate-600 shrink-0 p-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Card Container */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={subtleFadeUp}
            className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-2xl border border-[#E5E7EB] shadow-xs hover:border-blue-200 transition-all duration-300 p-6 sm:p-8 lg:p-9 z-10 my-auto"
          >
            {/* Mobile / Tablet Brand Header */}
            <div className="lg:hidden mb-6 flex items-center justify-center gap-2.5">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#2043B0] flex items-center justify-center text-white shadow-xs">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold font-[Cinzel] text-[#172554] tracking-tight">
                  Mishti Spaces
                </span>
              </Link>
            </div>

            {/* Form Header */}
            <div className="mb-6 sm:mb-8 text-left">
              <h1 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
                Create Your Account
              </h1>
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                Choose your account type and start exploring verified properties
              </p>
            </div>

            {/* Account Type Selection: Buyer/Tenant vs Property Owner */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2.5">
                Select Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType("user")}
                  className={`p-3.5 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col gap-1.5 ${
                    accountType === "user"
                      ? "bg-[#F5F7FF] border-[#2043B0] ring-2 ring-[#2043B0]/15"
                      : "bg-white border-[#E5E7EB] hover:border-blue-200 hover:bg-[#F5F7FF]/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs ${
                        accountType === "user"
                          ? "bg-[#2043B0] text-white"
                          : "bg-slate-100 text-[#4B5563]"
                      }`}
                    >
                      <Home className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        accountType === "user" ? "text-[#2043B0]" : "text-[#172554]"
                      }`}
                    >
                      Buyer / Tenant
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4B5563] leading-tight">
                    Browse properties, save favorites & contact owners
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType("owner")}
                  className={`p-3.5 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col gap-1.5 ${
                    accountType === "owner"
                      ? "bg-[#F5F7FF] border-[#2043B0] ring-2 ring-[#2043B0]/15"
                      : "bg-white border-[#E5E7EB] hover:border-blue-200 hover:bg-[#F5F7FF]/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs ${
                        accountType === "owner"
                          ? "bg-[#2043B0] text-white"
                          : "bg-slate-100 text-[#4B5563]"
                      }`}
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        accountType === "owner" ? "text-[#2043B0]" : "text-[#172554]"
                      }`}
                    >
                      Property Owner
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4B5563] leading-tight">
                    Add & manage your property listings for rent or sale
                  </p>
                </button>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2"
                >
                  Username
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2043B0] transition-colors">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    onBlur={() => handleBlur("username")}
                    placeholder="e.g. shivam123"
                    className={getInputClass("username")}
                    autoComplete="username"
                  />
                </div>
                {touched.username && errors.username && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.username}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2043B0] transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="name@example.com"
                    className={getInputClass("email")}
                    autoComplete="email"
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2043B0] transition-colors">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      id="password"
                      name="password"
                      type={showPw ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur("password")}
                      placeholder="At least 6 characters"
                      className={getInputClass("password", true)}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                      tabIndex={-1}
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2043B0] transition-colors">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showCpw ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => handleBlur("confirmPassword")}
                      placeholder="Re-enter password"
                      className={getInputClass("confirmPassword", true)}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCpw((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                      tabIndex={-1}
                      aria-label={showCpw ? "Hide password" : "Show password"}
                    >
                      {showCpw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Password Strength Indicator */}
              {form.password && (
                <div className="bg-[#F5F7FF] rounded-xl p-3 border border-[#E5E7EB]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#4B5563] font-medium">Password Strength:</span>
                    <span className="font-semibold" style={{ color: pwStrength.color }}>
                      {pwStrength.label}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden flex gap-1">
                    {[1, 2, 3, 4, 5].map((idx) => (
                      <div
                        key={idx}
                        className="h-full flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor:
                            idx <= pwStrength.score ? pwStrength.color : "#E5E7EB",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Terms of Service Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={form.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2043B0] focus:ring-[#2043B0]/30 transition cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    I agree to the{" "}
                    <Link
                      href="/terms-of-service"
                      className="text-[#2043B0] font-semibold hover:underline"
                      target="_blank"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-[#2043B0] font-semibold hover:underline"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {touched.agreeTerms && errors.agreeTerms && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.agreeTerms}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#2043B0] hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm sm:text-base shadow-md shadow-blue-900/15 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating your account...</span>
                  </>
                ) : (
                  <>
                    <span>
                      Register as {accountType === "owner" ? "Property Owner" : "Buyer / Tenant"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Agent Approval Callout Note */}
            <div className="mt-6 p-3 rounded-xl bg-[#F5F7FF] border border-blue-100 flex items-start gap-2.5 text-xs text-[#4B5563]">
              <ShieldCheck className="w-4 h-4 text-[#2043B0] shrink-0 mt-0.5" />
              <span>
                <strong>Are you a Real Estate Agent?</strong> Agent accounts require verified broker credentials through our admin approval process.{" "}
                <Link href="/contact" className="text-[#2043B0] font-semibold hover:underline">
                  Contact Support
                </Link>
              </span>
            </div>

            {/* Bottom Sign-In Link */}
            <div className="mt-6 pt-5 border-t border-[#E5E7EB] text-center text-xs sm:text-sm text-[#4B5563]">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-[#2043B0] hover:underline hover:text-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
