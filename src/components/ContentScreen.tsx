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

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

export function ContentScreen({ user, onNavigate }: ContentScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('alphabets');
  const [searchQuery, setSearchQuery] = useState('');

  const speak = (text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8; // Slower speed for kids
    utterance.pitch = 1.2; // Slightly higher pitch for friendly voice
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
  };

  const filteredAlphabets = alphabets.filter(letter =>
    letter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNumbers = numbers.filter(num =>
    num.toString().includes(searchQuery)
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
            <div className="grid grid-cols-3 gap-3">
              {filteredAlphabets.map((letter) => (
                <button
                  key={letter}
                  onClick={() => speak(letter)}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 group"
                >
                  <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">
                    {letter}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-pink-500">
                    <Volume2 className="size-4" />
                    <span className="text-xs">Tap to hear</span>
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
            <div className="grid grid-cols-4 gap-2">
              {filteredNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => speak(num.toString())}
                  className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 group"
                >
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                    {num}
                  </div>
                  <div className="flex items-center justify-center text-blue-500">
                    <Volume2 className="size-3" />
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
