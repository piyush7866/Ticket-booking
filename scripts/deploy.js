const hre = require("hardhat");
const getBalances = async (address) => {
  const balances = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balances);
};

const consoleBalances = async (addresses) => {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balances`, await getBalances(address));
    counter++;
  }
};

const consoleEvents = async (events) => {
  for (const event of events) {
    const name = event.name;
    const date = event.date;
    const price = event.price;
    console.log(
      `The ${name} show is organised at ${date} and price of the ticket is ${price}`
    );
  }
};

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const Event = await hre.ethers.getContractFactory("EventContract");
  const contract = await Event.deploy();
  await contract.deployed();
  console.log(`Address of contract`, contract.address);

  const addresses = [owner.address];
  console.log("Before creating events");
  await consoleBalances(addresses);
  await contract.connect(owner).createEvent("Rock", 1674795418, 3, 3);
  await contract
    .connect(owner)
    .createEvent("Pathan show", 1674795418, 300, 100);
  await contract.connect(owner).createEvent("Magic", 1674795418, 100, 350);

  console.log("Before buying tickets");
  await consoleBalances(addresses);
  const amount = { value: hre.ethers.utils.parseEther("0.00001") };
  await contract.connect(owner).buyTicket(1, 2, amount);
  console.log("After buying tickets");
  await consoleBalances(addresses);
  const getEvents = await contract.getEvent();
  console.log("After creating events !");
  consoleEvents(getEvents);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
