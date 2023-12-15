import Calendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { use, useEffect, useState } from "react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { Select } from "@chakra-ui/react";
import { createBrowserClient } from "@supabase/ssr";
import { formatDate } from "@fullcalendar/core";

export default function FullCalendar(props) {
  //connecting to supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  //list of veggies for drop down
  const [vegList, setVegList] = useState([]);

  //getting the names of veggies for drop down list
  useEffect(() => {
    async function getVegOptions() {
      let { data: veggies, error } = await supabase
        .from("veggies")
        .select("name, id");
      setVegList(veggies);
    }

    getVegOptions();
    getCalendarEvents();
  }, []);

  // Set state to the selected veggie
  const [selectedVeg, setSelectedVeg] = useState("");
  //toggle to control if the form is showing to input a new event
  const [input, setinput] = useState(false);
  //toggle for event popup to delete event
  const [eventOptions, setEventOptions] = useState(false);
  //setting date when a calendar day is clicked on - to be passed the event object
  const [date, setDate] = useState(null);
  //setting even lists for events on calendar
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
  //selected event when it is clicked on
  const [currentEvent, setCurrentEvent] = useState(null);

  //handles when a day is clicked on the calendar
  function handleDateClick(e) {
    //toggles the input form to show
    setinput(true);
    //sets the date to the day that has been clicked on
    setDate(e.date);
  }

  //adds event when the input form has been submitted
  function addEvent(data) {
    //Create a function that uses the name of the veggie to get the harvest date and add it to the calendar
    async function getHarvestDate(veg) {
      // Do an api call to get the harvest date
      let { data: veggies, error } = await supabase
        .from("veggies")
        .select("grow_days, id")
        .eq("name", `${veg}`);

      if (error) {
        console.error("Error fetching veggies:", error);
        return;
      }

      if (veggies && veggies.length > 0) {
        // Create a new Date object to avoid mutating the original date
        let newDate = new Date(date);

        // Add 2 days to the date
        newDate.setDate(date.getDate() + veggies[0]["grow_days"]);

        async function apiCall() {
          const { data, error } = await supabase
            .from("calendar_events")
            .insert([
              {
                veg_id: veggies[0]["id"],
                plant_date: date,
                harvest_date: newDate,
              },
            ]);

          if (error) {
            console.log(error);
          }
          getCalendarEvents();
        }
        apiCall();
      } else {
        console.log("No veggies found with the name:", veg);
      }
    }

    getHarvestDate(selectedVeg);
    // Create an async function to do the api call to add a new event to the databage

    //toggles the input form off
    setinput(false);
  }

  function getCalendarEvents() {
    async function apiCall() {
      let { data: events, error } = await supabase
        .from("calendar_events")
        .select("veggies (name), plant_date, harvest_date, event_id");
      setEvent(events);
      if (error) {
        console.error("Error fetching veggies:", error);
      }
      if (events && events.length > 0) {
        const eventList = events.map((event) => {
          return [
            {
              title: event.veggies.name,
              start: event.plant_date,
              allDay: true,
              display: "block",
              backgroundColor: "#f3ebe4",
              textColor: "#47594e",
              borderColor: "#f3ebe4",
              eventOverlap: true,
              id: event.event_id,
            },
            {
              title: event.veggies.name,
              start: event.harvest_date,
              allDay: true,
              display: "block",
              backgroundColor: "#b9a48c",
              textColor: "#f3ebe4",
              borderColor: "#b9a48c",
              eventOverlap: true,
              id: event.event_id + "#",
            },
          ];
        });
        setEvent(eventList.flat());
      }
    }

    apiCall();
  }

  function displayEvent(e) {
    console.log(e.event._def.publicId);
    setCurrentEvent(e.event._def.publicId);
  }

  function deleteEvent() {
    if (currentEvent.includes("#")) {
      async function apiCall() {
        let { error } = await supabase
          .from("calendar_events")
          .delete()
          .eq("event_id", currentEvent.substring(0, currentEvent.length - 1));
        getCalendarEvents();
      }
      apiCall();
    }

    async function apiCall() {
      let { error } = await supabase
        .from("calendar_events")
        .delete()
        .eq("event_id", currentEvent);

      getCalendarEvents();
    }
    apiCall();
    setEventOptions(false)
  }

  return (
    <>
      {/* toggle for showing input */}
      {input ? (
        <form onSubmit={addEvent}>
          <label htmlFor="vegTypev">what are you growing</label>
          {/* drop down to select veggies */}
          <Select
            placeholder="Select option"
            style={{ borderRadius: "2vw" }}
            value={selectedVeg}
            onChange={(e) => setSelectedVeg(e.target.value)}
          >
            {vegList.map((a) => {
              return (
                <option value={a.name} key={a.id}>
                  {a.name}
                </option>
              );
            })}
          </Select>
          {/* <input type="text" name="vegType" /> */}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <></>
      )}
<div >
      <Calendar
        plugins={[dayGrid, timeGrid, interactionPlugin, multiMonthPlugin]}
        headerToolbar={{
          start: "title", // will normally be on the left. if RTL, will be on the right
          center: "",
          next: "",
          prev: "", // will normally be on the right. if RTL, will be on the left
        }}
        selectable={true}
        buttonText={{ today: "today" }}
        titleFormat={{ year: "numeric", month: "short" }}
        dateClick={(e) => {
          handleDateClick(e);
        }}
        events={event}
        eventClick={(e) => {
          setEventOptions(true);
          displayEvent(e);
        }}
        {...props}
      />
      </div>
      {eventOptions ? (
        <>
          <button type="button" onClick={deleteEvent}>
            Delete Event
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
