import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  User as UserIcon, 
  Mail, 
  Camera, 
  Lock,
  Globe,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';

interface AccountSettingsScreenProps {
  user: User;
  accessToken: string | null;
  onNavigate: (screen: string) => void;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

export function AccountSettingsScreen({ 
  user, 
  accessToken,
  onNavigate, 
  onUpdateUser,
  onLogout 
}: AccountSettingsScreenProps) {
  const [name, setName] = useState(user.name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [language, setLanguage] = useState('English');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      alert('Name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (profilePhoto) {
        formData.append('photo', profilePhoto);
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-97f4c85e/update-profile`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to update profile');
        return;
      }

      onUpdateUser(data.user);
      alert('Profile updated successfully!');
      setPhotoPreview(null);
      setProfilePhoto(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-97f4c85e/change-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ 
            currentPassword, 
            newPassword 
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to change password');
        return;
      }

      alert('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.'
    );

    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      'This is your final warning. Your account and all data will be permanently deleted. Are you absolutely sure?'
    );

    if (!doubleConfirm) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-97f4c85e/delete-account`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Failed to delete account');
        return;
      }

      alert('Account deleted successfully');
      onLogout();
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 pb-8 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('profile')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div>
            <h1 className="text-2xl">Account Settings</h1>
            <p className="text-blue-100 text-sm">Manage your account</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Photo Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-slate-900 mb-4 flex items-center gap-2">
            <Camera className="size-5 text-purple-600" />
            Profile Photo
          </h3>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              {photoPreview || user.avatar ? (
                <div className="size-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {user.avatar}
                    </div>
                  )}
                </div>
              ) : (
                <div className="size-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <UserIcon className="size-12 text-white" />
                </div>
              )}
              <label 
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors shadow-lg"
              >
                <Camera className="size-4" />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <p className="text-slate-900 mb-1">Choose a profile photo</p>
              <p className="text-slate-500 text-sm">Max size: 5MB</p>
              {photoPreview && (
                <Button
                  onClick={() => {
                    setPhotoPreview(null);
                    setProfilePhoto(null);
                  }}
                  variant="ghost"
                  className="mt-2 text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Name Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-slate-900 mb-4 flex items-center gap-2">
            <UserIcon className="size-5 text-blue-600" />
            Your Name
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email (Cannot be changed)</Label>
              <Input
                id="email"
                value={user.email}
                disabled
                className="mt-1 bg-slate-50"
              />
            </div>

            <Button
              onClick={handleUpdateProfile}
              disabled={loading || (!photoPreview && name === user.name)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Save className="size-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </motion.div>

        {/* Password Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-slate-900 mb-4 flex items-center gap-2">
            <Lock className="size-5 text-orange-600" />
            Change Password
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative mt-1">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative mt-1">
                <Input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="mt-1"
              />
            </div>

            <Button
              onClick={handleChangePassword}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              <Lock className="size-4 mr-2" />
              Update Password
            </Button>
          </div>
        </motion.div>

        {/* Language Preference */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-slate-900 mb-4 flex items-center gap-2">
            <Globe className="size-5 text-green-600" />
            Language Preference
          </h3>
          
          <div className="space-y-3">
            {['English', 'Spanish', 'French', 'German', 'Hindi'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`w-full text-left p-3 rounded-xl transition-colors ${
                  language === lang
                    ? 'bg-green-50 text-green-700 border-2 border-green-500'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {lang}
              </button>
            ))}
            <p className="text-slate-500 text-sm mt-2">
              Note: Currently only English is supported. More languages coming soon!
            </p>
          </div>
        </motion.div>

        {/* Delete Account Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-6 border-2 border-red-200"
        >
          <h3 className="text-red-600 mb-4 flex items-center gap-2">
            <Trash2 className="size-5" />
            Danger Zone
          </h3>
          
          <p className="text-slate-600 text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>

          <Button
            onClick={handleDeleteAccount}
            disabled={loading}
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400"
          >
            <Trash2 className="size-4 mr-2" />
            Delete My Account
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
