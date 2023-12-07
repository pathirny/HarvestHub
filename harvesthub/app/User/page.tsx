"use client"
import { SettingsIcon, AddIcon } from "@chakra-ui/icons"
export default function UserPage(){

return(<>
<div id="userPage-container">
    <div id="icon-container">
        <SettingsIcon />
        <AddIcon />
    </div>
    <div id="user-img"><img></img></div>
</div>
</>)


}