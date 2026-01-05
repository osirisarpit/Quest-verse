'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockRival } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const rivalAvatars = PlaceHolderImages.filter(p => p.id.startsWith('rival-avatar'));

export default function RivalPage() {
    const [rival, setRival] = useState(mockRival);
    const { toast } = useToast();

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save to your backend
        console.log('Saving rival:', rival);
        toast({
            title: "Rival Updated!",
            description: `${rival.name} is ready for battle!`,
        });
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-foreground bg-card shadow-pixel">
                <CardHeader>
                    <CardTitle>Customize Your Rival</CardTitle>
                    <CardDescription>Forge your opponent. Their strength is a reflection of your own discipline.</CardDescription>
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
        </div>
    );
}
