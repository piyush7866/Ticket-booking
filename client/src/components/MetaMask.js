import { useState } from "react";
import { useNavigate } from "react-router-dom";
function MetaMask() {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();
  async function requestAccount() {
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        navigate("/event");
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={requestAccount}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect metamask
        </button>
      </header>
    </div>
  );
}

export default MetaMask;
