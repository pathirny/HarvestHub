import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import brMonth from "./assets/brMonth.png";
import WhtMonth from "./assets/WhtMonth.png";


export default function Calendar() {
  return (
    <div id="calendar-background">
      <Header title="Calendar" />
      <div id="calendargrid">
        <Link href="./Calendar/0">
          <div className="month br-wht" id="january">
            <p>January</p>
      <Image src={brMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/1">
          <div className="month wht-br" id="february">
            <p>Febraury</p>
            <Image src={WhtMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/2">
          <div className="month wht-br" id="march">
            <p>March</p>
            <Image src={WhtMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/3">
          <div className="month br-wht" id="april">
            <p>April</p>
            <Image src={brMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/4">
          <div className="month br-wht" id="may">
            <p>May</p>
            <Image src={brMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/5">
          <div className="month wht-br" id="june">
            <p>June</p>
            <Image src={WhtMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/6">
          <div className="month wht-br" id="july">
            <p>July</p>
            <Image src={WhtMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/7">
          <div className="month br-wht" id="august">
            <p>August</p>
            <Image src={brMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/8">
          <div className="month br-wht" id="september">
            <p>September</p>
            <Image src={brMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/9">
          <div className="month wht-br" id="october">
            <p>October</p>
            <Image src={WhtMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/10">
          <div className="month wht-br" id="november">
            <p>November</p>
            <Image src={WhtMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
        <Link href="./Calendar/11">
          <div className="month br-wht" id="december">
            <p>December</p>
            <Image src={brMonth} style={{width: "40vw", height: "auto"}} height={100} width={100} alt="month" />
          </div>
        </Link>
      </div>
    </div>
  );
}
