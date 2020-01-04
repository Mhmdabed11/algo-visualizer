var cloneDeep = require("lodash.clonedeep");

export const BFS = (graph, start, end) => {
  // clone graph using lodash clondeDeep
  const newGraph = cloneDeep(graph);
  let queue = [];
  let animatedNodes = [];
  newGraph[start.row][start.col].visited = true;
  queue.push(newGraph[start.row][start.col]);
  while (queue.length !== 0) {
    let queueHead = queue.shift();
    if (queueHead.obstacle) continue;
    animatedNodes.push(queueHead);
    if (queueHead.row === end.row && queueHead.col === end.col) {
      return { animatedNodes, newGraph };
    }
    let unvisitedNeighbors = getUnvisitedNeighbors(queueHead, newGraph);
    unvisitedNeighbors.forEach(neighbor => {
      if (!neighbor.visited) {
        neighbor.visited = true;
        neighbor.parent = queueHead;
        queue.push(neighbor);
      }
    });
  }
  return { animatedNodes, newGraph };
};

const getUnvisitedNeighbors = (node, graph) => {
  //get unvisited neighbors wither up - left- right - top

  let neighbors = [];
  const { row, col } = node;
  if (row < graph.length - 1) neighbors.push(graph[row + 1][col]);
  if (row > 0) neighbors.push(graph[row - 1][col]);
  if (col < graph[0].length - 1) neighbors.push(graph[row][col + 1]);
  if (col > 0) neighbors.push(graph[row][col - 1]);
  neighbors = neighbors.filter(neighbor => !neighbor.visited);

  return neighbors;
};

export const getShortestPath = end => {
  //get shortest path by backtracking from end node

  let currentNode = end;
  let shortestPath = [];
  while (currentNode) {
    shortestPath.push(currentNode);
    currentNode = currentNode.parent;
  }
  return shortestPath;
};
