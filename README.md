<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=30&pause=1000&color=00B4D8&center=true&vCenter=true&width=600&lines=AlgoViz+%E2%9A%A1;Algorithm+Visualization+Engine;See+the+Code+Think." alt="AlgoViz Typing SVG" />

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Vercel-00b4d8?style=for-the-badge&logo=vercel&logoColor=white)](https://algoviz-git-main-siva2583s-projects.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

<br/>

> **AlgoViz** is a state-driven algorithm visualization engine that transforms abstract DSA concepts into deterministic, frame-by-frame animations — with synchronized live-code tracing, pause/resume control, and interactive playgrounds.

<br/>

</div>

---

## 📌 Table of Contents

- [Why AlgoViz?](#-why-algoviz)
- [Live Demo](#-live-demo)
- [Feature Overview](#-feature-overview)
- [Module 1 — Algorithm Visualizer](#-module-1--algorithm-visualizer-foundational-dsa)
- [Module 2 — Pattern Master](#-module-2--pattern-master-interview-patterns)
- [Architecture Deep Dive](#-architecture-deep-dive)
- [Tech Stack](#-tech-stack)
- [Local Setup](#-local-setup)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 💡 Why AlgoViz?

Most algorithm visualizers show you bars moving. AlgoViz shows you **why** they move.

Every module is built around three pillars:

| Pillar | What it means |
|--------|---------------|
| 🎬 **Frame-Perfect Animation** | Algorithms are pre-computed into immutable state snapshots — no race conditions, no jank |
| 🖥️ **Synchronized Code Tracer** | Executing pseudocode lines highlight in real-time, perfectly synced to the visual canvas |
| ⏯️ **Full Playback Control** | Pause, Resume, and live Speed Scaling without losing execution state |

---

## 🚀 Live Demo

**[➡️ algoviz-git-main-siva2583s-projects.vercel.app](https://algoviz-git-main-siva2583s-projects.vercel.app/)**

> Deployed on Vercel. Zero backend dependency — pure React SPA with client-side execution.

---

## ✨ Feature Overview

```
AlgoViz
├── 🧠 Algorithm Visualizer (Foundational DSA)
│   ├── Pathfinder          →  BFS · DFS · Dijkstra on interactive grid
│   ├── Simple Sorts        →  Bubble · Selection · Insertion
│   ├── Efficient Sorts     →  Merge · Quick · Heap
│   ├── Binary Search       →  Iterative with L/M/R pointer tracking
│   ├── Tree Traversals     →  In-Order · Pre-Order · Post-Order (BFS/DFS)
│   └── N-Queens            →  Backtracking on interactive chessboard
│
└── 🎯 Pattern Master (Interview Patterns)
    ├── Sliding Window       →  Dynamic caterpillar, min-length tracking
    ├── Prefix Sum           →  O(1) range queries, animated drop effect
    ├── Fast & Slow Pointers →  Floyd's cycle detection, async pointer anim
    ├── Two Pointers         →  Bidirectional convergence on string/array
    ├── Binary Search Variants → First/Last occurrence, rotated array
    └── Merge Intervals      →  Sweep-line overlap visualization
```

---

## 🧠 Module 1 — Algorithm Visualizer (Foundational DSA)

### 🗺️ Pathfinder
> **BFS · DFS · Dijkstra** on a 15×35 interactive grid

- Draw walls by clicking and dragging on the grid
- Watch the algorithm flood-fill the search space in real-time
- Shortest path is traced back in gold after traversal completes
- Live stats: nodes explored + path length

```
Grid: 15 rows × 35 cols | Start: (7,5) → End: (7,29)
Algorithms: BFS (shortest path) · DFS (deep dive) · Dijkstra (weighted)
```

---

### 📊 Sorting Architectures

**Simple Sorts** — Bubble · Selection · Insertion
- Real-time DOM bar swapping with color-coded active, sorted, and minimum indices
- Live counters: **Passes / Comparisons / Swaps** update on every frame
- Synchronized pseudocode tracer highlights `outer`, `inner`, `compare`, `swap` lines

**Efficient Sorts** — Quick · Merge · Heap
- Pivot index tracking for QuickSort with sub-array range highlighting
- Recursive partition visualization for MergeSort
- Heap build phase + extract phase with tree-level annotations

---

### 🔍 Binary Search
- L · M · R pointer tracking on a sorted array
- Step messages explain each bounds collapse (`target < mid → search left`)
- Custom input + random sorted array generator

---

### 🌲 Tree Traversals
> In-Order · Pre-Order · Post-Order · Level-Order (BFS)

- 2D node-edge BST canvas built from user input
- Live auxiliary data structure shown (queue for BFS, stack for DFS)
- Output array builds element-by-element in sync with traversal
- Stats: nodes processed · current stack depth · max depth reached

---

### ♟️ N-Queens Backtracking
- Interactive chessboard (4×4 to 8×8, user-configurable)
- Step-by-step recursive placement with spatial conflict highlighting
- Branch pruning shown visually — backtrack paths marked in red
- Execution log panel tracks every place/remove decision

---

## 🎯 Module 2 — Pattern Master (Interview Patterns)

> The Pattern Master mode flips the interface — same engine, different lens. Focused on optimizing **O(N²) brute-force problems** down to **O(N) or O(1)**.

---

### 🪟 Sliding Window
**Problem:** Minimum-length subarray with sum ≥ target

```
Optimization: O(N²) Brute Force  →  O(N) Dynamic Window
```
- Right pointer expands until target is met
- Left pointer snaps forward to minimize window length
- Real-time minimum-length scoreboard updates on every valid window found

---

### ➕ Prefix Sum
**Problem:** Range sum queries in O(1)

```
Build: O(N)  |  Query: O(1)
```
- Dual-track visualization: original array + prefix array built in sync
- Animated "drop" effect eliminates unwanted prefixes during query phase
- Proves `sum(L,R) = prefix[R] - prefix[L-1]` visually

---

### 🐢🐇 Fast & Slow Pointers (Floyd's Algorithm)
**Problem:** Cycle detection in O(N) time, O(1) space

```
Optimization: O(N) Time  |  O(1) Space
```
- Independent async animations for slow (1x) and fast (2x) pointer steps
- Exact intersection node highlighted — mathematically proves the cycle exists
- Works on both circular arrays and zero-movement arrays

---

### ↔️ Two Pointers
**Problem:** Palindrome / convergence checks in O(N)

```
Optimization: O(N²) naive  →  O(N) bidirectional
```
- L and R pointers converge on a string array
- Visual shift triggered by conditional logic at each step
- Supports uppercase string input (A–Z)

---

### 🔎 Binary Search Variants
**Problems:** First occurrence · Last occurrence · Rotated array search

```
Optimization: O(log N) — logarithmic boundary manipulation
```
- Dynamic midpoint recalculation with leftLock / rightLock anchor tracking
- Search space truncation shown as array segments graying out
- Three distinct variant modes selectable at runtime

---

### 📐 Merge Intervals
**Problem:** Collapse overlapping intervals into merged output

- Sweep-line visualization with animated stretching for merges
- Fading animation when an interval is absorbed into a larger one
- Input as JSON array: `[[1,3],[2,6],[8,10],[15,18]]`

---

## ⚙️ Architecture Deep Dive

### The Scriptwriter Pattern

Every algorithm in AlgoViz follows a **two-phase execution model**:

```
Phase 1 — Scriptwriter (off-screen)
  Algorithm runs to completion
  Produces an array of immutable "frame" objects
  Each frame captures: array state · active indices · code line · message · stats

Phase 2 — Animator (on-screen)
  React component plays frames sequentially
  useRef-based metronome controls delay between frames
  isPausedRef allows zero-lag pause without canceling the async loop
```

This separation means:
- **No race conditions** — the algorithm never "thinks" during animation
- **Perfect sync** — code tracer and canvas are driven by the same frame object
- **Scrub-safe** — pause/resume works at any point without state corruption

### The Async Metronome

```js
const smartWait = async (ms) => {
  let timePassed = 0;
  const step = 20;
  while (timePassed < ms) {
    while (isPausedRef.current) {
      await new Promise(resolve => setTimeout(resolve, 50)); // spin-wait
    }
    await new Promise(resolve => setTimeout(resolve, step));
    timePassed += step;
  }
};
```

- Splits every delay into 20ms micro-steps
- Checks `isPausedRef` on each micro-step — pause latency < 20ms
- `useRef` (not `useState`) avoids stale closure issues inside async loops

### Dual-Mode Context

```js
// ModeContext.jsx — drives the entire landing page switch
const [activeMode, setActiveMode] = useState('algo'); // 'algo' | 'pattern'
```

- A single React context switches between **Algorithm Visualizer** and **Pattern Master** modes
- Cards grid, hero text, and routing all derive from `activeMode`
- Zero re-renders on route changes — router lives inside the provider

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 with Hooks |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v3 + custom CSS |
| Icons | Lucide React |
| Build Tool | Vite (Rolldown engine) |
| Deployment | Vercel |
| Language | JavaScript ES6+ (95.2%) |

> No Redux. No external animation libraries. All state management is vanilla React with `useRef` + `useState`.

---

## 🚀 Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Siva2583/Algoviz.git
cd Algoviz

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

**Build for production:**
```bash
npm run build
npm run preview
```

> Requires **Node.js 18+**. No environment variables needed.

---

## 📁 Project Structure

```
Algoviz/
├── public/                         # Static assets
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Navbar with mode toggle
│   │   ├── CardsGrid.jsx           # Landing page card grid
│   │   ├── Algocards.jsx           # Individual module card
│   │   ├── ModeToggle.jsx          # Algo ↔ Pattern mode switch
│   │   └── NQueensplay.jsx         # Interactive chessboard component
│   ├── context/
│   │   └── ModeContext.jsx         # Global mode state (algo/pattern)
│   ├── modules/
│   │   ├── core/                   # Algorithm Visualizer modules
│   │   │   ├── SimpleSort.jsx      # Bubble, Selection, Insertion
│   │   │   ├── EfficientSort.jsx   # Merge, Quick, Heap
│   │   │   ├── BinarySearch.jsx    # Iterative binary search
│   │   │   ├── TreeTraversal.jsx   # BFS/DFS tree traversals
│   │   │   ├── Nqueens.jsx         # N-Queens backtracking
│   │   │   ├── PathFinder.jsx      # BFS/DFS/Dijkstra grid
│   │   │   ├── algorithm/
│   │   │   │   └── sorting/
│   │   │   │       └── algorithms/ # Pure logic — generates frame arrays
│   │   │   │           ├── bubbleSort.js
│   │   │   │           ├── selectionSort.js
│   │   │   │           ├── insertionSort.js
│   │   │   │           ├── mergeSort.js
│   │   │   │           ├── quickSort.js
│   │   │   │           ├── heapSort.js
│   │   │   │           ├── binarySearchLogic.js
│   │   │   │           ├── treeTraversalsLogic.js
│   │   │   │           ├── nQueens.js
│   │   │   │           └── pathFinderLogic.js
│   │   │   └── tutorials/          # Tutorial content data per module
│   │   └── patterns/               # Pattern Master modules
│   │       ├── SlidingWindow.jsx
│   │       ├── PrefixSum.jsx
│   │       ├── FastSlowPointers.jsx
│   │       ├── TwoPointers.jsx
│   │       ├── BinaryVariants.jsx
│   │       └── MergeIntervals.jsx
│   ├── pages/
│   │   └── Home.jsx                # Root router + layout
│   ├── styles/
│   │   └── global.css
│   ├── constants.js                # Module metadata (title, path, desc)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🗺️ Roadmap

- [ ] **Graph Algorithms** — Kruskal's MST, Topological Sort
- [ ] **Dynamic Programming** — Knapsack, LCS step-by-step
- [ ] **Speed Scrubber** — drag timeline to any frame
- [ ] **Share Snapshot** — shareable URL encoding the current frame state
- [ ] **Dark / Light theme** toggle persistence

---

## 👨‍💻 Author

<div align="center">

**Siva Charan K.G.**

*B.Tech Computer Science · GPCET Kurnool · Graduating 2027*

[![GitHub](https://img.shields.io/badge/GitHub-Siva2583-181717?style=for-the-badge&logo=github)](https://github.com/Siva2583)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-siva--charan--kg-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/siva-charan-kg-72a900284)

</div>

---

<div align="center">

*If this project helped you understand algorithms better, consider giving it a ⭐*

**[🚀 Try AlgoViz Live](https://algoviz-git-main-siva2583s-projects.vercel.app/)**

</div>
