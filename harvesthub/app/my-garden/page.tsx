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

  const [signedIn] = useCheckSignedIn();
  console.log(signedIn);

  return (
    <>
      <Header title="My Garden" />
      <div id="myGarden-introduction">
        <h3>Click on days to track what you've planted and when to harvest!</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "2vw",
          }}
        >
          <p>Plant: </p>
          <div
            className="key-color"
            style={{ backgroundColor: "var(--white-cream-color)" }}
          ></div>
          <p> Harvest:</p>
          <div className="key-color"></div>
        </div>
      </div>
      {signedIn ? (
        <>
          {" "}
          <div id="calendar-container">
            <FullCalendar initialView="dayGridMonth" />
          </div>
          <div className="backButtonContainer">
            <Link href="/">
              <Button className="addButton">Back</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="calendar-event-background "></div>
          <div className="calendar-event-container">
            <h3 style={{ margin: "0" }}>
              You need to have an account to use this feature.
            </h3>{" "}
            <br></br> <br></br>{" "}
            <Link href="./login">
              {" "}
              <button style={{ margin: "0" }}>
                Click to log in or sign up
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
