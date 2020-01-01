import React from "react";
import "./ShortestPath.css";
import Node from "./Node";
import { BFS, getShortestPath } from "../algorithms/BFS";
var cloneDeep = require("lodash.clonedeep");

class GraphNode {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.distance = Infinity;
    this.obstacle = false;
  }
}

const NUM_COLUMNS = 100;
const NUM_ROWS = 35;

const Graph = [];
for (let i = 0; i < NUM_ROWS; i++) {
  let temp = [];
  for (let j = 0; j < NUM_COLUMNS; j++) {
    temp.push(new GraphNode(i, j));
  }
  Graph.push(temp);
}

export default function PathFindingVisualizer() {
  const START_ROW = 0;
  const START_COL = 0;
  const END_ROW = 34;
  const END_COL = 99;

  const [graph, setGraph] = React.useState(Graph);
  const [startNode, setStartNode] = React.useState({
    row: START_ROW,
    col: START_COL
  });
  const [endNode, setEndNode] = React.useState({ row: END_ROW, col: END_COL });
  const [processing, setProcessing] = React.useState(false);
  const grid = React.useRef(
    Graph.map(row => {
      return row.map(col => {
        return React.createRef();
      });
    })
  );

  // add obstacle
  const addObstacle = () => {
    let randomNodes = [];
    const graphClone = cloneDeep(graph);
    for (let i = 0; i < 300; i++) {
      const row = Math.floor(Math.random() * NUM_ROWS) + 0;
      const col = Math.floor(Math.random() * NUM_COLUMNS) + 0;
      graphClone[row][col].obstacle = true;
      randomNodes.push({ row, col });
    }
    randomNodes = randomNodes.filter(
      node =>
        !(
          (node.row === startNode.row && node.col === startNode.col) ||
          (node.row === endNode.row && node.col === endNode.col)
        )
    );
    setGraph(graphClone);
    return randomNodes;
  };

  // reset
  const handleReset = () => {
    if (!processing) {
      setGraph(Graph);
      for (let i = 0; i < Graph.length; i++) {
        for (let j = 0; j < Graph[0].length; j++) {
          if (grid.current[i][j].classList.contains("animate-node"))
            grid.current[i][j].classList.remove("animate-node");
          if (grid.current[i][j].classList.contains("animate-path"))
            grid.current[i][j].classList.remove("animate-path");
        }
      }
    }
  };

  // handle find shortest path
  const handleFindShortestPath = () => {
    if (!processing) {
      setProcessing(true);
      const start = graph[START_ROW][START_COL];
      const end = graph[END_ROW][END_COL];
      setStartNode(start);
      setEndNode(end);
      console.log(BFS(graph, start, end));
      const { animatedNodes, newGraph } = BFS(graph, start, end);
      const nodesInShortestPathOrder = getShortestPath(
        newGraph[END_ROW][END_COL]
      ).reverse();

      setGraph(newGraph);
      for (let i = 0; i < animatedNodes.length; i++) {
        if (
          !(
            animatedNodes[i].row === start.row &&
            animatedNodes[i].col === start.col
          ) &&
          !(
            animatedNodes[i].row === end.row && animatedNodes[i].col === end.col
          )
        ) {
          setTimeout(
            () =>
              grid.current[animatedNodes[i].row][
                animatedNodes[i].col
              ].classList.add("animate-node"),
            15 * i
          );
        }
      }

      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        if (
          !(
            nodesInShortestPathOrder[i].row === start.row &&
            nodesInShortestPathOrder[i].col === start.col
          ) &&
          !(
            nodesInShortestPathOrder[i].row === end.row &&
            nodesInShortestPathOrder[i].col === end.col
          )
        ) {
          setTimeout(
            () =>
              grid.current[nodesInShortestPathOrder[i].row][
                nodesInShortestPathOrder[i].col
              ].classList.add("animate-path"),
            15 * (animatedNodes.length - 1) + 20 * i
          );
        }
      }
      setProcessing(false);
    }
  };

  return (
    <>
      <button onClick={handleFindShortestPath}>Find Shortest Path</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={addObstacle}>Generate Walls</button>
      <div className="grid">
        {graph.map(item => {
          return item.map(subItem => {
            if (
              subItem.row === startNode.row &&
              subItem.col === startNode.col
            ) {
              return (
                <Node
                  ref={el => (grid.current[subItem.row][subItem.col] = el)}
                  key={`${subItem.row}-${subItem.col}`}
                  type="start"
                />
              );
            } else if (
              subItem.row === endNode.row &&
              subItem.col === endNode.col
            ) {
              return (
                <Node
                  ref={el => (grid.current[subItem.row][subItem.col] = el)}
                  key={`${subItem.row}-${subItem.col}`}
                  type="finish"
                />
              );
            }
            return (
              <Node
                ref={el => (grid.current[subItem.row][subItem.col] = el)}
                key={`${subItem.row}-${subItem.col}`}
                visited={subItem.visited}
                path={subItem.path}
                obstacle={subItem.obstacle}
              ></Node>
            );
          });
        })}
      </div>
    </>
  );
}
