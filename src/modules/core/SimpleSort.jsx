import React, { useState, useEffect } from 'react';

// FIX 1: Ensure this points to the components folder
// If this still fails, check if the file in components is named exactly "SortingControls.jsx"
import SortingControls from '../../components/SortingControls'; 

// FIX 2: Added the "algorithm" folder to the path to match your screenshot
import { getBubbleSortAnimations } from './algorithm/sorting/algorithms/bubbleSort';
import { getSelectionSortAnimations } from './algorithm/sorting/algorithms/selectionSort';

const PRIMARY_COLOR = '#00eaff'; 
const SECONDARY_COLOR = '#ff0055'; 

const SimpleSort = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [selectedAlgo, setSelectedAlgo] = useState('Bubble');
  const [isSorting, setIsSorting] = useState(false);
  const [animationSpeed,setanimationSpeed] = useState(50);

  // Reset array when size changes
  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    if (isSorting) return;
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(20, 400));
    }
    setArray(newArray);
    
    // Reset colors
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
  };

  const handleVisualize = async () => {
    setIsSorting(true);
    
    // We only have Bubble Sort for now
    if (selectedAlgo === 'Bubble') {
      await runBubbleSort();
    }
    else if(selectedAlgo==='Selection'){
      await runSelectionSort();
    }
    else {
      alert(`${selectedAlgo} Sort is coming soon!`);
    }
    
    setIsSorting(false);
  };

  const runBubbleSort = async () => {
    const animations = getBubbleSortAnimations(array);
    const speed=(101-animationSpeed)*4; 
    return new Promise((resolve) => {
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [barOneIdx, barTwoIdxOrHeight, type] = animations[i];
  
        setTimeout(() => {
          if (type === 'compare' || type === 'revert') {
            const color = type === 'compare' ? SECONDARY_COLOR : PRIMARY_COLOR;
            // Safety check: ensure bar exists before styling
            if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.backgroundColor = color;
            if (arrayBars[barTwoIdxOrHeight]) arrayBars[barTwoIdxOrHeight].style.backgroundColor = color;
          } else if (type === 'swap') {
            if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.height = `${barTwoIdxOrHeight}px`;
          }
          
          if (i === animations.length - 1) resolve();
        }, i * speed);
      }
    });
  };
  const runSelectionSort = async () => {
    const animations = getSelectionSortAnimations(array);
    const speed=(101-animationSpeed)*4; 
    return new Promise((resolve) => {
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [barOneIdx, barTwoIdxOrHeight, type] = animations[i];
  
        setTimeout(() => {
          if (type === 'compare' || type === 'revert') {
            const color = type === 'compare' ? SECONDARY_COLOR : PRIMARY_COLOR;
            // Safety check: ensure bar exists before styling
            if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.backgroundColor = color;
            if (arrayBars[barTwoIdxOrHeight]) arrayBars[barTwoIdxOrHeight].style.backgroundColor = color;
          } else if (type === 'swap') {
            if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.height = `${barTwoIdxOrHeight}px`;
          }
          
          if (i === animations.length - 1) resolve();
        }, i * speed);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 pt-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        Simple Sorts
      </h2>

      {/* Controls Bar */}
      <div className="w-full max-w-4xl">
        <SortingControls
          arraySize={arraySize}
          setArraySize={setArraySize}
          onGenerateArray={resetArray}
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
          onVisualize={handleVisualize}
          isSorting={isSorting}
          
          animationSpeed={animationSpeed}
          setanimationSpeed={setanimationSpeed}
          // Only show Bubble for now to avoid confusion
          algoOptions={['Bubble', 'Insertion', 'Selection']} 
        />
      </div>

      {/* Bars Container */}
      <div className="flex items-end justify-center h-[450px] w-full max-w-4xl border-b-2 border-gray-700 bg-gray-900/30 rounded-lg p-4">
        {array.map((value, idx) => (
          <div
            className="array-bar mx-[1px] sm:mx-[2px] rounded-t-sm transition-all ease-linear"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
              width: `${Math.min(600 / arraySize, 40)}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SimpleSort;