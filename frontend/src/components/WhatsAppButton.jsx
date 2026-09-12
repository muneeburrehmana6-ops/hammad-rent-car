// components/WhatsAppButton.jsx
// A floating button, visible on every page, that opens a WhatsApp chat
// with the site owner's number (set via VITE_ADMIN_WHATSAPP in frontend/.env).
import React from "react";

const WhatsAppButton = () => {
  const phone = import.meta.env.VITE_ADMIN_WHATSAPP;
  if (!phone) return null; // hide the button if no number is configured

  const message = encodeURIComponent("Hi! I have a question about renting a car.");
  const link = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.693 4.61 1.885 6.488L4 29l7.71-1.86A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm6.963 16.976c-.297.836-1.474 1.532-2.415 1.735-.643.137-1.482.246-4.309-.926-3.615-1.5-5.94-5.163-6.121-5.404-.176-.24-1.457-1.94-1.457-3.7 0-1.762.9-2.626 1.222-2.984.297-.33.647-.412.863-.412.216 0 .432.002.62.011.2.01.468-.076.732.559.297.71.99 2.472 1.077 2.652.086.18.144.393.028.633-.116.24-.174.39-.343.6-.17.21-.357.469-.51.63-.17.18-.348.375-.15.735.198.36.88 1.453 1.889 2.354 1.298 1.157 2.393 1.516 2.753 1.687.36.17.57.144.78-.086.216-.24.926-1.08 1.174-1.45.248-.37.495-.31.833-.186.34.126 2.15 1.014 2.518 1.198.368.185.613.276.703.43.09.156.09.9-.207 1.735z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
