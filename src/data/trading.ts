import { AppTheme, getTradingViewTheme } from "@/lib/tradingview/theme";

export const ALERT_TYPE_OPTIONS = [
    { value: 'upper', label: 'Upper' },
    { value: 'lower', label: 'Lower' },
];

export const CONDITION_OPTIONS = [
    { value: 'greater', label: 'Greater than (>)' },
    { value: 'less', label: 'Less than (<)' },
];

// TradingView Charts
export const MARKET_OVERVIEW_WIDGET_CONFIG = (theme: AppTheme) => ({
  ...getTradingViewTheme(theme),

  dateRange: '12M',
  locale: 'en',
  showFloatingTooltip: true,
  showSymbolLogo: true,
  showChart: true,

  belowLineFillColorGrowing: 'rgba(34,197,94,0.12)',
  belowLineFillColorFalling: 'rgba(239,68,68,0.12)',
  belowLineFillColorGrowingBottom: 'rgba(34,197,94,0)',
  belowLineFillColorFallingBottom: 'rgba(239,68,68,0)',
    tabs: [
        {
            title: 'Financial',
            symbols: [
                { s: 'NYSE:JPM', d: 'JPMorgan Chase' },
                { s: 'NYSE:WFC', d: 'Wells Fargo Co New' },
                { s: 'NYSE:BAC', d: 'Bank Amer Corp' },
                { s: 'NYSE:HSBC', d: 'Hsbc Hldgs Plc' },
                { s: 'NYSE:C', d: 'Citigroup Inc' },
                { s: 'NYSE:MA', d: 'Mastercard Incorporated' },
            ],
        },
        {
            title: 'Technology',
            symbols: [
                { s: 'NASDAQ:AAPL', d: 'Apple' },
                { s: 'NASDAQ:GOOGL', d: 'Alphabet' },
                { s: 'NASDAQ:MSFT', d: 'Microsoft' },
                { s: 'NASDAQ:FB', d: 'Meta Platforms' },
                { s: 'NYSE:ORCL', d: 'Oracle Corp' },
                { s: 'NASDAQ:INTC', d: 'Intel Corp' },
            ],
        },
        {
            title: 'Services',
            symbols: [
                { s: 'NASDAQ:AMZN', d: 'Amazon' },
                { s: 'NYSE:BABA', d: 'Alibaba Group Hldg Ltd' },
                { s: 'NYSE:T', d: 'At&t Inc' },
                { s: 'NYSE:WMT', d: 'Walmart' },
                { s: 'NYSE:V', d: 'Visa' },
            ],
        },
    ],
    support_host: 'https://www.tradingview.com', // TradingView host
  width: '100%',
  height: 600,
});

export const HEATMAP_WIDGET_CONFIG = (theme: AppTheme) => ({
  colorTheme: theme,
  isTransparent: true,
  locale: 'en',

  dataSource: 'SPX500',
  blockSize: 'market_cap_basic',
  blockColor: 'change',
  grouping: 'sector',

  hasTopBar: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,

  width: '100%',
  height: 600,
});

export const TOP_STORIES_WIDGET_CONFIG = (theme: AppTheme) => ({
  ...getTradingViewTheme(theme),
  displayMode: 'regular',
  feedMode: 'market',
  locale: 'en',
  market: 'stock',
  width: '100%',
  height: 600,
});

