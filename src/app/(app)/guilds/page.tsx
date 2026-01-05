import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockGuilds } from "@/lib/data"
import { UsersIcon } from "@/components/icons/users-icon"
import { Zap } from "lucide-react"

export default function GuildsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tighter">Join a Guild</h1>
        <p className="text-muted-foreground">Team up with fellow adventurers to earn more XP and climb the leaderboards.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGuilds.map((guild) => (
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
              <Button className="w-full border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">Join Guild</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
