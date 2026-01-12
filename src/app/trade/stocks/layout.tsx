import StockHeader from './_components/StockHeader';

export default function StockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <StockHeader />

      <main className="max-w-400 mx-auto px-4">
        {children}
      </main>
    </div>
  );
}
