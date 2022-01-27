import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import prisma from "../../lib/prisma";
import { currencies } from "../../lib/utilities/currencies";
import Navbar from "../../src/components/Navbar";
import { item } from "../../types/collectionTypes";

const ProductPage: React.FC = () => {
  let tempCurrencies = currencies as any;
  const router = useRouter();
  const { id } = router.query;
  const [productName, setProductName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [currency, setCurrency] = useState("INR");
  const [images, setImages] = useState([""]);

  const getItem = async () => {
    fetch(`/api/item/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      console.log(res);
      res.json().then((item: item) => {
        setProductName(item?.name || "");
        setDesc(item?.description || "");
        setPrice(item?.price || 0);
        setDiscount(item?.discount || 0);
        setCurrency(item?.currency || "INR");
        setImages(item?.images || [""]);
      });
    });
  };

  useEffect(() => {
    if (router.query.id) {
      getItem();
    }
  }, [router.query]);

  useEffect(() => {
    setPrevPrice(price * (1 - discount / 100));
  }, [discount]);

  return (
    <div className="w-screen items-center h-screen bg-primary flex flex-col overflow-scroll">
      <Navbar />
      <div className="h-[95%] w-[95%] flex">
        <div className="flex h-full w-[50%] flex-col items-center pt-5">
          <div
            className="flex bg-black rounded-lg h-[75%] bg-cover w-[85%]"
            style={{
              backgroundImage: `url(${images[0]})`,
            }}
          ></div>
        </div>
        <div className="flex h-full w-[50%] flex-col">
          <h2 className="text-4xl font-semibold m-5 text-ellipsis overflow-clip">
            {productName}
          </h2>
          <div className="flex font-semibold items-center">
            <h2 className="text-xl text-gray-400 ml-5">
              {tempCurrencies[currency].symbol}
            </h2>
            <h2 className="text-3xl">{price}</h2>
            {discount !== 0 ? (
              <div className="flex font-semibold line-through items-center">
                <h2 className="text-xl text-gray-400 ml-5">
                  {tempCurrencies[currency].symbol}
                </h2>
                <h2 className="text-3xl text-gray-400">{prevPrice}</h2>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex mx-5 text-xl mt-10">Description</div>
          <button
            onClick={() => {
              console.log(auth.currentUser);
            }}
            className="font-semibold text-xl hover:scale-105 duration-200 hover:bg-sky-300 rounded-lg h-[60px] w-[180px] text-gray-700 bg-highlight ml-5 mt-10"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
