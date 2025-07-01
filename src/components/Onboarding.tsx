
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, Target, Bell, Award } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(15);
  const [reminders, setReminders] = useState(true);

  const steps = [
    {
      title: "Welcome to Basscally! 🎸",
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎸</div>
          <p className="text-lg text-gray-600">
            Your journey to bass mastery starts here. Learn, practice, and share with bassists worldwide!
          </p>
        </div>
      )
    },
    {
      title: "Set Your Daily Goal",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Target className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-gray-600 mb-6">How many minutes would you like to practice daily?</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[10, 15, 30, 45, 60, 90].map((minutes) => (
              <Button
                key={minutes}
                variant={dailyGoal === minutes ? "default" : "outline"}
                onClick={() => setDailyGoal(minutes)}
                className="h-16 text-lg"
              >
                {minutes}m
              </Button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Stay Motivated",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Bell className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-gray-600 mb-6">We'll send you friendly reminders to keep your streak alive!</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Daily Practice Reminders</span>
            <button
              onClick={() => setReminders(!reminders)}
              className={`w-12 h-6 rounded-full transition-colors ${
                reminders ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  reminders ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      )
    },
    {
      title: "You're All Set! 🎉",
      content: (
        <div className="text-center space-y-4">
          <Award className="w-16 h-16 text-primary mx-auto" />
          <p className="text-lg text-gray-600 mb-4">
            Congratulations! You've earned your first badge:
          </p>
          <Badge className="text-lg py-2 px-4 bg-primary text-white">
            🏆 New Bass Rookie
          </Badge>
          <p className="text-sm text-gray-500 mt-4">
            Ready to start your first lesson?
          </p>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{steps[step].title}</CardTitle>
          <div className="flex space-x-2 justify-center mt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= step ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {steps[step].content}
          
          <div className="flex space-x-3">
            {step > 0 && (
              <Button variant="outline" onClick={prevStep} className="flex-1">
                Back
              </Button>
            )}
            <Button onClick={nextStep} className="flex-1">
              {step === steps.length - 1 ? "Start Learning!" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
