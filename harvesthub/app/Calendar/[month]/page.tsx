"use client";
import Header from "@/components/Header";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useEffect, useState } from "react";
import { createBrowserClient } from '@supabase/ssr'


export default function Month({ params }: any) {

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

  const [plantList, setPlantList] = useState([{ name: "carrot" }]);
  const [harvestList, setHarvestList] = useState([{ id: 0,
    name: "hvhjv",
    harvest: "",
    plant: "",
    difficulty: 0,
    grow_time: 0,
    info: ""}]);
//   const [season, setSeason] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septmeber",
    "October",
    "November",
    "December",
  ];

  const nxt = +params.month === 11 ? 0 : +params.month + 1;
  const prev = +params.month === 0 ? 11 : +params.month - 1;


  useEffect(() => {
    async function getHarvest(season : string) {
        let { data: seasonInfo, error } = await supabase
          .from("veggies")
          .select("*")
          .eq("harvest", season);
          if(seasonInfo){
            console.log(seasonInfo)
              setHarvestList(seasonInfo)
          }
      }

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

  useEffect(() => {
    async function getPlant(season : string) {
        let { data: seasonInfo, error } = await supabase
          .from("veggies")
          .select("*")
          .eq("plant", season);
          if(seasonInfo){
            console.log(seasonInfo)
              setPlantList(seasonInfo)
          }
      }

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

  return (
    <>
      <div id="calendar-pg-container">
        <Header title="Month" />
        <div id="calendar-welcome-container"><h1 id="calendar-welcome">Click on the veggies for more info and advice on growing!</h1></div>
        <div id="month-nav-container">
          <Link href={`./${prev}`}>
            <div id="prv-mnth-bttn"></div>
          </Link>
          <div className="month br-wht header-month" id="january">
            <p>{months[params.month]}</p>
            <img
              src="/assets/brMonth.png"
              style={{ width: "40vw", height: "auto", alignSelf: "center" }}
              alt="month"
            />
          </div>
          <Link href={`./${nxt}`}>
            <div id="next-mnth-bttn"></div>
          </Link>
        </div>
        <div id="plant-harvest-grid">
          <div id="plant-harvest-title">
            <div>
              <h1>Plant</h1>
            </div>
            <div>
              <h1>Harvest</h1>
            </div>
          </div>
          <div id="underline"></div>
          <div id="plant-list">
            {plantList.map((a) => {
              return (
                <>
                <Link href={`/Veggies/${a.name}`}>
                  <div
                  
                    className="vegListItem"
                    style={{
                      color: "var(--dark-green-color)",
                      backgroundColor: "var(--white-cream-color)",
                    }}
                  >
                    <h3 style={{marginTop: "1vw", fontSize: "5vw"}}>{a.name}</h3>
                  </div>
                  </Link>
                </>
              );;
            })}
          </div>
          <div id="harvest-list">
            {harvestList.map((a) => {
              return (
                <><Link href={`/Veggies/${a.name}`}>
                  <div
                    
                    className="vegListItem"
                    style={{
                      color: "var(--white-cream-color)",
                      backgroundColor: "var(--brown-color)",
                    }}
                  >
                    <h3 style={{marginTop: "1vw", fontSize: "5vw"}}>{a.name}</h3>
                  </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
        <Link href="/Calendar">
          <BackButton />
        </Link>
      </div>
    </>
  );
}
