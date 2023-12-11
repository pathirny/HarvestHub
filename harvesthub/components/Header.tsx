import Link from "next/link";

export default function Header({ title }: any) {
  return (
    <>
      <div id="nav-body">
        <div id="nav-container">
          <Link href="/">
            <div id="home-button">
              <h3>Home</h3>
            </div>
          </Link>
          <div id="page-title">
            <h3>{title}</h3>
          </div>
          <Link href="/User">
            <div id="user-button">
              <h3>User</h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
