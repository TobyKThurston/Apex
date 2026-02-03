# 🎯 Apex Terminal

> **Real-time prediction market analytics powered by sharp wallet intelligence**

Apex Terminal is a sophisticated dashboard that tracks and analyzes prediction markets from Polymarket, identifying where "sharp" wallets (successful traders) are positioning themselves. Built with Next.js and powered by the Dome API.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)

---

## ✨ Features

### 📊 **Live Market Dashboard**
- **Real-time price tracking** from Polymarket markets
- **Sharp wallet alignment** metrics showing where successful traders are positioned
- **Smart side detection** (YES/NO) based on sharp wallet consensus
- **Signal feed** with real-time market activity events
- **Auto-refresh** every 15 seconds for live data

### 🎨 **Terminal-Style UI**
- Cyberpunk-inspired terminal interface
- Animated signal feed with color-coded events
- Interactive market selection with detailed breakdowns
- Responsive design for desktop and mobile

### 🔍 **Analytics & Insights**
- **Sharp Alignment Score**: Measures consensus among tracked sharp wallets (0.00-1.00)
- **Wallet Counts**: Tracks YES/NO positions from sharp wallets
- **Net Flow**: Shows recent wallet activity trends
- **Signal Tags**: PRE-MOVE, ANOMALY, and NORMAL classifications

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Dome API key ([get one here](https://domeapi.io))
- (Optional) Supabase account for waitlist functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/apex-terminal.git
   cd apex-terminal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Required: Dome API key for market data
   DOME_API_KEY=your_dome_api_key_here
   
   # Optional: Supabase for waitlist (if using)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)
   
   - **Homepage**: `/` - Landing page with terminal UI
   - **Dashboard**: `/dashboard` - Live market analytics dashboard
   - **Waitlist**: `/waitlist` - Sign up page (if Supabase is configured)

---

## 📖 Project Structure

```
apex-terminal/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages and components
│   ├── waitlist/          # Waitlist signup page
│   └── api/               # API routes (debug/test endpoints)
├── lib/                    # Core library functions
│   ├── dashboard-data.ts  # Market data fetching & processing
│   ├── dome.ts            # Dome API client setup
│   ├── types.ts           # TypeScript type definitions
│   └── supabase.ts        # Supabase client (if used)
├── public/                 # Static assets
└── scripts/               # Utility scripts
```

---

## 🔧 Configuration

### Dome API Setup

The dashboard fetches live market data from Polymarket via the Dome API. 

1. **Get your API key** from [Dome API](https://domeapi.io)
2. **Add to `.env.local`**:
   ```bash
   DOME_API_KEY=your_api_key_here
   ```
3. **Restart your dev server** after adding the key

> **Note**: If you change the API key, you may need to clear the Next.js cache:
> ```bash
> rm -rf .next
> npm run dev
> ```

### Supabase Setup (Optional)

If you want to use the waitlist feature:

1. Create a project at [Supabase](https://supabase.com)
2. Run the SQL script in `supabase-setup.sql` to create the waitlist table
3. Add your Supabase credentials to `.env.local`

---

## 🎯 How It Works

### Market Data Flow

1. **Fetch Markets**: Retrieves up to 100 active Polymarket markets via Dome SDK
2. **Get Prices**: Fetches real-time prices for each market's YES token
3. **Filter Valid**: Only shows markets where prices were successfully fetched
4. **Compute Metrics**: Calculates sharp alignment, smart side, and signal tags
5. **Display**: Renders markets sorted by sharp alignment (highest first)

### Sharp Wallet Analytics

The system tracks "sharp" wallets (successful traders) and computes:

- **Sharp Alignment**: `max(yesSharps, noSharps) / totalSharps`
- **Smart Side**: The side with more sharp wallets (YES or NO)
- **Signal Tags**: 
  - `PRE-MOVE`: High alignment (≥0.9) with recent activity
  - `ANOMALY`: Low alignment or split consensus
  - `NORMAL`: Standard market conditions

---

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Debug Endpoints

- `/api/debug-dome` - Inspect Dome SDK structure and test API calls
- `/api/test-dome` - Test Dome API connectivity

---

## 📝 Documentation

- **[DOME_INTEGRATION.md](./lib/DOME_INTEGRATION.md)** - Dome API integration guide
- **[TESTING_DOME.md](./TESTING_DOME.md)** - Testing and debugging guide
- **[API_KEY_TROUBLESHOOTING.md](./API_KEY_TROUBLESHOOTING.md)** - Common API key issues

---

## 🎨 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animations**: [Motion](https://motion.dev) (formerly Framer Motion)
- **API**: [Dome API SDK](https://docs.domeapi.io) for market data
- **Database**: [Supabase](https://supabase.com) (optional, for waitlist)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add comments for complex logic
- Test your changes locally before submitting

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- [Dome API](https://domeapi.io) for providing market data access
- [Polymarket](https://polymarket.com) for the prediction markets
- [Next.js](https://nextjs.org) team for the amazing framework

---

## 📧 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting guide](./API_KEY_TROUBLESHOOTING.md)
2. Review the [Dome integration docs](./lib/DOME_INTEGRATION.md)
3. Open an issue on GitHub

---

## 🚧 Roadmap

- [ ] Add Kalshi market support
- [ ] Implement real wallet analytics (currently using mock data)
- [ ] Add historical price charts
- [ ] Export market data to CSV/JSON
- [ ] Add email alerts for high-alignment signals
- [ ] Mobile app version

---

**Built with ❤️ for the prediction market community**

*Last updated: 2025*
