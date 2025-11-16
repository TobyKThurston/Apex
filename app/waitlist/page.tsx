'use client';

import React from 'react';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabase';

export default function WaitlistPage() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [typedText, setTypedText] = React.useState('');
  const [notifyText, setNotifyText] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // Handle form submission
  const handleSubmit = async () => {
    if (!submitted && !loading) {
      // Basic email validation
      if (!email || !email.includes('@')) {
        setError('Please enter a valid email');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const { error: supabaseError } = await supabase
          .from('waitlist')
          .insert([
            {
              email: email.toLowerCase().trim(),
              created_at: new Date().toISOString(),
            },
          ]);

        if (supabaseError) {
          // Check if it's a duplicate email error
          if (supabaseError.code === '23505') {
            setError('Email already registered');
          } else {
            setError('Something went wrong. Please try again.');
          }
          setLoading(false);
        } else {
          setSubmitted(true);
          setLoading(false);
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !submitted && !loading) {
      handleSubmit();
    }
  };

  // Detect mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Typing animation for "get notified..." on mount
  React.useEffect(() => {
    if (!submitted) {
      const message = "get notified...";
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setNotifyText(message.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 80);
      
      return () => clearInterval(typeInterval);
    }
  }, [submitted]);

  // Typing animation for "Thanks."
  React.useEffect(() => {
    if (submitted) {
      const message = "Thanks.";
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setTypedText(message.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 80);
      
      return () => clearInterval(typeInterval);
    }
  }, [submitted]);

  return (
    <div 
      className={`relative overflow-hidden bg-[#040509] ${isMobile ? 'w-full min-h-screen' : 'w-screen h-screen'}`}
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
        /* Mobile Layout - Waitlist */
        <div className="absolute inset-0 top-14 bottom-0 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-[320px] flex flex-col items-center">
            {/* Waitlist text or Thanks message */}
            {!submitted && (
              <div className="text-[14px] text-[#00d9ff] mb-8 tracking-[0.15em] uppercase" style={{ fontFamily: 'Space Mono, monospace' }}>
                {notifyText}
              </div>
            )}
            
            {submitted ? (
              /* Thanks message */
              <div className="text-[18px] text-[#00d9ff] tracking-[0.08em]" style={{ fontFamily: 'Space Mono, monospace' }}>
                {typedText}
              </div>
            ) : (
              /* Email input with Send button */
              <div className="w-full flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    disabled={loading || submitted}
                    className="flex-1 h-12 bg-[#00d9ff]/5 border border-[#00d9ff]/30 text-[#c8d8e8] px-4 text-[12px] tracking-[0.05em] placeholder:text-[#4a9eb8]/50 focus:outline-none focus:border-[#00d9ff]/60 focus:bg-[#00d9ff]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={loading || submitted}
                    className="h-12 px-4 bg-transparent border border-[#00d9ff]/40 text-[#00d9ff] text-[10px] tracking-[0.2em] uppercase hover:border-[#00d9ff]/70 hover:bg-[#00d9ff]/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                  >
                    {loading ? '...' : 'send'}
                  </button>
                </div>
                {error && (
                  <div className="text-[9px] text-[#ff0066] tracking-[0.1em]" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {error}
                  </div>
                )}
                {!error && (
                  <div className="text-[9px] text-[#4a9eb8]/40 tracking-[0.1em]" style={{ fontFamily: 'Space Mono, monospace' }}>
                    invite-only beta
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Desktop Layout - Waitlist */
        <div className="absolute inset-0 top-10 flex items-center justify-center">
          <div className="w-full max-w-[480px] flex flex-col items-center px-6">
            {/* Waitlist text or Thanks message */}
            {!submitted && (
              <div className="text-[16px] text-[#00d9ff] mb-12 tracking-[0.15em] uppercase" style={{ fontFamily: 'Space Mono, monospace' }}>
                {notifyText}
              </div>
            )}
            
            {submitted ? (
              /* Thanks message */
              <div className="text-[22px] text-[#00d9ff] tracking-[0.08em]" style={{ fontFamily: 'Space Mono, monospace' }}>
                {typedText}
              </div>
            ) : (
              /* Email input with Send button */
              <div className="w-full flex flex-col gap-2">
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    disabled={loading || submitted}
                    className="flex-1 h-14 bg-[#00d9ff]/5 border border-[#00d9ff]/30 text-[#c8d8e8] px-6 text-[14px] tracking-[0.05em] placeholder:text-[#4a9eb8]/50 focus:outline-none focus:border-[#00d9ff]/60 focus:bg-[#00d9ff]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={loading || submitted}
                    className="h-14 px-6 bg-transparent border border-[#00d9ff]/40 text-[#00d9ff] text-[11px] tracking-[0.2em] uppercase hover:border-[#00d9ff]/70 hover:bg-[#00d9ff]/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                  >
                    {loading ? '...' : 'send'}
                  </button>
                </div>
                {error && (
                  <div className="text-[10px] text-[#ff0066] tracking-[0.1em]" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {error}
                  </div>
                )}
                {!error && (
                  <div className="text-[10px] text-[#4a9eb8]/40 tracking-[0.1em]" style={{ fontFamily: 'Space Mono, monospace' }}>
                    invite-only beta
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

