import Hero from '@/components/hero'
import { Button } from '@/components/ui/button'
import { features, howItWorks, testimonials } from '@/data/landing'
import { ArrowRight, Shield, Star } from 'lucide-react'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Hero />

      {/* Feature Section */}
      <section id='features' className='py-20 sm:py-32 relative'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='font-display text-3xl sm:text-4xl font-bold mb-4'>
              Everything You Need to
              <span className='gradient-text'> Learn & Trade</span>
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              A complete platform designed to make learning stock market investing engaging, effective, and risk-free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features().map((feature, index) => (
              <div 
                key={index}
                className="glass-card-hover p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Start Your Journey in
              <span className="gradient-text"> 3 Simple Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {howItWorks().map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className=" glass-card-hover border border-border/50 rounded-2xl p-6 sm:p-8 relative group " 
                >
                  <span className=" absolute -top-4 left-6 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full z-10
                  ">
                    {item.step}
                  </span>

                  <div className=" w-12 h-12 mb-5 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition
                  ">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Loved by
              <span className="gradient-text"> Thousands</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials().map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-card-hover p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="glass-card p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto glow-effect">
            <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of learners who are building their financial future. It's free, safe, and educational.
            </p>
            <Link href='/auth?signup=true'>
              <Button variant="hero" size="xl" className="group">
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home