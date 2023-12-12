import Calendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import multiMonthPlugin from '@fullcalendar/multimonth'
import { Select } from '@chakra-ui/react'
import { createBrowserClient } from '@supabase/ssr'
import { formatDate } from '@fullcalendar/core'


export default function FullCalendar(props) {

  //connecting to supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  //list of veggies for drop down 
  const [vegList, setVegList] = useState([])

  //getting the names of veggies for drop down list
  useEffect(()=>{
    async function getVegOptions(){
      let { data: veggies, error } = await supabase
  .from('veggies')
  .select('name')
  console.log(veggies)
  setVegList(veggies)
    }

    getVegOptions()
   
  }, [])


  //toggle to control if the form is showing to input a new event
  const [input, setinput] = useState(false);
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

  //handles when a day is clicked on the calendar 
  function handleDateClick(e) {
 
    //toggles the input form to show
    setinput(true);
    //sets the date to the day that has been clicked on 
    setDate(e.date);
  }

  //adds event when the input form has been submitted 
  function addEvent(data) {
    data.preventDefault();

  // Create a new Date object to avoid mutating the original date 
    let newDate = new Date(date); 

  // Add 2 days to the date
    newDate.setDate(date.getDate() + 2); 

  //adds the new event and the harvest event to the current events 
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

    //toggles the input form off
    setinput(false);
  }

  return (
    <>
    {/* toggle for showing input */}
      {input ? (
        <form onSubmit={addEvent}>
          <label htmlFor="vegTypev">what are you growing</label>
          {/* drop down to select veggies */}
          <Select placeholder='Select option' style={{borderRadius: "2vw"}}>
            {vegList.map((a)=> {return (  <option value='option1'>{a.name}</option>)})}
          </Select>
          <input type="text" name="vegType" />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <></>
      )}

      <Calendar
        plugins={[dayGrid, timeGrid, interactionPlugin, multiMonthPlugin]}
        headerToolbar={{
          start: 'title', // will normally be on the left. if RTL, will be on the right
          center: '',
          next: '',
          prev: '' // will normally be on the right. if RTL, will be on the left
        }}
        selectable={true}
        buttonText={{today: 'today'}}
     titleFormat={{ year: 'numeric', month: 'short' }}
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
