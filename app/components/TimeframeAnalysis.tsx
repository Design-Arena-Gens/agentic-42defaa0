'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const timeframes = ['Daily', 'Weekly', '4-Hour']

const scenarios = [
  {
    title: 'Strong Alignment - Best Setup',
    daily: { trend: 'up', data: generateTrendData(8, 100, 130, 'up') },
    weekly: { trend: 'up', data: generateTrendData(8, 90, 135, 'up') },
    fourHour: { trend: 'up', data: generateTrendData(8, 120, 135, 'up') },
    signal: 'bullish',
    description: 'All timeframes showing uptrend - highest probability long setup',
    action: 'Look for pullbacks to support on 4H chart for entry',
  },
  {
    title: 'Conflicting Signals - Caution',
    daily: { trend: 'up', data: generateTrendData(8, 100, 125, 'up') },
    weekly: { trend: 'neutral', data: generateTrendData(8, 110, 115, 'neutral') },
    fourHour: { trend: 'down', data: generateTrendData(8, 125, 110, 'down') },
    signal: 'neutral',
    description: 'Mixed signals across timeframes - wait for alignment',
    action: 'Stay on sidelines or reduce position size significantly',
  },
  {
    title: 'Trend Reversal Setup',
    daily: { trend: 'down', data: generateTrendData(8, 120, 95, 'down') },
    weekly: { trend: 'down', data: generateTrendData(8, 130, 90, 'down') },
    fourHour: { trend: 'up', data: generateTrendData(8, 95, 105, 'up') },
    signal: 'early-reversal',
    description: 'Short-term reversal against longer-term downtrend',
    action: 'Counter-trend trade - requires tight stops and quick profit-taking',
  },
]

function generateTrendData(points: number, start: number, end: number, trend: string) {
  const data = []
  const range = end - start
  for (let i = 0; i < points; i++) {
    let value
    if (trend === 'up') {
      value = start + (range * i) / (points - 1) + (Math.random() - 0.3) * 5
    } else if (trend === 'down') {
      value = start - (range * i) / (points - 1) + (Math.random() - 0.3) * 5
    } else {
      value = start + (Math.random() - 0.5) * 10
    }
    data.push({ x: i + 1, price: Math.round(value) })
  }
  return data
}

interface Props {
  onComplete: () => void
}

export default function TimeframeAnalysis({ onComplete }: Props) {
  const [currentScenario, setCurrentScenario] = useState(0)
  const scenario = scenarios[currentScenario]

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-5 h-5 text-green-600" />
    if (trend === 'down') return <TrendingDown className="w-5 h-5 text-red-600" />
    return <Minus className="w-5 h-5 text-gray-600" />
  }

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return '#10b981'
    if (trend === 'down') return '#ef4444'
    return '#6b7280'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Multiple Timeframe Analysis</h2>

      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">The 3-Timeframe Approach</h3>
              <p className="text-gray-700 mb-3">
                Alan Farley teaches that successful swing traders must analyze three timeframes
                simultaneously. This "3D" approach reveals the complete market picture and helps
                identify high-probability setups.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[100px]">Long-term:</span>
                  <span>Weekly chart shows overall trend and major support/resistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[100px]">Medium-term:</span>
                  <span>Daily chart identifies swing opportunities within the trend</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[100px]">Short-term:</span>
                  <span>4-hour/1-hour chart times precise entry and exit points</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Scenario {currentScenario + 1}: {scenario.title}</h3>
            <div className="flex gap-2">
              {scenarios.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentScenario(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === currentScenario ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Weekly Chart */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Weekly</h4>
                {getTrendIcon(scenario.weekly.trend)}
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={scenario.weekly.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" hide />
                  <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                  <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                    {scenario.weekly.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getTrendColor(scenario.weekly.trend)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-2 capitalize">{scenario.weekly.trend} trend</p>
            </div>

            {/* Daily Chart */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Daily</h4>
                {getTrendIcon(scenario.daily.trend)}
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={scenario.daily.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" hide />
                  <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                  <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                    {scenario.daily.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getTrendColor(scenario.daily.trend)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-2 capitalize">{scenario.daily.trend} trend</p>
            </div>

            {/* 4-Hour Chart */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">4-Hour</h4>
                {getTrendIcon(scenario.fourHour.trend)}
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={scenario.fourHour.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" hide />
                  <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                  <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                    {scenario.fourHour.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getTrendColor(scenario.fourHour.trend)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-2 capitalize">{scenario.fourHour.trend} trend</p>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-l-4 ${
            scenario.signal === 'bullish' ? 'bg-green-50 border-green-600' :
            scenario.signal === 'neutral' ? 'bg-yellow-50 border-yellow-600' :
            'bg-orange-50 border-orange-600'
          }`}>
            <h4 className="font-semibold text-gray-900 mb-2">Analysis:</h4>
            <p className="text-gray-700 mb-3">{scenario.description}</p>
            <p className="text-gray-700"><strong>Trading Action:</strong> {scenario.action}</p>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-3">Farley's Timeframe Rules:</h4>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600 min-w-[30px]">1.</span>
              <div>
                <strong>Trend Alignment:</strong> Best trades occur when all timeframes point in the same direction.
                This creates "power zones" with highest probability of success.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600 min-w-[30px]">2.</span>
              <div>
                <strong>Entry Timing:</strong> Use the shortest timeframe for precise entry after longer
                timeframes confirm the trend. Enter on pullbacks to support in uptrends.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600 min-w-[30px]">3.</span>
              <div>
                <strong>Conflict Management:</strong> When timeframes conflict, either wait for alignment
                or reduce position size. Never force trades with mixed signals.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600 min-w-[30px]">4.</span>
              <div>
                <strong>Stop Placement:</strong> Set stops based on the entry timeframe, but profit targets
                should respect resistance levels on higher timeframes.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600 min-w-[30px]">5.</span>
              <div>
                <strong>Pattern Confirmation:</strong> A pattern on the daily chart has more significance
                if it aligns with weekly support/resistance levels.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Practical Workflow:</h4>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600 min-w-[30px]">1.</span>
              <span>Check weekly chart first - identify the primary trend and key S/R levels</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600 min-w-[30px]">2.</span>
              <span>Move to daily chart - look for patterns and setups aligned with weekly trend</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600 min-w-[30px]">3.</span>
              <span>Drop to 4-hour chart - time your entry on pullbacks or breakouts</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600 min-w-[30px]">4.</span>
              <span>Set stop loss based on 4H chart, but check it doesn't violate daily support</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600 min-w-[30px]">5.</span>
              <span>Set profit target at daily/weekly resistance levels for optimal exit</span>
            </li>
          </ol>
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
