import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { ContentScreen } from './components/ContentScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { QuizScreen } from './components/QuizScreen';

export type Screen = 'splash' | 'auth' | 'content' | 'profile' | 'quiz';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  coursesCompleted: number;
  totalPoints: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate splash screen duration
    const timer = setTimeout(() => {
      setCurrentScreen('auth');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      coursesCompleted: 12,
      totalPoints: 2450
    };
    setUser(mockUser);
    setCurrentScreen('content');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock signup
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      coursesCompleted: 0,
      totalPoints: 0
    };
    setUser(mockUser);
    setCurrentScreen('content');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('auth');
  };

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile App Container */}
      <div className="mx-auto max-w-md min-h-screen bg-white shadow-xl relative">
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'auth' && (
          <AuthScreen onLogin={handleLogin} onSignup={handleSignup} />
        )}
        {currentScreen === 'content' && user && (
          <ContentScreen 
            user={user} 
            onNavigate={navigateToScreen}
          />
        )}
        {currentScreen === 'profile' && user && (
          <ProfileScreen 
            user={user} 
            onNavigate={navigateToScreen}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'quiz' && user && (
          <QuizScreen 
            user={user} 
            onNavigate={navigateToScreen}
          />
        )}

        {/* Bottom Navigation - Only show when logged in and not on splash/auth */}
        {user && currentScreen !== 'splash' && currentScreen !== 'auth' && (
          <BottomNavigation 
            currentScreen={currentScreen} 
            onNavigate={navigateToScreen}
          />
        )}
      </div>
    </div>
  );
}

function BottomNavigation({ 
  currentScreen, 
  onNavigate 
}: { 
  currentScreen: Screen; 
  onNavigate: (screen: Screen) => void;
}) {
  const navItems = [
    { screen: 'content' as Screen, icon: '📚', label: 'Learn' },
    { screen: 'quiz' as Screen, icon: '🎯', label: 'Quiz' },
    { screen: 'profile' as Screen, icon: '👤', label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 px-4 py-3 safe-area-inset-bottom">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentScreen === item.screen
                ? 'text-blue-600 bg-blue-50'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
