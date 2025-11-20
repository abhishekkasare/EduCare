import { 
  User as UserIcon, 
  Mail, 
  Award, 
  BookOpen, 
  Trophy, 
  Settings, 
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Target
} from 'lucide-react';
import { User, Screen } from '../App';
import { Button } from './ui/button';

interface ProfileScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

const achievements = [
  { id: 1, title: 'First Step', icon: '🎯', unlocked: true },
  { id: 2, title: 'Quick Learner', icon: '⚡', unlocked: true },
  { id: 3, title: 'Week Streak', icon: '🔥', unlocked: true },
  { id: 4, title: 'Top Scorer', icon: '🏆', unlocked: false },
  { id: 5, title: 'Master', icon: '👑', unlocked: false },
  { id: 6, title: 'Dedicated', icon: '💎', unlocked: false }
];

export function ProfileScreen({ user, onNavigate, onLogout }: ProfileScreenProps) {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 px-6 pt-8 pb-20 rounded-b-3xl relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-2xl">Profile</h2>
          <button className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <Settings className="size-5 text-white" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="absolute left-6 right-6 top-32">
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl size-20 flex items-center justify-center">
                <UserIcon className="size-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 text-xl mb-1">{user.name}</h3>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Mail className="size-4" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-50 rounded-xl p-3 mb-2">
                  <BookOpen className="size-6 text-blue-600 mx-auto" />
                </div>
                <div className="text-slate-900 text-xl">{user.coursesCompleted}</div>
                <div className="text-slate-600 text-xs">Courses</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-50 rounded-xl p-3 mb-2">
                  <Trophy className="size-6 text-purple-600 mx-auto" />
                </div>
                <div className="text-slate-900 text-xl">{user.totalPoints}</div>
                <div className="text-slate-600 text-xs">Points</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-50 rounded-xl p-3 mb-2">
                  <Award className="size-6 text-orange-600 mx-auto" />
                </div>
                <div className="text-slate-900 text-xl">3</div>
                <div className="text-slate-600 text-xs">Badges</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-44 space-y-6">
        {/* Achievements */}
        <div>
          <h3 className="text-slate-900 mb-3">Achievements</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`text-center ${achievement.unlocked ? '' : 'opacity-40'}`}
                >
                  <div className={`rounded-xl p-3 mb-2 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100' 
                      : 'bg-slate-100'
                  }`}>
                    <div className="text-3xl">{achievement.icon}</div>
                  </div>
                  <p className="text-slate-700 text-xs">{achievement.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div>
          <h3 className="text-slate-900 mb-3">Learning Stats</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-xl p-2">
                  <Target className="size-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-900">Daily Goal</p>
                  <p className="text-slate-500 text-sm">30 min/day</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-900">45 min</p>
                <p className="text-green-600 text-sm">+50%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 rounded-xl p-2">
                  <Star className="size-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-slate-900">Current Streak</p>
                  <p className="text-slate-500 text-sm">Keep it up!</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-900">7 days</p>
                <p className="text-orange-600 text-sm">🔥</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-xl p-2">
                  <Trophy className="size-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-slate-900">Rank</p>
                  <p className="text-slate-500 text-sm">Top 10%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-900">#234</p>
                <p className="text-purple-600 text-sm">↑ 12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div>
          <h3 className="text-slate-900 mb-3">Settings</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Bell className="size-5 text-slate-600" />
                <span className="text-slate-900">Notifications</span>
              </div>
              <ChevronRight className="size-5 text-slate-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Settings className="size-5 text-slate-600" />
                <span className="text-slate-900">Account Settings</span>
              </div>
              <ChevronRight className="size-5 text-slate-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="size-5 text-slate-600" />
                <span className="text-slate-900">Help & Support</span>
              </div>
              <ChevronRight className="size-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="size-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
