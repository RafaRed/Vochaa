import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CreateProposal.css";
import Navbar from "./components/Navbar";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import injectSheet from "react-jss";
import moment from "moment";
import { getDatabase, ref,push, onValue} from "firebase/database";

const styles = {
	button: {
		"&:hover": {
			backgroundColor: "#40a9ff",
		},
	},
	trash: {
		"&:hover": {
			backgroundColor: "#ff6e6e",
		},
	},
};

function Credits(props) {

    var credits = props.credits
    if(credits==undefined){
        credits = 100;
        props.setCredits(100)
    }
    if(credits < 10){
        credits = 10;
        props.setCredits(10)
        
    }

	return <div className="block">
		<h1 className="title">Credits</h1>
		<p className="description">How many credits will each voter receive?</p>
		<input
			type="number"
			min="10"
			max="1000"
            defaultValue="100"
			onChange={(event) => {
				if (event.target.value.length >= 4) {
					event.target.value = "1000";
				}
                if (event.target.value.length <= 1) {
					event.target.value = "10";
				}

				props.setCredits(event?.target.value);
			}}
			id="fname"
			name="fname"
			className={["block-input"].join(" ")}
		/>
	</div>;
}

function submitProposal(address, name, description, startDate, endDate, credits, options){
    const db = getDatabase();
    console.log(options)
    push(ref(db, 'proposals/'+address), {
        timestamp:moment().unix(),
        name:name,
        description:description,
        startDate:startDate.unix(),
        endDate:endDate.unix(),
        credits:credits,
        options:options
    });

}

function SubmitButton(props) {
	console.log(
		props.options
	);
	if (
		props.credits >= 10 &&
		props.name.length >= 3 &&
		props.name.length <= 30 &&
		props.description.length >= 5 &&
		props.description.length <= 1500 &&
		props.startDate != undefined &&
		props.endDate != undefined &&
		props.startDate.isAfter(moment().subtract(1, 'days')) &&
		props.endDate.isAfter(props.startDate) &&
		props.options.length >= 2
	) {
		return (
			<button
				type="button"
                onClick={()=> submitProposal(props.address,props.name,props.description,props.startDate,props.endDate,props.credits,props.options)}
				className={["add-button", props.classes.button].join(" ")}>
				SUBMIT PROPOSAL
			</button>
		);
	} else {
		return (
			<button type="button" className={["add-button-disabled"].join(" ")}>
				SUBMIT PROPOSAL
			</button>
		);
	}
}

function ListOptions(props) {
	var objects = [];
	for (var i = 0; i < props.options.length; i++) {
		const index = i;
		objects.push(
			<div className="option-line" key={index}>
				<div className="option">
					<p>{props.options[i]}</p>
				</div>
				<button
					type="button"
					onClick={() => removeOption(index, props.setOptions, props.options)}
					className={["trash-button", props.classes.trash].join(" ")}>
					<img src="/images/trash.png" className="button-image" />
				</button>
			</div>
		);
	}

	return objects;
}

function validFrom(current, start) {
	return current.isAfter(start);
}

function valid(current, end) {
	var now = moment();

	if (end == undefined || end == "") {
		return current.isAfter(now.subtract(1, 'days'));
	} else {
		return current.isAfter(now) && current.isBefore(end);
	}
}

function handleDayChange(day, setter) {
	console.log(day);
	if (day !== "") {
		//var CurrentDate = moment().unix();
		setter(day);
	}
}

function removeOption(index, setOptions, options) {
	const list = options;
	const newList = [];
	for (var i = 0; i < list.length; i++) {
		if (i == index) {
		} else {
			newList.push(list[i]);
		}
	}
	setOptions(newList);
}

function addOption(option, setOption, setOptions, options) {
	if (option !== "" && option !== undefined) {
		const list = options;
		list.push(option);
		setOptions(list);
		setOption("");
	}
}

function CreateProposal(props) {
	const params = useParams();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [credits, setCredits] = useState(100);
	const [option, setOption] = useState("");
	const [options, setOptions] = useState([]);


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
						<input
							type="text"
							id="fname"
							name="fname"
							onChange={(e) => setName(e.target.value)}
							className={["block-input"].join(" ")}
						/>
					</div>
					<div className="block">
						<h1 className="title">Description</h1>
						<p className="description">Describe your proposal</p>
						<textarea
							id="fname"
							maxLength="1500"
							name="fname"
							onChange={(e) => setDescription(e.target.value)}
							className={["block-input-long"].join(" ")}
						/>
					</div>
					<div className="block">
						<h1 className="title">When is it going to happen?</h1>
						<p className="description">Select an start date</p>
						<div className="input-day">
							<Datetime
								isValidDate={(current) => valid(current, endDate)}
								onClose={(day) => handleDayChange(day, setStartDate)}
								onC
							/>
						</div>

						<p className="description">Select an ending date</p>
						<div className="input-day">
							<Datetime
								isValidDate={(current) => validFrom(current, startDate)}
								onClose={(day) => handleDayChange(day, setEndDate)}
							/>
						</div>
					</div>
					<Credits credits={props.credits} setCredits={()=>props.setCredits} />
					<div className="block">
						<h1 className="title">Options</h1>
						<p className="description">Add at least two options.</p>
						<div className="option-line">
							<input
								type="text"
								id="fname"
								name="fname"
								value={option}
								onChange={(e) => setOption(e.target.value)}
								className={["option-input"].join(" ")}
							/>
							<button
								type="button"
								onClick={() => addOption(option, setOption, setOptions, options)}
								className={[
									option !== "" ? "plus-button" : "plus-button-disabled",
									option !== "" ? props.classes.button : "",
								].join(" ")}>
								<img src="/images/plus.png" className="button-image" />
							</button>
						</div>
						<div className="list-options">
							<ListOptions
								options={options}
								classes={props.classes}
								setOptions={setOptions}
							/>
						</div>
					</div>

					<SubmitButton
                        address={params.project}
						classes={props.classes}
						name={name}
						description={description}
						credits={credits}
						startDate={startDate}
						endDate={endDate}
						options={options}
					/>
				</div>
			</div>
		</>
	);
}

export default injectSheet(styles)(CreateProposal);
