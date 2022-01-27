import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Explore from "./Explore";
import CreateProject from "./CreateProject";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/create-project" element={<CreateProject/>} />
      <Route exact path="/explore" element={<Explore/>} />
      </Routes>
    </Router>,

  document.getElementById("root")
);
