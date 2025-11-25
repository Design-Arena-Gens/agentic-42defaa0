'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts'
import { ArrowDownCircle, ArrowUpCircle, Target } from 'lucide-react'

const strategies = [
  {
    title: 'Pullback Entry',
    description: 'Enter on a pullback to support within an established uptrend',
    type: 'buy',
    data: [
      { x: 1, price: 100 }, { x: 2, price: 108 }, { x: 3, price: 115 },
      { x: 4, price: 112 }, { x: 5, price: 107 }, { x: 6, price: 109 },
      { x: 7, price: 116 }, { x: 8, price: 122 }
    ],
    entry: { x: 6, price: 109, label: 'Entry at support' },
    stop: { price: 105, label: 'Stop below support' },
    target: { price: 120, label: 'Target at resistance' },
    rules: [
      'Identify clear uptrend on higher timeframe',
      'Wait for pullback to support level or moving average',
      'Look for reversal signals (bullish candle, volume increase)',
      'Enter when price bounces off support',
      'Place stop below support level',
    ],
  },
  {
    title: 'Breakout Entry',
    description: 'Enter as price breaks above resistance with strong volume',
    type: 'buy',
    data: [
      { x: 1, price: 95 }, { x: 2, price: 98 }, { x: 3, price: 100 },
      { x: 4, price: 99 }, { x: 5, price: 101 }, { x: 6, price: 106 },
      { x: 7, price: 110 }, { x: 8, price: 112 }
    ],
    entry: { x: 6, price: 106, label: 'Entry on breakout' },
    stop: { price: 99, label: 'Stop at old resistance' },
    target: { price: 115, label: 'Measured move target' },
    rules: [
      'Identify consolidation or resistance level',
      'Wait for volume to expand on breakout',
      'Enter on breakout or on retest of old resistance',
      'Place stop at prior resistance (now support)',
      'Target = breakout point + pattern height',
    ],
  },
  {
    title: 'Trend Reversal Entry',
    description: 'Enter after confirmed trend reversal pattern',
    type: 'buy',
    data: [
      { x: 1, price: 120 }, { x: 2, price: 110 }, { x: 3, price: 95 },
      { x: 4, price: 90 }, { x: 5, price: 92 }, { x: 6, price: 98 },
      { x: 7, price: 105 }, { x: 8, price: 110 }
    ],
    entry: { x: 6, price: 98, label: 'Entry after double bottom' },
    stop: { price: 88, label: 'Stop below pattern low' },
    target: { price: 110, label: 'Target at neckline' },
    rules: [
      'Wait for complete reversal pattern formation',
      'Confirm with volume and momentum indicators',
      'Enter after neckline break or on retest',
      'Place stop beyond pattern extreme',
      'Initial target at pattern neckline or resistance',
    ],
  },
]

interface Props {
  onComplete: () => void
}

export default function EntryExitStrategies({ onComplete }: Props) {
  const [currentStrategy, setCurrentStrategy] = useState(0)
  const strategy = strategies[currentStrategy]

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Entry & Exit Strategies</h2>

      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Systematic Entry and Exit</h3>
          <p className="text-gray-700">
            Alan Farley emphasizes that successful swing trading requires systematic rules for both
            entries and exits. Emotional decisions lead to poor results. Define your entry and exit
            criteria before the trade and stick to them without exception.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{strategy.title}</h3>
            <div className="flex gap-2">
              {strategies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStrategy(idx)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    idx === currentStrategy
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-700 mb-4">{strategy.description}</p>

          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={strategy.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" label={{ value: 'Time', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
                <ReferenceLine
                  y={strategy.stop.price}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label={{ value: 'Stop Loss', position: 'left', fill: '#ef4444' }}
                />
                <ReferenceLine
                  y={strategy.target.price}
                  stroke="#10b981"
                  strokeDasharray="3 3"
                  label={{ value: 'Target', position: 'left', fill: '#10b981' }}
                />
                <ReferenceLine
                  x={strategy.entry.x}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  label={{ value: 'Entry', position: 'top', fill: '#f59e0b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownCircle className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-gray-900">Entry</h4>
              </div>
              <p className="text-2xl font-bold text-orange-600">${strategy.entry.price}</p>
              <p className="text-sm text-gray-600 mt-1">{strategy.entry.label}</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-gray-900">Stop Loss</h4>
              </div>
              <p className="text-2xl font-bold text-red-600">${strategy.stop.price}</p>
              <p className="text-sm text-gray-600 mt-1">{strategy.stop.label}</p>
              <p className="text-xs text-gray-600 mt-1">
                Risk: ${(strategy.entry.price - strategy.stop.price).toFixed(2)}/share
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Target</h4>
              </div>
              <p className="text-2xl font-bold text-green-600">${strategy.target.price}</p>
              <p className="text-sm text-gray-600 mt-1">{strategy.target.label}</p>
              <p className="text-xs text-gray-600 mt-1">
                R:R = {((strategy.target.price - strategy.entry.price) / (strategy.entry.price - strategy.stop.price)).toFixed(1)}:1
              </p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-gray-900 mb-3">Entry Rules:</h4>
            <ul className="space-y-2">
              {strategy.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-3">Exit Strategies (Profits)</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[120px]">Scale Out:</span>
                <span>Sell 1/3 at first resistance, 1/3 at second, trail final 1/3</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[120px]">Trailing Stop:</span>
                <span>Move stop to breakeven at 1R, then trail below recent lows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[120px]">Time Stop:</span>
                <span>Exit if target not reached within expected timeframe (3-7 days)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[120px]">Pattern Target:</span>
                <span>Exit at measured move or Fibonacci extension levels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[120px]">Momentum Exit:</span>
                <span>Exit when momentum indicators show divergence or exhaustion</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h4 className="font-semibold text-gray-900 mb-3">Exit Strategies (Losses)</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[120px]">Hard Stop:</span>
                <span>Always use a stop loss order in the market, never mental stops</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[120px]">Pattern Break:</span>
                <span>Exit immediately if pattern is violated (breakdown below support)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[120px]">Time Decay:</span>
                <span>Exit if setup fails to trigger within 2-3 days of pattern completion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[120px]">News Event:</span>
                <span>Exit before major earnings or news if it arrives during your hold period</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold min-w-[120px]">Wrong Analysis:</span>
                <span>Exit immediately if you realize your analysis was incorrect</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Farley's Core Exit Principles:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[160px]">Plan the Trade:</span>
              <span>Know your entry, stop, and target before placing any order</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[160px]">Trade the Plan:</span>
              <span>Execute your predetermined strategy without emotional interference</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[160px]">Cut Losses Quick:</span>
              <span>Take small losses immediately when stop is hit - no hoping or averaging down</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[160px]">Let Winners Run:</span>
              <span>Trail stops on profitable trades to capture larger moves</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[160px]">Review & Learn:</span>
              <span>Journal every trade to identify patterns in your behavior and improve</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Complete Module
        </button>
      </div>
    </div>
  )
}
