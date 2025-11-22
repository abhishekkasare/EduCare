import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Volume2 } from 'lucide-react';

interface AlphabetScreenProps {
  onNavigate: (screen: string) => void;
}

const alphabetsWithImages = [
  { letter: 'A', word: 'Apple', emoji: '🍎', color: 'from-red-400 to-red-600' },
  { letter: 'B', word: 'Ball', emoji: '⚽', color: 'from-blue-400 to-blue-600' },
  { letter: 'C', word: 'Cat', emoji: '🐱', color: 'from-orange-400 to-orange-600' },
  { letter: 'D', word: 'Dog', emoji: '🐕', color: 'from-amber-400 to-amber-600' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', color: 'from-gray-400 to-gray-600' },
  { letter: 'F', word: 'Fish', emoji: '🐟', color: 'from-cyan-400 to-cyan-600' },
  { letter: 'G', word: 'Grapes', emoji: '🍇', color: 'from-purple-400 to-purple-600' },
  { letter: 'H', word: 'House', emoji: '🏠', color: 'from-rose-400 to-rose-600' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', color: 'from-pink-400 to-pink-600' },
  { letter: 'J', word: 'Juice', emoji: '🧃', color: 'from-yellow-400 to-yellow-600' },
  { letter: 'K', word: 'Kite', emoji: '🪁', color: 'from-indigo-400 to-indigo-600' },
  { letter: 'L', word: 'Lion', emoji: '🦁', color: 'from-orange-400 to-orange-600' },
  { letter: 'M', word: 'Monkey', emoji: '🐵', color: 'from-amber-400 to-amber-600' },
  { letter: 'N', word: 'Nest', emoji: '🪹', color: 'from-emerald-400 to-emerald-600' },
  { letter: 'O', word: 'Orange', emoji: '🍊', color: 'from-orange-400 to-orange-600' },
  { letter: 'P', word: 'Penguin', emoji: '🐧', color: 'from-slate-400 to-slate-600' },
  { letter: 'Q', word: 'Queen', emoji: '👸', color: 'from-violet-400 to-violet-600' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰', color: 'from-gray-400 to-gray-600' },
  { letter: 'S', word: 'Star', emoji: '⭐', color: 'from-yellow-400 to-yellow-600' },
  { letter: 'T', word: 'Tiger', emoji: '🐯', color: 'from-orange-400 to-orange-600' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', color: 'from-red-400 to-red-600' },
  { letter: 'V', word: 'Violin', emoji: '🎻', color: 'from-amber-400 to-amber-600' },
  { letter: 'W', word: 'Whale', emoji: '🐋', color: 'from-blue-400 to-blue-600' },
  { letter: 'X', word: 'Xylophone', emoji: '🎵', color: 'from-purple-400 to-purple-600' },
  { letter: 'Y', word: 'Yacht', emoji: '⛵', color: 'from-cyan-400 to-cyan-600' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', color: 'from-gray-400 to-gray-600' }
];

export function AlphabetScreen({ onNavigate }: AlphabetScreenProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
      setActiveItem(text);
      setTimeout(() => setActiveItem(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 pb-8 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div>
            <h1 className="text-2xl">Alphabets 🔤</h1>
            <p className="text-blue-100 text-sm">Tap to hear A to Z</p>
          </div>
        </div>
      </div>

      {/* Alphabets Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {alphabetsWithImages.map((item, index) => (
            <motion.button
              key={item.letter}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.03, 
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => speak(`${item.letter} for ${item.word}`)}
              className={`relative bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all ${
                activeItem === `${item.letter} for ${item.word}` ? 'ring-4 ring-blue-400' : ''
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  animate={activeItem === `${item.letter} for ${item.word}` ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-6xl"
                >
                  {item.emoji}
                </motion.div>
                <div className="text-center">
                  <div className="text-4xl mb-1">{item.letter}</div>
                  <div className="text-slate-600 text-sm">for {item.word}</div>
                </div>
                <div className={`absolute top-2 right-2 p-2 rounded-full bg-gradient-to-br ${item.color}`}>
                  <Volume2 className="size-4 text-white" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
