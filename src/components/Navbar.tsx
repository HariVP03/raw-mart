import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { MdOutlinePersonOutline } from "react-icons/md";
import { provider, auth } from "../../firebase";
import { onAuthStateChanged, signInWithRedirect, User } from "firebase/auth";
import { useState } from "react";
import { setUser } from "../features/user";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../store";
import Cart from "./Cart";
import { setCart } from "../features/cart";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const user = JSON.parse(
    useSelector((state: userState) => state.user.value) || "{}"
  ) as User;
  const cart = useSelector((state: userState) => state.cart.value);

  const getData = async (email: string) => {
    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setCart(data));
      });
  };

  onAuthStateChanged(auth, (res) => {
    if (!res) return;
    dispatch(setUser(JSON.stringify(res)));
    if (cart === null && loading) {
      getData(res.email || "");
      setLoading(false);
    }
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
        onClick={() => console.log(auth.currentUser)}
      ></input>
      <Cart isOpen={isOpen} onClose={onClose} />
      <div className="flex gap-5">
        <button
          onClick={() => {
            onOpen();
          }}
          className="flex justify-center items-center hover:bg-gray-800 w-10 h-10 rounded-full transition-[background-color] duration-300"
        >
          <BsCart />
        </button>
        <div
          onClick={() => {
            if (auth.currentUser) {
              auth.signOut();
            } else {
              signIn();
            }
          }}
          style={{
            backgroundImage: Boolean(user.toJSON)
              ? `url(${user?.photoURL})`
              : `url(https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() * 1000
                ).toString()}.png)`,
          }}
          className="flex cursor-pointer bg-cover bg-center justify-center items-center hover:bg-gray-800 w-10 h-10 rounded-full transition-[background-color] duration-300 text-xl"
        ></div>
      </div>
    </div>
  );
};

export default Navbar;
