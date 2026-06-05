import React,{useState,useEffect,useRef} from 'react';
import { generateBinaryAnimations } from '../core/algorithm/sorting/algorithms/binaryvariantslogic';
import {useNavigate} from 'react-router-dom';
import TutorialTab from '../core/tutorials/TutorialTab';
import { BinaryVariantsData } from '../core/tutorials/binaryVariantsData';
const BinaryVariants= ()=>{
    const navigate=useNavigate();
    const [inputStr,setInputStr]=useState("2,4,6,8,10,10,12,14,16,18");
    const [targetStr,setTargetStr]=useState("10");
    const [isPaused,setIsPaused]=useState(false);
    const [anchors, setAnchors] = useState({ leftLock: -1, rightLock: -1 });
    const [isVisualizing,setIsVisualizing]=useState(false);
    const isPausedRef=useRef(false);
    const [activeTabInfo,setActiveTabInfo]=useState('objective');
    const [activeTab,setActiveTab]=useState('visualize');
    const [speedDisplay,setSpeedDisplay]=useState(600);
    const speedRef=useRef(600);
    const [actionMessage,setActionMessage]=useState("AWAITING FOR THE USER TO START....");
    const [activeBounds,setActiveBounds]=useState({L:0,M:null,R:10});
    const [currentAction,setCurrentAction]=useState("STARTING....");
    const [currentArray,setCurrentArray]=useState(inputStr.split(',').filter(Boolean).map(Number));
    useEffect( ()=>{
        if(!isVisualizing){ 
        const arr=inputStr.split(',').filter(Boolean).map(Number);
        setCurrentArray(arr);
        setActiveBounds({L:0,M:null,R:arr.length-1});
        }

    },[inputStr,isVisualizing]);
    const handleInputChange=(e)=>{
        const inp=e.target.value.replace(/[^0-9,-]/g,'');
        setInputStr(inp);

    };
    const handleTargetChange=(e)=>{
        const inpp=e.target.value.replace(/[^0-9,-]/g,'');
        setTargetStr(inpp);

    };
    const generateRandom=()=>{
        let n=Math.floor(Math.random()*9+5);
        let arr=[];
        for(let i=0;i<n-1;i++){
            arr[i]=Math.floor(Math.random()*100);
        }
        let idn=Math.floor(Math.random()*(n-1));
        arr[n-1]=arr[idn];
        const carr=[...arr].sort((a,b)=>a-b);
        setInputStr(carr.join(','));
        setTargetStr(String(arr[idn]));
        
    };
    const togglePause=()=>{
        isPausedRef.current=!(isPausedRef.current);
        setIsPaused(isPausedRef.current);
    };
    const handleSpeedChange=(e)=>{
    const curspeed=Number(e.target.value);
    setSpeedDisplay(curspeed);
    speedRef.current=2100-curspeed;
};
    const smartWait=async(ms)=>{
        let step=20;
        let timePassed=0;
        while(timePassed<ms){
            while(isPausedRef.current){
                await new Promise(r=>setTimeout(r,50));
            }
            await new Promise(r=>setTimeout(r,step));
            timePassed+=step;

        }

    };
    const handleVisualize= async()=>{
        if(isVisualizing) return;
        setIsVisualizing(true);
        setIsPaused(false);
        isPausedRef.current = false;
        const startingArray = inputStr.split(',').filter(Boolean).map(Number);
        setCurrentArray(startingArray);
        setActiveBounds({ L: 0, R: startingArray.length - 1, M: null });
        setCurrentAction('start');
        setAnchors({ leftLock: -1, rightLock: -1 });
        setActionMessage('STARTING ENGINE...');
        const animations=generateBinaryAnimations(inputStr,targetStr);
        for(let i=0;i<animations.length;i++){ 
            const frame=animations[i];
            if (frame.type === 'lock_left') setAnchors(prev => ({ ...prev, leftLock: frame.index }));
            if (frame.type === 'lock_right') setAnchors(prev => ({ ...prev, rightLock: frame.index }));
            await smartWait(speedRef.current);
            if (frame.L !== undefined) {
                setActiveBounds({ L: frame.L, M: frame.M, R: frame.R });
            }
            setCurrentAction(frame.type);
            setActionMessage(frame.message);
        }
        setIsVisualizing(false);
    }
    const scopeArray = currentArray.slice(activeBounds.L, activeBounds.R !== null ? activeBounds.R + 1 : currentArray.length);
    return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-gray-200 font-sans p-4">
      <div className="flex justify-between items-start mb-6">
                <button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-3 px-4 py-2 bg-[#080808] border border-gray-800 rounded-md hover:border-[#ffbf00]/30 transition-all duration-300 font-mono shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    >
                        <span className="text-[#ffbf00] font-bold group-hover:-translate-x-1 transition-transform duration-300">
                            {'<'}
                        </span>
                        <span className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">
                            cd ..
                        </span>
                        <span className="text-gray-600 text-xs tracking-widest border-l border-gray-800 pl-3 ml-1 group-hover:border-[#ffbf00]/50 transition-colors duration-300">
                            /ROOT
                        </span>
                    </button>
                <div className="flex flex-col w-72">
                    <div className="flex bg-[#080808] border border-gray-800 rounded-md p-1 relative shadow-[0_0_15px_rgba(0,0,0,0.8)] font-mono">
                        <div
                            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#ffbf00]/10 border border-[#ffbf00]/50 rounded-sm transition-all duration-300 ease-in-out"
                            style={{ left: activeTab === 'visualize' ? '4px' : 'calc(50% + 2px)' }}
                        ></div>
                        <button
                            onClick={() => setActiveTab('visualize')}
                            className={`flex-1 py-2 text-sm font-bold z-10 transition-colors duration-300 flex items-center justify-center gap-2 ${
                                activeTab === 'visualize' ? 'text-[#ffbf00]' : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            <span className="text-xs opacity-50">[0]</span> VISUALIZE
                        </button>
                        <button
                            onClick={() => setActiveTab('tutorial')}
                            className={`flex-1 py-2 text-sm font-bold z-10 transition-colors duration-300 flex items-center justify-center gap-2 ${
                                activeTab === 'tutorial' ? 'text-[#ffbf00]' : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            <span className="text-xs opacity-50">[1]</span> TUTORIAL
                        </button>
                    </div>
                    <div className="w-full relative h-8 font-mono text-[#ffbf00] font-bold overflow-hidden">
                        <div
                            className="absolute transition-all duration-300 flex flex-col items-center"
                            style={{ left: activeTab === 'visualize' ? '25%' : '75%', transform: 'translateX(-50%)' }}
                        >
                            <span className="text-lg leading-none -mt-1">^</span>
                            <span className="text-[10px] leading-none uppercase tracking-widest mt-1">head_ptr</span>
                        </div>
                    </div>
                </div>
            </div>
            {activeTab === 'visualize' ? (
                <>
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800/60 border border-gray-700 p-4 rounded-xl mb-4 gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            disabled={isVisualizing} 
            value={inputStr} 
            onChange={handleInputChange} 
            placeholder="Sorted array..."
            className={`bg-gray-900 border px-4 py-2 rounded-lg font-mono text-cyan-300 focus:outline-none focus:ring-2 transition-all w-48
            ${isVisualizing ? 'opacity-50 cursor-not-allowed border-gray-700' : 'border-gray-600 focus:ring-cyan-500'}`}
          />
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-2">
             <span className="text-xs font-bold text-gray-500">TARGET:</span>
             <input 
               type="text" 
               disabled={isVisualizing} 
               value={targetStr} 
               onChange={handleTargetChange} 
               className="bg-transparent w-12 py-2 text-pink-400 font-bold focus:outline-none text-center"
             />
          </div>
          <button onClick={generateRandom} disabled={isVisualizing} className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-bold transition-colors disabled:opacity-50">🎲 Random</button>
        </div>
        
        <div className="hidden md:flex flex-col items-center gap-2">
          <div className="text-gray-400 font-bold tracking-widest text-sm">FIRST & LAST POSITION</div>
          <div className="flex items-center gap-3 bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-700">
            <span className="text-[10px] text-gray-500 font-bold tracking-wider">SLOW</span>
            <input type="range" step={50} min={100} max={2000} value={speedDisplay} onChange={handleSpeedChange} className="w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"/>
            <span className="text-[10px] text-cyan-500 font-bold tracking-wider">FAST</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={togglePause}
            disabled={!isVisualizing}
            className={`px-4 py-2 text-sm font-bold rounded-lg flex items-center gap-2 transition-colors ${!isVisualizing ? 'bg-gray-800 border border-gray-700 text-gray-600 cursor-not-allowed' : isPaused ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400' : 'bg-gray-700 border border-gray-600 text-white hover:bg-gray-600'}`}
          >
            {isPaused ? '▶ RESUME' : '⏸ PAUSE'}
          </button>
          <button 
             onClick={handleVisualize}
             disabled={isVisualizing && !isPaused}
             className={`px-6 py-2 rounded-lg font-bold transition-all ${isVisualizing ? 'bg-gray-800 border border-gray-700 text-gray-600 cursor-not-allowed' : 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]'}`}
           >
             ▶ START
           </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row flex-1 gap-4 overflow-hidden">
        <div className="w-full xl:w-3/4 bg-gray-800/40 border border-gray-700 rounded-xl p-6 flex flex-col relative overflow-y-auto">
          
          <div className="flex justify-between items-start mb-4 shrink-0">
            <h2 className="text-xl font-bold text-gray-300">Minimap Architecture</h2>
            <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-3 w-3/5 shadow-inner">
              <div className="flex gap-2 mb-2 border-b border-gray-700 pb-2">
                <button onClick={() => setActiveTabInfo('objective')} className={`px-3 py-1 text-xs font-bold rounded transition-all ${activeTabInfo === 'objective' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-500 hover:text-gray-400'}`}>🎯 Objective</button>
                <button onClick={() => setActiveTabInfo('technique')} className={`px-3 py-1 text-xs font-bold rounded transition-all ${activeTabInfo === 'technique' ? 'bg-pink-500/20 text-pink-300' : 'text-gray-500 hover:text-gray-400'}`}>🧠 Technique</button>
              </div>
              <div className="text-xs text-gray-400 leading-relaxed min-h-[40px]">
                {activeTabInfo === 'objective' && <p><strong className="text-gray-300">Goal:</strong> Find the starting and ending position of a given target value in a sorted array.</p>}
                {activeTabInfo === 'technique' && <p><strong className="text-gray-300">Two-Pass Binary Search:</strong> Find the target, then force the engine to keep searching left to find the first occurrence. Repeat to find the right occurrence.</p>}
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            
            <div className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 flex flex-col items-center shrink-0">
               <span className="text-[10px] text-gray-500 font-bold tracking-widest mb-3">GLOBAL MEMORY (MINIMAP)</span>
               <div className="flex flex-wrap justify-center gap-2 w-full">
                 {currentArray.map((num, idx) => {
                   const isDiscarded = idx < activeBounds.L || idx > activeBounds.R;
                   const isMid = activeBounds.M === idx;
                   const isLocked = idx === anchors.leftLock || idx === anchors.rightLock;
                   
                   return (
                     <div key={idx} className={`w-8 h-10 border flex items-center justify-center text-xs font-mono font-bold rounded transition-all duration-300
                       ${isDiscarded ? 'bg-red-900 border-red-900 text-red-500 scale-75  pointer-events-none' : 'bg-gray-800 border-gray-500 text-gray-300'}
                       ${isMid ? 'bg-purple-500/20 border-purple-400 text-purple-300' : ''}
                       ${isLocked ? 'bg-pink-500/20 border-pink-400 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10' : ''}
                     `}>
                       {num}
                     </div>
                   )
                 })}
               </div>
            </div>

            <div className="flex-1 bg-gray-900/30 border border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
               
               <div className="flex flex-wrap justify-center gap-4 mb-8 w-full">
                 {scopeArray.map((num, idx) => {
                   const actualIndex = activeBounds.L + idx;
                   const isMid = activeBounds.M === actualIndex;
                   
                   let glowClass = 'bg-gray-800 border-cyan-500/50 text-cyan-100';
                   
                   if (isMid && currentAction === 'found_temp') {
                     glowClass = 'bg-orange-500/20 border-orange-400 text-orange-300 scale-110 -translate-y-2 shadow-[0_0_20px_rgba(249,115,22,0.4)] z-10';
                   } else if (isMid) {
                     glowClass = 'bg-purple-500/20 border-purple-400 text-purple-300 scale-110 -translate-y-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] z-10';
                   }

                   if (currentAction === 'complete_range' && actualIndex >= anchors.leftLock && actualIndex <= anchors.rightLock) {
                     glowClass = 'bg-green-500/20 border-green-400 text-green-300 scale-110 -translate-y-2 shadow-[0_0_20px_rgba(74,222,128,0.5)] z-20';
                   }

                   let lockBorders = '';
                   if (actualIndex === anchors.leftLock) lockBorders += ' border-l-4 border-l-pink-500 ';
                   if (actualIndex === anchors.rightLock) lockBorders += ' border-r-4 border-r-pink-500 ';

                   // Drop out animation
                   if (currentAction === 'discard_left' && actualIndex <= activeBounds.M) {
                     glowClass = 'bg-red-900/20 border-red-500/50 text-red-500/50 scale-50 translate-y-20 opacity-0 pointer-events-none';
                   } else if (currentAction === 'discard_right' && actualIndex >= activeBounds.M) {
                     glowClass = 'bg-red-900/20 border-red-500/50 text-red-500/50 scale-50 translate-y-20 opacity-0 pointer-events-none';
                   }

                   return (
                     <div key={idx} className="flex flex-col items-center">
                       <div className={`w-20 h-24 border-2 flex items-center justify-center text-3xl font-mono font-bold rounded transition-all duration-500 relative ${glowClass} ${lockBorders}`}>
                         {num}
                         {isMid && currentAction !== 'found_temp' && <span className="absolute -bottom-6 text-xs text-purple-400 tracking-widest font-bold">MID</span>}
                         {isMid && currentAction === 'found_temp' && <span className="absolute -bottom-6 text-[10px] text-orange-400 tracking-widest font-bold">TEMP</span>}
                         {actualIndex === activeBounds.L && !isMid && <span className="absolute -bottom-6 text-xs text-cyan-400 tracking-widest font-bold left-0">L</span>}
                         {actualIndex === activeBounds.R && !isMid && <span className="absolute -bottom-6 text-xs text-cyan-400 tracking-widest font-bold right-0">R</span>}
                         
                         {/* Anchors Indicators */}
                         {actualIndex === anchors.leftLock && <span className="absolute -top-6 text-xs text-pink-400 font-bold whitespace-nowrap">LEFT LOCK</span>}
                         {actualIndex === anchors.rightLock && <span className="absolute -top-6 text-xs text-pink-400 font-bold whitespace-nowrap">RIGHT LOCK</span>}
                       </div>
                       <span className="text-[10px] text-gray-500 mt-8">idx: {actualIndex}</span>
                     </div>
                   )
                 })}
               </div>
               <div className={`h-16 w-full max-w-2xl bg-gray-900/80 border rounded-xl flex items-center justify-center shadow-inner transition-colors duration-300
                 ${currentAction === 'complete_range' ? 'border-green-500/50' : currentAction === 'not_found' ? 'border-red-500/50' : currentAction === 'found_temp' ? 'border-orange-500/50' : 'border-gray-700'}
               `}>
                 <p className={`font-mono text-sm tracking-widest transition-colors ${currentAction === 'none' ? 'text-gray-500' : 'text-gray-200'}`}>
                   {actionMessage}
                 </p>
               </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL (ALGORITHM) */}
        <div className="w-full xl:w-1/4 bg-gray-800/40 border border-gray-700 rounded-xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2 shrink-0">
            <h3 className="text-indigo-400 font-bold">Live Algorithm</h3>
            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-900 rounded border border-gray-700">Two-Pass O(log N)</span>
          </div>
          
          <div className="overflow-y-auto flex-1 font-mono text-[13px] leading-relaxed custom-scrollbar p-3 bg-[#0d1117] rounded border border-gray-700 shadow-inner text-gray-600">
             
            <div className={`transition-all duration-200 px-2 rounded`}>
              <span className="text-pink-500">function</span> <span className="text-blue-400">searchRange</span>(arr, target) {"{"}
            </div>

            <div className={`transition-all duration-200 px-2 rounded mt-2 ${currentAction === 'start' || currentAction === 'lock_left' ? 'bg-pink-500/20 text-pink-300 font-bold border-l-2 border-pink-400' : 'text-gray-600'}`}>
              {"  "}<span className="text-gray-500">// Pass 1: Find Left Boundary</span><br/>
              {"  "}<span className="text-pink-500">let</span> leftLock = findBound(arr, target, <span className="text-orange-400">true</span>);
            </div>

            <div className={`transition-all duration-200 px-2 rounded mt-2 ${currentAction === 'reset_for_pass_two' || currentAction === 'lock_right' ? 'bg-pink-500/20 text-pink-300 font-bold border-l-2 border-pink-400' : 'text-gray-600'}`}>
              {"  "}<span className="text-gray-500">// Pass 2: Find Right Boundary</span><br/>
              {"  "}<span className="text-pink-500">let</span> rightLock = findBound(arr, target, <span className="text-orange-400">false</span>);
            </div>

            <div className={`transition-all duration-200 px-2 rounded mt-2 ${currentAction === 'complete_range' ? 'bg-green-500/20 text-green-300 font-bold border-l-2 border-green-400' : 'text-gray-600'}`}>
              {"  "}<span className="text-pink-500">return</span> [leftLock, rightLock];
            </div>

            <div className={`transition-all duration-200 px-2 rounded mt-4 text-gray-500`}>
              {"}"}
            </div>
            
            <div className={`transition-all duration-200 px-2 rounded mt-4 text-gray-600`}>
              <span className="text-pink-500">function</span> <span className="text-blue-400">findBound</span>(..., isFirst) {"{"} <br/>
              {"  "}<span className="text-pink-500">while</span> (L &lt;= R) {"{"}
            </div>

            <div className={`transition-all duration-200 px-2 rounded ${currentAction === 'eval' ? 'bg-purple-500/20 text-purple-300 font-bold border-l-2 border-purple-400' : 'text-gray-600'}`}>
              {"    "}let M = Math.floor((L + R) / 2);
            </div>
            
            <div className={`transition-all duration-200 px-2 rounded mt-2 ${currentAction === 'found_temp' ? 'bg-orange-500/20 text-orange-300 font-bold border-l-2 border-orange-400' : 'text-gray-600'}`}>
              {"    "}<span className="text-pink-500">if</span> (arr[M] === target) {"{"}<br/>
              {"      "}best = M;<br/>
              {"      "}<span className="text-pink-500">if</span> (isFirst) R = M - 1; <span className="text-gray-500">// search left</span><br/>
              {"      "}<span className="text-pink-500">else</span> L = M + 1; <span className="text-gray-500">// search right</span><br/>
              {"    }"}
            </div>

            <div className={`transition-all duration-200 px-2 rounded mt-2 ${currentAction === 'discard_left' ? 'bg-red-500/20 text-red-300 font-bold border-l-2 border-red-400' : 'text-gray-600'}`}>
              {"    "}<span className="text-pink-500">else if</span> (arr[M] &lt; target) L = M + 1;
            </div>

            <div className={`transition-all duration-200 px-2 rounded ${currentAction === 'discard_right' ? 'bg-red-500/20 text-red-300 font-bold border-l-2 border-red-400' : 'text-gray-600'}`}>
              {"    "}<span className="text-pink-500">else</span> R = M - 1;
            </div>

            <div className={`transition-all duration-200 px-2 rounded mt-2 text-gray-600`}>
              {"  }"} <br/>
              {"  "}<span className="text-pink-500">return</span> best; <br/>
              {"}"}
            </div>

          </div>
        </div>
      </div>
    </>
            ) : (
                <TutorialTab data={BinaryVariantsData.firstLast} />
            )}
        </div>
    );
};
export default BinaryVariants;

