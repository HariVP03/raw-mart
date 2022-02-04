import { Button } from "@chakra-ui/react";
import router from "next/router";
import { currencies } from "../../lib/utilities/currencies";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../store";
import { setCart } from "../features/cart";

const CartItem: React.FC<{
  id: string;
  itemsInCartId: string;
  prodImage: string[];
  category: string;
  productName: string;
  price: number;
  currency: string;
  discount?: number;
}> = ({
  id,
  itemsInCartId,
  prodImage,
  category = "Hmmmm",
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

  const cart = useSelector((state: userState) => state.cart.value);
  const dispatch = useDispatch();
  const deleteItem = () => {
    let temp = JSON.parse(JSON.stringify(cart));
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].item.id === id) {
        temp.splice(i, 1);
      }
    }
    dispatch(setCart(temp));
    fetch(`/api/deleteCartItem/${itemsInCartId}`).then((res) => {
      return res.json();
    });
  };

  return (
    <div
      onClick={() => {
        router.push(`/item/${id}`);
      }}
      className="flex py-2 cursor-pointer items-center duration-200 rounded-md my-1 min-h-[128px] w-[100%] hover:bg-gray-700"
    >
      <div
        className="flex mx-2 w-[40%] h-[90%] bg-cover rounded-lg bg-center border-b-gray-300 bg-red-50"
        style={{ backgroundImage: `url('${img}')` }}
      ></div>
      <div className="flex flex-col">
        <div className="text-lg mt-1 mx-2">{category}</div>
        <div className="text-xl mx-2 truncate">{productName}</div>
        <div className="mt-1 text-gray-400 mx-2">Price</div>
        <div className="flex text-[18px] mx-2 font-extrabold items-center">
          <div>
            {currenciesObj[currency].symbol}
            {currentPrice.toLocaleString()}
          </div>
          {discount !== 0 && prevPrice ? (
            <div className="line-through text-gray-400 ml-2">
              {currenciesObj[currency].symbol}
              {prevPrice.toLocaleString()}
            </div>
          ) : (
            ""
          )}
          <Button
            ml={6}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              deleteItem();
            }}
          >
            <AiFillDelete />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
