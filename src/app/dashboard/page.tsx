import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3, BookOpen, Flame, TrendingUp, Zap } from "lucide-react";
import { getProfile, updateLoginStreak } from "actions/profiles";


export default async function DashboardPage() {

  // fetch user profile 
  const data = await getProfile();
  if (!data) {
  return <div>Not authenticated</div>;
  }

  const { user, profile } = data;

  if (!profile) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Not authenticated</h2>
      </div>
    );
  }

  const stats = [
    {
      label: "Portfolio Value",
      value: "₹1,05,340",
      change: "-5.34%",
      isPositive: false,
      icon: BarChart3,
    },
    {
      label: "Total Profit/Loss",
      value: "₹5,340",
      change: "+5.34%",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      label: "XP Points",
      value: "2,450",
      change: "7893",
      isPositive: true,
      icon: Zap,
    },
    {
      label: "Learning Streak",
      value: "7 Days",
      change: "Keep it up!",
      isPositive: true,
      icon: Flame,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">
              Welcome back, <span className="gradient-text">{profile.username}</span>
            </h1>
            <p className="text-muted-foreground mt-1">Here's your investment overview</p>
          </div>
          <div className="flex gap-3">
            <Link href="/learn">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            </Link>
            <Link href="/trade">
              <Button variant="hero">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trade Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const positive = stat.isPositive

            return (
              <div
                key={index}
                className="rounded-2xl border bg-card p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${positive ? "bg-emerald-100/20" : "bg-red-100/20"}`}>
                    <stat.icon className={`w-5 h-5 ${positive ? "text-emerald-500" : "text-red-500"}`} />
                  </div>

                  <span className={`text-sm font-medium ${positive ? "text-emerald-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="font-display text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            )
          })}
        </div>
      </div>

    </DashboardLayout>
  );
}