"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, CheckCircle, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth2/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-8">
      {success ? (
        <>
          <div className="flex flex-col items-center text-center gap-4">
            <CheckCircle className="w-10 h-10 text-primary" />
            <h2 className="font-display text-2xl font-bold">
              Check your email
            </h2>
            <p className="text-muted-foreground">
              We’ve sent password reset instructions to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>

            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium mt-4"
            >
              Back to login
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2 className="font-display text-2xl font-bold mb-2 text-center">
            Forgot your password?
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Enter your email and we’ll send you a reset link
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-6">
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
                  className="pl-10 h-12 bg-secondary/50"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

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
                  Send reset link
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth2/login"
              className="text-primary hover:underline font-medium"
            >
              Back to login
            </Link>
          </div>
        </>
      )}
    </div>
  );
}