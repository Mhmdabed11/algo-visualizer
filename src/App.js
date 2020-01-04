import React from "react";
import ShortestPath from "./components/ShortestPath/ShortestPath";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
const routes = [
  {
    path: "",
    exact: true,
    sidebar: () => <div>Shortest Path using BFS</div>,
    main: () => <ShortestPath />
  }
];

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">Shortest Path using BFS</Link>
            </li>
          </ul>
        </div>

        <div className="algorithm">
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
