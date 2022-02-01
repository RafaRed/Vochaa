import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "./model/firebaseConnect";

import Navbar from "./components/Navbar";
import { getDatabase, ref, onValue, runTransaction } from "firebase/database";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import moment from "moment";
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

function sendVotes(votes, address, proposal, wallet) {
	if (wallet != undefined) {
		const db = getDatabase();
		var _voters = [];
		var votersUrl = "proposals/" + address + "/" + proposal + "/" + "voters";
		const votersRef = ref(db, votersUrl);

		onValue(votersRef, (snapshot) => {
			
			const data = snapshot.val();
			_voters = data;
		});

		if(!_voters.includes(wallet)){
			runTransaction(votersRef, (voters) => {
				if (voters) {
					voters.push(wallet);
				}
				return voters;
			});
	
			var update = "proposals/" + address + "/" + proposal + "/" + "votes";
			//console.log(update)
			const voteRef = ref(db, update);
			runTransaction(voteRef, (vote) => {
				if (vote) {
					console.log(votes.length);
					for (var i = 0; i < votes.length; i++) {
						if (votes[i] != 0) {
							vote[i] += votes[i];
						}
					}
				}
				return vote;
			});
		}else {
			alert("You already voted before.");
		} 
		}else {
			alert("Please connect to your wallet first.");
		}
	


}

function getCredits(props, value) {
	var credits = props.credits;

	for (var i = 0; i < props.vote.length; i++) {
		if (i === props.index) {
			credits -= Math.abs(props.vote[i] + value) ** 2;
		} else {
			credits -= Math.abs(props.vote[i]) ** 2;
		}
	}
	return credits;
}

function reduceVote(props) {
	var credits = getCredits(props, -1);
	if (credits >= 0) {
		var votes = props.vote;
		votes[props.index] -= 1;
		props.setVote((arr) => [...votes]);
		props.setCurrentCredits(credits);
	}
}

function addVote(props) {
	var credits = getCredits(props, +1);
	if (credits >= 0) {
		var votes = props.vote;
		votes[props.index] += 1;
		props.setVote((arr) => [...votes]);
		props.setCurrentCredits(credits);
	}
}

function VoteButton(props) {
	//console.log(props)
	return (
		<div className="vote-button">
			<div
				onClick={() => reduceVote(props)}
				className={[props.button, "less"].join(" ")}>
				-
			</div>
			<div className="quantity">
				{props.vote !== undefined && props.vote.length > 0
					? props.vote[props.index]
					: 0}
			</div>
			<div
				onClick={() => addVote(props)}
				className={[props.button, "more"].join(" ")}>
				+
			</div>
		</div>
	);
}

function VoteStatus(props) {
	var options = [];
	var totalVotes = 0;

	for (var i = 0; i < props.currentVotes.length; i++) {
		totalVotes += Math.abs(props.currentVotes[i]);
	}
	//console.log(totalVotes)
	if (props.options !== undefined) {
		for (var i = 0; i < props.options.length; i++) {
			var percentage = (props.currentVotes[i] / totalVotes) * 100;

			if (percentage == undefined || isNaN(percentage)) {
				percentage = 0;
			}
			console.log(percentage);
			options.push(
				<div className="vote-status" key={props.options[i]}>
					<div className="vote-status-header">
						<p>{props.options[i]} </p>
						<p>{Math.round(percentage)}%</p>
					</div>

					<div className="progress-bar">
						<div
							className="progress-bar-status"
							style={{ width: percentage + "%" }}></div>
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

	if (props.options !== undefined) {
		for (var i = 0; i < props.options.length; i++) {
			options.push(
				<div className="vote-option" key={props.options[i]}>
					{props.options[i]}{" "}
					<VoteButton
						index={i}
						button={props.button}
						vote={props.vote}
						setVote={props.setVote}
						credits={props.credits}
						setCurrentCredits={props.setCurrentCredits}
					/>
				</div>
			);
		}
		//console.log(props.vote)
		return options;
	} else {
		return <></>;
	}
}

function Proposal(props) {
	const [project, setProject] = useState({ name: "", symbol: "", address: "" });
	const [credits, setCredits] = useState(0);
	const [currentCredits, setCurrentCredits] = useState(0);
	const [vote, setVote] = useState([]);

	const [currentVotes, setCurrentVotes] = useState([]);
	const [proposal, setProposal] = useState({
		name: "",
		description: "",
		credits: "0",
	});
	const [wallet, setWallet] = useState();

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
			setCurrentCredits(data.credits);
		});

		const voteRef = ref(
			db,
			"proposals/" + params.project + "/" + params.proposal + "/votes"
		);
		onValue(voteRef, (snapshot) => {
			var _votes = [];
			const data = snapshot.val();
			for (let v in data) {
				_votes.push(data[v]);
			}
			setCurrentVotes(_votes);
		});
	}, []);

	if (proposal.options != undefined && vote.length <= 1) {
		var voteList = [];
		for (var i = 0; i < proposal.options.length; i++) {
			voteList.push(0);
		}
		setVote(voteList);
	}

	return (
		<div>
			<Navbar menu="explore" setWallet={setWallet} />
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
								<p className="credits-value">{currentCredits}</p>
							</div>
						</div>
						<hr className="solid"></hr>

						<VoteOptions
							options={proposal.options}
							button={props.classes.setButton}
							setVote={setVote}
							vote={vote}
							credits={credits}
							setCurrentCredits={setCurrentCredits}
						/>

						<button
							onClick={
								currentCredits !== credits
									? () => sendVotes(vote, params.project, params.proposal, wallet)
									: () => {}
							}
							className={[
								currentCredits !== credits ? props.classes.button : "",
								currentCredits !== credits ? "send-vote" : "send-vote-disabled",
							].join(" ")}>
							SEND VOTE
						</button>
					</div>
				</div>
				<div className="info-block">
					<div className="info-header">
						<p className="title">Information</p>
						<hr className="solid-80"></hr>
					</div>
					<div className="line">
						<p>Created by</p>
						<p className="sender">{proposal.sender}</p>
					</div>
					<div className="line">
						<p>Start Date</p>
						<p>{moment.unix(proposal.startDate).format("DD MMM YYYY hh:mm a")}</p>
					</div>
					<div className="line">
						<p>End Date</p>
						<p>{moment.unix(proposal.endDate).format("DD MMM YYYY hh:mm a")}</p>
					</div>
					<div className="info-header-2">
						<p className="title">Current Results</p>
						<hr className="solid-80"></hr>
					</div>
					<VoteStatus
						options={proposal.options}
						button={props.classes.setButton}
						currentVotes={currentVotes}
					/>
				</div>
			</div>
		</div>
	);
}

export default injectSheet(styles)(Proposal);
