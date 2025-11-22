import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Calendar, Cake, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ProfileCreationScreenProps {
  userId: string;
  userName: string;
  onComplete: (avatar: string, age: number, dob: string) => void;
}

export function ProfileCreationScreen({ userId, userName, onComplete }: ProfileCreationScreenProps) {
  const [step, setStep] = useState<'avatar' | 'details' | 'success'>('avatar');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const avatars = [
    { id: 'boy1', emoji: '👦', label: 'Boy 1', gender: 'male' },
    { id: 'boy2', emoji: '🧒', label: 'Boy 2', gender: 'male' },
    { id: 'boy3', emoji: '👨', label: 'Boy 3', gender: 'male' },
    { id: 'girl1', emoji: '👧', label: 'Girl 1', gender: 'female' },
    { id: 'girl2', emoji: '👩', label: 'Girl 2', gender: 'female' },
    { id: 'girl3', emoji: '🧑', label: 'Girl 3', gender: 'female' },
  ];

  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
  };

  const handleNextToDetails = () => {
    if (selectedAvatar) {
      setStep('details');
    }
  };

  const handleSubmitDetails = async () => {
    if (age && dob && !isSubmitting) {
      setIsSubmitting(true);
      // Call the parent's onComplete callback
      await onComplete(selectedAvatar, parseInt(age), dob);
      setStep('success');
      setIsSubmitting(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', duration: 0.5 }}
            className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6"
          >
            <Check className="size-12 text-white" strokeWidth={3} />
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-900 text-2xl mb-3"
          >
            Profile Created! 🎉
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 mb-8"
          >
            Welcome to EduCare, {userName}! Let's start learning together.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Continue to App
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (step === 'details') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col p-6">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <h2 className="text-slate-900 text-2xl mb-2 text-center">
              Tell us about yourself
            </h2>
            <p className="text-slate-600 text-center mb-8">
              Just a few more details
            </p>

            <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
              {/* Selected Avatar Display */}
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  className="text-6xl"
                >
                  {avatars.find(a => a.id === selectedAvatar)?.emoji}
                </motion.div>
              </div>

              {/* Age Input */}
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <div className="relative">
                  <Cake className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <Input
                    id="age"
                    type="number"
                    min="2"
                    max="6"
                    placeholder="Enter age (2-6)"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Date of Birth Input */}
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleSubmitDetails}
                  disabled={!age || !dob || isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating Profile...' : 'Complete Profile'}
                </Button>
                <Button
                  onClick={() => setStep('avatar')}
                  variant="outline"
                  className="w-full"
                >
                  Back to Avatar
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Avatar Selection Step
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-slate-900 text-2xl mb-2 text-center">
            Choose Your Avatar
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Pick your favorite character
          </p>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Male Avatars */}
            <div className="mb-6">
              <h3 className="text-slate-700 mb-3 flex items-center gap-2">
                <span className="text-blue-600">👦</span> Boys
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {avatars.filter(a => a.gender === 'male').map((avatar, index) => (
                  <motion.button
                    key={avatar.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAvatarSelect(avatar.id)}
                    className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-5xl transition-all ${
                      selectedAvatar === avatar.id
                        ? 'border-blue-600 bg-blue-50 shadow-lg'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {avatar.emoji}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Female Avatars */}
            <div className="mb-6">
              <h3 className="text-slate-700 mb-3 flex items-center gap-2">
                <span className="text-pink-600">👧</span> Girls
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {avatars.filter(a => a.gender === 'female').map((avatar, index) => (
                  <motion.button
                    key={avatar.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: (index + 3) * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAvatarSelect(avatar.id)}
                    className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-5xl transition-all ${
                      selectedAvatar === avatar.id
                        ? 'border-pink-600 bg-pink-50 shadow-lg'
                        : 'border-slate-200 hover:border-pink-300 hover:bg-pink-50'
                    }`}
                  >
                    {avatar.emoji}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleNextToDetails}
              disabled={!selectedAvatar}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 mt-4"
            >
              Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
