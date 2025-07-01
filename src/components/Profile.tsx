
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Settings, Bell, Share2, Trophy, Music, Heart, Users } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';

const Profile: React.FC = () => {
  const { 
    xp, 
    level, 
    streak, 
    completedLessons, 
    badges, 
    totalSongsLearned, 
    coversUploaded, 
    totalLikes, 
    followers 
  } = useUserProgress();

  const xpForNextLevel = level * 100;
  const currentLevelXP = xp - ((level - 1) * 100);
  const progressToNextLevel = (currentLevelXP / 100) * 100;

  const stats = [
    { label: 'Streak', value: `${streak} days`, icon: '🔥' },
    { label: 'Songs Learned', value: totalSongsLearned, icon: '🎵' },
    { label: 'Covers Shared', value: coversUploaded, icon: '🎬' },
    { label: 'Total Likes', value: totalLikes, icon: '❤️' },
    { label: 'Followers', value: followers, icon: '👥' },
    { label: 'Lessons Completed', value: completedLessons.length, icon: '✅' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback>BU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">Bass User</h2>
                <p className="text-gray-600">@bassuser2024</p>
                <p className="text-sm text-gray-500 mt-1">🎸 Learning bass one riff at a time!</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="outline" className="flex-1">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Level & XP Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span>Level {level}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{currentLevelXP} XP</span>
                <span>{100 - currentLevelXP} XP to next level</span>
              </div>
              <Progress value={progressToNextLevel} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Badges */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <Badge key={index} className="bg-primary text-white py-1 px-3">
                  🏆 {badge}
                </Badge>
              ))}
            </div>
            {badges.length === 0 && (
              <p className="text-gray-500 text-sm">Complete lessons to earn badges!</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Bell className="w-4 h-4 mr-3" />
              Notifications
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Music className="w-4 h-4 mr-3" />
              My Covers
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Heart className="w-4 h-4 mr-3" />
              Liked Songs
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-3" />
              Following
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
