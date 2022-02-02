import router from "next/router";
import { currencies } from "../../lib/utilities/currencies";

const CartItem: React.FC<{
  id: string;
  prodImage: string[];
  category: string;
  productName: string;
  price: number;
  currency: string;
  discount?: number;
}> = ({
  id,
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
  return (
    <div
      onClick={() => {
        router.push(`/item/${id}`);
      }}
      className="flex cursor-pointer items-center hover:scale-105 hover:z-10 duration-200 rounded-md my-3 min-h-[128px] w-[100%] bg-primary"
    >
      <div
        className="flex mx-2 w-[40%] h-[90%] bg-cover rounded-lg bg-center border-b-gray-300 bg-red-50"
        style={{ backgroundImage: `url('${img}')` }}
      ></div>
      <div className="flex flex-col">
        <div className="text-lg mt-1 mx-2">{category}</div>
        <div className="text-xl mx-2 truncate">{productName}</div>
        <div className="mt-1 text-gray-400 mx-2">Price</div>
        <div className="flex text-[18px] mx-2 font-extrabold">
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
        </div>
      </div>
    </div>
  );
};

export default CartItem;
