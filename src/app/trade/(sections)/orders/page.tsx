'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const ordersData = [
  { id: 'ORD-001', symbol: 'AAPL', type: 'Buy', quantity: 10, price: 175.5, status: 'Completed', date: '2026-01-05' },
  { id: 'ORD-002', symbol: 'TSLA', type: 'Sell', quantity: 5, price: 980, status: 'Pending', date: '2026-01-06' },
  { id: 'ORD-003', symbol: 'GOOGL', type: 'Buy', quantity: 2, price: 2850, status: 'Completed', date: '2026-01-04' },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-green-500 text-white dark:bg-green-600',
  Pending: 'bg-yellow-400 text-black dark:bg-yellow-500 dark:text-black',
  Cancelled: 'bg-red-500 text-white dark:bg-red-600',
};

const OrdersSection = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <h1 className="text-3xl font-extrabold tracking-wide mb-6">Your Orders</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordersData.map((order) => (
          <Card
            key={order.id}
            className={`border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            } shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300`}
          >
            <CardHeader>
              <h2 className="text-xl font-bold">{order.symbol}</h2>
              <p className="text-sm text-gray-400 dark:text-gray-300">{order.date}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Type:</span>
                <span className={`font-semibold ${order.type === 'Buy' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {order.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span className="font-semibold">{order.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-semibold">${order.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant={theme === 'dark' ? 'secondary' : 'default'} className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersSection;
