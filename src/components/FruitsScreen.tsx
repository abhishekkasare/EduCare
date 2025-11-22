import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Volume2 } from 'lucide-react';

interface FruitsScreenProps {
  onNavigate: (screen: string) => void;
}

export function FruitsScreen({ onNavigate }: FruitsScreenProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const fruits = [
    { id: 'apple', name: 'Apple', emoji: '🍎', color: 'from-red-500 to-rose-600' },
    { id: 'banana', name: 'Banana', emoji: '🍌', color: 'from-yellow-400 to-amber-500' },
    { id: 'orange', name: 'Orange', emoji: '🍊', color: 'from-orange-500 to-red-500' },
    { id: 'grape', name: 'Grape', emoji: '🍇', color: 'from-purple-500 to-violet-600' },
    { id: 'strawberry', name: 'Strawberry', emoji: '🍓', color: 'from-pink-500 to-red-600' },
    { id: 'watermelon', name: 'Watermelon', emoji: '🍉', color: 'from-green-500 to-red-500' },
    { id: 'mango', name: 'Mango', emoji: '🥭', color: 'from-yellow-500 to-orange-600' },
    { id: 'pineapple', name: 'Pineapple', emoji: '🍍', color: 'from-yellow-400 to-amber-600' },
    { id: 'cherry', name: 'Cherry', emoji: '🍒', color: 'from-red-500 to-pink-600' },
    { id: 'peach', name: 'Peach', emoji: '🍑', color: 'from-orange-400 to-pink-500' },
    { id: 'pear', name: 'Pear', emoji: '🍐', color: 'from-green-400 to-yellow-500' },
    { id: 'kiwi', name: 'Kiwi', emoji: '🥝', color: 'from-green-600 to-emerald-700' },
  ];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
      setActiveItem(text);
      setTimeout(() => setActiveItem(null), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 pb-8 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div>
            <h1 className="text-2xl">Fruits 🍎</h1>
            <p className="text-red-100 text-sm">Tap to hear the name</p>
          </div>
        </div>
      </div>

      {/* Fruits Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {fruits.map((fruit, index) => (
            <motion.button
              key={fruit.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.05, 
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => speakText(fruit.name)}
              className={`relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all ${
                activeItem === fruit.name ? 'ring-4 ring-orange-400' : ''
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  animate={activeItem === fruit.name ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-6xl"
                >
                  {fruit.emoji}
                </motion.div>
                <div className="text-center">
                  <h3 className="text-slate-900">{fruit.name}</h3>
                </div>
                <div className={`absolute top-2 right-2 p-2 rounded-full bg-gradient-to-br ${fruit.color}`}>
                  <Volume2 className="size-4 text-white" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Fun Fact Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-5 mt-6"
        >
          <h4 className="text-slate-900 mb-2 flex items-center gap-2">
            <span className="text-2xl">💡</span> Did you know?
          </h4>
          <p className="text-slate-600 text-sm">
            Fruits are sweet and full of vitamins that help you grow strong and healthy!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
