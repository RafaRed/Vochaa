import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Project.css";
import firebase from "./model/firebaseConnect";
import Navbar from "./components/Navbar";
import { getDatabase, ref, onValue } from "firebase/database";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

const styles = {
	button: {
		"&:hover": {
			backgroundColor: "#40a9ff",
		},
	},
};

function Proposals(props) {
   var proposals = []

   if(props.proposals != undefined){
    for (var i = 0 ; i < props.proposals.length ;i++) {

			proposals.push(
				<div className="proposal" key={props.proposals[i].timestamp}>
					<p className="name">{props.proposals[i].name}</p>
          <p className="description">{props.proposals[i].description}</p>
				</div>
			);
      
		};
   }
		

	return <div>{proposals}</div>;
}

function Project(props) {
	const [project, setProject] = useState({ name: "", symbol: "", address: "" });
  const [proposals, setProposals] = useState();
	const params = useParams();

	useEffect(() => {
		const db = getDatabase();
		const starCountRef = ref(db, "projects/");
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			for (let project in data) {
				if (data[project]["address"] == params.project) {
					setProject(data[project]);
				}
			}
		});

    
  var proposalsList = []
	const proposalRef = ref(db, "proposals/" + params.project);
	onValue(proposalRef, (snapshot) => {
		const data = snapshot.val();
    for (let proposal in data) {
      proposalsList.push(data[proposal]);
    }
    setProposals(proposalsList);
  });
  
	}, []);

	//onClick={requestProjectCreation}
	//className={[ appContract === "0x0000000000000000000000000000000000000000" ? "" : props.classes.button, appContract === "0x0000000000000000000000000000000000000000" ? "add-button-off" : "add-button"].join(" ")}
	return (
		<>
			<Navbar menu="explore" />
			<div className="proj">
				<div className="wrapper">
					<div className="centred-block">
						<div className="app-logo">
							<img src={project.logo} />
						</div>
						<div className="line">
							<p className="app-name">{project.name}</p>
							<p className="app-symbol">{project.symbol}</p>
						</div>
						<div className="app-contract">
							<p>{project.address}</p>
						</div>

						<a
							href={"/project/" + params.project + "/create-proposal"}
							className={["add-button", props.classes.button].join(" ")}>
							CREATE PROPOSAL
						</a>
					</div>
					<p className="proposals">Proposals</p>
					<div>
						<Proposals proposals={proposals} />
					</div>
				</div>
			</div>
		</>
	);
}

export default injectSheet(styles)(Project);
