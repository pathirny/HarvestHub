import Header from "@/components/Header"
import Link from "next/link"
import BackButton from "@/components/BackButton"


export default function Month({ params } : any){

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septmeber', 'October', 'November', 'December']
   const nxt = +params.month === 11 ? 0 : +params.month + 1 
   const prev = +params.month === 0 ? 11 : +params.month - 1 

return(<>
<div id="calendar-pg-container" >
<Header title="Month" />
<div id="month-nav-container">
    <Link href={`./${prev}`}><div id="prv-mnth-bttn"></div></Link>
    <div className="month br-wht header-month" id="january"><p>{months[params.month]}</p>
    <img src="/assets/brMonth.png" style={{width: "40vw", height: "auto"}} alt="month" />
    </div>
    <Link href={`./${nxt}`} ><div id="next-mnth-bttn"></div></Link>
 </div>
<Link href='/Calendar'><BackButton/></Link>
</div>
 </>
 )
}