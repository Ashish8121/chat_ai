import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Sidebar({ onUserSelect, selectedUser, activeChats, refreshChats }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1); // index of highlighted user
  const token = useSelector((state) => state.user.token);
  const API_BASE_URL = 'https://chat-ai-backend-a8ia.onrender.com'


  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHighlightIndex(-1);
      return;
    }

    try {
      const response = await axios.get(`https://chat-ai-backend-a8ia.onrender.com/search_users?search=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(response.data || []);
      setHighlightIndex(response.data.length > 0 ? 0 : -1);
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
      setHighlightIndex(-1);
    }
  };

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  const handleKeyDown = (e) => {
    if (searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % searchResults.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    }

    if (e.key === 'Enter') {
      if (highlightIndex >= 0 && highlightIndex < searchResults.length) {
        onUserSelect(searchResults[highlightIndex]);
        setSearch('');
        setSearchResults([]);
        setHighlightIndex(-1);
      }
    }
  };

  const handleUserClick = (user) => {
    onUserSelect(user);
    setSearch('');
    setSearchResults([]);
    setHighlightIndex(-1);
  };

const handleDeleteChat = async (userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/delete_chat/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // refresh chats here
  } catch (error) {
    console.error('Error deleting chat:', error);
  }
};

  return (
    
<div className="w-[20%] bg-white border border-gray-200 flex flex-col m-2 rounded-2xl shadow-lg">
      
      {/* Search bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <h3 className="text-md font-semibold text-center py-3 rounded-t-xl bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary-dark)] text-white shadow-md">
          {searchResults.length > 0 ? 'Search Results' : 'Active Chats'}
        </h3>

        {(searchResults.length > 0 ? searchResults : activeChats).map((user, index) => {
          const isHighlighted = searchResults.length > 0 && index === highlightIndex;

          return (
            <div
              key={user.id}
              className={`flex items-center justify-between my-2 px-4 py-3 rounded-xl shadow-sm transition transform hover:scale-[1.02] hover:shadow-md cursor-pointer
                ${
                  isHighlighted
                    ? 'bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white'
                    : selectedUser && selectedUser.id === user.id
                    ? 'bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white'
                    : 'bg-gray-50 text-[var(--color-secondary-dark)] hover:bg-[var(--color-primary-light)] hover:text-white'
                }`}
              onClick={() => handleUserClick(user)}
            >
              <div className="flex-1">
                <span className="font-medium text-base">{user.name}</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteChat(user.id);
                }}
                className={`ml-2 p-1 rounded-full transition flex items-center justify-center ${
                  selectedUser && selectedUser.id === user.id
                    ? 'hover:bg-[var(--color-primary-dark)]'
                    : 'hover:bg-gray-200'
                }`}
                title="Delete Chat"
              >
                <TrashIcon
                  className={`h-5 w-5 ${
                    selectedUser && selectedUser.id === user.id
                      ? 'text-white hover:text-red-300'
                      : 'text-red-500 hover:text-red-600'
                  }`}
                />
              </button>
            </div>
          );
        })}

        {searchResults.length === 0 && activeChats.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No active chats</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
