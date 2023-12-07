"use client";
import Header from "@/components/Header";
import { SettingsIcon, AddIcon } from "@chakra-ui/icons";
export default function UserPage() {
  return (
    <>
      <Header title="User Page" />
      <div id="userPage-container">
        <div id="icon-container">
          <div className="IconBox">
            <SettingsIcon boxSize="5vw" />
          </div>
          <div className="IconBox">
            <AddIcon boxSize="5vw" />
          </div>
        </div>
        <div id="user-img">
          <img></img>
        </div>
        <p style={{alignSelf:'center'}}>Hello im a user</p>
        <div id="Underline"></div>
        <div className="UserBio">
          <h2 style={{textAlign:'center'}} >Bio</h2>
          <p style={{textAlign:'center'}} >This is my bio </p>
        </div>
      </div>
    </>
  );
}
