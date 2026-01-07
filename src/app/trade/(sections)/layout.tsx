import Footer from '@/components/footer';
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

      {/* Middle section */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <WatchlistSidebar />

        {/* Right Content */}
        <main className="flex-1 pt-4 px-6 pb-12">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}

