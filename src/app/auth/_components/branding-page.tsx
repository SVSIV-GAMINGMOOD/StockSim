import Image from "next/image";

export default function LeftSideBrading() {
  return (
    <>
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
    </div>
    
    <div className="relative z-10 flex flex-col justify-center p-12 lg:p-16">
        <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Image src="/favicon.png" width={40} height={40} alt="logo" />
        </div>
        <span className="font-display text-2xl font-bold">StockSim</span>
        </div>
        
        <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6">
        Learn Investing
        <span className="block gradient-text">The Smart Way</span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Join thousands of learners mastering the stock market through interactive lessons and risk-free trading simulation.
        </p>

        <div className="space-y-4">
        {[
            "₹100,000 virtual money to start",
            "Interactive lessons & quizzes",
            "Compete on leaderboards",
            "Earn badges & XP points",
        ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            {item}
            </div>
        ))}
        </div>
    </div>
    </>
  )
}