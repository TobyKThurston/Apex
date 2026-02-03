# 🎯 Apex Terminal

> **Real-time prediction market analytics powered by sharp wallet intelligence**

Apex Terminal is a sophisticated dashboard that tracks and analyzes prediction markets from Polymarket, identifying where "sharp" wallets (successful traders) are positioning themselves. Built with Next.js and powered by the Dome API.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)
![License](https://img.shields.io/badge/license-Private-red?style=flat-square)

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Architecture](#-project-architecture)
- [How It Works](#-how-it-works)
- [API Integration](#-api-integration)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [FAQ](#-faq)

---

## 🎓 Overview

### What is Apex Terminal?

Apex Terminal is a real-time analytics platform for prediction markets. It helps traders identify high-conviction opportunities by tracking where "sharp" wallets (successful, profitable traders) are positioning themselves.

### Key Concepts

- **Prediction Markets**: Markets where you can bet on the outcome of events (e.g., "Will Bitcoin reach $100k by 2025?")
- **Sharp Wallets**: Wallet addresses belonging to traders with a proven track record of profitability
- **Sharp Alignment**: A metric (0.00-1.00) measuring consensus among sharp wallets on a particular market
- **Smart Side**: The side (YES/NO) that has more sharp wallets positioned on it

### Why This Project?

This project demonstrates:
- **Real-time data processing** with API integrations
- **Modern web development** using Next.js and React
- **TypeScript** for type-safe code
- **Data visualization** and analytics
- **Production-ready** application architecture

---

## ✨ Features

### 📊 **Live Market Dashboard**
- **Real-time price tracking** from Polymarket markets
- **Sharp wallet alignment** metrics showing where successful traders are positioned
- **Smart side detection** (YES/NO) based on sharp wallet consensus
- **Signal feed** with real-time market activity events
- **Auto-refresh** every 15 seconds for live data
- **Price filtering** - only shows markets with valid, real-time prices

### 🎨 **Terminal-Style UI**
- Cyberpunk-inspired terminal interface
- Animated signal feed with color-coded events
- Interactive market selection with detailed breakdowns
- Responsive design for desktop and mobile
- Smooth animations using Motion (Framer Motion)

### 🔍 **Analytics & Insights**
- **Sharp Alignment Score**: Measures consensus among tracked sharp wallets (0.00-1.00)
- **Wallet Counts**: Tracks YES/NO positions from sharp wallets
- **Net Flow**: Shows recent wallet activity trends
- **Signal Tags**: PRE-MOVE, ANOMALY, and NORMAL classifications

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - UI library
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Motion](https://motion.dev)** - Animation library (formerly Framer Motion)

### Backend & APIs
- **[Dome API](https://docs.domeapi.io)** - Prediction market data provider
- **[Supabase](https://supabase.com)** - Backend-as-a-Service (optional, for waitlist)

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control
- A **Dome API key** ([Get one here](https://domeapi.io))
- (Optional) **Supabase account** for waitlist functionality

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/TobyKThurston/Apex-Terminal.git
cd Apex-Terminal
```

#### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

#### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file (if it exists)
cp .env.local.example .env.local

# Or create a new one
touch .env.local
```

Add your API keys:

```bash
# Required: Dome API key for market data
DOME_API_KEY=your_dome_api_key_here

# Optional: Supabase for waitlist (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **⚠️ Important**: Never commit `.env.local` to git! It's already in `.gitignore`.

#### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 5. Access the Dashboard

- **Homepage**: `http://localhost:3000/` - Landing page with terminal UI
- **Dashboard**: `http://localhost:3000/dashboard` - Live market analytics
- **Waitlist**: `http://localhost:3000/waitlist` - Sign up page (if Supabase configured)

---

## 🏗️ Project Architecture

```
apex-terminal/
├── app/                          # Next.js App Router directory
│   ├── dashboard/               # Dashboard pages
│   │   ├── page.tsx            # Server component (data fetching)
│   │   └── dashboard-client.tsx # Client component (UI/interactivity)
│   ├── waitlist/                # Waitlist signup page
│   ├── api/                     # API routes
│   │   ├── debug-dome/         # Debug endpoint for Dome API
│   │   └── test-dome/           # Test endpoint for Dome API
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
│
├── lib/                         # Core library functions
│   ├── dashboard-data.ts       # Market data fetching & processing
│   ├── dome.ts                 # Dome API client setup
│   ├── types.ts                # TypeScript type definitions
│   └── supabase.ts             # Supabase client (optional)
│
├── public/                      # Static assets
│   └── *.svg, *.png            # Images and icons
│
├── scripts/                     # Utility scripts
│   ├── test-dome.js            # Test Dome SDK
│   └── test-api-key.js         # Test API key
│
├── .env.local                   # Environment variables (not in git)
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

### Key Files Explained

- **`app/dashboard/page.tsx`**: Server component that fetches data on the server
- **`app/dashboard/dashboard-client.tsx`**: Client component that handles UI interactions
- **`lib/dashboard-data.ts`**: Core logic for fetching and processing market data
- **`lib/dome.ts`**: Dome API client initialization
- **`lib/types.ts`**: TypeScript interfaces for type safety

---

## 🔄 How It Works

### Data Flow

```
1. User visits /dashboard
   ↓
2. Server component (page.tsx) calls getDashboardData()
   ↓
3. fetchMarketsForVenue() fetches markets from Dome API
   ↓
4. fetchPricesForMarkets() gets real-time prices for each market
   ↓
5. Markets are filtered (only valid prices shown)
   ↓
6. Sharp alignment metrics are computed
   ↓
7. Data is passed to client component
   ↓
8. Dashboard renders with live data
   ↓
9. Auto-refreshes every 15 seconds
```

### Sharp Alignment Calculation

```typescript
// Example calculation
const sharpAlignment = max(yesSharps, noSharps) / totalSharps

// If 7 wallets say YES and 2 say NO:
// sharpAlignment = max(7, 2) / 9 = 0.78 (78% alignment)
```

### Price Fetching

1. **Market List**: Fetch up to 100 markets from Polymarket
2. **Token ID Extraction**: Get the YES token ID from each market
3. **Price Lookup**: Call Dome API to get current price for each token
4. **Filtering**: Only show markets where price was successfully fetched
5. **Display**: Show prices as percentages (e.g., "76.5%")

---

## 🔌 API Integration

### Dome API

The project uses the [Dome API](https://docs.domeapi.io) to fetch prediction market data.

**Endpoints Used:**
- `GET /polymarket/markets` - Fetch list of markets
- `GET /polymarket/prices/getTokenPrice` - Get price for a specific token

**Authentication:**
- Uses Bearer token authentication
- API key stored in `DOME_API_KEY` environment variable

**Rate Limiting:**
- Free tier: 1 request per second
- Consider implementing request queuing for production

### API Key Setup

1. Sign up at [Dome API](https://domeapi.io)
2. Get your API key from the dashboard
3. Add to `.env.local`:
   ```bash
   DOME_API_KEY=your_key_here
   ```
4. Restart dev server after adding

> **Note**: If you change the API key, clear Next.js cache:
> ```bash
> rm -rf .next
> npm run dev
> ```

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Development Workflow

1. **Make changes** to code
2. **Save files** - Next.js hot-reloads automatically
3. **Check browser** - See changes instantly
4. **Check console** - View logs and errors
5. **Test features** - Verify everything works

### Debug Endpoints

- **`/api/debug-dome`**: Inspect Dome SDK structure and test API calls
- **`/api/test-dome`**: Test Dome API connectivity

### Common Issues

**Problem**: Dashboard shows "DATA FEED OFFLINE"
- **Solution**: Check that `DOME_API_KEY` is set in `.env.local` and restart server

**Problem**: No markets showing
- **Solution**: Check server logs for API errors, verify API key is valid

**Problem**: Prices all showing 0.50
- **Solution**: Check that price fetching is working (see server logs)

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub** (if not already)
2. **Import project** on [Vercel](https://vercel.com)
3. **Add environment variables**:
   - `DOME_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL` (if using)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (if using)
4. **Deploy** - Vercel builds and deploys automatically

### Other Platforms

- **Netlify**: Similar to Vercel, supports Next.js
- **Railway**: Good for full-stack apps
- **AWS Amplify**: Enterprise option

### Environment Variables in Production

Make sure to add all environment variables in your hosting platform's dashboard. Never commit `.env.local` to git!

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add amazing feature'`)
5. Push to your fork (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## ❓ FAQ

### What are prediction markets?

Prediction markets allow people to bet on the outcome of events. For example, "Will it rain tomorrow?" or "Will Bitcoin reach $100k?" You can buy YES or NO shares, and the price reflects the market's probability.

### What is a "sharp wallet"?

A sharp wallet is an address belonging to a trader with a proven track record of profitability. These traders often have better information or analysis, so tracking their positions can be valuable.

### Why only Polymarket markets?

Currently, the project focuses on Polymarket because:
- It's the largest prediction market platform
- Dome API has excellent Polymarket support
- Kalshi integration is planned for the future

### How often does data refresh?

The dashboard auto-refreshes every 15 seconds. You can also manually refresh by reloading the page.

### Can I use this for trading?

This is an analytics tool, not trading advice. Always do your own research before making trading decisions.

### Is this free to use?

The code is free, but you'll need:
- A Dome API key (free tier available)
- Optional: Supabase account (free tier available)

---

## 📚 Learning Resources

### For Beginners

- [Next.js Tutorial](https://nextjs.org/learn) - Learn Next.js basics
- [React Documentation](https://react.dev) - React fundamentals
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide

### Related Concepts

- **API Integration**: How to fetch data from external APIs
- **Server Components**: Next.js 13+ feature for server-side rendering
- **Type Safety**: Using TypeScript to catch errors early
- **Real-time Data**: Updating UI with live data

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- [Dome API](https://domeapi.io) for providing market data access
- [Polymarket](https://polymarket.com) for the prediction markets
- [Next.js](https://nextjs.org) team for the amazing framework
- [Vercel](https://vercel.com) for hosting and deployment tools

---

## 📧 Contact & Support

- **GitHub Issues**: [Open an issue](https://github.com/TobyKThurston/Apex-Terminal/issues)
- **Documentation**: See `/docs` folder for detailed guides
- **Troubleshooting**: Check [API_KEY_TROUBLESHOOTING.md](./API_KEY_TROUBLESHOOTING.md)

---

## 🗺️ Roadmap

- [ ] Add Kalshi market support
- [ ] Implement real wallet analytics (currently using mock data)
- [ ] Historical price charts
- [ ] Data export (CSV/JSON)
- [ ] Email alerts for high-alignment signals
- [ ] Mobile app version
- [ ] User authentication
- [ ] Saved watchlists

---

**Built with ❤️ by TobyKThurston**

*Last updated: January 2025*
