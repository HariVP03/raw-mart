import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../src/components/Navbar";

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productName, setProductName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setPrevPrice(price * (1 - discount / 100));
  }, [discount]);

  return (
    <div className="w-screen items-center h-screen bg-primary flex flex-col overflow-scroll">
      <Navbar />
      <div className="h-[95%] w-[95%] flex">
        <div className="flex h-full w-[50%] flex-col items-center pt-5">
          <div className="flex bg-black rounded-lg h-[75%] bg-cover w-[85%]"></div>
        </div>
        <div className="flex h-full w-[50%] flex-col">
          <h2 className="text-4xl font-semibold m-5 text-ellipsis overflow-clip">
            Product Name
          </h2>
          <div className="flex font-semibold items-center">
            <h2 className="text-xl text-gray-400 ml-5">$</h2>
            <h2 className="text-3xl">500</h2>
            {discount !== 0 ? (
              <div className="flex font-semibold line-through items-center">
                <h2 className="text-xl text-gray-400 ml-5">$</h2>
                <h2 className="text-3xl text-gray-400">500</h2>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex mx-5 text-xl mt-10">Description</div>
          <button className="font-semibold text-xl hover:scale-105 duration-200 hover:bg-sky-300 rounded-lg h-[60px] w-[180px] text-gray-700 bg-highlight ml-5 mt-10">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
