import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play } from 'lucide-react';

interface VideosScreenProps {
  onNavigate: (screen: string) => void;
}

export function VideosScreen({ onNavigate }: VideosScreenProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'alphabet-song',
      title: 'ABC Alphabet Song',
      thumbnail: '📝',
      youtubeId: 'hq3yfQnllfQ', // ABC Song - Alphabet Song
      category: 'Alphabets',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'phonics-song',
      title: 'Phonics Song',
      thumbnail: '🔤',
      youtubeId: 'BELlZKpi1Zs', // Phonics Song
      category: 'Alphabets',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'counting-1-10',
      title: 'Count 1 to 10',
      thumbnail: '🔢',
      youtubeId: 'DR-cfDsHCHo', // Number Song 1-10
      category: 'Numbers',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'counting-1-20',
      title: 'Count 1 to 20',
      thumbnail: '💯',
      youtubeId: 'D0Ajq682yrA', // Counting 1-20
      category: 'Numbers',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'counting-1-100',
      title: 'Count 1 to 100',
      thumbnail: '💯',
      youtubeId: 'bGetqbqDVaA', // Count to 100
      category: 'Numbers',
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 'shapes-colors',
      title: 'Shapes & Colors',
      thumbnail: '🔴',
      youtubeId: '36n93jvjkDs', // Learn Colors and Shapes
      category: 'Learning',
      color: 'from-red-500 to-orange-500'
    },
  ];

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-red-600 text-white p-6 pb-8 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div>
            <h1 className="text-2xl">Learning Videos 📺</h1>
            <p className="text-rose-100 text-sm">Watch and learn with fun videos</p>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="p-6 space-y-4">
        {videos.map((video, index) => (
          <motion.button
            key={video.id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: 'spring',
              stiffness: 150
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedVideo(video.youtubeId)}
            className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            <div className="flex items-center gap-4 p-4">
              <div className={`flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${video.color} flex items-center justify-center text-4xl shadow-md`}>
                {video.thumbnail}
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-slate-900 mb-1">{video.title}</h3>
                <p className="text-slate-500 text-sm">{video.category}</p>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-br ${video.color}`}>
                <Play className="size-5 text-white fill-white" />
              </div>
            </div>
          </motion.button>
        ))}

        {/* Info Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-5 mt-6"
        >
          <h4 className="text-slate-900 mb-2 flex items-center gap-2">
            <span className="text-2xl">💡</span> Learning Tip
          </h4>
          <p className="text-slate-600 text-sm">
            Watch these fun videos to learn alphabets, numbers, and more! You can sing along too!
          </p>
        </motion.div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-full max-w-4xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pb-[56.25%] bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              onClick={closeVideo}
              className="mt-4 w-full py-3 bg-white text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Close Video
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}