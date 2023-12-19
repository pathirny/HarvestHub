"use client";

import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import useCheckSignedIn from "./hooks/useCheckSignedIn";
// sets useState
export default function Header({ title }: any) {
  const [userImg, setUserImg] = useState(null);
  // checks user is signed in
  const [signedIn] = useCheckSignedIn();
  // connects to supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  // useEffect recieves image data from cloudinary
  // sets profile image to user defined photo, if none, renders blank image
  useEffect(() => {
    async function getUserImg() {
      let { data: userImg, error } = await supabase
        .from("Users")
        .select("user_img");
      if (userImg) {
        setUserImg(userImg[0].user_img);
      } else {
        setUserImg(null);
      }
    }
    getUserImg();
  }, []);
// renders header component including; home button, title text and user profile button
  return (
    <>
      <header id="nav-body">
        <div id="nav-container">
          <Link href="/">
            <div id="home-button" className="clickable">
              <h3>Home</h3>
            </div>
          </Link>
          <h1 id="page-title">{title}</h1>
          {signedIn ? (
            <Link href="/user" id="user-button">
              <div id="user-button">
                <CldImage
                  src={`${userImg}`}
                  width="500"
                  height="500"
                  className="userImg"
                  style={{
                    width: "15vw",
                    height: "auto",
                  }}
                  alt="the Users profile"
                />
              </div>
            </Link>
          ) : (
// if user not signed in, displays sign in page redirect button
            <Link href="/login">
              <div id="user-button" className="clickable">
                <h3>Sign In</h3>
              </div>
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
