'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogoIcon } from '@/components/icons/logo-icon';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M20.94 11c-.04-.69-.1-1.38-.1-2.06H12v3.87h5.02a4.34 4.34 0 0 1-1.87 2.87v2.5h3.22c1.88-1.74 2.97-4.3 2.97-7.18z" />
        <path d="M12 21a9.5 9.5 0 0 1-7.03-2.66l3.22-2.5a5.7 5.7 0 0 0 3.81 1.36c2.2 0 4.07-1.48 4.74-3.48h3.32v2.5A9.95 9.95 0 0 1 12 21z" />
        <path d="M5.97 14.25a5.83 5.83 0 0 0 0-4.5V7.25H2.65a10 10 0 0 1 0 9.5l3.32-2.5z" />
        <path d="M12 5.38c1.24 0 2.36.42 3.24 1.25l2.7-2.7A9.6 9.6 0 0 1 12 2a9.95 9.95 0 0 1-9.35 5.25l3.32 2.5A5.7 5.7 0 0 0 12 5.38z" />
      </svg>
    );
  }

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <LogoIcon className="h-12 w-12 text-primary" />
        </div>
        <Card className="border-2 border-foreground bg-card shadow-pixel">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tighter">Welcome to QuestVerse</CardTitle>
            <CardDescription>Enter your credentials to start your adventure</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="pioneer@questverse.io"
                required
                className="border-2 border-foreground/50 focus:border-foreground"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="border-2 border-foreground/50 focus:border-foreground"
              />
            </div>
            <Link href="/dashboard" passHref>
                <Button type="submit" className="w-full border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">
                Login
                </Button>
            </Link>
            <Button variant="outline" className="w-full border-2 border-foreground shadow-pixel-sm hover:shadow-pixel transition-shadow">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline" prefetch={false}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
