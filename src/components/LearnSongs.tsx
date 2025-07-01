
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Play, Heart, Star, TrendingUp } from 'lucide-react';

const LearnSongs: React.FC = () => {
  const featuredSongs = [
    {
      id: 1,
      title: "Another One Bites the Dust",
      artist: "Queen",
      difficulty: "Beginner",
      genre: "Rock",
      likes: 1250,
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop",
      basslineBy: "MarcusBass92"
    },
    {
      id: 2,
      title: "Billie Jean",
      artist: "Michael Jackson",
      difficulty: "Intermediate", 
      genre: "Pop",
      likes: 2100,
      thumbnail: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=300&h=400&fit=crop",
      basslineBy: "FunkMaster"
    },
    {
      id: 3,
      title: "Come As You Are",
      artist: "Nirvana",
      difficulty: "Beginner",
      genre: "Grunge",
      likes: 890,
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop",
      basslineBy: "GrungeBass"
    }
  ];

  const trendingSongs = [
    {
      id: 4,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      difficulty: "Intermediate",
      genre: "Pop Rock",
      likes: 1850,
      trending: true
    },
    {
      id: 5,
      title: "Levitating",
      artist: "Dua Lipa", 
      difficulty: "Beginner",
      genre: "Pop",
      likes: 1450,
      trending: true
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Learn Songs</h1>
            <p className="text-gray-600">Master iconic basslines</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search songs, artists, or genres..."
            className="pl-10"
          />
        </div>

        {/* Trending Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Trending Now</h2>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {trendingSongs.map((song) => (
              <Card key={song.id} className="min-w-[280px] hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getDifficultyColor(song.difficulty)}>
                      {song.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span>{song.likes}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{song.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{song.artist}</p>
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Learn This Song
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Songs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Basslines</h2>
          <div className="space-y-4">
            {featuredSongs.map((song) => (
              <Card key={song.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-20 h-20 bg-gray-200 rounded-l-lg overflow-hidden">
                      <img 
                        src={song.thumbnail} 
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{song.title}</h3>
                          <p className="text-gray-600 text-sm">{song.artist}</p>
                          <p className="text-xs text-gray-500 mb-2">by {song.basslineBy}</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={getDifficultyColor(song.difficulty)}>
                              {song.difficulty}
                            </Badge>
                            <Badge variant="outline">{song.genre}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                            <Heart className="w-4 h-4" />
                            <span>{song.likes}</span>
                          </div>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Learn
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Browse by Genre</h2>
          <div className="grid grid-cols-2 gap-3">
            {['Rock', 'Pop', 'Jazz', 'Funk', 'Blues', 'R&B'].map((genre) => (
              <Button key={genre} variant="outline" className="h-12">
                {genre}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnSongs;
