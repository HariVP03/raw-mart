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
    <div
      style={{
        width: isOpen ? "30vw" : "0px",
      }}
      className="fixed overflow-y-scroll duration-300 h-screen overflow-x-hidden z-50 right-0 top-0 bg-secondary"
    >
      <div className="flex w-[30vw] h-screen flex-col items-center overflow-y-scroll">
        <div className="flex w-full mt-3 px-2 items-center mb-1">
          <h2 className="text-3xl w-full justify-center flex font-semibold">
            Cart Items
          </h2>
          <button
            className="text-2xl z-50 fixed rounded-full h-10 w-10 flex justify-center items-center duration-200 hover:bg-gray-600"
            onClick={onClose}
          >
            <AiOutlineArrowRight />
          </button>
        </div>
        {data
          ? data?.map((f: any) => {
              let e = f.item;
              return (
                <CartItem
                  category={e.category}
                  currency={e.currency}
                  price={e.price}
                  prodImage={e.images}
                  key={e.id}
                  productName={e.name}
                />
              );
            })
          : "No item in your cart"}
      </div>
    </div>
  );
};

export default Cart;
