import { currencies } from "../../lib/utilities/currencies";

const BuyCard: React.FC<{
  prodImage: string[];
  category: string;
  productName: string;
  price: number;
  currency: string;
  discount?: number;
}> = ({
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
    <div className="flex bg-[#1C2025] mb-5 mx-5 flex-col cursor-pointer w-[230px] h-[280px] rounded-lg border-gray-800 border-[1px] border-solid font-sans transition-all shadow-md duration-200 hover:shadow-lg hover:scale-105 hover:z-10">
      <div
        className="flex w-full h-[50%] bg-cover rounded-t-lg bg-center border-b-gray-300 bg-red-50"
        style={{ backgroundImage: `url('${img}')` }}
      ></div>
      <div className="mt-3 ml-4">{category}</div>
      <div className="mt-1 text-[20px] truncate font-semibold ml-4">
        {productName}
      </div>
      <div className="mt-1 text-gray-400 ml-4">Price</div>
      <div className="flex text-[18px] mx-4 font-extrabold">
        <div>
          {currenciesObj[currency].symbol}
          {currentPrice.toLocaleString()}
        </div>
        {discount !== 0 && prevPrice ? (
          <div className="line-through text-gray-400 ml-5">
            {currency}
            {prevPrice.toLocaleString()}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BuyCard;
