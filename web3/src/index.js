import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Explore from "./Explore";
import Project from "./Project";
import CreateProposal from "./CreateProposal";
import CreateProject from "./CreateProject";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/create-project" element={<CreateProject/>} />
      <Route exact path="/explore" element={<Explore/>} />
      <Route exact path="/project/:project" element={<Project/>} />
      <Route exact path="/project/:project/create-proposal" element={<CreateProposal/>} />
      </Routes>
    </Router>,

  document.getElementById("root")
);
