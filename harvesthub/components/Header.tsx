import Link from "next/link"

export default function Header({ title } : any) {
  return (
    <>
    <header id="nav-body">
    <div id="nav-container">
    <Link href="/"><div id="home-button">
            <h3>Home</h3> 
       </div></Link>
            <h1 id="page-title">{title}</h1>
       <Link href="/User">
       <div id="user-button">
            <h3>User</h3>
       </div>
       </Link>
    </div>
    </header>
    </>
  )
}
