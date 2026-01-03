import Image from "next/image";
import LeftSideBrading from "./branding-page";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-card/50">
        <LeftSideBrading />
      </div>

      {/* Right content */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Image src="/favicon.png" width={40} height={40} alt="logo" />
            </div>
            <span className="font-display text-xl font-bold">StockSim</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
