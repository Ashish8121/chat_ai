import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WelMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/account');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-screen animate-gradient"
      style={{
        background: `linear-gradient(-45deg, var(--color-primary-light), var(--color-primary), var(--color-primary-dark), var(--color-secondary-dark))`
      }}
    >
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
          Welcome Back!
        </h1>
        <p className="text-[var(--color-secondary)] text-lg">
          Preparing your AI workspace...
        </p>

        {/* AI brain loader animation */}
        <div className="mt-8 flex justify-center">
          <svg
            className="w-16 h-16 text-[var(--color-primary)] animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WelMessage;
