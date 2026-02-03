'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { DashboardData, MarketRow, SignalEvent } from '@/lib/types';

interface DashboardClientProps {
  initialData: DashboardData;
  error: string | null;
}

export default function DashboardClient({ initialData, error }: DashboardClientProps) {
  const [selectedMarketId, setSelectedMarketId] = React.useState<string | null>(
    initialData.markets.length > 0 ? initialData.markets[0].id : null
  );
  const [cursorVisible, setCursorVisible] = React.useState(true);
  const [logLines, setLogLines] = React.useState<SignalEvent[]>(initialData.signalEvents);

  const selectedMarket = initialData.markets.find(m => m.id === selectedMarketId) || initialData.markets[0];

  // Blinking cursor
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Rolling log updates (if we want to add more events dynamically)
  React.useEffect(() => {
    if (initialData.signalEvents.length > 0) {
      setLogLines(initialData.signalEvents);
    }
  }, [initialData.signalEvents]);

  // Get signal color based on tag
  const getSignalColor = (tag: string): string => {
    switch (tag) {
      case 'PRE-MOVE':
        return '#ff8800';
      case 'ANOMALY':
        return '#ff0066';
      default:
        return '#4a9eb8';
    }
  };

  // Error state
  if (error) {
    return (
      <div className="relative overflow-hidden bg-[#040509] w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-[16px] text-[#ff0066] mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: 'Space Mono, monospace' }}>
            DATA FEED OFFLINE
          </div>
          <div className="text-[12px] text-[#4a9eb8] tracking-[0.1em]" style={{ fontFamily: 'Space Mono, monospace' }}>
            {error}
          </div>
          <div className="text-[10px] text-[#2a4b5a] mt-4 tracking-[0.05em]" style={{ fontFamily: 'Space Mono, monospace' }}>
            Check your Dome API key in .env.local
          </div>
        </div>
      </div>
    );
  }

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
        
        {/* PCB traces */}
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
          >LIVE</motion.span> • VENUES: POLY / KAL • CATEGORY: CULTURE • UTC {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>

      {/* Main content container */}
      <div className="absolute inset-0 top-10 flex" style={{ bottom: '60px' }}>
        {/* Left/Center - Markets Table */}
        <div className="flex-1 relative">
          {/* Radar HUD background */}
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
              <line x1="0" y1="350" x2="700" y2="350" stroke="#0a4a5a" strokeWidth="0.5" opacity="0.5" />
              <line x1="350" y1="0" x2="350" y2="700" stroke="#0a4a5a" strokeWidth="0.5" opacity="0.5" />
            </svg>
          </div>

          {/* Markets Table */}
          <div className="relative z-10 p-8 h-full flex flex-col">
            <div className="mb-6">
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#4a9eb8]" style={{ fontFamily: 'Space Mono, monospace' }}>
                CULTURE MARKETS / RANKED BY SHARP ALIGNMENT
              </div>
              <div className="text-[8px] text-[#2a4b5a] mt-1.5" style={{ fontFamily: 'Space Mono, monospace' }}>
                Alignment = share of tracked sharp wallets on the same side (0.00–1.00).
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
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
                  {initialData.markets.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-[11px] text-[#4a9eb8]">
                        No markets available
                      </td>
                    </tr>
                  ) : (
                    initialData.markets.map((market) => {
                      const totalWallets = market.walletCounts.yesSharps + market.walletCounts.noSharps;
                      const majorityCount = Math.max(market.walletCounts.yesSharps, market.walletCounts.noSharps);
                      const isSelected = selectedMarketId === market.id;
                      
                      return (
                        <motion.tr 
                          key={market.id}
                          className={`border-b border-[#0a1520] cursor-pointer ${isSelected ? 'bg-[#00d9ff]/5' : ''}`}
                          onClick={() => setSelectedMarketId(market.id)}
                          whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.03)' }}
                          transition={{ duration: 0.1 }}
                        >
                          <td className="py-4 pr-4 text-[11px] text-[#c8d8e8] max-w-[320px]">{market.question}</td>
                          <td className="py-4 pr-3 text-[10px] text-[#4a9eb8]">{market.venue}</td>
                          <td className="py-4 pr-3 text-[12px] text-[#00ff88]">{market.price.toFixed(2)}</td>
                          
                          {/* Smart Side pill */}
                          <td className="py-4 pr-3">
                            <span 
                              className="text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 border inline-block"
                              style={{ 
                                color: market.smartSide === 'YES' ? '#00d9ff' : '#ff0066',
                                borderColor: market.smartSide === 'YES' ? '#00d9ff60' : '#ff006660',
                                backgroundColor: market.smartSide === 'YES' ? '#00d9ff10' : '#ff006610'
                              }}
                            >
                              {market.smartSide}
                            </span>
                          </td>
                          
                          {/* Sharp Alignment */}
                          <td className="py-4 pr-4">
                            <div className="space-y-1.5">
                              <div className={`text-[14px] ${market.sharpAlignment >= 0.9 ? 'text-[#00d9ff]' : 'text-[#4a9eb8]'}`}>
                                {market.sharpAlignment.toFixed(2)}
                              </div>
                              <div className="text-[7px] text-[#2a4b5a] tracking-[0.05em]">
                                {majorityCount} of {totalWallets} {market.smartSide}
                              </div>
                              {/* Alignment bar */}
                              <div className="w-16 h-[2px] bg-[#0d1820] relative overflow-hidden">
                                <motion.div 
                                  className="absolute inset-y-0 left-0"
                                  style={{ 
                                    width: `${market.sharpAlignment * 100}%`,
                                    backgroundColor: market.sharpAlignment >= 0.9 ? '#00d9ff' : '#4a9eb8',
                                    opacity: 0.3 + (market.sharpAlignment * 0.5)
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${market.sharpAlignment * 100}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                          </td>
                          
                          <td className="py-4 pr-3 text-[11px] text-[#c8d8e8]">
                            <span className="text-[#00ff88]">{market.walletCounts.yesSharps}Y</span> / <span className="text-[#ff0066]">{market.walletCounts.noSharps}N</span>
                          </td>
                          <td className="py-4 pr-3 text-[10px] text-[#4a9eb8]">{market.netFlow}</td>
                          <td className="py-4">
                            <span 
                              className="text-[8px] tracking-[0.15em] uppercase px-2 py-1 border"
                              style={{ 
                                color: getSignalColor(market.signalTag),
                                borderColor: getSignalColor(market.signalTag) + '40',
                                backgroundColor: getSignalColor(market.signalTag) + '10'
                              }}
                            >
                              {market.signalTag}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right - Market Detail Card + Signal Feed */}
        {selectedMarket ? (
          <div className="w-[420px] bg-[#070c12] border-l border-[#0d1820] relative flex flex-col">
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,217,255,0.03)]" />
            
            {/* Market Detail Card */}
            <div className="relative z-10 flex-[2] p-6 flex flex-col border-b border-[#0d1820]">
              <div className="mb-4 pb-3 border-b border-[#0d1820]">
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#4a9eb8] mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  {selectedMarket.venue} / SELECTED MARKET
                </div>
                <div className="text-[12px] text-[#c8d8e8] leading-relaxed" style={{ fontFamily: 'Space Mono, monospace' }}>
                  {selectedMarket.question}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[24px] text-[#00ff88] mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>{selectedMarket.price.toFixed(2)}</div>
                <div className="text-[8px] text-[#4a9eb8] tracking-[0.1em] uppercase mb-3" style={{ fontFamily: 'Space Mono, monospace' }}>YES PROBABILITY</div>
                
                <div className="text-[10px] text-[#00d9ff] tracking-[0.05em]" style={{ fontFamily: 'Space Mono, monospace' }}>
                  SHARP ALIGNMENT {selectedMarket.sharpAlignment.toFixed(2)} · {selectedMarket.walletCounts.yesSharps} YES / {selectedMarket.walletCounts.noSharps} NO
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
                      YES ({selectedMarket.walletCounts.yesSharps})
                    </div>
                    <div className="space-y-1.5 text-[9px]" style={{ fontFamily: 'Space Mono, monospace' }}>
                      {selectedMarket.walletCounts.yesSharps > 0 ? (
                        Array.from({ length: Math.min(selectedMarket.walletCounts.yesSharps, 3) }).map((_, i) => (
                          <div key={i} className="flex justify-between text-[#c8d8e8]">
                            <span>{selectedMarket.id.slice(0, 8).toUpperCase()}-{String(i + 1).padStart(3, '0')}</span>
                            <span className="text-[#4a9eb8]">Tier {i === 0 ? 'S' : i === 1 ? 'A' : 'B'}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-[#4a9eb8] text-[8px] italic">No YES positions</div>
                      )}
                      {selectedMarket.walletCounts.yesSharps > 3 && (
                        <div className="text-[#4a9eb8] text-[8px] italic">
                          +{selectedMarket.walletCounts.yesSharps - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[9px] tracking-[0.2em] uppercase text-[#ff0066] mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                      NO ({selectedMarket.walletCounts.noSharps})
                    </div>
                    <div className="space-y-1.5 text-[9px]" style={{ fontFamily: 'Space Mono, monospace' }}>
                      {selectedMarket.walletCounts.noSharps > 0 ? (
                        Array.from({ length: Math.min(selectedMarket.walletCounts.noSharps, 3) }).map((_, i) => (
                          <div key={i} className="flex justify-between text-[#c8d8e8]">
                            <span>{selectedMarket.id.slice(0, 8).toUpperCase()}-{String(i + 10).padStart(3, '0')}</span>
                            <span className="text-[#4a9eb8]">Tier {i === 0 ? 'B' : i === 1 ? 'A' : 'C'}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-[#4a9eb8] text-[8px] italic">No NO positions</div>
                      )}
                      {selectedMarket.walletCounts.noSharps > 3 && (
                        <div className="text-[#4a9eb8] text-[8px] italic">
                          +{selectedMarket.walletCounts.noSharps - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signal Feed */}
            <div className="relative z-10 flex-1 p-6">
              <div className="text-[10px] tracking-[0.25em] uppercase mb-4 pb-3 border-b border-[#0d1820] text-[#4a9eb8]" style={{ fontFamily: 'Space Mono, monospace' }}>
                APEX // SIGNAL FEED
              </div>
              
              <div className="overflow-hidden">
                <div className="text-[9px] tracking-[0.02em] space-y-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  {logLines.length === 0 ? (
                    <div className="text-[#2a4b5a] text-[8px]">No signals</div>
                  ) : (
                    logLines.map((log, idx) => (
                      <LogLine key={`${log.time}-${idx}`} log={log} index={idx} totalLines={logLines.length} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[420px] bg-[#070c12] border-l border-[#0d1820] flex items-center justify-center">
            <div className="text-[12px] text-[#4a9eb8] tracking-[0.1em]" style={{ fontFamily: 'Space Mono, monospace' }}>
              Select a market to view details
            </div>
          </div>
        )}
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
function LogLine({ log, index, totalLines }: { log: SignalEvent, index: number, totalLines: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: index === totalLines - 1 ? 1 : 0.7 - (index * 0.08), x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      style={{ color: '#3a5b6a' }}
    >
      {log.time} <span style={{ color: log.color }}>{log.text}</span>{log.detail}
      {log.highlight && <span style={{ color: log.highlightColor }}>{log.highlight}</span>}
    </motion.div>
  );
}

