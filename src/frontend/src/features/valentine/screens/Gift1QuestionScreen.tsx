import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineGif } from '../components/ValentineGif';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import { X, ArrowRight } from 'lucide-react';
import type { Screen } from '../ValentineFlow';

interface Gift1QuestionScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function Gift1QuestionScreen({ onNavigate }: Gift1QuestionScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrectPopup, setShowCorrectPopup] = useState(false);
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);

  const handleAnswerClick = (optionIndex: number) => {
    // Clear previous feedback when user tries again
    setShowIncorrectMessage(false);
    setSelectedAnswer(null);
    
    const correctAnswer = STRINGS.quizQuestions[currentQuestion].correctAnswer;
    
    if (optionIndex === correctAnswer) {
      // Correct answer
      setShowCorrectPopup(true);
    } else {
      // Wrong answer - show red indicator and incorrect message
      setSelectedAnswer(optionIndex);
      setShowIncorrectMessage(true);
    }
  };

  const handleContinue = () => {
    setShowCorrectPopup(false);
    setSelectedAnswer(null);
    setShowIncorrectMessage(false);
    
    if (currentQuestion < STRINGS.quizQuestions.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, navigate to gift2 (not success)
      onNavigate('gift2');
    }
  };

  const handleNextQuestion = () => {
    // Clear feedback state when advancing
    setShowIncorrectMessage(false);
    setSelectedAnswer(null);
    
    if (currentQuestion < STRINGS.quizQuestions.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question, proceed to gift2
      onNavigate('gift2');
    }
  };

  const question = STRINGS.quizQuestions[currentQuestion];
  const currentQuestionGif = ASSETS.quizQuestionGifs[currentQuestion] || ASSETS.roseGif;

  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="mb-2">
          <span className="text-sm font-medium text-pink-500 dark:text-pink-400">
            Question {currentQuestion + 1} of {STRINGS.quizQuestions.length}
          </span>
        </div>
        
        <div className="my-4">
          <ValentineGif
            src={currentQuestionGif}
            alt={`Question ${currentQuestion + 1} GIF`}
            fallbackText={STRINGS.quizGifFallback}
            className="h-auto w-48 rounded-2xl"
          />
        </div>
        
        <div key={currentQuestion} className="question-transition w-full space-y-4">
          <h2 className="valentine-title text-2xl font-bold text-pink-600 dark:text-pink-400 sm:text-3xl md:text-4xl">
            {question.question}
          </h2>
          
          {/* Next Question Button - placed directly below question */}
          <div className="flex justify-center">
            <Button
              onClick={handleNextQuestion}
              size="lg"
              variant="outline"
              className="valentine-button-outline group"
            >
              Next Question
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        
        {/* Incorrect Answer Message */}
        {showIncorrectMessage && (
          <div className="incorrect-message w-full rounded-lg border-2 border-red-500 bg-red-50 p-4 text-center dark:bg-red-950/30">
            <p className="whitespace-pre-line text-lg font-semibold text-red-600 dark:text-red-400">
              {STRINGS.incorrectAnswerMessage}
            </p>
          </div>
        )}
        
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {question.options.map((option, index) => {
            const isWrong = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            
            return (
              <Button
                key={index}
                onClick={() => handleAnswerClick(index)}
                size="lg"
                variant={isWrong ? 'destructive' : isCorrect && selectedAnswer !== null ? 'default' : 'outline'}
                className={`valentine-button-outline relative text-lg ${
                  isWrong ? 'border-red-500 bg-red-500 text-white hover:bg-red-600' : ''
                }`}
              >
                {option}
                {isWrong && (
                  <X className="ml-2 h-5 w-5" />
                )}
              </Button>
            );
          })}
        </div>
        
        <ValentineBackNextControls
          currentScreen="gift1"
          onNavigate={onNavigate}
        />
      </div>

      <Dialog open={showCorrectPopup} onOpenChange={setShowCorrectPopup}>
        <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-pink-600 dark:text-pink-400">
              {STRINGS.correctAnswerMessage}
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              {currentQuestion < STRINGS.quizQuestions.length - 1 
                ? 'Ready for the next question?' 
                : 'You completed the quiz!'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              size="lg"
              className="valentine-button"
            >
              {currentQuestion < STRINGS.quizQuestions.length - 1 ? 'Next Question' : 'Continue'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ValentineLayout>
  );
}
