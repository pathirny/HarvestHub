import Header from "@/components/Header";
import Link from "next/link";
import "./calendar.css";
export default function Calendar() {
  return (
    <div id="calendar-background">
      <Header title="Calendar" />
      <div id="calendargrid">
        <Link href="./Calendar/0">
          <div className="month br-wht" id="january">
            <p>January</p>
          </div>
        </Link>
        <Link href="./Calendar/1">
          <div className="month wht-br" id="february">
            <p>Febraury</p>
          </div>
        </Link>
        <Link href="./Calendar/2">
          <div className="month wht-br" id="march">
            <p>March</p>
          </div>
        </Link>
        <Link href="./Calendar/3">
          <div className="month br-wht" id="april">
            <p>April</p>
          </div>
        </Link>
        <Link href="./Calendar/4">
          <div className="month br-wht" id="may">
            <p>May</p>
          </div>
        </Link>
        <Link href="./Calendar/5">
          <div className="month wht-br" id="june">
            <p>June</p>
          </div>
        </Link>
        <Link href="./Calendar/6">
          <div className="month wht-br" id="july">
            <p>July</p>
          </div>
        </Link>
        <Link href="./Calendar/7">
          <div className="month br-wht" id="august">
            <p>August</p>
          </div>
        </Link>
        <Link href="./Calendar/8">
          <div className="month br-wht" id="september">
            <p>September</p>
          </div>
        </Link>
        <Link href="./Calendar/9">
          <div className="month wht-br" id="october">
            <p>January</p>
          </div>
        </Link>
        <Link href="./Calendar/10">
          <div className="month wht-br" id="november">
            <p>January</p>
          </div>
        </Link>
        <Link href="./Calendar/11">
          <div className="month br-wht" id="december">
            <p>January</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
