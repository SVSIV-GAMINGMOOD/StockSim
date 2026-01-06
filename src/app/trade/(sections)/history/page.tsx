'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const historyData = [
  { date: '2026-01-05', stock: 'AAPL', action: 'Buy', quantity: 10, price: 175.5, status: 'Executed' },
  { date: '2026-01-04', stock: 'TSLA', action: 'Sell', quantity: 5, price: 210.2, status: 'Executed' },
  { date: '2026-01-03', stock: 'GOOGL', action: 'Buy', quantity: 3, price: 125.75, status: 'Pending' },
  { date: '2026-01-02', stock: 'AMZN', action: 'Sell', quantity: 8, price: 98.6, status: 'Executed' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Executed':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">{status}</Badge>;
    case 'Pending':
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">{status}</Badge>;
    case 'Failed':
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function HistorySection() {
  return (
    <div className="p-6 space-y-6">
      <Card className="border dark:border-gray-700 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold">Trade History</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            A record of all your recent trades
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead>Date</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-gray-900">
              {historyData.map((item, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.stock}</TableCell>
                  <TableCell className={`whitespace-nowrap font-semibold ${item.action === 'Buy' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {item.action}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{item.quantity}</TableCell>
                  <TableCell className="whitespace-nowrap">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="whitespace-nowrap">{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
