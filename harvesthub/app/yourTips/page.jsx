"use client";
import { createBrowserClient } from "@supabase/ssr";
import { use, useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { YourTipCard } from "@/components/YourTipCard";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export default function YourTips() {
  //set up the supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  //handle list of favourited tips
  const [yourTips, setYourTips] = useState();

  const [filteredTips, setFilteredTips] = useState();
  //record success of api call to database
  const [success, setSuccess] = useState(false);
  //manage state for search terms in searchbar
  const [searchTerm, setSearchTerm] = useState("");
  const [deltedTip, setDeletedTip] = useState();

  //function to get favourites from database and set favTips
  function getTips() {
    async function apiCall() {
      const id = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("tips")
        .select(`*`)
        .eq("user_id", id.data.user.id);
      if (error) {
        console.log(error);
      } else if (data) {
        setYourTips(data);
        setFilteredTips(data);
        setSuccess(true);
      }
      if (data.length <= 0) {
        setYourTips({});
        setSuccess(false);
      }
    }
    apiCall();
  }

  //set your tips on first render
  useEffect(() => {
    getTips();
  }, []);

  useEffect(() => {
    getTips();
  }, [deltedTip]);

  //to delete a tip from the database
  function deleteTip(id) {
    async function apiCall(idIn) {
      const { error } = await supabase.from("tips").delete().eq("id", idIn);
      if (error) {
        console.log(error);
      }
      getTips();
    }
    apiCall(id);
  }

  useEffect(() => {
    // useEffect for search function
    if (success) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      // Search functionality which filters over gardening tips and returns the values
      const newFilteredTips = yourTips.filter((a) => {
        let tip = a;

        const tipArr = Object.values(tip);
        tipArr.pop();

        return tipArr.some((b) => {
          return b.toString().toLowerCase().includes(lowerCaseSearchTerm);
        });
      });
      // set the state of filtered tips
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
      <div className="cardContainer">
        {/* checking if api call has pulled back data rather than an empty array before rendering tips */}
        {success ? (
          filteredTips.map((a, i) => {
            return (
              <Container
                key={i}
                className="card"
                maxW="md"
                borderRadius={10}
                margin="20px"
                p="20px"
                zIndex="0"
              >
                <YourTipCard key={i} tip={a} setDeleted={setDeletedTip} />
              </Container>
            );
          })
        ) : (
          <>
            <>
              <p className="favsMissing">You have not added any tips</p>
              <img
                src="/assets/sadPumpkin.png"
                alt="sad pumpkin"
                style={{ width: "50vw", marginLeft: "25vw" }}
              ></img>
            </>
          </>
        )}
        {/* {success ? (
          filteredTips.map((a) => {
            return (
              <div id="fav-card-container" key={a.id}>
                <Link href={`./tips-and-tricks/${a.id}`} id="fav-card">
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
        )} */}
      </div>
    </>
  );
}
