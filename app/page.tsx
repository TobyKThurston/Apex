'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function Home() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [logLines, setLogLines] = React.useState([
    { time: '13:07:12', text: 'DETECTED CLUSTER', detail: ' / 0xA3F9… / ', highlight: '0.91 ALIGNMENT', color: '#4a9eb8', highlightColor: '#00ff88' },
    { time: '13:07:18', text: 'NEW VENUE SIGNAL', detail: ' / KAL-USD-INFL', highlight: '', color: '#4a9eb8', highlightColor: '' },
    { time: '13:07:23', text: 'SHARP WALLET ENTERED', detail: ' / 0x5B7C…', highlight: '', color: '#ff8800', highlightColor: '' },
    { time: '13:07:29', text: 'CORRELATION SPIKE', detail: ' / +0.12 / 3 WALLETS', highlight: '', color: '#4a9eb8', highlightColor: '' },
    { time: '13:07:34', text: 'POSITION MIRRORED', detail: ' / 0x9D2A… → 0xF1E3…', highlight: '', color: '#00d9ff', highlightColor: '' }
  ]);
  
  const [cursorVisible, setCursorVisible] = React.useState(true);
  const [metrics, setMetrics] = React.useState({
    alignment: 0,
    wallets: 0,
    anomalies: 0,
    venues: 0
  });
  const [glitchingMetric, setGlitchingMetric] = React.useState<number | null>(null);
  const [cracks, setCracks] = React.useState<Array<{ x: number; y: number; id: number; generation?: number }>>([]);
  const [drones, setDrones] = React.useState<Array<{ id: number; startX: number; startY: number; endX: number; endY: number; duration: number }>>([]);
  const [droneCracks, setDroneCracks] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

  // Detect mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Spawn drones periodically
  React.useEffect(() => {
    if (isMobile) return;
    
    const spawnDrone = () => {
      const side = Math.floor(Math.random() * 4);
      let startX, startY, endX, endY;
      
      switch (side) {
        case 0:
          startX = Math.random() * 1440;
          startY = -20;
          endX = Math.random() * 1440;
          endY = 920;
          break;
        case 1:
          startX = 1460;
          startY = Math.random() * 900;
          endX = -20;
          endY = Math.random() * 900;
          break;
        case 2:
          startX = Math.random() * 1440;
          startY = 920;
          endX = Math.random() * 1440;
          endY = -20;
          break;
        default:
          startX = -20;
          startY = Math.random() * 900;
          endX = 1460;
          endY = Math.random() * 900;
      }
      
      const duration = 25 + Math.random() * 15;
      
      setDrones(prev => [...prev, {
        id: Date.now() + Math.random(),
        startX,
        startY,
        endX,
        endY,
        duration
      }]);
    };
    
    setTimeout(spawnDrone, 1000);
    setTimeout(spawnDrone, 2000);
    setTimeout(spawnDrone, 3000);
    setTimeout(spawnDrone, 4500);
    
    const interval = setInterval(() => {
      spawnDrone();
    }, 6000 + Math.random() * 4000);
    
    return () => clearInterval(interval);
  }, [isMobile]);

  // Remove drones that have completed their journey
  React.useEffect(() => {
    drones.forEach(drone => {
      setTimeout(() => {
        setDrones(prev => prev.filter(d => d.id !== drone.id));
      }, drone.duration * 1000);
    });
  }, [drones]);

  // Clean up drone cracks after animation
  React.useEffect(() => {
    if (droneCracks.length > 0) {
      const timeout = setTimeout(() => {
        setDroneCracks([]);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [droneCracks]);

  // Animate metrics on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 800;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        setMetrics({
          alignment: +(0.93 * eased).toFixed(2),
          wallets: Math.floor(7 * eased),
          anomalies: Math.floor(2 * eased),
          venues: Math.floor(3 * eased)
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Random metric glitching
  React.useEffect(() => {
    const glitchMetric = () => {
      const metricIndex = Math.floor(Math.random() * 4);
      setGlitchingMetric(metricIndex);
      
      setTimeout(() => {
        setGlitchingMetric(null);
      }, 150);
    };
    
    const interval = setInterval(glitchMetric, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

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
      { time: '13:07:41', text: 'WALLET SYNC DETECTED', detail: ' / 0x2E8F… ⇄ 0x7A1B…', highlight: '', color: '#00d9ff', highlightColor: '' },
      { time: '13:07:48', text: 'ANOMALY RESOLVED', detail: ' / ', highlight: '-0.04 DRIFT', color: '#4a9eb8', highlightColor: '#00ff88' },
      { time: '13:07:55', text: 'SHARP POSITION', detail: ' / POLY-ETH-VOL / ', highlight: '+$47K', color: '#ff8800', highlightColor: '#00ff88' },
      { time: '13:08:02', text: 'CLUSTER EXPANSION', detail: ' / 3 → 5 WALLETS', highlight: '', color: '#4a9eb8', highlightColor: '' },
      { time: '13:08:09', text: 'VENUE CORRELATION', detail: ' / POLY ↔ KAL / ', highlight: '0.87', color: '#00d9ff', highlightColor: '#00ff88' },
      { time: '13:08:15', text: 'SIGNAL STRENGTH', detail: ' / ', highlight: '+0.09', color: '#4a9eb8', highlightColor: '#00ff88' }
    ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      setLogLines(prev => {
        const newLine = logPool[currentIndex % logPool.length];
        currentIndex++;
        return [...prev.slice(1), newLine];
      });
    }, 2800);
    
    return () => clearInterval(interval);
  }, []);


  return (
    <div 
      className={`relative overflow-hidden bg-[#040509] ${isMobile ? 'w-full min-h-screen' : 'w-screen h-screen'}`}
      style={{
        cursor: !isMobile ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><line x1="10.5" y1="3" x2="10.5" y2="8" stroke="%2300C6FF" stroke-width="1.5"/><line x1="10.5" y1="13" x2="10.5" y2="18" stroke="%2300C6FF" stroke-width="1.5"/><line x1="3" y1="10.5" x2="8" y2="10.5" stroke="%2300C6FF" stroke-width="1.5"/><line x1="13" y1="10.5" x2="18" y2="10.5" stroke="%2300C6FF" stroke-width="1.5"/><circle cx="10.5" cy="10.5" r="1.5" fill="%2300C6FF" opacity="0.4"/></svg>') 10 10, crosshair` : 'default'
      }}
    >
      {/* Glass crack overlay layer - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {cracks.map((crack) => (
              <GlassCrack key={crack.id} x={crack.x} y={crack.y} converge={false} />
            ))}
          </svg>
        </div>
      )}

      {/* Drones layer - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-40">
          {drones.map((drone) => (
            <Drone 
              key={drone.id} 
              drone={drone} 
              onDestroy={(id, x, y) => {
                setDrones(prev => prev.filter(d => d.id !== drone.id));
                
                // Create crack effect when drone is destroyed
                setDroneCracks(prev => [...prev, { x, y, id: Date.now() }]);
              }} 
            />
          ))}
        </div>
      )}

      {/* Drone crack effects - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-45">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {droneCracks.map((crack) => (
              <DroneCrack key={crack.id} x={crack.x} y={crack.y} />
            ))}
          </svg>
        </div>
      )}

      {/* Get Access Button - Desktop always visible */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-center z-[55] pointer-events-none" style={{ marginTop: '-100px' }}>
          <Link href="/waitlist">
            <motion.button
              className="px-12 py-5 bg-[#00d9ff]/20 border-2 border-[#00d9ff] text-[#00d9ff] tracking-[0.3em] uppercase pointer-events-auto"
              style={{ fontFamily: 'Space Mono, monospace', fontSize: '16px' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{
                boxShadow: '0 0 30px rgba(0, 217, 255, 0.5), inset 0 0 30px rgba(0, 217, 255, 0.2)',
                borderColor: 'rgba(0, 217, 255, 1)',
                backgroundColor: 'rgba(0, 217, 255, 0.3)',
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
            >
              GET ACCESS
            </motion.button>
          </Link>
        </div>
      )}

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
        
        {/* Stronger grid around center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-[0.12]" style={{
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
          
          <line x1="0" y1="620" x2="380" y2="620" stroke="#00d9ff" strokeWidth="0.5" />
          <line x1="380" y1="620" x2="380" y2="480" stroke="#00d9ff" strokeWidth="0.5" />
          <line x1="380" y1="480" x2="640" y2="480" stroke="#00d9ff" strokeWidth="0.5" />
          
          <line x1="150" y1="0" x2="150" y2="320" stroke="#00d9ff" strokeWidth="0.5" />
          <line x1="150" y1="320" x2="460" y2="320" stroke="#00d9ff" strokeWidth="0.5" />
          <line x1="460" y1="320" x2="460" y2="520" stroke="#00d9ff" strokeWidth="0.5" />
        </svg>
        
        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '100% 4px'
        }} />
      </motion.div>

      {/* Top status bar */}
      <div className={`absolute top-0 left-0 right-0 border-b border-[#0a1520] flex items-center justify-between ${isMobile ? 'h-14 px-4 flex-col gap-1 py-2' : 'h-10 px-6'}`} style={{ fontFamily: 'Space Mono, monospace' }}>
        <div className={`${isMobile ? 'text-[7px]' : 'text-[9px]'} tracking-[0.15em] text-[#4a9eb8] uppercase`}>
          {isMobile ? 'APEX NODE V0.3.9 / INTERNAL' : 'APEX NODE v0.3.9 / INTERNAL BUILD / SIGNAL MIRROR'}
        </div>
        <div className={`${isMobile ? 'text-[7px]' : 'text-[9px]'} tracking-[0.15em] text-[#4a9eb8] uppercase`}>
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
          >LIVE</motion.span> • {isMobile ? 'POLY / KAL' : 'VENUES: POLY / KAL / ...'} • UTC 13:07:22
        </div>
      </div>

      {/* Main content container */}
      {isMobile ? (
        /* Mobile Layout - Vertical Stack */
        <div className="absolute inset-0 top-14 bottom-0 flex flex-col items-center justify-between px-4 py-8">
          {/* Radar + APEX + Tagline Stack */}
          <div className="flex flex-col items-center justify-center flex-1">
            {/* Radial HUD background with centered content */}
            <div className="relative w-[330px] h-[330px] flex items-center justify-center mb-6">
              <svg width="330" height="330" viewBox="0 0 520 520" className="absolute opacity-60">
                {/* Concentric circles with pulse */}
                <motion.circle 
                  cx="260" cy="260" r="180" 
                  fill="none" 
                  stroke="#0a4a5a" 
                  strokeWidth="0.5"
                  animate={{ r: [180, 183.6, 180] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle 
                  cx="260" cy="260" r="220" 
                  fill="none" 
                  stroke="#0a4a5a" 
                  strokeWidth="0.5"
                  animate={{ r: [220, 224.4, 220] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle 
                  cx="260" cy="260" r="250" 
                  fill="none" 
                  stroke="#0a4a5a" 
                  strokeWidth="0.8"
                  animate={{ r: [250, 255, 250] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Tick marks */}
                {Array.from({ length: 32 }, (_, i) => {
                  const angle = (i * 360) / 32 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const r1 = 240;
                  const r2 = i % 4 === 0 ? 255 : 248;
                  const x1 = 260 + r1 * Math.cos(rad);
                  const y1 = 260 + r1 * Math.sin(rad);
                  const x2 = 260 + r2 * Math.cos(rad);
                  const y2 = 260 + r2 * Math.sin(rad);
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00d9ff" strokeWidth="0.5" opacity="0.4" />
                  );
                })}
                
                {/* Numeric labels */}
                <text x="260" y="25" fill="#4a9eb8" fontSize="10" textAnchor="middle" fontFamily="Space Mono, monospace">0.21</text>
                <text x="480" y="270" fill="#4a9eb8" fontSize="10" textAnchor="middle" fontFamily="Space Mono, monospace">0.55</text>
                <text x="260" y="505" fill="#4a9eb8" fontSize="10" textAnchor="middle" fontFamily="Space Mono, monospace">0.93</text>
                <text x="35" y="270" fill="#4a9eb8" fontSize="10" textAnchor="middle" fontFamily="Space Mono, monospace">0.78</text>
                
                {/* Glowing nodes with staggered pings */}
                <motion.g>
                  <motion.circle 
                    cx="260" cy="160" r="3" 
                    fill="#00ff88"
                    animate={{ 
                      r: [3, 3.9, 3],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 3.4,
                      ease: "easeInOut"
                    }}
                  />
                </motion.g>
                <motion.g>
                  <motion.circle 
                    cx="360" cy="260" r="3" 
                    fill="#00d9ff"
                    animate={{ 
                      r: [3, 3.9, 3],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 3.4,
                      delay: 1.3,
                      ease: "easeInOut"
                    }}
                  />
                </motion.g>
                <motion.g>
                  <motion.circle 
                    cx="260" cy="360" r="3" 
                    fill="#ff0066"
                    animate={{ 
                      r: [3, 3.9, 3],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 3.4,
                      delay: 2.7,
                      ease: "easeInOut"
                    }}
                  />
                </motion.g>
                
                {/* Connection lines to nodes */}
                <line x1="260" y1="260" x2="260" y2="160" stroke="#00ff88" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
                <line x1="260" y1="260" x2="360" y2="260" stroke="#00d9ff" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
              </svg>
              
              {/* Content inside radar */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Access class label */}
                <div className="text-[8px] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'Space Mono, monospace', color: '#4a9eb8' }}>
                  ACCESS CLASS: APEX / UNAUTHORIZED
                </div>
                
                {/* APEX_ text - single instance */}
                <MobileGlitchText />
              </div>
            </div>
            
            {/* Tagline below radar */}
            <div className="text-center px-6 mb-4">
              <div className="text-[12px] text-[#c8d8e8] leading-relaxed" style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.01em' }}>
                Private wallet-signal terminal<br/>for prediction markets.
              </div>
            </div>
            
            {/* CTA Button */}
            <Link href="/waitlist">
              <motion.button
                className="w-[calc(100%-32px)] max-w-[320px] h-12 bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] tracking-[0.25em] uppercase flex items-center justify-center"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{
                  borderColor: 'rgba(0, 217, 255, 0.6)',
                  backgroundColor: 'rgba(0, 217, 255, 0.15)',
                  scale: 1.02,
                  transition: { duration: 0.1 }
                }}
              >
                GET ACCESS
              </motion.button>
            </Link>
            
            {/* Subline */}
            <div className="text-[9px] text-[#4a9eb8]/60 mt-2 tracking-[0.05em]" style={{ fontFamily: 'Space Mono, monospace' }}>
              Read only. Wallet not required.
            </div>
          </div>
          
          {/* Bottom command line */}
          <div className="w-full flex items-center justify-between border-t border-[#0a1520] pt-3 pb-4">
            <div className="text-[9px] tracking-[0.1em] text-[#4a9eb8]" style={{ fontFamily: 'Space Mono, monospace' }}>
              {'>'} REQUEST KEY
              <motion.span 
                className="inline-block ml-1"
                animate={{ opacity: cursorVisible ? 1 : 0 }}
              >_</motion.span>
            </div>
            <motion.button 
              className="px-4 py-1.5 bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-[9px] tracking-[0.2em] uppercase cursor-pointer" 
              style={{ fontFamily: 'Space Mono, monospace' }}
              whileHover={{
                borderColor: 'rgba(0, 217, 255, 0.6)',
                backgroundColor: 'rgba(0, 217, 255, 0.15)',
              }}
              transition={{ duration: 0.1 }}
            >
              EXECUTE
            </motion.button>
          </div>
        </div>
      ) : (
        /* Desktop Layout - Original */
        <div className="absolute inset-0 top-10 flex" style={{ bottom: '80px' }}>
          {/* Left/Center area - APEX Core */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Core container */}
            <div className="relative px-4">
              {/* Access class label */}
              <div className="absolute -top-8 left-0 text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: 'Space Mono, monospace', color: '#4a9eb8' }}>
                ACCESS CLASS: APEX / UNAUTHORIZED
              </div>
              
              {/* Radial HUD background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 'auto', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="520" height="520" viewBox="0 0 520 520" className="opacity-60">
                  {/* Concentric circles with pulse */}
                  <motion.circle 
                    cx="260" cy="260" r="180" 
                    fill="none" 
                    stroke="#0a4a5a" 
                    strokeWidth="0.5"
                    animate={{ r: [180, 183.6, 180] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.circle 
                    cx="260" cy="260" r="220" 
                    fill="none" 
                    stroke="#0a4a5a" 
                    strokeWidth="0.5"
                    animate={{ r: [220, 224.4, 220] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.circle 
                    cx="260" cy="260" r="250" 
                    fill="none" 
                    stroke="#0a4a5a" 
                    strokeWidth="0.8"
                    animate={{ r: [250, 255, 250] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Tick marks */}
                  {Array.from({ length: 32 }, (_, i) => {
                    const angle = (i * 360) / 32 - 90;
                    const rad = (angle * Math.PI) / 180;
                    const r1 = 240;
                    const r2 = i % 4 === 0 ? 255 : 248;
                    const x1 = 260 + r1 * Math.cos(rad);
                    const y1 = 260 + r1 * Math.sin(rad);
                    const x2 = 260 + r2 * Math.cos(rad);
                    const y2 = 260 + r2 * Math.sin(rad);
                    return (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00d9ff" strokeWidth="0.5" opacity="0.4" />
                    );
                  })}
                  
                  {/* Numeric labels */}
                  <text x="260" y="25" fill="#4a9eb8" fontSize="10" textAnchor="middle" fontFamily="Space Mono, monospace">0.21</text>
                  <text x="480" y="270" fill="#4a9eb8" fontSize="10" textAnchor="middle" fontFamily="Space Mono, monospace">0.55</text>
                  <text x="260" y="505" fill="#4a9eb8" fontSize="10" textAnchor="middle" fontFamily="Space Mono, monospace">0.93</text>
                  <text x="35" y="270" fill="#4a9eb8" fontSize="10" textAnchor="middle" fontFamily="Space Mono, monospace">0.78</text>
                  
                  {/* Glowing nodes with staggered pings */}
                  <motion.g>
                    <motion.circle 
                      cx="260" cy="10" r="3" 
                      fill="#00ff88"
                      animate={{ 
                        r: [3, 3.9, 3],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 3.4,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.g>
                  <motion.g>
                    <motion.circle 
                      cx="510" cy="260" r="3" 
                      fill="#00d9ff"
                      animate={{ 
                        r: [3, 3.9, 3],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 3.4,
                        delay: 1.3,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.g>
                  <motion.g>
                    <motion.circle 
                      cx="260" cy="510" r="3" 
                      fill="#ff0066"
                      animate={{ 
                        r: [3, 3.9, 3],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 3.4,
                        delay: 2.7,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.g>
                  
                  {/* Connection lines to nodes */}
                  <line x1="260" y1="260" x2="260" y2="10" stroke="#00ff88" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
                  <line x1="260" y1="260" x2="510" y2="260" stroke="#00d9ff" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
                </svg>
              </div>
              
              {/* APEX_ text with glitch effect */}
              <GlitchText isMobile={isMobile} />
              
              {/* Tagline */}
              <div className="mt-12 max-w-[520px] px-4">
                <div className="text-[15px] text-[#c8d8e8] mb-2" style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.01em' }}>
                  Private wallet-signal terminal for prediction markets.
                </div>
              </div>
            </div>
          </div>

          {/* Right console column - Desktop only */}
          <div className="w-[340px] bg-[#070c12] border-l border-[#0d1820] relative">
            {/* Inner glow effect */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,217,255,0.03)]" />
            
            <div className="relative z-10 h-full flex flex-col p-6">
              {/* Header */}
              <div className="text-[10px] tracking-[0.25em] uppercase mb-8 pb-3 border-b border-[#0d1820]" style={{ fontFamily: 'Space Mono, monospace', color: '#4a9eb8' }}>
                APEX // SIGNAL FEED
              </div>
              
              {/* Metrics block */}
              <div className="space-y-5 mb-8">
                {[
                  { label: 'ALIGNMENT INDEX', value: metrics.alignment.toFixed(2), sub: 'COHERENCE' },
                  { label: 'SHARP WALLETS', value: metrics.wallets.toString(), sub: 'FLAGGED' },
                  { label: 'NEW ANOMALIES', value: metrics.anomalies.toString(), sub: 'LAST 24 MIN' },
                  { label: 'VENUES', value: metrics.venues.toString(), sub: 'ACTIVE' }
                ].map((metric, idx) => (
                  <div key={idx} className="pb-5 border-b border-[#0d1820]">
                    <div className="flex items-end justify-between">
                      <div className="text-[9px] tracking-[0.2em] uppercase text-[#4a9eb8]" style={{ fontFamily: 'Space Mono, monospace' }}>
                        {metric.label}
                      </div>
                      <GlitchNumber value={metric.value} isGlitching={glitchingMetric === idx} />
                    </div>
                    <div className="text-right text-[8px] text-[#2a4b5a] tracking-[0.15em] uppercase mt-1" style={{ fontFamily: 'Space Mono, monospace' }}>
                      {metric.sub}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Rolling log */}
              <div className="flex-1 overflow-hidden">
                <div className="text-[9px] tracking-[0.02em] space-y-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                  {logLines.map((log, idx) => (
                    <LogLine key={`${log.time}-${idx}`} log={log} index={idx} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component for glitching APEX text
function GlitchText({ isMobile }: { isMobile: boolean }) {
  const [glitchState, setGlitchState] = React.useState(0);
  
  React.useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchState(1);
      setTimeout(() => setGlitchState(2), 50);
      setTimeout(() => setGlitchState(3), 100);
      setTimeout(() => setGlitchState(0), 150);
    }, 3500);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  const baseStyle = {
    fontFamily: 'Impact, Haettenschweiler, sans-serif',
    fontSize: isMobile ? '80px' : '120px',
    letterSpacing: '-0.05em',
    fontWeight: '900',
    textTransform: 'uppercase' as const,
    fontStretch: 'ultra-condensed' as const,
  };
  
  const cyanOffset = glitchState === 1 ? '-10px, 4px' : glitchState === 2 ? '-12px, 3px' : glitchState === 3 ? '-2px, 1px' : '-4px, 2px';
  const magentaOffset = glitchState === 1 ? '11px, -5px' : glitchState === 2 ? '13px, -4px' : glitchState === 3 ? '3px, -1px' : '5px, -3px';
  const mainOpacity = glitchState === 1 ? 0.75 : glitchState === 2 ? 0.7 : 1;
  
  return (
    <div className="relative z-10">
      {/* Cyan glitch layer */}
      <motion.div 
        className="absolute top-0 left-0" 
        style={{
          ...baseStyle,
          color: '#00d9ff',
          opacity: 0.6,
          transform: `translate(${cyanOffset})`,
          clipPath: glitchState > 0 ? 'polygon(0 0, 100% 0, 100% 35%, 0 35%)' : 'none'
        }}
      >
        APEX_
      </motion.div>
      
      {/* Magenta glitch layer */}
      <motion.div 
        className="absolute top-0 left-0" 
        style={{
          ...baseStyle,
          color: '#ff0066',
          opacity: 0.7,
          transform: `translate(${magentaOffset})`,
          clipPath: glitchState > 0 ? 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)' : 'none'
        }}
      >
        APEX_
      </motion.div>
      
      {/* Main text */}
      <motion.div 
        style={{
          ...baseStyle,
          color: '#F0F5FF',
          textShadow: '0 0 40px rgba(0, 217, 255, 0.3)',
          opacity: mainOpacity,
          transform: glitchState === 3 ? 'translate(1px, -0.5px)' : 'none'
        }}
      >
        APEX_
      </motion.div>
    </div>
  );
}

// Component for glitching numbers
function GlitchNumber({ value, isGlitching }: { value: string, isGlitching: boolean }) {
  const baseStyle = {
    fontFamily: 'Space Mono, monospace',
    fontSize: '28px',
    fontWeight: '700',
    color: '#00ff88'
  };
  
  if (!isGlitching) {
    return (
      <div style={baseStyle}>
        {value}
      </div>
    );
  }
  
  const cyanOffset = '-10px, 4px';
  const magentaOffset = '11px, -5px';
  
  return (
    <div className="relative">
      {/* Cyan glitch layer */}
      <div 
        className="absolute top-0 left-0" 
        style={{
          ...baseStyle,
          color: '#00d9ff',
          opacity: 0.6,
          transform: `translate(${cyanOffset})`,
          clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)'
        }}
      >
        {value}
      </div>
      
      {/* Magenta glitch layer */}
      <div 
        className="absolute top-0 left-0" 
        style={{
          ...baseStyle,
          color: '#ff0066',
          opacity: 0.7,
          transform: `translate(${magentaOffset})`,
          clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)'
        }}
      >
        {value}
      </div>
      
      {/* Main text */}
      <div 
        style={{
          ...baseStyle,
          color: '#00ff88',
          opacity: 0.75
        }}
      >
        {value}
      </div>
    </div>
  );
}

// Component for animated log lines
function LogLine({ log, index }: { log: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: index === 4 ? 1 : 0.7 - (index * 0.1), x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      style={{ color: '#3a5b6a' }}
    >
      {log.time} <span style={{ color: log.color }}>{log.text}</span>{log.detail}
      {log.highlight && <span style={{ color: log.highlightColor }}>{log.highlight}</span>}
    </motion.div>
  );
}

// Component for glass crack effect
function GlassCrack({ x, y, converge }: { x: number, y: number, converge: boolean }) {
  const centerX = 720;
  const centerY = 350;
  
  const numCracks = 8 + Math.floor(Math.random() * 5);
  const cracks = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < numCracks; i++) {
      const angle = (Math.random() * 360 * Math.PI) / 180;
      const length = 40 + Math.random() * 120;
      const x2 = x + Math.cos(angle) * length;
      const y2 = y + Math.sin(angle) * length;
      
      const branches = [];
      if (Math.random() > 0.5) {
        const branchAngle = angle + (Math.random() - 0.5) * 1.5;
        const branchLength = length * (0.3 + Math.random() * 0.4);
        const branchX = x + Math.cos(angle) * length * 0.6;
        const branchY = y + Math.sin(angle) * length * 0.6;
        const branchX2 = branchX + Math.cos(branchAngle) * branchLength;
        const branchY2 = branchY + Math.sin(branchAngle) * branchLength;
        branches.push({ x1: branchX, y1: branchY, x2: branchX2, y2: branchY2 });
      }
      
      result.push({ x1: x, y1: y, x2, y2, branches });
    }
    return result;
  }, [x, y, numCracks]);
  
  return (
    <g>
      {/* Impact center */}
      <motion.circle
        cx={x}
        cy={y}
        r={0}
        fill="none"
        stroke="#00d9ff"
        strokeWidth="2"
        initial={{ r: 0, opacity: 1 }}
        animate={{ r: 25, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      
      {/* Crack lines */}
      {cracks.map((crack, i) => (
        <g key={i}>
          <motion.line
            x1={crack.x1}
            y1={crack.y1}
            x2={crack.x1}
            y2={crack.y1}
            stroke="#00d9ff"
            strokeWidth="1.5"
            opacity="0.7"
            initial={{ x2: crack.x1, y2: crack.y1 }}
            animate={converge ? { 
              x2: centerX, 
              y2: centerY,
              opacity: 0.9
            } : { 
              x2: crack.x2, 
              y2: crack.y2 
            }}
            transition={{ 
              duration: converge ? 0.6 : 0.15 + Math.random() * 0.1, 
              ease: converge ? "easeInOut" : "easeOut", 
              delay: converge ? i * 0.02 : i * 0.015
            }}
          />
          {/* Glow effect */}
          <motion.line
            x1={crack.x1}
            y1={crack.y1}
            x2={crack.x1}
            y2={crack.y1}
            stroke="#00d9ff"
            strokeWidth="3"
            opacity="0.3"
            filter="blur(2px)"
            initial={{ x2: crack.x1, y2: crack.y1 }}
            animate={converge ? { 
              x2: centerX, 
              y2: centerY,
              opacity: 0.5
            } : { 
              x2: crack.x2, 
              y2: crack.y2 
            }}
            transition={{ 
              duration: converge ? 0.6 : 0.15 + Math.random() * 0.1, 
              ease: converge ? "easeInOut" : "easeOut", 
              delay: converge ? i * 0.02 : i * 0.015
            }}
          />
          
          {/* Branch cracks */}
          {crack.branches.map((branch, j) => (
            <motion.line
              key={j}
              x1={branch.x1}
              y1={branch.y1}
              x2={branch.x1}
              y2={branch.y1}
              stroke="#00d9ff"
              strokeWidth="1"
              opacity="0.5"
              initial={{ x2: branch.x1, y2: branch.y1 }}
              animate={converge ? { 
                x2: centerX, 
                y2: centerY,
                opacity: 0.7
              } : { 
                x2: branch.x2, 
                y2: branch.y2 
              }}
              transition={{ 
                duration: converge ? 0.5 : 0.1, 
                ease: converge ? "easeInOut" : "easeOut", 
                delay: converge ? 0.15 + i * 0.02 : 0.15 + i * 0.015
              }}
            />
          ))}
        </g>
      ))}
    </g>
  );
}

// Component for drone effect
function Drone({ drone, onDestroy }: { drone: { id: number; startX: number; startY: number; endX: number; endY: number; duration: number }, onDestroy: (id: number, x: number, y: number) => void }) {
  const [destroyed, setDestroyed] = React.useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDestroyed(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;
    onDestroy(drone.id, clickX, clickY);
  };
  
  if (destroyed) {
    return null;
  }
  
  const angle = Math.atan2(drone.endY - drone.startY, drone.endX - drone.startX) * (180 / Math.PI);
  
  return (
    <motion.div
      className="absolute pointer-events-auto cursor-crosshair"
      style={{ 
        left: drone.startX, 
        top: drone.startY,
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        x: drone.endX - drone.startX,
        y: drone.endY - drone.startY,
        opacity: [0, 1, 1, 1],
      }}
      transition={{ 
        duration: drone.duration,
        ease: 'linear',
        opacity: { duration: 0.5 }
      }}
      onClick={handleClick}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: `rotate(${angle}deg)` }}>
        <motion.line 
          x1="8" y1="24" x2="40" y2="24" 
          stroke="#00d9ff" 
          strokeWidth="2.5"
          opacity="0.8"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <line x1="24" y1="12" x2="24" y2="36" stroke="#00d9ff" strokeWidth="2" opacity="0.5" />
        <circle cx="24" cy="24" r="3" fill="#00d9ff" opacity="0.6" />
        <circle cx="24" cy="24" r="8" fill="#00d9ff" opacity="0.1" />
      </svg>
    </motion.div>
  );
}

// Component for drone crack effect
function DroneCrack({ x, y }: { x: number, y: number }) {
  // Generate random crack lines radiating from click point - smaller size
  const numCracks = 5 + Math.floor(Math.random() * 3); // 5-7 main cracks
  const cracks = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < numCracks; i++) {
      const angle = (Math.random() * 360 * Math.PI) / 180;
      const length = 20 + Math.random() * 40; // Random length 20-60px (smaller)
      const x2 = x + Math.cos(angle) * length;
      const y2 = y + Math.sin(angle) * length;
      
      result.push({ x1: x, y1: y, x2, y2 });
    }
    return result;
  }, [x, y, numCracks]);
  
  return (
    <g>
      {/* Impact center - smaller radius */}
      <motion.circle
        cx={x}
        cy={y}
        r={0}
        fill="none"
        stroke="#00d9ff"
        strokeWidth="1.5"
        initial={{ r: 0, opacity: 1 }}
        animate={{ r: 15, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      
      {/* Crack lines - thinner */}
      {cracks.map((crack, i) => (
        <g key={i}>
          <motion.line
            x1={crack.x1}
            y1={crack.y1}
            x2={crack.x1}
            y2={crack.y1}
            stroke="#00d9ff"
            strokeWidth="1"
            opacity="0.6"
            initial={{ x2: crack.x1, y2: crack.y1, opacity: 0.8 }}
            animate={{ 
              x2: crack.x2, 
              y2: crack.y2,
              opacity: 0
            }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut", 
              delay: i * 0.015
            }}
          />
          {/* Glow effect - thinner */}
          <motion.line
            x1={crack.x1}
            y1={crack.y1}
            x2={crack.x1}
            y2={crack.y1}
            stroke="#00d9ff"
            strokeWidth="2"
            opacity="0.25"
            filter="blur(1.5px)"
            initial={{ x2: crack.x1, y2: crack.y1, opacity: 0.4 }}
            animate={{ 
              x2: crack.x2, 
              y2: crack.y2,
              opacity: 0
            }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut", 
              delay: i * 0.015
            }}
          />
        </g>
      ))}
    </g>
  );
}

// Component for glitching APEX text on mobile
function MobileGlitchText() {
  const [glitchState, setGlitchState] = React.useState(0);
  
  React.useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchState(1);
      setTimeout(() => setGlitchState(2), 50);
      setTimeout(() => setGlitchState(3), 100);
      setTimeout(() => setGlitchState(0), 150);
    }, 3500);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  const baseStyle = {
    fontFamily: 'Impact, Haettenschweiler, sans-serif',
    fontSize: '80px',
    letterSpacing: '-0.05em',
    fontWeight: '900',
    textTransform: 'uppercase' as const,
    fontStretch: 'ultra-condensed' as const,
  };
  
  const cyanOffset = glitchState === 1 ? '-10px, 4px' : glitchState === 2 ? '-12px, 3px' : glitchState === 3 ? '-2px, 1px' : '-4px, 2px';
  const magentaOffset = glitchState === 1 ? '11px, -5px' : glitchState === 2 ? '13px, -4px' : glitchState === 3 ? '3px, -1px' : '5px, -3px';
  const mainOpacity = glitchState === 1 ? 0.75 : glitchState === 2 ? 0.7 : 1;
  
  return (
    <div className="relative z-10">
      <motion.div 
        className="absolute top-0 left-0" 
        style={{
          ...baseStyle,
          color: '#00d9ff',
          opacity: 0.6,
          transform: `translate(${cyanOffset})`,
          clipPath: glitchState > 0 ? 'polygon(0 0, 100% 0, 100% 35%, 0 35%)' : 'none'
        }}
      >
        APEX_
      </motion.div>
      
      <motion.div 
        className="absolute top-0 left-0" 
        style={{
          ...baseStyle,
          color: '#ff0066',
          opacity: 0.7,
          transform: `translate(${magentaOffset})`,
          clipPath: glitchState > 0 ? 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)' : 'none'
        }}
      >
        APEX_
      </motion.div>
      
      <motion.div 
        style={{
          ...baseStyle,
          color: '#F0F5FF',
          textShadow: '0 0 40px rgba(0, 217, 255, 0.3)',
          opacity: mainOpacity,
          transform: glitchState === 3 ? 'translate(1px, -0.5px)' : 'none'
        }}
      >
        APEX_
      </motion.div>
    </div>
  );
}
