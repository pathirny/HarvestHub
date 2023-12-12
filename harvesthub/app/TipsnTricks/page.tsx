// use client side rendering to enable useEffect
"use client";
//import necessary packages
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { renderTips } from "./renderTips";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
// create TipsnTricks component
export default function TipsnTricks() {
  // set state for search, tips, display and newfiltered tips
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTips, setFilteredTips] = useState([{}]);
  const [gardeningTips, setGardeningTips] = useState([{}]);
  const [display, setDisplay] = useState("none");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  //use supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  function viewTips() {
    //render the tips using supabase query
    async function getTips() {
      let { data: tips, error } = await supabase.from("tips").select("*");
      // set the state of tips and filteredTips
      if (tips) {
        setGardeningTips(tips.reverse());
        setFilteredTips(tips);
        console.log(tips);
      } else {
        console.log(error);
      }
    }
    getTips();
  }
  useEffect(() => {
    //render the tips using supabase query
    // async function getTips() {
    //   let { data: tips, error } = await supabase.from("tips").select("*");
    //   // set the state of tips and filteredTips
    //   if (tips) {
    //     setGardeningTips(tips);
    //     setFilteredTips(tips);
    //     console.log(tips);
    //   } else {
    //     console.log(error);
    //   }
    // }
    viewTips();
  }, []); // empty dependency so it loads on render

  useEffect(() => {
    // useEffect for search function
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Search functionality which filters over gardening tips and returns the values
    const newFilteredTips = gardeningTips.filter((a) => {
      const values = Object.values(a);
      values.pop();
      return values.some((b: any) => {
        return b.toString().toLowerCase().includes(lowerCaseSearchTerm);
      });
    });
    // set the state of filtered tips
    setFilteredTips(newFilteredTips);
  }, [searchTerm]); // render everytime search term changes
  // function to toggle the form once button is clicked
  function toggleForm() {
    if (display === "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  }

  // form submit functionality
  const addTip = async (event: any) => {
    event.preventDefault();
    const id = await supabase.auth.getUser();
    if (id) {
      console.log(id);
    }
    const { data, error } = await supabase
      .from("tips")
      .insert([
        {
          user_id: id.data.user.id,
          title: title,
          description: description,
          // image: image
        },
      ])
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
    setTitle("");
    setDescription("");
    setImage("");
    viewTips();
  };
  return (
    <div>
      <Header title="Tips and Tricks" />

      <Flex
        className="flexContainer"
        position="absolute"
        zIndex="2"
        justifyContent="center"
        bgColor="#47594e"
        width="100%"
        color="#f3ebe4"
      >
        <FormControl
          display={display}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className="forms"
        >
          <Input
            placeholder="Title ✍"
            width="90vw"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            placeholder="Description ✍"
            width="90vw"
            height="25vh"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          {/* <Input
            placeholder="Image ✍"
            width="90vw"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          /> */}
          <hr />
          <Button
            type="submit"
            border="solid 1px black"
            boxShadow="10px 9px 30px 1px rgba(0,0,0,0.75)"
            onClick={(event) => {
              addTip(event);
              toggleForm();
            }}
          >
            Submit
          </Button>
          <Button
            onClick={toggleForm}
            border="solid 1px black"
            boxShadow="10px 9px 30px 1px rgba(0,0,0,0.75)"
          >
            Cancel
          </Button>
        </FormControl>
      </Flex>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Container className="tipContainer">{renderTips(filteredTips)}</Container>
      <Flex
        className="buttonsContainer"
        height="80px"
        flexDirection="row"
        justifyContent="space-around"
      >
        <Link href="/">
          <Button className="addButton">Back</Button>
        </Link>
        <Button className="addButton" onClick={toggleForm}>
          Add Tip +
        </Button>
      </Flex>
    </div>
  );
}
