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
      <Header title="Harvest Hub" />
      <div className="homepage-box">
        <img
          src="/assets/Veglogo.png"
          style={{ width: "16rem", height: "auto", opacity: "1" }}
        ></img>
        <div
          className="link-container"
          style={{ padding: "0", width: "27rem", height: "18rem" }}
        >
          <div
            style={{
              padding: "0",
              width: "100%",
              height: "100%",
              backgroundImage: "url(/assets/BackgroundVeg.png)",
              backgroundSize: "cover",
              opacity: "0.25",
            }}
          ></div>
          <div style={{ position: "absolute", width: "18rem", height: "19rem"}} className="hero-header-inner">
            {/* style={{ position: "absolute", width: "15rem", height: "10rem"}} */}
            {/* style={{ position: "absolute", width: "15rem", height: "auto"}}  */}
            <h1 className="hero-header-heading">
              <div>
                Get ready to
                <span className="text-highlight"> garden</span>
                <br />
                <span className="text-highlight">grow</span>
                <br />
                <span className="text-highlight">learn</span>
                <br />
                <span className="text-highlight">eat</span>
              </div>
            </h1>

            <div className="hero-header-subheading">
              <span>
                Are you looking for ways to live more sustainably and grow your
                own stuff? Look no further than Harvest Hub!
              </span>
            </div>
          </div>
        </div>

        <Link href="./TipsnTricks">
          <div className="link-container" style={{ padding: "0" }}>
            <div
              style={{
                padding: "0",
                width: "100%",
                height: "100%",
                backgroundImage: "url(/assets/BackgroundVeg.png)",
                backgroundSize: "cover",
                opacity: "0.25",
              }}
            ></div>
            <h1 style={{ position: "absolute" }}>Tips and Tricks</h1>
          </div>
        </Link>

        <Link href="./Calendar">
          <div
            className="link-container"
            style={{
              position: "relative",
              backgroundColor: "#b9a48c",
              color: "#f3ebe4",
            }}
          >
            <img
              src="/assets/CalendarBackground.png"
              style={{ width: "16rem", height: "auto", opacity: "0.25" }}
            ></img>
            <h1 style={{ position: "absolute" }}>Growing Calendar</h1>
          </div>
        </Link>
        <div className="link-container">
          <Link href="#">
            <div className="link-container" style={{ padding: "0" }}>
              <div
                style={{
                  padding: "0",
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(/assets/BackgroundVeg.png)",
                  backgroundSize: "cover",
                  opacity: "0.25",
                }}
              ></div>
              <h1 style={{ position: "absolute" }}>Stretch goal 1</h1>
            </div>
          </Link>
        </div>
        <div className="link-container">
          <Link href="#">
            <div className="link-container" style={{ padding: "0" }}>
              <div
                style={{
                  padding: "0",
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(/assets/BackgroundVeg.png)",
                  backgroundSize: "cover",
                  opacity: "0.25",
                }}
              ></div>
              <h1 style={{ position: "absolute" }}>Stretch goal 2</h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
