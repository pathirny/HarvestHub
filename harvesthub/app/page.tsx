"use client";
import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
// import { cookies } from "next/headers";
import Header from "../components/Header";
import Link from "next/link";
import React from "react";
import { color } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import useCheckSignedIn from "../components/hooks/useCheckSignedIn"

export default function Index() {

  
  const [signedIn] = useCheckSignedIn()
  
  // const supabase = createBrowserClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  //   );
    


  const [text] = useTypewriter({
    words: ["Garden", "Grow", "Learn", "Eat"],
    loop: false,
    typeSpeed: 200,
    deleteSpeed: 150,
  });

  return (
    <>
      <Header title="Harvest Hub" />
      <main className="homepage-box">
        <img
          src="/assets/Veglogo.png"
          style={{ width: "16rem", height: "auto", opacity: "1" }}
        ></img>
        <div
          className="link-container"
          style={{ padding: "0", width: "90vw", height: "18rem" }}
        >
          <div
            style={{
              padding: "0",
              width: "100%",
              height: "100%",
              backgroundImage: "url(/assets/BackgroundVeg.png)",
              backgroundSize: "cover",
              opacity: "0.25",
            }}
          ></div>
          <div
            style={{ position: "absolute", width: "18rem", height: "14rem" }}
            className="hero-header-inner"
          >
            {/* style={{ position: "absolute", width: "15rem", height: "10rem"}} */}
            {/* style={{ position: "absolute", width: "15rem", height: "auto"}}  */}
            <div className="container">
              <h2>Get ready to</h2>
              <div>
                <span className="text-highlight">{text}</span>
                <Cursor cursorStyle="|" />
              </div>
            </div>

            <div className="hero-header-subheading">
              <span>
                Searching for ways to live more sustainably and grow your own
                stuff? Look no further than Harvest Hub!
              </span>
            </div>
          </div>
        </div>

        <Link href="./tips-and-tricks">
          <div className="link-container" style={{ padding: "0" }}>
            <div
              style={{
                padding: "0",
                width: "100%",
                height: "100%",
                backgroundImage: "url(/assets/BackgroundVeg.png)",
                backgroundSize: "cover",
                opacity: "0.25",
              }}
            ></div>
            <h2 style={{ position: "absolute", fontSize: "1.8rem" }}>
              Tips and Tricks
            </h2>
          </div>
        </Link>
        {/* Calendar */}
        <Link href="./calendar">
          <div
            className="link-container"
            style={{
              position: "relative",
              backgroundColor: "#b9a48c",
              color: "#f3ebe4",
            }}
          >
            <img
              src="/assets/CalendarBackground.png"
              style={{ width: "16rem", height: "auto", opacity: "0.25" }}
            ></img>
            <h2 style={{ position: "absolute", fontSize: "1.8rem" }}>
              Growing Calendar
            </h2>
          </div>
        </Link>
        <div className="link-container">
          <Link href="/my-garden">
            <div className="link-container" style={{ padding: "0" }}>
              <div
                style={{
                  padding: "0",
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(/assets/BackgroundVeg.png)",
                  backgroundSize: "cover",
                  opacity: "0.25",
                }}
              ></div>
              <h2 style={{ position: "absolute", fontSize: "1.8rem" }}>
                My Garden Calendar
              </h2>
            </div>
          </Link>
        </div>
        <div className="link-container">
          <Link href="#">
            <div
              className="link-container"
              style={{ padding: "0", fontSize: "2rem" }}
            >
              <div
                style={{
                  padding: "0",
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(/assets/BackgroundVeg.png)",
                  backgroundSize: "cover",
                  opacity: "0.25",
                }}
              ></div>
              <h2 style={{ position: "absolute", fontSize: "2rem" }}>
                Stretch goal 2
              </h2>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}
