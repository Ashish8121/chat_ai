'use client';

import LoginForm from './components/LoginForm';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated Background Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Section - CHATAI Logo */}
        <div className="flex justify-center items-center py-12">
          <div className="animate-slide-in-right text-center">
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight cursor-pointer group">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-500 group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-indigo-600 group-hover:scale-105 group-hover:drop-shadow-2xl inline-block transform hover:rotate-1 hover:skew-y-1 interactive-text">
                CHATAI
              </span>
            </h1>
           
          </div>
        </div>

        {/* Center Section - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>

        {/* Bottom Section - Features */}
        
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-indigo-400 rounded-full animate-pulse-slow opacity-60"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-400 rounded-full animate-pulse-slow opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-pulse-slow opacity-60" style={{ animationDelay: '2s' }}></div>
      
      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer font-medium interactive-link">
          © 2025 CHATAI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
