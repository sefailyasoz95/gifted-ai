export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Gifted-AI",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web",
          "description": "Generate engaging, creative Instagram captions instantly with AI. Upload your photo and get the perfect caption for maximum engagement.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "provider": {
            "@type": "Organization",
            "name": "Softwarify",
            "url": "https://softwarify.co"
          },
          "screenshot": {
            "@type": "ImageObject",
            "url": "https://Gifted-AI.vercel.app/og-image.png"
          },
          "featureList": [
            "AI-powered caption generation",
            "Instagram optimization",
            "Photo analysis",
            "Custom prompts",
            "One-click copy"
          ]
        })
      }}
    />
  )
}
