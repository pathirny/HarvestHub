// use client rendering
"use client";
// import all neccesary component dependencies
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { FavTipCard } from "@/components/FavTipCard";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

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

  const [deltedTip, setDeletedTip] = useState();

  useEffect(() => {
    getFavs();
  }, [deltedTip]);

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
        setFilteredTips(data);
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

  useEffect(() => {
    // useEffect for search function
    if (success) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      // Search functionality which filters over gardening tips and returns the values
      const newFilteredTips = favTips.filter((a) => {
        let tip = a.tips;

        const tipArr = Object.values(tip);
        tipArr.pop();

        return tipArr.some((b) => {
          return b.toString().toLowerCase().includes(lowerCaseSearchTerm);
        });
      });
      // set the state of filtered tips
      console.log(newFilteredTips);
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
                <FavTipCard key={i} tip={a} setDeleted={setDeletedTip} />
              </Container>
            );
          })
        ) : (
          <>
            <p className="favsMissing">You have not saved any favourites</p>
            <div className="pumpkinContainer">
              <img
                className="sad-pumpkin"
                src="/assets/sadPumpkin.png"
                alt="sad pumpkin"
              ></img>
            </div>
          </>
        )}
      </div>
    </>
  );
}
