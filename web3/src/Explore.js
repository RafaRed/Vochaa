import React from "react";
import "./Explore.css";
import Navbar from "./components/Navbar";
import injectSheet from 'react-jss';

const styles ={
    links:{
        textDecoration:"none",
        color:"#fff",
        '&:hover': {
            color: '#3191FF'
          }
    }
}


function Explore(props) {
  return (
    <>
      <Navbar menu="explore"/>
      <div className="explore">
        <div className="wrapper">
          <div className="header">
            <h1 className="title">Projects</h1>
            <p className="description">
              Search for a project you want to support, voting and sharing your
              ideas.
            </p>

            <input
              type="text"
              id="fname"
              name="fname"
              className="block-input"
            />
            <p className="description">
            or <a className={props.classes.links} href="/create-project">add a project you know</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default injectSheet(styles)(Explore);
