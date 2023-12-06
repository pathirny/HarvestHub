import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import { cookies } from "next/headers";
import Header from "../components/Header";
import Link from "next/link";
import { color } from "framer-motion";
export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <>
      <Header title="Harvest Hub"/>
      <div className="homepage-box">
          <Link href="./TipsnTricks">
          <div className="link-container" style={{padding: "0",}}>
            <div style={{padding: "0", width: "100%", height: "100%", backgroundImage: "url(/assets/BackgroundVeg.png)", backgroundSize: "cover", opacity: "0.5" }}>
            </div>
              <h1 style={{position: "absolute"}}>Tips and Tricks</h1>
          </div>
          </Link>
        
        <Link href="./Calendar">
        <div className="link-container" style={{ position: "relative", backgroundColor: "#E3CBB0" }}>
              <img
                src="/assets/CalendarBackground.png"
                style={{ width: "16rem", height: "auto", opacity: "0.5" }}
              ></img>
              <h1 style={{ position: "absolute" }}>Calendar</h1>
            </div>
            </Link>
        <div className="link-container">
          <Link href="#">Stretch goals</Link>
        </div>
        <div className="link-container">
          <Link href="#">Stretch goals</Link>
        </div>
      </div>
    </>
  );
}
