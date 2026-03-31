## Project Title

> *NexCard - Digital Virtual Business Card Platform*

---

## Student Information

* **Name:** Rajan Pantha
* **Roll Number:** 18
* **Course / Program:** BSc CSIT
* **Semester / Year:** 3rd Semester / 2nd Year

---

## Instructor Information

* **Instructor Name:** Mr. Deepak Shrestha
* **Course Title:** React Development
* **College Name:** Samriddhi College

---

## Project Overview

> NexCard is a modern digital business card platform built with React.
> It allows users to create, customize, and share professional virtual business cards online.
> Each card gets a unique shareable URL and QR code, making networking effortless.
> Contacts can save card details directly to their phone via vCard (.vcf) download.
> The platform supports multiple card templates, custom themes, and a freemium pricing model (Free / Pro / Business).

---

## Objectives

* Build a fully responsive React SPA (Single Page Application)
* Implement user authentication with Supabase Auth (OAuth)
* Allow users to create and customize digital business cards
* Generate shareable public card URLs and QR codes
* Enable vCard (.vcf) download for saving contacts to phone
* Apply clean, animated UI/UX design with Framer Motion
* Deploy securely on Vercel with proper security headers

---

## Technologies Used

### Frontend

* React 19
* React Router DOM v7
* Tailwind CSS v4
* Framer Motion (animations)
* Lucide React (icons)
* qrcode.react (QR code generation)

### Backend / Database

* Supabase (PostgreSQL database + Auth)

### Build & Deployment

* Vite (build tool)
* Vercel (deployment)

### Other Tools

* Git & GitHub
* vCard / RFC 6350 (contact export standard)

---

## Key Features

* **Virtual Business Cards** - Create cards with name, title, company, phone, email, website, and social links
* **Multiple Templates & Themes** - Choose from various pre-built card designs and color themes
* **QR Code Generation** - Each card comes with a unique scannable QR code
* **Shareable Public URL** - Every card has a unique /card/:slug link that anyone can visit
* **vCard Download** - Save contact info directly to phone contacts (.vcf format)
* **Share Modal** - Share cards via link, social media, or copy to clipboard
* **View Counter** - Tracks how many times a card has been viewed
* **Authentication** - Supabase OAuth-based login with protected routes
* **Freemium Pricing** - Free, Pro ($12/mo), and Business ($29/mo) tiers
* **Animated UI** - Smooth animations powered by Framer Motion
* **Cursor Spotlight Effect** - Interactive visual effect on the landing page
* **Responsive Design** - Optimized for mobile, tablet, and desktop

---

## Pages / Modules

* **Home Page** - Hero, Template Gallery, Story, How It Works, Theme Showcase, FAQ
* **Login Page** - OAuth-based authentication
* **My Cards Page** - View and manage all created cards (protected)
* **Customize Page** - Card editor to build and style a card (protected)
* **Virtual Card Page** - Public shareable view of a business card (/card/:slug)
* **Pricing Page** - Free / Pro / Business plan comparison
* **Auth Callback Page** - Handles OAuth redirect
* **404 Not Found Page** - Custom error page

---

## Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/nexcard.git

# Go to project folder
cd nexcard

# Install dependencies
npm install

# Create a .env file and add your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
nexcard/
├── public/
│   └── robots.txt
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── TemplateCard.jsx
│   │   ├── QRCodeDisplay.jsx
│   │   ├── ShareModal.jsx
│   │   ├── SaveContactButton.jsx
│   │   ├── AuthProvider.jsx
│   │   └── ...
│   ├── pages/             # Route-level page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MyCardsPage.jsx
│   │   ├── CustomizePage.jsx
│   │   ├── VirtualCardPage.jsx
│   │   └── PricingPage.jsx
│   ├── lib/
│   │   └── supabase/      # Supabase client setup
│   ├── utils/
│   │   ├── cardStorage.js # Card CRUD operations
│   │   └── vcard.js       # vCard (.vcf) generator
│   └── data/
│       └── templates.js   # Card template definitions
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## GitHub & Live Demo

* **GitHub Repository:** https://github.com/your-username/nexcard
* **Live URL (Deployed on Vercel):** https://nexcard.vercel.app

---

## Testing

* Tested UI responsiveness across mobile, tablet, and desktop screen sizes
* Verified QR code generation and scanning with real mobile devices
* Tested vCard (.vcf) download and contact import on Android and iOS
* Checked protected routes redirect correctly for unauthenticated users
* Validated shareable card URLs resolve correctly after Vercel deployment

---

## Challenges Faced

* Implementing Supabase Auth with OAuth callback flow in a React SPA
* Managing card state and real-time updates across multiple components
* Generating valid vCard (.vcf) files following RFC 6350 with proper character escaping
* Setting up Vercel SPA rewrites so that /card/:slug routes work on refresh
* Designing a responsive card template system with custom per-card themes

---

## Future Enhancements

* Add analytics dashboard for card view statistics
* Support custom domains for virtual card URLs
* Enable PDF export of business cards
* Add NFC card tap support
* Implement team/organization card management
* Add more premium templates and design customization options

---

## Acknowledgement

> I would like to thank my instructor **Mr. Deepak Shrestha** for his guidance and support throughout this project.

---

## Declaration

> I hereby declare that this project is my original work and has been completed as part of my academic submission.

---

## License

This project was developed as a B.Sc. CSIT 3rd Semester React coursework project.