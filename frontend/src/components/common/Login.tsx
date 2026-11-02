"use client";

import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const loginOptions = [
  { label: "Google", icon: <FcGoogle size={22} /> },
  { label: "Facebook", icon: <FaFacebook size={22} color="#1877F2" /> },
];

const Login: React.FC = () => {
  const [select, setSelect] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      {select && (
        <>
          {/* Background Overlay - Preserved exactly as bg-black/50 with click-to-close */}
          <div
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={() => setSelect(false)}
            aria-hidden="true"
          />

          {/* Login Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md sm:max-w-lg md:max-w-[460px] max-h-[calc(100vh-2.5rem)] overflow-y-auto bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl shadow-blue-950/15 p-6 sm:p-8 flex flex-col gap-5 z-[9999] font-sans antialiased text-[#172554]"
          >
            {/* Modal Header & Close Button */}
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-[#F5F7FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2043B0] mb-2 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                  <span>Mishti Spaces</span>
                </div>
                <h2
                  id="login-modal-title"
                  className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] tracking-tight leading-tight"
                >
                  Welcome to <span className="text-[#2043B0]">Mishti Spaces</span>
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  Sign in with your{" "}
                  {loginMethod === "email" ? "email address" : "mobile number"} to
                  continue
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelect(false)}
                aria-label="Close login modal"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#4B5563] hover:text-[#172554] hover:bg-[#F5F7FF] border border-transparent hover:border-[#E5E7EB] transition-colors cursor-pointer shrink-0 mt-0.5 ml-2 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/20"
              >
                <span className="text-lg leading-none" aria-hidden="true">
                  ✕
                </span>
              </button>
            </div>

            {/* Email / Phone Toggle */}
            <div className="grid grid-cols-2 gap-1 bg-[#F5F7FF] border border-[#E5E7EB] rounded-xl p-1">
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  loginMethod === "email"
                    ? "bg-white text-[#2043B0] border border-blue-200/80 shadow-xs"
                    : "text-[#4B5563] hover:text-[#172554] hover:bg-white/60 border border-transparent"
                }`}
              >
                <MdEmail className="w-4 h-4 shrink-0 text-[#2043B0]" />
                <span>Email</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMethod("phone")}
                className={`py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  loginMethod === "phone"
                    ? "bg-white text-[#2043B0] border border-blue-200/80 shadow-xs"
                    : "text-[#4B5563] hover:text-[#172554] hover:bg-white/60 border border-transparent"
                }`}
              >
                <FiPhone className="w-4 h-4 shrink-0 text-[#2043B0]" />
                <span>Phone</span>
              </button>
            </div>

            {/* Input Fields */}
            {loginMethod === "email" ? (
              <div className="flex items-center border border-[#E5E7EB] hover:border-blue-300 focus-within:border-[#2043B0] focus-within:ring-2 focus-within:ring-[#2043B0]/15 rounded-xl px-4 py-3 bg-white transition-all duration-200 shadow-2xs group">
                <MdEmail className="text-[#2043B0] text-xl shrink-0 transition-colors" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="w-full ml-3 outline-none bg-transparent text-sm sm:text-base text-[#172554] placeholder-[#4B5563]/50 font-sans"
                />
              </div>
            ) : (
              <div className="flex items-center border border-[#E5E7EB] hover:border-blue-300 focus-within:border-[#2043B0] focus-within:ring-2 focus-within:ring-[#2043B0]/15 rounded-xl px-4 py-3 bg-white transition-all duration-200 shadow-2xs group">
                <FiPhone className="text-[#2043B0] text-xl shrink-0 transition-colors" />
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  aria-label="Mobile number"
                  className="w-full ml-3 outline-none bg-transparent text-sm sm:text-base text-[#172554] placeholder-[#4B5563]/50 font-sans"
                />
              </div>
            )}

            {/* Send OTP Button */}
            <button
              type="button"
              className="w-full bg-[#2043B0] hover:bg-blue-700 active:bg-blue-800 text-white py-3 sm:py-3.5 px-4 rounded-xl font-semibold text-sm sm:text-base tracking-wide shadow-md shadow-blue-900/10 active:scale-[0.99] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2043B0]/30"
            >
              Send OTP
            </button>

            {/* Divider with selected option or prompt */}
            <div className="flex items-center my-0.5 sm:my-1">
              <div className="flex-1 h-px bg-[#E5E7EB]" />
              <span className="mx-3 text-xs font-semibold uppercase tracking-wider text-[#4B5563]/70 truncate max-w-[240px]">
                {selectedOption ? `Selected: ${selectedOption}` : "Or login with"}
              </span>
              <div className="flex-1 h-px bg-[#E5E7EB]" />
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              {loginOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setSelectedOption(option.label.trim())}
                  className={`flex items-center justify-center gap-2.5 py-3 px-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#2043B0]/15 ${
                    selectedOption === option.label.trim()
                      ? "border-[#2043B0] bg-[#F5F7FF] text-[#2043B0] ring-1 ring-[#2043B0]/20"
                      : "border-[#E5E7EB] bg-white hover:border-blue-300 hover:bg-[#F5F7FF] text-[#172554]"
                  }`}
                >
                  <span className="shrink-0">{option.icon}</span>
                  <span className="font-medium text-[#172554] truncate">
                    {option.label.trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
