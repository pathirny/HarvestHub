import Calendar from '@fullcalendar/react';
import dayGrid from '@fullcalendar/daygrid';
import timeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

export default function FullCalendar(props) {

  const [event, setEvent] = useState([{ // this object will be "parsed" into an Event Object
    title: 'Christmas', 
    start: '2023-12-25', 
    allDay: true, 
    display: 'block',
    backgroundColor: '#f3ebe4',
    textColor: '#47594e',
    borderColor: '#f3ebe4',
    eventOverlap: true
  }, {
    title: 'not christmas', 
    start: '2023-12-12', 
    allDay: true, 
    display: 'block',
    backgroundColor: '#f3ebe4',
    textColor: '#47594e',
    borderColor: '#f3ebe4',
    eventOverlap: true
  }, {
    title: 'still not christmas', 
    start: '2023-12-24', 
    allDay: true, 
    display: 'block',
    backgroundColor: '#f3ebe4',
    textColor: '#47594e',
    borderColor: '#f3ebe4',
    eventOverlap: true
  }])

  function handleDateClick(e){// bind with an arrow function
    console.log(e.date)
   setEvent((curr)=>{return [...curr, {
    title: 'also not christmas', 
    start: e.date, 
    allDay: true, 
    display: 'block',
    backgroundColor: '#f3ebe4',
    textColor: '#47594e',
    borderColor: '#f3ebe4',
    eventOverlap: true
  }]})
  }

  

  return <Calendar plugins={[dayGrid, timeGrid, interactionPlugin]} selectable={true} dateClick={(e)=>{handleDateClick(e)}}   events={event} eventClick={(e)=>{addCheck}}{...props}  />;

}