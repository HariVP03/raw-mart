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
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import {
  Avatar,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import router from "next/router";

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
    fetch(`/api/cart/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    setAvatar(res.photoURL || "");
    if (cart === null && loading) {
      getData(res.email || "");
      setLoading(false);
    }
  });

  const signIn = () => {
    signInWithRedirect(auth, provider);
  };

  const [avatar, setAvatar] = useState(
    `https://avatars.dicebear.com/api/avataaars/${(
      Math.random() * 1000
    ).toString()}.png`
  );

  return (
    <div className="flex fixed z-20 max-w-[100vw] min-w-[100vw] h-[9vh] bg-gray-800 items-center justify-between align-center text-gray-200">
      <h1 className="text-3xl w-32 text-center font-bold cursor-pointer font-logo ml-5">
        <Link href="/">店 Mart</Link>
      </h1>

      <InputGroup w="70%" justify="center" display="flex" align="center">
        <InputLeftElement pointerEvents="none">
          <FiSearch />
        </InputLeftElement>
        <Input
          // className="text-gray-200 border-[1px] border-none transition-outline duration-100 bg-search focus:outline-highlight focus:outline-1 w-[75%] h-[60%] text-md px-2 placeholder:italic placeholder:text-slate-400 outline-none"
          placeholder="Search..."
          color="gray.200"
          variant="filled"
        />
      </InputGroup>
      <Cart isOpen={isOpen} onClose={onClose} />
      <div className="flex gap-5 w-48 justify-end items-center mr-5">
        <Button
          onClick={() => {
            onOpen();
          }}
          rounded="full"
          w={12}
          h={12}
          variant="ghost"
          // className="flex justify-center items-center hover:bg-gray-800 w-10 h-10 rounded-full transition-[background-color] duration-300"
        >
          <BsCart />
        </Button>

        <Menu>
          <MenuButton
            as={Avatar}
            alt="Profile picture"
            cursor="pointer"
            height="40px"
            bg="green"
            width="40px"
            src={avatar}
            onClick={() => console.log(user.photoURL)}
          />
          <Portal>
            <MenuList zIndex="30">
              {auth.currentUser ? (
                <>
                  <MenuItem onClick={() => onOpen()}>Your Cart</MenuItem>
                  <MenuItem onClick={() => router.push("/sell")}>
                    Sell Item
                  </MenuItem>
                  <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => signIn()}>
                    Sign in with Google
                  </MenuItem>
                  <MenuItem>Sign in with GitHub</MenuItem>
                </>
              )}
            </MenuList>
          </Portal>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
