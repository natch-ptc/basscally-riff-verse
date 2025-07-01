
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Play, Plus } from 'lucide-react';

const PlayShare: React.FC = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const feedPosts = [
    {
      id: 1,
      user: {
        name: "Sarah Bass",
        username: "@sarahbass",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      },
      song: "Billie Jean - Michael Jackson",
      caption: "Finally nailed this iconic bassline! 🎸✨ #billiejean #basscover",
      likes: 324,
      comments: 28,
      shares: 12,
      videoThumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop",
      timeAgo: "2h ago"
    },
    {
      id: 2,
      user: {
        name: "Marcus Groove",
        username: "@marcusgroove",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      song: "Another One Bites the Dust - Queen",
      caption: "Classic rock vibes 🔥 Who else loves this Queen track?",
      likes: 189,
      comments: 15,
      shares: 8,
      videoThumbnail: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=300&h=400&fit=crop",
      timeAgo: "4h ago"
    },
    {
      id: 3,
      user: {
        name: "Jazz Cat",
        username: "@jazzcat_bass",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      song: "So What - Miles Davis",
      caption: "Jazz bass solo practice 🎼 Still working on that swing feel",
      likes: 97,
      comments: 21,
      shares: 5,
      videoThumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop",
      timeAgo: "6h ago"
    }
  ];

  const toggleLike = (postId: number, currentLikes: number) => {
    setLikedPosts(prev => {
      if (prev.includes(postId)) {
        return prev.filter(id => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Play & Share</h1>
            <p className="text-gray-600">Share your covers with the world</p>
          </div>
          <Button className="rounded-full w-12 h-12 p-0">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {feedPosts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            const displayLikes = isLiked ? post.likes + 1 : post.likes;
            
            return (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* User Header */}
                  <div className="flex items-center space-x-3 p-4 pb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{post.user.name}</div>
                      <div className="text-xs text-gray-500">{post.user.username} • {post.timeAgo}</div>
                    </div>
                    <Button variant="ghost" size="sm">Follow</Button>
                  </div>

                  {/* Video Content */}
                  <div className="relative bg-black">
                    <div className="video-container">
                      <img 
                        src={post.videoThumbnail}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="lg" className="rounded-full w-16 h-16 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          <Play className="w-6 h-6 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <div className="font-semibold text-sm mb-1">{post.song}</div>
                      <p className="text-sm text-gray-700">{post.caption}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => toggleLike(post.id, post.likes)}
                          className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <Heart 
                            className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                          />
                          <span className="text-sm">{displayLikes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Try This Song
                      </Button>
                    </div>
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

export default PlayShare;
