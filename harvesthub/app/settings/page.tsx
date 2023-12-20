// using client side instead of server side 
"use client";
// importing dependency's 
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Link from "next/link";
import { Switch, Spinner } from '@chakra-ui/react'
import { createBrowserClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

// function for settings 
export default function Settings(){
// superbase client - api key and api url 
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // function to sign out
  function signOutFunc(){
// error handling 
    async function signOut(){
           const { error } = await supabase.auth.signOut()

          }
          
          signOut()
          return redirect("/");
  }

  // rendering sign out btn and settings btn
    return (<>
    <Header title="Settings" />
    <div id="settings-container">
      <form action={signOutFunc}>
    <button id="signOut" type="submit" className="setting_button">Sign Out</button>
    </form>
    {/* <button id="changeMode" className="setting_button">Change Theme</button>

  <Switch colorScheme='red' style={{width: "80vw", height: "30vw"}} /> */}

    </div>
    
    <Link href="/user">
    <BackButton /></Link>
    </>)
}