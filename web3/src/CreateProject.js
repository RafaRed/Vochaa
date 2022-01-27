import React from "react";
import "./CreateProject.css";
import Navbar from "./components/Navbar";
import injectSheet from 'react-jss';

const styles ={
    button:{
        '&:hover': {
            backgroundColor: '#40a9ff'
          }
    }
}

function CreateProject(props) {
  return (
    <>
      <Navbar menu="explore"/>
      <div className="project">
        <div className="wrapper">
          <div className="header">
            <div className="horizontalBar"></div>
            <div>
              <h1 className="title">Add a Project</h1>
              <p className="description">
                Anyone can add a project to the plataform, but remember the
                project need to have a smart contract.
              </p>
            </div>
          </div>
          <div className="block">
            <h2 className="block-title">Network</h2>
            <p className="block-description">Choose the network that supports the application</p>
            <input type="text" id="fname" name="fname" className="block-input"/>
          </div>

          <div className="block">
            <h2 className="block-title">Contract Address</h2>
            <p className="block-description">Enter the smart contract address of the application</p>
            <input type="text" id="fname" name="fname" className="block-input"/>
          </div>

          <div className="centred-block">
              <div className="app-logo"></div>
              <div className="line">
                  <p className="app-name">Application Name</p>
                  <p className="app-symbol">ABC</p>
              </div>
              <div className="app-contract"><p>0x0000000000000000000000000000000000000000</p></div>
          </div>

          <button type="button" className={props.classes.button}>ADD THIS PROJECT</button>

        </div>
      </div>
    </>
  );
}

export default injectSheet(styles)(CreateProject);
