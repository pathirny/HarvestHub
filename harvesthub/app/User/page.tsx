"use client";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { SettingsIcon, AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function UserPage() {
  const [publicId, setPublicId] = useState("/Users_img/sprout");

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
  }, []);

  function setUserImg(imgId: string) {
    console.log("update img");

    async function getName() {
      let { data: Users, error } = await supabase
        .from("Users")
        .select("first_name");
      if (Users) {
        const userName = Users[0].first_name;
        console.log(userName);
        setUserImgSB(userName);
      }
    }
    getName();
    async function setUserImgSB(userName: any) {
      const { data, error } = await supabase
        .from("Users")
        .update({ user_img: imgId })
        .eq("first_name", userName)
        .select();
      console.log("uploaded img");
      console.log(data);
    }
  }

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  function selectId() {
    async function getUserName() {
      let { data: Users, error } = await supabase
        .from("Users")
        .select("first_name");
      console.log(Users);
    }

    getUserName();
  }

  return (
    <>
      <Header title="User Page" />
      <button onClick={selectId}>click me</button>
      <div id="userPage-container">
        <div id="icon-container">
          <Link href="/settings"><div className="IconBox">
            <SettingsIcon boxSize="7vw" color="#47594e" />
          </div>
          </Link>
          <div className="IconBox">
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
        <div id="user_name">
          <p style={{ alignSelf: "center" }}>John Doe</p>
        </div>
        <div id="Underline"></div>
        <h2 id="bio-title" style={{ textAlign: "center" }}>
          Bio
        </h2>
        <div id="UserBio">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <Link href="/">
        <BackButton />
      </Link>
    </>
  );
}
