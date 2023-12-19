import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function useCheckSignedIn() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [signedIn, setSignedIn] = useState();
  useEffect(()=>{
async function apiCall(){
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {

    setSignedIn(true);
  } else {

    setSignedIn(false);
  } }

  apiCall()}, [])

  return [signedIn];
}
