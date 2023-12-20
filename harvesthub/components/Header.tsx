"use client";

import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import useCheckSignedIn from "./hooks/useCheckSignedIn";

export default function Header({ title }: any) {
  const [userImg, setUserImg] = useState(null);

  const [signedIn] = useCheckSignedIn();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function getUserImg() {
      console.log("hello");
      let { data: userImg, error } = await supabase
        .from("Users")
        .select("user_img");
      if (userImg) {
        console.log("hello");
        setUserImg(userImg[0].user_img);
      } else {
        setUserImg(null);
      }
    }
    getUserImg();
  }, []);

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
                  // style={{
                  //   width: "10vw",
                  //   height: "auto",
                  // }}
                  alt="the Users profile"
                />
              </div>
            </Link>
          ) : (
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
