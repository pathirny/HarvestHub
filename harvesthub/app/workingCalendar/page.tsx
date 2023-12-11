"use client"

import FullCalendar from '../../components/calendar.jsx';

export default function Home() {
  return (<>
  
    <div id="calendar-container">
      <FullCalendar initialView='dayGridMonth' />
      {/* <FullCalendar initialView='timeGridWeek' /> */}
    </div>
    </>
  );
}