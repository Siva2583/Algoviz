import React, { useState, useEffect, useRef } from 'react';
import NQueensControls from '../../components/NQueensControls';
import { nQueensAnimation } from './algorithm/sorting/algorithms/nQueens';
import NQueensplay from '../../components/NQueensplay';
import { Navigate, useNavigate } from 'react-router-dom';
const NQueens = () => {
  const [playclick,SetPlayclick]=useState(false);
  const [gridSize, setGridSize] = useState(4);
  const [speed, setSpeed] = useState(200);
  const [board, setBoard] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const [currentAction,setCurrentAction]=useState('none');
  const [isVisualizing, setIsVisualizing] = useState(false);
  const navigate=useNavigate();
  //const [message, setMessage] = useState('Select size and start!');
  const [logs, setLogs] = useState(["Select size and start!"]);
  useEffect(()=>{resetBoard();},[gridSize]);
  const resetBoard=()=>{
    const newBoard = Array(gridSize).fill().map(()=>Array(gridSize).fill({
      hasQueen:false,
      status:'default'
    }));
    setBoard(newBoard);
    
  }
  const togglePause = () => {
  isPausedRef.current = !isPausedRef.current;
  setIsPaused(isPausedRef.current);
};
  
  const updateCell = (row, col, updates) => {
    setBoard(prev => {
      const newBoard = prev.map(r => r.slice());
      newBoard[row][col] = { ...newBoard[row][col], ...updates };
      return newBoard;
    });
  };
  const smartWait = async (ms) => {
    let timePassed = 0;
    const step = 20;
    
    while (timePassed < ms) {
      while (isPausedRef.current) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      await new Promise(resolve => setTimeout(resolve, step));
      timePassed += step;
    }
  };

  const handleVisualize = async () => {
    if (isVisualizing) return;
    setIsVisualizing(true);
    resetBoard();
    
    // Clear the console when starting a new run!
    setLogs(["Calculating..."]); 

    const animations = nQueensAnimation(gridSize);
    
    for (let i = 0; i < animations.length; i++) {
      const { type, row, col, conflictRow, conflictCol, conflictType } = animations[i];
      
      await smartWait(speed);
      await new Promise(r => setTimeout(r, speed));

      if (type === 'inspect') {
        setCurrentAction('inspect');
        setLogs(prev => [...prev, `🔍 Inspecting [${row}, ${col}]...`]);
        updateCell(row, col, { status: 'inspect' });
        setTimeout(() => updateCell(row, col, { status: 'default' }), speed * 1.2);
        
      } 
      else if (type === 'conflict') {
        setCurrentAction('conflict');
        setLogs(prev => [...prev, `❌ ${conflictType} Conflict! Attacked by Queen at [${conflictRow}, ${conflictCol}]`]);
        updateCell(row, col, { status: 'conflict' });
        updateCell(conflictRow, conflictCol, { status: 'attacker' });
        
        setTimeout(() => {
          updateCell(row, col, { status: 'default' });
          updateCell(conflictRow, conflictCol, { status: 'safe' });
        }, speed * 0.8);
      } 
      else if (type === 'place') {
        setCurrentAction('place');
        setLogs(prev => [...prev, `✅ Placed Queen at [${row}, ${col}]`]);
        updateCell(row, col, { hasQueen: true, status: 'safe' });
      } 
      else if (type === 'remove') {
        setCurrentAction('remove');
        setLogs(prev => [...prev, `⏪ Backtracking from [${row}, ${col}]`]);
        updateCell(row, col, { hasQueen: false, status: 'default' });
      }
    }
    setLogs(prev => [...prev, `🎉 Solution Found for N=${gridSize}!`]);
    setIsVisualizing(false);
    setCurrentAction('none');
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 pt-8 flex flex-col items-center">
      <button
  className="
    self-start
    text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600d
    
    hover:bg-cyan-500/10
    hover:text-cyan-300
    hover:scale-105
    
    active:scale-95
    
    transition-all
    duration-300
  "
  onClick={() => navigate('/')}
>
  ← Back To Controls
</button>
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        N-Queens Visualizer
      </h2>
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => SetPlayclick(false)} 
          className={`px-6 py-2 font-bold rounded-lg transition-colors ${!playclick ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          Visualizer
        </button>
        <button 
          onClick={() => SetPlayclick(true)} 
          className={`px-6 py-2 font-bold rounded-lg transition-colors ${playclick ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          Playground
        </button>
      </div>
      
      {playclick ? (<NQueensplay/>): (
        <>
        <div>
          <NQueensControls
        gridSize={gridSize}
        setGridSize={setGridSize}
        speed={speed}
        setSpeed={setSpeed}
        onVisualize={handleVisualize}
        isVisualizing={isVisualizing}
        onClear={resetBoard}
      />
        </div>
        <div className='flex flex-col xl:flex-row w-full max-w-[1400px] gap-6 px-4'>
          {/* PANEL 1: Console */}
        <div className='w-full xl:w-1/3 h-[500px] bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col'>
          
          {/* The Header (shrink-0 keeps it from squishing when scrolling) */}
          <h3 className="text-cyan-400 font-bold mb-4 border-b border-gray-700 pb-2 shrink-0">
            Console
          </h3>

          {/* The Scrollable Window */}
          <div className="overflow-y-auto flex-1 pr-2 space-y-2 custom-scrollbar">
            {logs.map((log, index) => {
              // Check if this is the absolute latest message
              const isLatestStep = index === logs.length - 1;

              return (
                <p 
                  key={index} 
                  className={`text-sm font-mono transition-colors duration-300 ${
                    isLatestStep ? 'text-green-400 font-bold' : 'text-gray-500'
                  }`}
                >
                  <span className="text-gray-600 mr-2">[{index + 1}]</span>
                  {log}
                </p>
              );
            })}
          </div>

        </div>
      <div 
      
        className="grid bg-gray-800 xl:w-1/3 justify-center border-4 border-gray-700 rounded-lg shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: 'min(85vw, 500px)',
          height: 'min(85vw, 500px)',
        }}
      >
        {board.map((row, rIdx) => (
          row.map((cell, cIdx) => {
            const isBlack = (rIdx + cIdx) % 2 === 1;
            const baseColor = isBlack ? 'bg-gray-800' : 'bg-gray-600';
            
            let cellColor = baseColor;
            if (cell.status === 'inspect') cellColor = 'bg-yellow-500/50';
            if (cell.status === 'conflict') cellColor = 'bg-red-500/60 transition-colors duration-75';
            if (cell.status === 'attacker') cellColor = 'bg-orange-500/80 shadow-[inset_0_0_15px_rgba(255,165,0,1)]';

            return (
              <div 
                key={`${rIdx}-${cIdx}`}
                className={`aspect-square overflow-hidden flex items-center justify-center text-3xl sm:text-4xl transition-colors duration-200 ${cellColor}`}
              >
                {cell.hasQueen && (
                  <span className="animate-bounce-short text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                    ♛
                  </span>
                )}
              </div>
            );
          })
        ))}
      </div>
      {/*Algotithm*/}
      {/* PANEL 3: Algorithm */}
        {/* PANEL 3: Live Algorithm */}
        {/* PANEL 3: Enhanced Live Algorithm */}
        <div className="w-full xl:w-1/4 h-[500px] bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col relative">
          
          {/* Header with Pause/Play Button */}
          <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2 shrink-0">
            <h3 className="text-purple-400 font-bold">Live Execution</h3>
            <button 
              onClick={togglePause}
              disabled={!isVisualizing} // Only clickable when running!
              className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-2 transition-colors ${
                !isVisualizing ? 'bg-gray-700 text-gray-500 cursor-not-allowed' :
                isPaused ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 
                'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
              }`}
            >
              {isPaused ? '▶ RESUME' : '⏸ PAUSE'}
            </button>
          </div>
          
          <div className="overflow-y-auto flex-1 font-mono text-[13px] leading-relaxed custom-scrollbar p-3 bg-[#0d1117] rounded border border-gray-700 shadow-inner">
            
            {/* THE NEW FEATURE: Live Variables Tracker */}
            <div className="flex justify-between bg-gray-800/80 p-2 rounded mb-3 text-xs border border-gray-700">
               <span className="text-cyan-400">N: <span className="text-white">{gridSize}</span></span>
               {/* Note: If you want these to update live, you can add an activeRow/activeCol state just like currentAction! */}
               <span className="text-purple-400">Row: <span className="text-white">{currentAction !== 'none' ? 'Live' : '-'}</span></span>
               <span className="text-pink-400">Action: <span className="text-white uppercase">{currentAction}</span></span>
            </div>

            {/* The Glowing Code */}
            <div className={`transition-all duration-200 px-2 rounded ${currentAction === 'none' ? 'text-gray-400' : 'text-gray-600'}`}>
              <span className="text-pink-500">function</span> <span className="text-blue-400">solve</span>(row) {"{"}
            </div>

            <div className={`transition-all duration-200 px-2 rounded ${currentAction === 'inspect' ? 'bg-yellow-500/20 text-yellow-300 font-bold border-l-2 border-yellow-400' : 'text-gray-600'}`}>
              {"  "}<span className="text-pink-500">for</span> (col = 0; col &lt; N; col++) {"{"} <br/>
              {"    "}check(cols, d1, d2);
            </div>

            <div className={`transition-all duration-200 px-2 rounded ${currentAction === 'conflict' ? 'bg-red-500/20 text-red-300 font-bold border-l-2 border-red-400' : 'text-gray-600'}`}>
              {"    "}<span className="text-pink-500">if</span> (attacked) <span className="text-pink-500">continue</span>;
            </div>

            <div className={`transition-all duration-200 px-2 rounded mt-1 ${currentAction === 'place' ? 'bg-green-500/20 text-green-300 font-bold border-l-2 border-green-400' : 'text-gray-600'}`}>
              {"    "}board[row][col] = 'Q'; <br/>
              {"    "}markArrays();
            </div>

            <div className={`transition-all duration-200 px-2 rounded mt-1 ${currentAction === 'none' ? 'text-gray-400' : 'text-gray-600'}`}>
              {"    "}<span className="text-pink-500">if</span> (solve(row + 1)) <span className="text-pink-500">return true</span>;
            </div>

            <div className={`transition-all duration-200 px-2 rounded mt-1 ${currentAction === 'remove' ? 'bg-orange-500/20 text-orange-300 font-bold border-l-2 border-orange-400' : 'text-gray-600'}`}>
              {"    "}board[row][col] = '.'; <br/>
              {"    "}unmarkArrays();
            </div>

            <div className={`transition-all duration-200 px-2 rounded ${currentAction === 'none' ? 'text-gray-400' : 'text-gray-600'}`}>
              {"  }\n  "}<span className="text-pink-500">return false</span>; <br/>
              {"}"}
            </div>

          </div>
        </div>
      </div>
      </>
      )}
      
      
    </div>
      
  );
};

export default NQueens;