
import React, { useState, useEffect } from 'react';
import Onboarding from '@/components/Onboarding';
import BottomNavigation from '@/components/BottomNavigation';
import PracticeLessons from '@/components/PracticeLessons';
import LearnSongs from '@/components/LearnSongs';
import PlayShare from '@/components/PlayShare';
import Profile from '@/components/Profile';
import { useUserProgress } from '@/hooks/useUserProgress';

const Index = () => {
  const [activeTab, setActiveTab] = useState('practice');
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

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    addBadge('New Bass Rookie');
    setShowOnboarding(false);
  };

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
    <div className="min-h-screen bg-background">
      {renderActiveTab()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
