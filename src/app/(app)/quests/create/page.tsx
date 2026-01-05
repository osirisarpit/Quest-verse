'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpenIcon } from "@/components/icons/book-open-icon"
import { CodeIcon } from "@/components/icons/code-icon"
import { DumbbellIcon } from "@/components/icons/dumbbell-icon"
import { RepeatIcon } from "@/components/icons/repeat-icon"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import type { Quest } from '@/lib/types';


const categories = [
    { value: "study", label: "Study", icon: <BookOpenIcon className="h-5 w-5" /> },
    { value: "coding", label: "Coding", icon: <CodeIcon className="h-5 w-5" /> },
    { value: "fitness", label: "Fitness", icon: <DumbbellIcon className="h-5 w-5" /> },
    { value: "habit", label: "Habit", icon: <RepeatIcon className="h-5 w-5" /> },
] as const;

type CategoryValue = typeof categories[number]['value'];

export default function CreateQuestPage() {
    const { toast } = useToast();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<CategoryValue | undefined>();
    const [duration, setDuration] = useState(30);
    const [xp, setXp] = useState(50);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !category) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out all fields to create a quest.'
            });
            return;
        }

        const newQuest: Quest = {
            id: `quest${Date.now()}`,
            userId: 'user1', // mock user
            title,
            category,
            durationMinutes: duration,
            xpReward: xp,
            status: 'pending',
            createdForDate: new Date(),
            completedAt: null,
        };

        // Dispatch a custom event with the new quest
        window.dispatchEvent(new CustomEvent('new-quest', { detail: { quest: newQuest, type: 'standard' } }));
        
        toast({
            title: "Quest Created!",
            description: "Your new challenge awaits. Go get that XP!",
        });
        router.push('/dashboard');
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-foreground bg-card shadow-pixel">
                <CardHeader>
                    <CardTitle>Create a New Quest</CardTitle>
                    <CardDescription>Define your next challenge. Every quest is a step towards greatness.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Quest Title</Label>
                            <Input 
                                id="title" 
                                placeholder="e.g., Master React hooks" 
                                className="border-2 border-foreground/50 focus:border-foreground" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={(value: CategoryValue) => setCategory(value)} value={category}>
                                <SelectTrigger id="category" className="border-2 border-foreground/50 focus:border-foreground">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent className="border-2 border-foreground bg-card shadow-pixel">
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            <div className="flex items-center gap-2">
                                                {cat.icon}
                                                <span>{cat.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="duration">Duration (minutes)</Label>
                                <Input 
                                    id="duration" 
                                    type="number" 
                                    placeholder="30" 
                                    className="border-2 border-foreground/50 focus:border-foreground"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="xp">XP Reward</Label>
                                <Input 
                                    id="xp" 
                                    type="number" 
                                    placeholder="50" 
                                    className="border-2 border-foreground/50 focus:border-foreground" 
                                    value={xp}
                                    onChange={(e) => setXp(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">Create Quest</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
