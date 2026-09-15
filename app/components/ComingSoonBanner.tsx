// components/ComingSoonModal.jsx
"use client";
import { useState, useEffect } from "react";

export default function ComingSoonModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("v2-modal-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("v2-modal-dismissed", "true");
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-2 text-gray-700">New Version Coming Soon!</h2>
        <img
            src="/new-design.png"
            alt="Sneak peek of new portfolio design"
            className="rounded-lg border border-gray-200 mb-4 w-full"
        />
        <p className="text-gray-600 mb-4">
          I'm currently working on a fresh redesign of this portfolio.
          Stay tuned for an upgraded look and new projects!
        </p>

        <button
          onClick={handleClose}
          className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
}