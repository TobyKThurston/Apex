# Setup Guide for Apex Terminal

A step-by-step guide to get Apex Terminal running on your machine.

## Prerequisites Checklist

Before starting, make sure you have:

- [ ] **Node.js 18+** installed
  - Check: `node --version` (should show v18.x.x or higher)
  - Download: [nodejs.org](https://nodejs.org/)
  
- [ ] **npm** installed (comes with Node.js)
  - Check: `npm --version`
  
- [ ] **Git** installed
  - Check: `git --version`
  - Download: [git-scm.com](https://git-scm.com/)

- [ ] **Code Editor** (VS Code recommended)
  - Download: [code.visualstudio.com](https://code.visualstudio.com/)

- [ ] **Dome API Key**
  - Sign up: [domeapi.io](https://domeapi.io)
  - Get your API key from the dashboard

## Step-by-Step Setup

### Step 1: Clone the Repository

```bash
# Navigate to where you want the project
cd ~/projects  # or wherever you keep projects

# Clone the repository
git clone https://github.com/TobyKThurston/Apex-Terminal.git

# Navigate into the project
cd Apex-Terminal
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install
```

**What this does:**
- Reads `package.json` to see what packages are needed
- Downloads them from npm (Node Package Manager)
- Installs them in `node_modules/` folder

**Expected output:**
```
added 500+ packages in 30s
```

### Step 3: Create Environment File

```bash
# Create the environment file
touch .env.local
```

**Or on Windows:**
```cmd
type nul > .env.local
```

### Step 4: Add Your API Key

Open `.env.local` in your editor and add:

```bash
# Dome API Key (required)
DOME_API_KEY=your_actual_api_key_here

# Supabase (optional - only if using waitlist)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important:**
- Replace `your_actual_api_key_here` with your real API key
- Don't use quotes around the key
- Don't commit this file to git (it's in `.gitignore`)

### Step 5: Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.0.3
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

### Step 6: Open in Browser

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see:
- **Homepage** at `/` - Landing page
- **Dashboard** at `/dashboard` - Market analytics (requires API key)

## Verifying Setup

### Check Dashboard Works

1. Go to `http://localhost:3000/dashboard`
2. You should see:
   - Either: Live market data (if API key works)
   - Or: "DATA FEED OFFLINE" message (if API key missing/invalid)

### Check API Key

Visit `http://localhost:3000/api/debug-dome` to see:
- API key status
- SDK structure
- Test API call results

## Common Issues

### Issue: "Cannot find module"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Or use a different port:
PORT=3001 npm run dev
```

### Issue: Dashboard shows "DATA FEED OFFLINE"

**Solutions:**
1. Check `.env.local` exists and has `DOME_API_KEY`
2. Verify API key is correct (no quotes, no spaces)
3. Restart dev server: `Ctrl+C` then `npm run dev`
4. Clear Next.js cache: `rm -rf .next` then restart

### Issue: "API Error: Rate Limit Exceeded"

**Explanation:**
Free tier Dome API allows 1 request per second.

**Solution:**
- Wait a moment and try again
- Consider upgrading API tier
- Reduce number of markets fetched

## Next Steps

Once setup is complete:

1. **Explore the codebase**
   - Read `README.md`
   - Check `docs/` folder
   - Look at `lib/dashboard-data.ts`

2. **Make changes**
   - Edit files
   - See changes instantly (hot reload)
   - Check browser console for errors

3. **Learn more**
   - Read `docs/LEARNING_GUIDE.md`
   - Check `docs/ARCHITECTURE.md`
   - Review code comments

## Production Build

To build for production:

```bash
# Build the project
npm run build

# Start production server
npm start
```

**Note:** Production builds are optimized and faster, but don't have hot reload.

## Getting Help

If you're stuck:

1. Check the [troubleshooting guide](./API_KEY_TROUBLESHOOTING.md)
2. Read the [documentation](./README.md)
3. Open an issue on GitHub
4. Check browser console for errors

## Tips

- **Keep terminal open**: You'll see logs and errors there
- **Use browser DevTools**: Press F12 to inspect
- **Read error messages**: They usually tell you what's wrong
- **Start small**: Make small changes and test them

Happy coding! 🚀
