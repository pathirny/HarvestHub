// using client side instead of server side
"use client";
// importing dependency's
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { SettingsIcon, AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import useCheckSignedIn from "../../components/hooks/useCheckSignedIn"
export default function UserPage() {
  const [signedIn] = useCheckSignedIn()
  const [publicId, setPublicId] = useState("/Users_img/sprout");
  const [userName, setUserName] = useState("");
  const [update, setUpdate] = useState(false);
  const [bio, setBio] = useState("hi");
// use supperbase 
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  //get user image from supabase
  useEffect(() => {
    async function getUserImg() {
      let { data: Users, error } = await supabase
        .from("Users")
        .select("user_img");
      if (Users) {
        setPublicId(Users[0].user_img);
      }
    }
    getUserImg();

    //get user name
    async function getName() {
      let { data: Users, error } = await supabase
        .from("Users")
        .select("first_name");
      if (Users) {
        setUserName(Users[0].first_name);
      }
    }
    getName();
  }, []);

  function setUserBio() {
    // async function setBioDB(bio) {
    //   const { data, error } = await supabase
    //   .from("Users")
    //   .update({ user_bio: bio })
    //   .select();
    //   console.log(data)
    // }
  }

  // function to set users profile picture 
  function setUserImg(imgId: any) {
    console.log("update img");
    console.log(userName);
    async function setUserImgSB(name: any) {
      const { data, error } = await supabase
        .from("Users")
        .update({ user_img: imgId })
        .eq("first_name", name)
        .select();
      console.log("uploaded img");
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }
    setUserImgSB(userName);
  }

  return (
    <>
      <Header title="User Page" />
      <div id="userPage-container">
        <div id="icon-container">
          <Link href="/settings">
            <div className="IconBox">
              <SettingsIcon boxSize="7vw" color="#47594e" />
            </div>
          </Link>
          <div
            className="IconBox"
            onClick={() => {
              setUpdate(!update);
            }}
          >
            <AddIcon boxSize="7vw" color="#47594e" />
          </div>
        </div>
        <div id="user-img">
          <CldImage
            className="tip-img"
            alt="tip-img"
            width="500"
            height="500"
            style={{ height: "100%", width: "auto", margin: "auto" }}
            src={`${publicId}`}
          />
        </div>
        {update ? (
          <CldUploadWidget
            uploadPreset="User_Upload"
            onSuccess={(result, { widget }) => {
              const img: any = result?.info;
              if (img) {
                setPublicId(img.public_id);
                setUserImg(img.public_id);
              }
              widget.close(img.public_id);
            }}
          >
            {({ open }) => {
              return <button onClick={() => open()}>Upload an Image</button>;
            }}
          </CldUploadWidget>
        ) : (
          <></>
        )}
        <div id="user_name">
          <p style={{ alignSelf: "center" }}>{userName}</p>
        </div>
        <Link href="/favourites">
          <button className="favouritesButton">Favourites</button>
        </Link>
        <Link href="/yourTips">
          <button className="favouritesButton">Your Tips</button>
        </Link>
      </div>
      <Link href="/">
        <BackButton />
      </Link>
    </>
  );
}
