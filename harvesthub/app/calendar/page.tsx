import Jan from "./assets/Jan.png"
import Image from "next/image"
export default function Calendar(){

    return(
        <div id="calendar-background">
        <div id="calendargrid">
            <div className="month" id="january"><p>January</p></div>
            <div className="month" id="february"><p>January</p></div>
            <div className="month" id="march"><p>January</p></div>
            <div className="month" id="april"><p>January</p></div>
            <div className="month" id="may"><p>January</p></div>
            <div className="month" id="june"><p>January</p></div>
            <div className="month" id="july"><p>January</p></div>
            <div className="month" id="august"><p>January</p></div>
            <div className="month" id="september"><p>January</p></div>
            <div className="month" id="october"><p>January</p></div>
            <div className="month" id="november"><p>January</p></div>
            <div className="month" id="december"><p>January</p></div>
        </div>
    </div>)
}
