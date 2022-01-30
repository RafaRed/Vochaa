import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "./model/firebaseConnect";
import Navbar from "./components/Navbar";
import { getDatabase, ref, onValue } from "firebase/database";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import "./Proposal.css";

const styles = {
	button: {
		"&:hover": {
			backgroundColor: "#40a9ff",
		},
	},
	setButton: {
		"&:hover": {
			backgroundColor: "#cccccc",
		},
	},
};

function VoteButton(props) {
	return (
		<div className="vote-button">
			<div className={[props.button, "less"].join(" ")}>-</div>
			<div className="quantity">0</div>
			<div className={[props.button, "more"].join(" ")}>+</div>
		</div>
	);
}

function VoteStatus(props) {
	var options = [];
	if (props.options != undefined) {
		for (var i = 0; i < props.options.length; i++) {
			options.push(
				<div className="vote-status" key={props.options[i]}>
                    <div className="vote-status-header">
                    <p>{props.options[i]} </p>
                    <p>0%</p>
                    </div>
					
                    <div className="progress-bar">
                        <div className="progress-bar-status" style={{width:"50%"}}>
                        
                        </div>
                    </div>
                    
				</div>
                
			);
		}
		return options;
	} else {
		return <></>;
	}
}

function VoteOptions(props) {
	var options = [];
	if (props.options != undefined) {
		for (var i = 0; i < props.options.length; i++) {
			options.push(
				<div className="vote-option" key={props.options[i]}>
					{props.options[i]} <VoteButton button={props.button} />
				</div>
			);
		}
		return options;
	} else {
		return <></>;
	}
}

function Proposal(props) {
	const [project, setProject] = useState({ name: "", symbol: "", address: "" });
	const [credits, setCredits] = useState(0);
	const [proposal, setProposal] = useState({
		name: "",
		description: "",
		credits: "0",
	});
	const params = useParams();

	useEffect(() => {
		const db = getDatabase();
		const starCountRef = ref(db, "projects/" + params.project);
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			setProject(data);
		});

		const proposalRef = ref(
			db,
			"proposals/" + params.project + "/" + params.proposal
		);
		onValue(proposalRef, (snapshot) => {
			const data = snapshot.val();
			setProposal(data);
			setCredits(data.credits);
		});
	}, []);

	return (
		<div>
			<Navbar menu="explore" />
			<div className="proposal">
				<div className="wrapper">
					<div className="header">
						<div className="line">
							<div className="image-block">
								<img src={project.logo} />
							</div>

							<div className="info">
								<p className="name">{project.name}</p>
								<p className="address">{project.address}</p>
							</div>
						</div>
					</div>
					<div className="block">
						<p className="name">{proposal.name}</p>
						<p className="description">{proposal.description}</p>
					</div>
					<div className="block vote-block">
						<div className="vote-header">
							<p className="vote-title">VOTE</p>
							<div className="credits">
								<p className="credits-label">CREDITS</p>
								<p className="credits-value">{credits}</p>
							</div>
						</div>
						<hr className="solid"></hr>

						<VoteOptions
							options={proposal.options}
							button={props.classes.setButton}
						/>
						<a href="/">
							<p className={[props.classes.button, "send-vote"].join(" ")}>
								SEND VOTE
							</p>
						</a>
					</div>
				</div>
                <div className="info-block">
                    <div className="info-header">
                        <p className="title">Information</p>
                        <hr className="solid-80"></hr>
                    </div>
                    <div className="line">
                        <p>Created by</p>
                        <p>0x000000...</p>
                    </div>
                    <div className="line">
                        <p>Start Date</p>
                        <p>0x000000...</p>
                    </div>
                    <div className="line">
                        <p>End Date</p>
                        <p>0x000000...</p>
                    </div>
                    <div className="info-header-2">
                        <p className="title">Current Results</p>
                        <hr className="solid-80"></hr>
                    </div>
                    <VoteStatus
							options={proposal.options}
							button={props.classes.setButton}
						/>
                    
                </div>
			</div>
		</div>
	);
}

export default injectSheet(styles)(Proposal);
