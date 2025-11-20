import { GraduationCap, Sparkles } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-40 right-12 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-300"></div>
      </div>

      {/* Logo and branding */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="relative bg-white rounded-full p-8 shadow-2xl">
            <GraduationCap className="size-20 text-blue-600" strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-white text-5xl tracking-tight">
            EduCare
          </h1>
          <div className="flex items-center gap-2 justify-center">
            <Sparkles className="size-4 text-yellow-300" />
            <p className="text-blue-100 text-sm">Learn. Grow. Succeed.</p>
            <Sparkles className="size-4 text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}
