"use client"
import Header from '@/components/Header.jsx';
import FullCalendar from '../../components/Calendar.jsx';

export default function Home() {
  return (<>
<Header title="My Garden"/>
    <div id="calendar-container">
      <FullCalendar initialView='dayGridMonth'  />
    </div>
    </>
  );
}