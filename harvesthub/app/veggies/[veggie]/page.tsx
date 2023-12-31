//using client side instead of server side
"use client";
//importing dependency's
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { CldImage } from "next-cloudinary";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function Veggies({ params }: any) {
  // use suberbase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  // setting state
  const [difficulty, setDifficulty] = useState([""]);
  const [time, setTime] = useState([""]);
  const [vegInfo, setVegInfo] = useState("");
  const [vegHarv, setVegHarv] = useState("");
  const [vegPlant, setVegPlant] = useState("");
  let ease = [1, 2, 3, 4, 5];
  let timeEase = [1, 2, 3, 4, 5];
  // using superbase to get the veggies data to display on veggie page
  useEffect(() => {
    async function getVeg() {
      let { data: Veg, error } = await supabase
        .from("veggies")
        .select("*")
        .eq("name", `${params.veggie}`);

      if (Veg) {
        setTime(Veg[0].grow_time.toString().split(""));
        setDifficulty(Veg[0].difficulty.toString().split(""));
        setVegInfo(Veg[0].info);
        setVegHarv(Veg[0].harvest);
        setVegPlant(Veg[0].plant);
      }
    }
    getVeg();
  }, []); //empty array to so that it only renders once on load

  return (
    <>
      <div id="vegPageContainer">
        <Header title={params.veggie}></Header>
        <div className="imageBox">
    
          <CldImage
            className="tip-img"
            alt="tip-img"
            width="500"
            height="500"
            style={{
              width: "70vw",
              height: "auto",
              borderRadius: "3vw",
            }}
            // src={`/HarvestHub/${params.veggie}`}
            src={`/HarvestHub/Placeholderveg`}
            // src="/HarvestHub/Pumpkin"
          /> 
        </div>
        <div id="veggie-container">
          <div id="veggie-general-info">
            <p>{vegInfo}</p>
          </div>
          <div id="veggie-grid">
            <div className="cream">
              <h2>Difficulty:</h2>
            </div>
            <div className="carrot-rating brown">
              {difficulty.map((a) => {
                ease.pop();
                return (
                  <>
                    <img
                      className="carrot-image"
                      key={a}
                      src="/assets/BlackCarrot.png"
                      alt="black carrot"
                      style={{ height: "13vw", width: "auto" }}
                    ></img>
                  </>
                );
              })}
              {ease.map((a) => {
                return (
                  <>
                    <img
                      className="carrot-image"
                      key={a}
                      src="/assets/WhiteCarrot.png"
                      alt="black carrot"
                      style={{ height: "13vw", width: "auto" }}
                    ></img>
                  </>
                );
              })}
            </div>
            <div className="cream">
              <h2>Time:</h2>
            </div>
            <div className="carrot-rating brown">
              {time.map((a) => {
                timeEase.pop();
                return (
                  <>
                    <img
                      className="carrot-image"
                      key={a}
                      src="/assets/BlackCarrot.png"
                      alt="black carrot"
                      style={{ height: "13vw", width: "auto" }}
                    ></img>
                  </>
                );
              })}
              {timeEase.map((a) => {
                return (
                  <>
                    <img
                      className="carrot-image"
                      key={a}
                      src="/assets/WhiteCarrot.png"
                      alt="black carrot"
                      style={{ height: "13vw", width: "auto" }}
                    ></img>
                  </>
                );
              })}
            </div>
            <div className="cream">
              <h2>Plant:</h2>
            </div>
            <div className="brown">
              <h2>{vegPlant}</h2>
            </div>
            <div className="cream">
              <h2>Harvest:</h2>
            </div>
            <div className="brown">
              <h2>{vegHarv}</h2>
            </div>
          </div>
        </div>
      </div>
      <Link href="/calendar/">
        <BackButton />
      </Link>
    </>
  );
}
