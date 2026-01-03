"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
    }

    try {
        const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
                full_name: name,
            }
        },
        });
        if (error) throw error;
        router.push("/auth/sign-up-success");
    } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
        setIsLoading(false);
    }
    };

    return (
        <div>
            <div className="glass-card p-8">
                <h2 className="font-display text-2xl font-bold mb-2 text-center">Create Account</h2>
                <p className="text-muted-foreground text-center mb-8">Start your investment learning journey</p>

                {/* Handle Google SignUp */}

                <div className="flex items-center gap-2 my-6">
                    <div className="h-px bg-border flex-1" />
                    <span className="text-xs text-muted-foreground">OR CONTINUE WITH EMAIL</span>
                    <div className="h-px bg-border flex-1" />
                </div>

                <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10 h-12 bg-secondary/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`pl-10 h-12 bg-secondary/50`}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`pl-10 pr-10 h-12 bg-secondary/50`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="repeat-password">Repeat Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                id="repeat-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                className={`pl-10 pr-10 h-12 bg-secondary/50`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                        <>
                            Create Account
                            <ArrowRight className="w-5 h-5" />
                        </>
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/auth/login">
                            <button
                            type="button"
                            className="text-primary hover:underline font-medium"
                            >
                            LogIn
                            </button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}