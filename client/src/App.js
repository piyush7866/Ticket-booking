import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./contract/EventContract.json";
import "./App.css";
import Events from "./components/Events";
import BuyTickets from "./components/BuyTickets";
import MetaMask from "./components/MetaMask";
import KYC from "./components/KYC";
import EnterEvent from "./components/EnterEvent";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  const [sharedState, setSharedState] = useState(0);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x8ebe48821Be2BA3D623571673D3cE88B69a31c59";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, [account]);
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<MetaMask />} />
            <Route
              path="/buy"
              element={
                <BuyTickets
                  state={state}
                  sharedData={sharedState}
                  setSharedState={setSharedState}
                />
              }
            />
            <Route
              path="/event"
              element={
                <Events
                  state={state}
                  sharedData={sharedState}
                  setSharedState={setSharedState}
                />
              }
            />
            <Route path="/enter" element={<EnterEvent state={state} />} />

            <Route path="/kyc" element={<KYC />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
