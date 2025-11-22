import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Volume2 } from 'lucide-react';

interface NumbersScreenProps {
  onNavigate: (screen: string) => void;
}

const numbersWithImages = [
  { number: 1, word: 'One', emoji: '1️⃣', visual: '🌟', color: 'from-red-400 to-red-600' },
  { number: 2, word: 'Two', emoji: '2️⃣', visual: '🌟🌟', color: 'from-orange-400 to-orange-600' },
  { number: 3, word: 'Three', emoji: '3️⃣', visual: '🌟🌟🌟', color: 'from-yellow-400 to-yellow-600' },
  { number: 4, word: 'Four', emoji: '4️⃣', visual: '🍎🍎🍎🍎', color: 'from-green-400 to-green-600' },
  { number: 5, word: 'Five', emoji: '5️⃣', visual: '🎈🎈🎈🎈🎈', color: 'from-blue-400 to-blue-600' },
  { number: 6, word: 'Six', emoji: '6️⃣', visual: '⚽⚽⚽⚽⚽⚽', color: 'from-indigo-400 to-indigo-600' },
  { number: 7, word: 'Seven', emoji: '7️⃣', visual: '🌈', color: 'from-purple-400 to-purple-600' },
  { number: 8, word: 'Eight', emoji: '8️⃣', visual: '🐙', color: 'from-pink-400 to-pink-600' },
  { number: 9, word: 'Nine', emoji: '9️⃣', visual: '🎯', color: 'from-rose-400 to-rose-600' },
  { number: 10, word: 'Ten', emoji: '🔟', visual: '👐', color: 'from-red-400 to-red-600' },
];

// Generate numbers 11-100
for (let i = 11; i <= 100; i++) {
  const colors = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-orange-400 to-orange-600',
    'from-cyan-400 to-cyan-600',
  ];
  numbersWithImages.push({
    number: i,
    word: i.toString(),
    emoji: `${i}`,
    visual: i % 10 === 0 ? '🎉' : '🔢',
    color: colors[i % colors.length]
  });
}

export function NumbersScreen({ onNavigate }: NumbersScreenProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const speak = (number: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(number.toString());
      utterance.rate = 0.7;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
      setActiveItem(number);
      setTimeout(() => setActiveItem(null), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 pb-8 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div>
            <h1 className="text-2xl">Numbers 🔢</h1>
            <p className="text-purple-100 text-sm">Tap to hear 1 to 100</p>
          </div>
        </div>
      </div>

      {/* Numbers Grid */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-3">
          {numbersWithImages.map((item, index) => (
            <motion.button
              key={item.number}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.01, 
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => speak(item.number)}
              className={`relative bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all ${
                activeItem === item.number ? 'ring-4 ring-purple-400' : ''
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={activeItem === item.number ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-3xl"
                >
                  {item.visual}
                </motion.div>
                <div className="text-center">
                  <div className="text-3xl mb-1">{item.number}</div>
                  {item.number <= 10 && (
                    <div className="text-slate-600 text-xs">{item.word}</div>
                  )}
                </div>
                <div className={`absolute top-2 right-2 p-1.5 rounded-full bg-gradient-to-br ${item.color}`}>
                  <Volume2 className="size-3 text-white" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
