import Image from "next/image";
import Link from 'next/link'
import Logo from "/public/ssalogo.png";

export default function Navbar() {
  return (
    <nav className=" px-6 lg:px-20 pt-10">
      <Image src={Logo} alt="SSA logo"/>
      <Link href="/" className="py-6">Sign In</Link>
      <p>
        Accounts created <b>before</b> September 18, 2021 should enter a
        Username and Password.
      </p>
    </nav>
  );
}
