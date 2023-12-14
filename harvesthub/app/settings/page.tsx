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

           return redirect("/");
    }

    signOut()
  }

  // rendering sign out btn and settings btn
    return (<>
    <Header title="Settings" />
    <div id="settings-container">
    <button id="signOut" className="setting_button" onClick={signOutFunc}><h1>Sign Out</h1> </button>
    <button id="changeMode" className="setting_button"><h1>Change Theme</h1></button>

  <Switch colorScheme='red' style={{width: "80vw", height: "30vw"}} />

    </div>
    
    <Link href="/user">
    <BackButton /></Link>
    </>)
}