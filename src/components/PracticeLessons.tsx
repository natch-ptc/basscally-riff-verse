
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, ChevronLeft, ChevronRight, Trophy, Star } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { toast } from '@/hooks/use-toast';

const PracticeLessons: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const { xp, level, completedLessons, addXP, completeLesson } = useUserProgress();

  const lessons = [
    {
      id: 'lesson-1',
      title: 'Bass Basics: Your First Steps',
      description: 'Learn the fundamentals of holding and playing the bass guitar',
      xpReward: 50,
      difficulty: 'Beginner',
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
      description: 'Master the foundation of all bass playing',
      xpReward: 75,
      difficulty: 'Beginner',
      locked: !completedLessons.includes('lesson-1')
    },
    {
      id: 'lesson-3',
      title: 'Your First Bassline',
      description: 'Play a complete song from start to finish',
      xpReward: 100,
      difficulty: 'Intermediate',
      locked: !completedLessons.includes('lesson-2')
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentLesson(null)}
              className="p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold text-center flex-1">{lesson.title}</h1>
            <div className="w-10" />
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Video {currentVideo + 1} of {lesson.videos!.length}</span>
              <span>{lesson.xpReward} XP</span>
            </div>
            <Progress value={((currentVideo + 1) / lesson.videos!.length) * 100} className="h-2" />
          </div>

          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="video-container relative">
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

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{currentVideoData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{currentVideoData.description}</p>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={prevVideo} 
                  disabled={currentVideo === 0}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {isLastVideo ? (
                  <Button 
                    onClick={completeCurrentLesson} 
                    className="flex-1"
                    disabled={isCompleted}
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    {isCompleted ? 'Completed!' : 'Complete Lesson'}
                  </Button>
                ) : (
                  <Button onClick={nextVideo} className="flex-1">
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

  // Main lessons list view
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Practice Lessons</h1>
            <p className="text-gray-600">Level {level} • {xp} XP</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Progress</div>
            <Progress value={(completedLessons.length / lessons.length) * 100} className="w-20 h-2 mt-1" />
          </div>
        </div>

        <div className="space-y-4">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = lesson.locked;
            
            return (
              <Card 
                key={lesson.id} 
                className={`transition-all ${isLocked ? 'opacity-50' : 'hover:shadow-md'} ${isCompleted ? 'border-green-200 bg-green-50' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{lesson.title}</h3>
                        {isCompleted && <Badge className="bg-green-500"><Trophy className="w-3 h-3 mr-1" />Complete</Badge>}
                        {isLocked && <Badge variant="outline">🔒 Locked</Badge>}
                      </div>
                      <p className="text-gray-600 mb-3">{lesson.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📊 {lesson.difficulty}</span>
                        <span>⭐ {lesson.xpReward} XP</span>
                        {lesson.videos && <span>🎥 {lesson.videos.length} videos</span>}
                      </div>
                    </div>
                    <Button 
                      onClick={() => startLesson(index)}
                      disabled={isLocked}
                      className="ml-4"
                    >
                      {isCompleted ? (
                        <>
                          <Star className="w-4 h-4 mr-2" />
                          Review
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PracticeLessons;
