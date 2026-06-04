"use client";

import React, { useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";

const AIAssistant = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-[9999] overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>

            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="h-64 p-4 overflow-y-auto">
            <div className="bg-gray-100 p-3 rounded-xl text-gray-700">
              👋 Hello! How can I help you today?
            </div>
          </div>

          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-3 py-2 outline-none text-black"
            />

            <button className="bg-blue-600 text-white p-3 rounded-lg">
              <IoSend />
            </button>
          </div>
        </div>
      )}

      {/* Floating AI Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999]
        w-16 h-16 rounded-full
        bg-gradient-to-r from-blue-600 to-cyan-500
        text-white shadow-xl
        flex items-center justify-center
        hover:scale-110 transition-all duration-300"
      >
        <RiRobot2Fill size={32} />
      </button>
    </>
  );
};

export default AIAssistant; 