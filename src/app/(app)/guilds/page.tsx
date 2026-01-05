'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockGuilds, mockUser } from "@/lib/data"
import { UsersIcon } from "@/components/icons/users-icon"
import { Zap } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Guild } from "@/lib/types";

const allMockUsers = [
  mockUser,
  { id: 'user2', name: 'Synth Striker', avatar: 'https://picsum.photos/seed/user2/200' },
  { id: 'user3', name: 'Glitch Goblin', avatar: 'https://picsum.photos/seed/user3/200' },
  { id: 'user4', name: 'Data Dragon', avatar: 'https://picsum.photos/seed/user4/200' },
  { id: 'user5', name: 'Quantum Queen', avatar: 'https://picsum.photos/seed/user5/200' },
  { id: 'user6', name: 'Byte Baron', avatar: 'https://picsum.photos/seed/user6/200' },
];

function GuildCard({ guild }: { guild: Guild }) {
  const members = guild.members.map(memberId => 
    allMockUsers.find(u => u.id === memberId) || { id: memberId, name: 'Unknown User', avatar: '' }
  );

  return (
    <Card key={guild.id} className="border-2 border-foreground bg-card shadow-pixel flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-foreground">
          <AvatarImage src={guild.avatar} alt={guild.name} data-ai-hint={guild.avatar.includes('shield') ? 'pixel shield' : 'pixel sword'} />
          <AvatarFallback>{guild.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{guild.name}</CardTitle>
          <CardDescription className="line-clamp-2">{guild.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-md border-2 border-foreground bg-muted p-2 shadow-pixel-inset">
                  <p className="font-bold text-lg flex items-center justify-center gap-1"><UsersIcon className="h-4 w-4" /> {guild.members.length}</p>
                  <p className="text-xs text-muted-foreground">Members</p>
              </div>
              <div className="rounded-md border-2 border-foreground bg-muted p-2 shadow-pixel-inset">
                  <p className="font-bold text-lg flex items-center justify-center gap-1"><Zap className="h-4 w-4" /> {guild.totalXP.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">Join Guild</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-2 border-foreground bg-card shadow-pixel">
              <DialogHeader>
                <DialogTitle>Members of {guild.name}</DialogTitle>
                <DialogDescription>
                  These are the current members of the {guild.name} guild.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {members.map(member => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{member.name}</p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
      </CardContent>
    </Card>
  )
}

export default function GuildsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tighter">Join a Guild</h1>
        <p className="text-muted-foreground">Team up with fellow adventurers to earn more XP and climb the leaderboards.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGuilds.map((guild) => (
          <GuildCard key={guild.id} guild={guild} />
        ))}
      </div>
    </div>
  )
}
