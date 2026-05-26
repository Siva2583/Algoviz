<div align="center">
  <h1 align="center">AlgoViz ⚡</h1>
  <p align="center"><b>An Advanced Interactive Algorithm Visualization Engine</b></p>
</div>

<p align="center">
  AlgoViz is a decoupled, state-driven visualization platform designed to bridge the gap between theoretical Data Structures & Algorithms and practical systems engineering. It transforms complex time complexities into deterministic, real-time animations alongside live execution tracing.
</p>

---

## 🚀 Core Architecture & Features

* **Decoupled Execution Engine:** Translates complex algorithmic loops into frame-by-frame asynchronous DOM updates without blocking the React main thread.
* **Synchronized Live-Code Tracer:** Dynamically highlights executing lines of FAANG-level JavaScript in real-time, perfectly mapping to visual canvas mutations.
* **Asynchronous Playback Telemetry:** Full user control over the execution loop with robust state management (Pause, Resume, Live Speed Scaling).
* **Interactive Memory States:** Dynamic pointer shifting, array mutations, and boundary tracking that physically resolve mathematically optimal solutions.
* **Scalable Modular Design:** Engineered with reusable React components to easily integrate future visualizers and multi-dimensional data structures.

## 🧠 Implemented Modules

### Dynamic Sliding Window (The Caterpillar Method)
* **Optimization:** **O(N)** Time Complexity
* Visualizes variable-size subarray optimization by stretching the right boundary to satisfy targets and snapping the left pointer forward to optimize window length. Features an interactive, real-time minimum-length tracking scoreboard.

### Prefix Sum (Range Sum Queries)
* **Optimization:** **O(N)** Build | **O(1)** Query
* Demonstrates constant-time range sum queries using a synchronized dual-track visualization. Employs an animated "drop" effect to eliminate unwanted sub-array prefixes and visually prove the mathematical query computation.

### Binary Search Variants
* **Optimization:** **O(log N)** Time Complexity
* An interactive divide-and-conquer visualizer featuring dynamic midpoint tracking and instant search-space truncation. Visually proves logarithmic reduction via active bounds highlighting.

### N-Queens Backtracking
* **Optimization:** **O(N!)** Time Complexity
* A step-by-step recursive backtracking simulation mapped to an interactive chessboard. Visually isolates spatial conflicts and highlights branch pruning within the recursion tree.

## ⚡ The Visualization Engine (Under the Hood)

* **Scriptwriter State Generation:** The backend logic pre-calculates the optimal path and generates an array of discrete, immutable "flashcard" states to ensure smooth animation rendering.
* **Asynchronous Metronome:** Utilizes custom React hooks (`useRef`, Promises) to safely orchestrate the time-delay between frames, preventing infinite loop browser crashes.

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, JavaScript (ES6+)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB

## 🎯 Project Goal

AlgoViz aims to eliminate the need for "mental code tracing" by transforming raw algorithm execution into visually interactive experiences. It is engineered for students, developers, and technical interview candidates who want to see *how* optimal code manipulates memory in real-time.

## 📌 Future Enhancements

* Graph Algorithms Visualizer (BFS, DFS, Dijkstra's)
* Tree Traversal Simulator
* Dynamic Programming Matrix Visualizations

---

## 👨‍💻 Developer

**Siva Charan K.G.** *Aspiring Software Developer | Full-Stack Architecture & Machine Learning*
* **GitHub:** [https://github.com/Siva2583](https://github.com/Siva2583)
* **LinkedIn:** [https://linkedin.com/in/siva-charan-kg-72a900284](https://linkedin.com/in/siva-charan-kg-72a900284)
