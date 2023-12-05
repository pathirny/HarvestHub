import Header from "@/components/Header"
import Link from "next/link"
import BackButton from "@/components/BackButton"

export default function Month({ params }){

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septmeber', 'October', 'November', 'December']
   const nxt = +params.month === 12 ? 0 : +params.month + 1 

return(<>
<div id="calendar-pg-container" >
<Header />
<div id="month-nav-container">
    <Link href={`./${+params.month - 1}`}><div id="prv-mnth-bttn"></div></Link>
    <div className="month br-wht header-month" id="january"><p>{months[params.month]}</p></div>
    <Link href={`./${nxt}`} ><div id="next-mnth-bttn"></div></Link>
 </div>
<Link href='/Calendar'><BackButton/></Link>
</div>
 </>
 )
}