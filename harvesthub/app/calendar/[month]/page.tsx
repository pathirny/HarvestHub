// use client side instead of server side
"use client";
//importing all components
import Header from "@/components/Header";
import Link from "next/link";
import BackButton from "@/components/BackButton";
//importing react hooks from react library
import { useEffect, useState } from "react";
//importing functin from supabase
import { createBrowserClient } from "@supabase/ssr";
//create a function to display the months
//set a supabase with the url and the public anon key
export default function Month({ params }: any) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  // setting state
  const [plantList, setPlantList] = useState([{ name: "loading" }]);
  const [harvestList, setHarvestList] = useState([
    // create an object to store the veggie data
    {
      id: 0,
      name: "loading",
      harvest: "",
      plant: "",
      difficulty: 0,
      grow_time: 0,
      info: "",
    },
  ]);
  //   const [season, setSeason] = useState("");
  // define an array of all the months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //define two constants for cycling through the months
  const nxt = +params.month === 11 ? 0 : +params.month + 1;
  const prev = +params.month === 0 ? 11 : +params.month - 1;
  // get the data about veggies which needs to be harvested from suparbase
  useEffect(() => {
    async function getHarvest(season: string) {
      let { data: seasonInfo, error } = await supabase
        .from("veggies")
        .select("*")
        .eq("harvest", season);
      if (seasonInfo) {
        console.log(seasonInfo);
        setHarvestList(seasonInfo);
      }
    }
    // defines the season of each month
    if (+params.month >= 2 && +params.month <= 4) {
      getHarvest("Spring");
    } else if (+params.month >= 5 && +params.month <= 7) {
      getHarvest("Summer");
    } else if (+params.month >= 8 && +params.month <= 10) {
      getHarvest("Autumn");
    } else {
      getHarvest("Winter");
    }
  }, []);
  // get the data about veggies which needs to be planted from suparbase
  useEffect(() => {
    async function getPlant(season: string) {
      let { data: seasonInfo, error } = await supabase
        .from("veggies")
        .select("*")
        .eq("plant", season);
      if (seasonInfo) {
        console.log(seasonInfo);
        setPlantList(seasonInfo);
      }
    }
    // defines the season of each month
    if (+params.month >= 2 && +params.month <= 4) {
      getPlant("Spring");
    } else if (+params.month >= 5 && +params.month <= 7) {
      getPlant("Summer");
    } else if (+params.month >= 8 && +params.month <= 10) {
      getPlant("Autumn");
    } else {
      getPlant("Winter");
    }
  }, []);
  // returns the individual month with the veggies to be harvested/planted
  return (
    <>
      <div id="calendar-pg-container">
        <Header title="Month" />
        <div id="calendar-welcome-container">
          <h1 id="calendar-welcome">
            Click on the veggies for more info and advice on growing!
          </h1>
        </div>
        <div id="month-nav-container">
          <Link href={`./${prev}`}>
            <div id="prv-mnth-bttn"></div>
          </Link>
          <div className="month br-wht header-month" id="january">
            <p>{months[params.month]}</p>
            <img
              className="monthImage"
              src="/assets/brMonth.png"
              alt="month"
            />
          </div>
          <Link href={`./${nxt}`}>
            <div id="next-mnth-bttn"></div>
          </Link>
        </div>
        <div id="plant-harvest-grid">
          <div id="plant-harvest-title">
            <h1>Plant</h1>
            <h1>Harvest</h1>
          </div>
          <div id="underline"></div>
          <div id="plant-list" className="plantHarvestList">
            {plantList.map((a) => {
              return (
                <div className="vegContainer">
                  <Link href={`/veggies/${a.name}`}>
                    <div
                      className="vegListItem"
                      style={{
                        color: "var(--dark-green-color)",
                        backgroundColor: "var(--white-cream-color)",
                      }}
                    >
                      <h3 style={{ marginTop: "1vw", fontSize: "4vw" }}>
                        {a.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div id="harvest-list">
            {harvestList.map((a) => {
              return (
                <>
                  <Link href={`/veggies/${a.name}`}>
                    <div
                      className="vegListItem"
                      style={{
                        color: "var(--white-cream-color)",
                        backgroundColor: "var(--brown-color)",
                      }}
                    >
                      <h3
                        className="vegTitle"
                        style={{ marginTop: "1vw", fontSize: "4vw" }}
                      >
                        {a.name}
                      </h3>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
        {/* returns to previous page - button */}
        <Link href="/calendar">
          <BackButton />
        </Link>
      </div>
    </>
  );
}
