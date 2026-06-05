import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { runPathfinder } from './algorithm/sorting/algorithms/pathFinderLogic';
import { pathfinderData } from './tutorials/PathFinderData';
import TutorialTab from './tutorials/TutorialTab';
const NUM_ROWS = 15;
const NUM_COLS = 35;
const START_NODE_ROW = 7;
const START_NODE_COL = 5;
const END_NODE_ROW = 7;
const END_NODE_COL = 29;
const Pathfinder = () => {
    const navigate = useNavigate();
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [selectedAlgo, setSelectedAlgo] = useState("bfs");
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [actionMessage, setActionMessage] = useState("Draw walls and click START to explore.");
    const [stats, setStats] = useState({ explored: 0, pathLength: 0 });
    const [activeTab, setActiveTab] = useState('visualize');
    useEffect(() => {
        resetGrid();
    }, []);
    const createNode = (col, row) => {
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isEnd: row === END_NODE_ROW && col === END_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            isPath: false,
            previousNode: null,
        };
    };
    const resetGrid = () => {
        const newGrid = [];
        for (let row = 0; row < NUM_ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < NUM_COLS; col++) {
                currentRow.push(createNode(col, row));
            }
            newGrid.push(currentRow);
        }
        setGrid(newGrid);
        setStats({ explored: 0, pathLength: 0 });
        setActionMessage("Grid reset. Ready for new maze.");
    };
    const clearPath = () => {
        const newGrid = grid.map(row =>
            row.map(node => ({ ...node, isVisited: false, isPath: false, distance: Infinity, previousNode: null }))
        );
        setGrid(newGrid);
        setStats({ explored: 0, pathLength: 0 });
        setActionMessage("Path cleared. Walls preserved.");
    };
    const getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        if(node.isStart || node.isEnd) return newGrid;
        const newNode = { ...node, isWall: !node.isWall };
        newGrid[row][col] = newNode;
        return newGrid;
    };
    const handleMouseDown = (row, col) => {
        if (isVisualizing) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    };
    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed || isVisualizing) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    };
    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };
    const animatePathfinder = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                setGrid(prevGrid => {
                    const newGrid = [...prevGrid];
                    newGrid[node.row] = [...newGrid[node.row]];
                    newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], isVisited: true };
                    return newGrid;
                });
                setStats(prev => ({ ...prev, explored: i + 1 }));
            }, 10 * i);
        }
    };
    const animateShortestPath = (nodesInShortestPathOrder) => {
        setActionMessage("Target found! Reconstructing shortest path...");
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                setGrid(prevGrid => {
                    const newGrid = [...prevGrid];
                    newGrid[node.row] = [...newGrid[node.row]];
                    newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], isPath: true };
                    return newGrid;
                });
                setStats(prev => ({ ...prev, pathLength: i + 1 }));
                if (i === nodesInShortestPathOrder.length - 1) {
                    setIsVisualizing(false);
                    setActionMessage(`${selectedAlgo.toUpperCase()} Search Complete!`);
                }
            }, 50 * i);
        }
    };
    const handleVisualize = () => {
        if (isVisualizing) return;
        clearPath();
        setIsVisualizing(true);
        setActionMessage(`Deploying ${selectedAlgo.toUpperCase()} Algorithm...`);
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[END_NODE_ROW][END_NODE_COL];
        const { visitedNodesInOrder, nodesInShortestPathOrder } = runPathfinder(grid, startNode, endNode, selectedAlgo);
        animatePathfinder(visitedNodesInOrder, nodesInShortestPathOrder);
        setTimeout(() => setIsVisualizing(false), 1000);
    };
    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-gray-200 font-sans p-4" onMouseLeave={() => setMouseIsPressed(false)}>
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
                    <div className='flex flex-col md:flex-row justify-between items-center bg-gray-800/60 border border-gray-700 p-4 rounded-xl mb-4 gap-4 shadow-lg'>
                        <div className='flex items-center gap-4'>
                            <select
                                value={selectedAlgo} onChange={(e) => setSelectedAlgo(e.target.value)} disabled={isVisualizing}
                                className="bg-gray-900 border border-gray-600 text-cyan-300 px-4 py-2 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                            >
                                <option value="bfs">Breadth-First Search (Shortest)</option>
                                <option value="dfs">Depth-First Search (Blind)</option>
                                <option value="dijkstra">Dijkstra's Algorithm</option>
                            </select>
                            <button onClick={resetGrid} disabled={isVisualizing} className='px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 rounded-lg text-sm font-bold transition-colors disabled:opacity-50'>
                                Reset Full Grid
                            </button>
                            <button onClick={clearPath} disabled={isVisualizing} className='px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-bold transition-colors disabled:opacity-50'>
                                Clear Path Only
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={handleVisualize} disabled={isVisualizing} className={`px-8 py-2 rounded-lg font-bold transition-all ${isVisualizing ? 'bg-gray-800 border border-gray-700 text-gray-600 cursor-not-allowed' : 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]'}`}>
                                ▶ INITIATE SEARCH
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col xl:flex-row flex-1 gap-4 overflow-hidden">
                        <div className="w-full xl:w-3/4 bg-gray-800/40 border border-gray-700 rounded-xl p-6 flex flex-col relative">
                            <div className="flex justify-between items-end mb-6 shrink-0">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div><span className="text-sm font-mono">Start</span></div>
                                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500 rounded shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div><span className="text-sm font-mono">Target</span></div>
                                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-600 border border-gray-500 rounded"></div><span className="text-sm font-mono">Wall</span></div>
                                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-cyan-500/50 rounded shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div><span className="text-sm font-mono">Explored</span></div>
                                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-400 rounded shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div><span className="text-sm font-mono">Path</span></div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg flex flex-col items-center shadow-inner min-w-[120px]">
                                        <span className="text-[10px] text-gray-500 font-bold tracking-widest">NODES EXPLORED</span>
                                        <span className="text-xl font-mono font-bold text-cyan-400">{stats.explored}</span>
                                    </div>
                                    <div className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg flex flex-col items-center shadow-inner min-w-[120px]">
                                        <span className="text-[10px] text-gray-500 font-bold tracking-widest">PATH LENGTH</span>
                                        <span className="text-xl font-mono font-bold text-yellow-400">{stats.pathLength}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center items-center overflow-auto bg-[#050508] border border-gray-700 rounded-xl p-4 shadow-inner" onMouseUp={handleMouseUp}>
                                <div
                                    className="grid gap-[1px] bg-gray-800 border border-gray-800"
                                    style={{ gridTemplateColumns: `repeat(${NUM_COLS}, minmax(0, 1fr))` }}
                                >
                                    {grid.map((row, rowIdx) => (
                                        row.map((node, colIdx) => {
                                            const { row, col, isStart, isEnd, isWall, isVisited, isPath } = node;
                                            let extraClasses = 'bg-gray-900 hover:bg-gray-700 cursor-crosshair';
                                            if (isStart) extraClasses = 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] z-10 scale-110 rounded-sm cursor-default';
                                            else if (isEnd) extraClasses = 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] z-10 scale-110 rounded-sm cursor-default';
                                            else if (isWall) extraClasses = 'bg-gray-600 border-gray-500 shadow-inner scale-95 rounded-sm animate-pop';
                                            else if (isPath) extraClasses = 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)] scale-105 z-20 transition-all duration-300';
                                            else if (isVisited) extraClasses = 'bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-colors duration-500 ease-out animate-pulse-fast';
                                            return (
                                                <div
                                                    key={`${row}-${col}`}
                                                    id={`node-${row}-${col}`}
                                                    className={`w-5 h-5 transition-transform ${extraClasses}`}
                                                    onMouseDown={() => handleMouseDown(row, col)}
                                                    onMouseEnter={() => handleMouseEnter(row, col)}
                                                    onMouseUp={() => handleMouseUp()}
                                                ></div>
                                            );
                                        })
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 h-12 w-full bg-gray-900/80 border border-gray-700 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                                <p className="font-mono text-sm tracking-widest text-gray-200">
                                    {actionMessage}
                                </p>
                            </div>
                        </div>
                        <div className="w-full xl:w-1/4 bg-gray-800/40 border border-gray-700 rounded-xl p-4 flex flex-col gap-4">
                            <h3 className="text-indigo-400 font-bold">Algorithm Behavior</h3>
                            <div className="flex-1 bg-[#0d1117] rounded border border-gray-700 overflow-y-auto font-mono text-[13px] leading-loose p-4 text-gray-500 shadow-inner">
                                {selectedAlgo === 'bfs' && (
                                    <>
                                        <span className="text-cyan-400 font-bold block mb-2">Breadth-First Search (Queue)</span>
                                        Explores the grid outward in uniform ripples. <br/><br/>
                                        <span className="text-green-400 font-bold">Guarantee:</span> Always finds the shortest possible path in an unweighted grid. <br/><br/>
                                        <span className="text-yellow-400 font-bold">Efficiency:</span> Can be slow as it blindly searches all directions equally, exploring many unnecessary nodes.
                                    </>
                                )}
                                {selectedAlgo === 'dfs' && (
                                    <>
                                        <span className="text-purple-400 font-bold block mb-2">Depth-First Search (Stack)</span>
                                        Aggressively dives down a single path until it hits a wall, then backtracks. <br/><br/>
                                        <span className="text-red-400 font-bold">Guarantee:</span> DOES NOT guarantee the shortest path. It just finds *a* path. <br/><br/>
                                        <span className="text-yellow-400 font-bold">Efficiency:</span> Terrible for routing. Visualized here to demonstrate how recursive backtracking navigates mazes.
                                    </>
                                )}
                                {selectedAlgo === 'dijkstra' && (
                                    <>
                                        <span className="text-pink-400 font-bold block mb-2">Dijkstra's Algorithm (Min-Heap)</span>
                                        The foundation of modern GPS. Prioritizes exploring nodes that are mathematically closest to the start. <br/><br/>
                                        <span className="text-green-400 font-bold">Guarantee:</span> Always finds the shortest path. <br/><br/>
                                        <span className="text-gray-400 font-bold italic">*In an unweighted grid without traffic costs, this behaves identically to BFS.*</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <TutorialTab data={pathfinderData[selectedAlgo]} />
            )}
        </div>
    );
};
export default Pathfinder;