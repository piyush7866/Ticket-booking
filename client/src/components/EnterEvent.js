import React, { useState } from "react";

function EnterEvent({ state }) {
  const [eventId, setEventId] = useState(0);
  const [enterEvent, setEnterEvent] = useState(false);

  const { contract, signer } = state;

  const enter = async (event) => {
    event.preventDefault();
    const transaction = await contract.connect(signer).EnterEvent(eventId);
    await transaction.wait();

    contract.on("EnteredEventSuccessfully", (_eventId, _status) => {
      console.log(`created ${eventId}`);
    });
    if (contract.filters.EnteredEventSuccessfully()) {
      setEnterEvent(true);
    } else {
      setEnterEvent(false);
    }
  };

  return (
    <div className="w-screen h-screen justify-center items-center">
      <h1 className="text-lg mb-3 border-spacing-1 justify-center items-center w-60 h-30">
        Enter to event
      </h1>
      <form
        onSubmit={enter}
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

        <button
          type="submit"
          id="btn"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Enter
        </button>
      </form>
      <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-left sm:space-y-0 sm:space-x-6">
        <div className="text-center space-y-2 sm:text-left">
          <div className="selection:bg-fuchsia-300 selection:text-fuchsia-900">
            <p>
              {enterEvent
                ? "You have entered the event"
                : "You have not entered the event"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterEvent;
