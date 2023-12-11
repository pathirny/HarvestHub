import Calendar from '@fullcalendar/react';
import dayGrid from '@fullcalendar/daygrid';
import timeGrid from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function FullCalendar(props) {
  function handleDateClick(e){// bind with an arrow function
    console.log(e.date)
    renderEventContent(e)
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>title</b>
        <i>'hello'</i>
      </>
    )
  }

  return <Calendar plugins={[dayGrid, timeGrid, interactionPlugin]} selectable={true} eventContent={(e)=>{renderEventContent(e)}} dateClick={(e)=>{handleDateClick(e)}} {...props}  />;

}