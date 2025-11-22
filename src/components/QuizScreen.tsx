import { useState, useEffect } from 'react';
import { 
  Star, 
  Trophy,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Volume2,
  Zap
} from 'lucide-react';
import { User, Screen } from '../App';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface QuizScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onUpdatePoints: (points: number) => void;
}

type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  type: 'alphabet' | 'number' | 'counting' | 'math';
  difficulty: Difficulty;
  emoji: string;
  points: number;
}

// Comprehensive question bank
const questionBank: Question[] = [
  // EASY QUESTIONS
  { id: 1, question: 'Which letter comes after A?', options: ['B', 'C', 'D', 'Z'], correctAnswer: 0, type: 'alphabet', difficulty: 'easy', emoji: '🔤', points: 50 },
  { id: 2, question: 'Count the stars: ⭐⭐⭐', options: ['2', '3', '4', '5'], correctAnswer: 1, type: 'counting', difficulty: 'easy', emoji: '⭐', points: 50 },
  { id: 3, question: 'What number comes after 5?', options: ['4', '6', '7', '8'], correctAnswer: 1, type: 'number', difficulty: 'easy', emoji: '🔢', points: 50 },
  { id: 4, question: 'Which is the first letter of the alphabet?', options: ['B', 'A', 'C', 'Z'], correctAnswer: 1, type: 'alphabet', difficulty: 'easy', emoji: '📝', points: 50 },
  { id: 5, question: 'Count the apples: 🍎🍎🍎🍎🍎', options: ['3', '4', '5', '6'], correctAnswer: 2, type: 'counting', difficulty: 'easy', emoji: '🍎', points: 50 },
  { id: 6, question: 'What is 1 + 1?', options: ['1', '2', '3', '4'], correctAnswer: 1, type: 'math', difficulty: 'easy', emoji: '➕', points: 50 },
  { id: 7, question: 'Count the balloons: 🎈🎈', options: ['1', '2', '3', '4'], correctAnswer: 1, type: 'counting', difficulty: 'easy', emoji: '🎈', points: 50 },
  { id: 8, question: 'What comes before B?', options: ['A', 'C', 'D', 'E'], correctAnswer: 0, type: 'alphabet', difficulty: 'easy', emoji: '🔤', points: 50 },
  { id: 9, question: 'How many hearts? ❤️', options: ['0', '1', '2', '3'], correctAnswer: 1, type: 'counting', difficulty: 'easy', emoji: '❤️', points: 50 },
  { id: 10, question: 'What is 2 + 1?', options: ['1', '2', '3', '4'], correctAnswer: 2, type: 'math', difficulty: 'easy', emoji: '➕', points: 50 },
  { id: 11, question: 'Which letter comes after C?', options: ['A', 'B', 'D', 'E'], correctAnswer: 2, type: 'alphabet', difficulty: 'easy', emoji: '🔤', points: 50 },
  { id: 12, question: 'Count the dogs: 🐕🐕🐕🐕', options: ['3', '4', '5', '6'], correctAnswer: 1, type: 'counting', difficulty: 'easy', emoji: '🐕', points: 50 },
  { id: 13, question: 'What number is this? 🔟', options: ['5', '10', '15', '20'], correctAnswer: 1, type: 'number', difficulty: 'easy', emoji: '🔢', points: 50 },
  { id: 14, question: 'What is the last letter of the alphabet?', options: ['X', 'Y', 'Z', 'W'], correctAnswer: 2, type: 'alphabet', difficulty: 'easy', emoji: '🔤', points: 50 },
  { id: 15, question: 'Count the cats: 🐱🐱🐱', options: ['2', '3', '4', '5'], correctAnswer: 1, type: 'counting', difficulty: 'easy', emoji: '🐱', points: 50 },
  
  // MEDIUM QUESTIONS
  { id: 16, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: 1, type: 'math', difficulty: 'medium', emoji: '➕', points: 75 },
  { id: 17, question: 'Which letter comes before C?', options: ['A', 'B', 'D', 'E'], correctAnswer: 1, type: 'alphabet', difficulty: 'medium', emoji: '🔤', points: 75 },
  { id: 18, question: 'What is 5 - 2?', options: ['2', '3', '4', '5'], correctAnswer: 1, type: 'math', difficulty: 'medium', emoji: '➖', points: 75 },
  { id: 19, question: 'Count ALL the fruits: 🍎🍊🍎🍊🍎🍊', options: ['4', '5', '6', '7'], correctAnswer: 2, type: 'counting', difficulty: 'medium', emoji: '🍎', points: 75 },
  { id: 20, question: 'What comes after 10?', options: ['9', '10', '11', '12'], correctAnswer: 2, type: 'number', difficulty: 'medium', emoji: '🔢', points: 75 },
  { id: 21, question: 'Which letter is between F and H?', options: ['E', 'F', 'G', 'H'], correctAnswer: 2, type: 'alphabet', difficulty: 'medium', emoji: '🔤', points: 75 },
  { id: 22, question: 'What is 3 + 3?', options: ['5', '6', '7', '8'], correctAnswer: 1, type: 'math', difficulty: 'medium', emoji: '➕', points: 75 },
  { id: 23, question: 'Count the items: ⚽🎈⚽🎈⚽', options: ['4', '5', '6', '7'], correctAnswer: 1, type: 'counting', difficulty: 'medium', emoji: '⚽', points: 75 },
  { id: 24, question: 'What is 4 + 2?', options: ['5', '6', '7', '8'], correctAnswer: 1, type: 'math', difficulty: 'medium', emoji: '➕', points: 75 },
  { id: 25, question: 'Which vowel comes after I?', options: ['A', 'E', 'O', 'U'], correctAnswer: 2, type: 'alphabet', difficulty: 'medium', emoji: '🔤', points: 75 },
  { id: 26, question: 'What is 7 - 3?', options: ['3', '4', '5', '6'], correctAnswer: 1, type: 'math', difficulty: 'medium', emoji: '➖', points: 75 },
  { id: 27, question: 'Count: 🌟🌟🌟🌟🌟🌟🌟', options: ['5', '6', '7', '8'], correctAnswer: 2, type: 'counting', difficulty: 'medium', emoji: '🌟', points: 75 },
  { id: 28, question: 'What comes before 20?', options: ['18', '19', '20', '21'], correctAnswer: 1, type: 'number', difficulty: 'medium', emoji: '🔢', points: 75 },
  { id: 29, question: 'What is 5 + 3?', options: ['6', '7', '8', '9'], correctAnswer: 2, type: 'math', difficulty: 'medium', emoji: '➕', points: 75 },
  { id: 30, question: 'Which letter is between M and O?', options: ['L', 'M', 'N', 'O'], correctAnswer: 2, type: 'alphabet', difficulty: 'medium', emoji: '🔤', points: 75 },
  
  // HARD QUESTIONS
  { id: 31, question: 'What is 5 + 5?', options: ['8', '9', '10', '11'], correctAnswer: 2, type: 'math', difficulty: 'hard', emoji: '➕', points: 100 },
  { id: 32, question: 'Which letter comes 3 letters after M?', options: ['N', 'O', 'P', 'Q'], correctAnswer: 2, type: 'alphabet', difficulty: 'hard', emoji: '🔤', points: 100 },
  { id: 33, question: 'What is 10 - 4?', options: ['5', '6', '7', '8'], correctAnswer: 1, type: 'math', difficulty: 'hard', emoji: '➖', points: 100 },
  { id: 34, question: 'Count all: 🍎🍊🍎🍊🍎🍊🍎🍊🍎', options: ['7', '8', '9', '10'], correctAnswer: 2, type: 'counting', difficulty: 'hard', emoji: '🍎', points: 100 },
  { id: 35, question: 'What comes after 25?', options: ['24', '25', '26', '27'], correctAnswer: 2, type: 'number', difficulty: 'hard', emoji: '🔢', points: 100 },
  { id: 36, question: 'What is 6 + 6?', options: ['10', '11', '12', '13'], correctAnswer: 2, type: 'math', difficulty: 'hard', emoji: '➕', points: 100 },
  { id: 37, question: 'Which vowel comes before O?', options: ['A', 'E', 'I', 'U'], correctAnswer: 2, type: 'alphabet', difficulty: 'hard', emoji: '🔤', points: 100 },
  { id: 38, question: 'What is 9 - 5?', options: ['3', '4', '5', '6'], correctAnswer: 1, type: 'math', difficulty: 'hard', emoji: '➖', points: 100 },
  { id: 39, question: 'Count: 🎈🎈🎈🎈🎈🎈🎈🎈', options: ['6', '7', '8', '9'], correctAnswer: 2, type: 'counting', difficulty: 'hard', emoji: '🎈', points: 100 },
  { id: 40, question: 'What is 7 + 7?', options: ['12', '13', '14', '15'], correctAnswer: 2, type: 'math', difficulty: 'hard', emoji: '➕', points: 100 },
  { id: 41, question: 'Which letter is 2 letters before T?', options: ['P', 'Q', 'R', 'S'], correctAnswer: 2, type: 'alphabet', difficulty: 'hard', emoji: '🔤', points: 100 },
  { id: 42, question: 'What is 8 + 4?', options: ['10', '11', '12', '13'], correctAnswer: 2, type: 'math', difficulty: 'hard', emoji: '➕', points: 100 },
  { id: 43, question: 'What comes before 50?', options: ['48', '49', '50', '51'], correctAnswer: 1, type: 'number', difficulty: 'hard', emoji: '🔢', points: 100 },
  { id: 44, question: 'What is 10 - 7?', options: ['2', '3', '4', '5'], correctAnswer: 1, type: 'math', difficulty: 'hard', emoji: '➖', points: 100 },
  { id: 45, question: 'Count: 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟', options: ['8', '9', '10', '11'], correctAnswer: 2, type: 'counting', difficulty: 'hard', emoji: '🌟', points: 100 },
];

