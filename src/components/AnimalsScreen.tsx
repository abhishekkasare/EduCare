import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Volume2 } from 'lucide-react';

interface AnimalsScreenProps {
  onNavigate: (screen: string) => void;
}

export function AnimalsScreen({ onNavigate }: AnimalsScreenProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const animals = [
    { id: 'dog', name: 'Dog', emoji: '🐕', sound: 'Woof Woof', color: 'from-amber-500 to-orange-600' },
    { id: 'cat', name: 'Cat', emoji: '🐈', sound: 'Meow', color: 'from-gray-500 to-slate-600' },
    { id: 'elephant', name: 'Elephant', emoji: '🐘', sound: 'Trumpet', color: 'from-gray-600 to-slate-700' },
    { id: 'lion', name: 'Lion', emoji: '🦁', sound: 'Roar', color: 'from-yellow-600 to-amber-700' },
    { id: 'tiger', name: 'Tiger', emoji: '🐯', sound: 'Growl', color: 'from-orange-600 to-red-700' },
    { id: 'monkey', name: 'Monkey', emoji: '🐵', sound: 'Ooh Ooh', color: 'from-amber-600 to-yellow-700' },
    { id: 'giraffe', name: 'Giraffe', emoji: '🦒', sound: 'Hum', color: 'from-yellow-500 to-orange-600' },
    { id: 'zebra', name: 'Zebra', emoji: '🦓', sound: 'Neigh', color: 'from-gray-700 to-slate-800' },
    { id: 'panda', name: 'Panda', emoji: '🐼', sound: 'Bleat', color: 'from-slate-700 to-gray-800' },
    { id: 'bear', name: 'Bear', emoji: '🐻', sound: 'Growl', color: 'from-amber-700 to-brown-800' },
    { id: 'rabbit', name: 'Rabbit', emoji: '🐰', sound: 'Squeak', color: 'from-pink-500 to-rose-600' },
    { id: 'penguin', name: 'Penguin', emoji: '🐧', sound: 'Honk', color: 'from-slate-600 to-gray-700' },
  ];

  const speakText = (name: string, sound: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${name} says ${sound}`);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
      setActiveItem(name);
      setTimeout(() => setActiveItem(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 pb-8 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div>
            <h1 className="text-2xl">Animals 🐘</h1>
            <p className="text-green-100 text-sm">Tap to hear the animal sound</p>
          </div>
        </div>
      </div>

      {/* Animals Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {animals.map((animal, index) => (
            <motion.button
              key={animal.id}
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
              onClick={() => speakText(animal.name, animal.sound)}
              className={`relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all ${
                activeItem === animal.name ? 'ring-4 ring-green-400' : ''
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  animate={activeItem === animal.name ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-6xl"
                >
                  {animal.emoji}
                </motion.div>
                <div className="text-center">
                  <h3 className="text-slate-900">{animal.name}</h3>
                  <p className="text-slate-500 text-xs">{animal.sound}</p>
                </div>
                <div className={`absolute top-2 right-2 p-2 rounded-full bg-gradient-to-br ${animal.color}`}>
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
            Animals live all around the world! Some are pets, some are wild, and all of them are amazing!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
