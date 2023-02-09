import { useState } from "react";
import { Link } from "react-router-dom";
function Events({ state, sharedData, setSharedState }) {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [totalTicket, setTotalTicket] = useState(0);
  const [showevent, setShowEvent] = useState([]);
  const [eventId, setEventId] = useState(0);
  const { contract } = state;
  const createEvent = async (events) => {
    events.preventDefault();
    console.log(sharedData);
    console.log(contract);
    const unixDate = Math.floor(new Date(date).getTime() / 1000);
    const createEvents = await contract.createEvent(
      event,
      unixDate,
      sharedData,
      totalTicket
    );

    await createEvents.wait();
    console.log("transaction done");

    const data = { event, date, sharedData, venue, totalTicket };
    if (event && date) {
      setShowEvent((e) => [...e, data]);
      setEvent("");
      setDate("");
      setVenue("");
      setSharedState(0);
      setTotalTicket(0);
      setEventId(0);
    }
  };
  return (
    <>
      <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
        <h1>Create Event</h1>
        <form className="mt-8 w-64 flex flex-col" onSubmit={createEvent}>
          <label htmlFor="">Event Name</label>
          <input
            type="text"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="text-xs w-full mb-2 rounded border bg-slate-200 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
          />
          <label htmlFor="">Event Id</label>
          <input
            type="number"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="text-xs w-full mb-2 rounded border bg-slate-200 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
          />
          <label htmlFor="">Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-xs w-full mb-2 rounded border bg-slate-200 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
          />
          <label htmlFor="">Venue</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="text-xs w-full mb-2 rounded border bg-slate-200 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
          />
          <label htmlFor="">Price</label>
          <input
            type="number"
            id="price"
            value={sharedData}
            onChange={(e) => setSharedState(e.target.value)}
            className="text-xs w-full mb-2 rounded border bg-slate-200 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
          />
          <label htmlFor="">Total Tickets Available</label>
          <input
            type="number"
            value={totalTicket}
            onChange={(e) => setTotalTicket(e.target.value)}
            className="text-xs w-full mb-2 rounded border bg-slate-200 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
          />
          <button
            type="submit"
            className="text-lg cursor-pointer outline-none focus:outline-none transition-all text-gray-400 hover:text-green-600"
          >
            Create event
          </button>
        </form>
        <p>
          {showevent.map((e) => (
            <Link to="/kyc">
              {e.event} event is created on {e.date} and venue is {e.venue} and
              total available tickets are {e.totalTicket} with price{" "}
              {e.sharedData} for each ticket
              <br />
            </Link>
          ))}
        </p>
      </div>
    </>
  );
}
export default Events;
