import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { auth } from "../../firebase";
import prisma from "../../lib/prisma";
import { currencies } from "../../lib/utilities/currencies";
import Navbar from "../../src/components/Navbar";
import { item } from "../../types/collectionTypes";

const ProductPage: React.FC = () => {
  let tempCurrencies = currencies as any;
  const router = useRouter();
  const { id } = router.query;
  const [productName, setProductName] = useState("Loading...");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [images, setImages] = useState([""]);

  const getItem = async () => {
    fetch(`/api/item/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
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
    <>
      <Head>
        <title>{productName}</title>
      </Head>
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
              <h2 className="text-3xl">{prevPrice}</h2>
              {discount !== 0 ? (
                <div className="flex font-semibold line-through items-center">
                  <h2 className="text-xl text-gray-400 ml-5">
                    {tempCurrencies[currency].symbol}
                  </h2>
                  <h2 className="text-3xl text-gray-400">{price}</h2>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex mx-5 text-xl mt-10">{desc}</div>
            <button className="flex mx-5 max-w-[130px] mt-4 items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              <BsCart />
              <span className="mx-1">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
