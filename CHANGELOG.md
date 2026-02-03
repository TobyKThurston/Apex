# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-XX

### Added
- **Initial release** of Apex Terminal
- **Dashboard page** (`/dashboard`) with live Polymarket market data
- **Real-time price fetching** from Dome API for Polymarket markets
- **Sharp wallet analytics** with alignment metrics and smart side detection
- **Signal feed** showing real-time market activity events
- **Terminal-style UI** with cyberpunk aesthetic
- **Market filtering** to only show markets with valid prices
- **Auto-refresh** functionality (every 15 seconds)
- **Error handling** with graceful fallbacks
- **Waitlist page** (`/waitlist`) with Supabase integration
- **Debug endpoints** (`/api/debug-dome`, `/api/test-dome`) for API troubleshooting

### Features
- Fetches up to 100 Polymarket markets
- Computes sharp alignment scores (0.00-1.00)
- Identifies smart side (YES/NO) based on sharp wallet consensus
- Generates signal tags (PRE-MOVE, ANOMALY, NORMAL)
- Tracks wallet counts and net flow
- Filters out markets without valid prices
- Responsive design for desktop and mobile

### Technical
- Next.js 16 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Motion (Framer Motion) for animations
- Dome API SDK integration
- Supabase integration (optional, for waitlist)

### Documentation
- Comprehensive README with setup instructions
- Contributing guidelines
- API integration documentation
- Troubleshooting guides

---

## [Unreleased]

### Planned
- Kalshi market support
- Real wallet analytics (currently using mock data)
- Historical price charts
- Data export functionality
- Email alerts for high-alignment signals
- Mobile app version

---

## Notes

- Currently focuses on Polymarket markets only
- Kalshi support was removed temporarily due to API limitations
- Price fetching uses outcome token IDs for accurate pricing
- Markets without valid prices are automatically filtered out
