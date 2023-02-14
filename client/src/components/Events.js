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

    const data = { event, date, sharedData, venue, totalTicket, eventId };
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
      <div className="w-screen h-screen justify-center items-center">
        <h1 className="">Create Event</h1>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={createEvent}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Event Name
            </label>
            <input
              type="text"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Event Id
            </label>
            <input
              type="number"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Venue
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={sharedData}
              onChange={(e) => setSharedState(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Total Tickets Available
            </label>
            <input
              type="number"
              value={totalTicket}
              onChange={(e) => setTotalTicket(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create event
          </button>
        </form>
        <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-left sm:space-y-0 sm:space-x-6">
          <div className="text-center space-y-2 sm:text-left">
            <div className="selection:bg-fuchsia-300 selection:text-fuchsia-900">
              <p>
                {showevent.map((e) => (
                  <Link to="/kyc">
                    {e.eventId}.{e.event} event is created on {e.date} and venue
                    is {e.venue} and total available tickets are {e.totalTicket}{" "}
                    with price {e.sharedData} for each ticket.
                    <br />
                    <br />
                  </Link>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Events;
