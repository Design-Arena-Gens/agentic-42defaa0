'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { CheckCircle, ChevronRight } from 'lucide-react'

const patterns = [
  {
    name: 'Head and Shoulders',
    description: 'A reversal pattern that forms after an uptrend. It consists of a peak (shoulder), followed by a higher peak (head), and then another lower peak (shoulder).',
    signal: 'Bearish reversal - indicates potential trend change from up to down',
    data: [
      { x: 1, price: 100 }, { x: 2, price: 110 }, { x: 3, price: 105 },
      { x: 4, price: 120 }, { x: 5, price: 105 }, { x: 6, price: 110 },
      { x: 7, price: 95 }, { x: 8, price: 90 }
    ],
    keyLevels: { neckline: 105, target: 90 }
  },
  {
    name: 'Double Bottom',
    description: 'A bullish reversal pattern that appears after a downtrend. Price tests a support level twice, failing to break below, forming a "W" shape.',
    signal: 'Bullish reversal - indicates potential trend change from down to up',
    data: [
      { x: 1, price: 100 }, { x: 2, price: 85 }, { x: 3, price: 95 },
      { x: 4, price: 90 }, { x: 5, price: 85 }, { x: 6, price: 95 },
      { x: 7, price: 105 }, { x: 8, price: 110 }
    ],
    keyLevels: { support: 85, resistance: 95 }
  },
  {
    name: 'Bull Flag',
    description: 'A continuation pattern that occurs during an uptrend. After a strong rally (flagpole), price consolidates in a slight downward channel before breaking out upward.',
    signal: 'Bullish continuation - expect uptrend to resume',
    data: [
      { x: 1, price: 80 }, { x: 2, price: 90 }, { x: 3, price: 100 },
      { x: 4, price: 98 }, { x: 5, price: 96 }, { x: 6, price: 94 },
      { x: 7, price: 102 }, { x: 8, price: 110 }
    ],
    keyLevels: { flagTop: 98, flagBottom: 94 }
  },
  {
    name: 'Triangle Consolidation',
    description: 'Price forms higher lows and lower highs, creating converging trendlines. Volume typically decreases during formation.',
    signal: 'Continuation pattern - breakout direction determines trade direction',
    data: [
      { x: 1, price: 95 }, { x: 2, price: 105 }, { x: 3, price: 97 },
      { x: 4, price: 103 }, { x: 5, price: 99 }, { x: 6, price: 101 },
      { x: 7, price: 100 }, { x: 8, price: 108 }
    ],
    keyLevels: { apex: 100 }
  }
]

interface Props {
  onComplete: () => void
}

export default function PatternRecognition({ onComplete }: Props) {
  const [currentPattern, setCurrentPattern] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const pattern = patterns[currentPattern]

  const handleNext = () => {
    if (currentPattern < patterns.length - 1) {
      setCurrentPattern(currentPattern + 1)
      setShowAnswer(false)
    } else {
      onComplete()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Pattern Recognition</h2>
          <span className="text-sm text-gray-600">
            Pattern {currentPattern + 1} of {patterns.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentPattern + 1) / patterns.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{pattern.name}</h3>
          <p className="text-gray-700">{pattern.description}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Chart Pattern</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pattern.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" label={{ value: 'Time', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              {showAnswer && Object.entries(pattern.keyLevels).map(([key, value]) => (
                <ReferenceLine key={key} y={value} stroke="#dc2626" strokeDasharray="3 3" label={key} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Key Concepts:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Formation:</strong> Look for this pattern after a clear preceding trend</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Volume:</strong> Volume should confirm the pattern (increase on breakout)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Confirmation:</strong> Wait for price to break key levels before entering</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Risk Management:</strong> Place stops beyond the pattern extremes</span>
            </li>
          </ul>
        </div>

        {!showAnswer && (
          <button
            onClick={() => setShowAnswer(true)}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Show Trading Signal
          </button>
        )}

        {showAnswer && (
          <div className="bg-green-50 border-l-4 border-green-600 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Trading Signal:</h4>
                <p className="text-gray-700 mb-4">{pattern.signal}</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Key Levels:</strong></p>
                  {Object.entries(pattern.keyLevels).map(([key, value]) => (
                    <p key={key} className="ml-4">• {key}: ${value}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => {
              if (currentPattern > 0) {
                setCurrentPattern(currentPattern - 1)
                setShowAnswer(false)
              }
            }}
            disabled={currentPattern === 0}
            className="px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {currentPattern < patterns.length - 1 ? 'Next Pattern' : 'Complete Module'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
