'use client'

import { useState } from 'react'
import { BookOpen, TrendingUp, BarChart3, Target, ChevronRight, Award } from 'lucide-react'
import PatternRecognition from './components/PatternRecognition'
import RiskManagement from './components/RiskManagement'
import TimeframeAnalysis from './components/TimeframeAnalysis'
import EntryExitStrategies from './components/EntryExitStrategies'
import Quiz from './components/Quiz'

type Section = 'intro' | 'patterns' | 'risk' | 'timeframes' | 'entries' | 'quiz'

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>('intro')
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())

  const markComplete = (section: Section) => {
    setCompletedSections(prev => new Set([...prev, section]))
  }

  const sections = [
    { id: 'patterns', title: 'Pattern Recognition', icon: BarChart3 },
    { id: 'risk', title: 'Risk Management', icon: Target },
    { id: 'timeframes', title: 'Timeframe Analysis', icon: TrendingUp },
    { id: 'entries', title: 'Entry & Exit Strategies', icon: ChevronRight },
    { id: 'quiz', title: 'Test Your Knowledge', icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Swing Trading Academy</h1>
                <p className="text-sm text-gray-600">Based on Alan Farley's "The Master Swing Trader"</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Progress: {completedSections.size}/{sections.length}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-8">
              <h2 className="font-semibold text-gray-900 mb-4">Course Modules</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setCurrentSection('intro')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    currentSection === 'intro'
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    <span>Introduction</span>
                  </div>
                </button>
                {sections.map((section) => {
                  const Icon = section.icon
                  const isCompleted = completedSections.has(section.id)
                  return (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(section.id as Section)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        currentSection === section.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="flex-1">{section.title}</span>
                        {isCompleted && (
                          <Award className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentSection === 'intro' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Swing Trading</h2>

                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    Master the art of swing trading with principles from Alan Farley's renowned book
                    <span className="font-semibold italic"> "The Master Swing Trader"</span>. This interactive
                    course will teach you the essential concepts and strategies used by professional traders.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Swing Trading?</h3>
                    <p className="text-gray-700">
                      Swing trading is a strategy that attempts to capture gains in a stock within 1 to 7 days.
                      Unlike day trading, swing traders hold positions overnight and for several days, targeting
                      medium-term price movements.
                    </p>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Core Principles from Alan Farley</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        Pattern Recognition
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Learn to identify classic chart patterns like head and shoulders, double tops/bottoms,
                        and continuation patterns that signal potential trades.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-600" />
                        Risk Management
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Master the 2% rule, position sizing, and stop-loss placement to protect your capital
                        and survive in the markets long-term.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                        Multiple Timeframes
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Use daily, weekly, and intraday charts together to confirm trends and find optimal
                        entry points with multiple timeframe analysis.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-pink-600" />
                        Entry & Exit Rules
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Develop systematic entry and exit strategies using support/resistance levels,
                        Fibonacci retracements, and momentum indicators.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">The Master Swing Trader Methodology</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="font-semibold min-w-[140px]">Pattern Cycles:</span>
                        <span>Markets move through predictable cycles of accumulation, markup, distribution, and markdown</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold min-w-[140px]">Support/Resistance:</span>
                        <span>Price memory creates levels where buyers and sellers repeatedly battle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold min-w-[140px]">3D Charting:</span>
                        <span>Analyze price, volume, and time together for complete market understanding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold min-w-[140px]">Trend Mechanics:</span>
                        <span>Trade with the trend using pullbacks and breakouts for best probability</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Learning Path</h3>
                    <ol className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 min-w-[24px]">1.</span>
                        <span><strong>Pattern Recognition:</strong> Learn to spot classic chart patterns and understand what they mean</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 min-w-[24px]">2.</span>
                        <span><strong>Risk Management:</strong> Calculate position sizes and set proper stop-losses</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 min-w-[24px]">3.</span>
                        <span><strong>Timeframe Analysis:</strong> Use multiple timeframes to confirm your trading decisions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 min-w-[24px]">4.</span>
                        <span><strong>Entry & Exit Strategies:</strong> Develop systematic rules for when to enter and exit trades</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 min-w-[24px]">5.</span>
                        <span><strong>Test Your Knowledge:</strong> Complete the quiz to verify your understanding</span>
                      </li>
                    </ol>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => setCurrentSection('patterns')}
                      className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 text-lg"
                    >
                      Start Learning
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentSection === 'patterns' && (
              <PatternRecognition onComplete={() => markComplete('patterns')} />
            )}

            {currentSection === 'risk' && (
              <RiskManagement onComplete={() => markComplete('risk')} />
            )}

            {currentSection === 'timeframes' && (
              <TimeframeAnalysis onComplete={() => markComplete('timeframes')} />
            )}

            {currentSection === 'entries' && (
              <EntryExitStrategies onComplete={() => markComplete('entries')} />
            )}

            {currentSection === 'quiz' && (
              <Quiz onComplete={() => markComplete('quiz')} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
