export const metadata = {
  title: 'Terms of Service | Gifted-AI by Softwarify',
  description: 'Terms of Service for Gifted-AI - Understanding our service agreement',
}

export default function TermsOfService() {
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground mb-4">
          By accessing and using Gifted-AI, you agree to be bound by these Terms of Service.
          Gifted-AI is a product of Softwarify ("we," "us," or "our"). If you disagree with
          any part of these terms, you may not access our service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
        <p className="text-muted-foreground mb-4">
          Gifted-AI is an AI-powered caption generation service by Softwarify that helps users create
          engaging captions for their social media posts. We provide this service on an
          "as is" and "as available" basis.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>You must use the service in compliance with all applicable laws</li>
          <li>You are responsible for any content you upload to our service</li>
          <li>You must not use the service for any illegal or unauthorized purpose</li>
          <li>You must not attempt to interfere with or disrupt our service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
        <p className="text-muted-foreground mb-4">
          The service and its original content, features, and functionality are owned by
          Softwarify and are protected by international copyright, trademark, patent,
          trade secret, and other intellectual property laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
        <p className="text-muted-foreground mb-4">
          Softwarify shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages resulting from your use of or inability
          to use the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
        <p className="text-muted-foreground mb-4">
          We reserve the right to modify or replace these terms at any time. We will
          provide notice of any significant changes through our service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
        <p className="text-muted-foreground mb-4">
          If you have any questions about these Terms, please contact us at{' '}
          <a href="mailto:terms@softwarify.co" className="text-primary hover:underline">
            terms@softwarify.co
          </a>
        </p>
        <p className="text-muted-foreground">
          Softwarify<br />
          Website: <a href="https://softwarify.co" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            softwarify.co
          </a>
        </p>
      </section>

      <footer className="text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </footer>
    </div>
  )
}
