"use client";
// importing dependency's 
import Header from "@/components/Header";
import FullCalendar from "../../components/calendar.jsx";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link.js";
import useCheckSignedIn from "@/components/hooks/useCheckSignedIn.js";

// function to use the imported dependency's
export default function Home() {
  // rendering the components

  const [signedIn] = useCheckSignedIn()
  console.log(signedIn)

  return (
    <>
      <Header title="My Garden" />
      {signedIn ? 
     <> <div id="calendar-container">
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
          </Link></> : <><div className="calendar-event-background "></div><div className="calendar-event-container" ><h3 style={{margin: "0"}}>You need to have an account to use this feature.</h3> <br></br>  <br></br> <Link href="./login" > <button style={{margin: "0"}}>Click to log in or sign up</button></Link></div></>}
    </>
  );
}
