import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageCircle,
  Mail,
  Phone,
  Book,
  Shield,
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';

interface HelpSupportScreenProps {
  onNavigate: (screen: string) => void;
}

export function HelpSupportScreen({ onNavigate }: HelpSupportScreenProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I start learning?',
      answer: 'Navigate to the home screen and choose any category (Alphabets, Numbers, Fruits, Animals, or Vegetables). Tap on any item to hear it spoken aloud. You can also watch educational videos or take quizzes to test your knowledge!'
    },
    {
      id: 2,
      question: 'How does the quiz system work?',
      answer: 'The quiz presents 10 random questions from all categories. You can choose from three difficulty levels: Easy, Medium, and Hard. Each correct answer earns you points that are saved to your profile. Try to beat your high score!'
    },
    {
      id: 3,
      question: 'Can I change my profile information?',
      answer: 'Yes! Go to your Profile, tap on Account Settings, and you can change your name, upload a profile photo, change your password, and more.'
    },
    {
      id: 4,
      question: 'How do I track my progress?',
      answer: 'Your profile shows your total points, courses completed, and achievements. Check the Learning Stats section to see your daily goals, current streak, and ranking.'
    },
    {
      id: 5,
      question: 'Are the educational videos safe for kids?',
      answer: 'Yes! All videos are carefully selected educational content from trusted sources. They are age-appropriate for children aged 2-6 and focus on learning alphabets, numbers, shapes, and colors.'
    },
    {
      id: 6,
      question: 'What if I forget my password?',
      answer: 'Currently, you can change your password from Account Settings if you remember your current password. If you\'ve forgotten it, please contact support at support@educare.app for assistance.'
    },
    {
      id: 7,
      question: 'How do I earn achievements?',
      answer: 'Achievements are unlocked by completing courses, maintaining learning streaks, scoring high in quizzes, and reaching milestones. Keep learning every day to unlock more badges!'
    },
    {
      id: 8,
      question: 'Can I use this app offline?',
      answer: 'Some features require an internet connection, especially videos and quiz submissions. However, once content is loaded, you can continue learning even if your connection is temporarily interrupted.'
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started Guide',
      description: 'Learn the basics of navigating EduCare',
      icon: '📚',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Using Text-to-Speech',
      description: 'How to make items speak aloud',
      icon: '🔊',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Taking Quizzes',
      description: 'Master the quiz system and earn points',
      icon: '🎯',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'Watching Videos',
      description: 'Access educational video content',
      icon: '📺',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6 pb-8 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('profile')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div>
            <h1 className="text-2xl">Help & Support</h1>
            <p className="text-cyan-100 text-sm">We're here to help you</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Contact */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-slate-900 mb-4 flex items-center gap-2">
            <MessageCircle className="size-5 text-cyan-600" />
            Contact Us
          </h3>
          
          <div className="space-y-3">
            <a 
              href="mailto:support@educare.app"
              className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <Mail className="size-5 text-blue-600" />
              <div>
                <p className="text-slate-900">Email Support</p>
                <p className="text-slate-600 text-sm">support@educare.app</p>
              </div>
            </a>

            <a 
              href="tel:+1234567890"
              className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <Phone className="size-5 text-green-600" />
              <div>
                <p className="text-slate-900">Phone Support</p>
                <p className="text-slate-600 text-sm">+1 (234) 567-890</p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
              <MessageCircle className="size-5 text-purple-600" />
              <div>
                <p className="text-slate-900">Live Chat</p>
                <p className="text-slate-600 text-sm">Available Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tutorials */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-slate-900 mb-3">Video Tutorials</h3>
          <div className="space-y-3">
            {tutorials.map((tutorial, index) => (
              <motion.button
                key={tutorial.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`size-14 rounded-xl bg-gradient-to-br ${tutorial.color} flex items-center justify-center text-2xl`}>
                    {tutorial.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-slate-900 mb-1">{tutorial.title}</h4>
                    <p className="text-slate-600 text-sm">{tutorial.description}</p>
                  </div>
                  <ExternalLink className="size-5 text-slate-400" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-slate-900 mb-3 flex items-center gap-2">
            <HelpCircle className="size-5 text-orange-600" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-slate-900 flex-1 pr-4">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="size-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="size-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Documentation Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-slate-900 mb-4 flex items-center gap-2">
            <Book className="size-5 text-indigo-600" />
            Documentation
          </h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-slate-600" />
                <span className="text-slate-900">User Guide</span>
              </div>
              <ExternalLink className="size-4 text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="size-5 text-slate-600" />
                <span className="text-slate-900">Privacy Policy</span>
              </div>
              <ExternalLink className="size-4 text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-slate-600" />
                <span className="text-slate-900">Terms of Service</span>
              </div>
              <ExternalLink className="size-4 text-slate-400" />
            </button>
          </div>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-md p-6 text-white"
        >
          <h3 className="mb-3">About EduCare</h3>
          <p className="text-cyan-50 text-sm mb-4">
            EduCare is a learning application designed for kids aged 2-6. We provide interactive educational content with text-to-speech functionality to make learning fun and engaging.
          </p>
          <div className="flex items-center justify-between text-cyan-100 text-sm">
            <span>Version 1.0.0</span>
            <span>© 2024 EduCare</span>
          </div>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-slate-900 mb-3">Send Feedback</h3>
          <p className="text-slate-600 text-sm mb-4">
            We'd love to hear your thoughts on how we can improve EduCare!
          </p>
          <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-colors">
            <MessageCircle className="size-4 inline mr-2" />
            Share Your Feedback
          </button>
        </motion.div>
      </div>
    </div>
  );
}
