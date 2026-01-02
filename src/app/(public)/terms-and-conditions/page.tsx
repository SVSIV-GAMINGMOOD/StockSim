export const metadata = {
  title: "Terms & Conditions | StockSim",
  description: "Read the terms and conditions for using the StockSim app.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using StockSim, you agree to these Terms &
            Conditions. If you do not agree, please discontinue using the app
            immediately.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. About StockSim</h2>
          <p>
            StockSim is a simulation platform intended for educational and
            learning purposes only. It does not provide financial advice or
            guarantee real-world results.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Use of the Application
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>You agree not to misuse or exploit the platform</li>
            <li>You will comply with applicable laws and regulations</li>
            <li>You will not attempt to hack, reverse engineer, or disrupt services</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. No Financial Advice</h2>
          <p>
            All data, insights, and content provided in StockSim are for
            simulation and educational purposes only and must not be considered
            financial or investment advice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. Accounts & User Responsibility
          </h2>
          <p>
            If account creation is required, you are responsible for maintaining
            security of your account and all activities under it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
          <p>
            We are not responsible for any losses, damages, or consequences
            arising from the use of StockSim. The app is provided “as is”
            without warranties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access if terms are
            violated or misuse is detected.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
          <p>
            We may update these Terms occasionally. Continued use of the app
            means you accept the updated terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Contact Us</h2>
          <p>If you have any questions regarding these Terms, contact us at:</p>
          <p className="font-medium">📧 stocksimulator@gmail.com</p>
        </section>
      </div>
    </main>
  );
}
