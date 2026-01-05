'use client';

import type { User, Rival, Quest } from '@/lib/types';
import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpenIcon } from '@/components/icons/book-open-icon';
import { CodeIcon } from '@/components/icons/code-icon';
import { DumbbellIcon } from '@/components/icons/dumbbell-icon';
import { RepeatIcon } from '@/components/icons/repeat-icon';
import { getTaunt } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Flame, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const categoryIcons = {
  study: <BookOpenIcon className="h-6 w-6" />,
  fitness: <DumbbellIcon className="h-6 w-6" />,
  coding: <CodeIcon className="h-6 w-6" />,
  habit: <RepeatIcon className="h-6 w-6" />,
};

function XPBar({
  currentXp,
  level,
  label,
  variant = 'primary',
}: {
  currentXp: number;
  level: number;
  label: string;
  variant?: 'primary' | 'destructive';
}) {
  const [progress, setProgress] = useState(0);
  const xpForNextLevel = 100 * level;
  const xpInCurrentLevel = currentXp % xpForNextLevel;
  const percentage = (xpInCurrentLevel / xpForNextLevel) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  const progressColorClass =
    variant === 'primary' ? 'bg-primary' : 'bg-destructive';

  return (
    <div>
      <div className="mb-2 flex justify-between font-semibold">
        <span>{label}</span>
        <span>
          {currentXp} XP
        </span>
      </div>
      <div className="relative h-6 w-full rounded-md border-2 border-foreground bg-muted shadow-pixel-inset">
        <Progress value={progress} className="h-full bg-transparent [&>div]:" indicatorClassName={progressColorClass} />
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-sm text-primary-foreground drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]">
                Level {level}
            </span>
        </div>
      </div>
    </div>
  );
}

function QuestItem({
  quest,
  onComplete,
}: {
  quest: Quest;
  onComplete: (questId: string, xp: number) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border-2 border-foreground bg-card p-3 shadow-pixel-sm">
      <div className="flex items-center gap-3">
        <div className="text-primary">{categoryIcons[quest.category]}</div>
        <div>
          <p className="font-semibold">{quest.title}</p>
          <p className="text-sm text-muted-foreground">{quest.xpReward} XP</p>
        </div>
      </div>
      <Button
        size="sm"
        className="border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow"
        onClick={() => onComplete(quest.id, quest.xpReward)}
      >
        Complete
      </Button>
    </div>
  );
}

function RivalSection({ user, initialRival }: { user: User; initialRival: Rival }) {
  const [rival, setRival] = useState(initialRival);
  const [taunt, setTaunt] = useState<string | null>(null);
  const [isLoadingTaunt, setIsLoadingTaunt] = useState(false);

  useEffect(() => {
    const rivalXpInterval = setInterval(() => {
      setRival((prevRival) => ({
        ...prevRival,
        currentXP: prevRival.currentXP + Math.floor(prevRival.xpRatePerMinute / 6), // Update every 10s
      }));
    }, 10000);

    return () => clearInterval(rivalXpInterval);
  }, [rival.xpRatePerMinute]);

  const fetchTaunt = async () => {
    setIsLoadingTaunt(true);
    const lastActive = formatDistanceToNow(new Date(user.lastActiveAt));
    const result = await getTaunt({
        userName: user.name,
        rivalName: rival.name,
        rivalPersonality: rival.personality,
        lastActive,
        currentStreak: user.currentStreak
    });
    setTaunt(result.taunt);
    setIsLoadingTaunt(false);
  };
  
  useEffect(() => {
    const tauntTimeout = setTimeout(() => {
      fetchTaunt();
    }, 5000); // Generate taunt 5 seconds after component mounts
    
    return () => clearTimeout(tauntTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="border-2 border-foreground bg-card shadow-pixel">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Rival</span>
          <Avatar className="h-12 w-12 border-2 border-destructive">
            <AvatarImage src={rival.avatar} alt={rival.name} data-ai-hint="pixel robot"/>
            <AvatarFallback>{rival.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription>{rival.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <XPBar
          currentXp={rival.currentXP}
          level={Math.floor(rival.currentXP / 100) + 1}
          label="Rival's Progress"
          variant="destructive"
        />
        {taunt && (
            <div className="rounded-md border-2 border-foreground bg-muted p-3 text-sm italic shadow-pixel-inset">
                &quot;{taunt}&quot;
            </div>
        )}
        <Button onClick={fetchTaunt} disabled={isLoadingTaunt} variant="outline" className="w-full border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">
            {isLoadingTaunt ? 'Generating...' : 'Generate New Taunt'}
        </Button>
      </CardContent>
    </Card>
  );
}

export function DashboardClient({
  user: initialUser,
  rival: initialRival,
  initialQuests,
}: {
  user: User;
  rival: Rival;
  initialQuests: Quest[];
}) {
  const [user, setUser] = useState(initialUser);
  const [quests, setQuests] = useState(initialQuests);
  const { toast } = useToast();

  const handleCompleteQuest = (questId: string, xp: number) => {
    setQuests((prevQuests) => prevQuests.filter((q) => q.id !== questId));
    setUser((prevUser) => {
        const newTotalXP = prevUser.totalXP + xp;
        const newLevel = Math.floor(newTotalXP / 100) + 1;
        
        if (newLevel > prevUser.level) {
            toast({
                title: "Level Up!",
                description: `Congratulations! You've reached Level ${newLevel}!`,
            });
        }
        
        return {
            ...prevUser,
            totalXP: newTotalXP,
            level: newLevel,
        }
    });
    toast({
        title: "Quest Complete!",
        description: `You earned ${xp} XP!`,
    });
  };

  const xpForNextLevel = user.level * 100;
  const xpProgress = user.totalXP % xpForNextLevel;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card className="border-2 border-foreground bg-card shadow-pixel">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <XPBar
              currentXp={user.totalXP}
              level={user.level}
              label="Your Progress"
            />
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded-md border-2 border-foreground bg-muted p-3 shadow-pixel-sm">
                    <p className="font-bold text-2xl">{user.currentStreak}</p>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Flame className="h-4 w-4" /> Streak</p>
                </div>
                <div className="rounded-md border-2 border-foreground bg-muted p-3 shadow-pixel-sm">
                    <p className="font-bold text-2xl">{xpProgress}/{xpForNextLevel}</p>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Zap className="h-4 w-4" /> To Next Level</p>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-foreground bg-card shadow-pixel">
          <CardHeader>
            <CardTitle>Today&apos;s Quests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quests.length > 0 ? (
              quests.map((quest) => (
                <QuestItem
                  key={quest.id}
                  quest={quest}
                  onComplete={handleCompleteQuest}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No quests for today. Create one!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <RivalSection user={user} initialRival={initialRival} />
      </div>
    </div>
  );
}
