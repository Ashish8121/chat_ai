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
            <h1 className="text-7xl lg:text-8xl font-black tracking-tight cursor-pointer group">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-500 group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-indigo-600 group-hover:scale-105 group-hover:drop-shadow-2xl inline-block transform hover:rotate-1 hover:skew-y-1 interactive-text">
                CHATAI
              </span>
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mt-6 font-semibold tracking-wide hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 cursor-pointer interactive-link">
              Your AI-Powered Chat Experience
            </p>
          </div>
        </div>

        {/* Center Section - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>

        {/* Bottom Section - Features */}
        <div className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300 p-6 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-3 group-hover:text-green-600 transition-colors duration-300">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">Instant responses powered by advanced AI</p>
              </div>
              <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300 p-6 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-3 group-hover:text-indigo-600 transition-colors duration-300">Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">Your conversations are protected and private</p>
              </div>
              <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300 p-6 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-3 group-hover:text-purple-600 transition-colors duration-300">Smart & Intuitive</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">AI that understands and adapts to you</p>
              </div>
            </div>
          </div>
        </div>
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
