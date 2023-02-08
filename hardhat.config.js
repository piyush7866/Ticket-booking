require("@nomicfoundation/hardhat-toolbox");

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
// const ALCHEMY_API_KEY = "Yyw49Ibljv8Ek6gqMmqAh30xcvPP5BpJ";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY =
  "cd93435ef122fbd208d11dfc88b66875a398df56885cb721bf8dbce044ae7664";

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      allowUnlimitedContractSize: true,
      gas: 21000000,
      gasPrice: 800000000,
      url: `https://eth-goerli.g.alchemy.com/v2/puy3QHntrFeUGsCCRn9-VwsyeRTpWgqK`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
    // polygon_mumbai: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/1PlKRmM2h5pDsFbf6HSismbevq2fLHro`,
    //   accounts: [GOERLI_PRIVATE_KEY],
    // },
  },
};
