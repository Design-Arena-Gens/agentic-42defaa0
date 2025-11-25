'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Award, ChevronRight } from 'lucide-react'

const questions = [
  {
    question: 'According to Alan Farley, what is the maximum percentage of your account you should risk on a single trade?',
    options: ['1%', '2%', '5%', '10%'],
    correct: 1,
    explanation: 'The 2% rule is fundamental to capital preservation. Risking more increases the chance of significant drawdowns.',
  },
  {
    question: 'In a Head and Shoulders pattern, what does the pattern signal?',
    options: [
      'Bullish continuation',
      'Bearish reversal',
      'Neutral consolidation',
      'Bullish reversal',
    ],
    correct: 1,
    explanation: 'Head and Shoulders is a bearish reversal pattern that forms after an uptrend, signaling a potential trend change.',
  },
  {
    question: 'What is the recommended reward-to-risk ratio for swing trades?',
    options: ['1:1', '2:1 or better', '3:1 or better', 'Any positive ratio'],
    correct: 1,
    explanation: 'Farley recommends targeting at least 2:1 reward-to-risk. This allows you to be profitable even with a 40% win rate.',
  },
  {
    question: 'When using multiple timeframe analysis, which timeframe should you check first?',
    options: ['1-hour chart', '4-hour chart', 'Daily chart', 'Weekly chart'],
    correct: 3,
    explanation: 'Always start with the weekly chart to identify the primary trend and major support/resistance levels.',
  },
  {
    question: 'What is the best setup for a swing trade according to multiple timeframe analysis?',
    options: [
      'All timeframes showing the same trend',
      'Daily and weekly in conflict',
      'Only the daily chart matters',
      'Short-term counter to long-term trend',
    ],
    correct: 0,
    explanation: 'The highest probability setups occur when all timeframes align in the same direction - these are "power zones".',
  },
  {
    question: 'Where should you place your stop loss on a pullback entry in an uptrend?',
    options: [
      'At the entry price',
      'Just below support level',
      '10% below entry',
      'At the recent high',
    ],
    correct: 1,
    explanation: 'Place stops just below the support level that you used for entry. If support breaks, your trade thesis is invalid.',
  },
  {
    question: 'What is a Bull Flag pattern?',
    options: [
      'A reversal pattern',
      'A topping pattern',
      'A continuation pattern during uptrend',
      'A bottoming pattern',
    ],
    correct: 2,
    explanation: 'Bull Flag is a continuation pattern - a brief consolidation during an uptrend before the trend resumes higher.',
  },
  {
    question: 'When should you move your stop loss to breakeven?',
    options: [
      'Immediately after entry',
      'When profit equals your initial risk (1R)',
      'Never move stops',
      'Only at the profit target',
    ],
    correct: 1,
    explanation: 'Move your stop to breakeven once the trade has moved in your favor by 1R (one times your initial risk).',
  },
  {
    question: 'What does Farley mean by "3D charting"?',
    options: [
      'Three-dimensional charts',
      'Analyzing price, volume, and time together',
      'Using three indicators',
      'Three different stocks',
    ],
    correct: 1,
    explanation: '3D charting means analyzing price action, volume patterns, and time cycles together for complete market understanding.',
  },
  {
    question: 'What is the primary benefit of scaling out of winning positions?',
    options: [
      'It guarantees profits',
      'It locks in partial gains while keeping exposure to larger moves',
      'It avoids all risk',
      'It increases position size',
    ],
    correct: 1,
    explanation: 'Scaling out locks in partial profits while leaving some position to capture larger moves if the trend continues.',
  },
]

interface Props {
  onComplete: () => void
}

export default function Quiz({ onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correct
  const isComplete = currentQuestion === questions.length - 1 && showResult

  const handleAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    setShowResult(true)
    const correct = selectedAnswer === question.correct
    setAnswers([...answers, correct])
    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleComplete = () => {
    onComplete()
  }

  const scorePercentage = Math.round((score / questions.length) * 100)

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Test Your Knowledge</h2>
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {!isComplete ? (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900">{question.question}</h3>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isAnswerCorrect = showResult && index === question.correct
              const isAnswerWrong = showResult && isSelected && index !== question.correct

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    isAnswerCorrect
                      ? 'border-green-500 bg-green-50'
                      : isAnswerWrong
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{option}</span>
                    {isAnswerCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {isAnswerWrong && <XCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              )
            })}
          </div>

          {showResult && (
            <div
              className={`p-6 rounded-lg border-l-4 ${
                isCorrect
                  ? 'bg-green-50 border-green-600'
                  : 'bg-red-50 border-red-600'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h4>
                  <p className="text-gray-700">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-gray-600">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </div>
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Next Question
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg text-center">
            <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
            <p className="text-lg text-gray-700 mb-4">
              Your Score: {score} out of {questions.length} ({scorePercentage}%)
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  scorePercentage >= 80
                    ? 'bg-green-500'
                    : scorePercentage >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${scorePercentage}%` }}
              />
            </div>
            {scorePercentage >= 80 ? (
              <p className="text-green-700 font-semibold">
                Excellent! You have a strong understanding of Alan Farley's swing trading principles.
              </p>
            ) : scorePercentage >= 60 ? (
              <p className="text-yellow-700 font-semibold">
                Good job! Review the modules to strengthen your understanding of key concepts.
              </p>
            ) : (
              <p className="text-red-700 font-semibold">
                Keep learning! Go back through the modules to better understand the core principles.
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-4">Results Breakdown:</h4>
            <div className="space-y-2">
              {questions.map((q, index) => (
                <div key={index} className="flex items-center gap-3">
                  {answers[index] ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <span className="text-sm text-gray-700">{q.question}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleComplete}
            className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            Complete Course
          </button>
        </div>
      )}
    </div>
  )
}
