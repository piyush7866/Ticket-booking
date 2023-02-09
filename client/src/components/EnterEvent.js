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
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-lg mb-3 border-spacing-1 border-rounded">
        Enter to event
      </h1>
      <form onSubmit={enter} className="mt-8 w-64 flex flex-col">
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

        <button type="submit" id="btn">
          Enter
        </button>
      </form>
      <p>
        {enterEvent
          ? "you have entered the event"
          : " you have not entered the event"}
      </p>
    </div>
  );
}

export default EnterEvent;
