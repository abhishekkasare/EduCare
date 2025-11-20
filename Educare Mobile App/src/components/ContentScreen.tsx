import { useState } from 'react';
import { Search, BookOpen, Video, FileText, Clock, Star, TrendingUp } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { User, Screen } from '../App';

interface ContentScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
}

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  lessons: number;
  progress: number;
  rating: number;
  thumbnail: string;
  type: 'video' | 'reading' | 'interactive';
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Mathematics',
    category: 'Mathematics',
    duration: '4 hours',
    lessons: 12,
    progress: 65,
    rating: 4.8,
    thumbnail: '📐',
    type: 'video'
  },
  {
    id: '2',
    title: 'English Grammar Basics',
    category: 'English',
    duration: '3 hours',
    lessons: 10,
    progress: 40,
    rating: 4.6,
    thumbnail: '📚',
    type: 'reading'
  },
  {
    id: '3',
    title: 'Science Experiments',
    category: 'Science',
    duration: '5 hours',
    lessons: 15,
    progress: 20,
    rating: 4.9,
    thumbnail: '🔬',
    type: 'interactive'
  },
  {
    id: '4',
    title: 'World History',
    category: 'History',
    duration: '6 hours',
    lessons: 18,
    progress: 0,
    rating: 4.7,
    thumbnail: '🌍',
    type: 'reading'
  },
  {
    id: '5',
    title: 'Creative Writing',
    category: 'English',
    duration: '4 hours',
    lessons: 11,
    progress: 0,
    rating: 4.5,
    thumbnail: '✍️',
    type: 'reading'
  },
  {
    id: '6',
    title: 'Physics Fundamentals',
    category: 'Science',
    duration: '7 hours',
    lessons: 20,
    progress: 0,
    rating: 4.8,
    thumbnail: '⚡',
    type: 'video'
  }
];

const categories = ['All', 'Mathematics', 'Science', 'English', 'History'];

export function ContentScreen({ user, onNavigate }: ContentScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm">Welcome back,</p>
            <h2 className="text-white text-2xl">{user.name}</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <TrendingUp className="size-6 text-white" />
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white border-0 shadow-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-blue-600 text-2xl mb-1">{user.coursesCompleted}</div>
            <div className="text-slate-600 text-xs">Completed</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-purple-600 text-2xl mb-1">{inProgressCourses.length}</div>
            <div className="text-slate-600 text-xs">In Progress</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-orange-600 text-2xl mb-1">{user.totalPoints}</div>
            <div className="text-slate-600 text-xs">Points</div>
          </div>
        </div>

        {/* Continue Learning */}
        {inProgressCourses.length > 0 && (
          <div>
            <h3 className="text-slate-900 mb-3">Continue Learning</h3>
            <div className="space-y-3">
              {inProgressCourses.map(course => (
                <div key={course.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex gap-4">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl size-16 flex items-center justify-center text-3xl flex-shrink-0">
                      {course.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-slate-900 mb-1 truncate">{course.title}</h4>
                      <p className="text-slate-600 text-sm mb-2">{course.category}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-slate-600 text-xs">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div>
          <h3 className="text-slate-900 mb-3">Categories</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div>
          <h3 className="text-slate-900 mb-3">Explore Courses</h3>
          <div className="grid grid-cols-1 gap-4">
            {filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4">
                  <div className="flex gap-4 mb-3">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl size-20 flex items-center justify-center text-4xl flex-shrink-0">
                      {course.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-slate-900 mb-1">{course.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {course.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-slate-600 text-xs">{course.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-slate-500 text-xs">
                        <div className="flex items-center gap-1">
                          {course.type === 'video' && <Video className="size-3" />}
                          {course.type === 'reading' && <FileText className="size-3" />}
                          {course.type === 'interactive' && <BookOpen className="size-3" />}
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors">
                    {course.progress > 0 ? 'Continue' : 'Start Course'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
