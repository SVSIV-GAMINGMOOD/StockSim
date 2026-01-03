import AuthLayout from "../_components/auth-layout";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <p className="text-sm text-muted-foreground text-center">
      {params?.error
        ? `Error code: ${params.error}`
        : "An unexpected error occurred during authentication."}
    </p>
  );
}

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <AuthLayout>
      <div className="glass-card p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <AlertTriangle className="w-10 h-10 text-destructive" />

          <h2 className="font-display text-2xl font-bold">
            Something went wrong
          </h2>

          <Suspense>
            <ErrorContent searchParams={searchParams} />
          </Suspense>

          <div className="mt-6 flex flex-col gap-3 w-full">
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Back to login
            </Link>

            <p className="text-xs text-muted-foreground">
              If this keeps happening, try requesting a new link.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
