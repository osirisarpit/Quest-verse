import type { User, Rival, Quest, Guild, RivalryQuest } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const mockUser: User = {
  id: 'user1',
  name: 'Pixel Pioneer',
  email: 'pioneer@questverse.io',
  level: 5,
  totalXP: 450,
  currentStreak: 12,
  lastActiveAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
  rivalId: 'human-rival-id', // Changed to simulate a human rival
  createdAt: new Date('2024-01-01'),
  avatar: PlaceHolderImages.find(p => p.id === 'rival-avatar-1')?.imageUrl || '',
};

export const mockRival: Rival = {
  id: 'rival1',
  name: 'Synth Striker',
  personality: 'aggressive',
  avatar: PlaceHolderImages.find(p => p.id === 'rival-avatar-2')?.imageUrl || '',
  currentXP: 300,
  xpRatePerMinute: 2,
};

export const mockQuests: Quest[] = [
  {
    id: 'quest1',
    userId: 'user1',
    title: 'Code for 30 minutes',
    category: 'coding',
    durationMinutes: 30,
    xpReward: 50,
    status: 'pending',
    createdForDate: new Date(),
    completedAt: null,
  },
  {
    id: 'quest2',
    userId: 'user1',
    title: 'Study React patterns',
    category: 'study',
    durationMinutes: 45,
    xpReward: 75,
    status: 'pending',
    createdForDate: new Date(),
    completedAt: null,
  },
  {
    id: 'quest3',
    userId: 'user1',
    title: '30-minute workout',
    category: 'fitness',
    durationMinutes: 30,
    xpReward: 60,
    status: 'completed',
    createdForDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    completedAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
  },
  {
    id: 'quest4',
    userId: 'user1',
    title: 'Daily meditation',
    category: 'habit',
    durationMinutes: 10,
    xpReward: 20,
    status: 'pending',
    createdForDate: new Date(),
    completedAt: null,
  },
];

export const mockGuilds: Guild[] = [
  {
    id: 'guild1',
    name: 'The Pixel Pushers',
    description: 'A guild for designers and developers who love pixel art.',
    members: ['user1', 'user2', 'user3'],
    totalXP: 12500,
    avatar: PlaceHolderImages.find(p => p.id === 'guild-avatar-1')?.imageUrl || ''
  },
  {
    id: 'guild2',
    name: 'Code Crusaders',
    description: 'Masters of the digital realm, one line of code at a time.',
    members: ['user4', 'user5'],
    totalXP: 8900,
    avatar: PlaceHolderImages.find(p => p.id === 'guild-avatar-2')?.imageUrl || ''
  },
  {
    id: 'guild3',
    name: 'Fitness Fanatics',
    description: 'Pushing limits in the gym and in life.',
    members: ['user6'],
    totalXP: 5600,
    avatar: PlaceHolderImages.find(p => p.id === 'guild-avatar-3')?.imageUrl || ''
  },
];

export const mockRivalryQuests: RivalryQuest[] = [
  {
    id: 'rq1',
    title: 'Weekly XP Challenge',
    description: 'Earn the most XP in one week.',
    xpReward: 200,
    userProgress: 450,
    rivalProgress: 300,
    target: 1000,
  },
  {
    id: 'rq2',
    title: 'Quest Completion Spree',
    description: 'Complete 5 quests before your rival.',
    xpReward: 150,
    userProgress: 3,
    rivalProgress: 4,
    target: 5,
  },
];
