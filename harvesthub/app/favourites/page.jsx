"use client";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";


export default function Favourites() {
  //set up the supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  //handle list of favourited tips
  const [favTips, setFavTips] = useState([{}]);
  //record success of api call to database
  const [success, setSuccess] = useState(false);

  //function to get favourites from database and set favTips
  function getFavs() {
    async function apiCall() {
      const { data, error } = await supabase.from("favourites").select(` 
  tips ( * )
  `);
      if (error) {
        console.log(error);
      } else if (data.length >0) {
          setFavTips(data);
          setSuccess(true);
          console.log("hello")
      }
    }
    apiCall();
  }

  //set the favTips on first render
  useEffect(() => {
    getFavs();
  }, []);

  //to delete a tip from the database
  function deleteFav(id) {
    async function apiCall(idIn) {
      const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("tip_id", idIn);
      if (error) {
        console.log(error);
      }
    }
    apiCall(id);
    getFavs()
  }

  return (
    <>
      <Header title="Favourites" />
      <ul id="fav-container">
        {/* checking if api call has pulled back data rather than an empty array before rendering tips */}
        {success ? (
          favTips.map((a) => {
            return (
              <div id="fav-card-container" key={a.tips.id}>
                <Link href={`./TipsnTricks/${a.tips.id}`} id="fav-card">
                  <h2>{a.tips.title}</h2>
                </Link>
                <button
                  type="button"
                  id="delete-fav"
                  onClick={() => {
                    deleteFav(a.tips.id);
                  }}
                >
                  X
                </button>
              </div>
            );
          })
        ) : (
          <>
            <p>You have not saved any favourites</p>
          </>
        )}
      </ul>
    </>
  );
}
