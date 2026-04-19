import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Brain, RotateCcw, User, Cpu } from 'lucide-react'

export default function Game({ dark, toggleTheme }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isHumanTurn, setIsHumanTurn] = useState(true)
  const [winner, setWinner] = useState(null)
  const [gameActive, setGameActive] = useState(true)
  const [status, setStatus] = useState("Your Turn! ✨")

  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  useEffect(() => {
    if (!isHumanTurn && gameActive) {
      setStatus("AI is thinking... 🤖")
      const timer = setTimeout(() => {
        aiMove()
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isHumanTurn, gameActive])

  const checkWinner = (currentBoard) => {
    for (let condition of winConditions) {
      const [a, b, c] = condition
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a]
      }
    }
    if (currentBoard.every(cell => cell !== null)) return 'draw'
    return null
  }

  const handleCellClick = (index) => {
    if (board[index] || !gameActive || !isHumanTurn) return

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result) {
      endGame(result)
    } else {
      setIsHumanTurn(false)
    }
  }

  const aiMove = () => {
    let bestScore = -Infinity
    let move = -1
    const currentBoard = [...board]

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O'
        let score = minimax(currentBoard, false)
        currentBoard[i] = null
        if (score > bestScore) {
          bestScore = score
          move = i
        }
      }
    }

    if (move !== -1) {
      currentBoard[move] = 'O'
      setBoard(currentBoard)
      const result = checkWinner(currentBoard)
      if (result) {
        endGame(result)
      } else {
        setIsHumanTurn(true)
        setStatus("Your Turn! ✨")
      }
    }
  }

  const minimax = (currentBoard, isMaximizing) => {
    const result = checkWinner(currentBoard)
    if (result === 'O') return 1
    if (result === 'X') return -1
    if (result === 'draw') return 0

    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O'
          let score = minimax(currentBoard, false)
          currentBoard[i] = null
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'X'
          let score = minimax(currentBoard, true)
          currentBoard[i] = null
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
  }

  const endGame = (result) => {
    setGameActive(false)
    setWinner(result)
    if (result === 'draw') setStatus("Draw Game 🤝")
    else setStatus(`${result === 'X' ? 'Player X' : 'AI O'} Wins 🎉`)
  }

  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setIsHumanTurn(true)
    setWinner(null)
    setGameActive(true)
    setStatus("Your Turn! ✨")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors selection:bg-blue-500/30">
      <Navbar dark={dark} toggleTheme={toggleTheme} />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Brain size={14} /> Neural Challenge
          </div>
          <h1 className="text-4xl md:text-6xl font-black dark:text-white uppercase tracking-tighter mb-4 leading-tight">
            Tic Tac Toe <span className="gradient-text">AI 🧠</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-Ovo tracking-wide text-lg">
            Can you outsmart an unbeatable Minimax algorithm?
          </p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-2xl font-bold mb-10 text-center uppercase tracking-widest ${winner ? 'text-blue-600' : 'text-slate-400'}`}
        >
            {status}
        </motion.div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-[400px] mb-12">
          {board.map((cell, i) => (
            <motion.button
              key={i}
              whileHover={cell || !gameActive ? {} : { scale: 1.05, backgroundColor: 'hsla(var(--primary) / 0.1)' }}
              whileTap={cell || !gameActive ? {} : { scale: 0.95 }}
              onClick={() => handleCellClick(i)}
              className={`aspect-square glass rounded-3xl flex items-center justify-center text-5xl font-black transition-all border-2 ${
                cell === 'X' ? 'text-blue-600 border-blue-500/30' : 
                cell === 'O' ? 'text-cyan-500 border-cyan-500/30' : 
                'border-slate-100 dark:border-white/5'
              }`}
            >
              <AnimatePresence mode="wait">
                {cell && (
                  <motion.span
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    key={cell}
                  >
                    {cell}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
           <button 
             onClick={restartGame}
             className="flex items-center gap-2 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-[2.5rem] font-bold uppercase tracking-widest text-xs hover:shadow-2xl transition-all active:scale-95 shadow-xl"
           >
             <RotateCcw size={18} /> Reset Matrix
           </button>

           <div className="flex items-center gap-4 p-5 glass rounded-[2.5rem]">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                 <User size={16} className="text-blue-600" />
                 <span className="text-[10px] font-bold text-slate-700 dark:text-slate-500 uppercase">You: X</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                 <Cpu size={16} className="text-cyan-500" />
                 <span className="text-[10px] font-bold text-slate-700 dark:text-slate-500 uppercase">AI: O</span>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
