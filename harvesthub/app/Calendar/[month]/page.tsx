"use client"
import Header from "@/components/Header"
import Link from "next/link"
import BackButton from "@/components/BackButton"
import { useEffect, useState } from "react"
import { supabase } from "@/app/supabase.config"



export default function Month({ params } : any){

    const [plantList, setPlantList] = useState([{name: "carrot"}])
    const [harvestList, setHarvestList] = useState([{name: "carrot"}])

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septmeber', 'October', 'November', 'December']
   const nxt = +params.month === 11 ? 0 : +params.month + 1 
   const prev = +params.month === 0 ? 11 : +params.month - 1 

   useEffect(()=> {
        setPlantList([{name: "carrot"}, {name: "sprout"}, {name: "apple"}])
        setHarvestList([{name: "pepper"}, {name: "pear"}, {name: "onion"}, {name: "sprout"}])
   }, [])

 useEffect(()=>{
    async function getList(){

        let { data: Veg, error } = await supabase
        .from("months")
        .select("season")
        .eq("month", params.month)
    
//         const { data, error } = await supabase.from('countries').select(`
//   id, 
//   name, 
//   cities ( id, name )
// `)
      }
 }, [])

return(<>
<div id="calendar-pg-container" >
<Header title="Month" />
<div id="month-nav-container">
    <Link href={`./${prev}`}><div id="prv-mnth-bttn"></div></Link>
    <div className="month br-wht header-month" id="january"><p>{months[params.month]}</p>
    <img src="/assets/brMonth.png" style={{width: "40vw", height: "auto", alignSelf: "center"}} alt="month" />
    </div>
    <Link href={`./${nxt}`} ><div id="next-mnth-bttn"></div></Link>
 </div>
 <div id="plant-harvest-grid">
    <div id="plant-harvest-title">
        <div><h1>Plant</h1></div>
        <div><h1>Harvest</h1></div>
    </div>
    <div id="underline"></div>
    <div id="plant-list">
        {plantList.map((a) => {return (<><Link href={`/Veggies/${a.name}`}><h1 key={a.name} className="vegListItem" style={{ color: "var(--dark-green-color)", backgroundColor: "var(--white-cream-color)"}} >{a.name}</h1></Link></>)})}
    </div>
    <div id="harvest-list">
        {harvestList.map((a) => {return (<><h1 key={a.name} className="vegListItem" style={{ color: "var(--white-cream-color)", backgroundColor: "var(--brown-color)"}}>{a.name}</h1></>)})}
    </div>
 </div>
<Link href='/Calendar'><BackButton/></Link>
</div>
 </>
 )
}