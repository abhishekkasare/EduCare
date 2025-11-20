import { useState, useEffect } from 'react';
import { 
  Star, 
  Trophy,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Volume2
} from 'lucide-react';
import { User, Screen } from '../App';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface QuizScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onUpdatePoints: (points: number) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  type: 'alphabet' | 'number' | 'counting';
  emoji: string;
}

// Kid-friendly quiz questions
const generateQuestions = (): Question[] => {
  return [
    {
      id: 1,
      question: 'Which letter comes after A?',
      options: ['B', 'C', 'D', 'Z'],
      correctAnswer: 0,
      type: 'alphabet',
      emoji: '🔤'
    },
    {
      id: 2,
      question: 'Count the stars: ⭐⭐⭐',
      options: ['2', '3', '4', '5'],
      correctAnswer: 1,
      type: 'counting',
      emoji: '⭐'
    },
    {
      id: 3,
      question: 'What number comes after 5?',
      options: ['4', '6', '7', '8'],
      correctAnswer: 1,
      type: 'number',
      emoji: '🔢'
    },
    {
      id: 4,
      question: 'Which is the first letter of the alphabet?',
      options: ['B', 'A', 'C', 'Z'],
      correctAnswer: 1,
      type: 'alphabet',
      emoji: '📝'
    },
    {
      id: 5,
      question: 'Count the apples: 🍎🍎🍎🍎🍎',
      options: ['3', '4', '5', '6'],
      correctAnswer: 2,
      type: 'counting',
      emoji: '🍎'
    },
    {
      id: 6,
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      type: 'number',
      emoji: '➕'
    },
    {
      id: 7,
      question: 'Which letter comes before C?',
      options: ['A', 'B', 'D', 'E'],
      correctAnswer: 1,
      type: 'alphabet',
      emoji: '🔤'
    },
    {
      id: 8,
      question: 'Count the balloons: 🎈🎈',
      options: ['1', '2', '3', '4'],
      correctAnswer: 1,
      type: 'counting',
      emoji: '🎈'
    }
  ];
};

type QuizState = 'start' | 'playing' | 'result';

