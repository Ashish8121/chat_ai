'use client';

import { useState } from 'react';
import Link from 'next/link';
import { loginUser, handleApiError } from '@/lib/api';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await loginUser(formData);
      console.log('Login successful:', response.data);
      
      // Store the token in localStorage or context
      localStorage.setItem('token', response.data.access_token);
      
      // Redirect to dashboard or home page
      // You can use Next.js router here
      window.location.href = '/dashboard'; // or use router.push('/dashboard')
      
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="animate-fade-in-up">
      <div className="card rounded-2xl p-8 max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent interactive-text">
            Welcome Back
          </h1>
          <p className="text-theme-main font-medium">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-3 text-theme-main">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input w-full px-4 py-2 rounded-lg focus-ring"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-3 text-theme-main">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input w-full px-4 py-2 rounded-lg focus-ring pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer group">
              <input type="checkbox" className="enhanced-checkbox mr-3" />
              <span className="text-sm font-medium text-theme-main group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200">
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 interactive-link"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-2 px-4 rounded-lg text-gray-700 dark:text-white font-semibold flex items-center justify-center focus-ring"
          >
            {isLoading ? (
              <>
                <div className="spinner mr-3"></div>
                <span className="font-medium">Signing in...</span>
              </>
            ) : (
              <span className="font-medium">Sign In</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-theme-main font-medium">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 interactive-link"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <div className="relative flex items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-theme-main font-medium">Or continue with</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <div className="mt-6">
            <button className="btn-secondary w-full py-2 px-4 rounded-lg flex items-center justify-center focus-ring group">
              <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-semibold">Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 