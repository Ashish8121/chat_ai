import React, { useState, useEffect, useRef } from 'react';
import { PowerIcon } from '@heroicons/react/24/outline';
import { FaRegUser } from "react-icons/fa";
import { useSelector } from 'react-redux';

function TopBar({ handleLogout, name }) {
  const user = useSelector((state) => state.user);
  const [expanded, setExpanded] = useState(false);
  const [displayedName, setDisplayedName] = useState(user.name ? user.name.charAt(0).toUpperCase() : '');
  const [fullNameWidth, setFullNameWidth] = useState(80);

  const hiddenSpanRef = useRef(null);

  useEffect(() => {
    if (hiddenSpanRef.current) {
      const width = hiddenSpanRef.current.offsetWidth + 40; // padding
      setFullNameWidth(width);
    }
  }, [user.name, user.email]);

  const toggleExpand = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => {
        setDisplayedName(`${user.name} (${truncateEmail(user.email)})`);
      }, 300);
    } else {
      setDisplayedName(user.name ? user.name.charAt(0).toUpperCase() : '');
      setExpanded(false);
    }
  };

  const truncateEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    return username.length > 10 ? `${username.slice(0, 8)}...@${domain}` : email;
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] shadow-md rounded-xl">

      {/* Left: Chat partner name */}
      <div className="flex items-center space-x-3 text-white">
        <div className="bg-[var(--color-primary-light)] p-2 rounded-full shadow-md">
          <FaRegUser className="h-6 w-6 text-white" />
        </div>
        <span className="text-lg font-semibold">{name || 'No User Selected'}</span>
      </div>

      {/* Hidden span to measure full name + email width */}
      <span
        ref={hiddenSpanRef}
        className="absolute top-0 left-0 invisible whitespace-nowrap px-2 text-md font-medium"
      >
        {user.name} ({truncateEmail(user.email)})
      </span>

      {/* Right: Account owner slider + logout */}
      <div className="flex items-center space-x-4">

        {/* Account owner sliding button */}
        <div
          onClick={toggleExpand}
          style={{ width: expanded ? `${fullNameWidth}px` : '40px' }}
          className="relative flex items-center justify-center bg-gray-800 rounded-full shadow-lg cursor-pointer overflow-hidden h-10 transition-all duration-700 ease-in-out px-2 hover:bg-gray-700 active:scale-95 group"
        >
          <span
            className="text-white text-sm font-medium whitespace-nowrap transition-all duration-700 ease-in-out"
            title={user.email} // Tooltip shows full email on hover
          >
            {displayedName}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition shadow-md"
          title="Logout"
        >
          <PowerIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
