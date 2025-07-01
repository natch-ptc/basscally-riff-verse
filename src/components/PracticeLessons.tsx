import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { toast } from '@/hooks/use-toast';
import LessonTimelineTree from '@/components/LessonTimelineTree';

const PracticeLessons: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const { xp, level, completedLessons, addXP, completeLesson } = useUserProgress();

  const lessons = [
    {
      id: 'lesson-1',
      title: 'Bass Basics: Your First Steps',
      description: 'Learn the fundamentals of holding and playing the bass guitar with proper technique and posture.',
      xpReward: 50,
      difficulty: 'Beginner' as const,
      videos: [
        {
          title: 'Introduction to Bass',
          youtubeId: 'EhQnXAv0H8A',
          description: 'Welcome to your bass journey!'
        },
        {
          title: 'Holding Your Bass',
          youtubeId: 'jAVq3yeVAU4', 
          description: 'Proper posture and technique'
        },
        {
          title: 'Your First Notes',
          youtubeId: 'C3QBXTjJiLc',
          description: 'Playing your first bass notes'
        },
        {
          title: 'Practice Together',
          youtubeId: 'XryidGnHXOQ',
          description: 'Let\'s practice what you\'ve learned'
        }
      ]
    },
    {
      id: 'lesson-2',
      title: 'Rhythm and Timing',
      description: 'Master the foundation of all bass playing - develop your internal metronome and rhythmic precision.',
      xpReward: 75,
      difficulty: 'Beginner' as const,
      locked: !completedLessons.includes('lesson-1')
    },
    {
      id: 'lesson-3',
      title: 'Your First Bassline',
      description: 'Play a complete song from start to finish and build confidence with full musical pieces.',
      xpReward: 100,
      difficulty: 'Intermediate' as const,
      locked: !completedLessons.includes('lesson-2')
    },
    {
      id: 'lesson-4',
      title: 'Scales and Patterns',
      description: 'Learn essential bass scales and finger patterns to expand your musical vocabulary.',
      xpReward: 125,
      difficulty: 'Intermediate' as const,
      locked: !completedLessons.includes('lesson-3')
    }
  ];

  const startLesson = (lessonIndex: number) => {
    setCurrentLesson(lessonIndex);
    setCurrentVideo(0);
  };

  const nextVideo = () => {
    const lesson = lessons[currentLesson!];
    if (currentVideo < lesson.videos!.length - 1) {
      setCurrentVideo(currentVideo + 1);
    }
  };

  const prevVideo = () => {
    if (currentVideo > 0) {
      setCurrentVideo(currentVideo - 1);
    }
  };

  const completeCurrentLesson = () => {
    const lesson = lessons[currentLesson!];
    completeLesson(lesson.id);
    addXP(lesson.xpReward);
    
    toast({
      title: "Lesson Complete! 🎉",
      description: `You earned ${lesson.xpReward} XP!`,
    });
    
    setCurrentLesson(null);
    setCurrentVideo(0);
  };

  // Lesson detail view
  if (currentLesson !== null) {
    const lesson = lessons[currentLesson];
    const currentVideoData = lesson.videos![currentVideo];
    const isLastVideo = currentVideo === lesson.videos!.length - 1;
    const isCompleted = completedLessons.includes(lesson.id);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-20">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentLesson(null)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold text-center flex-1">{lesson.title}</h1>
            <div className="w-10" />
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Video {currentVideo + 1} of {lesson.videos!.length}</span>
              <span>{lesson.xpReward} XP</span>
            </div>
            <Progress value={((currentVideo + 1) / lesson.videos!.length) * 100} className="h-3 bg-gray-200" />
          </div>

          <Card className="mb-6 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="video-container relative bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideoData.youtubeId}?autoplay=1&mute=0&controls=1`}
                  title={currentVideoData.title}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">{currentVideoData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 leading-relaxed">{currentVideoData.description}</p>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={prevVideo} 
                  disabled={currentVideo === 0}
                  className="flex-1 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {isLastVideo ? (
                  <Button 
                    onClick={completeCurrentLesson} 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={isCompleted}
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    {isCompleted ? 'Completed!' : 'Complete Lesson'}
                  </Button>
                ) : (
                  <Button onClick={nextVideo} className="flex-1 bg-primary hover:bg-primary/90">
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main lessons timeline tree view
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24">
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Practice Lessons</h1>
              <p className="text-gray-600">Level {level} • {xp} XP</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Progress</div>
              <div className="flex items-center space-x-2">
                <Progress 
                  value={(completedLessons.length / lessons.length) * 100} 
                  className="w-20 h-2" 
                />
                <span className="text-xs text-gray-500">
                  {completedLessons.length}/{lessons.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <LessonTimelineTree 
          lessons={lessons}
          completedLessons={completedLessons}
          onStartLesson={startLesson}
        />
      </div>
    </div>
  );
};

export default PracticeLessons;
