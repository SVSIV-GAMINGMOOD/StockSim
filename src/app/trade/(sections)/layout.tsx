import TradeNavbar from './_components/TradeNavbar';
import WatchlistSidebar from './_components/WatchlistSidebar';

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <TradeNavbar />

      {/* Content Area */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <WatchlistSidebar />

        {/* Right Content */}
        <main className="flex-1 pt-4 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
