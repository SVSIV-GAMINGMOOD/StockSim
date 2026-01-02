import React from "react";

export const metadata = {
  title: "Privacy Policy | StockSim",
  description: "Read the privacy policy for StockSim app.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to StockSim. Your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your data when you
            use our application.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Account information (name, email if applicable)</li>
            <li>Usage data & simulation interactions</li>
            <li>Device & technical information</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>To provide and improve StockSim features</li>
            <li>To ensure security and prevent fraud</li>
            <li>To enhance user experience</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Data Sharing & Third Parties
          </h2>
          <p>
            We do not sell your personal data. We may use trusted third-party
            services for analytics or authentication, and they follow strict
            privacy standards.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Security</h2>
          <p>
            We use industry-standard security practices to keep your data safe.
            However, no system is 100% secure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Children&apos;s Privacy</h2>
          <p>
            StockSim is not intended for children under 13. We do not knowingly
            collect data from children.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Continued use of the
            app means you accept the updated policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, feel free to
            contact us at:
          </p>
          <p className="font-medium">
            📧 stocksimulator@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}
