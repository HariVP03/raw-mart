import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import prisma from "../../lib/prisma";
import { cart, item } from "../../types/collectionTypes";
import { store, userState } from "../store";
import CartItem from "./CartItem";

const Cart: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const test = async () => {
    fetch("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const data = useSelector((state: userState) => state.cart.value);
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" closeOnEsc>
      <DrawerOverlay />
      <DrawerContent bg="secondary">
        <DrawerHeader>Cart</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody p={1} display="flex" flexDir="column">
          {data === null
            ? "Loading..."
            : data === []
            ? "No items in your cart"
            : data?.map((f: any) => {
                let e = f.item;
                return (
                  <CartItem
                    id={e.id}
                    category={e.category}
                    currency={e.currency}
                    price={e.price}
                    discount={e.discount}
                    prodImage={e.images}
                    key={e.id}
                    productName={e.name}
                  />
                );
              })}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    // <Drawer isOpen={isOpen} onClose={onClose} closeOnEsc>
    //   <DrawerOverlay />
    //   <DrawerBody>
    //     <div className="fixed overflow-y-scroll duration-300 h-full overflow-x-hidden z-50 right-0 top-0 bg-secondary">
    //       <div className="flex w-[30vw] h-screen flex-col items-center overflow-y-scroll">
    //         <div className="flex w-full mt-3 px-2 items-center mb-1">
    //           <h2 className="text-3xl w-full justify-center flex font-semibold">
    //             Cart Items
    //           </h2>
    //           <Button
    //             // className="text-2xl z-50 fixed rounded-full h-10 w-10 flex justify-center items-center duration-200 hover:bg-gray-600"
    //             onClick={onClose}
    //             position="fixed"
    //             variant="ghost"
    //           >
    //             <AiOutlineArrowRight />
    //           </Button>
    //         </div>
    //         {data === null
    //           ? "Loading..."
    //           : data === []
    //           ? "No items in your cart"
    //           : data?.map((f: any) => {
    //               let e = f.item;
    //               return (
    //                 <CartItem
    //                   id={e.id}
    //                   category={e.category}
    //                   currency={e.currency}
    //                   price={e.price}
    //                   discount={e.discount}
    //                   prodImage={e.images}
    //                   key={e.id}
    //                   productName={e.name}
    //                 />
    //               );
    //             })}
    //       </div>
    //     </div>
    //   </DrawerBody>
    // </Drawer>
  );
};

export default Cart;
