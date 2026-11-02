"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiRobot2Fill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  time?: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "ai",
    text: "👋 Hello! Welcome to Mishti Spaces.",
    time: "Just now",
  },
  {
    id: "welcome-2",
    sender: "ai",
    text: "How can I help you find your dream home, office space, or rental property today?",
    time: "Just now",
  },
];

const SUGGESTED_QUERIES = [
  "Properties for Sale",
  "Commercial Offices",
  "Rental Homes",
];

const AIAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages container
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, open]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Contextual responses based on keyword
    setTimeout(() => {
      let reply = "Thank you for reaching out! You can explore our verified listings or contact our real estate advisory team directly at support@mishtispaces.com.";
      const lower = query.toLowerCase();

      if (lower.includes("sale") || lower.includes("buy")) {
        reply = "We offer a wide collection of verified residential apartments and luxury villas for sale across Noida, Delhi NCR, and Gurgaon. Check our 'Buy' section for details!";
      } else if (lower.includes("rent")) {
        reply = "Looking for rental properties? We have fully verified flats, studios, and independent homes available for immediate lease. Visit our 'Rent' section to filter by budget.";
      } else if (lower.includes("office") || lower.includes("commercial")) {
        reply = "Our commercial portfolio features premium Grade-A office spaces, business centers, and retail shops across Noida's top sectors (Sector 62, 18, 137, 142).";
      } else if (lower.includes("new") || lower.includes("project")) {
        reply = "Explore our newly launched residential and commercial developments featuring modern amenities and flexible payment plans under 'New Projects'.";
      } else if (lower.includes("contact") || lower.includes("call") || lower.includes("agent")) {
        reply = "You can connect with our verified property advisors via our Contact page or call our helpdesk anytime.";
      }

      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
        time: "Just now",
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-assistant-title"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-22 right-4 sm:bottom-24 sm:right-6 z-[9999] w-[calc(100vw-2rem)] max-w-[370px] sm:w-[380px] bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl shadow-blue-950/15 overflow-hidden flex flex-col font-sans"
            style={{ maxHeight: "calc(100vh - 7.5rem)" }}
          >
            {/* 1. Header (Primary Blue with Title & Status) */}
            <div className="bg-[#2043B0] text-white px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between shadow-xs shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0">
                  <RiRobot2Fill className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    id="ai-assistant-title"
                    className="font-semibold text-white text-sm sm:text-base leading-tight tracking-wide"
                  >
                    AI Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] text-blue-100 font-normal">
                      Online · Mishti Spaces
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close AI Assistant"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <span className="text-lg leading-none" aria-hidden="true">
                  ✕
                </span>
              </button>
            </div>

            {/* 2. Messages Body */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto max-h-[340px] sm:max-h-[380px] space-y-3.5 bg-white">
              {messages.map((msg) => {
                const isAi = msg.sender === "ai";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      isAi ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isAi && (
                      <div className="w-7 h-7 rounded-full bg-[#F5F7FF] border border-blue-200 flex items-center justify-center text-[#2043B0] shrink-0 mt-0.5">
                        <RiRobot2Fill className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs max-w-[82%] ${
                        isAi
                          ? "bg-[#F5F7FF] border border-blue-100/90 text-[#172554] rounded-2xl rounded-tl-xs"
                          : "bg-[#2043B0] text-white rounded-2xl rounded-tr-xs"
                      }`}
                    >
                      <p className="break-words">{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-[#F5F7FF] border border-blue-200 flex items-center justify-center text-[#2043B0] shrink-0 mt-0.5">
                    <RiRobot2Fill className="w-4 h-4" />
                  </div>
                  <div className="bg-[#F5F7FF] border border-blue-100/90 text-[#4B5563] rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2043B0] animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#2043B0] animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#2043B0] animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggested chips */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 pt-1 bg-white flex flex-wrap gap-1.5 border-t border-[#E5E7EB]/50">
                {SUGGESTED_QUERIES.map((query) => (
                  <button
                    key={query}
                    type="button"
                    onClick={() => handleSend(query)}
                    className="text-[11px] font-medium text-[#2043B0] bg-[#F5F7FF] hover:bg-blue-100/70 border border-blue-200/80 rounded-full px-2.5 py-1 transition-colors cursor-pointer"
                  >
                    {query}
                  </button>
                ))}
              </div>
            )}

            {/* 3. Input & Send Bar */}
            <div className="p-3 sm:p-3.5 bg-white border-t border-[#E5E7EB] flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                aria-label="Type your message"
                className="flex-1 bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#172554] placeholder-[#4B5563]/60 focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 transition-all duration-200"
              />

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim()}
                aria-label="Send message"
                className="bg-[#2043B0] hover:bg-blue-700 active:bg-blue-800 disabled:opacity-40 disabled:hover:bg-[#2043B0] disabled:cursor-not-allowed text-white p-2.5 sm:p-3 rounded-xl transition-all duration-200 shadow-sm shadow-blue-900/20 hover:shadow-md cursor-pointer flex items-center justify-center shrink-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/30"
              >
                <IoSend className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Floating AI Button (Fixed at Bottom-Right Corner) */}
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
        title={open ? "Close AI Assistant" : "Open AI Assistant"}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2043B0] hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg shadow-blue-900/25 hover:shadow-xl hover:shadow-blue-900/30 flex items-center justify-center transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#2043B0]/30"
      >
        <RiRobot2Fill className="w-7 h-7 sm:w-8 sm:h-8" />

        {/* Status badge when closed */}
        {!open && (
          <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>
        )}
      </motion.button>
    </>
  );
};

export default AIAssistant;
