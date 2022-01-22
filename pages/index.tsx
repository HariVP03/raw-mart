import type { NextPage } from "next";
import Head from "next/head";
import BuyCard from "../src/components/BuyCard";
import Navbar from "../src/components/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Mise Mart | Buy and Sell with ease</title>
        <meta name="description" content="Ecommerce but better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col h-screen w-screen flex-wrap text-gray-300 bg-[#2A3A47]">
          <Navbar />
          <div className="flex mt-5 flex-wrap w-screen ">
            <BuyCard
              category="Houses"
              prodImage={[
                "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
              ]}
              currency="$"
              price={12000000}
              productName="My humble aboard"
            />
            <BuyCard
              prodImage={[
                "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
              ]}
              category="Clothing"
              currency="$"
              price={100}
              prevPrice={350}
              productName="White Hoodie"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
