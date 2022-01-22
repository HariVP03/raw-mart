import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { MdOutlinePersonOutline } from "react-icons/md";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Navbar: React.FC = () => {
  return (
    <div className="flex x-10 w-screen h-16 bg-[#1E2125] items-center px-5 justify-between">
      <h1 className="text-4xl font-bold cursor-pointer">
        <Link href="/">店 Mart</Link>
      </h1>
      <input
        className="text-gray-200 border-[1px] border-gray-700 bg-gray-800 w-[75%] h-[60%] text-md px-2 placeholder:italic placeholder:text-slate-400 outline-none"
        placeholder="Search..."
      ></input>
      <div className="flex gap-2">
        <button className="flex justify-center items-center hover:bg-gray-800 w-10 h-10 rounded-full transition-[background-color] duration-300">
          <BsCart />
        </button>
        <Link passHref href="/login">
          <button className="flex justify-center items-center hover:bg-gray-800 w-10 h-10 rounded-full transition-[background-color] duration-300 text-xl">
            <MdOutlinePersonOutline />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
