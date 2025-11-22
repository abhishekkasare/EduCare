import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Volume2 } from 'lucide-react';

interface VegetablesScreenProps {
  onNavigate: (screen: string) => void;
}

export function VegetablesScreen({ onNavigate }: VegetablesScreenProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const vegetables = [
    { id: 'carrot', name: 'Carrot', emoji: '🥕', color: 'from-orange-500 to-amber-600' },
    { id: 'broccoli', name: 'Broccoli', emoji: '🥦', color: 'from-green-600 to-emerald-700' },
    { id: 'tomato', name: 'Tomato', emoji: '🍅', color: 'from-red-500 to-rose-600' },
    { id: 'potato', name: 'Potato', emoji: '🥔', color: 'from-amber-600 to-yellow-700' },
    { id: 'cucumber', name: 'Cucumber', emoji: '🥒', color: 'from-green-500 to-lime-600' },
    { id: 'onion', name: 'Onion', emoji: '🧅', color: 'from-amber-500 to-orange-600' },
    { id: 'corn', name: 'Corn', emoji: '🌽', color: 'from-yellow-500 to-amber-600' },
    { id: 'eggplant', name: 'Eggplant', emoji: '🍆', color: 'from-purple-600 to-violet-700' },
    { id: 'pepper', name: 'Pepper', emoji: '🫑', color: 'from-green-600 to-lime-700' },
    { id: 'pumpkin', name: 'Pumpkin', emoji: '🎃', color: 'from-orange-600 to-red-700' },
    { id: 'lettuce', name: 'Lettuce', emoji: '🥬', color: 'from-green-500 to-emerald-600' },
    { id: 'mushroom', name: 'Mushroom', emoji: '🍄', color: 'from-red-500 to-pink-600' },
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
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-lime-500 to-green-500 text-white p-6 pb-8 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div>
            <h1 className="text-2xl">Vegetables 🥕</h1>
            <p className="text-lime-100 text-sm">Tap to hear the name</p>
          </div>
        </div>
      </div>

      {/* Vegetables Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {vegetables.map((vegetable, index) => (
            <motion.button
              key={vegetable.id}
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
              onClick={() => speakText(vegetable.name)}
              className={`relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all ${
                activeItem === vegetable.name ? 'ring-4 ring-green-400' : ''
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  animate={activeItem === vegetable.name ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-6xl"
                >
                  {vegetable.emoji}
                </motion.div>
                <div className="text-center">
                  <h3 className="text-slate-900">{vegetable.name}</h3>
                </div>
                <div className={`absolute top-2 right-2 p-2 rounded-full bg-gradient-to-br ${vegetable.color}`}>
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
            Vegetables are super healthy and give you energy to play and learn all day long!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
