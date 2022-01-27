import React from 'react';
import './Navbar.css'
import injectSheet from 'react-jss';

const styles ={
  clickable:{
      textDecoration:"none",
      color:"#fff",
      '&:hover': {
          color: '#3191FF'
        }
  }
}

function Navbar(props) {

  return <div className="topnav">
    
  <a className={props.menu === "home" ? "active" : ""} href="/">HOME</a>
  <a className={props.menu === "explore" ? "active" : ""} href="/explore">PROJECTS</a>
  <a className={props.menu === "about" ? "active" : ""} href="#about">ABOUT</a>
</div>;
}

export default injectSheet(styles)(Navbar);
