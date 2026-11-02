"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  Building2,
  FileText,
  Home,
  Briefcase,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  X,
} from "lucide-react";
import api from "@/lib/api";

// ─── Animation Variants (Matches Mishti Spaces About Us & Sign-In Page) ──────
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
type Role = "buyer" | "agent";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agencyName: string;
  licenseNumber: string;
  agreeTerms: boolean;
}

interface Errors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agencyName?: string;
  licenseNumber?: string;
  agreeTerms?: string;
}

// ─── Restyled City Skyline (Matches Sign-In Page Exact SVG) ─────────────────
const CitySkylineSVG = () => (
  <svg
    viewBox="0 0 760 380"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-h-[340px] pointer-events-none select-none"
    preserveAspectRatio="xMidYBottom meet"
  >
    {/* Base buildings */}
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

    {/* Windows */}
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

    {/* Ground baseline */}
    <line x1="0" y1="379" x2="760" y2="379" stroke="#E5E7EB" strokeWidth="2" />
  </svg>
);

// ─── Password Strength Helper ────────────────────────────────────────────────
function getStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^a-zA-Z0-9]/.test(pw)) s++;
  const map = [
    { label: "", color: "#E5E7EB" },
    { label: "Weak", color: "#EF4444" },
    { label: "Fair", color: "#F59E0B" },
    { label: "Good", color: "#10B981" },
    { label: "Strong", color: "#2043B0" },
  ];
  return { score: s, ...map[s] };
}

