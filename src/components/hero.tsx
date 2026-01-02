import { ArrowRight, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { stats } from '@/data/landing'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='relative pt-32 pb-20 sm:pt-40 sm:pb-32'>
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in'>
            <Zap className='w-4 h-4 text-primary' />
            <span className='text-sm text-primary font-medium'>Learn investing the fun way</span>
          </div>

          <h1 className='font-display text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up'>
            Master the Market
            <span className='block gradient-text'>Without the Risk</span>
          </h1>

          <p className='text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up' style={{animationDelay: "0.1s"}}>
            Learn stock market investing through interactive games, challenges, and a realistic trading simulator. Start with ₹1,00,000 virtual money.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link href='/auth?signup=true'>
              <Button variant='hero' size='xl' className='w-full sm:w-auto group'>
                Start Learning Free
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </Button>
            </Link>
            <a href='#features'>
              <Button variant='outline' size='xl' className='w-full sm:w:auto'>
                See How It Works
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {stats().map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='font-display text-3xl sm:text-4xl font-bold gradient-text'>{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero