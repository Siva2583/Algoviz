import React from 'react';
import { useNavigate } from 'react-router-dom'; // <--- FIX 1: Import this hook
import { useMode } from '../context/ModeContext';
import { CORE_MODULES, PATTERN_MODULES } from '../constants';
import Algocards from './Algocards'; 
import '../styles/global.css';

const CardsGrid = () => {
  const { activeMode } = useMode();
  const navigate = useNavigate(); // <--- FIX 2: Initialize the hook
  
  const currentModules = activeMode === 'algo' ? CORE_MODULES : PATTERN_MODULES;

  return (
    <div className="grid-container">
      <div className={`cards-wrapper ${activeMode === 'algo' ? 'grid-algo' : 'grid-pattern'}`}>
        {currentModules.map((module) => (
          // FIX 3: Add the onClick event here!
          <div 
            key={module.id}
            onClick={() => navigate(module.path)} 
            style={{ cursor: 'pointer' }} // Makes it look clickable
          >
            <Algocards 
              title={module.title}
              desc={module.desc} 
              path={module.path}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;