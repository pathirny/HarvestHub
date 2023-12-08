"use client";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Link from "next/link";
import { Switch, Spinner } from '@chakra-ui/react'

export default function Settings(){

    return (<>
    <Header title="Settings" />
    <div id="settings-container">
    <div id="signOut" className="setting_button"><h1>Sign Out</h1> </div>
    <div id="changeMode" className="setting_button"><h1>Change Theme</h1></div>

  <Switch colorScheme='red' style={{width: "80vw", height: "30vw"}} />
<Spinner />
    </div>
    
    <Link href="/User">
    <BackButton /></Link>
    </>)
}