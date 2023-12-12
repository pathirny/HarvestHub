"use client";
import FullCalendar from "../../components/calendar.jsx";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link.js";

export default function Home() {
  return (
    <>
      <div id="calendar-container">
        <FullCalendar initialView="dayGridMonth" />
        {/* <FullCalendar initialView='timeGridWeek' /> */}

        <Flex
          width="100vw"
          justifyContent="center"
          position="fixed"
          bottom="-10px"
        >
          <Link href="/">
            <Button className="addButton">Back</Button>
          </Link>
        </Flex>
      </div>
    </>
  );
}
