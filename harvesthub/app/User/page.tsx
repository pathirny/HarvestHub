"use client";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { SettingsIcon, AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { CldImage } from 'next-cloudinary';
export default function UserPage() {
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
        <CldImage  id="user-img" className="tip-img"
    alt="tip-img"
        width="500"
        height="500"
        style={{width: "70vw", height: "auto", borderRadius: "50%", margin: "auto"}}
        src={`/HarvestHub/Pumpkin`}
        // src="/HarvestHub/Pumpkin"
        />
        </div>
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
