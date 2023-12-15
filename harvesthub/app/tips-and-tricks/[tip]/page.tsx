// using client side instead of server side 
"use client";
// importing dependency's
import { Flex, Container, useStatStyles } from "@chakra-ui/react";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
export default function TipsPage({ params }: any) {
  const [tip, setTip] = useState([{ title: "", description: "" }]);

  //use supabase client 
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
// using the data stored in superbase to show tip data
  useEffect(() => {
    //render the tips using supabase query
    async function getTips() {
      let { data: tips, error } = await supabase.from("tips").select("*");
      // filter through tips and if the ids match the tip setTip
      if (tips) {
        setTip(tips.filter((a) => a.id == params.tip));
        console.log(tips);
      } else {
        console.log(error);
      }
    }
    getTips();
  }, []); // empty dependency so it loads on render


  // rendering the tip data as a card with title and description 
  return (
    <>
      <Header title="Tips and Tricks" />
      <Flex
        marginTop="2rem"
        gap="2rem"
        flexDirection="column"
        justifyContent="space-around"
        align="center"
      >
        <Container
          backgroundColor="#F3EBE4"
          borderRadius="25px"
          width="90%"
          textAlign="center"
        >
          <h1>{tip[0].title}</h1>
        </Container>
        {/* <Container
          backgroundColor="#F3EBE4"
          borderRadius="25px"
          width="90%"
          textAlign="center"
        >
          <h1>Image</h1>
        </Container> */}
        <Container
          backgroundColor="#F3EBE4"
          borderRadius="25px"
          width="90%"
          textAlign="center"
        >
          <p>{tip[0].description}</p>
        </Container>
        <Link href="/tips-and-tricks">
          <BackButton />
        </Link>
      </Flex>
    </>
  );
}
