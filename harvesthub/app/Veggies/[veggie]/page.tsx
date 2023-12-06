"use client"
import Header from "@/components/Header";
import { useStatStyles } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase.config"
import { data } from "autoprefixer";
export default function Veggies({ params } : any) {
    const [difficulty, setDifficulty] = useState([''])
    const [time, setTime] = useState([''])
//   const carrot = { name: "carrot", difficulty: '123' };
  let ease = [1, 2, 3, 4, 5]
  let timeEase = [1, 2, 3, 4, 5]

  useEffect(()=>{
    async function getDifTime(){
        let { data: difficult, error } = await supabase
  .from('veggies')
  .select('difficulty')
  .eq('name', params.veggie)

    let { data: time, error2 } = await supabase
.from('veggies')
.select('grow_time')
.eq('name', params.veggie)

  if(time){
  setTime(time[0].grow_time.toString().split(''))
    } 

    if(difficult){
        setDifficulty(difficult[0].difficulty.toString().split(''))
          } 
}
    getDifTime()
   

  }, [])

  return (
    <>
      <div id="vegPageContainer">
        <Header title={params.veggie}></Header>
        <div id="veggie-container">
          <div id="veggie-general-info"></div>
          <div id="veggie-grid">
            <div className="cream">
              <h1>Difficulty:</h1>
            </div>
            <div className="carrot-rating brown">
              {difficulty.map((a) => {  ease.pop();
                return (
                  <>
                    <img
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
            <div className="carrot-rating brown" >
            {time.map((a) => { timeEase.pop();
                return (
                  <>
                    <img
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
            <div className="brown" ></div>
            <div className="cream">
              <h1>Harvest:</h1>
            </div>
            <div className="brown" ></div>
          </div>
        </div>
      </div>
    </>
  );
}
