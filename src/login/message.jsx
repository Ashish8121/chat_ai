import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WelMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/account");
    }, 4000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[var(--color-primary-light)] via-[var(--color-primary)] to-[var(--color-primary-dark)] animate-gradient bg-[length:400%_400%]"
    >
      {/* Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center overflow-hidden font-[Inter]"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-2xl animate-pulse" />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative text-4xl font-bold text-white tracking-wide drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
        >
          Welcome Back
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative text-gray-200/90 text-lg mt-3 italic tracking-wide"
        >
          Preparing your AI workspace...
        </motion.p>

        {/* Loader */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{
            delay: 0.8,
            duration: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="mt-10 flex justify-center"
        >
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-t-transparent border-[var(--color-primary)] rounded-full animate-spin-slow" />
            <div className="absolute inset-3 border-4 border-b-transparent border-[var(--color-secondary-dark)] rounded-full animate-spin-reverse" />
            <div className="absolute inset-6 bg-[var(--color-primary-light)] rounded-full animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelMessage;
