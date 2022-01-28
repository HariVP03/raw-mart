import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BuyCard from "../src/components/BuyCard";
import Navbar from "../src/components/Navbar";
import prisma from "../lib/prisma";
import { item } from "../types/collectionTypes";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [items, setItems] = useState<item[] | null>();
  const getItems = async () => {
    fetch("/api/items", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json().then((data) => {
        setItems(data);
      });
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <Head>
        <title>Mise Mart | Buy and Sell with ease</title>
        <meta name="description" content="Ecommerce but better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col h-screen w-screen text-gray-200 bg-primary">
          <Navbar />
          <div className="flex mt-5 flex-wrap w-screen">
            {items?.map((e) => {
              return (
                <BuyCard
                  id={e.id}
                  prodImage={e.images}
                  desc={e.description}
                  currency={e.currency}
                  price={e.price}
                  productName={e.name}
                  discount={e.discount}
                  key={e.id}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
