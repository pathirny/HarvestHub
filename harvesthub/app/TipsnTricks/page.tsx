"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { renderTips } from "./renderTips";
import BackButton from "@/components/BackButton";
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

export default function TipsnTricks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTips, setFilteredTips] = useState([{}]);
  const [gardeningTips, setGardeningTips] = useState([{}]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function getTips() {
      let { data: tips, error } = await supabase.from("tips").select("*");

      if (tips) {
        setGardeningTips(tips);
        setFilteredTips(tips);
        console.log(tips);
      } else {
        console.log(error);
      }
    }
    getTips();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // const newFilteredTips: any = gardeningTips.filter((tips) =>
    //   Object.values(tips).some((value: any) =>
    //     value.toString().toLowerCase().includes(lowerCaseSearchTerm)
    //   )
    const newFilteredTips = gardeningTips.filter((a) => {
      const values = Object.values(a);
      values.pop();
      return values.some((b: any) => {
        return b.toString().toLowerCase().includes(lowerCaseSearchTerm);
      });
    });

    setFilteredTips(newFilteredTips);
  }, [searchTerm]);

  const [display, setDisplay] = useState("none");
  function toggleForm() {
    if (display === "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  }
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
          <Input placeholder="Title ✍" width="90vw" borderRadius="10px 0px" />
          <Input
            placeholder="Description ✍"
            width="90vw"
            height="25vh"
            borderRadius="10px 0px"
          />
          <Input placeholder="Image ✍" width="90vw" borderRadius="10px 0" />
          <hr />
          <Button
            type="submit"
            onClick={toggleForm}
            border="solid 1px black"
            boxShadow="10px 9px 30px 1px rgba(0,0,0,0.75)"
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
