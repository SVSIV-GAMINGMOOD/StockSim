"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        router.push("/dashboard");
        } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="glass-card p-8">
                <h2 className="font-display text-2xl font-bold mb-2 text-center">Welcome Back</h2>
                <p className="text-muted-foreground text-center mb-8">Sign in to continue your learning</p>

                {/* Handle Google SignUp */}

                <div className="flex items-center gap-2 my-6">
                    <div className="h-px bg-border flex-1" />
                    <span className="text-xs text-muted-foreground">OR CONTINUE WITH EMAIL</span>
                    <div className="h-px bg-border flex-1" />
                </div>

                <form onSubmit={handleLogin} className="space-y-6">

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
                    <div className="flex justify-end -mt-2">
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            Forgot password?
                        </Link>
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
                            Sign In
                            <ArrowRight className="w-5 h-5" />
                        </>
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/auth/sign-up">
                            <button
                            type="button"
                            className="text-primary hover:underline font-medium"
                            >
                            Sign up
                            </button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}