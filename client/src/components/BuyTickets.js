import React, { useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

function BuyTickets({ state, sharedData }) {
  const [name, setName] = useState("");
  const [ticket, setTicket] = useState(0);
  const [list, setList] = useState([]);
  const [eventId, setEventId] = useState(0);
  const [data, setData] = useState([]);
  const { contract } = state;
  // -----------------------------------------

  const buyTicket = async (event) => {
    event.preventDefault();
    console.log(sharedData);
    const amount = {
      value: ethers.utils.parseEther("0.00001") * ticket,
    };
    const transaction = await contract.buyTicket(eventId, ticket, amount);
    await transaction.wait();
    console.log(contract);

    const data = { name, ticket };
    if (name && ticket) {
      setList((ls) => [...ls, data]);
      setName("");
      setTicket(0);
      setEventId(0);
    }
    contract.on("buyticketSuccesuflly", (from, ticket) => {
      let data = { from, ticket };
      setData((oldData) => [...oldData, data]);
    });
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-lg mb-3 border-spacing-1 border-rounded">
        Event Ticket booking
      </h1>
      <form onSubmit={buyTicket} className="mt-8 w-64 flex flex-col">
        <label>Event Id</label>
        <input
          autoFocus
          type="number"
          id="eventid"
          placeholder="Type your event id"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          className="text-xs w-full mb-2 rounded border bg-slate-200 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
        />

        <label>Event Name</label>
        <input
          autoFocus
          type="text"
          id="event"
          placeholder="Type your event name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-xs w-full mb-2 rounded border bg-slate-200 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
        />
        <label>Number of Tickets</label>
        <input
          autoFocus
          type="number"
          id="ticket"
          placeholder="Number of Tickets"
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
          className="text-xs w-full mb-2 rounded border bg-slate-200 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
        />
        <button
          type="submit"
          className="text-lg cursor-pointer outline-none focus:outline-none transition-all text-gray-400 hover:text-green-600"
        >
          Buy Tickets
        </button>
      </form>
      <p>
        {list.map((ls) => (
          <Link to="/enter">
            {ls.ticket} {ls.ticket !== 1 ? "tickets" : "ticket"} booked for{" "}
            {ls.name} event.
            <br />
          </Link>
        ))}
      </p>
      {data.map((d, idx) => (
        <div key={idx}>
          <p>
            {d.from} buy {d.ticket}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BuyTickets;
