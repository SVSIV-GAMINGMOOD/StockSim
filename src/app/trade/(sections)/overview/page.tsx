'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function TradeOverview() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Your trading performance snapshot
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Total Portfolio Value"
          value="₹12,45,800"
          change="+2.14%"
          positive
        />
        <StatCard
          title="Overall P&L"
          value="₹1,32,450"
          change="+₹8,420"
          positive
        />
        <StatCard
          title="Day P&L"
          value="-₹1,250"
          change="-0.32%"
          positive={false}
        />
      </div>

      {/* Balance + Margin */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Funds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FundRow label="Available Balance" value="₹3,25,000" />
            <FundRow label="Used Margin" value="₹2,10,400" />
            <Separator />
            <FundRow
              label="Total Funds"
              value="₹5,35,400"
              bold
            />
          </CardContent>
        </Card>

        {/* Trading Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Trading Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <MiniStat label="Total Trades" value="128" />
            <MiniStat label="Win Rate" value="63%" />
            <MiniStat label="Avg Holding" value="2.4 days" />
            <MiniStat label="Max Drawdown" value="-4.8%" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({
  title,
  value,
  change,
  positive,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-semibold">{value}</span>
          <span
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              positive ? 'text-emerald-500' : 'text-red-500'
            )}
          >
            {positive ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function FundRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn(bold && 'font-semibold')}>{value}</span>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
