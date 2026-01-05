import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Flame, Trophy } from "lucide-react"

export default function DailySummaryPage() {
    const summary = {
        date: new Date(),
        questsCompleted: 3,
        questsFailed: 1,
        xpEarned: 185,
        rivalXpGained: 45,
        streakMaintained: true,
        currentStreak: 13,
    };

    const didUserWin = summary.xpEarned > summary.rivalXpGained;

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-foreground bg-card shadow-pixel">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold tracking-tighter">Daily Summary</CardTitle>
                    <CardDescription>{summary.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className={`rounded-md border-2 p-6 text-center shadow-pixel ${didUserWin ? 'border-primary bg-primary/10' : 'border-destructive bg-destructive/10'}`}>
                        <Trophy className={`mx-auto h-12 w-12 mb-2 ${didUserWin ? 'text-primary' : 'text-destructive'}`} />
                        <h2 className="text-2xl font-bold">{didUserWin ? "Victory!" : "Defeat!"}</h2>
                        <p className="text-muted-foreground">
                            {didUserWin ? `You crushed your rival by ${summary.xpEarned - summary.rivalXpGained} XP!` : `Your rival outpaced you by ${summary.rivalXpGained - summary.xpEarned} XP.`}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="border-2 border-foreground bg-muted shadow-pixel-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Your XP</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-primary">{summary.xpEarned}</p>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-foreground bg-muted shadow-pixel-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Rival&apos;s XP</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-destructive">{summary.rivalXpGained}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-md border-2 border-foreground/20 p-3 bg-card">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>Quests Completed</span>
                            </div>
                            <span className="font-bold">{summary.questsCompleted}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border-2 border-foreground/20 p-3 bg-card">
                            <div className="flex items-center gap-2">
                                <XCircle className="h-5 w-5 text-red-500" />
                                <span>Quests Failed</span>
                            </div>
                            <span className="font-bold">{summary.questsFailed}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border-2 border-foreground/20 p-3 bg-card">
                            <div className="flex items-center gap-2">
                                <Flame className="h-5 w-5 text-orange-500" />
                                <span>Current Streak</span>
                            </div>
                            <span className="font-bold">{summary.currentStreak} days</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
