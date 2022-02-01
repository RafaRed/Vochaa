import React, { useState } from "react";
import "./CreateProject.css";
import Navbar from "./components/Navbar";
import injectSheet from "react-jss";
import chains from "./components/Networks";
import { getDatabase, ref,set, onValue} from "firebase/database";


const styles = {
  button: {
    "&:hover": {
      backgroundColor: "#40a9ff",
    },
  },

  chip: {
    "&:hover": {
      backgroundColor: "#dddddd",
    },
  },
};

async function addProject(name,symbol,address,logo,wallet){
  const db = getDatabase();
  await set(ref(db, 'projects/'+address), {
    name:name,
    logo:logo,
    symbol:symbol,
    address:address,
    sender:wallet
  });
  
  window.location.href = "/project"+"/"+address;
}


async function searchContract(chain,contract,setAppName,setAppSymbol,setAppLogo,setAppContract,setStatus){
  if(isValidAddress(contract)){
    
    //const url = "https://api.covalenthq.com/v1/"+chain+"/tokens/tokenlists/all/?key="+process.env.REACT_APP_COVALANT_API+"&match=%7B%22contract_address%22:%22"+contract+"%22%7D"
    const url = "https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/"+chain+"/usd/"+contract+"/?&key="+process.env.REACT_APP_COVALANT_API
    setStatus("Searching...");
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      if(data.error_message != null)
      {
        setStatus(data.error_message)
      }
      if(data.data.length <= 0){
        setStatus("Contract not found, check if the address and network is correct.")
      }
      
      setAppName(data.data[0].contract_name)
      setAppSymbol(data.data[0].contract_ticker_symbol)
      setAppLogo(data.data[0].logo_url.replace("/tokens/","/tokens/"+chain+"/"))
      setAppContract(data.data[0].contract_address)
      setStatus("Done");
    })
  }
  else{
    setStatus("Invalid Address");
  }
  
}

function isValidAddress(address){

  if(address == ""){
    return false;
  }
  return true;
}

function CreateProject(props) {
  const [chain, setChain] = useState(137);
  const [contract,setContract] = useState("")
  const [appName,setAppName] = useState("Application Name")
  const [appSymbol,setAppSymbol] = useState("ABC")
  const [appLogo,setAppLogo] = useState("")
  const [status,setStatus] = useState("")
  const [appContract,setAppContract] = useState("0x0000000000000000000000000000000000000000")
  const [wallet,setWallet] = useState();

  const handleOnChangeContract = (e) => {
    setContract(e.target.value);
  }
  const requestProjectCreation = () =>{
    if(appContract !== 0x0000000000000000000000000000000000000000 && status === "Done"){
      addProject(appName,appSymbol,appContract,appLogo,wallet);
    }
    else{
      alert("cannot add this project.")
    }
  }



  return (
    <>
      <Navbar menu="explore" setWallet={setWallet} />
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
            <p className="block-description">
              Choose the network that supports the application
            </p>
            <div className="chips">
            <div onClick={() => setChain(chains["matic-mainnet"].chain_id)} className={[ props.classes.chip, "chip", chain == chains["matic-mainnet"].chain_id ? "active" : "", ].join(" ")} >
                <img src={chains["matic-mainnet"].logo_url} />
                <p>{chains["matic-mainnet"].label}</p>
              </div>
              <div onClick={() => setChain(chains["bsc-mainnet"].chain_id)} className={[ props.classes.chip, "chip", chain == chains["bsc-mainnet"].chain_id ? "active" : "", ].join(" ")} >
                <img src={chains["bsc-mainnet"].logo_url} />
                <p>{chains["bsc-mainnet"].label}</p>
              </div>
              <div onClick={() => setChain(chains["avalanche-mainnet"].chain_id)} className={[ props.classes.chip, "chip", chain == chains["avalanche-mainnet"].chain_id ? "active" : "", ].join(" ")} >
                <img src={chains["avalanche-mainnet"].logo_url} />
                <p>{chains["avalanche-mainnet"].label}</p>
              </div>
            </div>
          </div>

          <div className="block">
            <h2 className="block-title">Contract Address</h2>
            <p className="block-description">
              Enter the smart contract address of the application
            </p>
            <div className="contract">
            <input type="text" id="fname" name="fname" onChange={handleOnChangeContract} className={["block-input",props.classes.input].join(' ')} />
            <button onClick={()=> searchContract(chain,contract,setAppName,setAppSymbol,setAppLogo,setAppContract,setStatus)} type="button" className={[props.classes.button, "search-button"].join(" ")}>SEARCH</button>
            </div>
            <p className="status">{status}</p>

          </div>

          <div className="centred-block">
            <div className="app-logo">
              <img src={appLogo}/>
            </div>
            <div className="line">
              <p className="app-name">{appName}</p>
              <p className="app-symbol">{appSymbol}</p>
            </div>
            <div className="app-contract">
              <p>{appContract}</p>
            </div>
          </div>

          <button type="button" onClick={wallet == undefined ? ()=>alert("Please connect to your wallet first.") : requestProjectCreation} className={[ appContract === "0x0000000000000000000000000000000000000000" ? "" : props.classes.button, appContract === "0x0000000000000000000000000000000000000000" ? "add-button-off" : "add-button"].join(" ")} >ADD THIS PROJECT</button>
        </div>
      </div>
    </>
  );
}

export default injectSheet(styles)(CreateProject);
