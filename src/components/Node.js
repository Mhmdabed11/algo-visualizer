import React from "react";
import "./Node.css";

const Node = React.forwardRef(({ type, children, obstacle }, ref) => {
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