// Function to randomly select 10 questions with mixed difficulty
const getRandomQuestions = (): Question[] => {
  const easy = questionBank.filter(q => q.difficulty === 'easy');
  const medium = questionBank.filter(q => q.difficulty === 'medium');
  const hard = questionBank.filter(q => q.difficulty === 'hard');
  
  // Select 4 easy, 4 medium, 2 hard questions
  const selectedEasy = easy.sort(() => Math.random() - 0.5).slice(0, 4);
  const selectedMedium = medium.sort(() => Math.random() - 0.5).slice(0, 4);
  const selectedHard = hard.sort(() => Math.random() - 0.5).slice(0, 2);
  
  // Combine and shuffle
  const allQuestions = [...selectedEasy, ...selectedMedium, ...selectedHard];
  return allQuestions.sort(() => Math.random() - 0.5);
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
      setQuestions(getRandomQuestions());
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
    const newQuestions = getRandomQuestions();
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
        const pointsEarned = newAnswers.reduce((total, answer, index) => {
          if (answer === questions[index].correctAnswer) {
            return total + questions[index].points;
          }
          return total;
        }, 0);
        onUpdatePoints(pointsEarned);
        const finalScore = newAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
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

  const calculateTotalPoints = () => {
    return answers.reduce((total, answer, index) => {
      if (answer === questions[index].correctAnswer) {
        return total + questions[index].points;
      }
      return total;
    }, 0);
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
    }
  };

  const getDifficultyLabel = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return '⭐ Easy';
      case 'medium': return '⭐⭐ Medium';
      case 'hard': return '⭐⭐⭐ Hard';
    }
  };

  const score = calculateScore();
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const earnedPoints = calculateTotalPoints();

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
            Answer 10 random questions and collect stars!
          </p>

          <div className="w-full max-w-sm space-y-4 mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl p-4">
                  <Sparkles className="size-8 text-white" />
                </div>
                <div>
                  <p className="text-slate-900 text-lg">10 Questions</p>
                  <p className="text-slate-600">Random every time!</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500">⭐ Easy</Badge>
                  <span className="text-slate-600 text-sm">50 points each</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-500">⭐⭐ Medium</Badge>
                  <span className="text-slate-600 text-sm">75 points each</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-500">⭐⭐⭐ Hard</Badge>
                  <span className="text-slate-600 text-sm">100 points each</span>
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
              <div className="text-6xl mb-2">{score}/10</div>
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

              <div className="grid grid-cols-5 gap-2">
                {[...Array(score)].map((_, i) => (
                  <div key={i} className="text-center text-3xl animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
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
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-white/90 text-sm">Question {currentQuestion + 1} of 10</p>
              <Badge className={getDifficultyColor(question.difficulty)}>
                {getDifficultyLabel(question.difficulty)}
              </Badge>
            </div>
            <h2 className="text-white text-xl flex items-center gap-2">
              <span>{question.emoji}</span>
              <span>Quiz Time!</span>
              <Zap className="size-5 text-yellow-300" />
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
        <div className="flex gap-2 mt-3 justify-center flex-wrap">
          {questions.map((q, index) => (
            <div
              key={index}
              className={`size-7 rounded-full flex items-center justify-center transition-all ${
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
                <Star className="size-4 fill-white text-white" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 text-2xl text-center flex-1">{question.question}</h3>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl px-3 py-2 ml-2">
              <p className="text-purple-700 text-sm">+{question.points}</p>
            </div>
          </div>
          
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
              {isCorrect ? `You earned ${question.points} points!` : 'You\'ll get it next time!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
