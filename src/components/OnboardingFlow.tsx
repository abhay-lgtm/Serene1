import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, BookOpen, Palette, Film, Heart } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const questions = [
    {
      icon: <Music className="w-8 h-8 text-wellness-primary" />,
      title: "What kind of music do you enjoy for relaxation?",
      options: [
        "Soft instrumental",
        "Nature sounds (rain, ocean, birds)",
        "Classical music",
        "Meditation chants",
        "Lo-fi beats"
      ]
    },
    {
      icon: <Heart className="w-8 h-8 text-wellness-secondary" />,
      title: "Which daily habits are part of your routine?",
      options: [
        "Reading",
        "Exercising",
        "Journaling",
        "Meditation/Yoga",
        "Spending time on social media"
      ]
    },
    {
      icon: <Palette className="w-8 h-8 text-wellness-accent" />,
      title: "What are your hobbies or activities you enjoy most?",
      options: [
        "Painting/Drawing",
        "Gaming",
        "Listening to music",
        "Watching movies/series",
        "Exploring outdoors"
      ]
    },
    {
      icon: <Film className="w-8 h-8 text-wellness-primary" />,
      title: "What types of movies or shows do you usually prefer?",
      options: [
        "Comedy",
        "Motivational/Inspirational",
        "Nature & Travel",
        "Sci-fi/Fantasy",
        "Drama/Romance"
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8 text-wellness-secondary" />,
      title: "How do you usually handle stress?",
      options: [
        "Talking with friends/family",
        "Playing games",
        "Listening to music",
        "Meditating or relaxing in silence",
        "Engaging in hobbies"
      ]
    }
  ];

  const currentQuestionData = questions[currentQuestion];
  const selectedAnswers = answers[currentQuestion] || [];

  const handleOptionSelect = (option: string) => {
    const currentAnswers = answers[currentQuestion] || [];
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];
    
    setAnswers({
      ...answers,
      [currentQuestion]: newAnswers
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Store preferences in localStorage or send to backend
      localStorage.setItem('userPreferences', JSON.stringify(answers));
      onComplete();
    }
  };

  const isNextEnabled = selectedAnswers.length > 0;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-8 wellness-card">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-wellness-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-wellness-primary to-wellness-secondary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {currentQuestionData.icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
            {currentQuestionData.title}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                selectedAnswers.includes(option)
                  ? 'bg-wellness-primary/10 border-wellness-primary text-wellness-primary font-medium'
                  : 'bg-white border-border hover:border-wellness-primary/50 hover:bg-wellness-primary/5'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                  selectedAnswers.includes(option)
                    ? 'bg-wellness-primary border-wellness-primary'
                    : 'border-muted-foreground'
                }`}>
                  {selectedAnswers.includes(option) && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
                {option}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isNextEnabled}
            className="wellness-button px-6"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Setup' : 'Next'}
          </Button>
        </div>

        {/* Selected count */}
        {selectedAnswers.length > 0 && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            {selectedAnswers.length} option{selectedAnswers.length > 1 ? 's' : ''} selected
          </p>
        )}
      </Card>
    </div>
  );
};

export default OnboardingFlow;