"use client";
import Header from "@/components/Header";
import { useStatStyles } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase.config";
import { data } from "autoprefixer";
import { CldImage } from 'next-cloudinary';

export default function Veggies({ params }: any) {
  const [difficulty, setDifficulty] = useState([""]);
  const [time, setTime] = useState(['']);
  const [vegInfo, setVegInfo] = useState('');
  const [vegHarv, setVegHarv] = useState('');
  const [vegPlant, setVegPlant] = useState('');
  let ease = [1, 2, 3, 4, 5];
  let timeEase = [1, 2, 3, 4, 5];

useEffect(() => {
    async function getVeg() {
      let { data: Veg, error } = await supabase
        .from("veggies")
        .select("*")
        .eq("name", `${params.veggie}`)

     if (Veg) {
        setTime(Veg[0].grow_time.toString().split(""));
        setDifficulty(Veg[0].difficulty.toString().split(""));
        setVegInfo(Veg[0].info)
        setVegHarv(Veg[0].harvest)
        setVegPlant(Veg[0].plant)
      }
    }
    getVeg();

  }, []);

  return (
    <>
      <div id="vegPageContainer">
        <Header title={params.veggie}></Header>
        <div id="veggie-container">
          <div id="veggie-general-info">
            <p>{vegInfo}</p>
          </div>
          <div id="veggie-grid">
            <div className="cream">
              <h1>Difficulty:</h1>
            </div>
            <div className="carrot-rating brown">
              {difficulty.map((a) => {
                ease.pop();
                return (
                  <>
                    <img
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
              <h1>Time:</h1>
            </div>
            <div className="carrot-rating brown">
              {time.map((a) => {
                timeEase.pop();
                return (
                  <>
                    <img
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
              <h1>Plant:</h1>
            </div>
            <div className="brown"><h1>{vegHarv}</h1></div>
            <div className="cream">
              <h1>Harvest:</h1>
            </div>
            <div className="brown"><h1>{vegPlant}</h1></div>
          </div>
        </div>
      <CldImage className="tip-img"
    alt="tip-img"
        width="500"
        height="500"
        style={{width: "70vw", height: "auto", borderRadius: "3vw", marginLeft: "15vw"}}
        src={`/HarvestHub/${params.veggie}`}
        // src="/HarvestHub/Pumpkin"
        />
      </div>
    </>
  );
}
