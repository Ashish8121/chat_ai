'use client';

import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m6-6l.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M17.657 6.343l.707-.707M6.343 17.657l-.707.707m12.728 0l.707-.707M17.657 17.657l.707.707"
          />
        </svg>
      )}
    </button>
  );
} 