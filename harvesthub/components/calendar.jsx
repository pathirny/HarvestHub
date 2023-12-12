import Calendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import multiMonthPlugin from '@fullcalendar/multimonth'


export default function FullCalendar(props) {
  const [input, setinput] = useState(false);
  const [date, setDate] = useState(null);

  const [event, setEvent] = useState([
    {
      // this object will be "parsed" into an Event Object
      title: "Christmas",
      start: "2023-12-25",
      allDay: true,
      display: "block",
      backgroundColor: "#f3ebe4",
      textColor: "#47594e",
      borderColor: "#f3ebe4",
      eventOverlap: true,
    },
  ]);

  function handleDateClick(e) {
    // bind with an arrow function
    setinput(true);
    setDate(e.date);
  }

  function addEvent(data) {
    data.preventDefault();
    // console.log(date);

    //let date = new Date(); // Assuming this is your start date
    let newDate = new Date(date); // Create a new Date object to avoid mutating the original date
    newDate.setDate(date.getDate() + 2); // Add 2 days to the date

    setEvent((curr) => {
      return [
        ...curr,
        {
          title: data.target[0].value,
          start: date,
          allDay: true,
          display: "block",
          backgroundColor: "#f3ebe4",
          textColor: "#47594e",
          borderColor: "#f3ebe4",
          eventOverlap: true,
        },
        {
          title: "harvest " + data.target[0].value,
          start: newDate,
          allDay: true,
          display: "block",
          backgroundColor: "#b9a48c",
          textColor: "#f3ebe4",
          borderColor: "#b9a48c",
          eventOverlap: true,
        }
      ];
    });

    setinput(false);
  }

  return (
    <>
      {input ? (
        <form onSubmit={addEvent}>
          <label htmlFor="vegTypev">what are you growing</label>
          <input type="text" name="vegType" />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <></>
      )}
      <Calendar
        plugins={[dayGrid, timeGrid, interactionPlugin, multiMonthPlugin]}
        selectable={true}
        dateClick={(e) => {
          handleDateClick(e);
        }}
        events={event}
        eventClick={(e) => {
          addCheck;
        }}
        {...props}
      />
    </>
  );
}
