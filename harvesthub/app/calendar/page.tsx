import Header from "@/components/Header"

export default function Calendar(){

    return(
        <div id="calendar-background">
            <Header />
        <div id="calendargrid">
            <div className="month br-wht" id="january"><p>January</p></div>
            <div className="month wht-br" id="february"><p>Febraury</p></div>
            <div className="month wht-br" id="march"><p>March</p></div>
            <div className="month br-wht" id="april"><p>April</p></div>
            <div className="month br-wht" id="may"><p>May</p></div>
            <div className="month wht-br" id="june"><p>June</p></div>
            <div className="month wht-br" id="july"><p>July</p></div>
            <div className="month br-wht" id="august"><p>August</p></div>
            <div className="month br-wht" id="september"><p>September</p></div>
            <div className="month wht-br" id="october"><p>January</p></div>
            <div className="month wht-br" id="november"><p>January</p></div>
            <div className="month br-wht" id="december"><p>January</p></div>
        </div>
    </div>)
}
