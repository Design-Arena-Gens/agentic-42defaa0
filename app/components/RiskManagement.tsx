'use client'

import { useState } from 'react'
import { Calculator, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'

interface Props {
  onComplete: () => void
}

export default function RiskManagement({ onComplete }: Props) {
  const [accountSize, setAccountSize] = useState(10000)
  const [riskPercent, setRiskPercent] = useState(2)
  const [entryPrice, setEntryPrice] = useState(50)
  const [stopLoss, setStopLoss] = useState(48)

  const riskAmount = (accountSize * riskPercent) / 100
  const riskPerShare = Math.abs(entryPrice - stopLoss)
  const positionSize = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0
  const totalPosition = positionSize * entryPrice

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Risk Management</h2>

      <div className="space-y-6">
        <div className="bg-red-50 border-l-4 border-red-600 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">The 2% Rule</h3>
              <p className="text-gray-700">
                Alan Farley emphasizes never risking more than 2% of your account on any single trade.
                This is the golden rule of capital preservation. Even with a 50% win rate, you can stay
                profitable long-term by following this principle.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            Position Size Calculator
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Size ($)
              </label>
              <input
                type="number"
                value={accountSize}
                onChange={(e) => setAccountSize(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Per Trade (%)
              </label>
              <input
                type="number"
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                step="0.5"
                max="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entry Price ($)
              </label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stop Loss ($)
              </label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg border-2 border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-4">Calculated Position:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Risk Amount:</span>
                <span className="ml-2 font-bold text-gray-900">${riskAmount.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-600">Risk Per Share:</span>
                <span className="ml-2 font-bold text-gray-900">${riskPerShare.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-600">Position Size:</span>
                <span className="ml-2 font-bold text-blue-600">{positionSize} shares</span>
              </div>
              <div>
                <span className="text-gray-600">Total Position Value:</span>
                <span className="ml-2 font-bold text-gray-900">${totalPosition.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-purple-600" />
              Stop Loss Placement
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span><strong>Below support:</strong> Place stops just below key support levels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span><strong>Pattern extremes:</strong> Use pattern lows/highs as stop references</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span><strong>ATR method:</strong> 1.5-2x Average True Range below entry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span><strong>Never mental:</strong> Always use hard stops in the market</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Take Profit Targets
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Risk/Reward:</strong> Target minimum 2:1 reward-to-risk ratio</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Scale out:</strong> Take partial profits at key resistance levels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Trail stops:</strong> Move stop to breakeven, then trail upward</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Pattern targets:</strong> Measure pattern height for price targets</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Key Principles from Farley:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[180px]">Capital Preservation:</span>
              <span>Protecting your capital is more important than making profits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[180px]">Position Sizing:</span>
              <span>Smaller positions = longer survival = more opportunities to profit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[180px]">Emotional Control:</span>
              <span>Pre-calculated risk removes emotion from trading decisions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[180px]">Consistency:</span>
              <span>Use the same risk rules for every single trade without exception</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold min-w-[180px]">Documentation:</span>
              <span>Keep a trading journal to track risk metrics and improve over time</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Practice Scenario:</h4>
          <div className="space-y-3 text-gray-700">
            <p>
              You have a $10,000 account and want to buy a stock at $50. Your analysis suggests
              a stop loss at $48 is appropriate. Using the 2% rule:
            </p>
            <ul className="ml-6 space-y-2">
              <li>• Risk amount: $10,000 × 2% = $200</li>
              <li>• Risk per share: $50 - $48 = $2</li>
              <li>• Position size: $200 ÷ $2 = 100 shares</li>
              <li>• Total investment: 100 × $50 = $5,000 (50% of account)</li>
            </ul>
            <p className="mt-3">
              <strong>Result:</strong> If stopped out, you lose only $200 (2%). If the trade moves
              to $54 (2:1 reward), you gain $400 (4%). Five winning trades like this can offset
              ten losing trades.
            </p>
          </div>
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
