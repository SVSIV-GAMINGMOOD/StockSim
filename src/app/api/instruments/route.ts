import { NextResponse } from "next/server";

/* ---------------- CONFIG ---------------- */

const SHEETS = [
  {
    exchange: "NSE",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTju3z6EzEoX8U8Hdc0tpF9lSIwLeM9ANtnozz0lsYZUWNGnKsbPonWNcvOGowQ_-hF3vGuZLiHnGTL/pub?gid=1117620170&single=true&output=csv",
  },
  {
    exchange: "BSE",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTju3z6EzEoX8U8Hdc0tpF9lSIwLeM9ANtnozz0lsYZUWNGnKsbPonWNcvOGowQ_-hF3vGuZLiHnGTL/pub?gid=917252255&single=true&output=csv",
  },
  {
    exchange: "NYSE",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTju3z6EzEoX8U8Hdc0tpF9lSIwLeM9ANtnozz0lsYZUWNGnKsbPonWNcvOGowQ_-hF3vGuZLiHnGTL/pub?gid=0&single=true&output=csv",
  },
  {
    exchange: "NASDAQ",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTju3z6EzEoX8U8Hdc0tpF9lSIwLeM9ANtnozz0lsYZUWNGnKsbPonWNcvOGowQ_-hF3vGuZLiHnGTL/pub?gid=2091927641&single=true&output=csv",
  },
];


function parseCSV(csv: string, fallbackExchange: string) {
  const lines = csv.trim().split("\n");

  return lines.slice(1).map((line) => {
    const [
      symbol,
      exchangeSymbol,
      name,
      currentPrice,
      changePct,
      delay,
    ] = line.split(","); // 👈 IMPORTANT

    const exchange =
      exchangeSymbol?.split(":")[0] || fallbackExchange;

    return {
      symbol: symbol?.trim(),
      name: name?.trim(),
      exchange,
      type: "EQ",
      sheetPrice: currentPrice ? Number(currentPrice) : null,
      sheetChangePct: changePct ? Number(changePct) : null,
      delay: delay ? Number(delay) : null,
    };
  });
}



/* ---------------- API ---------------- */

export async function GET() {
  try {
    const data = await Promise.all(
      SHEETS.map(async ({ url, exchange }) => {
        const res = await fetch(url, {
        //   next: { revalidate: 60 }, // 1 min cache
        cache: "no-store",
        });
        const csv = await res.text();
        return parseCSV(csv, exchange);
      })
    );

    return NextResponse.json(data.flat());
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch instrument master" },
      { status: 500 }
    );
  }
}

