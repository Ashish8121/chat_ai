import React from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleReg = () => {
    navigate('/registration');
  };

  return (
    <div className=" relative min-h-screen bg-gradient-to-br from-[var(--color-primary-light)] via-[var(--color-primary)] to-[var(--color-primary-dark)] flex flex-col items-center justify-start overflow-hidden">

      {/* Decorative blurred circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-secondary-dark)] opacity-20 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary-light)] opacity-20 rounded-full filter blur-3xl z-0"></div>

      {/* Top Bar */}
      <div className="mt-2 w-full flex justify-between items-center px-4 py-3 bg-[var(--color-primary)] bg-opacity-190 backdrop-blur-md shadow-md rounded-lg z-20">
        <h1 className="text-2xl font-extrabold text-white tracking-wide">Friendly AI</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={handleLogin}
            className="bg-white text-[var(--color-primary-dark)] px-5 py-2 rounded-lg hover:bg-gray-200 transition font-medium shadow-md"
          >
            Login
          </button>
          <button
            onClick={handleReg}
            className="bg-white text-[var(--color-primary-dark)] px-5 py-2 rounded-lg hover:bg-gray-200 transition font-medium shadow-md"
          >
            Register
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4 py-16 z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg animate-fade-in">
          Welcome to Friendly AI
        </h2>
        <p className="text-lg md:text-xl text-white mb-10 max-w-2xl leading-relaxed animate-fade-in delay-200">
          Always here to listen. Always ready to reply. Experience intelligent conversations with a touch of friendliness and professionalism.
        </p>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 animate-fade-in delay-300">
          <button
            onClick={handleLogin}
            className="bg-white text-[var(--color-primary-dark)] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition shadow-lg"
          >
            Get Started
          </button>
          <button
            onClick={handleReg}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-[var(--color-primary-dark)] transition shadow-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
