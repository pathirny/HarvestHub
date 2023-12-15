"use client";
import Header from "@/components/Header";
import FullCalendar from "../../components/calendar.jsx";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link.js";
export default function Home() {
  return (
    <>
      <Header title="My Garden" />
      <div id="calendar-container">
        <FullCalendar initialView="dayGridMonth" />
        {/* <FullCalendar initialView='timeGridWeek' /> */}

        <Flex
          width="100vw"
          justifyContent="center"
          position="fixed"
          bottom="-10px"
        >
        </Flex>
      </div>
          <Link href="/">
            <Button className="addButton">Back</Button>
          </Link>
    </>
  );
}
