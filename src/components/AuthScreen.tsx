import { useState } from 'react';
import { GraduationCap, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AuthScreenProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}

export function AuthScreen({ onLogin, onSignup }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(formData.email, formData.password);
    } else {
      onSignup(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col p-6">
      {/* Header */}
      <div className="flex flex-col items-center pt-12 pb-8">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-4 mb-4 shadow-lg">
          <GraduationCap className="size-12 text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-slate-900 text-3xl mb-2">
          Welcome to EduCare
        </h1>
        <p className="text-slate-600 text-center">
          {isLogin ? 'Sign in to continue learning' : 'Create an account to start learning'}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          {/* Toggle Tabs */}
          <div className="flex bg-slate-100 rounded-full p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-full transition-all ${
                isLogin 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-full transition-all ${
                !isLogin 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field - only for signup */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password - only for login */}
            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}