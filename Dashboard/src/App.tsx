import React from 'react';
import { motion } from 'motion/react';

export default function App() {
  const [selectedMarket, setSelectedMarket] = React.useState(0);
  const [logLines, setLogLines] = React.useState([
    { time: '13:07:12', text: 'SHARP POSITION', detail: ' / POLY-ETH-VOL / ', highlight: '+$47K', color: '#4a9eb8', highlightColor: '#ff8800' },
    { time: '13:07:18', text: 'CLUSTER EXPANSION', detail: ' / 3 → 5 WALLETS', highlight: '', color: '#4a9eb8', highlightColor: '' },
    { time: '13:07:23', text: 'WALLET SYNC DETECTED', detail: ' / 0x2E8F… ⇄ 0x7A1B…', highlight: '', color: '#00d9ff', highlightColor: '' },
    { time: '13:07:29', text: 'ANOMALY RESOLVED', detail: ' / ', highlight: '-0.04 DRIFT', color: '#4a9eb8', highlightColor: '#00ff88' },
    { time: '13:07:34', text: 'VENUE CORRELATION', detail: ' / POLY ↔ KAL / ', highlight: '0.87', color: '#00d9ff', highlightColor: '#00ff88' },
    { time: '13:07:41', text: 'SHARP POSITION', detail: ' / KAL-BTC-2024 / ', highlight: '+$23K', color: '#4a9eb8', highlightColor: '#ff8800' },
    { time: '13:07:48', text: 'SIGNAL STRENGTH', detail: ' / ', highlight: '+0.09', color: '#4a9eb8', highlightColor: '#00ff88' }
  ]);
  
  const [cursorVisible, setCursorVisible] = React.useState(true);
  
  // Markets data
  const markets = [
    {
      name: 'Will ETH reach $3,000 by end of Q1 2025?',
      venue: 'POLY',
      price: '0.73',
      alignment: 0.93,
      walletsYes: 7,
      walletsNo: 1,
      netFlow: '+6 wallets / 2h',
      signal: 'PRE-MOVE',
      signalColor: '#ff8800'
    },
    {
      name: 'Bitcoin to exceed $100K before March 2025',
      venue: 'KAL',
      price: '0.58',
      alignment: 0.87,
      walletsYes: 5,
      walletsNo: 2,
      netFlow: '+3 wallets / 4h',
      signal: 'ANOMALY',
      signalColor: '#ff0066'
    },
    {
      name: 'US inflation rate below 2.5% in February',
      venue: 'POLY',
      price: '0.42',
      alignment: 0.91,
      walletsYes: 8,
      walletsNo: 1,
      netFlow: '+7 wallets / 1h',
      signal: 'PRE-MOVE',
      signalColor: '#ff8800'
    },
    {
      name: 'Will there be a major AI regulation bill passed in 2025?',
      venue: 'KAL',
      price: '0.65',
      alignment: 0.78,
      walletsYes: 4,
      walletsNo: 3,
      netFlow: '+1 wallets / 6h',
      signal: 'NORMAL',
      signalColor: '#4a9eb8'
    },
    {
      name: 'S&P 500 above 5,500 by end of Q1 2025',
      venue: 'POLY',
      price: '0.81',
      alignment: 0.95,
      walletsYes: 9,
      walletsNo: 0,
      netFlow: '+9 wallets / 3h',
      signal: 'PRE-MOVE',
      signalColor: '#ff8800'
    },
    {
      name: 'Will major tech layoffs continue through March 2025?',
      venue: 'KAL',
      price: '0.47',
      alignment: 0.82,
      walletsYes: 6,
      walletsNo: 2,
      netFlow: '+4 wallets / 5h',
      signal: 'NORMAL',
      signalColor: '#4a9eb8'
    }
  ];

  // Blinking cursor
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Rolling log updates
  React.useEffect(() => {
    const logPool = [
      { time: '13:08:02', text: 'WALLET SYNC DETECTED', detail: ' / 0x9F2A… ⇄ 0x1E8B…', highlight: '', color: '#00d9ff', highlightColor: '' },
      { time: '13:08:09', text: 'SHARP POSITION', detail: ' / POLY-USD-INFL / ', highlight: '+$31K', color: '#4a9eb8', highlightColor: '#ff8800' },
      { time: '13:08:15', text: 'CLUSTER EXPANSION', detail: ' / 4 → 7 WALLETS', highlight: '', color: '#4a9eb8', highlightColor: '' },
      { time: '13:08:22', text: 'ANOMALY DETECTED', detail: ' / ', highlight: '+0.11 DRIFT', color: '#ff0066', highlightColor: '#ff0066' },
      { time: '13:08:29', text: 'VENUE CORRELATION', detail: ' / POLY ↔ KAL / ', highlight: '0.91', color: '#00d9ff', highlightColor: '#00ff88' },
      { time: '13:08:35', text: 'SIGNAL STRENGTH', detail: ' / ', highlight: '+0.12', color: '#4a9eb8', highlightColor: '#00ff88' }
    ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      setLogLines(prev => {
        const newLine = logPool[currentIndex % logPool.length];
        currentIndex++;
        return [...prev.slice(1), newLine];
      });
    }, 3200);
    
    return () => clearInterval(interval);
  }, []);

  // Alignment history data for selected market
  const alignmentHistory = [
    0.72, 0.75, 0.78, 0.82, 0.84, 0.87, 0.89, 0.90, 0.91, 0.92, 0.93
  ];

  return (
    <div 
      className="relative overflow-hidden bg-[#040509] w-screen h-screen"
      style={{
        cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><line x1="10.5" y1="3" x2="10.5" y2="8" stroke="%2300C6FF" stroke-width="1.5"/><line x1="10.5" y1="13" x2="10.5" y2="18" stroke="%2300C6FF" stroke-width="1.5"/><line x1="3" y1="10.5" x2="8" y2="10.5" stroke="%2300C6FF" stroke-width="1.5"/><line x1="13" y1="10.5" x2="18" y2="10.5" stroke="%2300C6FF" stroke-width="1.5"/><circle cx="10.5" cy="10.5" r="1.5" fill="%2300C6FF" opacity="0.4"/></svg>') 10 10, crosshair`
      }}
    >
      {/* Background texture layers */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          opacity: [1, 1.03, 1, 1, 1.03, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          times: [0, 0.02, 0.04, 0.5, 0.52, 1]
        }}
      >
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }} />
        
        {/* Micro-grid */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `
            linear-gradient(to right, #101820 1px, transparent 1px),
            linear-gradient(to bottom, #101820 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px'
        }} />
        
        {/* PCB traces with pulse animation */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <motion.line 
            x1="0" y1="180" x2="520" y2="180" 
            stroke="#00d9ff" 
            strokeWidth="0.5"
            animate={{ opacity: [0.12, 0.35, 0.12, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, times: [0, 0.05, 0.1, 1] }}
          />
          <motion.line 
            x1="520" y1="180" x2="520" y2="420" 
            stroke="#00d9ff" 
            strokeWidth="0.5"
            animate={{ opacity: [0.12, 0.12, 0.35, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, times: [0, 0.05, 0.1, 1], delay: 0.15 }}
          />
          <motion.line 
            x1="520" y1="420" x2="720" y2="420" 
            stroke="#00d9ff" 
            strokeWidth="0.5"
            animate={{ opacity: [0.12, 0.12, 0.35, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, times: [0, 0.05, 0.1, 1], delay: 0.3 }}
          />
          <line x1="720" y1="420" x2="720" y2="280" stroke="#00d9ff" strokeWidth="0.5" />
          <motion.line 
            x1="720" y1="280" x2="1100" y2="280" 
            stroke="#00d9ff" 
            strokeWidth="0.5"
            animate={{ opacity: [0.12, 0.12, 0.35, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, times: [0, 0.05, 0.1, 1], delay: 0.45 }}
          />
        </svg>
        
        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '100% 4px'
        }} />
      </motion.div>

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 h-10 border-b border-[#0a1520] flex items-center justify-between px-6 z-50" style={{ fontFamily: 'Space Mono, monospace' }}>
        <div className="flex items-center gap-4">
          {/* Small APEX_ wordmark */}
          <div className="text-[11px] tracking-[0.15em] text-[#00d9ff] uppercase mr-2">
            APEX_
          </div>
          <div className="text-[9px] tracking-[0.15em] text-[#4a9eb8] uppercase">
            NODE v0.3.9 / INTERNAL BUILD / SIGNAL MIRROR
          </div>
        </div>
        <div className="text-[9px] tracking-[0.15em] text-[#4a9eb8] uppercase">
          LINK: <motion.span 
            className="text-[#00ff88]"
            animate={{ 
              opacity: [1, 0.7, 1],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >LIVE</motion.span> • VENUES: POLY / KAL / … • UTC 13:07:22
        </div>
      </div>

      {/* Main content container */}
      <div className="absolute inset-0 top-10 flex" style={{ bottom: '60px' }}>
        {/* Left/Center - Markets Table */}
        <div className="flex-1 relative">
          {/* Radar HUD background - subtle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="700" height="700" viewBox="0 0 700 700" className="opacity-20">
              <motion.circle 
                cx="350" cy="350" r="200" 
                fill="none" 
                stroke="#0a4a5a" 
                strokeWidth="0.5"
                animate={{ r: [200, 204, 200] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle 
                cx="350" cy="350" r="280" 
                fill="none" 
                stroke="#0a4a5a" 
                strokeWidth="0.5"
                animate={{ r: [280, 285.6, 280] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle 
                cx="350" cy="350" r="350" 
                fill="none" 
                stroke="#0a4a5a" 
                strokeWidth="0.8"
                animate={{ r: [350, 357, 350] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Cross lines */}
              <line x1="0" y1="350" x2="700" y2="350" stroke="#0a4a5a" strokeWidth="0.5" opacity="0.5" />
              <line x1="350" y1="0" x2="350" y2="700" stroke="#0a4a5a" strokeWidth="0.5" opacity="0.5" />
            </svg>
          </div>

          {/* Markets Table */}
          <div className="relative z-10 p-8 h-full flex flex-col">
            <div className="mb-6">
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#4a9eb8]" style={{ fontFamily: 'Space Mono, monospace' }}>
                ACTIVE MARKETS / RANKED BY SHARP ALIGNMENT
              </div>
              <div className="text-[8px] text-[#2a4b5a] mt-1.5" style={{ fontFamily: 'Space Mono, monospace' }}>
                Alignment = share of tracked sharp wallets on the same side (0.00–1.00).
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-hidden">
              <table className="w-full" style={{ fontFamily: 'Space Mono, monospace' }}>
                <thead>
                  <tr className="text-[9px] tracking-[0.15em] uppercase text-[#4a9eb8] border-b border-[#0d1820]">
                    <th className="text-left pb-3 pr-4">Market</th>
                    <th className="text-left pb-3 pr-3">Venue</th>
                    <th className="text-left pb-3 pr-3">Price</th>
                    <th className="text-left pb-3 pr-3">Smart Side</th>
                    <th className="text-left pb-3 pr-4">
                      <div className="flex items-center gap-1.5">
                        <span>Sharp Alignment</span>
                        <svg width="8" height="8" viewBox="0 0 8 8" className="opacity-60">
                          <path d="M4 0 L7 6 L1 6 Z" fill="#00d9ff" />
                        </svg>
                      </div>
                    </th>
                    <th className="text-left pb-3 pr-3">Wallets</th>
                    <th className="text-left pb-3 pr-3">Net Flow</th>
                    <th className="text-left pb-3">Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((market, idx) => {
                    const totalWallets = market.walletsYes + market.walletsNo;
                    const smartSide = market.walletsYes > market.walletsNo ? 'YES' : 'NO';
                    const majorityCount = Math.max(market.walletsYes, market.walletsNo);
                    
                    return (
                    <motion.tr 
                      key={idx}
                      className={`border-b border-[#0a1520] cursor-pointer ${selectedMarket === idx ? 'bg-[#00d9ff]/5' : ''}`}
                      onClick={() => setSelectedMarket(idx)}
                      whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.03)' }}
                      transition={{ duration: 0.1 }}
                    >
                      <td className="py-4 pr-4 text-[11px] text-[#c8d8e8] max-w-[320px]">{market.name}</td>
                      <td className="py-4 pr-3 text-[10px] text-[#4a9eb8]">{market.venue}</td>
                      <td className="py-4 pr-3 text-[12px] text-[#00ff88]">{market.price}</td>
                      
                      {/* Smart Side pill */}
                      <td className="py-4 pr-3">
                        <span 
                          className="text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 border inline-block"
                          style={{ 
                            color: smartSide === 'YES' ? '#00d9ff' : '#ff0066',
                            borderColor: smartSide === 'YES' ? '#00d9ff60' : '#ff006660',
                            backgroundColor: smartSide === 'YES' ? '#00d9ff10' : '#ff006610'
                          }}
                        >
                          {smartSide}
                        </span>
                      </td>
                      
                      {/* Sharp Alignment - visually dominant */}
                      <td className="py-4 pr-4">
                        <div className="space-y-1.5">
                          <div className={`text-[14px] ${market.alignment >= 0.9 ? 'text-[#00d9ff]' : 'text-[#4a9eb8]'}`}>
                            {market.alignment.toFixed(2)}
                          </div>
                          <div className="text-[7px] text-[#2a4b5a] tracking-[0.05em]">
                            {majorityCount} of {totalWallets} {smartSide}
                          </div>
                          {/* Alignment bar */}
                          <div className="w-16 h-[2px] bg-[#0d1820] relative overflow-hidden">
                            <motion.div 
                              className="absolute inset-y-0 left-0"
                              style={{ 
                                width: `${market.alignment * 100}%`,
                                backgroundColor: market.alignment >= 0.9 ? '#00d9ff' : '#4a9eb8',
                                opacity: 0.3 + (market.alignment * 0.5)
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${market.alignment * 100}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 pr-3 text-[11px] text-[#c8d8e8]">
                        <span className="text-[#00ff88]">{market.walletsYes}Y</span> / <span className="text-[#ff0066]">{market.walletsNo}N</span>
                      </td>
                      <td className="py-4 pr-3 text-[10px] text-[#4a9eb8]">{market.netFlow}</td>
                      <td className="py-4">
                        <span 
                          className="text-[8px] tracking-[0.15em] uppercase px-2 py-1 border"
                          style={{ 
                            color: market.signalColor,
                            borderColor: market.signalColor + '40',
                            backgroundColor: market.signalColor + '10'
                          }}
                        >
                          {market.signal}
                        </span>
                      </td>
                    </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right - Market Detail Card (top 2/3) + Signal Feed (bottom 1/3) */}
        <div className="w-[420px] bg-[#070c12] border-l border-[#0d1820] relative flex flex-col">
          {/* Inner glow effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,217,255,0.03)]" />
          
          {/* Market Detail Card - takes up ~2/3 */}
          <div className="relative z-10 flex-[2] p-6 flex flex-col border-b border-[#0d1820]">
            {/* Header */}
            <div className="mb-4 pb-3 border-b border-[#0d1820]">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#4a9eb8] mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                {markets[selectedMarket].venue} / SELECTED MARKET
              </div>
              <div className="text-[12px] text-[#c8d8e8] leading-relaxed" style={{ fontFamily: 'Space Mono, monospace' }}>
                {markets[selectedMarket].name}
              </div>
            </div>

            {/* Current Price + Sharp Alignment Summary */}
            <div className="mb-4">
              <div className="text-[24px] text-[#00ff88] mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>{markets[selectedMarket].price}</div>
              <div className="text-[8px] text-[#4a9eb8] tracking-[0.1em] uppercase mb-3" style={{ fontFamily: 'Space Mono, monospace' }}>YES PROBABILITY</div>
              
              {/* Sharp Alignment Summary */}
              <div className="text-[10px] text-[#00d9ff] tracking-[0.05em]" style={{ fontFamily: 'Space Mono, monospace' }}>
                SHARP ALIGNMENT {markets[selectedMarket].alignment.toFixed(2)} · {markets[selectedMarket].walletsYes} YES / {markets[selectedMarket].walletsNo} NO
              </div>
            </div>

            {/* Sharp wallets breakdown */}
            <div className="flex-1 overflow-auto">
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#4a9eb8] mb-3 pb-2 border-b border-[#0d1820]" style={{ fontFamily: 'Space Mono, monospace' }}>
                SHARP WALLET POSITIONING
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-[#00ff88] mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                    YES ({markets[selectedMarket].walletsYes})
                  </div>
                  <div className="space-y-1.5 text-[9px]" style={{ fontFamily: 'Space Mono, monospace' }}>
                    <div className="flex justify-between text-[#c8d8e8]">
                      <span>WALLET-019</span>
                      <span className="text-[#4a9eb8]">Tier S</span>
                    </div>
                    <div className="flex justify-between text-[#c8d8e8]">
                      <span>WALLET-043</span>
                      <span className="text-[#4a9eb8]">Tier A</span>
                    </div>
                    <div className="flex justify-between text-[#c8d8e8]">
                      <span>WALLET-127</span>
                      <span className="text-[#4a9eb8]">Tier S</span>
                    </div>
                    {markets[selectedMarket].walletsYes > 3 && (
                      <div className="text-[#4a9eb8] text-[8px] italic">
                        +{markets[selectedMarket].walletsYes - 3} more
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-[#ff0066] mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                    NO ({markets[selectedMarket].walletsNo})
                  </div>
                  <div className="space-y-1.5 text-[9px]" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {markets[selectedMarket].walletsNo > 0 && (
                      <div className="flex justify-between text-[#c8d8e8]">
                        <span>WALLET-088</span>
                        <span className="text-[#4a9eb8]">Tier B</span>
                      </div>
                    )}
                    {markets[selectedMarket].walletsNo > 1 && (
                      <div className="flex justify-between text-[#c8d8e8]">
                        <span>WALLET-156</span>
                        <span className="text-[#4a9eb8]">Tier A</span>
                      </div>
                    )}
                    {markets[selectedMarket].walletsNo === 0 && (
                      <div className="text-[#4a9eb8] text-[8px] italic">
                        No sharp wallets
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signal Feed - takes up ~1/3 at bottom */}
          <div className="relative z-10 flex-1 p-6">
            {/* Header */}
            <div className="text-[10px] tracking-[0.25em] uppercase mb-4 pb-3 border-b border-[#0d1820] text-[#4a9eb8]" style={{ fontFamily: 'Space Mono, monospace' }}>
              APEX // SIGNAL FEED
            </div>
            
            {/* Rolling log */}
            <div className="overflow-hidden">
              <div className="text-[9px] tracking-[0.02em] space-y-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                {logLines.map((log, idx) => (
                  <LogLine key={`${log.time}-${idx}`} log={log} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom command bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] border-t border-[#0a1520] flex items-center justify-between px-6" style={{ fontFamily: 'Space Mono, monospace' }}>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#00d9ff]">{'>'}</span>
          <span className="text-[10px] text-[#4a9eb8] tracking-[0.05em]">
            FILTER sharp_alignment {'>'} 0.8 AND sharp_wallets {'>='} 3 <span className="text-[#2a4b5a]">// high-conviction clusters only</span>
          </span>
          <motion.span 
            className="inline-block ml-1 text-[10px] text-[#00d9ff]"
            animate={{ opacity: cursorVisible ? 1 : 0 }}
          >_</motion.span>
        </div>
        <motion.button 
          className="px-5 py-2 bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-[9px] tracking-[0.2em] uppercase" 
          whileHover={{
            borderColor: 'rgba(0, 217, 255, 0.6)',
            backgroundColor: 'rgba(0, 217, 255, 0.15)',
          }}
          transition={{ duration: 0.1 }}
        >
          SAVE VIEW
        </motion.button>
      </div>
    </div>
  );
}

// Component for animated log lines
function LogLine({ log, index }: { log: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: index === 6 ? 1 : 0.7 - (index * 0.08), x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      style={{ color: '#3a5b6a' }}
    >
      {log.time} <span style={{ color: log.color }}>{log.text}</span>{log.detail}
      {log.highlight && <span style={{ color: log.highlightColor }}>{log.highlight}</span>}
    </motion.div>
  );
}