import Image from 'next/image'
import Link from 'next/link';

const Footer = () => {

  const year : number = new Date().getFullYear();

  return (
    <div>
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Image src="/favicon.png" width={40} height={40} alt="logo" />
              </div>
              <span className="font-display font-bold">StockSim</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © {year} StockSim. Educational platform only. No real money involved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <a href="mailto:stocksimulator@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer