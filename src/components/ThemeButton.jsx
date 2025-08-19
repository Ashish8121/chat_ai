import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function ThemeButton({ className = '' }) {
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.getAttribute('data-theme') || 'light'
      : 'light'
  );

  useEffect(() => {
    const listener = (e) => {
      if (e.detail && e.detail.theme) setTheme(e.detail.theme);
    };
    window.addEventListener('set-theme', listener);
    return () => window.removeEventListener('set-theme', listener);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    const event = new CustomEvent('set-theme', { detail: { theme: next } });
    window.dispatchEvent(event);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full bg-white/30 hover:bg-white/40 backdrop-blur border border-white/40 shadow-md transition ${className}`}
      title="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-white" />
      ) : (
        <MoonIcon className="h-5 w-5 text-white" />
      )}
    </button>
  );
}

export default ThemeButton;



