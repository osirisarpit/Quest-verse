'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockRival, mockUser } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

const rivalAvatars = PlaceHolderImages.filter(p => p.id.startsWith('rival-avatar'));

export default function RivalPage() {
    const [rival, setRival] = useState(mockRival);
    // Using a separate state for user to simulate having a human rival or not.
    // In a real app, this would come from the user's data.
    const [user, setUser] = useState({ ...mockUser, rivalId: mockUser.rivalId || null });
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
        </div>
    );
}
