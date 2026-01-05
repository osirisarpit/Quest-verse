'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockRival, mockUser, mockRivalryQuests } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { Copy, Plus, Swords } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RivalryQuest } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const rivalAvatars = PlaceHolderImages.filter(p => p.id.startsWith('rival-avatar'));

function RivalryQuestItem({ quest }: { quest: RivalryQuest }) {
  const userPercentage = (quest.userProgress / quest.target) * 100;
  const rivalPercentage = (quest.rivalProgress / quest.target) * 100;

  return (
    <div className="space-y-3 rounded-md border-2 border-foreground bg-card p-4 shadow-pixel-sm">
      <div>
        <h4 className="font-semibold">{quest.title}</h4>
        <p className="text-sm text-muted-foreground">{quest.description}</p>
        <p className="text-sm font-bold text-primary">{quest.xpReward} XP Reward</p>
      </div>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label className="text-xs">Your Progress ({quest.userProgress}/{quest.target})</Label>
          <Progress value={userPercentage} className="h-3" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Rival's Progress ({quest.rivalProgress}/{quest.target})</Label>
          <Progress value={rivalPercentage} className="h-3" indicatorClassName="bg-destructive" />
        </div>
      </div>
    </div>
  );
}

function CreateRivalryQuestDialog({ onCreate }: { onCreate: (quest: RivalryQuest) => void }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [xpReward, setXpReward] = useState(100);
    const [target, setTarget] = useState(10);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out all fields to create a quest.'
            });
            return;
        }

        const newQuest: RivalryQuest = {
            id: `rq${Date.now()}`,
            title,
            description,
            xpReward,
            target,
            userProgress: 0,
            rivalProgress: 0,
        };

        onCreate(newQuest);
        toast({
            title: 'Rivalry Quest Created!',
            description: `The challenge "${title}" has been set.`,
        });
        setOpen(false);
        // Reset form
        setTitle('');
        setDescription('');
        setXpReward(100);
        setTarget(10);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Quest
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-2 border-foreground bg-card shadow-pixel">
                <DialogHeader>
                    <DialogTitle>Create Rivalry Quest</DialogTitle>
                    <DialogDescription>
                        Set a new challenge for you and your rival.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="quest-title">Title</Label>
                        <Input id="quest-title" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-foreground/50 focus:border-foreground" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="quest-description">Description</Label>
                        <Textarea id="quest-description" value={description} onChange={(e) => setDescription(e.target.value)} className="border-2 border-foreground/50 focus:border-foreground" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="quest-xp">XP Reward</Label>
                            <Input id="quest-xp" type="number" value={xpReward} onChange={(e) => setXpReward(Number(e.target.value))} className="border-2 border-foreground/50 focus:border-foreground" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="quest-target">Target Value</Label>
                            <Input id="quest-target" type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="border-2 border-foreground/50 focus:border-foreground" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">Create Challenge</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function RivalPage() {
    const [rival, setRival] = useState(mockRival);
    const [user, setUser] = useState({ ...mockUser, rivalId: mockUser.rivalId || null });
    const [rivalryQuests, setRivalryQuests] = useState(mockRivalryQuests);
    const { toast } = useToast();

    const hasHumanRival = user.rivalId && user.rivalId !== 'rival1'; // 'rival1' is the default AI

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save to your backend
        console.log('Saving rival:', rival);
        toast({
            title: "Rival Updated!",
            description: `${rival.name} is ready for battle!`,
        });
    }

    const handleCopyToClipboard = () => {
        const inviteLink = `${window.location.origin}/rival/invite/user1-invite-code`;
        navigator.clipboard.writeText(inviteLink);
        toast({
            title: "Link Copied!",
            description: "Invitation link copied to your clipboard.",
        });
    }

    const handleCreateRivalryQuest = (newQuest: RivalryQuest) => {
        setRivalryQuests(prev => [...prev, newQuest]);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
             <Card className="border-2 border-foreground bg-card shadow-pixel">
                <CardHeader>
                    <CardTitle>Invite a Rival</CardTitle>
                    <CardDescription>Challenge a friend by sending them an invitation link. Victory is sweeter against a real opponent.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="invite-link">Your Invite Link</Label>
                    <div className="flex gap-2">
                        <Input 
                            id="invite-link" 
                            readOnly 
                            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/rival/invite/user1-invite-code`}
                            className="border-2 border-foreground/50" 
                        />
                        <Button variant="outline" size="icon" onClick={handleCopyToClipboard} className="border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy link</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {hasHumanRival ? (
                 <Card className="border-2 border-foreground bg-card shadow-pixel">
                    <CardHeader>
                        <CardTitle>Your Human Rival</CardTitle>
                        <CardDescription>The ultimate challenger has accepted your invitation.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <Avatar className="h-24 w-24 border-4 border-destructive shadow-pixel">
                            <AvatarImage src="https://picsum.photos/seed/human-rival/200" alt="Human Rival" data-ai-hint="pixel avatar" />
                            <AvatarFallback>HR</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-xl font-bold">Rival Captain</h3>
                            <p className="text-muted-foreground">Level 7</p>
                            <Button variant="destructive" className="mt-2 border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">
                                Remove Rival
                            </Button>
                        </div>
                    </CardContent>
                 </Card>
            ) : (
                <Card className="border-2 border-foreground bg-card shadow-pixel">
                    <CardHeader>
                        <CardTitle>Customize Your AI Rival</CardTitle>
                        <CardDescription>No human rival yet. Forge your AI opponent. Their strength is a reflection of your own discipline.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="rival-name">Rival Name</Label>
                                <Input
                                    id="rival-name"
                                    value={rival.name}
                                    onChange={(e) => setRival({ ...rival, name: e.target.value })}
                                    className="border-2 border-foreground/50 focus:border-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="rival-personality">Personality</Label>
                                <Select
                                    value={rival.personality}
                                    onValueChange={(value: 'aggressive' | 'neutral' | 'friendly') => setRival({ ...rival, personality: value })}
                                >
                                    <SelectTrigger className="border-2 border-foreground/50 focus:border-foreground">
                                        <SelectValue placeholder="Select a personality" />
                                    </SelectTrigger>
                                    <SelectContent className="border-2 border-foreground bg-card shadow-pixel">
                                        <SelectItem value="aggressive">Aggressive</SelectItem>
                                        <SelectItem value="neutral">Neutral</SelectItem>
                                        <SelectItem value="friendly">Friendly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="space-y-2">
                                <Label>Avatar</Label>
                                <RadioGroup 
                                    value={rival.avatar} 
                                    onValueChange={(value) => setRival({ ...rival, avatar: value })}
                                    className="grid grid-cols-3 gap-4"
                                >
                                    {rivalAvatars.map((avatar) => (
                                        <Label key={avatar.id} htmlFor={avatar.id} className="cursor-pointer">
                                            <RadioGroupItem value={avatar.imageUrl} id={avatar.id} className="sr-only" />
                                            <Avatar className={`h-24 w-24 border-4 transition-all ${rival.avatar === avatar.imageUrl ? 'border-primary shadow-pixel' : 'border-transparent'}`}>
                                                <AvatarImage src={avatar.imageUrl} alt={avatar.description} data-ai-hint={avatar.imageHint} />
                                                <AvatarFallback>{avatar.id}</AvatarFallback>
                                            </Avatar>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>

                            <Button type="submit" className="w-full border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <Card className="border-2 border-foreground bg-card shadow-pixel">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1.5">
                        <CardTitle className="flex items-center gap-2">
                            <Swords />
                            Rivalry Quests
                        </CardTitle>
                        <CardDescription>
                            Complete these special quests to get a leg up on your rival.
                        </CardDescription>
                    </div>
                    <CreateRivalryQuestDialog onCreate={handleCreateRivalryQuest} />
                </CardHeader>
                <CardContent className="space-y-4">
                    {rivalryQuests.length > 0 ? (
                        rivalryQuests.map((quest) => (
                            <RivalryQuestItem key={quest.id} quest={quest} />
                        ))
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <p>No active rivalry quests.</p>
                        <p>Create a new one to challenge your rival!</p>
                      </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