// ─── Main Sign-Up Component ──────────────────────────────────────────────────
export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("buyer");
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const emptyForm: FormData = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agencyName: "",
    licenseNumber: "",
    agreeTerms: false,
  };
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const pw = getStrength(form.password);

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
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    else if (form.fullName.trim().length < 2) e.fullName = "Name is too short";

    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";

    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{8,15}$/.test(form.phone))
      e.phone = "Enter a valid phone number";

    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "Minimum 8 characters required";
    else if (pw.score < 2) e.password = "Password is too weak";

    if (!form.confirmPassword)
      e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (role === "agent") {
      if (!form.agencyName.trim()) e.agencyName = "Agency name is required";
      if (!form.licenseNumber.trim())
        e.licenseNumber = "License number is required";
    }

    if (!form.agreeTerms)
      e.agreeTerms = "You must accept the terms to continue";

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

    const all: Record<string, boolean> = {};
    Object.keys(form).forEach((k) => (all[k] = true));
    setTouched(all);

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setLoading(true);
      const backendRole = role === "buyer" ? "user" : "agent";
      console.log("Submitting with role:", backendRole);

      const res = await api.post("/users/register", {
        username: form.fullName,
        email: form.email,
        password: form.password,
        role: backendRole,
      });

      if (res.status === 201) {
        console.log("Registration successful:", res.data);
        setToast(res.data.message || "Registration successful! Please log in.");
        setSuccess(true);
      } else {
        console.error("Registration failed:", res.data);
        setToast(res.data.message || "Registration failed. Please try again.");
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
        "Something went wrong";

      setToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const switchRole = (r: Role) => {
    setRole(r);
    setErrors({});
    setTouched({});
  };

  const handleGoogleSignUp = () => {
    setToast(
      "Google Sign-Up is currently in development. Please sign up using the form below."
    );
  };

  const getInputClass = (name: keyof Errors, isPasswordWithButton = false) => {
    const isErr = touched[name] && errors[name];
    const rightPadding = isPasswordWithButton ? "pr-11" : "pr-4";
    return `w-full pl-10 ${rightPadding} py-3 rounded-xl border text-sm sm:text-base text-[#172554] placeholder-[#4B5563]/50 bg-white transition-all duration-200 outline-none shadow-2xs ${isErr
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
            LEFT PANEL: Desktop & Laptop Branding (Matches Sign-In Page Style)
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFC] to-white p-8 xl:p-12 2xl:p-16 border-r border-[#E5E7EB]">
          {/* Subtle Ambient Decorative Shapes */}
          <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[380px] w-[380px] rounded-full bg-[#2043B0]/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-1/3 h-[300px] w-[300px] rounded-full bg-blue-100/50 blur-2xl" />

          {/* City skyline illustration in subtle blue/light grey */}
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
            {/* Real Estate Platform Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-6 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
              <span>Real Estate Platform</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl xl:text-5xl font-[Cinzel] font-bold text-[#172554] leading-[1.18] tracking-tight mb-5">
              Find Your
              <br />
              <span className="text-[#2043B0]">Dream Property</span>
              <br />
              Today
            </h2>

            {/* Description - Balanced Spacing matching Sign-In */}
            <p className="text-sm xl:text-base leading-relaxed text-[#4B5563] mb-8 max-w-md font-sans">
              Buy, sell or rent properties easily with Mishti Spaces. Thousands
              of verified listings across India.
            </p>

            {/* Statistics Row */}
            <div className="grid grid-cols-3 gap-3.5 pt-6 border-t border-[#E5E7EB] max-w-lg">
              {[
                { value: "12K+", label: "Properties" },
                { value: "8K+", label: "Happy Clients" },
                { value: "50+", label: "Cities" },
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

          {/* Left Panel Footer Note */}
          <div className="relative z-10 text-xs text-[#4B5563]">
            © {new Date().getFullYear()} Mishti Spaces. Verified Real Estate
            Platform.
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            RIGHT PANEL: Sign-Up Form (Clean White & Blue Mishti Spaces Theme)
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-12 relative bg-[#F5F7FF] overflow-y-auto">
          {/* Subtle Ambient Decorative Shapes */}
          <div className="pointer-events-none absolute right-10 top-10 h-72 w-72 rounded-full bg-[#2043B0]/5 blur-3xl" />
          <div className="pointer-events-none absolute left-10 bottom-10 h-72 w-72 rounded-full bg-blue-100/50 blur-2xl" />

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
                Create your account
              </h1>
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                Join thousands of verified property buyers and agents today
              </p>
            </div>

            {/* Role Switch Tabs: Property Buyer | Real Estate Agent */}
            <div className="grid grid-cols-2 gap-2 p-1.5 mb-6 rounded-xl bg-[#F5F7FF] border border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => switchRole("buyer")}
                className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${role === "buyer"
                  ? "bg-white text-[#2043B0] border border-blue-200 shadow-xs"
                  : "text-[#4B5563] hover:text-[#172554] hover:bg-white/60 border border-transparent"
                  }`}
              >
                <Home className="w-4 h-4 shrink-0" />
                <span>Property Buyer</span>
              </button>

              <button
                type="button"
                onClick={() => switchRole("agent")}
                className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${role === "agent"
                  ? "bg-white text-[#2043B0] border border-blue-200 shadow-xs"
                  : "text-[#4B5563] hover:text-[#172554] hover:bg-white/60 border border-transparent"
                  }`}
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>Real Estate Agent</span>
              </button>
            </div>

            {/* Success State View */}
            {success ? (
              <div className="text-center py-6 sm:py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] tracking-tight mb-2.5">
                  Account Created!
                </h2>
                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-sm mx-auto mb-8">
                  Welcome to Mishti Spaces as a{" "}
                  <strong className="text-[#2043B0] font-semibold">
                    {role === "buyer" ? "Property Buyer" : "Real Estate Agent"}
                  </strong>
                  . Your account has been registered successfully.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link
                    href="/sign-in"
                    className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl bg-[#2043B0] hover:bg-blue-700 text-white font-semibold text-sm sm:text-base transition-all shadow-md shadow-blue-900/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setForm(emptyForm);
                      setTouched({});
                      setErrors({});
                    }}
                    className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:bg-[#F5F7FF] hover:border-blue-300 text-[#172554] font-semibold text-sm sm:text-base transition-all cursor-pointer"
                  >
                    Create Another Account
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                {/* Full Name & Email Address - Stacked on mobile, 2 columns on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2"
                    >
                      Full Name
                    </label>
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2043B0] transition-colors">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={form.fullName}
                        onChange={handleChange}
                        onBlur={() => handleBlur("fullName")}
                        placeholder="Your full name"
                        autoComplete="name"
                        className={getInputClass("fullName")}
                      />
                    </div>
                    {touched.fullName && errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium break-words">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
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
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={getInputClass("email")}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium break-words">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2043B0] transition-colors">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phone")}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      className={getInputClass("phone")}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium break-words">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Agent-only Fields: Agency Name & License Number (Stacked on mobile, 2 columns on sm+) */}
                {role === "agent" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Agency Name */}
                    <div>
                      <label
                        htmlFor="agencyName"
                        className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2"
                      >
                        Agency Name
                      </label>
                      <div className="relative group">
                        <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2043B0] transition-colors">
                          <Building2 className="w-4 h-4" />
                        </span>
                        <input
                          id="agencyName"
                          name="agencyName"
                          type="text"
                          value={form.agencyName}
                          onChange={handleChange}
                          onBlur={() => handleBlur("agencyName")}
                          placeholder="Agency or brokerage name"
                          autoComplete="organization"
                          className={getInputClass("agencyName")}
                        />
                      </div>
                      {touched.agencyName && errors.agencyName && (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium break-words">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.agencyName}</span>
                        </p>
                      )}
                    </div>

                    {/* License Number */}
                    <div>
                      <label
                        htmlFor="licenseNumber"
                        className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2"
                      >
                        License No.
                      </label>
                      <div className="relative group">
                        <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2043B0] transition-colors">
                          <FileText className="w-4 h-4" />
                        </span>
                        <input
                          id="licenseNumber"
                          name="licenseNumber"
                          type="text"
                          value={form.licenseNumber}
                          onChange={handleChange}
                          onBlur={() => handleBlur("licenseNumber")}
                          placeholder="REA-XXXX-XXXX"
                          autoComplete="off"
                          className={getInputClass("licenseNumber")}
                        />
                      </div>
                      {touched.licenseNumber && errors.licenseNumber && (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium break-words">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.licenseNumber}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Password Field */}
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
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
                      className={getInputClass("password", true)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-[#172554] transition-colors p-1 cursor-pointer focus:outline-none"
                    >
                      {showPw ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {form.password && (
                    <div className="mt-2.5 flex items-center gap-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex-1 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor:
                              i <= pw.score ? pw.color : "#E5E7EB",
                          }}
                        />
                      ))}
                      <span
                        className="text-xs font-bold ml-2 min-w-[48px] text-right"
                        style={{ color: pw.color }}
                      >
                        {pw.label}
                      </span>
                    </div>
                  )}

                  {touched.password && errors.password && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium break-words">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-semibold text-[#172554] uppercase tracking-wider mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2043B0] transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showCpw ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => handleBlur("confirmPassword")}
                      placeholder="Re-enter password"
                      autoComplete="new-password"
                      className={getInputClass("confirmPassword", true)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCpw((v) => !v)}
                      aria-label={showCpw ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-[#172554] transition-colors p-1 cursor-pointer focus:outline-none"
                    >
                      {showCpw ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium break-words">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}

                  {/* Passwords Match Success Message */}
                  {!errors.confirmPassword &&
                    touched.confirmPassword &&
                    form.confirmPassword &&
                    form.password === form.confirmPassword && (
                      <p className="mt-1.5 text-xs text-emerald-600 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Passwords match</span>
                      </p>
                    )}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="pt-1">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="terms"
                      name="agreeTerms"
                      checked={form.agreeTerms}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-[#E5E7EB] text-[#2043B0] accent-[#2043B0] focus:ring-[#2043B0] cursor-pointer shrink-0"
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs sm:text-sm text-[#4B5563] leading-relaxed cursor-pointer select-none"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms-of-service"
                        className="text-[#2043B0] font-semibold hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-[#2043B0] font-semibold hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {touched.agreeTerms && errors.agreeTerms && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium break-words">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.agreeTerms}</span>
                    </p>
                  )}
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-3.5 px-4 rounded-xl text-white font-semibold text-sm sm:text-base tracking-wide bg-[#2043B0] hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-900/10 active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2043B0]/30"
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
                      <span>Creating your account…</span>
                    </>
                  ) : (
                    `Create ${role === "buyer" ? "Buyer" : "Agent"} Account`
                  )}
                </button>
              </form>
            )}

            {!success && (
              <>
                {/* Subtle Divider matching Sign-In */}
                <div className="flex items-center my-5 sm:my-6">
                  <div className="flex-1 h-px bg-[#E5E7EB]" />
                  <span className="mx-3 text-xs font-semibold uppercase tracking-wider text-[#4B5563]/60">
                    or
                  </span>
                  <div className="flex-1 h-px bg-[#E5E7EB]" />
                </div>

                {/* Google Sign-Up Button (Informative notice on click per requirements) */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="w-full py-3 px-4 rounded-xl text-sm sm:text-base font-semibold text-[#172554] bg-white border border-[#E5E7EB] hover:border-blue-300 hover:bg-[#F5F7FF] shadow-2xs active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2043B0]/15"
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

                {/* Bottom Sign In Link matching Sign-In page */}
                <p className="mt-6 sm:mt-8 text-center text-sm text-[#4B5563]">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/sign-in")}
                    className="font-bold text-[#2043B0] hover:underline cursor-pointer focus:outline-none ml-1"
                  >
                    Sign In
                  </button>
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          TOAST NOTIFICATION (Clean White & Blue Style)
      ═════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 bg-white border border-[#E5E7EB] shadow-xl rounded-xl p-4 flex items-start gap-3.5 max-w-sm sm:max-w-md"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${toast.toLowerCase().includes("failed") ||
                toast.toLowerCase().includes("error") ||
                toast.toLowerCase().includes("unavailable") ||
                toast.toLowerCase().includes("development")
                ? "bg-amber-50 text-amber-600 border border-amber-200"
                : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                }`}
            >
              {toast.toLowerCase().includes("failed") ||
                toast.toLowerCase().includes("error") ||
                toast.toLowerCase().includes("unavailable") ||
                toast.toLowerCase().includes("development") ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <div className="text-sm font-semibold text-[#172554] leading-snug break-words">
                {toast}
              </div>
              <div className="text-xs text-[#4B5563] mt-0.5">
                {toast.toLowerCase().includes("failed") ||
                  toast.toLowerCase().includes("error")
                  ? "Please check your details and try again."
                  : toast.toLowerCase().includes("development") ||
                    toast.toLowerCase().includes("unavailable")
                    ? "Please complete registration with your email."
                    : "Welcome to Mishti Spaces!"}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-[#172554] p-1 transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
