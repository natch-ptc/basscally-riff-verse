
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Trophy, Lock, Star } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  locked?: boolean;
  videos?: any[];
}

interface LessonTimelineTreeProps {
  lessons: Lesson[];
  completedLessons: string[];
  onStartLesson: (index: number) => void;
}

const LessonTimelineTree: React.FC<LessonTimelineTreeProps> = ({
  lessons,
  completedLessons,
  onStartLesson
}) => {
  return (
    <div className="relative px-6 py-4">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-orange-300 to-gray-200"></div>
      
      <div className="space-y-8">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isLocked = lesson.locked;
          const isActive = !isLocked && !isCompleted;
          
          return (
            <div key={lesson.id} className="relative flex items-start">
              {/* Timeline node */}
              <div className={`relative z-10 w-4 h-4 rounded-full border-4 ${
                isCompleted 
                  ? 'bg-green-500 border-green-200 shadow-lg' 
                  : isActive 
                    ? 'bg-primary border-orange-200 shadow-lg animate-pulse' 
                    : 'bg-gray-200 border-gray-300'
              }`}>
                {isCompleted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy className="w-3 h-3 text-white" />
                  </div>
                )}
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-2 h-2 text-gray-500" />
                  </div>
                )}
              </div>
              
              {/* Lesson card */}
              <Card className={`ml-6 flex-1 transition-all duration-300 hover:shadow-lg ${
                isCompleted 
                  ? 'border-green-200 bg-green-50 shadow-md' 
                  : isActive 
                    ? 'border-primary/30 bg-white shadow-md hover:shadow-xl' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {lesson.title}
                        </h3>
                        {isCompleted && (
                          <Badge className="bg-green-500 text-white">
                            <Trophy className="w-3 h-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                        {isLocked && (
                          <Badge variant="outline" className="text-gray-500">
                            <Lock className="w-3 h-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                        {isActive && (
                          <Badge className="bg-primary text-white animate-pulse">
                            <Star className="w-3 h-3 mr-1" />
                            Ready
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {lesson.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          📊 {lesson.difficulty}
                        </span>
                        <span className="flex items-center">
                          ⭐ {lesson.xpReward} XP
                        </span>
                        {lesson.videos && (
                          <span className="flex items-center">
                            🎥 {lesson.videos.length} videos
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => onStartLesson(index)}
                      disabled={isLocked}
                      className={`ml-4 ${
                        isCompleted 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                      size="lg"
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonTimelineTree;
