import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CreateProposal.css";
import Navbar from "./components/Navbar";

function CreateProposal() {
	const params = useParams();

	return (
		<>
			<Navbar menu="explore" />
			<div className="create-proposal">
				<div className="wrapper">
					<div className="header">
						<div className="horizontalBar"></div>
						<div>
							<h1 className="title">Create an Proposal</h1>
							<p className="description">
								To create an proposal, simply fill out the event settings, add your
								options, and we will generate you quicklinks that you can share with
								your audience.
							</p>
						</div>
					</div>
                    <div className="block">
                        <h1 className="title">Name</h1>
                        <p className="description">Choose a name for your proposal</p>
                        <input type="text" id="fname" name="fname" className={["block-input"].join(' ')} />
                    </div>
                    <div className="block">
                        <h1 className="title">Description</h1>
                        <p className="description">Describe your proposal in up to 250 characters</p>
                        <input type="text" id="fname" name="fname" className={["block-input"].join(' ')} />
                    </div>
                    <div className="block">
                        <h1 className="title">When Will The Vote Take Place?</h1>
                        <p className="description">Select an start date</p>
                        <input type="text" id="fname" name="fname" className={["block-input"].join(' ')} />
                        <p className="description">Select an ending date</p>
                        <input type="text" id="fname" name="fname" className={["block-input"].join(' ')} />
                    </div>
                    <div className="block">
                        <h1 className="title">Credits</h1>
                        <p className="description">How many credits will each voter receive?</p>
                        <input type="text" id="fname" name="fname" className={["block-input"].join(' ')} />
                    </div>
                    <div className="block">
                        <h1 className="title">Options</h1>
                        <p className="description">Add an option for voting.</p>
                        <input type="text" id="fname" name="fname" className={["block-input"].join(' ')} />
                    </div>
                    <button type="button" className={["add-button"].join(' ')} >ADD THIS PROJECT</button>

				</div>
			</div>
		</>
	);
}

export default CreateProposal;
