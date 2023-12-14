"use client";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";

export default function YourTips() {
  //set up the supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  //handle list of favourited tips
  const [yourTips, setYourTips] = useState([{id: 1}]);

  const [filteredTips, setFilteredTips] = useState();
  //record success of api call to database
  const [success, setSuccess] = useState(false);
  //manage state for search terms in searchbar
  const [searchTerm, setSearchTerm] = useState("");

  //function to get favourites from database and set favTips
  function getTips() {
    async function apiCall() {
      const id = await supabase.auth.getUser();
      const { data, error } = await supabase.from("tips").select(`*`).eq('user_id', id.data.user.id);
      if (error) {
        console.log('cannot get')
        console.log(error);
      } else if (data) {
        console.log(data)
        setYourTips(data);
        setFilteredTips(data)
        setSuccess(true);
      } 
    }
    apiCall();
  }

  //set the favTips on first render
  useEffect(() => {
    getTips();
  }, []);

  //to delete a tip from the database
  function deleteTip(id) {
    async function apiCall(idIn) {
      const { error } = await supabase
        .from("tips")
        .delete()
        .eq("id", idIn);
      if (error) {
        console.log(error);
      }
      getTips()
    }
    apiCall(id);
  }

  useEffect(() => {
    // useEffect for search function
    if(success){
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Search functionality which filters over gardening tips and returns the values
    const newFilteredTips = yourTips.filter((a) => {
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
      <Header title="Your Tips" />
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul id="fav-container">
        {/* checking if api call has pulled back data rather than an empty array before rendering tips */}
        {success ? (
          filteredTips.map((a) => {
            return (
              <div id="fav-card-container" key={a.id}>
                <Link href={`./TipsnTricks/${a.id}`} id="fav-card">
                  <h2>{a.title}</h2>
                </Link>
                <button
                  type="button"
                  id="delete-fav"
                  onClick={() => {
                    deleteTip(a.id);
                  }}
                >
                  X
                </button>
              </div>
            );
          })
        ) : (
          <>
            <p className="favsMissing">You have not added any tips</p>
            <img src="/assets/sadPumpkin.png" alt="sad pumpkin"></img>
          </>
        )}
      </ul>
    </>
  );
}
