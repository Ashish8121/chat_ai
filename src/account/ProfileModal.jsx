import React from 'react';
import ThemeButton from '../components/ThemeButton';
import { XMarkIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function getInitials(name = '') {
  const parts = String(name).trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

function ProfileModal({ open, onClose, user, onLogout }) {
  if (!open) return null;

  const userName = user?.name || 'Unknown User';
  const userEmail = user?.email || 'no-email@unknown';

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Centered panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="theme-surface theme-text-primary border theme-border rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">My Profile</h3>
            <div className="flex items-center gap-2">
              <ThemeButton />
              <button
                className="p-2 rounded-full hover:bg-black/5 transition"
                onClick={onClose}
                title="Close"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 text-white flex items-center justify-center text-3xl font-bold shadow-md">
              {getInitials(userName)}
            </div>
            <div className="mt-3">
              <div className="text-lg font-semibold">{userName}</div>
              <div className="text-sm theme-text-secondary">{userEmail}</div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 space-y-4">
            <div>
              <div className="text-sm font-semibold mb-1">Bio</div>
              <div className="rounded-lg border theme-border p-3 theme-surface">
                <p className="text-sm theme-text-secondary">No bio added yet.</p>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-1">Mail</div>
              <div className="rounded-lg border theme-border p-3 theme-surface">
                <p className="text-sm">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border theme-border hover:bg-black/5 transition"
              title="Settings"
            >
              <Cog6ToothIcon className="w-5 h-5" />
              <span>Settings</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;


