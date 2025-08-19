import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassw] = useState('');
  const [alert, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false); // 🔥 new loading state

  const dispatch = useDispatch();
  const API_BASE_URL = "https://chat-ai-backend-a8ia.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔥 start loading
    try {
      const res = await axios.post(`${API_BASE_URL}/check_user`, { email, password });

      if (res.data.error) {
        setMessage(res.data.error);
      } else {
        dispatch(setUser({
          id: res.data.id,  
          name: res.data.name,
          email: res.data.email,
          token: res.data.token,
        }));
        navigate('/welcome-message');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Server error. Please try again later.');
    } finally {
      setLoading(false); // 🔥 stop loading
    }
  };

  const handleReg = () => {
    navigate('/registration');
  };

  return (
    <div
      className="flex min-h-screen animate-gradient"
      style={{
        background: `linear-gradient(-45deg, var(--color-primary-light), var(--color-primary), var(--color-primary-dark), var(--color-secondary-dark))`
      }}
    >
      {/* Left side text */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome Back to SoftNation AI
          </h1>
          <p className="text-white text-lg mb-6">
            Log in to access your personalised AI workspace, data insights, and productivity tools designed to accelerate your growth.
          </p>
          <ul className="list-disc ml-5 text-white space-y-2">
            <li>Secure AI login system</li>
            <li>Access intelligent dashboards</li>
            <li>Seamless experience</li>
          </ul>
        </div>
      </div>

      {/* Login box */}
      <div className="flex items-center justify-end min-h-screen">
        <div
          className="theme-surface p-10 shadow-3xl w-[40rem] max-w-sm mr-12 border theme-border rounded-xl"
          style={{ minHeight: '400px' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold theme-text-primary">Login to AI</h2>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-left theme-text-secondary mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border theme-border theme-surface theme-text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-left theme-text-secondary mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassw(e.target.value)}
                className="w-full border theme-border theme-surface theme-text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {alert && (
              <h1 className="text-red-500 font-semibold text-center">{alert}</h1>
            )}

            <button
              type="submit"
              disabled={loading} // 🔥 disable while loading
              className="w-full bg-[var(--button-bg)] text-[var(--button-text)] py-2 rounded-lg hover:bg-[var(--button-bg-hover)] transition flex items-center justify-center"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="mt-8 text-center theme-text-secondary">
            Don't have an account?{' '}
            <button onClick={handleReg} className="text-[var(--color-primary)] hover:underline">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
