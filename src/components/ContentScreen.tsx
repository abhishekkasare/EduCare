import { useState } from 'react';
import { Search, Volume2, Star, Trophy, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { User, Screen } from '../App';

interface ContentScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
}

type Category = 'alphabets' | 'numbers';

// Alphabet with associated objects
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

// Numbers with visual representations
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

export function ContentScreen({ user, onNavigate }: ContentScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('alphabets');
  const [searchQuery, setSearchQuery] = useState('');

  const speak = (text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7; // Slower speed for kids
    utterance.pitch = 1.2; // Slightly higher pitch for friendly voice
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
  };

  const filteredAlphabets = alphabetsWithImages.filter(item =>
    item.letter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNumbers = numbersWithImages.filter(item =>
    item.number.toString().includes(searchQuery) ||
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/90 text-sm flex items-center gap-2">
              <Sparkles className="size-4" />
              Hello,
            </p>
            <h2 className="text-white text-2xl">{user.name}</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
            <div className="flex items-center gap-2">
              <Trophy className="size-5 text-yellow-300" />
              <span className="text-white">{user.totalPoints}</span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white border-0 shadow-lg rounded-2xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Fun Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-4 shadow-lg text-center">
            <div className="text-3xl mb-1">⭐</div>
            <div className="text-white text-xl">{user.totalPoints}</div>
            <div className="text-white/90 text-xs">Points</div>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl p-4 shadow-lg text-center">
            <div className="text-3xl mb-1">🎯</div>
            <div className="text-white text-xl">{user.coursesCompleted}</div>
            <div className="text-white/90 text-xs">Learned</div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl p-4 shadow-lg text-center">
            <div className="text-3xl mb-1">🏆</div>
            <div className="text-white text-xl">7</div>
            <div className="text-white/90 text-xs">Day Streak</div>
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <h3 className="text-slate-900 mb-3 flex items-center gap-2">
            <Sparkles className="size-5 text-purple-500" />
            <span>Choose What to Learn</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedCategory('alphabets')}
              className={`p-6 rounded-3xl transition-all ${
                selectedCategory === 'alphabets'
                  ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-xl scale-105'
                  : 'bg-white text-slate-700 shadow-sm'
              }`}
            >
              <div className="text-4xl mb-2">🔤</div>
              <div className="text-lg">Alphabets</div>
              <div className="text-sm opacity-90">A to Z</div>
            </button>
            <button
              onClick={() => setSelectedCategory('numbers')}
              className={`p-6 rounded-3xl transition-all ${
                selectedCategory === 'numbers'
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-xl scale-105'
                  : 'bg-white text-slate-700 shadow-sm'
              }`}
            >
              <div className="text-4xl mb-2">🔢</div>
              <div className="text-lg">Numbers</div>
              <div className="text-sm opacity-90">1 to 100</div>
            </button>
          </div>
        </div>

        {/* Alphabets Section */}
        {selectedCategory === 'alphabets' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-900 flex items-center gap-2">
                <span className="text-2xl">🔤</span>
                <span>Learn Alphabets</span>
              </h3>
              <Badge className="bg-pink-500">
                {filteredAlphabets.length} letters
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {filteredAlphabets.map((item) => (
                <button
                  key={item.letter}
                  onClick={() => speak(`${item.letter} for ${item.word}`)}
                  className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 group overflow-hidden relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="relative">
                    <div className="flex items-center justify-center mb-3">
                      <div className="text-6xl">{item.emoji}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">
                        {item.letter}
                      </div>
                      <div className="text-slate-600 text-sm mb-2">for {item.word}</div>
                      <div className="flex items-center justify-center gap-1 text-pink-500">
                        <Volume2 className="size-4" />
                        <span className="text-xs">Tap to hear</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Numbers Section */}
        {selectedCategory === 'numbers' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-900 flex items-center gap-2">
                <span className="text-2xl">🔢</span>
                <span>Learn Numbers</span>
              </h3>
              <Badge className="bg-blue-500">
                {filteredNumbers.length} numbers
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {filteredNumbers.map((item) => (
                <button
                  key={item.number}
                  onClick={() => speak(`${item.number}`)}
                  className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 group overflow-hidden relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="relative">
                    <div className="text-3xl mb-2">{item.visual}</div>
                    <div className="text-center">
                      <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                        {item.number}
                      </div>
                      <div className="text-slate-600 text-xs mb-2">{item.word}</div>
                      <div className="flex items-center justify-center text-blue-500">
                        <Volume2 className="size-3" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 shadow-xl text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">🎮</div>
            <div>
              <h3 className="text-xl mb-1">Ready for a Quiz?</h3>
              <p className="text-white/90 text-sm">Test what you learned and earn stars!</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('quiz')}
            className="w-full bg-white text-purple-600 py-3 rounded-2xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
          >
            <Star className="size-5 fill-yellow-400 text-yellow-400" />
            <span>Start Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
}
