import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function MoodSlider({ moods, selectedMood, setSelectedMood }) {
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const moodEmojis = {
    Friendly: '😊',
    Formal: '📝',
    Funny: '😂',
    Encouraging: '💪',
    Sarcastic: '😏',
    Romantic: '❤️',
    Motivational: '🔥',
    Supportive: '🤝',
    Professional: '💼',
    Chill: '😎',
    Angry: '😠',
    Curious: '🤔',
    Confused: '😕',
    Excited: '🥳',
    Empathetic: '🥰',
    Inspirational: '🌟',
    Honest: '🙌',
  };

  const filteredMoods = moods.filter((mood) =>
    mood.toLowerCase().includes(search.toLowerCase())
  );

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
 <motion.div
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
  className="flex items-center bg-white bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-3 w-full space-x-4 border border-gray-200"
>

      {/* Search box */}
      <motion.input
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        type="text"
        placeholder="Search moods..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[180px] px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 h-10 shadow-sm bg-white bg-opacity-30 backdrop-blur-md placeholder-gray-600 text-gray-800"
      />

      {/* Mood slider with drag */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden no-scrollbar flex-1 cursor-grab active:cursor-grabbing rounded-xl"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="inline-flex space-x-3 py-1"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {filteredMoods.map((mood) => (
            <motion.button
              key={mood}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood)}
              className={`flex items-center space-x-1 px-4 py-1.5 rounded-full text-sm font-medium border transition duration-300 ease-in-out shadow-md backdrop-blur-md ${
                selectedMood === mood
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent'
                  : 'bg-white bg-opacity-30 text-gray-800 border-gray-300 hover:bg-opacity-50'
              }`}
            >
              <span>{moodEmojis[mood] || '🙂'}</span>
              <span>{mood}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MoodSlider;
