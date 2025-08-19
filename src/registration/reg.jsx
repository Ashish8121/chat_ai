import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassw] = useState();
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Define your API base URL here
  const BASE_URL = "https://chat-ai-backend-a8ia.onrender.com";

  const handlSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // start loading

    axios.post(`${BASE_URL}/add_user`, { name, email, password })
      .then(res => {
        console.log('User created:', res.data);
        navigate('/message', { state: { name, email, password } });
      })
      .catch(err => {
        if (err.response && err.response.status === 409) {
          const msg = err.response.data.message;
          setAlert(msg);
        } else {
          console.error('Error adding user:', err);
        }
      })
      .finally(() => {
        setLoading(false); // stop loading
      });
  };

  const handleLogin = () => {
    navigate('/login');
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
            Welcome to SoftNation AI
          </h1>
          <p className="text-white text-lg mb-6">
            Empowering your ideas with cutting-edge AI solutions. Create your account to explore intelligent features crafted for productivity and growth.
          </p>
          <ul className="list-disc ml-5 text-white space-y-2">
            <li>AI-powered dashboards</li>
            <li>Real-time data insights</li>
            <li>Personalised recommendations</li>
          </ul>
        </div>
      </div>

      {/* Registration box */}
      <div className="flex items-center justify-end min-h-screen">
        <div
          className="theme-surface p-10 shadow-2xl w-[40rem] max-w-sm mr-12 border theme-border rounded-xl"
          style={{ minHeight: '500px' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold theme-text-primary">Registration</h2>
          </div>

          <form onSubmit={handlSubmit} className="space-y-6">
            <div>
              <label className="block text-left theme-text-secondary mb-1">Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="w-full border theme-border theme-surface theme-text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
              />
            </div>

            <div>
              <label className="block text-left theme-text-secondary mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border theme-border theme-surface theme-text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
              />
            </div>

            <div>
              <label className="block text-left theme-text-secondary mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                onChange={(e) => setPassw(e.target.value)}
                className="w-full border theme-border theme-surface theme-text-primary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
              />
            </div>

            <h1 className="text-red-500 font-semibold text-center">{alert}</h1>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg transition flex justify-center items-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] text-white"
              }`}
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
                "Register"
              )}
            </button>
          </form>

          <p className="mt-8 text-center theme-text-secondary">
            Already have an account?{' '}
            <button onClick={handleLogin} className="text-[var(--color-primary)] hover:underline">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
