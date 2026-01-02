import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-muted px-6">
      {/* Logo */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Image
            src="/favicon.png"
            width={60}
            height={60}
            alt="StockSim Logo"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-4xl font-bold mb-2">
        Page Not Found
      </h1>

      <p className="text-muted-foreground max-w-md text-center mb-8">
        Looks like this stock doesn’t exist in our exchange.  
        Try going back or head to a safe route.
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
        >
          Go to Home
        </Link>

        <Link
          href="/dashboard"
          className="px-5 py-2 rounded-lg border hover:bg-accent transition"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* Subtle footer */}
      <p className="text-xs mt-8 text-muted-foreground">
        Error Code: STOCK-404
      </p>
    </main>
  );
}
