import React from "react";
import "./ShortestPath.css";
import Node from "../Node/Node";
import { BFS, getShortestPath } from "../../algorithms/BFS";
var cloneDeep = require("lodash.clonedeep");

class GraphNode {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.obstacle = false;
  }
}

// grid size
const NUM_COLUMNS = 60;
const NUM_ROWS = 35;

// fill up the graph
const Graph = [];
for (let i = 0; i < NUM_ROWS; i++) {
  let temp = [];
  for (let j = 0; j < NUM_COLUMNS; j++) {
    temp.push(new GraphNode(i, j));
  }
  Graph.push(temp);
}

export default function ShortestPath() {
  const START_ROW = 0;
  const START_COL = 0;
  const END_ROW = 34;
  const END_COL = 59;

  const [graph, setGraph] = React.useState(Graph);
  const [startNode, setStartNode] = React.useState(
    new GraphNode(START_ROW, START_COL)
  );
  const [endNode, setEndNode] = React.useState(new GraphNode(END_ROW, END_COL));
  const [processing, setProcessing] = React.useState(false);
  const grid = React.useRef(
    Graph.map(row => {
      return row.map(col => {
        return React.createRef();
      });
    })
  );

  // add obstacle
  const addObstacles = () => {
    if (!processing) {
      const graphClone = cloneDeep(graph);

      for (let i = 0; i < 300; i++) {
        const row = Math.floor(Math.random() * NUM_ROWS) + 0;
        const col = Math.floor(Math.random() * NUM_COLUMNS) + 0;
        graphClone[row][col].obstacle = true;
      }

      // if start or end nodes are assigned as obstacles, then make them not obstacles
      if (graphClone[startNode.row][startNode.col].obstacle) {
        graphClone[startNode.row][startNode.col].obstacle = false;
      }
      if (graphClone[endNode.row][endNode.col].obstacle) {
        graphClone[endNode.row][endNode.col].obstacle = false;
      }
      setGraph(graphClone);
    }
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
      const { animatedNodes, newGraph } = BFS(graph, start, end);
      const nodesInShortestPathOrder = getShortestPath(
        newGraph[END_ROW][END_COL]
      ).reverse();
      setGraph(newGraph);

      // animate BFS except for start node and end node
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
            10 * i
          );
        }
      }

      // animated path except for start node and end ndoe
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
            10 * (animatedNodes.length - 1) + 20 * i
          );
        }
      }

      // SET PROCESSING bollean to false after animation is done
      setTimeout(
        () => setProcessing(false),
        10 * (animatedNodes.length - 1) +
          20 * (nodesInShortestPathOrder.length - 1)
      );
    }
  };

  return (
    <>
      <h1>
        <u>Shortest Path using Breadth First Search Algorithm.</u>
      </h1>
      <div className="button-container">
        <div className="button-wrapper">
          <button
            disabled={processing}
            className="button"
            onClick={handleFindShortestPath}
          >
            Find Shortest Path
          </button>
          <button
            disabled={processing}
            className="button"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            disabled={processing}
            className="button"
            onClick={addObstacles}
          >
            Generate a maze
          </button>
        </div>
      </div>
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
