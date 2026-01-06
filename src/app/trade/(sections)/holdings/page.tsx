'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

// --------------------
// Hardcoded demo data
// --------------------
const summary = {
  invested: 245000,
  current: 289400,
  pnl: 44400,
  pnlPercent: 18.12,
};

const holdings = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    qty: 20,
    avg: 2350,
    ltp: 2598,
    sector: 'Energy',
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    qty: 10,
    avg: 3280,
    ltp: 3542,
    sector: 'IT Services',
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    qty: 25,
    avg: 1490,
    ltp: 1621,
    sector: 'Banking',
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    qty: 15,
    avg: 1425,
    ltp: 1382,
    sector: 'IT Services',
  },
];

const format = (n: number) =>
  n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

export default function PremiumHoldings() {
  return (
    <div className="space-y-6">
      {/* -------- Summary Cards -------- */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-linear-to-br from-neutral-900 to-neutral-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <Wallet className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">₹{format(summary.invested)}</div>
            <p className="text-xs text-neutral-400 mt-1">Capital deployed</p>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-neutral-900 to-neutral-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">₹{format(summary.current)}</div>
            <p className="text-xs text-neutral-400 mt-1">Live market value</p>
          </CardContent>
        </Card>

        <Card
          className={`bg-linear-to-br text-white ${
            summary.pnl >= 0
              ? 'from-emerald-700 to-emerald-600'
              : 'from-rose-700 to-rose-600'
          }`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-2xl font-semibold">
              {summary.pnl >= 0 ? (
                <ArrowUpRight className="h-5 w-5" />
              ) : (
                <ArrowDownRight className="h-5 w-5" />
              )}
              ₹{format(summary.pnl)}
            </div>
            <p className="text-xs opacity-90 mt-1">
              {summary.pnlPercent}% overall return
            </p>
          </CardContent>
        </Card>
      </div>

      {/* -------- Holdings Table -------- */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Stock</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Avg</TableHead>
                <TableHead>LTP</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((h) => {
                const invested = h.qty * h.avg;
                const current = h.qty * h.ltp;
                const pnl = current - invested;
                const positive = pnl >= 0;

                return (
                  <TableRow key={h.symbol} className="group">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{h.symbol}</span>
                        <span className="text-xs text-muted-foreground">
                          {h.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className="mt-1 w-fit text-[10px]"
                        >
                          {h.sector}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{h.qty}</TableCell>
                    <TableCell>₹{format(h.avg)}</TableCell>
                    <TableCell>₹{format(h.ltp)}</TableCell>
                    <TableCell className="font-medium">
                      ₹{format(current)}
                    </TableCell>
                    <TableCell
                      className={`font-medium ${
                        positive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {positive ? '+' : ''}₹{format(pnl)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
