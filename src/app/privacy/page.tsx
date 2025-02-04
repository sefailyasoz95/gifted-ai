export const metadata = {
  title: 'Privacy Policy | Gifted-AI by Softwarify',
  description: 'Privacy policy for Gifted-AI - Learn how we handle and protect your data',
}

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="text-muted-foreground mb-4">
          At Softwarify, we take your privacy seriously. This Privacy Policy explains how we collect,
          use, and protect your personal information when you use Gifted-AI, our AI-powered caption generation service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>IP address and basic visitor information for analytics</li>
          <li>Images you upload for caption generation (not stored)</li>
          <li>Device information and browser type</li>
          <li>Usage data and interaction with our service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>To provide and improve our caption generation service</li>
          <li>To analyze usage patterns and optimize user experience</li>
          <li>To prevent abuse and maintain security</li>
          <li>To communicate important updates about our service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="text-muted-foreground mb-4">
          We implement industry-standard security measures to protect your data. Images are processed
          in real-time and are not stored on our servers. We use secure HTTPS connections and
          follow best practices for data protection.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
        <p className="text-muted-foreground mb-4">
          We use essential cookies to maintain basic functionality and analytics cookies to improve
          our service. You can control cookie preferences through your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-muted-foreground mb-4">
          If you have any questions about our Privacy Policy, please contact us at{' '}
          <a href="mailto:privacy@softwarify.co" className="text-primary hover:underline">
            privacy@softwarify.co
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
