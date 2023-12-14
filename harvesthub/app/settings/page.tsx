"use client";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Link from "next/link";
import { Switch, Spinner } from '@chakra-ui/react'
import { createBrowserClient } from "@supabase/ssr";
import { redirect } from "next/navigation";


export default function Settings(){

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  function signOutFunc(){

    async function signOut(){
           const { error } = await supabase.auth.signOut()

          }
          
          signOut()
          return redirect("/");
  }

    return (<>
    <Header title="Settings" />
    <div id="settings-container">
      <form action={signOutFunc}>
    <button id="signOut" type="submit" className="setting_button"><h1>Sign Out</h1> </button>
    </form>
    <button id="changeMode" className="setting_button"><h1>Change Theme</h1></button>

  <Switch colorScheme='red' style={{width: "80vw", height: "30vw"}} />

    </div>
    
    <Link href="/user">
    <BackButton /></Link>
    </>)
}