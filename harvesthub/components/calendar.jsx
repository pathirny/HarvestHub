import Calendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { use, useEffect, useState } from "react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { Select } from "@chakra-ui/react";
import { createBrowserClient } from "@supabase/ssr";
import { formatDate } from "@fullcalendar/core";
import { list } from "postcss";

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

  const [listView, setListView] = useState(false)
  // Set state to the selected veggie
  const [selectedVeg, setSelectedVeg] = useState("");
  //toggle to control if the form is showing to input a new event
  const [input, setInput] = useState(false);
  //toggle for event popup to delete event
  const [eventOptions, setEventOptions] = useState(false);
  //setting date when a calendar day is clicked on - to be passed the event object
  const [date, setDate] = useState(null);
  //setting even lists for events on calendar - formatted for Full-Calendar
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
  //setting eventlists to be read for the listView format
  const [eventData, setEventData] = useState([])
    //setting eventlists to be read for the listView format - for sorting harvest 
  const [eventData_harvest, setEventData_harvest] = useState([])
  //selected event when it is clicked on
  const [currentEvent, setCurrentEvent] = useState(null);
  //toggle error message when adding vegEvent
  const [errorAdding, setErrorAdding] = useState(false)

  //handles when a day is clicked on the calendar
  function handleDateClick(e) {
    //toggles the input form to show
    setInput(true);
    //sets the date to the day that has been clicked on
    setDate(e.date);
  }

  //adds event when the input form has been submitted
  function addEvent(data) {
    console.log("selected veg" + selectedVeg)
    if (!selectedVeg){
      data.preventDefault()
      setErrorAdding(true)

    } else {
      setErrorAdding(false)
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
    setInput(false);
  }
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
        setEventData(events)
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

  function deleteEvent(id) {
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

    else if(id){

      async function apiCall() {
        let { error } = await supabase
          .from("calendar_events")
          .delete()
          .eq("event_id", id);
  
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

  useEffect(()=>{
    setEventData((curr)=> {return eventData.sort((a, b) => {return new Date(a.plant_date) - new Date(b.plant_date)})})
    setEventData_harvest((curr) => {return eventData.sort((a, b) => {return new Date(a.harvest_date) - new Date(b.harvest_date)})})
  }, [eventData])

  return (<>
  <div>
  <button onClick={()=>{setListView(true)}}>List View</button><button onClick={()=>{setListView(false)}}>Calendar View</button>
  </div>
  {listView ? <>
  <div id="calendar-list-container">
  <div id="calendar-list-plant" className="calendar-list">
    <h3>Plant</h3>
    {eventData.map(a => {let plant_date = new Date(a.plant_date); plant_date = plant_date.toDateString().split(' ').splice(1, 3); plant_date= plant_date.join(' '); return (<div className="calendar-list-itme-container" key={a.event_id}><div className="calendar-list-item"><p>{plant_date} </p><p>{a.veggies.name}</p></div><button className="delete-list-item" onClick={()=>{deleteEvent(a.event_id)}}>X</button></div>)})}
  </div>
  <div id="calendar-list-harvest" className="calendar-list">
  <h3>Harvest</h3>
  {eventData_harvest.map(a => {let harvest_date = new Date(a.harvest_date); harvest_date = harvest_date.toDateString().split(' ').splice(1, 3); harvest_date= harvest_date.join(' '); return (<div className="calendar-list-itme-container" key={a.event_id}><div className="calendar-list-item"><p>{harvest_date} </p><p>{a.veggies.name}</p></div><button className="delete-list-item">X</button></div>)})}
  </div>
  </div>
  </> :
   <>
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
      {input ? (<>
         <div className="calendar-event-background">
          
         </div>
        <form onSubmit={addEvent} className="calendar-event-container">
          <label htmlFor="vegTypev">what are you growing?</label>
          <br></br>
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
          {errorAdding ? <><p>Please ensure you have selected something to plant</p></> : <></>}
          <button type="submit">Submit</button>
          <button id="cancel-delete-button" type="button" onClick={()=>{setInput(false)} }>
        Cancel
      </button>
        </form></>
      ) : (
        <></>
      )}
      {eventOptions ? (
        <>
        <div className="calendar-event-background">
          
        </div>
        <div className="calendar-event-container">
          <p>Are you sure you want to delete this event?</p>
        <button id="delete-event-button" type="button" onClick={deleteEvent}>
        Delete Event
      </button>  <button id="cancel-delete-button" type="button" onClick={()=>{setEventOptions(false); setErrorAdding(false)} }>
        Cancel
      </button>
      </div>
      </>
      ) : (
        <></>
      )}
    </>}
    </>
  );
}
