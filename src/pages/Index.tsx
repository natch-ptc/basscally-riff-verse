
import React, { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Onboarding from '@/components/Onboarding';
import BottomNavigation from '@/components/BottomNavigation';
import PracticeLessons from '@/components/PracticeLessons';
import LearnSongs from '@/components/LearnSongs';
import PlayShare from '@/components/PlayShare';
import Profile from '@/components/Profile';
import { useUserProgress } from '@/hooks/useUserProgress';

const Index = () => {
  const [activeTab, setActiveTab] = useState('practice');
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const { updateStreak, addBadge } = useUserProgress();

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (hasCompletedOnboarding) {
      setShowOnboarding(false);
    }

    // Update streak on app load
    updateStreak();
  }, [updateStreak]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    addBadge('New Bass Rookie');
    setShowOnboarding(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'practice':
        return <PracticeLessons />;
      case 'songs':
        return <LearnSongs />;
      case 'share':
        return <PlayShare />;
      case 'profile':
        return <Profile />;
      default:
        return <PracticeLessons />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {renderActiveTab()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
