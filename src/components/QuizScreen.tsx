import { useState } from 'react';
import { 
  Brain, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Trophy,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { User, Screen } from '../App';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface QuizScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
}

const quizData: Question[] = [
  {
    id: 1,
    question: 'What is the result of 15 + 27?',
    options: ['32', '42', '52', '62'],
    correctAnswer: 1,
    subject: 'Mathematics'
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    subject: 'Science'
  },
  {
    id: 3,
    question: 'What is the past tense of "go"?',
    options: ['Goed', 'Went', 'Gone', 'Goes'],
    correctAnswer: 1,
    subject: 'English'
  },
  {
    id: 4,
    question: 'What is 12 × 8?',
    options: ['84', '92', '96', '104'],
    correctAnswer: 2,
    subject: 'Mathematics'
  },
  {
    id: 5,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
    subject: 'Geography'
  }
];

type QuizState = 'start' | 'playing' | 'result';

export function QuizScreen({ user, onNavigate }: QuizScreenProps) {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizData.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const handleStartQuiz = () => {
    setQuizState('playing');
    setCurrentQuestion(0);
    setAnswers(new Array(quizData.length).fill(null));
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleSelectAnswer = (index: number) => {
    if (!showFeedback) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizState('result');
      }
    }, 1500);
  };

  const handleRetakeQuiz = () => {
    handleStartQuiz();
  };

  const calculateScore = () => {
    return answers.filter((answer, index) => answer === quizData[index].correctAnswer).length;
  };

  const score = calculateScore();
  const percentage = Math.round((score / quizData.length) * 100);
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  // Start Screen
  if (quizState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col p-6 pb-24">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-8 mb-6 shadow-2xl">
            <Brain className="size-20 text-white" />
          </div>
          
          <h1 className="text-slate-900 text-3xl mb-2 text-center">
            Daily Quiz Challenge
          </h1>
          <p className="text-slate-600 text-center mb-8">
            Test your knowledge across different subjects
          </p>

          <div className="w-full max-w-sm space-y-4 mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <div className="bg-blue-100 rounded-xl p-3">
                <Brain className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-900">Questions</p>
                <p className="text-slate-600 text-sm">{quizData.length} questions</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <div className="bg-purple-100 rounded-xl p-3">
                <Clock className="size-6 text-purple-600" />
              </div>
              <div>
                <p className="text-slate-900">Duration</p>
                <p className="text-slate-600 text-sm">5 minutes</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <div className="bg-orange-100 rounded-xl p-3">
                <Trophy className="size-6 text-orange-600" />
              </div>
              <div>
                <p className="text-slate-900">Points</p>
                <p className="text-slate-600 text-sm">20 points per question</p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleStartQuiz}
            className="w-full max-w-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            Start Quiz
            <ArrowRight className="size-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Result Screen
  if (quizState === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col p-6 pb-24">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className={`rounded-full p-8 mb-6 shadow-2xl ${
            percentage >= 70 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : percentage >= 50
              ? 'bg-gradient-to-br from-yellow-500 to-orange-600'
              : 'bg-gradient-to-br from-red-500 to-pink-600'
          }`}>
            <Trophy className="size-20 text-white" />
          </div>

          <h1 className="text-slate-900 text-3xl mb-2">Quiz Complete!</h1>
          <p className="text-slate-600 text-center mb-8">
            {percentage >= 70 
              ? 'Excellent work! Keep it up!' 
              : percentage >= 50
              ? 'Good effort! Practice makes perfect.'
              : 'Keep learning, you\'ll do better next time!'}
          </p>

          <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl mb-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-2">{percentage}%</div>
              <p className="text-slate-600">Your Score</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Correct Answers</span>
                <span className="text-green-600 flex items-center gap-2">
                  <CheckCircle2 className="size-5" />
                  {score}/{quizData.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Wrong Answers</span>
                <span className="text-red-600 flex items-center gap-2">
                  <XCircle className="size-5" />
                  {quizData.length - score}/{quizData.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-600">Points Earned</span>
                <span className="text-blue-600">+{score * 20} pts</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm space-y-3">
            <Button
              onClick={handleRetakeQuiz}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              <RotateCcw className="size-5 mr-2" />
              Retake Quiz
            </Button>
            <Button
              onClick={() => onNavigate('content')}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Back to Learning
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  const question = quizData[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm">Question {currentQuestion + 1}/{quizData.length}</p>
            <h2 className="text-white text-xl">{question.subject}</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <Clock className="size-4 text-white" />
            <span className="text-white">5:00</span>
          </div>
        </div>
        
        <Progress value={progress} className="h-2 bg-white/20" />
      </div>

      {/* Question */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-slate-900 text-xl mb-6">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              
              let buttonClass = 'w-full text-left p-4 rounded-xl border-2 transition-all ';
              
              if (showFeedback) {
                if (isSelected && isCorrect) {
                  buttonClass += 'border-green-500 bg-green-50 text-green-900';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'border-red-500 bg-red-50 text-red-900';
                } else if (isCorrectOption) {
                  buttonClass += 'border-green-500 bg-green-50 text-green-900';
                } else {
                  buttonClass += 'border-slate-200 bg-slate-50 text-slate-400';
                }
              } else {
                if (isSelected) {
                  buttonClass += 'border-blue-600 bg-blue-50 text-blue-900';
                } else {
                  buttonClass += 'border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-900';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={buttonClass}
                  disabled={showFeedback}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showFeedback && isSelected && (
                      isCorrect ? (
                        <CheckCircle2 className="size-6 text-green-600" />
                      ) : (
                        <XCircle className="size-6 text-red-600" />
                      )
                    )}
                    {showFeedback && !isSelected && isCorrectOption && (
                      <CheckCircle2 className="size-6 text-green-600" />
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
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            Submit Answer
            <ArrowRight className="size-5 ml-2" />
          </Button>
        )}

        {showFeedback && (
          <div className={`p-4 rounded-2xl ${
            isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
          }`}>
            <p className={`text-center ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
              {isCorrect ? '🎉 Correct! Well done!' : '❌ Incorrect. Keep learning!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
