

import Header from "@/components/Header";
import Link from "next/link";



export default function Calendar() {


  return (
    <div id="calendar-background">
      <Header title="Calendar" />
      <div id="calendar-welcome-container"><h1 id="calendar-welcome">Welcome to our growing calendar - click on the months to see what you can grow and harvest!</h1></div>
      <div id="calendargrid">
        <Link href="./Calendar/0">
          <div className="month br-wht" id="january">
            <p>January</p>
        <img src="/assets/brMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/1">
          <div className="month wht-br" id="february">
            <p>Febraury</p>
            <img src="/assets/WhtMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/2">
          <div className="month wht-br" id="march">
            <p>March</p>
            <img src="/assets/WhtMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/3">
          <div className="month br-wht" id="april">
            <p>April</p>
            <img src="/assets/brMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/4">
          <div className="month br-wht" id="may">
            <p>May</p>
            <img src="/assets/brMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/5">
          <div className="month wht-br" id="june">
            <p>June</p>
            <img src="/assets/WhtMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/6">
          <div className="month wht-br" id="july">
            <p>July</p>
            <img src="/assets/WhtMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/7">
          <div className="month br-wht" id="august">
            <p>August</p>
            <img src="/assets/brMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/8">
          <div className="month br-wht" id="september">
            <p>September</p>
            <img src="/assets/brMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/9">
          <div className="month wht-br" id="october">
            <p>October</p>
            <img src="/assets/WhtMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/10">
          <div className="month wht-br" id="november">
            <p>November</p>
            <img src="/assets/WhtMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/11">
          <div className="month br-wht" id="december">
            <p>December</p>
            <img src="/assets/brMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
          </div>
        </Link>
      </div>
    </div>
  );
}
