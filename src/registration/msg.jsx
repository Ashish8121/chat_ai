import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Message() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[var(--color-primary-light)] via-[var(--color-primary)] to-[var(--color-primary-dark)] animate-gradient bg-[length:400%_400%]">
      {/* Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center overflow-hidden"
      >
        {/* Animated glow background */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-2xl animate-pulse" />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative text-3xl font-extrabold theme-text-primary tracking-wide"
        >
          Registration Successful 🎉
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative theme-text-secondary text-lg mt-2"
        >
          Your account has been created successfully.  
          You can now log in to continue.
        </motion.p>

        {/* Login Button */}
        <motion.button
          onClick={handleLogin}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative mt-6 px-6 py-2 rounded-lg font-medium shadow-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition"
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Message;
