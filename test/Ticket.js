const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Event Contract", () => {
  async function deployEventFixture() {
    const EventContract = await ethers.getContractFactory("EventContract");
    const [owner] = await ethers.getSigners();
    const contract = await EventContract.deploy();
    await contract.deployed();
    return { EventContract, owner, contract };
  }
  describe("Deployment", () => {
    it("It should set the right owner", async () => {
      const { contract, owner } = await loadFixture(deployEventFixture);

      expect(await contract.owner()).to.equal(owner.address);
    });
  });

  describe("Transaction", () => {
    it("Event should be created", async () => {
      const { contract, owner } = await loadFixture(deployEventFixture);
      expect(await contract.createEvent("Rock", 1675913732, 3, 3));
    });

    it("It should emit the event creation event", async () => {
      const { contract, owner } = await loadFixture(deployEventFixture);

      await expect(contract.createEvent("Rock", 1675913732, 3, 3))
        .to.emit(contract, "EventCreatedSuccessfully")
        .withArgs(owner.address, "Rock", 1675913732, 3);
    });

    it("Buy the tickets for the event ", async () => {
      const { contract, owner } = await loadFixture(deployEventFixture);
      const createEventTx = await contract.createEvent(
        "My Event",
        Math.floor(Date.now() / 1000) + 1000,
        ethers.utils.parseEther("0.1"),
        10
      );
      await createEventTx.wait();

      expect(
        await contract.buyTicket(1, 2, {
          value: ethers.utils.parseEther("0.2"),
        })
      );
    });

    it("It should emit the event", async () => {
      const { contract, owner } = await loadFixture(deployEventFixture);

      const createEventTx = await contract.createEvent(
        "My Event",
        Math.floor(Date.now() / 1000) + 1000,
        ethers.utils.parseEther("0.1"),
        10
      );
      await createEventTx.wait();
      await expect(
        contract.buyTicket(1, 2, { value: ethers.utils.parseEther("0.2") })
      )
        .to.emit(contract, "buyticketSuccesuflly")
        .withArgs(owner.address, 2);
    });
  });
});
