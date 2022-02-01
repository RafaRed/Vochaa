import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Explore from "./Explore";
import Project from "./Project";
import CreateProposal from "./CreateProposal";
import CreateProject from "./CreateProject";
import Proposal from "./Proposal";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers";


function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000

  return library
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
  <Router>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/create-project" element={<CreateProject/>} />
      <Route exact path="/explore" element={<Explore/>} />
      <Route exact path="/project/:project" element={<Project/>} />
      <Route exact path="/project/:project/create-proposal" element={<CreateProposal/>} />
      <Route exact path="/project/:project/:proposal" element={<Proposal/>} />
      </Routes>
    </Router>
    </Web3ReactProvider>,

  document.getElementById("root")
);
