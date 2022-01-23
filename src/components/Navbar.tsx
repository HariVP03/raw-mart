import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { MdOutlinePersonOutline } from "react-icons/md";
import { provider } from "../../firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { useState } from "react";
import { setUser } from "../features/user";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../store";

const Navbar: React.FC = () => {
  const auth = getAuth();
  const user = useSelector((state: userState) => state.user.value);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (res) => {
    dispatch(setUser(res));
  });
  const signIn = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="flex x-10 w-screen h-16 bg-secondary items-center px-5 justify-between text-gray-200">
      <h1 className="text-4xl font-bold cursor-pointer font-logo">
        <Link href="/">店 Mart</Link>
      </h1>
      <input
        className="text-gray-200 border-[1px] border-none transition-outline duration-100 bg-search focus:outline-highlight focus:outline-1 w-[75%] h-[60%] text-md px-2 placeholder:italic placeholder:text-slate-400 outline-none"
        placeholder="Search..."
      ></input>
      <div className="flex gap-5">
        <button className="flex justify-center items-center hover:bg-gray-800 w-10 h-10 rounded-full transition-[background-color] duration-300">
          <BsCart />
        </button>
        <div
          onClick={() => {
            if (auth.currentUser) {
              console.log(user?.photoURL);
              auth.signOut();
            } else {
              signIn();
            }
          }}
          style={{
            backgroundImage: `url(${user?.photoURL})` || "",
          }}
          className="flex cursor-pointer bg-cover bg-center justify-center items-center hover:bg-gray-800 w-10 h-10 rounded-full transition-[background-color] duration-300 text-xl border-2"
        >
          {user ? "" : <MdOutlinePersonOutline />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
