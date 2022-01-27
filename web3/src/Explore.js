import React, {useState,useEffect} from "react";
import "./Explore.css";
import Navbar from "./components/Navbar";
import injectSheet from 'react-jss';
import firebase from './model/firebaseConnect'
import { getDatabase, ref, onValue} from "firebase/database";

const styles ={
    links:{
        textDecoration:"none",
        color:"#fff",
        '&:hover': {
            color: '#3191FF'
          }
    },
    app:{
      backgroundColor: "#95c3f7",
      '&:hover': {
        backgroundColor: '#aed4ff'
      }
    }
}

function CreateBoard(props){
  const projectWidgets = []
  if(props.projects != undefined && Object.keys(props.projects).length > 0){
    for (const [key, value] of Object.entries(props.projects)) {
      const item = props.projects[key];
      const project = (
        <div key={item['name']} className={[props.classes.app,"app"].join(' ')}>
          <div className="app-logo">
          <img src={item['logo']} />
          </div>
        <p className="app-name">{item['name']}</p>
        </div>
      )
      projectWidgets.push(project)
    }
  }
  
  return projectWidgets;

}


function Explore(props) {

  const [projects,setProjects] = useState();

  useEffect(() =>{

    const db = getDatabase();
    const starCountRef = ref(db, 'projects/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const projectList = {};
      for (let project in data){
        projectList[data[project]['address']] = data[project]
      }
      setProjects(projectList)
  
    });
  },[]);


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
          <div className="board">
          <CreateBoard projects={projects} classes={props.classes}/>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default injectSheet(styles)(Explore);
