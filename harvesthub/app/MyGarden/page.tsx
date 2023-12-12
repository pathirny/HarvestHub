"use client"
import Header from '@/components/Header';
import FullCalendar from '../../components/calendar.jsx';

export default function Home() {
  return (<>
<Header title="My Garden"/>
    <div id="calendar-container">
      <FullCalendar initialView='dayGridMonth'  />
    </div>
    </>
  );
}