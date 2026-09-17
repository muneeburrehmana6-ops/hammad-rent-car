// components/ChatWidget.jsx
// A lightweight, self-contained "customer support" chat bubble — no third-party
// service needed. Quick-reply buttons open WhatsApp with a relevant pre-filled message.
import React, { useState } from "react";

const WHATSAPP_NUMBER = import.meta.env.VITE_ADMIN_WHATSAPP;

const QUICK_REPLIES = [
  { label: "I have a question", message: "Hi! I have a question about renting a car." },
  { label: "Tell me more about your fleet", message: "Hi! Can you tell me more about the cars you have available?" },
  { label: "I want to book a car", message: "Hi! I'd like to book a car. Can you help me?" },
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  if (!WHATSAPP_NUMBER) return null;

  const openWhatsApp = (message) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-24 right-5 z-50">
      {open && (
        <div className="mb-3 w-72 bg-white rounded-xl shadow-2xl overflow-hidden border border-asphalt/10">
          <div className="bg-teal text-white px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-sm">Customer Support</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/80 hover:text-white">
              ✕
            </button>
          </div>

          <div className="p-4 bg-asphalt/5">
            <div className="bg-teal text-white text-sm rounded-lg rounded-tl-none px-3 py-2 inline-block max-w-[85%]">
              👋 Hi! How can we help?
            </div>

            <div className="flex flex-col items-end gap-2 mt-3">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q.label}
                  onClick={() => openWhatsApp(q.message)}
                  className="text-xs font-medium border border-teal text-teal rounded-full px-3 py-1.5 hover:bg-teal hover:text-white transition-colors"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-3 py-2 text-[11px] text-center text-asphalt/40 border-t border-asphalt/10">
            Replies sent via WhatsApp
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open customer support chat"
        className="w-14 h-14 rounded-full bg-teal shadow-lg flex items-center justify-center text-white text-2xl hover:scale-105 transition-transform"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default ChatWidget;
