# AlgoViz ⚡

> **An Interactive Algorithm Visualization Engine** — bridging the gap between DSA theory and real systems intuition through real-time animations and live code tracing.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📌 Overview

AlgoViz is a full-stack, state-driven visualization platform with two core modules:

- **Pattern Visualizer** — Advanced problem-solving patterns used in technical interviews (Sliding Window, Prefix Sum, Two Pointers, Binary Search, Fast & Slow Pointers)
- **Algorithm Visualizer** — Foundational DSA operations with animated sorting, tree traversals, and N-Queens backtracking

Every visualizer features a **synchronized live code tracer** that highlights executing lines in real time, mapping exactly to what's happening on the visual canvas — making the connection between code and behavior instantly clear.

---

## 🎬 Demo

> Watch the full walkthrough below:

https://private-user-images.githubusercontent.com/171309175/598276730-08715ad8-f04c-4ced-9b08-9fb495b934f9.mp4

---

## 🧩 Pattern Visualizer

Transforms brute-force `O(N²)` patterns into optimal `O(N)` and `O(1)` solutions through interactive, step-by-step animations.

| Pattern | Complexity | Highlights |
|---|---|---|
| **Dynamic Sliding Window** | `O(N)` Time | Stretch/snap caterpillar method with live min-length tracking |
| **Prefix Sum** | `O(N)` Build · `O(1)` Query | Dual-track animation with animated prefix "drop" effect |
| **Fast & Slow Pointers** | `O(N)` Time · `O(1)` Space | Independent async animations proving Floyd's Cycle Detection |
| **Two Pointers** | `O(N)` Time | Bidirectional convergence mapped to a single array track |
| **Binary Search Variants** | `O(log N)` Time | First/last occurrence + rotated arrays with live midpoint tracking |

---

## 🧠 Algorithm Visualizer

Core CS operations visualized with real array mutations, recursive call stacks, and auxiliary data structures.

| Algorithm / Structure | Complexity | Highlights |
|---|---|---|
| **Sorting** (Bubble, Insertion, Merge, Quick) | `O(N²)` / `O(N log N)` | Real-time DOM coordinate swaps and recursive partition animations |
| **Tree Traversals** (BFS + DFS) | `O(N)` | 2D node-edge canvas with live Queue/Stack state alongside tree |
| **N-Queens Backtracking** | `O(N!)` | Interactive chessboard with visual branch pruning and conflict isolation |

---

## ⚙️ How the Visualization Engine Works

AlgoViz uses a two-phase execution model:

1. **Scriptwriter Phase** — Before rendering, the algorithm runs fully and generates an immutable array of discrete "snapshot" states (frame-by-frame diffs of the data structure).
2. **Playback Phase** — A custom React hook (`useRef` + Promises) acts as an async metronome, advancing through snapshots at user-controlled speed without blocking the main thread.

This guarantees smooth, crash-free animations even for `O(N!)` algorithms like N-Queens.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, JavaScript (ES6+) |
| Backend | Node.js, Express.js |
| Tooling | ESLint, PostCSS |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/Siva2583/Algoviz.git
cd Algoviz

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
Algoviz/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Visualizer page modules
│   │   ├── PatternVisualizer/
│   │   └── AlgorithmVisualizer/
│   └── main.jsx          # App entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 👨‍💻 Author

**Siva Charan K.G.**  
B.Tech CSE · GPCET, Kurnool · CGPA 8.55

[![GitHub](https://img.shields.io/badge/GitHub-Siva2583-181717?style=flat-square&logo=github)](https://github.com/Siva2583)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-siva--charan--kg-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/siva-charan-kg-72a900284)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
