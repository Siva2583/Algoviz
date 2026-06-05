export function runPathfinder(grid, startNode, endNode, algorithm) {
    const visitedNodesInOrder = [];
    let nodesInShortestPathOrder = [];

    if (algorithm === 'bfs') {
        const queue = [startNode];
        startNode.isVisited = true;

        while (queue.length) {
            const currentNode = queue.shift();
            
            // Skip walls
            if (currentNode.isWall) continue;
            
            visitedNodesInOrder.push(currentNode);

            if (currentNode === endNode) {
                nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
                break;
            }

            const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
            for (const neighbor of unvisitedNeighbors) {
                neighbor.isVisited = true;
                neighbor.previousNode = currentNode;
                queue.push(neighbor);
            }
        }
    } 
    
    else if (algorithm === 'dfs') {
        const stack = [startNode];
        
        while (stack.length) {
            const currentNode = stack.pop();

            if (currentNode.isWall || currentNode.isVisited) continue;
            
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);

            if (currentNode === endNode) {
                nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
                break;
            }

            const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
            // Reversing helps it prioritize typical Top-Right-Bottom-Left visual exploration
            for (const neighbor of unvisitedNeighbors.reverse()) {
                if (!neighbor.isVisited) {
                    neighbor.previousNode = currentNode;
                    stack.push(neighbor);
                }
            }
        }
    }

    // Note: Dijkstra is essentially BFS in an unweighted grid, so we map it to BFS logic for now. 
    // You can upgrade this later when you add "Weights/Traffic" to the UI!
    else if (algorithm === 'dijkstra') {
         return runPathfinder(grid, startNode, endNode, 'bfs');
    }

    return { visitedNodesInOrder, nodesInShortestPathOrder };
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    
    // Bounds checking (Up, Right, Down, Left)
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    
    // Backtrack using the pointers we left behind during exploration
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode); // Push to front to reverse it
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}