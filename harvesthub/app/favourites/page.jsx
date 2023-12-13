"use client"
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import { TipCard } from "@/components/TipCard";
import { useStatStyles } from "@chakra-ui/react";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import { Router } from "next/router";


export default function favourites() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

const [favTips, setFavTips] = useState([{}])
const [success, setSuccess] = useState(false)

function getFavs(){
  async function apiCall() {
    const { data, error } = await supabase.from("favourites").select(` 
  tips ( * )
  `);
  if(error){
      console.log(error)
  } else if(data){
    if(data.length > 0){
      setFavTips(data)
      setSuccess(true)
    }
  }
  }
  apiCall()
}

  useEffect(() => {
    getFavs()
  }, []);

  function deleteFav(id){
async function apiCall(idIn){

  const { error } = await supabase
  .from('favourites')
  .delete()
  .eq('tip_id', idIn)
  if(error){
    console.log(error)
  }
}
apiCall(id)
  }
  
  return <>
  <Header title="Favourites" />
  <ul id="fav-container">
  {
    success ? 
    favTips.map((a) => {return (<div id='fav-card-container'><Link href={`./TipsnTricks/${a.tips.id}`} id="fav-card"><h2>{a.tips.title}</h2></Link><button type="button" id="delete-fav" onClick={()=>{deleteFav(a.tips.id); }}>X</button></div>)}) : <><p>You have not saved any favourites</p></>
  }
  </ul>
  </>;
}
