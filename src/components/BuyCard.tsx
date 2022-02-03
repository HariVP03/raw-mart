import { User } from "firebase/auth";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { currencies } from "../../lib/utilities/currencies";
import { setCart } from "../features/cart";
import { userState } from "../store";
import Image from "next/image";
import { Button } from "@chakra-ui/react";

const BuyCard: React.FC<{
  id: string;
  prodImage: string[];
  desc: string;
  productName: string;
  price: number;
  currency: string;
  discount?: number;
}> = ({
  id,
  prodImage,
  desc = "Hmmmm",
  productName = "Something went wrong... :(",
  price = 0,
  discount = 0,
  currency = "USD",
}) => {
  const img = prodImage ? prodImage[0] : "";
  let currentPrice;
  let prevPrice;
  if (discount === 0) {
    currentPrice = price;
  } else {
    currentPrice = price * (1 - discount / 100);
    prevPrice = price;
  }
  let currenciesObj = currencies as any;

  const user = JSON.parse(
    useSelector((state: userState) => state.user.value) || "{}"
  ) as User | null;
  const email = user?.email;
  const cart = useSelector((state: userState) => state.cart.value);
  const dispatch = useDispatch();

  const addToCart = () => {
    if (!id) return;
    let temp = JSON.parse(JSON.stringify(cart));
    fetch("/api/addToCart", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, itemId: id }),
    }).then((res) => {
      res.json().then((data) => {
        temp.push({
          item: {
            ...data,
          },
        });
        dispatch(setCart(temp));
      });
    });
  };

  return (
    <div
      onClick={() => {
        router.push(`/item/${id}`);
      }}
      className="flex flex-col items-center justify-center w-72 mx-3 cursor-pointer hover:bg-secondary p-3 rounded-md duration-200"
    >
      <Image
        className="object-cover w-full rounded-md h-72"
        src={img}
        alt="product image"
        width="512px"
        height="450px"
      />

      <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">
        {productName}
      </h4>
      <div className="flex">
        <p className="text-blue-500">
          {currenciesObj[currency].symbol}
          {currentPrice}
        </p>
        {discount !== 0 ? (
          <p className="text-blue-500 ml-3 line-through">
            {currenciesObj[currency].symbol}
            {prevPrice}
          </p>
        ) : (
          ""
        )}
      </div>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
        variant="ghost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mx-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
        <span className="mx-1">Add to cart</span>
      </Button>
    </div>
  );
};

export default BuyCard;
