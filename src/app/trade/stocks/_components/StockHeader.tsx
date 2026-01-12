import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StockHeader() {

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href='/trade/overview'>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        </Link>

        <span className="text-sm font-semibold tracking-wide">
          Stock Analysis
        </span>
      </div>
    </header>
  );
}
