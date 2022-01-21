import React from "react";

const BuyCard: React.FC<{
  prodImage: string[];
  category: string;
  productName: string;
  price: number;
  currency: string;
  prevPrice?: number;
}> = ({
  prodImage,
  category = "Hmmmm",
  productName = "Something went wrong... :(",
  price = 0,
  prevPrice,
  currency = "$",
}) => {
  const img = prodImage[0];
  return (
    <div className="flex m-5 flex-col cursor-pointer w-[330px] h-[380px] rounded-lg border-gray-300 border-[1px] border-solid font-sans transition-all shadow-md duration-200 hover:shadow-lg hover:scale-105">
      <div
        className="flex w-full h-[50%] bg-cover rounded-t-lg bg-center border-b-gray-300 bg-red-50"
        style={{ backgroundImage: `url('${img}')` }}
      ></div>
      <div className="mt-3 text-gray-400 ml-4">{category}</div>
      <div className="mt-1 text-[20px] text-gray-800 font-semibold ml-4">
        {productName}
      </div>
      <div className="mt-3 text-gray-400 ml-4">Price</div>
      <div className="flex mt-1 text-[23px] text-gray-800 mx-4 font-extrabold ">
        <div>
          {currency}
          {price.toLocaleString()}
        </div>
        {prevPrice && prevPrice !== price ? (
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
