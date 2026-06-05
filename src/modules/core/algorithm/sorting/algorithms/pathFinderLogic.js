export function runPathfinder(grid, startNode, endNode, algorithm) {
    const visitedNodesInOrder = [];
    let nodesInShortestPathOrder = [];

    if (algorithm === 'bfs') {
        const queue = [startNode];
        startNode.isVisited = true;

        while (queue.length) {
            const currentNode = queue.shift();
            
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
    else if (algorithm === 'dijkstra') {
         return runPathfinder(grid, startNode, endNode, 'bfs');
    }

    return { visitedNodesInOrder, nodesInShortestPathOrder };
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode); 
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}