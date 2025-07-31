'use client';

import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={
        `fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg border-2 transition-all duration-300 ` +
        (theme === 'light'
          ? 'bg-gradient-to-tr from-yellow-300 via-yellow-400 to-yellow-500 border-yellow-400 hover:scale-110'
          : 'bg-gradient-to-tr from-gray-800 via-indigo-900 to-indigo-700 border-indigo-500 hover:scale-110')
      }
      aria-label="Toggle theme"
    >
      <span className="block transition-transform duration-300">
        {theme === 'light' ? (
          // Filled sun icon
          <svg className="w-6 h-6 text-yellow-700" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="5" />
            <g stroke="currentColor" strokeWidth="1.5">
              <line x1="10" y1="2" x2="10" y2="4" />
              <line x1="10" y1="16" x2="10" y2="18" />
              <line x1="4" y1="10" x2="2" y2="10" />
              <line x1="18" y1="10" x2="16" y2="10" />
              <line x1="5.64" y1="5.64" x2="4.22" y2="4.22" />
              <line x1="14.36" y1="14.36" x2="15.78" y2="15.78" />
              <line x1="5.64" y1="14.36" x2="4.22" y2="15.78" />
              <line x1="14.36" y1="5.64" x2="15.78" y2="4.22" />
            </g>
          </svg>
        ) : (
          // Crescent moon icon
          <svg className="w-6 h-6 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </span>
    </button>
  );
} 