import Link from "next/link"
import { useEffect } from "react"

export default function checkEmailPage({ params }){

    return(<>
    <div id="user-message-container">
    <h3 id="user-message"> {params.auth.replace(/%20/g, " ")}</h3>
    <Link href="/login"><button>Back</button></Link>
    </div>
    </>)
}