import AuthLayout from "../_components/auth-layout";
import { CheckCircle, Mail } from "lucide-react";
import Link from "next/link";

export default function SignUpSuccessPage() {
  return (
    <AuthLayout>
      <div className="glass-card p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <CheckCircle className="w-10 h-10 text-primary" />

          <h2 className="font-display text-2xl font-bold">
            Thanks for signing up!
          </h2>

          <p className="text-muted-foreground">
            We’ve sent a confirmation link to your email address.
            <br />
            Please verify your email before logging in.
          </p>

          <div className="mt-6 flex flex-col gap-2 w-full">
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Go to login
            </Link>

            <p className="text-xs text-muted-foreground">
              Didn’t receive the email? Check your spam folder.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
