import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

import "./Proposal.css";
function Proposal() {
	return (
		<div>
			<Navbar menu="explore" />
			<div className="proposal">
				<div className="wrapper">

                </div>
			</div>
		</div>
	);
}

export default injectSheet(styles)(Proposal);
