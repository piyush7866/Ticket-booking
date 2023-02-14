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
    <div className="w-screen h-screen justify-center items-center">
      <h1 className="text-lg mb-3 border-spacing-1 border-rounded">
        Event Ticket booking
      </h1>
      <form
        onSubmit={buyTicket}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Id
          </label>
          <input
            autoFocus
            type="number"
            id="eventid"
            placeholder="Type your event id"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Name
          </label>
          <input
            autoFocus
            type="text"
            id="event"
            placeholder="Type your event name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Number of Tickets
          </label>
          <input
            autoFocus
            type="number"
            id="ticket"
            placeholder="Number of Tickets"
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Buy Tickets
        </button>
      </form>
      <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-left sm:space-y-0 sm:space-x-6">
        <div className="text-center space-y-2 sm:text-left">
          <div className="selection:bg-fuchsia-300 selection:text-fuchsia-900">
            <p>
              {list.map((ls) => (
                <Link to="/enter">
                  {ls.ticket} {ls.ticket !== 1 ? "tickets" : "ticket"} booked
                  for {ls.name} event.
                  <br />
                </Link>
              ))}
            </p>
          </div>
        </div>
      </div>
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