export function QuizScreen({ user, onNavigate, onUpdatePoints }: QuizScreenProps) {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [celebration, setCelebration] = useState(false);

  useEffect(() => {
    if (quizState === 'start') {
      setQuestions(generateQuestions());
    }
  }, [quizState]);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const handleStartQuiz = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setQuizState('playing');
    setCurrentQuestion(0);
    setAnswers(new Array(newQuestions.length).fill(null));
    setSelectedAnswer(null);
    setShowFeedback(false);
    speak('Let\'s start the quiz! Good luck!');
  };

  const handleSelectAnswer = (index: number) => {
    if (!showFeedback) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || questions.length === 0) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setShowFeedback(true);

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      speak('Great job! That\'s correct!');
      setCelebration(true);
      setTimeout(() => setCelebration(false), 1000);
    } else {
      speak('Oops! Try again next time!');
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizState('result');
        const finalScore = newAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
        const pointsEarned = finalScore * 50;
        onUpdatePoints(pointsEarned);
        if (finalScore >= questions.length * 0.7) {
          speak('Wow! You did amazing! You\'re a superstar!');
        } else {
          speak('Good try! Keep practicing and you\'ll do even better!');
        }
      }
    }, 2000);
  };

  const handleRetakeQuiz = () => {
    handleStartQuiz();
  };

  const calculateScore = () => {
    if (questions.length === 0) return 0;
    return answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
  };

  const score = calculateScore();
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const earnedPoints = score * 50;

  // Start Screen
  if (quizState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex flex-col p-6 pb-24">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full p-8 shadow-2xl">
              <Trophy className="size-20 text-white" />
            </div>
          </div>
          
          <h1 className="text-slate-900 text-4xl mb-2 text-center">
            Fun Quiz Time! 🎉
          </h1>
          <p className="text-slate-600 text-center mb-8 text-lg">
            Answer questions and collect stars!
          </p>

          <div className="w-full max-w-sm space-y-4 mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl p-4">
                  <Sparkles className="size-8 text-white" />
                </div>
                <div>
                  <p className="text-slate-900 text-lg">Fun Questions</p>
                  <p className="text-slate-600">Answer and learn!</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl p-4">
                  <Star className="size-8 text-white fill-white" />
                </div>
                <div>
                  <p className="text-slate-900 text-lg">Earn Points</p>
                  <p className="text-slate-600">50 points per answer!</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full max-w-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white py-5 rounded-3xl shadow-2xl hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-xl"
          >
            <span>Start Quiz</span>
            <ArrowRight className="size-6" />
          </button>
        </div>
      </div>
    );
  }

  // Result Screen
  if (quizState === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex flex-col p-6 pb-24">
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Animated Trophy */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div className={`relative rounded-full p-8 shadow-2xl animate-bounce ${
              percentage >= 70 
                ? 'bg-gradient-to-br from-yellow-400 to-orange-400' 
                : 'bg-gradient-to-br from-blue-400 to-purple-400'
            }`}>
              <Trophy className="size-20 text-white" />
            </div>
          </div>

          <h1 className="text-slate-900 text-4xl mb-2">
            {percentage >= 70 ? 'Awesome! 🎉' : 'Great Try! 🌟'}
          </h1>
          <p className="text-slate-600 text-center mb-8 text-lg">
            {percentage >= 70 
              ? 'You\'re a superstar!' 
              : 'Keep learning, you\'re doing great!'}
          </p>

          <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl mb-8">
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">{percentage >= 70 ? '⭐' : '🌟'}</div>
              <div className="text-6xl mb-2">{score}/{questions.length}</div>
              <p className="text-slate-600 text-lg">Correct Answers!</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 flex justify-between items-center">
                <span className="text-slate-700 flex items-center gap-2">
                  <Star className="size-6 fill-yellow-500 text-yellow-500" />
                  <span className="text-lg">Points Earned</span>
                </span>
                <span className="text-orange-600 text-2xl">+{earnedPoints}</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[...Array(score)].map((_, i) => (
                  <div key={i} className="text-center text-4xl animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                    ⭐
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm space-y-3">
            <Button
              onClick={handleRetakeQuiz}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg rounded-2xl"
              size="lg"
            >
              <RotateCcw className="size-6 mr-2" />
              Play Again
            </Button>
            <Button
              onClick={() => onNavigate('content')}
              variant="outline"
              className="w-full py-6 text-lg rounded-2xl"
              size="lg"
            >
              Keep Learning
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (questions.length === 0) return null;
  
  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* Celebration Confetti */}
      {celebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-8xl animate-ping">🎉</div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/90 text-sm">Question {currentQuestion + 1} of {questions.length}</p>
            <h2 className="text-white text-2xl flex items-center gap-2">
              <span>{question.emoji}</span>
              <span>Quiz Time!</span>
            </h2>
          </div>
          <button
            onClick={() => speak(question.question)}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
          >
            <Volume2 className="size-6 text-white" />
          </button>
        </div>
        
        <Progress value={progress} className="h-3 bg-white/20 rounded-full" />
        
        {/* Star Progress */}
        <div className="flex gap-2 mt-3 justify-center">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`size-8 rounded-full flex items-center justify-center transition-all ${
                index < currentQuestion
                  ? answers[index] === questions[index].correctAnswer
                    ? 'bg-yellow-400 scale-110'
                    : 'bg-slate-300'
                  : index === currentQuestion
                  ? 'bg-white scale-125'
                  : 'bg-white/50'
              }`}
            >
              {index < currentQuestion && answers[index] === questions[index].correctAnswer && (
                <Star className="size-5 fill-white text-white" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h3 className="text-slate-900 text-2xl mb-6 text-center">{question.question}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              
              let buttonClass = 'p-6 rounded-3xl border-4 transition-all text-2xl ';
              
              if (showFeedback) {
                if (isSelected && isCorrect) {
                  buttonClass += 'border-green-500 bg-green-100 text-green-900 scale-105';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'border-red-500 bg-red-100 text-red-900';
                } else if (isCorrectOption) {
                  buttonClass += 'border-green-500 bg-green-100 text-green-900 scale-105';
                } else {
                  buttonClass += 'border-slate-200 bg-slate-50 text-slate-400';
                }
              } else {
                if (isSelected) {
                  buttonClass += 'border-purple-500 bg-purple-100 text-purple-900 scale-105';
                } else {
                  buttonClass += 'border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-900 hover:scale-105';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={buttonClass}
                  disabled={showFeedback}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">{option}</span>
                    {showFeedback && isCorrectOption && (
                      <span className="text-2xl">⭐</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {!showFeedback && (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6 text-xl rounded-3xl"
            size="lg"
          >
            <span>Check Answer</span>
            <ArrowRight className="size-6 ml-2" />
          </Button>
        )}

        {showFeedback && (
          <div className={`p-6 rounded-3xl text-center ${
            isCorrect 
              ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
              : 'bg-gradient-to-r from-orange-400 to-yellow-400'
          }`}>
            <p className="text-white text-2xl mb-2">
              {isCorrect ? '🎉 Correct!' : '💪 Keep trying!'}
            </p>
            <p className="text-white">
              {isCorrect ? 'You\'re amazing!' : 'You\'ll get it next time!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}