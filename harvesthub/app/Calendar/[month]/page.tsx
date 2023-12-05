"use client"
import Header from "@/components/Header"
import Link from "next/link"
import BackButton from "@/components/BackButton"
import { useEffect, useState } from "react"



export default function Month({ params } : any){

    const [plantList, setPlantList] = useState([{name: "carrot"}])
    const [harvestList, setHarvestList] = useState([{name: "carrot"}])

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septmeber', 'October', 'November', 'December']
   const nxt = +params.month === 11 ? 0 : +params.month + 1 
   const prev = +params.month === 0 ? 11 : +params.month - 1 

   useEffect(()=> {
        setPlantList([{name: "carrot"}, {name: "sprouts"}, {name: "apple"}])
        setHarvestList([{name: "pepper"}, {name: "pear"}, {name: "onion"}, {name: "sprout"}])
   }, [])

return(<>
<div id="calendar-pg-container" >
<Header title="Month" />
<div id="month-nav-container">
    <Link href={`./${prev}`}><div id="prv-mnth-bttn"></div></Link>
    <div className="month br-wht header-month" id="january"><p>{months[params.month]}</p>
    <img src="/assets/brMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
    </div>
    <Link href={`./${nxt}`} ><div id="next-mnth-bttn"></div></Link>
 </div>
 <div id="plant-harvest-grid">
    <div id="plant-harvest-title">
        <div>Plant</div>
        <div>Harvest</div>
    </div>
    <div id="plant-list">
        {plantList.map((a) => {return (<><h1 key={a.name} className="plantListItem" >{a.name}</h1></>)})}
    </div>
    <div id="harvest-list">
        {harvestList.map((a) => {return (<><h1 key={a.name} className="harvestListItem">{a.name}</h1></>)})}
    </div>
 </div>
<Link href='/Calendar'><BackButton/></Link>
</div>
 </>
 )
}