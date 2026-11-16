import React from 'react'
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'

export const MARKET_DATA = [
  // ── Stock Market Indices ──
  { symbol: 'FTSE 100', category: 'STOCK', price: '8,042.15', change: '+0.34%', isPositive: true },
  { symbol: 'S&P 500', category: 'STOCK', price: '5,870.62', change: '+0.48%', isPositive: true },
  { symbol: 'NASDAQ', category: 'STOCK', price: '18,987.40', change: '+0.62%', isPositive: true },
  { symbol: 'DAX 40', category: 'STOCK', price: '19,210.80', change: '-0.18%', isPositive: false },
  { symbol: 'NIKKEI 225', category: 'STOCK', price: '38,535.70', change: '+0.85%', isPositive: true },
  { symbol: 'CBOE VIX', category: 'VOLATILITY', price: '14.82', change: '-3.15%', isPositive: true, isVol: true },

  // ── Forex Market Pairs ──
  { symbol: 'GBP/USD', category: 'FOREX', price: '1.2684', change: '+0.12%', isPositive: true },
  { symbol: 'EUR/USD', category: 'FOREX', price: '1.0542', change: '-0.08%', isPositive: false },
  { symbol: 'USD/JPY', category: 'FOREX', price: '154.32', change: '+0.25%', isPositive: true },
  { symbol: 'EUR/GBP', category: 'FOREX', price: '0.8312', change: '-0.14%', isPositive: false },
  { symbol: 'USD/CHF', category: 'FOREX', price: '0.8875', change: '-0.05%', isPositive: false },
  { symbol: 'AUD/USD', category: 'FOREX', price: '0.6514', change: '+0.21%', isPositive: true },

  // ── Commodities & Pipeline Derivatives ──
  { symbol: 'BRENT CRUDE', category: 'COMMODITY', price: '$73.24', change: '-0.42%', isPositive: false },
  { symbol: 'GOLD (XAU)', category: 'COMMODITY', price: '$2,610.50', change: '+0.72%', isPositive: true },
  {
    symbol: 'SABR VOL SPREAD',
    category: 'DERIVATIVES',
    price: '24.1%',
    change: '+14.2%',
    isAlert: true,
  },
]

function TickerItem({ item }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 text-xs hover:bg-white/[0.04] rounded transition-colors cursor-pointer select-none">
      <span className="text-[9px] font-mono uppercase px-1 py-0.2 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
        {item.category}
      </span>
      <span className="font-semibold text-zinc-200 tracking-tight font-mono text-[11px]">
        {item.symbol}
      </span>
      <span className="font-mono text-zinc-300 text-[11px]">
        {item.price}
      </span>

      {item.isAlert ? (
        <span className="inline-flex items-center gap-0.5 text-amber-400 font-mono text-[10px] font-semibold bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/30">
          <AlertTriangle className="w-2.5 h-2.5" />
          {item.change} DIVERGENCE
        </span>
      ) : item.isPositive ? (
        <span className="inline-flex items-center gap-0.5 text-emerald-400 font-mono text-[11px] font-medium">
          <TrendingUp className="w-3 h-3 stroke-[2.5]" />
          {item.change}
        </span>
      ) : (
        <span className="inline-flex items-center gap-0.5 text-rose-400 font-mono text-[11px] font-medium">
          <TrendingDown className="w-3 h-3 stroke-[2.5]" />
          {item.change}
        </span>
      )}
      <span className="text-zinc-700 ml-1">/</span>
    </div>
  )
}

export function MarketTicker() {
  return (
    <div className="w-full bg-[#121217] border-b border-[#22222a] flex items-center h-8 z-30 select-none overflow-hidden flex-shrink-0">
      {/* Static Left Badge */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3.5 h-full bg-[#16161d] border-r border-[#272732] z-20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-bold tracking-wider text-zinc-300 uppercase font-mono">
          MARKETS LIVE
        </span>
      </div>

      {/* Marquee Track Container with Gradient Edges */}
      <div className="relative flex-1 overflow-hidden h-full flex items-center">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#121217] to-transparent z-10" />

        {/* Continuous Animated Items */}
        <div className="animate-ticker flex items-center whitespace-nowrap">
          {/* First loop instance */}
          <div className="flex items-center">
            {MARKET_DATA.map((item, idx) => (
              <TickerItem key={`track1-${item.symbol}-${idx}`} item={item} />
            ))}
          </div>

          {/* Second duplicate instance for seamless infinite looping */}
          <div className="flex items-center" aria-hidden="true">
            {MARKET_DATA.map((item, idx) => (
              <TickerItem key={`track2-${item.symbol}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#121217] to-transparent z-10" />
      </div>

      {/* Right Feed Source Tag */}
      <div className="hidden md:flex flex-shrink-0 items-center px-3 h-full border-l border-[#272732] bg-[#16161d] text-[10px] font-mono text-zinc-400 gap-1.5 z-20">
        <span className="text-zinc-500">FEEDS:</span>
        <span className="text-zinc-300">BLOOMBERG / REUTERS</span>
      </div>
    </div>
  )
}
