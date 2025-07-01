
import React from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/10 to-orange-100 flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center space-y-6 animate-scale-in">
        <div className="text-8xl animate-pulse">🎸</div>
        <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
          Basscally
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
