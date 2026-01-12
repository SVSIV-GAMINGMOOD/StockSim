import TradingViewWidget from "@/components/TradingViewWidget";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/data/trading";

type StockDetailsPageProps = {
  params: Promise<{
    symbol: string;
  }>;
};

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-400 px-4 py-6 md:px-6 lg:px-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN – Charts */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Symbol Info */}
            <div className="rounded-xl border bg-card shadow-sm">
              <TradingViewWidget
                scriptUrl={`${scriptUrl}symbol-info.js`}
                config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
                height={170}
              />
            </div>

            {/* Candlestick Chart */}
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b">
                <h2 className="text-sm font-semibold text-muted-foreground">
                  Price Chart
                </h2>
              </div>
              <TradingViewWidget
                scriptUrl={`${scriptUrl}advanced-chart.js`}
                config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
                height={520}
              />
            </div>

            {/* Baseline Chart */}
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b">
                <h2 className="text-sm font-semibold text-muted-foreground">
                  Baseline / Comparison
                </h2>
              </div>
              <TradingViewWidget
                scriptUrl={`${scriptUrl}advanced-chart.js`}
                config={BASELINE_WIDGET_CONFIG(symbol)}
                height={420}
              />
            </div>
          </div>

          {/* RIGHT COLUMN – Analysis */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 flex flex-col gap-8">

              {/* Technical Analysis */}
              <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <h2 className="text-sm font-semibold text-muted-foreground">
                    Technical Analysis
                  </h2>
                </div>
                <TradingViewWidget
                  scriptUrl={`${scriptUrl}technical-analysis.js`}
                  config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
                  height={380}
                />
              </div>

              {/* Company Profile */}
              <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <h2 className="text-sm font-semibold text-muted-foreground">
                    Company Overview
                  </h2>
                </div>
                <TradingViewWidget
                  scriptUrl={`${scriptUrl}company-profile.js`}
                  config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
                  height={420}
                />
              </div>

              {/* Financials */}
              <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <h2 className="text-sm font-semibold text-muted-foreground">
                    Financials
                  </h2>
                </div>
                <TradingViewWidget
                  scriptUrl={`${scriptUrl}financials.js`}
                  config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
                  height={460}
                />
              </div>

            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
