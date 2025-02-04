## Gifted-AI Web App
An AI powered web app to generate captions for Instagram posts. Caption generation will happen after user uploads the photos they wanna share and give a little brief about the post. AI will create the caption and give it back to the user. User will be able to copy it to the clipboard. We should keep created captions in supabase database, initially user doesn't have to be signed in, first trial is free for everyone, but if they wanna do for the second time we should be able to somehow check if they have done it before and warn them that they need to sign in to the app in order to generate the second or more captions. Offering Google Sign In and Instagram Sign In. Next-Auth is the provider

UI approach: support dark theme, responsive design. Shadcn-UI for UI components.

### Completed Features 

1. **Project Setup**
   - Next.js with TypeScript setup
   - TailwindCSS and Shadcn-UI integration
   - Dark theme support
   - Responsive design implementation

2. **Core Features**
   - Photo upload functionality
   - AI caption generation using Gemini Pro Vision
   - Clipboard copy functionality
   - Cookie consent implementation
   - Basic visitor tracking

3. **UI Components**
   - Upload zone with drag & drop
   - Custom prompt input
   - Generated caption display
   - Copy to clipboard button
   - Loading states and error handling
   - Cookie consent banner

4. **Security Features**
   - Rate limiting for API routes (20 requests per minute)
   - Input validation using Zod
   - API route protection middleware
   - Security headers implementation
     - X-Frame-Options
     - X-Content-Type-Options
     - Referrer-Policy
     - Content-Security-Policy
   - File upload validation
     - Size limits (10MB)
     - Type restrictions (JPEG, PNG, WEBP, GIF)
   - Request validation
     - Method validation
     - Content-type validation
     - JSON schema validation

5. **SEO & Metadata**
   - Comprehensive meta tags using Next.js Metadata API
   - OpenGraph tags for social media sharing
   - Twitter Card integration
   - JSON-LD structured data
   - PWA manifest
   - Robots.txt configuration
   - Sitemap support
   - Google Search Console integration
   - Multiple language support
   - Canonical URLs
   - Favicon and app icons

### Pending Features 

1. **Authentication**
   - Google Sign In
   - Instagram Sign In
   - Apple Sign In
   - Next-Auth integration

2. **User Management**
   - Free trial tracking
   - Sign-in prompts after first use
   - User dashboard

3. **Database Features**
   - Store generated captions
   - User caption history
   - Usage tracking

4. **Additional Enhancements**
   - Caption history view
   - User preferences
   - Advanced prompt customization

### Technical Debt and Improvements 

1. **Performance**
   - Image optimization
   - Loading state refinements
   - Error boundary implementation

2. **Security** 
   - ~~Rate limiting~~ (Implemented)
   - ~~Input validation~~ (Implemented)
   - ~~API route protection~~ (Implemented)

3. **Analytics**
   - Usage tracking
   - Error tracking
   - Performance monitoring

### Dependencies Added
- `zod`: Schema validation
- `express-rate-limit`: API rate limiting