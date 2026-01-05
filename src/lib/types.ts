export type User = {
  id: string;
  name: string;
  email: string;
  level: number;
  totalXP: number;
  currentStreak: number;
  lastActiveAt: Date;
  rivalId: string;
  createdAt: Date;
  avatar: string;
};

export type Rival = {
  id: string;
  name: string;
  personality: 'aggressive' | 'neutral' | 'friendly';
  avatar: string;
  currentXP: number;
  xpRatePerMinute: number;
};

export type Quest = {
  id: string;
  userId: string;
  title: string;
  category: 'study' | 'fitness' | 'coding' | 'habit';
  durationMinutes: number;
  xpReward: number;
  status: 'pending' | 'completed' | 'failed';
  createdForDate: Date;
  completedAt: Date | null;
};

export type Guild = {
  id: string;
  name: string;
  description: string;
  members: string[];
  totalXP: number;
  avatar: string;
};

export type RivalryQuest = {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  userProgress: number;
  rivalProgress: number;
  target: number;
};
