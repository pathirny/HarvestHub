"use client";
// importing dependency's 
import Header from "@/components/Header";
import FullCalendar from "../../components/calendar.jsx";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link.js";

// function to use the imported dependency's
export default function Home() {
  // rendering the components
  return (
    <>
      <Header title="My Garden" />
      <div id="calendar-container">
        <FullCalendar initialView="dayGridMonth" />

        {/* <Flex
          width="100vw"
          justifyContent="center"
          position="fixed"
          bottom="-10px"
        >
        </Flex> */}
      </div>
          <Link href="/">
            <Button className="addButton">Back</Button>
          </Link>
    </>
  );
}
