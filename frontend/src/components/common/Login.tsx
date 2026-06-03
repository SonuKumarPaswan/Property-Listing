"use client";

import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const loginOptions = [
  { label: " Google", icon: <FcGoogle size={24} /> },
  { label: " Facebook", icon: <FaFacebook size={24} color="#1877F2" /> },
];

const Login = () => {
  const [select, setSelect] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");

  return (
    <>
      {select && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[9998] "
            onClick={() => setSelect(false)}
          />

          {/* Login Modal */}
          <div className="fixed top-1/2 left-1/2 w-1/3 min-w-[380px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl px-8 py-2 pb-10 flex flex-col gap-5 z-[9999] mt-8">
            
            {/* Close Button */}
            <button
              onClick={() => setSelect(false)}
              className="self-end text-2xl font-bold text-gray-500 hover:text-blue-700"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Welcome to <span className="text-blue-600">Mishti Spaces</span>
            </h2>

            {/* Email / Phone Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setLoginMethod("email")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  loginMethod === "email"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600"
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setLoginMethod("phone")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  loginMethod === "phone"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600"
                }`}
              >
                Phone
              </button>
            </div>

            {/* Input Fields */}
            {loginMethod === "email" ? (
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-500 transition">
                <MdEmail className="text-blue-500 text-2xl" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full ml-3 outline-none bg-transparent"
                />
              </div>
            ) : (
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-500 transition">
                <FiPhone className="text-blue-500 text-2xl " />
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="w-full ml-3 outline-none bg-transparent"
                />
              </div>
            )}

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition text-lg">
              Send OTP
            </button>

            <p className="text-center text-gray-500 font-bold mb-3 text-lg">
              {selectedOption
                ? `Selected: ${selectedOption}`
                : "Or login with"}
            </p>

            {/* Social Logins */}
            <div className="flex flex-row gap-3">

              {loginOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setSelectedOption(option.label)}
                  className="flex items-center justify-center gap-3 border border-blue-300 hover:shadow hover:shadow-gray-300  py-3.5 rounded-xl transition  flex-1"
                >
                  <span>{option.icon}</span>
                  <span className="font-medium text-gray-700 px-2 py-1 hover:text-blue-500">{option.label}</span>
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