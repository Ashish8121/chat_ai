import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import TopBar from './topBar';
import Sidebar from './sidebar';
import ProfileModal from './ProfileModal';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';

function Account() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeChats, setActiveChats] = useState([]);
  const [aiMode, setAiMode] = useState(false);
  const [lastAiRepliedMessageId, setLastAiRepliedMessageId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  const sendButtonRef = useRef(null);
  const messagesEndRef = useRef(null);

  const token = useSelector((state) => state.user.token);
  const currentUserId = parseInt(useSelector((state) => state.user.id));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL = "https://chat-ai-backend-a8ia.onrender.com";

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const fetchActiveChats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get_active_chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActiveChats(response.data.users || []);
    } catch (error) {
      console.error('Error fetching active chats:', error);
      setActiveChats([]);
    }
  };

  useEffect(() => {
    fetchActiveChats();
  }, []);

  const fetchMessagesWithUser = async (recipientId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get_messages_with_user/${recipientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (!selectedUser) return;
    fetchMessagesWithUser(selectedUser.id);

    const interval = setInterval(() => {
      fetchMessagesWithUser(selectedUser.id);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setAiMode(false);
  };

  const handleSend = async () => {
    if (input.trim() === '' || !selectedUser || aiMode) return;

    if (sendButtonRef.current) {
      sendButtonRef.current.classList.add('scale-95');
      setTimeout(() => {
        sendButtonRef.current.classList.remove('scale-95');
      }, 150);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/send_message`,
        {
          recipient_id: selectedUser.id,
          message: input,
          ai_mode: false,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.data) {
        setMessages((prev) => [...prev, response.data.data]);
      }
      if (response.data.ai_reply) {
        setMessages((prev) => [...prev, response.data.ai_reply]);
      }

      setInput('');
      fetchActiveChats();
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setLoading(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearUser());
    localStorage.clear();
    navigate('/login');
  };

  const toggleAiMode = async () => {
    const newAiMode = !aiMode;
    setAiMode(newAiMode);

    if (newAiMode && selectedUser) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/ai_reply`,
          { recipient_id: selectedUser.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.ai_reply) {
          setMessages((prev) => [...prev, response.data.ai_reply]);
        }
      } catch (error) {
        console.error('Error getting AI reply:', error);
      }
    }
  };
  

  return (
    <div className="h-screen w-screen flex theme-surface-elevated">
      <Sidebar
        onUserSelect={handleUserSelect}
        selectedUser={selectedUser}
        activeChats={activeChats}
        refreshChats={fetchActiveChats}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <div className="w-[79%] flex flex-col p-3">
        <TopBar handleLogout={handleLogout} name={selectedUser ? selectedUser.name : null} />

        <div className="flex-1 overflow-y-auto mt-1.5 mb-1.5 p-4 theme-surface rounded-lg shadow-xl border theme-border">
          {selectedUser ? (
            <>
              <h2 className="text-center font-semibold text-lg mb-3">
                Chat with {selectedUser.name}
              </h2>

              {messages.map((msg, index) => {
  const isOwnMessage = msg.sender_id === currentUserId;
  const isAiMessage = msg.is_ai;
  const bubbleBase = isOwnMessage
    ? (isAiMessage
        ? 'bg-green-500 text-white'
        : 'bg-[var(--color-primary)] text-white')
    : 'theme-surface-elevated theme-text-primary';

  const timestampClass = isOwnMessage ? 'text-white/70' : 'theme-text-secondary';

  return (
    <div
      key={index}
      className={`flex mb-3 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`${bubbleBase} rounded-xl px-4 py-2 text-md max-w-xs shadow-sm relative`}
      >
        <span>{msg.text || '[Empty message]'}</span>
        {isAiMessage && (
          <span className={`text-[9px] ml-2 ${timestampClass}`}>(AI)</span>
        )}
        {msg.timestamp && (
          <span className={`inline text-[10.5px] ml-2 text-right font-bold ${timestampClass}`}>
            {new Date(msg.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
      </div>
    </div>
  );
})}


              <div ref={messagesEndRef} />

              {loading && (
                <div className="flex justify-start mb-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
                    <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
                    <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">Select a user to start chatting</p>
          )}
        </div>

        <div className="flex items-center theme-surface rounded-lg shadow px-4 py-2 border theme-border">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 px-3 py-2 focus:outline-none rounded-lg border theme-border theme-surface theme-text-primary"
            disabled={!selectedUser || aiMode}
          />

          <button
            onClick={handleSend}
            ref={sendButtonRef}
            disabled={!selectedUser || aiMode}
            className="flex items-center justify-center ml-2 px-4 py-2 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 shadow-md hover:shadow-xl transform transition duration-200 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          >
            <PaperAirplaneIcon className="h-5 w-4 text-white transform rotate-45" />
          </button>

          <div className="flex items-center mx-2">
            <div className="flex flex-col items-center">
              <button
                onClick={toggleAiMode}
                className={`relative inline-flex items-center h-7 w-16 rounded-full transition px-1 shadow-inner ${
                  aiMode ? 'bg-green-500' : 'bg-gray-300'
                }`}
                title="Toggle AI Reply Mode"
              >
                <span
                  className={`text-[10px] font-bold absolute left-3 transition duration-300 ${
                    aiMode ? 'text-white opacity-100' : 'text-gray-500 opacity-0'
                  }`}
                >
                  ON
                </span>
                <span
                  className={`text-[10px] font-bold absolute right-3 transition duration-300 ${
                    aiMode ? 'text-gray-200 opacity-0' : 'text-gray-700 opacity-100'
                  }`}
                >
                  OFF
                </span>

                <span
                  className={`transform transition ease-in-out duration-300 inline-block w-5 h-5 bg-white rounded-full shadow ${
                    aiMode ? 'translate-x-9.5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProfileModal open={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={{ name: useSelector((s)=>s.user.name), email: useSelector((s)=>s.user.email) }} onLogout={handleLogout} />
    </div>
  );
}

export default Account;