export const MARKET_DATA_WIDGET_CONFIG = (theme: AppTheme) => ({
  ...getTradingViewTheme(theme),
  locale: 'en',

  title: 'Stocks',
  showSymbolLogo: true,

    symbolsGroups: [
        {
            name: 'Financial',
            symbols: [
                { name: 'NYSE:JPM', displayName: 'JPMorgan Chase' },
                { name: 'NYSE:WFC', displayName: 'Wells Fargo Co New' },
                { name: 'NYSE:BAC', displayName: 'Bank Amer Corp' },
                { name: 'NYSE:HSBC', displayName: 'Hsbc Hldgs Plc' },
                { name: 'NYSE:C', displayName: 'Citigroup Inc' },
                { name: 'NYSE:MA', displayName: 'Mastercard Incorporated' },
            ],
        },
        {
            name: 'Technology',
            symbols: [
                { name: 'NASDAQ:AAPL', displayName: 'Apple' },
                { name: 'NASDAQ:GOOGL', displayName: 'Alphabet' },
                { name: 'NASDAQ:MSFT', displayName: 'Microsoft' },
                { name: 'NASDAQ:FB', displayName: 'Meta Platforms' },
                { name: 'NYSE:ORCL', displayName: 'Oracle Corp' },
                { name: 'NASDAQ:INTC', displayName: 'Intel Corp' },
            ],
        },
        {
            name: 'Services',
            symbols: [
                { name: 'NASDAQ:AMZN', displayName: 'Amazon' },
                { name: 'NYSE:BABA', displayName: 'Alibaba Group Hldg Ltd' },
                { name: 'NYSE:T', displayName: 'At&t Inc' },
                { name: 'NYSE:WMT', displayName: 'Walmart' },
                { name: 'NYSE:V', displayName: 'Visa' },
            ],
        },
    ],
  width: '100%',
  height: 600,
});


export const SYMBOL_INFO_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  width: "100%",
  height: 170,

  // UI polish
  showVolume: false,
  showChange: true,
});


export const CANDLE_CHART_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  theme: "dark",
  locale: "en",
  timezone: "Etc/UTC",

  // Chart behavior
  interval: "D",
  style: 1, // Candles
  details: true,
  calendar: false,

  // Toolbars
  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: false,

  // Disable clutter
  allow_symbol_change: false,
  hotlist: false,
  save_image: false,
  watchlist: [],
  compareSymbols: [],
  studies: [],
  withdateranges: false,

  // Visual polish
  backgroundColor: "#0f0f0f",
  gridColor: "rgba(255,255,255,0.04)",

  width: "100%",
  height: 520,
});


export const BASELINE_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  theme: "dark",
  locale: "en",
  timezone: "Etc/UTC",

  interval: "D",
  style: 10, // Baseline
  details: false,

  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: true,

  allow_symbol_change: false,
  hotlist: false,
  save_image: false,
  watchlist: [],
  compareSymbols: [],
  studies: [],
  withdateranges: false,

  backgroundColor: "#0f0f0f",
  gridColor: "rgba(255,255,255,0.04)",

  width: "100%",
  height: 420,
});


export const TECHNICAL_ANALYSIS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: true, // FIX: boolean, not string
  locale: "en",

  interval: "1h", // Good balance for swing + intraday
  width: "100%",
  height: 380,

  largeChartUrl: "",
});


export const COMPANY_PROFILE_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: true, // FIX
  locale: "en",

  width: "100%",
  height: 420,
});


export const COMPANY_FINANCIALS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: true, // FIX
  locale: "en",

  displayMode: "regular",
  width: "100%",
  height: 460,

  largeChartUrl: "",
});

export const POPULAR_STOCK_SYMBOLS = [
    // Tech Giants (the big technology companies)
    'AAPL',
    'MSFT',
    'GOOGL',
    'AMZN',
    'TSLA',
    'META',
    'NVDA',
    'NFLX',
    'ORCL',
    'CRM',

    // Growing Tech Companies
    'ADBE',
    'INTC',
    'AMD',
    'PYPL',
    'UBER',
    'ZOOM',
    'SPOT',
    'SQ',
    'SHOP',
    'ROKU',

    // Newer Tech Companies
    'SNOW',
    'PLTR',
    'COIN',
    'RBLX',
    'DDOG',
    'CRWD',
    'NET',
    'OKTA',
    'TWLO',
    'ZM',

    // Consumer & Delivery Apps
    'DOCU',
    'PTON',
    'PINS',
    'SNAP',
    'LYFT',
    'DASH',
    'ABNB',
    'RIVN',
    'LCID',
    'NIO',

    // International Companies
    'XPEV',
    'LI',
    'BABA',
    'JD',
    'PDD',
    'TME',
    'BILI',
    'DIDI',
    'GRAB',
    'SE',
];

export const NO_MARKET_NEWS =
    '<p class="mobile-text" style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#4b5563;">No market news available today. Please check back tomorrow.</p>';

export const WATCHLIST_TABLE_HEADER = [
    'Company',
    'Symbol',
    'Price',
    'Change',
    'Market Cap',
    'P/E Ratio',
    'Alert',
    'Action',
];
