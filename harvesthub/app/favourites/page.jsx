"use client";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";

export default function Favourites() {
  //set up the supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  //handle list of favourited tips
  const [favTips, setFavTips] = useState();

  const [filteredTips, setFilteredTips] = useState();
  //record success of api call to database
  const [success, setSuccess] = useState(false);
  //manage state for search terms in searchbar
  const [searchTerm, setSearchTerm] = useState("");

  //function to get favourites from database and set favTips
  function getFavs() {
    async function apiCall() {
      const { data, error } = await supabase.from("favourites").select(` 
  tips ( * )
  `);
      if (error) {
        console.log(error);
      } else if (data.length > 0) {
        setFavTips(data);
        setFilteredTips(data)
        setSuccess(true);
      } else if (data.length <= 0) {
        setFavTips("");
        setSuccess(false);
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
      getFavs()
    }
    apiCall(id);
  }

  useEffect(() => {
    // useEffect for search function
    if(success){
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Search functionality which filters over gardening tips and returns the values
    const newFilteredTips = favTips.filter((a) => {
      let tip = a.tips

     const tipArr = Object.values(tip)
     tipArr.pop()

      return tipArr.some((b) => {
        return b.toString().toLowerCase().includes(lowerCaseSearchTerm);
      });
    });
    // set the state of filtered tips
    console.log(newFilteredTips)
    setFilteredTips(newFilteredTips);
  }
  }, [searchTerm]); // render everytime search term changes

  return (
    <>
      <Header title="Favourites" />
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul id="fav-container">
        {/* checking if api call has pulled back data rather than an empty array before rendering tips */}
        {success ? (
          filteredTips.map((a) => {
            return (
              <div id="fav-card-container" key={a.tips.id}>
                <Link href={`./tips-and-tricks/${a.tips.id}`} id="fav-card">
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
            <p className="favsMissing">You have not saved any favourites</p>
            <img src="/assets/sadPumpkin.png" alt="sad pumpkin"></img>
          </>
        )}
      </ul>
    </>
  );
}
