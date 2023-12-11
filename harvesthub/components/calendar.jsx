import Calendar from '@fullcalendar/react';
import dayGrid from '@fullcalendar/daygrid';
import timeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

export default function FullCalendar(props) {

  const [input, setinput] = useState(false)
  const [date, setDate] = useState(null)

  const [event, setEvent] = useState([{ // this object will be "parsed" into an Event Object
    title: 'Christmas', 
    start: '2023-12-25', 
    allDay: true, 
    display: 'block',
    backgroundColor: '#f3ebe4',
    textColor: '#47594e',
    borderColor: '#f3ebe4',
    eventOverlap: true
  }])

  function handleDateClick(e){// bind with an arrow function
    setinput(true)
    setDate(e.date)
  }

  function addEvent(data){
    console.log(date)


    let newDate = (date.getDate() + 2)

    setEvent((curr)=>{return [...curr, {
      title: data.target[0].value, 
      start: date,
      allDay: true, 
      display: 'block',
      backgroundColor: '#f3ebe4',
      textColor: '#47594e',
      borderColor: '#f3ebe4',
      eventOverlap: true
    }, {
      title: data.target[0].value + "second", 
      start: newDate,
      allDay: true, 
      display: 'block',
      backgroundColor: '#f3ebe4',
      textColor: '#47594e',
      borderColor: '#f3ebe4',
      eventOverlap: true
    }, ]})

    setinput(false)
  }
  

  return (<>
  { input ? 
  <form onSubmit={addEvent}>
    <label htmlFor='vegTypev'>what are you growing</label>
    <input type="text" name="vegType"/>
    <button type='submit'>Submit</button>
  </form> : <></>}
  <Calendar plugins={[dayGrid, timeGrid, interactionPlugin]} selectable={true} dateClick={(e)=>{handleDateClick(e)}}   events={event} eventClick={(e)=>{addCheck}} {...props}  /></>);

}