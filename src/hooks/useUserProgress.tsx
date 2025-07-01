
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastLoginDate: string;
  completedLessons: string[];
  badges: string[];
  totalSongsLearned: number;
  coversUploaded: number;
  totalLikes: number;
  followers: number;
}

interface UserProgressStore extends UserProgress {
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  updateStreak: () => void;
  addBadge: (badge: string) => void;
  incrementSongsLearned: () => void;
  incrementCoversUploaded: () => void;
  addLikes: (amount: number) => void;
  addFollowers: (amount: number) => void;
}

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

const isToday = (dateString: string): boolean => {
  const today = new Date().toDateString();
  const checkDate = new Date(dateString).toDateString();
  return today === checkDate;
};

const isYesterday = (dateString: string): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toDateString() === new Date(dateString).toDateString();
};

export const useUserProgress = create<UserProgressStore>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      streak: 0,
      lastLoginDate: '',
      completedLessons: [],
      badges: ['New Bass Rookie'],
      totalSongsLearned: 0,
      coversUploaded: 0,
      totalLikes: 0,
      followers: 0,

      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = calculateLevel(newXP);
          return {
            xp: newXP,
            level: newLevel,
          };
        });
      },

      completeLesson: (lessonId: string) => {
        set((state) => {
          if (!state.completedLessons.includes(lessonId)) {
            return {
              completedLessons: [...state.completedLessons, lessonId],
            };
          }
          return state;
        });
      },

      updateStreak: () => {
        set((state) => {
          const today = new Date().toDateString();
          
          if (isToday(state.lastLoginDate)) {
            return state; // Already logged in today
          }
          
          let newStreak = 1;
          if (isYesterday(state.lastLoginDate)) {
            newStreak = state.streak + 1;
          }
          
          return {
            streak: newStreak,
            lastLoginDate: today,
          };
        });
      },

      addBadge: (badge: string) => {
        set((state) => {
          if (!state.badges.includes(badge)) {
            return {
              badges: [...state.badges, badge],
            };
          }
          return state;
        });
      },

      incrementSongsLearned: () => {
        set((state) => ({
          totalSongsLearned: state.totalSongsLearned + 1,
        }));
      },

      incrementCoversUploaded: () => {
        set((state) => ({
          coversUploaded: state.coversUploaded + 1,
        }));
      },

      addLikes: (amount: number) => {
        set((state) => ({
          totalLikes: state.totalLikes + amount,
        }));
      },

      addFollowers: (amount: number) => {
        set((state) => ({
          followers: state.followers + amount,
        }));
      },
    }),
    {
      name: 'user-progress',
    }
  )
);
