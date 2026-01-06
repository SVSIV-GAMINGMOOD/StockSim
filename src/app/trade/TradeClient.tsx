'use client';

import { useTheme } from 'next-themes';
import TradingViewWidget from "@/components/TradingViewWidget";
import TradeStats from "./_components/TradeStats";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/data/trading";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

export default function TradeClient() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  const scriptUrl =
    "https://s3.tradingview.com/external-embedding/embed-widget-";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            Virtual <span className="gradient-text">Trading</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Practice trading with virtual money
          </p>
        </div>

        {/* Top-right action button */}
        <Link href="/trade/overview">
          <Button variant="hero">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trade Now
          </Button>
        </Link>
      </div>

      <TradeStats />

      <section className="relative isolate grid w-full grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="relative h-150 overflow-hidden xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG(theme)} 
          />
        </div>

        <div className="relative h-150 overflow-hidden xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG(theme)} 
          />
        </div>
      </section>

      <section className="relative isolate mt-10 grid w-full grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="relative h-150 overflow-hidden xl:col-span-1">
          <TradingViewWidget
            title="Top Stories"
            scriptUrl={`${scriptUrl}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG(theme)} 
          />
        </div>

        <div className="relative h-150 overflow-hidden xl:col-span-2">
          <TradingViewWidget
            title="Market Quotes"
            scriptUrl={`${scriptUrl}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG(theme)} 
          />
        </div>
      </section>
    </div>
  );
}
