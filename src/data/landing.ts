import { BarChart3, BookOpen, Target, Trophy, Users, Wallet } from "lucide-react";

export const features = () => [
  {
    icon: BookOpen,
    title: "Learn Step by Step",
    description: "Master stock market fundamentals through interactive lessons and real examples",
  },
  {
    icon: Wallet,
    title: "Virtual Trading",
    description: "Practice with ₹100,000 virtual money. No risk, all the learning experience",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn XP, unlock badges, and compete on leaderboards while learning",
  },
  {
    icon: BarChart3,
    title: "Real-time Simulation",
    description: "Trade with simulated price movements that mirror real market dynamics",
  },
];

export  const stats = () => [
  { value: "50K+", label: "Active Learners" },
  { value: "₹10Cr+", label: "Virtual Trades" },
  { value: "1000+", label: "Lessons Completed" },
  { value: "95%", label: "Success Rate" },
];

export const howItWorks = () => [
  {
    step: "01",
    icon: Users,
    title: "Create Your Account",
    description: "Sign up in seconds and get ₹100,000 virtual money to start your journey",
  },
  {
    step: "02",
    icon: BookOpen,
    title: "Learn the Basics",
    description: "Complete interactive lessons and quizzes to build your foundation",
  },
  {
    step: "03",
    icon: Target,
    title: "Practice Trading",
    description: "Apply your knowledge by trading stocks in our realistic simulator",
  },
]

export const testimonials = () => [
  {
    name: "Priya Sharma",
    role: "College Student",
    quote: "Finally understood how stocks work! The gamification made learning so much fun.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "IT Professional",
    quote: "The virtual trading helped me build confidence before investing real money.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Freelancer",
    quote: "Best investment education platform. The challenges keep me motivated daily.",
    rating: 5,
  },
]