import React from 'react';
import { useMode } from '../context/ModeContext';

const ModeToggle = () => {
  const { activeMode, setActiveMode } = useMode();

  return (
    <div className={`dll-toggle ${activeMode === 'algo' ? 'algo-mode' : 'pattern-mode'}`}>
      
      {/* Node 1: Algo (Cyan) */}
      <div 
        className={`dll-node ${activeMode === 'algo' ? 'active-algo' : ''}`}
        onClick={() => setActiveMode('algo')}
      >
        <span>Algo Visualizer</span>
      </div>

      {/* The Connector: Two Stacked Arrows */}
      <div className="dll-arrows">
         {/* Top Arrow: Points Left (For Algo) */}
         <div className="arrow-line arrow-top">&larr;</div>
         
         {/* Bottom Arrow: Points Right (For Pattern) */}
         <div className="arrow-line arrow-bottom">&rarr;</div>
      </div>

      {/* Node 2: Pattern (Amber) */}
      <div 
        className={`dll-node ${activeMode === 'pattern' ? 'active-pattern' : ''}`}
        onClick={() => setActiveMode('pattern')}
      >
        <span>Pattern Visualizer</span>
      </div>

    </div>
  );
};

export default ModeToggle;