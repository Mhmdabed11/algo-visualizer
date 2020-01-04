import React from "react";
import "./Node.css";

const Node = React.forwardRef(({ type, children, obstacle }, ref) => {
  // check type of node and check if it is an obstacle
  let typeClassName = "";
  let obstacleClassName = "";
  if (type === "start" || type === "finish") {
    typeClassName = `is-${type}`;
  }
  if (obstacle) {
    obstacleClassName = "is-obstacle";
  }
  return (
    <div
      ref={ref}
      className={`grid-item ${typeClassName} ${obstacleClassName} `}
    >
      {children}
    </div>
  );
});

export default Node;
