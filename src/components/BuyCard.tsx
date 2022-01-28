import router from "next/router";
import { currencies } from "../../lib/utilities/currencies";

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
  return (
    <div
      onClick={() => {
        router.push(`/item/${id}`);
      }}
      className="max-w-xs duration-200 cursor-pointer mx-3 hover:scale-105 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-secondary"
    >
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {productName}
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{desc}</p>
      </div>

      <img
        className="object-cover w-full h-48 mt-2"
        src={img}
        alt={productName}
      />

      <div className="flex items-center justify-between px-4 py-2 bg-secondary">
        <h1 className="text-lg font-bold text-white">
          {currenciesObj[currency].symbol}
          {currentPrice}
        </h1>
        {discount !== 0 ? (
          <h1 className="text-lg font-bold text-gray-400">
            {currenciesObj[currency].symbol}
            {prevPrice}
          </h1>
        ) : (
          ""
        )}
        <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default BuyCard;
