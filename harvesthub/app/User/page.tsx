"use client";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { SettingsIcon, AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { useState } from "react";

export default function UserPage() {

    const [publicId, setPublicId] = useState("/Users_img/Screenshot_2023-11-29_at_15.51.37_gnkn8u")

  return (
    <>
      <Header title="User Page" />
      <div id="userPage-container">
        <div id="icon-container">
          <div className="IconBox">
            <SettingsIcon boxSize="7vw" color="#47594e"/>
          </div>
          <div className="IconBox">
            <AddIcon boxSize="7vw" color="#47594e" />
          </div>
        </div>
        <div id="user-img" >
        <CldImage className="tip-img"
    alt="tip-img"
        width="500"
        height="500"
        style={{height: "100%", width: "auto", margin: "auto"}}
        src={`${publicId}`}
        />
        </div>
        <CldUploadWidget uploadPreset="User_Upload" onSuccess={(result, { widget }) => {
            const img = result?.info
            setPublicId(img.public_id)
    widget.close();
  }}>
            {({ open }) => {
                return (
                <button onClick={() => open()}>
                    Upload an Image
                </button>
                );
            }}
        </CldUploadWidget>
        <div id="user_name">
        <p style={{alignSelf:'center'}}>John Doe</p>
        </div>
        <div id="Underline"></div>
          <h2 id="bio-title" style={{textAlign:'center'}} >Bio</h2>
        <div id="UserBio">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>


      </div>
      <Link href="/">
      <BackButton />
      </Link>
    </>
  );
}
