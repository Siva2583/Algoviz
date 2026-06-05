import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import CardsGrid from '../components/CardsGrid';
import { ModeProvider, useMode } from '../context/ModeContext'; 
import SimpleSort from '../modules/core/SimpleSort';
import BinarySearch from '../modules/core/BinarySearch'; 
import NQueens from '../modules/core/Nqueens';
import TwoPointers from '../modules/patterns/TwoPointers';
import FastSlowPointers from '../modules/patterns/FastSlowPointers';
import BinaryVariants from '../modules/patterns/BinaryVariants';
import PrefixSum from '../modules/patterns/PrefixSum';
import SlidingWindow from '../modules/patterns/SlidingWindow';
import MergeIntervals from '../modules/patterns/MergeIntervals';
import EfficientSort from '../modules/core/EfficientSort';
import TreeTraversal from '../modules/core/TreeTraversal';
import Pathfinder from '../modules/core/PathFinder';

const HeroText = () => {
  const { activeMode } = useMode();
  return (
    <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '-20px' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        color: activeMode==='algo'?'#FFFFFF':'#1A1A1A',
        textShadow: activeMode==='algo'?'2px 2px 8px black':'0 0 8px #0008',
        border:'2px solid black',
        background: activeMode === 'algo'
  ? 'linear-gradient(90deg, #001524 0%, #003566 50%, #00b4d8 100%)'
         : 'linear-gradient(to right, #fff, #ffbf00)',
        fontWeight: '800',
        marginBottom: '10px'
      }}>
        {activeMode === 'algo' ? 'Algorithm Visualizer' : 'Pattern Master'}
      </h1>
      <p style={{ color: '#888', fontSize: '1.1rem', marginTop: '0' }}>
        {activeMode === 'algo' 
          ? 'Explore the mechanics of sorting, searching, and graphs.' 
          : 'Decode the most common patterns in technical interviews.'}
      </p>
    </div>
  );
};

const LandingPage = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <HeroText />
        <CardsGrid />
      </main>
    </>
  );
};
const Home = () => {
  return (
    <ModeProvider>
      <div className="home-layout">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/modules/core/simple-sort" element={<SimpleSort />} />
            <Route path="/modules/core/binary-search" element={<BinarySearch />} />
            <Route path="/modules/core/n-queens" element={<NQueens />}/>
            <Route path="/modules/core/advanced-sort" element={<EfficientSort />} />
            <Route path="/modules/patterns/two-pointers" element={<TwoPointers/>}></Route>
            <Route path="/modules/patterns/fast-slow"element={<FastSlowPointers/>}></Route>
            <Route path="/modules/patterns/bs-variants" element={<BinaryVariants/>}></Route>
            <Route path="/modules/patterns/prefix-sum" element={<PrefixSum />}></Route>
            <Route path="/modules/patterns/sliding-window" element={<SlidingWindow/>}></Route>
            <Route path="/modules/patterns/merge-intervals" element={<MergeIntervals />}></Route>
            <Route path="/modules/core/tree-traversal" element={<TreeTraversal />}></Route>
            <Route path="/modules/core/pathfinding" element={<Pathfinder />}></Route>
          </Routes>
        </Router>
      </div>
    </ModeProvider>
  );
};

export default Home;